/*
  Warnings:

  - You are about to alter the column `data_pagamento` on the `tblpagamento` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `juros` on the `tblpagamento` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `valor` on the `tblplanos` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - Added the required column `id_pagamento` to the `tblpagamento_cartao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tblpagamento` MODIFY `data_pagamento` DATETIME NOT NULL,
    MODIFY `juros` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `tblpagamento_cartao` ADD COLUMN `id_pagamento` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `tblplanos` MODIFY `valor` DECIMAL NOT NULL;

-- CreateTable
CREATE TABLE `tblteste_competencia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(50) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `id_administrador` INTEGER NOT NULL,
    `id_emblema` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tblteste_competencia_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblemblema` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `icone` VARCHAR(60) NOT NULL,
    `titulo` VARCHAR(90) NOT NULL,
    `condicao` DECIMAL NOT NULL,

    UNIQUE INDEX `tblemblema_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbladministrador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(180) NOT NULL,
    `email` VARCHAR(110) NOT NULL,
    `senha` VARCHAR(45) NOT NULL,
    `ativo` BOOLEAN NOT NULL,
    `root` BOOLEAN NOT NULL,

    UNIQUE INDEX `tbladministrador_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblteste_comportamental` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(90) NOT NULL,
    `descricao` TEXT NOT NULL,

    UNIQUE INDEX `tblteste_comportamental_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblusuario_teste_comportamental` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `resultado` VARCHAR(45) NOT NULL,
    `descricao_resultado` TEXT NOT NULL,
    `id_teste_comportamental` INTEGER NOT NULL,
    `id_usuario` INTEGER NOT NULL,

    UNIQUE INDEX `tblusuario_teste_comportamental_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tblpagamento_cartao` ADD CONSTRAINT `tblpagamento_cartao_id_pagamento_fkey` FOREIGN KEY (`id_pagamento`) REFERENCES `tblpagamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblteste_competencia` ADD CONSTRAINT `tblteste_competencia_id_administrador_fkey` FOREIGN KEY (`id_administrador`) REFERENCES `tbladministrador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblteste_competencia` ADD CONSTRAINT `tblteste_competencia_id_emblema_fkey` FOREIGN KEY (`id_emblema`) REFERENCES `tblemblema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblusuario_teste_comportamental` ADD CONSTRAINT `tblusuario_teste_comportamental_id_teste_comportamental_fkey` FOREIGN KEY (`id_teste_comportamental`) REFERENCES `tblteste_comportamental`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblusuario_teste_comportamental` ADD CONSTRAINT `tblusuario_teste_comportamental_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tblusuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
