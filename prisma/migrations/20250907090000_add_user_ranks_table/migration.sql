-- CreateTable
CREATE TABLE "user_ranks" (
    "id" SERIAL NOT NULL,
    "reported_user_id" INTEGER NOT NULL,
    "rank_id" INTEGER NOT NULL,
    "reporter_user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_ranks_pkey" PRIMARY KEY ("id")
);

-- Unique composite index per schema definition
CREATE UNIQUE INDEX "user_ranks_reported_user_id_rank_id_reporter_user_id_key"
  ON "user_ranks" ("reported_user_id", "rank_id", "reporter_user_id");

-- Foreign Keys
ALTER TABLE "user_ranks"
  ADD CONSTRAINT "user_ranks_reported_user_id_fkey"
    FOREIGN KEY ("reported_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "user_ranks"
  ADD CONSTRAINT "user_ranks_reporter_user_id_fkey"
    FOREIGN KEY ("reporter_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "user_ranks"
  ADD CONSTRAINT "user_ranks_rank_id_fkey"
    FOREIGN KEY ("rank_id") REFERENCES "ranks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
