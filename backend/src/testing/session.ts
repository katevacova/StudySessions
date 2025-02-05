/* eslint-disable linebreak-style */
import { PrismaClient } from '@prisma/client';
import SessionRepository from '../session/repository';
import { SessionCreateInput, SessionCreateRequestInput } from '../session/types';
import { generateRepeatingSessions } from '../session/controller';

const prisma = new PrismaClient();
const sessionRepository = new SessionRepository(prisma);

async function sessionTestUnscheduled() {
  // Ensure the group exists
  const group = await prisma.group.findFirst();
  if (!group) {
    console.error('No group found in the database. Please seed the database with at least one group.');
    return;
  }

  const sessionData: SessionCreateInput = {
    subject: 'Book Review',
    groupId: group.id,
    repeatSeriesId: 'series-uuid-2',
    duration: 60,
    start: new Date(),
  };

  const createResult = await sessionRepository.add(sessionData);
  console.log('Create Unscheduled Session Result:', createResult);

  if (createResult.isOk) {
    const createdSession = createResult.value;

    const getResult = await sessionRepository.findById(createdSession!.id);
    console.log('Get Unscheduled Session By ID Result:', getResult);

    const updateData = { subject: 'Updated Single Meeting' };
    const updateResult = await sessionRepository.update(createdSession!.id, updateData);
    console.log('Update Unscheduled Session Result:', updateResult);

    const deleteResult = await sessionRepository.delete(createdSession!.id);
    console.log('Delete Unscheduled Session Result:', deleteResult);
  }
}

async function sessionTestScheduled() {
  // Ensure the group exists
  const group = await prisma.group.findFirst();
  if (!group) {
    console.error('No group found in the database. Please seed the database with at least one group.');
    return;
  }

  const sessionData: SessionCreateRequestInput = {
    subject: 'Repeating Meeting',
    groupId: group.id,
    duration: 60,
    start: new Date(),
    end: new Date(new Date().setDate(new Date().getDate() + 2)),
    repeatPeriod: 'Every day',
  };

  const sessions = generateRepeatingSessions(sessionData);

  const createResult = await sessionRepository.addMany(sessions);
  console.log('Create Scheduled Sessions Result:', createResult);

  if (createResult.isOk) {
    const createdSessions = createResult.value;

    createdSessions.forEach(async (session) => {
      const getResult = await sessionRepository.findById(session.id);
      console.log('Get Scheduled Session By ID Result:', getResult);

      const updateData = { subject: 'Updated Repeating Meeting' };
      const updateResult = await sessionRepository.update(session.id, updateData);
      console.log('Update Scheduled Session Result:', updateResult);

      const deleteResult = await sessionRepository.delete(session.id);
      console.log('Delete Scheduled Session Result:', deleteResult);
    });
  }
}

export default async function sessionTestAll() {
  console.log('---------------------------------UNscheduled-------------');
  await sessionTestUnscheduled();

  console.log('---------------------------------Scheduled---------------');
  await sessionTestScheduled();
}
