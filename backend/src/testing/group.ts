/* eslint-disable linebreak-style */
// group.test.ts
import { PrismaClient } from '@prisma/client';
import GroupRepository from '../group/repository';
import { GroupCreateInput, GroupUpdateInput } from '../group/types';

const prisma = new PrismaClient();
const groupRepository = new GroupRepository(prisma);

export default async function groupTestAll() {
  // Ensure the user exists
  const user = await prisma.user.findFirst();
  if (!user) {
    console.error('No user found in the database. Please seed the database with at least one user.');
    return;
  }

  // Step 1: Create a new group
  const groupData: GroupCreateInput = {
    name: 'Test Group',
    members: [user.email],
  };

  const createResult = await groupRepository.add(groupData, user.id);
  console.log('Create Result:', createResult);

  if (createResult.isOk) {
    const createdGroup = createResult.value;

    // Step 2: Update the group
    const updateData: GroupUpdateInput = {
      name: 'Updated Group Name',
    };

    const updateResult = await groupRepository.update(createdGroup.id, updateData);
    console.log('Update Result:', updateResult);

    // Step 3: Get the group by ID
    const getResult = await groupRepository.findById(createdGroup.id);
    console.log('Get By ID Result:', getResult);

    // Step 4: Delete the group
    const deleteResult = await groupRepository.delete(createdGroup.id);
    console.log('Delete Result:', deleteResult);
  }
}
