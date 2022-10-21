/*
  Warnings:

  - You are about to alter the column `data_solicitacao` on the `tblDenuncia` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `data_solucao` on the `tblDenuncia` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `alternativa` on the `tblalternativa_teste_competencia` table. All the data in the column will be lost.
  - You are about to drop the column `alternativa_correta` on the `tblalternativa_teste_competencia` table. All the data in the column will be lost.
  - You are about to alter the column `nome` on the `tblcidade` table. The data in that column could be lost. The data in that column will be cast from `VarChar(80)` to `VarChar(45)`.
  - You are about to alter the column `condicao` on the `tblemblema` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `numero` on the `tblempresa_telefone` table. The data in that column could be lost. The data in that column will be cast from `VarChar(22)` to `VarChar(12)`.
  - You are about to alter the column `nome` on the `tblidioma` table. The data in that column could be lost. The data in that column will be cast from `VarChar(80)` to `VarChar(30)`.
  - You are about to alter the column `data_pagamento` on the `tblpagamento` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `juros` on the `tblpagamento` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `valor` on the `tblplanos` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `ultima_atualizacao` on the `tblprova` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `data_inicio` on the `tblprova_andamento` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `data_fim` on the `tblprova_andamento` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `id_questao` on the `tblresposta_alternativa_prova` table. All the data in the column will be lost.
  - You are about to drop the column `id_questao` on the `tblresposta_questao_prova` table. All the data in the column will be lost.
  - You are about to alter the column `tag` on the `tblusuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(45)` to `VarChar(20)`.
  - You are about to alter the column `data_entrega` on the `tblusuario_prova` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `descricao_resultado` on the `tblusuario_teste_comportamental` table. All the data in the column will be lost.
  - You are about to drop the column `resultado` on the `tblusuario_teste_comportamental` table. All the data in the column will be lost.
  - You are about to drop the `tbldenuncia_admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tblteste_competencia_stack` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_perfil_comportamental` to the `tblalternativa_comportamental` table without a default value. This is not possible if the table is not empty.
  - Added the required column `correta` to the `tblalternativa_teste_competencia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `opcao` to the `tblalternativa_teste_competencia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descricao` to the `tblteste_competencia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_stack` to the `tblteste_comportamental` table without a default value. This is not possible if the table is not empty.
  - Added the required column `permissa_email` to the `tblusuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_perfil_comportamental` to the `tblusuario_teste_comportamental` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tbldenuncia_admin` DROP FOREIGN KEY `tbldenuncia_admin_id_administrador_fkey`;

-- DropForeignKey
ALTER TABLE `tbldenuncia_admin` DROP FOREIGN KEY `tbldenuncia_admin_id_denuncia_fkey`;

-- DropForeignKey
ALTER TABLE `tblresposta_alternativa_prova` DROP FOREIGN KEY `tblresposta_alternativa_prova_id_questao_fkey`;

-- DropForeignKey
ALTER TABLE `tblresposta_questao_prova` DROP FOREIGN KEY `tblresposta_questao_prova_id_questao_fkey`;

-- DropForeignKey
ALTER TABLE `tblteste_competencia_stack` DROP FOREIGN KEY `tblteste_competencia_stack_id_stack_fkey`;

-- DropForeignKey
ALTER TABLE `tblteste_competencia_stack` DROP FOREIGN KEY `tblteste_competencia_stack_id_teste_fkey`;

-- AlterTable
ALTER TABLE `tblDenuncia` MODIFY `descricao` TEXT NOT NULL,
    MODIFY `data_solicitacao` DATETIME NOT NULL,
    MODIFY `data_solucao` DATETIME NULL;

-- AlterTable
ALTER TABLE `tblalternativa_comportamental` ADD COLUMN `id_perfil_comportamental` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `tblalternativa_teste_competencia` DROP COLUMN `alternativa`,
    DROP COLUMN `alternativa_correta`,
    ADD COLUMN `correta` BOOLEAN NOT NULL,
    ADD COLUMN `opcao` VARCHAR(180) NOT NULL;

-- AlterTable
ALTER TABLE `tblcidade` MODIFY `nome` VARCHAR(45) NOT NULL;

-- AlterTable
ALTER TABLE `tbldenuncia_motivos` MODIFY `nome` VARCHAR(150) NOT NULL;

-- AlterTable
ALTER TABLE `tblemblema` MODIFY `icone` TEXT NOT NULL,
    MODIFY `condicao` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `tblempresa_telefone` MODIFY `numero` VARCHAR(12) NOT NULL;

-- AlterTable
ALTER TABLE `tblendereco_usuario` MODIFY `complemento` VARCHAR(100) NULL;

-- AlterTable
ALTER TABLE `tblfotos` MODIFY `foto` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `tblfotos_ambiente` MODIFY `foto` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `tblhabilidade` MODIFY `icone` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `tblidioma` MODIFY `nome` VARCHAR(30) NOT NULL;

-- AlterTable
ALTER TABLE `tblpagamento` MODIFY `data_pagamento` DATETIME NOT NULL,
    MODIFY `juros` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `tblpagamento_pix` MODIFY `chave` TEXT NULL;

-- AlterTable
ALTER TABLE `tblplanos` MODIFY `valor` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `tblprova` MODIFY `link_repositorio` TEXT NULL,
    MODIFY `ultima_atualizacao` DATETIME NULL;

-- AlterTable
ALTER TABLE `tblprova_andamento` MODIFY `data_inicio` DATETIME NOT NULL,
    MODIFY `data_fim` DATETIME NOT NULL,
    MODIFY `duracao` TIME NULL;

-- AlterTable
ALTER TABLE `tblquestao_prova` MODIFY `foto` TEXT NULL;

-- AlterTable
ALTER TABLE `tblquestao_teste_competencia` MODIFY `enunciado` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `tblresposta_alternativa_prova` DROP COLUMN `id_questao`;

-- AlterTable
ALTER TABLE `tblresposta_questao_prova` DROP COLUMN `id_questao`;

-- AlterTable
ALTER TABLE `tblteste_competencia` ADD COLUMN `descricao` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `tblteste_comportamental` ADD COLUMN `id_stack` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `tblusuario` ADD COLUMN `permissa_email` BOOLEAN NOT NULL,
    MODIFY `tag` VARCHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE `tblusuario_prova` MODIFY `data_entrega` DATETIME NULL;

-- AlterTable
ALTER TABLE `tblusuario_teste_comportamental` DROP COLUMN `descricao_resultado`,
    DROP COLUMN `resultado`,
    ADD COLUMN `id_perfil_comportamental` INTEGER NOT NULL;

-- DropTable
DROP TABLE `tbldenuncia_admin`;

-- DropTable
DROP TABLE `tblteste_competencia_stack`;

-- CreateTable
CREATE TABLE `tblseguidores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_empresa` INTEGER NOT NULL,
    `id_usuario` INTEGER NOT NULL,

    UNIQUE INDEX `tblseguidores_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbladmin_denuncia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `resposta` TEXT NOT NULL,
    `resolvida` BOOLEAN NOT NULL,
    `id_administrador` INTEGER NOT NULL,
    `id_denuncia` INTEGER NOT NULL,

    UNIQUE INDEX `tbladmin_denuncia_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblteste_comportamental_grupo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_grupo` INTEGER NOT NULL,
    `id_teste_comportamental` INTEGER NOT NULL,

    UNIQUE INDEX `tblteste_comportamental_grupo_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblperfil_comportamental` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` TEXT NOT NULL,
    `resultado` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `tblperfil_comportamental_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tblseguidores` ADD CONSTRAINT `tblseguidores_id_empresa_fkey` FOREIGN KEY (`id_empresa`) REFERENCES `tblempresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblseguidores` ADD CONSTRAINT `tblseguidores_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tblusuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbladmin_denuncia` ADD CONSTRAINT `tbladmin_denuncia_id_administrador_fkey` FOREIGN KEY (`id_administrador`) REFERENCES `tbladministrador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbladmin_denuncia` ADD CONSTRAINT `tbladmin_denuncia_id_denuncia_fkey` FOREIGN KEY (`id_denuncia`) REFERENCES `tblDenuncia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblteste_comportamental` ADD CONSTRAINT `tblteste_comportamental_id_stack_fkey` FOREIGN KEY (`id_stack`) REFERENCES `tblstack`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblteste_comportamental_grupo` ADD CONSTRAINT `tblteste_comportamental_grupo_id_grupo_fkey` FOREIGN KEY (`id_grupo`) REFERENCES `tblgrupo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblteste_comportamental_grupo` ADD CONSTRAINT `tblteste_comportamental_grupo_id_teste_comportamental_fkey` FOREIGN KEY (`id_teste_comportamental`) REFERENCES `tblteste_comportamental`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblusuario_teste_comportamental` ADD CONSTRAINT `tblusuario_teste_comportamental_id_perfil_comportamental_fkey` FOREIGN KEY (`id_perfil_comportamental`) REFERENCES `tblperfil_comportamental`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblalternativa_comportamental` ADD CONSTRAINT `tblalternativa_comportamental_id_perfil_comportamental_fkey` FOREIGN KEY (`id_perfil_comportamental`) REFERENCES `tblperfil_comportamental`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
