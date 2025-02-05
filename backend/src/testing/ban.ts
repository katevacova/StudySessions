import { PrismaClient } from '@prisma/client';
import BanRepository from '../ban/repository';
import { BanCreateInput, BanUpdateInput } from '../ban/types';

const prisma = new PrismaClient();
const banRepository = new BanRepository(prisma);

export default async function banTestAll() {
  const userId1 = 'user-uuid-1';
  const userId2 = 'user-uuid-2';
  await prisma.user.upsert({
    where: { id: userId1 },
    update: {},
    create: {
      id: userId1,
      email: 'issuer@example.com',
      isOwner: true,
      name: 'Issuer User',
    },
  });

  await prisma.user.upsert({
    where: { id: userId2 },
    update: {},
    create: {
      id: userId2,
      email: 'banned@example.com',
      isOwner: false,
      name: 'Banned User',
    },
  });

  // Step 1: Create a new ban
  const banData: BanCreateInput = {
    expiration: new Date(),
    issuedById: userId1,
    reason: 'Test Ban Reason',
    userId: userId2,
  };

  const createResult = await banRepository.add(banData);
  console.log('Create Result:', createResult);

  if (createResult.isOk) {
    const createdBan = createResult.value;

    // Step 2: Update the ban
    const updateData: BanUpdateInput = {
      reason: 'Updated Ban Reason',
    };

    const updateResult = await banRepository.update(createdBan.id, updateData);
    console.log('Update Result:', updateResult);

    // Step 3: Get the ban by ID
    const getResult = await banRepository.findById(createdBan.id);
    console.log('Get By ID Result:', getResult);

    // Step 4: Delete the ban
    const deleteResult = await banRepository.delete(createdBan.id);
    console.log('Delete Result:', deleteResult);
  }
}
