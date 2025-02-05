/* eslint-disable linebreak-style */
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  // Generate UUIDs for groups
  const groupIds = Array(11).fill(null).map(() => uuidv4());

  // Generate UUIDs for users
  const userIds = Array(12).fill(null).map(() => uuidv4());
  const adminId = uuidv4();
  const bannedId = uuidv4();
  const testUserId = uuidv4();

  // Seed data for Ban
  await prisma.ban.createMany({
    data: [
      {
        id: uuidv4(),
        expiration: new Date(),
        issuedById: userIds[3]!,
        reason: 'Violation of rules',
        userId: userIds[1]!,
      },
    ],
  });

  // Seed data for Group
  await prisma.group.createMany({
    data: groupIds.map((id, index) => ({
      id,
      name: `Group ${index + 1}`,
      ownerId: userIds[index]!,
    })),
  });

  // Seed data for LoginSessions
  await prisma.loginSessions.createMany({
    data: [
      { id: uuidv4(), expiration: new Date(), userId: userIds[0]! },
      { id: uuidv4(), expiration: new Date(), userId: userIds[1]! },
      ...Array(9).fill(null).map(() => ({
        id: uuidv4(),
        expiration: new Date(),
        userId: userIds[Math.floor(Math.random() * userIds.length)]!,
      })),
    ],
  });

  // Seed data for Session
  await prisma.session.createMany({
    data: [
      {
        id: uuidv4(),
        subject: 'AI Meet',
        groupId: groupIds[0]!,
        repeatPeriod: 'No repetition',
        repeatSeriesId: uuidv4(),
        duration: 60,
        realDuration: 60,
        start: new Date(),
      },
      {
        id: uuidv4(),
        subject: 'Book Review',
        groupId: groupIds[1]!,
        repeatPeriod: 'No repetition',
        repeatSeriesId: null,
        duration: 13,
        realDuration: 60,
        start: new Date(),
      },
      {
        id: uuidv4(),
        subject: 'Book Review',
        groupId: groupIds[0]!,
        repeatPeriod: 'No repetition',
        repeatSeriesId: null,
        duration: 12,
        realDuration: 45,
        start: new Date(new Date().setDate(-7)),
      },
      {
        id: uuidv4(),
        subject: 'Book Review',
        groupId: groupIds[0]!,
        repeatPeriod: 'No repetition',
        repeatSeriesId: null,
        duration: 0,
        realDuration: 30,
        start: new Date(new Date().setDate(-14)),
      },
      ...Array(9).fill(null).map((_, index) => ({
        id: uuidv4(),
        subject: `Session ${index + 3}`,
        groupId: groupIds[index + 2]!, // Ensure groupId matches the existing groups
        repeatPeriod: 'No repetition',
        repeatSeriesId: uuidv4(),
        duration: 60,
        realDuration: 60,
        start: new Date(new Date().setDate(10 * (index + 2))),
      })),
    ],
  });

  // Seed data for User
  await prisma.user.createMany({
    data: [
      {
        id: adminId!,
        email: 'admin@admin.cz',
        isOwner: true,
        name: 'Admin',
      },
      {
        id: userIds[0]!,
        email: 'john@example.com',
        isOwner: false,
        name: 'John Doe',
      },
      {
        id: userIds[1]!,
        email: 'jane@example.com',
        isOwner: false,
        name: 'Jane Doe',
      },
      {
        id: bannedId!,
        email: 'banned@banned.cz',
        isOwner: false,
        name: 'Banned User',
      },
      {
        id: testUserId!,
        email: 'test@test.cz',
        isOwner: false,
        name: 'Test user',
      },
      ...Array(9).fill(null).map((_, index) => ({
        id: userIds[index + 2]!,
        email: `user${index + 2}@example.com`,
        isOwner: false,
        name: `User ${index + 2}`,
      })),
    ],
  });

  await prisma.auth.createMany({
    data: [
      {
        id: uuidv4(),
        userId: adminId!, // Ensure this matches the admin user
        pwHash:
          '$argon2id$v=19$m=65536,t=3,p=4$MF0Hw+moh8CAJuFAcItqkQ$grkUT8lKpM+1FL5XsGdctCX35ji+yioEdnpAU68+gnk',
      },
      {
        id: uuidv4(),
        userId: bannedId!, // Ensure this matches the banned user
        pwHash:
          '$argon2id$v=19$m=65536,t=3,p=4$JvWuIMJt1SOGPS+7EzV83g$bsAgbIWZP5COHWM1MyF9qPTC1A6lV3c/MWjkZXNtHxM',
      },
      {
        id: uuidv4(),
        userId: testUserId!, // Matches testing user
        pwHash: '$argon2id$v=19$m=65536,t=3,p=4$VWq/KaoX/rHRP3OJZQHHnw$WGokq7FV+Vdeb4fNswT8/hadjOr5fZB6O1YvPCRw0kc',
      },
      ...Array(11).fill(null).map((_, index) => ({
        id: uuidv4(),
        userId: userIds[index]!, // Ensure each userId is unique and corresponds to a valid user
        pwHash: '$argon2id$v=19$m=65536,t=3,p=4$JvWuIMJt1SOGPS+7EzV83g$bsAgbIWZP5COHWM1MyF9qPTC1A6lV3c/MWjkZXNtHxM',
      })),
    ],
  });

  // Seed data for GroupMembers
  await prisma.groupMembers.createMany({
    data: [
      { groupId: groupIds[0]!, userId: userIds[0]! },
      { groupId: groupIds[1]!, userId: adminId! },
      {
        groupId: groupIds[3]!,
        userId: testUserId!,
      },
      {
        groupId: groupIds[5]!,
        userId: testUserId!,
      },
      {
        groupId: groupIds[7]!,
        userId: testUserId!,
      },
      {
        groupId: groupIds[0]!,
        userId: testUserId!,
      },
      ...Array(9).fill(null).map((_, index) => ({
        groupId: groupIds[index + 2]!,
        userId: userIds[index + 2]!,
      })),
    ],
  });

  console.log('Database seeded!');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
