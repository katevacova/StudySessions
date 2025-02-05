/*
  Warnings:

  - You are about to drop the column `pw_hash` on the `Auth` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Auth` table. All the data in the column will be lost.
  - You are about to drop the column `issued_by_id` on the `Ban` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Ban` table. All the data in the column will be lost.
  - You are about to drop the column `owner_id` on the `Group` table. All the data in the column will be lost.
  - The primary key for the `GroupMembers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `group_id` on the `GroupMembers` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `GroupMembers` table. All the data in the column will be lost.
  - The primary key for the `GroupSessions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `group_id` on the `GroupSessions` table. All the data in the column will be lost.
  - You are about to drop the column `session_id` on the `GroupSessions` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `LoginSessions` table. All the data in the column will be lost.
  - You are about to drop the column `ended_at` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `group_id` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `repeat_period` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `scheduled_date` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `started_at` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `is_owner` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Auth` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pwHash` to the `Auth` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Auth` table without a default value. This is not possible if the table is not empty.
  - Added the required column `issuedById` to the `Ban` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Ban` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `GroupMembers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `GroupMembers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `GroupSessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionId` to the `GroupSessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `LoginSessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scheduledDate` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isOwner` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Auth" DROP CONSTRAINT "Auth_user_id_fkey";

-- DropForeignKey
ALTER TABLE "GroupMembers" DROP CONSTRAINT "GroupMembers_group_id_fkey";

-- DropForeignKey
ALTER TABLE "GroupMembers" DROP CONSTRAINT "GroupMembers_user_id_fkey";

-- DropForeignKey
ALTER TABLE "GroupSessions" DROP CONSTRAINT "GroupSessions_group_id_fkey";

-- DropForeignKey
ALTER TABLE "GroupSessions" DROP CONSTRAINT "GroupSessions_session_id_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_group_id_fkey";

-- DropIndex
DROP INDEX "Auth_user_id_key";

-- AlterTable
ALTER TABLE "Auth" DROP COLUMN "pw_hash",
DROP COLUMN "user_id",
ADD COLUMN     "pwHash" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Ban" DROP COLUMN "issued_by_id",
DROP COLUMN "user_id",
ADD COLUMN     "issuedById" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "owner_id",
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "GroupMembers" DROP CONSTRAINT "GroupMembers_pkey",
DROP COLUMN "group_id",
DROP COLUMN "user_id",
ADD COLUMN     "groupId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "GroupMembers_pkey" PRIMARY KEY ("groupId", "userId");

-- AlterTable
ALTER TABLE "GroupSessions" DROP CONSTRAINT "GroupSessions_pkey",
DROP COLUMN "group_id",
DROP COLUMN "session_id",
ADD COLUMN     "groupId" TEXT NOT NULL,
ADD COLUMN     "sessionId" TEXT NOT NULL,
ADD CONSTRAINT "GroupSessions_pkey" PRIMARY KEY ("groupId", "sessionId");

-- AlterTable
ALTER TABLE "LoginSessions" DROP COLUMN "user_id",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "ended_at",
DROP COLUMN "group_id",
DROP COLUMN "repeat_period",
DROP COLUMN "scheduled_date",
DROP COLUMN "started_at",
ADD COLUMN     "endedAt" TIMESTAMP(3),
ADD COLUMN     "groupId" TEXT NOT NULL,
ADD COLUMN     "repeatPeriod" TIMESTAMP(3),
ADD COLUMN     "scheduledDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "is_owner",
ADD COLUMN     "isOwner" BOOLEAN NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Auth_userId_key" ON "Auth"("userId");

-- AddForeignKey
ALTER TABLE "GroupMembers" ADD CONSTRAINT "GroupMembers_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMembers" ADD CONSTRAINT "GroupMembers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupSessions" ADD CONSTRAINT "GroupSessions_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupSessions" ADD CONSTRAINT "GroupSessions_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
