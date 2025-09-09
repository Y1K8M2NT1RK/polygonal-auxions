-- CreateTable
CREATE TABLE "comment_ranks" (
    "id" SERIAL NOT NULL,
    "comment_id" INTEGER NOT NULL,
    "rank_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comment_ranks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "comment_ranks_comment_id_rank_id_user_id_key" ON "comment_ranks"("comment_id", "rank_id", "user_id");

-- AddForeignKey
ALTER TABLE "comment_ranks" ADD CONSTRAINT "comment_ranks_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_ranks" ADD CONSTRAINT "comment_ranks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_ranks" ADD CONSTRAINT "comment_ranks_rank_id_fkey" FOREIGN KEY ("rank_id") REFERENCES "ranks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;