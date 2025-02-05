/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* You can play with your database in this file. There is a "start" script that runs this file. */
import userTestAll from './testing/user';
import sessionTestAll from './testing/session';
import { prisma } from './client';
import groupTestAll from './testing/group';
import banTestAll from './testing/ban';

const sleep = (ms: number) => new Promise((resolve) => { setTimeout(resolve, ms); });

async function main() {
  console.log('-----------------------User-----------------------');
  console.log('');
  await userTestAll();
  await sleep(500);
  console.log('');
  console.log('');
  console.log('-----------------------Group-----------------------');
  console.log('');
  await groupTestAll();
  await sleep(500);
  console.log('');
  console.log('');
  console.log('-----------------------Session-----------------------');
  console.log('');
  await sessionTestAll();
  await sleep(500);
  console.log('');
  console.log('');
  console.log('-----------------------Ban-----------------------');
  console.log('');
  await banTestAll();
  await sleep(500);
  console.log('');
  console.log('');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
