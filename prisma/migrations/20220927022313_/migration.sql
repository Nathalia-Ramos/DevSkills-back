/*
  Warnings:

  - You are about to alter the column `condicao` on the `tblemblema` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to drop the column `estrela` on the `tblfeedback` table. All the data in the column will be lost.
  - You are about to alter the column `data_pagamento` on the `tblpagamento` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `juros` on the `tblpagamento` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `valor` on the `tblplanos` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `ultima_atualizacao` on the `tblprova` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `data_inicio` on the `tblprova_andamento` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `data_fim` on the `tblprova_andamento` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `data_entrega` on the `tblusuario_prova` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `estrelas` to the `tblfeedback` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tblalternativa_prova` MODIFY `opcao` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `tblemblema` MODIFY `condicao` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `tblfeedback` DROP COLUMN `estrela`,
    ADD COLUMN `estrelas` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `tblpagamento` MODIFY `data_pagamento` DATETIME NOT NULL,
    MODIFY `juros` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `tblplanos` MODIFY `valor` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `tblprova` MODIFY `ultima_atualizacao` DATETIME NULL;

-- AlterTable
ALTER TABLE `tblprova_andamento` MODIFY `data_inicio` DATETIME NOT NULL,
    MODIFY `data_fim` DATETIME NOT NULL,
    MODIFY `duracao` TIME NULL;

-- AlterTable
ALTER TABLE `tblusuario_prova` MODIFY `data_entrega` DATETIME NULL;

-- CreateTable
CREATE TABLE `tbladministrador_provas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_administrador` INTEGER NOT NULL,
    `id_prova` INTEGER NOT NULL,

    UNIQUE INDEX `tbladministrador_provas_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbldenuncia_admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `resposta` TEXT NOT NULL,
    `resolvida` BOOLEAN NOT NULL,
    `id_administrador` INTEGER NOT NULL,
    `id_denuncia` INTEGER NOT NULL,

    UNIQUE INDEX `tbldenuncia_admin_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblDenuncia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(200) NOT NULL,
    `data_solicitacao` DATETIME NOT NULL,
    `data_solucao` DATETIME NULL,
    `status` BOOLEAN NOT NULL,
    `id_prova_usuario` INTEGER NOT NULL,

    UNIQUE INDEX `tblDenuncia_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblfotos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `foto` VARCHAR(100) NOT NULL,
    `id_denuncia` INTEGER NOT NULL,

    UNIQUE INDEX `tblfotos_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbldenuncia_todos_motivos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_denuncia` INTEGER NOT NULL,
    `id_denuncia_motivos` INTEGER NOT NULL,

    UNIQUE INDEX `tbldenuncia_todos_motivos_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbldenuncia_motivos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` TEXT NOT NULL,
    `ativo` BOOLEAN NOT NULL,

    UNIQUE INDEX `tbldenuncia_motivos_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbladministrador_provas` ADD CONSTRAINT `tbladministrador_provas_id_administrador_fkey` FOREIGN KEY (`id_administrador`) REFERENCES `tbladministrador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbladministrador_provas` ADD CONSTRAINT `tbladministrador_provas_id_prova_fkey` FOREIGN KEY (`id_prova`) REFERENCES `tblprova`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbldenuncia_admin` ADD CONSTRAINT `tbldenuncia_admin_id_administrador_fkey` FOREIGN KEY (`id_administrador`) REFERENCES `tbladministrador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbldenuncia_admin` ADD CONSTRAINT `tbldenuncia_admin_id_denuncia_fkey` FOREIGN KEY (`id_denuncia`) REFERENCES `tblDenuncia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblDenuncia` ADD CONSTRAINT `tblDenuncia_id_prova_usuario_fkey` FOREIGN KEY (`id_prova_usuario`) REFERENCES `tblusuario_prova`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblfotos` ADD CONSTRAINT `tblfotos_id_denuncia_fkey` FOREIGN KEY (`id_denuncia`) REFERENCES `tblDenuncia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbldenuncia_todos_motivos` ADD CONSTRAINT `tbldenuncia_todos_motivos_id_denuncia_fkey` FOREIGN KEY (`id_denuncia`) REFERENCES `tblDenuncia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbldenuncia_todos_motivos` ADD CONSTRAINT `tbldenuncia_todos_motivos_id_denuncia_motivos_fkey` FOREIGN KEY (`id_denuncia_motivos`) REFERENCES `tbldenuncia_motivos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
