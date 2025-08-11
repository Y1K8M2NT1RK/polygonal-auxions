/*
  Warnings:

  - You are about to drop the column `refresh_token` on the `auth_payload` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."auth_payload" DROP COLUMN "refresh_token";
