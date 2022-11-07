/*
  Warnings:

  - You are about to alter the column `data_solicitacao` on the `tbldenuncia` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `data_solucao` on the `tbldenuncia` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `condicao` on the `tblemblema` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `data_pagamento` on the `tblpagamento` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `juros` on the `tblpagamento` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `valor` on the `tblplanos` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `ultima_atualizacao` on the `tblprova` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `data_inicio` on the `tblprova_andamento` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `data_fim` on the `tblprova_andamento` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `data_entrega` on the `tblusuario_prova` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `tblfotos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `data_inicio` to the `tblusuario_prova` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tbldenuncia` DROP FOREIGN KEY `tblDenuncia_id_prova_usuario_fkey`;

-- DropForeignKey
ALTER TABLE `tblfotos` DROP FOREIGN KEY `tblfotos_id_denuncia_fkey`;

-- AlterTable
ALTER TABLE `tbldenuncia` MODIFY `data_solicitacao` DATETIME NOT NULL,
    MODIFY `data_solucao` DATETIME NULL;

-- AlterTable
ALTER TABLE `tblemblema` MODIFY `condicao` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `tblpagamento` MODIFY `data_pagamento` DATETIME NOT NULL,
    MODIFY `juros` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `tblplanos` MODIFY `valor` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `tblprova` MODIFY `ultima_atualizacao` DATETIME NULL;

-- AlterTable
ALTER TABLE `tblprova_andamento` MODIFY `data_inicio` DATETIME NOT NULL,
    MODIFY `data_fim` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `tblusuario_prova` ADD COLUMN `data_inicio` DATETIME NOT NULL,
    MODIFY `data_entrega` DATETIME NULL;

-- DropTable
DROP TABLE `tblfotos`;

-- CreateTable
CREATE TABLE `tblfotos_denuncia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `foto` TEXT NOT NULL,
    `id_denuncia` INTEGER NOT NULL,

    UNIQUE INDEX `tblfotos_denuncia_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbldenuncia` ADD CONSTRAINT `tbldenuncia_id_prova_usuario_fkey` FOREIGN KEY (`id_prova_usuario`) REFERENCES `tblusuario_prova`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblfotos_denuncia` ADD CONSTRAINT `tblfotos_denuncia_id_denuncia_fkey` FOREIGN KEY (`id_denuncia`) REFERENCES `tbldenuncia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `tbldenuncia` RENAME INDEX `tblDenuncia_id_key` TO `tbldenuncia_id_key`;
