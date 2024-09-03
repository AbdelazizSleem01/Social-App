/*
  Warnings:

  - You are about to drop the column `cover` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `cover`,
    ADD COLUMN `covsr` VARCHAR(191) NULL;
