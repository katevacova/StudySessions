/*
  Warnings:

  - You are about to drop the column `pw_salt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "pw_salt";
