import { Request, Response } from 'express';
import argon2 from 'argon2';
import AuthRepository from './repository';
import UserRepository from '../user/repository';
import BanRepository from '../ban/repository';
import { prisma } from '../client';
import { LoginSchema, RegistrationSchema } from './validationSchema';

const authRepository = new AuthRepository(prisma);
const userRepository = new UserRepository(prisma);
const banRepository = new BanRepository(prisma);

async function createNewSession(userId: string) {
  const oldSession = await authRepository.readByUserId(userId);
  if (oldSession.isErr) {
    return null;
  }
  if (oldSession.isOk) {
    const session = oldSession.unwrap();
    // if we had previously existing session, purge it so we can get a new one
    if (session && session.id) {
      await authRepository.delete(session.id);
    }
  }
  // create the now time variable, add 7 days to it as a duration of a session
  const now = new Date();
  now.setDate(now.getDate() + 7);

  const loginSession = await authRepository.add({
    userId,
    expiration: now,
  });

  // login is successful, return 200, in the body is the token that serves as session token ID
  if (loginSession.isOk) {
    return loginSession.unwrap().id;
  }
  return null;
}

export async function loginUser(req: Request, res: Response) {
  const validation = LoginSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({
      error: 'Invalid syntax.',
      data: {
        message: 'The content of the form was invalid.',
      },
    });
  }

  const userResult = await userRepository.findByEmail(validation.data.email);

  if (userResult.isErr) {
    return res.status(500).json({
      error: 'Internal Server Error',
      data: {
        message: 'Database failed at finding user by its email.',
      },
    });
  }

  const user = userResult.unwrap();
  // user doesn't exist, we return 401 to signify invalid credentials
  if (!user) {
    return res
      .status(401)
      .json({
        error: 'Invalid credentials',
        data: {
          message: 'User with given credentials does not exist',
        },
      });
  }

  // We obtain password from PW database
  const pwResult = await authRepository.getUserPassword(user.id);
  // Checking if DB failed or if there's no PW in DB (which should never happen for existing user)
  if (pwResult.isErr || !pwResult.value) {
    return res.status(500).json({
      error: 'Internal Server Error',
      data: {
        message: 'Database failed to verify password',
        // No errors here since we'd need to do separate checks to see if DB failed or pw was
        // not found. Either is bad.
      },
    });
  }

  const passwordHash = pwResult.unwrap();

  // We check if the password provided matches the hashed PW in database, if not, 401
  const hashResult: boolean = await argon2.verify(
    passwordHash.pwHash,
    validation.data.password,
  );
  if (!hashResult) {
    return res.status(401).json({
      error: 'Invalid password',
      data: {
        message: 'Entered email and password combination is invalid.',
      },
    });
  }

  const banResult = await banRepository.findByUserId(user.id);
  // We check if DB response is possibly errorous
  if (banResult.isErr) {
    return res.status(500).json({
      error: 'Internal Server Error',
      data: {
        message: 'Database failed at retrieving banned status.',
        errors: banResult.error.message,
      },
    });
  }

  const ban = banResult.unwrap();
  // we found some ban
  if (ban) {
    const now = new Date();
    if (ban.expiration > now) {
      return res.status(403).json({
        error: 'Banned',
        data: {
          message: 'You have been banned',
          ban,
        },
      });
    }
  }

  const ssid = await createNewSession(user.id);
  if (!ssid) {
    return res.status(500).json({
      error: 'Internal Server Error',
      data: {
        message: 'Failed to create a session',
      },
    });
  }
  user.sessionId = ssid;
  res.setHeader('Set-Cookie', [`session=${ssid}`, `userId=${user.id}`]);

  return res.status(200).json({
    item: user,
    message: 'User logged in successfully.',
  });
}

export async function registerUser(req: Request, res: Response) {
  try {
    const validation = RegistrationSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        error: 'Invalid syntax.',
        data: {
          message: 'The content of the form was invalid.',
          errors: validation.error.errors,
        },
      });
    }
    const { data } = validation;

    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser.isErr) {
      return res.status(500).json({
        error: 'Internal Server Error',
        data: {
          message: 'Database failed at retrieving an user.',
          errors: existingUser.error.message,
        },
      });
    }
    // User with this email already exists, denied
    if (existingUser.unwrap()) {
      return res
        .status(409)
        .json({
          error: 'Invalid email',
          data: {
            message: 'User with this email address already exists.',
          },
        });
    }

    const passwordHash = await argon2.hash(data.password);
    // create new user
    const userResult = await userRepository.add({
      name: data.name,
      email: data.email,
      isOwner: false,
      groupIds: [],
    }, passwordHash);

    if (userResult.isErr) {
      return res.status(500).json({
        error: 'Internal Server Error',
        data: {
          message: 'Database failed at creating new user',
          errors: userResult.error.message,
        },
      });
    }
    const user = userResult.unwrap();
    return res.status(201).json({ item: user, message: 'User registered successfully.' });
  } catch (e) {
    return res.json({ error: e });
  }
}

export async function logout(req: Request, res: Response) {
  const { session } = req.cookies;
  await authRepository.delete(session);
  res.setHeader('Set-Cookie', ''); // destroy client-side cookie token
  return res.json({ message: 'Logged out.' });
}
