/*
  Warnings:

  - You are about to alter the column `aiPercentage` on the `report` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.
  - You are about to alter the column `similarityPercentage` on the `report` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.
  - Added the required column `methodId` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `report` MODIFY `aiPercentage` VARCHAR(191) NULL,
    MODIFY `similarityPercentage` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `subscription` ADD COLUMN `methodId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Method` (
    `methodId` INTEGER NOT NULL AUTO_INCREMENT,
    `methodWebsite` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'Active',
    `access` VARCHAR(191) NOT NULL,
    `multipleTaskRun` BOOLEAN NOT NULL DEFAULT false,
    `sortId` INTEGER NOT NULL,

    UNIQUE INDEX `Method_methodWebsite_key`(`methodWebsite`),
    PRIMARY KEY (`methodId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CCC` (
    `accountId` INTEGER NOT NULL AUTO_INCREMENT,
    `methodId` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'active',
    `access` VARCHAR(191) NOT NULL,
    `multipleTaskRun` BOOLEAN NOT NULL DEFAULT false,
    `useAccount` VARCHAR(191) NOT NULL,
    `totalLimit` INTEGER NOT NULL,
    `usedLimit` INTEGER NOT NULL,
    `remainingLimit` INTEGER NOT NULL,
    `refreshLimit` INTEGER NOT NULL,
    `subscriptionExpiresDate` DATETIME(3) NOT NULL,
    `sortId` INTEGER NOT NULL,

    UNIQUE INDEX `CCC_email_key`(`email`),
    PRIMARY KEY (`accountId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CCC` ADD CONSTRAINT `CCC_methodId_fkey` FOREIGN KEY (`methodId`) REFERENCES `Method`(`methodId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_methodId_fkey` FOREIGN KEY (`methodId`) REFERENCES `Method`(`methodId`) ON DELETE CASCADE ON UPDATE CASCADE;
