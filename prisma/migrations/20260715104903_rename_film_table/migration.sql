/*
  Warnings:

  - You are about to drop the `Test Table` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Test Table";

-- CreateTable
CREATE TABLE "films" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "films_pkey" PRIMARY KEY ("id")
);
