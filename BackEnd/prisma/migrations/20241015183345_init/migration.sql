-- CreateTable
CREATE TABLE `Report` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fileName` VARCHAR(191) NULL,
    `aiPercentage` DOUBLE NULL,
    `similarityPercentage` DOUBLE NULL,
    `status` VARCHAR(191) NULL,
    `date` DATETIME(3) NULL,
    `submittedFileUrl` VARCHAR(191) NULL,
    `plagReportUrl` VARCHAR(191) NULL,
    `aiReportUrl` VARCHAR(191) NULL,
    `plagFilePath` VARCHAR(191) NULL,
    `aiFilePath` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Auth`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
