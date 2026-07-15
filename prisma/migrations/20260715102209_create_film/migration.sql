-- CreateTable
CREATE TABLE "Test Table" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Test Table_pkey" PRIMARY KEY ("id")
);
