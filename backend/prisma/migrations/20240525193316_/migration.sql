/*
  Warnings:

  - You are about to drop the column `deleted` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `invitation_only` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `invitation_only` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `owner_id` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the `SessionMembers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `subject` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `group_id` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Group" DROP COLUMN "deleted",
DROP COLUMN "invitation_only",
ADD COLUMN     "subject" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "deleted",
DROP COLUMN "description",
DROP COLUMN "invitation_only",
DROP COLUMN "owner_id",
ADD COLUMN     "group_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "SessionMembers";

-- AddForeignKey
ALTER TABLE "GroupMembers" ADD CONSTRAINT "GroupMembers_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMembers" ADD CONSTRAINT "GroupMembers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupSessions" ADD CONSTRAINT "GroupSessions_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupSessions" ADD CONSTRAINT "GroupSessions_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
