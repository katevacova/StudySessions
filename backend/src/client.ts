/* eslint-disable linebreak-style */
/* TODO: Instantiate the Prisma client here!
Export it and use **only** this one instance in the whole project. */

import { PrismaClient } from '@prisma/client';
import UserRepository from './user/repository';

const prisma = new PrismaClient();
const userRepository = new UserRepository(prisma);

// eslint-disable-next-line import/prefer-default-export
// eslint-disable-next-line import/prefer-default-export
export { userRepository, prisma };
