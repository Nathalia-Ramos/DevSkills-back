-- CreateTable
CREATE TABLE `tblusuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(180) NOT NULL,
    `email` VARCHAR(110) NOT NULL,
    `cpf` VARCHAR(15) NOT NULL,
    `data_nascimento` DATE NOT NULL,
    `tag` VARCHAR(20) NOT NULL,
    `ativo` BOOLEAN NOT NULL,
    `pontuacao_plataforma` INTEGER NOT NULL,
    `foto_perfil` TEXT NULL,
    `biografia` TEXT NULL,
    `link_github` TEXT NULL,
    `link_portfolio` TEXT NULL,
    `permissao_email` BOOLEAN NOT NULL,
    `id_genero` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tblusuario_id_key`(`id`),
    UNIQUE INDEX `tblusuario_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbllogin_usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `senha` VARCHAR(60) NOT NULL,
    `id_usuario` INTEGER NOT NULL,

    UNIQUE INDEX `tbllogin_usuario_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblgenero` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(22) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tblgenero_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblusuario_telefone` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ddd` VARCHAR(2) NOT NULL,
    `numero` VARCHAR(10) NOT NULL,
    `id_tipo_telefone` INTEGER NOT NULL,
    `id_usuario` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tblusuario_telefone_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbltipo_telefone` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(20) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tbltipo_telefone_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblidioma` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `tblidioma_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblhabilidade_tipo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,
    `ativo` BOOLEAN NOT NULL,

    UNIQUE INDEX `tblhabilidade_tipo_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblstack` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `tblstack_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblhabilidade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,
    `icone` TEXT NOT NULL,
    `ativo` BOOLEAN NOT NULL,
    `id_stack` INTEGER NOT NULL,
    `id_habilidade_tipo` INTEGER NOT NULL,

    UNIQUE INDEX `tblhabilidade_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblusuario_habilidade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NOT NULL,
    `id_habilidade` INTEGER NOT NULL,

    UNIQUE INDEX `tblusuario_habilidade_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblusuario_stack` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NOT NULL,
    `id_stack` INTEGER NOT NULL,

    UNIQUE INDEX `tblusuario_stack_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblusuario_idioma` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_idioma` INTEGER NOT NULL,
    `id_usuario` INTEGER NOT NULL,

    UNIQUE INDEX `tblusuario_idioma_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblestado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `tblestado_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblcidade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,
    `id_estado` INTEGER NOT NULL,

    UNIQUE INDEX `tblcidade_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblendereco_usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `logradouro` VARCHAR(100) NOT NULL,
    `numero` VARCHAR(10) NOT NULL,
    `bairro` VARCHAR(120) NOT NULL,
    `cep` VARCHAR(15) NOT NULL,
    `complemento` VARCHAR(100) NULL,
    `id_cidade` INTEGER NOT NULL,
    `id_usuario` INTEGER NOT NULL,

    UNIQUE INDEX `tblendereco_usuario_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblendereco_empresa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `logradouro` VARCHAR(100) NOT NULL,
    `numero` VARCHAR(10) NOT NULL,
    `bairro` VARCHAR(120) NOT NULL,
    `cep` VARCHAR(15) NOT NULL,
    `complemento` VARCHAR(45) NULL,
    `id_cidade` INTEGER NOT NULL,

    UNIQUE INDEX `tblendereco_empresa_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblplanos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(40) NOT NULL,
    `valor` DECIMAL NOT NULL,
    `ativo` BOOLEAN NOT NULL,

    UNIQUE INDEX `tblplanos_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblassinatura` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_inicio` DATE NOT NULL,
    `data_fim` DATE NOT NULL,
    `renovacao_automatica` BOOLEAN NOT NULL,
    `id_plano` INTEGER NOT NULL,
    `id_empresa` INTEGER NOT NULL,

    UNIQUE INDEX `tblassinatura_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblpagamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_pagamento` DATETIME NOT NULL,
    `juros` DECIMAL NOT NULL,
    `id_assinatura` INTEGER NOT NULL,

    UNIQUE INDEX `tblpagamento_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblbeneficio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` TEXT NOT NULL,

    UNIQUE INDEX `tblbeneficio_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblplano_beneficio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_plano` INTEGER NOT NULL,
    `id_beneficio` INTEGER NOT NULL,

    UNIQUE INDEX `tblplano_beneficio_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblpagamento_pix` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `chave` TEXT NULL,
    `qrcode` TEXT NULL,
    `id_pagamento` INTEGER NOT NULL,

    UNIQUE INDEX `tblpagamento_pix_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblpagamento_cartao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_validade` DATE NOT NULL,
    `id_bandeira` INTEGER NOT NULL,
    `id_pagamento` INTEGER NOT NULL,

    UNIQUE INDEX `tblpagamento_cartao_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblcartao_bandeira` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `tblcartao_bandeira_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblcartao_forma` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cartao` INTEGER NOT NULL,
    `id_forma` INTEGER NOT NULL,

    UNIQUE INDEX `tblcartao_forma_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblforma_pagamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `tblforma_pagamento_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblempresa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cnpj` VARCHAR(14) NOT NULL,
    `email` VARCHAR(180) NOT NULL,
    `nome_fantasia` VARCHAR(180) NOT NULL,
    `ativo` BOOLEAN NOT NULL,
    `biografia` TEXT NULL,
    `logo` TEXT NULL,
    `id_endereco` INTEGER NOT NULL,

    UNIQUE INDEX `tblempresa_id_key`(`id`),
    UNIQUE INDEX `tblempresa_cnpj_key`(`cnpj`),
    UNIQUE INDEX `tblempresa_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblseguidores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_empresa` INTEGER NOT NULL,
    `id_usuario` INTEGER NOT NULL,

    UNIQUE INDEX `tblseguidores_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbllogin_empresa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `senha` VARCHAR(60) NOT NULL,
    `id_empresa` INTEGER NOT NULL,

    UNIQUE INDEX `tbllogin_empresa_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblprova_andamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_inicio` DATETIME NOT NULL,
    `data_fim` DATETIME NOT NULL,
    `duracao` VARCHAR(8) NULL,
    `id_empresa` INTEGER NOT NULL,
    `id_prova` INTEGER NOT NULL,

    UNIQUE INDEX `tblprova_andamento_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblempresa_telefone` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ddd` VARCHAR(2) NOT NULL,
    `numero` VARCHAR(12) NOT NULL,
    `id_empresa` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tblempresa_telefone_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblfotos_ambiente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `foto` TEXT NOT NULL,
    `legenda` VARCHAR(45) NOT NULL,
    `id_empresa` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tblfotos_ambiente_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblavaliacoes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `estrelas` INTEGER NOT NULL,
    `comentario` TEXT NOT NULL,
    `id_empresa` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tblavaliacoes_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblteste_competencia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(50) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `descricao` TEXT NOT NULL,
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
    `icone` TEXT NOT NULL,
    `titulo` VARCHAR(90) NOT NULL,
    `condicao` DECIMAL NOT NULL,

    UNIQUE INDEX `tblemblema_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblteste_competencia_habilidade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_teste` INTEGER NOT NULL,
    `id_habilidade` INTEGER NOT NULL,

    UNIQUE INDEX `tblteste_competencia_habilidade_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblquestao_teste_competencia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `enunciado` TEXT NOT NULL,

    UNIQUE INDEX `tblquestao_teste_competencia_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblteste_competencia_todas_questoes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_questao_teste` INTEGER NOT NULL,
    `id_teste` INTEGER NOT NULL,

    UNIQUE INDEX `tblteste_competencia_todas_questoes_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblalternativa_teste_competencia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `opcao` VARCHAR(180) NOT NULL,
    `correta` BOOLEAN NOT NULL,
    `id_questao` INTEGER NOT NULL,

    UNIQUE INDEX `tblalternativa_teste_competencia_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblresposta_teste_competencia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_alternativa` INTEGER NOT NULL,
    `id_usuario_teste` INTEGER NOT NULL,

    UNIQUE INDEX `tblresposta_teste_competencia_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblusuario_teste` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pontuacao` INTEGER NOT NULL,
    `id_usuario` INTEGER NOT NULL,
    `id_teste` INTEGER NOT NULL,

    UNIQUE INDEX `tblusuario_teste_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbltestes_competencia_salvos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_teste` INTEGER NOT NULL,
    `id_usuario` INTEGER NOT NULL,

    UNIQUE INDEX `tbltestes_competencia_salvos_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblteste_competencia_idioma` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_teste` INTEGER NOT NULL,
    `id_idioma` INTEGER NOT NULL,

    UNIQUE INDEX `tblteste_competencia_idioma_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbladministrador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(180) NOT NULL,
    `email` VARCHAR(110) NOT NULL,
    `ativo` BOOLEAN NOT NULL,
    `root` BOOLEAN NOT NULL,

    UNIQUE INDEX `tbladministrador_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbllogin_admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `senha` VARCHAR(60) NOT NULL,
    `id_administrador` INTEGER NOT NULL,

    UNIQUE INDEX `tbllogin_admin_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbladministrador_provas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_administrador` INTEGER NOT NULL,
    `id_prova` INTEGER NOT NULL,

    UNIQUE INDEX `tbladministrador_provas_id_key`(`id`),
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
CREATE TABLE `tbldenuncia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` TEXT NOT NULL,
    `data_solicitacao` DATETIME NOT NULL,
    `data_solucao` DATETIME NULL,
    `status` BOOLEAN NOT NULL,
    `id_prova_usuario` INTEGER NOT NULL,

    UNIQUE INDEX `tbldenuncia_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblfotos_denuncia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `foto` TEXT NOT NULL,
    `id_denuncia` INTEGER NOT NULL,

    UNIQUE INDEX `tblfotos_denuncia_id_key`(`id`),
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
    `nome` VARCHAR(150) NOT NULL,
    `ativo` BOOLEAN NOT NULL,

    UNIQUE INDEX `tbldenuncia_motivos_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblprova_tipo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `tblprova_tipo_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblprova` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(50) NOT NULL,
    `descricao` TEXT NOT NULL,
    `ativo` BOOLEAN NOT NULL,
    `link_repositorio` TEXT NULL,
    `ultima_atualizacao` DATETIME NULL,
    `id_tipo` INTEGER NOT NULL,

    UNIQUE INDEX `tblprova_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblprova_idioma` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_prova` INTEGER NOT NULL,
    `id_idioma` INTEGER NOT NULL,

    UNIQUE INDEX `tblprova_idioma_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblprova_stack` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_prova` INTEGER NOT NULL,
    `id_stack` INTEGER NOT NULL,

    UNIQUE INDEX `tblprova_stack_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblprova_habilidade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_prova` INTEGER NOT NULL,
    `id_habilidade` INTEGER NOT NULL,

    UNIQUE INDEX `tblprova_habilidade_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblfeedback` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `estrelas` INTEGER NOT NULL,
    `avaliacao` TEXT NOT NULL,
    `id_prova_usuario` INTEGER NOT NULL,

    UNIQUE INDEX `tblfeedback_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblusuario_prova` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `finalizada` BOOLEAN NOT NULL,
    `data_inicio` DATETIME NOT NULL,
    `data_entrega` DATETIME NULL,
    `pontuacao` INTEGER NULL,
    `id_usuario` INTEGER NOT NULL,
    `id_prova_andamento` INTEGER NOT NULL,

    UNIQUE INDEX `tblusuario_prova_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblprovas_salvas_usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_prova` INTEGER NOT NULL,
    `id_usuario` INTEGER NOT NULL,

    UNIQUE INDEX `tblprovas_salvas_usuario_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblresposta_questao_prova` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `resposta` TEXT NOT NULL,
    `correta` BOOLEAN NULL,
    `id_prova_usuario` INTEGER NOT NULL,
    `id_questao_prova` INTEGER NOT NULL,

    UNIQUE INDEX `tblresposta_questao_prova_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblquestao_prova_tipo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `tblquestao_prova_tipo_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblquestao_prova` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `enunciado` TEXT NOT NULL,
    `foto` TEXT NULL,
    `id_tipo` INTEGER NOT NULL,

    UNIQUE INDEX `tblquestao_prova_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblalternativa_prova` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `opcao` TEXT NOT NULL,
    `correta` BOOLEAN NOT NULL,
    `id_questao` INTEGER NOT NULL,

    UNIQUE INDEX `tblalternativa_prova_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblresposta_alternativa_prova` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_prova_usuario` INTEGER NOT NULL,
    `id_alternativa` INTEGER NOT NULL,

    UNIQUE INDEX `tblresposta_alternativa_prova_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblprova_todas_questoes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_questao_prova` INTEGER NOT NULL,
    `id_prova` INTEGER NOT NULL,

    UNIQUE INDEX `tblprova_todas_questoes_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblteste_comportamental` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(90) NOT NULL,
    `descricao` TEXT NOT NULL,
    `id_stack` INTEGER NOT NULL,

    UNIQUE INDEX `tblteste_comportamental_id_key`(`id`),
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

-- CreateTable
CREATE TABLE `tblusuario_teste_comportamental` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_teste_comportamental` INTEGER NOT NULL,
    `id_usuario` INTEGER NOT NULL,
    `id_perfil_comportamental` INTEGER NOT NULL,

    UNIQUE INDEX `tblusuario_teste_comportamental_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblquestao_teste_comportamental` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `enunciado` TEXT NOT NULL,
    `id_teste_comportamental` INTEGER NOT NULL,

    UNIQUE INDEX `tblquestao_teste_comportamental_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblalternativa_comportamental` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `opcao` VARCHAR(90) NOT NULL,
    `id_perfil_comportamental` INTEGER NOT NULL,
    `id_questao` INTEGER NOT NULL,

    UNIQUE INDEX `tblalternativa_comportamental_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblresposta_comportamental` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_teste_usuario` INTEGER NOT NULL,
    `id_alternativa` INTEGER NOT NULL,

    UNIQUE INDEX `tblresposta_comportamental_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblgrupo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `descricao` TEXT NOT NULL,

    UNIQUE INDEX `tblgrupo_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblprova_grupo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_prova_andamento` INTEGER NOT NULL,
    `id_grupo` INTEGER NOT NULL,

    UNIQUE INDEX `tblprova_grupo_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblgrupo_usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_grupo` INTEGER NOT NULL,
    `id_usuario` INTEGER NOT NULL,

    UNIQUE INDEX `tblgrupo_usuario_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblconvite_status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `tblconvite_status_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblconvite` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_convite_status` INTEGER NOT NULL,
    `id_usuario` INTEGER NOT NULL,
    `id_grupo` INTEGER NOT NULL,

    UNIQUE INDEX `tblconvite_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tblusuario` ADD CONSTRAINT `tblusuario_id_genero_fkey` FOREIGN KEY (`id_genero`) REFERENCES `tblgenero`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbllogin_usuario` ADD CONSTRAINT `tbllogin_usuario_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tblusuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblusuario_telefone` ADD CONSTRAINT `tblusuario_telefone_id_tipo_telefone_fkey` FOREIGN KEY (`id_tipo_telefone`) REFERENCES `tbltipo_telefone`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblusuario_telefone` ADD CONSTRAINT `tblusuario_telefone_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tblusuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblhabilidade` ADD CONSTRAINT `tblhabilidade_id_stack_fkey` FOREIGN KEY (`id_stack`) REFERENCES `tblstack`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblhabilidade` ADD CONSTRAINT `tblhabilidade_id_habilidade_tipo_fkey` FOREIGN KEY (`id_habilidade_tipo`) REFERENCES `tblhabilidade_tipo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblusuario_habilidade` ADD CONSTRAINT `tblusuario_habilidade_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tblusuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblusuario_habilidade` ADD CONSTRAINT `tblusuario_habilidade_id_habilidade_fkey` FOREIGN KEY (`id_habilidade`) REFERENCES `tblhabilidade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblusuario_stack` ADD CONSTRAINT `tblusuario_stack_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tblusuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblusuario_stack` ADD CONSTRAINT `tblusuario_stack_id_stack_fkey` FOREIGN KEY (`id_stack`) REFERENCES `tblstack`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblusuario_idioma` ADD CONSTRAINT `tblusuario_idioma_id_idioma_fkey` FOREIGN KEY (`id_idioma`) REFERENCES `tblidioma`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblusuario_idioma` ADD CONSTRAINT `tblusuario_idioma_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tblusuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblcidade` ADD CONSTRAINT `tblcidade_id_estado_fkey` FOREIGN KEY (`id_estado`) REFERENCES `tblestado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblendereco_usuario` ADD CONSTRAINT `tblendereco_usuario_id_cidade_fkey` FOREIGN KEY (`id_cidade`) REFERENCES `tblcidade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblendereco_usuario` ADD CONSTRAINT `tblendereco_usuario_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tblusuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblendereco_empresa` ADD CONSTRAINT `tblendereco_empresa_id_cidade_fkey` FOREIGN KEY (`id_cidade`) REFERENCES `tblcidade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblassinatura` ADD CONSTRAINT `tblassinatura_id_plano_fkey` FOREIGN KEY (`id_plano`) REFERENCES `tblplanos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblassinatura` ADD CONSTRAINT `tblassinatura_id_empresa_fkey` FOREIGN KEY (`id_empresa`) REFERENCES `tblempresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblpagamento` ADD CONSTRAINT `tblpagamento_id_assinatura_fkey` FOREIGN KEY (`id_assinatura`) REFERENCES `tblassinatura`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblplano_beneficio` ADD CONSTRAINT `tblplano_beneficio_id_plano_fkey` FOREIGN KEY (`id_plano`) REFERENCES `tblplanos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblplano_beneficio` ADD CONSTRAINT `tblplano_beneficio_id_beneficio_fkey` FOREIGN KEY (`id_beneficio`) REFERENCES `tblbeneficio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblpagamento_pix` ADD CONSTRAINT `tblpagamento_pix_id_pagamento_fkey` FOREIGN KEY (`id_pagamento`) REFERENCES `tblpagamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblpagamento_cartao` ADD CONSTRAINT `tblpagamento_cartao_id_bandeira_fkey` FOREIGN KEY (`id_bandeira`) REFERENCES `tblcartao_bandeira`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblpagamento_cartao` ADD CONSTRAINT `tblpagamento_cartao_id_pagamento_fkey` FOREIGN KEY (`id_pagamento`) REFERENCES `tblpagamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblcartao_forma` ADD CONSTRAINT `tblcartao_forma_id_cartao_fkey` FOREIGN KEY (`id_cartao`) REFERENCES `tblpagamento_cartao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblcartao_forma` ADD CONSTRAINT `tblcartao_forma_id_forma_fkey` FOREIGN KEY (`id_forma`) REFERENCES `tblforma_pagamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblempresa` ADD CONSTRAINT `tblempresa_id_endereco_fkey` FOREIGN KEY (`id_endereco`) REFERENCES `tblendereco_empresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblseguidores` ADD CONSTRAINT `tblseguidores_id_empresa_fkey` FOREIGN KEY (`id_empresa`) REFERENCES `tblempresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblseguidores` ADD CONSTRAINT `tblseguidores_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tblusuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbllogin_empresa` ADD CONSTRAINT `tbllogin_empresa_id_empresa_fkey` FOREIGN KEY (`id_empresa`) REFERENCES `tblempresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblprova_andamento` ADD CONSTRAINT `tblprova_andamento_id_empresa_fkey` FOREIGN KEY (`id_empresa`) REFERENCES `tblempresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblprova_andamento` ADD CONSTRAINT `tblprova_andamento_id_prova_fkey` FOREIGN KEY (`id_prova`) REFERENCES `tblprova`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblempresa_telefone` ADD CONSTRAINT `tblempresa_telefone_id_empresa_fkey` FOREIGN KEY (`id_empresa`) REFERENCES `tblempresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblfotos_ambiente` ADD CONSTRAINT `tblfotos_ambiente_id_empresa_fkey` FOREIGN KEY (`id_empresa`) REFERENCES `tblempresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblavaliacoes` ADD CONSTRAINT `tblavaliacoes_id_empresa_fkey` FOREIGN KEY (`id_empresa`) REFERENCES `tblempresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblteste_competencia` ADD CONSTRAINT `tblteste_competencia_id_administrador_fkey` FOREIGN KEY (`id_administrador`) REFERENCES `tbladministrador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblteste_competencia` ADD CONSTRAINT `tblteste_competencia_id_emblema_fkey` FOREIGN KEY (`id_emblema`) REFERENCES `tblemblema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblteste_competencia_habilidade` ADD CONSTRAINT `tblteste_competencia_habilidade_id_teste_fkey` FOREIGN KEY (`id_teste`) REFERENCES `tblteste_competencia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblteste_competencia_habilidade` ADD CONSTRAINT `tblteste_competencia_habilidade_id_habilidade_fkey` FOREIGN KEY (`id_habilidade`) REFERENCES `tblhabilidade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblteste_competencia_todas_questoes` ADD CONSTRAINT `tblteste_competencia_todas_questoes_id_questao_teste_fkey` FOREIGN KEY (`id_questao_teste`) REFERENCES `tblquestao_teste_competencia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblteste_competencia_todas_questoes` ADD CONSTRAINT `tblteste_competencia_todas_questoes_id_teste_fkey` FOREIGN KEY (`id_teste`) REFERENCES `tblteste_competencia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblalternativa_teste_competencia` ADD CONSTRAINT `tblalternativa_teste_competencia_id_questao_fkey` FOREIGN KEY (`id_questao`) REFERENCES `tblquestao_teste_competencia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblresposta_teste_competencia` ADD CONSTRAINT `tblresposta_teste_competencia_id_alternativa_fkey` FOREIGN KEY (`id_alternativa`) REFERENCES `tblalternativa_teste_competencia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblresposta_teste_competencia` ADD CONSTRAINT `tblresposta_teste_competencia_id_usuario_teste_fkey` FOREIGN KEY (`id_usuario_teste`) REFERENCES `tblusuario_teste`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblusuario_teste` ADD CONSTRAINT `tblusuario_teste_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tblusuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblusuario_teste` ADD CONSTRAINT `tblusuario_teste_id_teste_fkey` FOREIGN KEY (`id_teste`) REFERENCES `tblteste_competencia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbltestes_competencia_salvos` ADD CONSTRAINT `tbltestes_competencia_salvos_id_teste_fkey` FOREIGN KEY (`id_teste`) REFERENCES `tblteste_competencia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbltestes_competencia_salvos` ADD CONSTRAINT `tbltestes_competencia_salvos_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tblusuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblteste_competencia_idioma` ADD CONSTRAINT `tblteste_competencia_idioma_id_teste_fkey` FOREIGN KEY (`id_teste`) REFERENCES `tblteste_competencia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblteste_competencia_idioma` ADD CONSTRAINT `tblteste_competencia_idioma_id_idioma_fkey` FOREIGN KEY (`id_idioma`) REFERENCES `tblidioma`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbllogin_admin` ADD CONSTRAINT `tbllogin_admin_id_administrador_fkey` FOREIGN KEY (`id_administrador`) REFERENCES `tbladministrador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbladministrador_provas` ADD CONSTRAINT `tbladministrador_provas_id_administrador_fkey` FOREIGN KEY (`id_administrador`) REFERENCES `tbladministrador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbladministrador_provas` ADD CONSTRAINT `tbladministrador_provas_id_prova_fkey` FOREIGN KEY (`id_prova`) REFERENCES `tblprova`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbladmin_denuncia` ADD CONSTRAINT `tbladmin_denuncia_id_administrador_fkey` FOREIGN KEY (`id_administrador`) REFERENCES `tbladministrador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbladmin_denuncia` ADD CONSTRAINT `tbladmin_denuncia_id_denuncia_fkey` FOREIGN KEY (`id_denuncia`) REFERENCES `tbldenuncia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbldenuncia` ADD CONSTRAINT `tbldenuncia_id_prova_usuario_fkey` FOREIGN KEY (`id_prova_usuario`) REFERENCES `tblusuario_prova`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblfotos_denuncia` ADD CONSTRAINT `tblfotos_denuncia_id_denuncia_fkey` FOREIGN KEY (`id_denuncia`) REFERENCES `tbldenuncia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbldenuncia_todos_motivos` ADD CONSTRAINT `tbldenuncia_todos_motivos_id_denuncia_fkey` FOREIGN KEY (`id_denuncia`) REFERENCES `tbldenuncia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbldenuncia_todos_motivos` ADD CONSTRAINT `tbldenuncia_todos_motivos_id_denuncia_motivos_fkey` FOREIGN KEY (`id_denuncia_motivos`) REFERENCES `tbldenuncia_motivos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblprova` ADD CONSTRAINT `tblprova_id_tipo_fkey` FOREIGN KEY (`id_tipo`) REFERENCES `tblprova_tipo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblprova_idioma` ADD CONSTRAINT `tblprova_idioma_id_prova_fkey` FOREIGN KEY (`id_prova`) REFERENCES `tblprova`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblprova_idioma` ADD CONSTRAINT `tblprova_idioma_id_idioma_fkey` FOREIGN KEY (`id_idioma`) REFERENCES `tblidioma`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblprova_stack` ADD CONSTRAINT `tblprova_stack_id_prova_fkey` FOREIGN KEY (`id_prova`) REFERENCES `tblprova`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblprova_stack` ADD CONSTRAINT `tblprova_stack_id_stack_fkey` FOREIGN KEY (`id_stack`) REFERENCES `tblstack`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblprova_habilidade` ADD CONSTRAINT `tblprova_habilidade_id_prova_fkey` FOREIGN KEY (`id_prova`) REFERENCES `tblprova`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblprova_habilidade` ADD CONSTRAINT `tblprova_habilidade_id_habilidade_fkey` FOREIGN KEY (`id_habilidade`) REFERENCES `tblhabilidade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblfeedback` ADD CONSTRAINT `tblfeedback_id_prova_usuario_fkey` FOREIGN KEY (`id_prova_usuario`) REFERENCES `tblusuario_prova`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblusuario_prova` ADD CONSTRAINT `tblusuario_prova_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tblusuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblusuario_prova` ADD CONSTRAINT `tblusuario_prova_id_prova_andamento_fkey` FOREIGN KEY (`id_prova_andamento`) REFERENCES `tblprova_andamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblprovas_salvas_usuario` ADD CONSTRAINT `tblprovas_salvas_usuario_id_prova_fkey` FOREIGN KEY (`id_prova`) REFERENCES `tblprova`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblprovas_salvas_usuario` ADD CONSTRAINT `tblprovas_salvas_usuario_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tblusuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblresposta_questao_prova` ADD CONSTRAINT `tblresposta_questao_prova_id_prova_usuario_fkey` FOREIGN KEY (`id_prova_usuario`) REFERENCES `tblusuario_prova`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblresposta_questao_prova` ADD CONSTRAINT `tblresposta_questao_prova_id_questao_prova_fkey` FOREIGN KEY (`id_questao_prova`) REFERENCES `tblquestao_prova`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblquestao_prova` ADD CONSTRAINT `tblquestao_prova_id_tipo_fkey` FOREIGN KEY (`id_tipo`) REFERENCES `tblquestao_prova_tipo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblalternativa_prova` ADD CONSTRAINT `tblalternativa_prova_id_questao_fkey` FOREIGN KEY (`id_questao`) REFERENCES `tblquestao_prova`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblresposta_alternativa_prova` ADD CONSTRAINT `tblresposta_alternativa_prova_id_prova_usuario_fkey` FOREIGN KEY (`id_prova_usuario`) REFERENCES `tblusuario_prova`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblresposta_alternativa_prova` ADD CONSTRAINT `tblresposta_alternativa_prova_id_alternativa_fkey` FOREIGN KEY (`id_alternativa`) REFERENCES `tblalternativa_prova`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblprova_todas_questoes` ADD CONSTRAINT `tblprova_todas_questoes_id_questao_prova_fkey` FOREIGN KEY (`id_questao_prova`) REFERENCES `tblquestao_prova`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblprova_todas_questoes` ADD CONSTRAINT `tblprova_todas_questoes_id_prova_fkey` FOREIGN KEY (`id_prova`) REFERENCES `tblprova`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblteste_comportamental` ADD CONSTRAINT `tblteste_comportamental_id_stack_fkey` FOREIGN KEY (`id_stack`) REFERENCES `tblstack`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblteste_comportamental_grupo` ADD CONSTRAINT `tblteste_comportamental_grupo_id_grupo_fkey` FOREIGN KEY (`id_grupo`) REFERENCES `tblgrupo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblteste_comportamental_grupo` ADD CONSTRAINT `tblteste_comportamental_grupo_id_teste_comportamental_fkey` FOREIGN KEY (`id_teste_comportamental`) REFERENCES `tblteste_comportamental`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblusuario_teste_comportamental` ADD CONSTRAINT `tblusuario_teste_comportamental_id_teste_comportamental_fkey` FOREIGN KEY (`id_teste_comportamental`) REFERENCES `tblteste_comportamental`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblusuario_teste_comportamental` ADD CONSTRAINT `tblusuario_teste_comportamental_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tblusuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblusuario_teste_comportamental` ADD CONSTRAINT `tblusuario_teste_comportamental_id_perfil_comportamental_fkey` FOREIGN KEY (`id_perfil_comportamental`) REFERENCES `tblperfil_comportamental`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblquestao_teste_comportamental` ADD CONSTRAINT `tblquestao_teste_comportamental_id_teste_comportamental_fkey` FOREIGN KEY (`id_teste_comportamental`) REFERENCES `tblteste_comportamental`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblalternativa_comportamental` ADD CONSTRAINT `tblalternativa_comportamental_id_perfil_comportamental_fkey` FOREIGN KEY (`id_perfil_comportamental`) REFERENCES `tblperfil_comportamental`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblalternativa_comportamental` ADD CONSTRAINT `tblalternativa_comportamental_id_questao_fkey` FOREIGN KEY (`id_questao`) REFERENCES `tblquestao_teste_comportamental`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblresposta_comportamental` ADD CONSTRAINT `tblresposta_comportamental_id_teste_usuario_fkey` FOREIGN KEY (`id_teste_usuario`) REFERENCES `tblusuario_teste_comportamental`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblresposta_comportamental` ADD CONSTRAINT `tblresposta_comportamental_id_alternativa_fkey` FOREIGN KEY (`id_alternativa`) REFERENCES `tblalternativa_comportamental`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblprova_grupo` ADD CONSTRAINT `tblprova_grupo_id_prova_andamento_fkey` FOREIGN KEY (`id_prova_andamento`) REFERENCES `tblprova_andamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblprova_grupo` ADD CONSTRAINT `tblprova_grupo_id_grupo_fkey` FOREIGN KEY (`id_grupo`) REFERENCES `tblgrupo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblgrupo_usuario` ADD CONSTRAINT `tblgrupo_usuario_id_grupo_fkey` FOREIGN KEY (`id_grupo`) REFERENCES `tblgrupo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblgrupo_usuario` ADD CONSTRAINT `tblgrupo_usuario_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tblusuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblconvite` ADD CONSTRAINT `tblconvite_id_convite_status_fkey` FOREIGN KEY (`id_convite_status`) REFERENCES `tblconvite_status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblconvite` ADD CONSTRAINT `tblconvite_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tblusuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblconvite` ADD CONSTRAINT `tblconvite_id_grupo_fkey` FOREIGN KEY (`id_grupo`) REFERENCES `tblgrupo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
