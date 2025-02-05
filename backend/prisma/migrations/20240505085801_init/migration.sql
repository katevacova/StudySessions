-- CreateTable
CREATE TABLE "Ban" (
    "id" TEXT NOT NULL,
    "expiration" TIMESTAMP(3) NOT NULL,
    "issued_by_id" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Ban_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL,
    "invitation_only" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupMembers" (
    "group_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "GroupMembers_pkey" PRIMARY KEY ("group_id","user_id")
);

-- CreateTable
CREATE TABLE "GroupSessions" (
    "group_id" TEXT NOT NULL,
    "session_id" TEXT NOT NULL,

    CONSTRAINT "GroupSessions_pkey" PRIMARY KEY ("group_id","session_id")
);

-- CreateTable
CREATE TABLE "LoginSessions" (
    "id" TEXT NOT NULL,
    "expiration" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "LoginSessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL,
    "description" TEXT NOT NULL,
    "ended_at" TIMESTAMP(3),
    "invitation_only" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "periodic" BOOLEAN NOT NULL,
    "repeat_period" TIMESTAMP(3),
    "scheduled_date" TIMESTAMP(3) NOT NULL,
    "started_at" TIMESTAMP(3),

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionMembers" (
    "session_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "SessionMembers_pkey" PRIMARY KEY ("session_id","user_id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "is_owner" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "pw_hash" TEXT NOT NULL,
    "pw_salt" TEXT NOT NULL,
    "settings" JSONB NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
