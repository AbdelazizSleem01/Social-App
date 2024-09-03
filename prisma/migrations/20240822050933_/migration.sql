/*
  Warnings:

  - You are about to drop the column `covsr` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `covsr`,
    ADD COLUMN `cover` VARCHAR(191) NULL;
