/*
  Warnings:

  - Added the required column `file_path` to the `artwork_files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "artwork_files" ADD COLUMN     "file_path" VARCHAR(500) NOT NULL;
