-- DropForeignKey
ALTER TABLE "artwork_ranks" DROP CONSTRAINT "artwork_ranks_rank_id_fkey";

-- DropForeignKey
ALTER TABLE "ranks" DROP CONSTRAINT "ranks_rank_type_id_fkey";

-- DropForeignKey
ALTER TABLE "user_files" DROP CONSTRAINT "user_files_purpose_id_fkey";

-- AddForeignKey
ALTER TABLE "user_files" ADD CONSTRAINT "user_files_purpose_id_fkey" FOREIGN KEY ("purpose_id") REFERENCES "purposes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "artwork_ranks" ADD CONSTRAINT "artwork_ranks_rank_id_fkey" FOREIGN KEY ("rank_id") REFERENCES "ranks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ranks" ADD CONSTRAINT "ranks_rank_type_id_fkey" FOREIGN KEY ("rank_type_id") REFERENCES "rank_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
