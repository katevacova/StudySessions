/* eslint-disable linebreak-style */
import { PrismaClient } from '@prisma/client';
import UserRepository from '../user/repository';
import { UserCreateInput, UserUpdateInput } from '../user/types';

const prisma = new PrismaClient();
const userRepository = new UserRepository(prisma);

export default async function userTestAll() {
  // Step 1: Create a new user
  const userData: UserCreateInput = {
    email: 'testuser@example.com',
    isOwner: false,
    name: 'Test User',
    groupIds: [],
  };

  const createResult = await userRepository.add(userData, "hash");
  console.log('Create Result:', createResult);

  if (createResult.isOk) {
    const createdUser = createResult.value;

    // Step 2: Update the user
    const updateData: UserUpdateInput = {
      name: 'Updated User Name',
    };

    const updateResult = await userRepository.update(createdUser.id, updateData);
    console.log('Update Result:', updateResult);

    // Step 3: Get the user by email
    const getResult = await userRepository.findByEmail(userData.email);
    console.log('Get By Email Result:', getResult);

    // Step 4: Delete the user
    const deleteResult = await userRepository.delete(createdUser.id);
    console.log('Delete Result:', deleteResult);
  }
}
