/*
  Warnings:

  - You are about to alter the column `data_solicitacao` on the `tblDenuncia` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `data_solucao` on the `tblDenuncia` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `condicao` on the `tblemblema` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to drop the column `id_endereco` on the `tblempresa` table. All the data in the column will be lost.
  - You are about to alter the column `data_pagamento` on the `tblpagamento` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `juros` on the `tblpagamento` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `valor` on the `tblplanos` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `ultima_atualizacao` on the `tblprova` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `data_inicio` on the `tblprova_andamento` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `data_fim` on the `tblprova_andamento` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `data_entrega` on the `tblusuario_prova` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `id_empresa` to the `tblendereco_empresa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tblempresa` DROP FOREIGN KEY `tblempresa_id_endereco_fkey`;

-- AlterTable
ALTER TABLE `tblDenuncia` MODIFY `data_solicitacao` DATETIME NOT NULL,
    MODIFY `data_solucao` DATETIME NULL;

-- AlterTable
ALTER TABLE `tblemblema` MODIFY `condicao` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `tblempresa` DROP COLUMN `id_endereco`;

-- AlterTable
ALTER TABLE `tblendereco_empresa` ADD COLUMN `id_empresa` INTEGER NOT NULL;

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

-- AddForeignKey
ALTER TABLE `tblendereco_empresa` ADD CONSTRAINT `tblendereco_empresa_id_empresa_fkey` FOREIGN KEY (`id_empresa`) REFERENCES `tblempresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
