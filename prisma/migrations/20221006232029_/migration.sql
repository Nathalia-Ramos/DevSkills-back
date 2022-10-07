/*
  Warnings:

  - You are about to alter the column `data_solicitacao` on the `tblDenuncia` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `data_solucao` on the `tblDenuncia` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `senha` on the `tbladministrador` table. All the data in the column will be lost.
  - You are about to alter the column `condicao` on the `tblemblema` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to drop the column `senha` on the `tblempresa` table. All the data in the column will be lost.
  - You are about to drop the column `login` on the `tbllogin_admin` table. All the data in the column will be lost.
  - You are about to drop the column `login` on the `tbllogin_empresa` table. All the data in the column will be lost.
  - You are about to drop the column `login` on the `tbllogin_usuario` table. All the data in the column will be lost.
  - You are about to alter the column `data_pagamento` on the `tblpagamento` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `juros` on the `tblpagamento` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `valor` on the `tblplanos` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `ultima_atualizacao` on the `tblprova` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `data_inicio` on the `tblprova_andamento` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `data_fim` on the `tblprova_andamento` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `senha` on the `tblusuario` table. All the data in the column will be lost.
  - You are about to alter the column `data_entrega` on the `tblusuario_prova` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `tblDenuncia` MODIFY `data_solicitacao` DATETIME NOT NULL,
    MODIFY `data_solucao` DATETIME NULL;

-- AlterTable
ALTER TABLE `tbladministrador` DROP COLUMN `senha`;

-- AlterTable
ALTER TABLE `tblemblema` MODIFY `condicao` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `tblempresa` DROP COLUMN `senha`;

-- AlterTable
ALTER TABLE `tbllogin_admin` DROP COLUMN `login`;

-- AlterTable
ALTER TABLE `tbllogin_empresa` DROP COLUMN `login`;

-- AlterTable
ALTER TABLE `tbllogin_usuario` DROP COLUMN `login`;

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
ALTER TABLE `tblusuario` DROP COLUMN `senha`;

-- AlterTable
ALTER TABLE `tblusuario_prova` MODIFY `data_entrega` DATETIME NULL;
