-- AlterTable
ALTER TABLE `profile` ADD COLUMN `address` VARCHAR(191) NULL,
    ADD COLUMN `country` VARCHAR(191) NULL,
    ADD COLUMN `email` VARCHAR(191) NULL,
    ADD COLUMN `facebook` VARCHAR(191) NULL,
    ADD COLUMN `github` VARCHAR(191) NULL,
    ADD COLUMN `isDefaultAddress` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `linkedin` VARCHAR(191) NULL,
    ADD COLUMN `location` VARCHAR(191) NULL,
    ADD COLUMN `phone` VARCHAR(191) NULL,
    ADD COLUMN `profession` VARCHAR(191) NULL,
    ADD COLUMN `twitter` VARCHAR(191) NULL,
    ADD COLUMN `website` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Referral` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `referralCode` VARCHAR(191) NOT NULL,
    `creditEarned` DOUBLE NOT NULL DEFAULT 0.0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Referral_userId_key`(`userId`),
    UNIQUE INDEX `Referral_referralCode_key`(`referralCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Referral` ADD CONSTRAINT `Referral_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Auth`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
