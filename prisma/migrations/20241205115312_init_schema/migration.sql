-- CreateEnum
CREATE TYPE "Tags" AS ENUM ('Important', 'Work', 'Personal', 'Meeting', 'Spam');

-- CreateTable
CREATE TABLE "Email" (
    "id" SERIAL NOT NULL,
    "body" TEXT NOT NULL,
    "tag" "Tags" NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Email_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Email_body_key" ON "Email"("body");
