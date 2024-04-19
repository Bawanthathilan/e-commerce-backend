/*
  Warnings:

  - You are about to drop the column `stats` on the `order_events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order_events` DROP COLUMN `stats`,
    ADD COLUMN `status` ENUM('PENDING', 'ACCEPTED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELED') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `orders` ADD COLUMN `status` ENUM('PENDING', 'ACCEPTED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELED') NOT NULL DEFAULT 'PENDING';
