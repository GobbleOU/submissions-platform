/*
  Warnings:

  - Added the required column `countryProduction` to the `films` table without a default value. This is not possible if the table is not empty.
  - Added the required column `director` to the `films` table without a default value. This is not possible if the table is not empty.
  - Added the required column `format` to the `films` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genre` to the `films` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languages` to the `films` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logline` to the `films` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productionCompany` to the `films` table without a default value. This is not possible if the table is not empty.
  - Added the required column `runtime` to the `films` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortSynopsis` to the `films` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `films` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `films` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "films" ADD COLUMN     "completionDate" TIMESTAMP(3),
ADD COLUMN     "countryProduction" TEXT NOT NULL,
ADD COLUMN     "director" TEXT NOT NULL,
ADD COLUMN     "format" TEXT NOT NULL,
ADD COLUMN     "genre" TEXT NOT NULL,
ADD COLUMN     "internationalPremiereStatus" TEXT,
ADD COLUMN     "languages" TEXT NOT NULL,
ADD COLUMN     "logline" TEXT NOT NULL,
ADD COLUMN     "originalTitle" TEXT,
ADD COLUMN     "ownerId" TEXT,
ADD COLUMN     "previousFestivalSelections" TEXT,
ADD COLUMN     "productionCompany" TEXT NOT NULL,
ADD COLUMN     "runtime" INTEGER NOT NULL,
ADD COLUMN     "shortSynopsis" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "worldPremiereStatus" TEXT,
ADD COLUMN     "year" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "image" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "films_ownerId_idx" ON "films"("ownerId");

-- AddForeignKey
ALTER TABLE "films" ADD CONSTRAINT "films_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
