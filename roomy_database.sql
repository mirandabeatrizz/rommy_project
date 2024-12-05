-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 01/12/2024 às 21:56
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `roomy_database`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `contratos`
--

CREATE TABLE `contratos` (
  `id` int(10) UNSIGNED NOT NULL,
  `data_inicio` date DEFAULT NULL,
  `data_fim` date DEFAULT NULL,
  `valor` float DEFAULT NULL,
  `ativo` tinyint(1) DEFAULT NULL,
  `observacao` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `endereco`
--

CREATE TABLE `endereco` (
  `id` int(10) UNSIGNED NOT NULL,
  `rua` varchar(255) DEFAULT NULL,
  `bairro` varchar(255) DEFAULT NULL,
  `cidade` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `cep` varchar(20) DEFAULT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `endereco`
--

INSERT INTO `endereco` (`id`, `rua`, `bairro`, `cidade`, `estado`, `cep`, `updatedAt`, `createdAt`) VALUES
(1, 'Fernando Machado', 'Centro', 'Chapecó', 'Santa Catarina', '89800-000', '2024-12-01 19:45:08', '2024-12-01 19:45:23');

-- --------------------------------------------------------

--
-- Estrutura para tabela `imoveis`
--

CREATE TABLE `imoveis` (
  `id` int(10) UNSIGNED NOT NULL,
  `tipoImovel_id` int(10) UNSIGNED NOT NULL,
  `endereco_id` int(10) UNSIGNED NOT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  `descricao` text DEFAULT NULL,
  `ocupacao_max` int(10) UNSIGNED DEFAULT NULL,
  `qtd_quartos` int(10) UNSIGNED DEFAULT NULL,
  `qtd_banheiros` int(10) UNSIGNED DEFAULT NULL,
  `vagas` int(10) UNSIGNED DEFAULT NULL,
  `aluguel` float DEFAULT NULL,
  `condominio` float DEFAULT NULL,
  `ocupado` tinyint(1) DEFAULT NULL,
  `tamanho` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `interesses`
--

CREATE TABLE `interesses` (
  `id` int(10) UNSIGNED NOT NULL,
  `usuarios_id` int(10) UNSIGNED NOT NULL,
  `data_criacao` date DEFAULT NULL,
  `valor` float DEFAULT NULL,
  `qtd_moradores` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `interesses_has_imoveis`
--

CREATE TABLE `interesses_has_imoveis` (
  `interesses_id` int(10) UNSIGNED NOT NULL,
  `imoveis_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `relacao`
--

CREATE TABLE `relacao` (
  `id` int(10) UNSIGNED NOT NULL,
  `nome` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `relacao`
--

INSERT INTO `relacao` (`id`, `nome`) VALUES
(1, 'proprietário'),
(2, 'locador'),
(3, 'locatário');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tipoimovel`
--

CREATE TABLE `tipoimovel` (
  `id` int(10) UNSIGNED NOT NULL,
  `nome` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tipoimovel`
--

INSERT INTO `tipoimovel` (`id`, `nome`) VALUES
(1, 'apartamento'),
(2, 'casa'),
(3, 'kitnet');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(10) UNSIGNED NOT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `data_nasc` date DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `senha` varchar(50) DEFAULT NULL,
  `celular` varchar(15) DEFAULT NULL,
  `genero` int(10) UNSIGNED DEFAULT NULL,
  `estudante` tinyint(1) DEFAULT NULL,
  `matricula` varchar(20) DEFAULT NULL,
  `instituicao` varchar(50) DEFAULT NULL,
  `cpf` varchar(15) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `data_nasc`, `email`, `senha`, `celular`, `genero`, `estudante`, `matricula`, `instituicao`, `cpf`, `createdAt`, `updatedAt`) VALUES
(1, 'beatriz', '0000-00-00', 'beatriz@gmail.com', '123456', '1', 0, NULL, NULL, NULL, '111.567.879-55', '2024-12-01 19:41:58', '2024-12-01 19:41:58');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios_has_contratos`
--

CREATE TABLE `usuarios_has_contratos` (
  `usuarios_id` int(10) UNSIGNED NOT NULL,
  `contratos_id` int(10) UNSIGNED NOT NULL,
  `relacao_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios_has_imoveis`
--

CREATE TABLE `usuarios_has_imoveis` (
  `usuarios_id` int(10) UNSIGNED NOT NULL,
  `imoveis_id` int(10) UNSIGNED NOT NULL,
  `relacao_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `contratos`
--
ALTER TABLE `contratos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `endereco`
--
ALTER TABLE `endereco`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `imoveis`
--
ALTER TABLE `imoveis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `imoveis_FKIndex1` (`endereco_id`),
  ADD KEY `imoveis_FKIndex2` (`tipoImovel_id`);

--
-- Índices de tabela `interesses`
--
ALTER TABLE `interesses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `interesses_FKIndex1` (`usuarios_id`);

--
-- Índices de tabela `interesses_has_imoveis`
--
ALTER TABLE `interesses_has_imoveis`
  ADD PRIMARY KEY (`interesses_id`,`imoveis_id`),
  ADD KEY `interesses_has_imoveis_FKIndex1` (`interesses_id`),
  ADD KEY `interesses_has_imoveis_FKIndex2` (`imoveis_id`);

--
-- Índices de tabela `relacao`
--
ALTER TABLE `relacao`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `tipoimovel`
--
ALTER TABLE `tipoimovel`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `usuarios_has_contratos`
--
ALTER TABLE `usuarios_has_contratos`
  ADD PRIMARY KEY (`usuarios_id`,`contratos_id`),
  ADD KEY `usuarios_has_contratos_FKIndex1` (`usuarios_id`),
  ADD KEY `usuarios_has_contratos_FKIndex2` (`contratos_id`),
  ADD KEY `usuarios_has_contratos_FKIndex3` (`relacao_id`);

--
-- Índices de tabela `usuarios_has_imoveis`
--
ALTER TABLE `usuarios_has_imoveis`
  ADD PRIMARY KEY (`usuarios_id`,`imoveis_id`),
  ADD KEY `usuarios_has_imoveis_FKIndex1` (`usuarios_id`),
  ADD KEY `usuarios_has_imoveis_FKIndex2` (`imoveis_id`),
  ADD KEY `usuarios_has_imoveis_FKIndex3` (`relacao_id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `contratos`
--
ALTER TABLE `contratos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `endereco`
--
ALTER TABLE `endereco`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `imoveis`
--
ALTER TABLE `imoveis`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `interesses`
--
ALTER TABLE `interesses`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `relacao`
--
ALTER TABLE `relacao`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `tipoimovel`
--
ALTER TABLE `tipoimovel`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `imoveis`
--
ALTER TABLE `imoveis`
  ADD CONSTRAINT `imoveis_ibfk_1` FOREIGN KEY (`endereco_id`) REFERENCES `endereco` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `imoveis_ibfk_2` FOREIGN KEY (`tipoImovel_id`) REFERENCES `tipoimovel` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `interesses`
--
ALTER TABLE `interesses`
  ADD CONSTRAINT `interesses_ibfk_1` FOREIGN KEY (`usuarios_id`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `interesses_has_imoveis`
--
ALTER TABLE `interesses_has_imoveis`
  ADD CONSTRAINT `interesses_has_imoveis_ibfk_1` FOREIGN KEY (`interesses_id`) REFERENCES `interesses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `interesses_has_imoveis_ibfk_2` FOREIGN KEY (`imoveis_id`) REFERENCES `imoveis` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `usuarios_has_contratos`
--
ALTER TABLE `usuarios_has_contratos`
  ADD CONSTRAINT `usuarios_has_contratos_ibfk_1` FOREIGN KEY (`usuarios_id`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `usuarios_has_contratos_ibfk_2` FOREIGN KEY (`contratos_id`) REFERENCES `contratos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `usuarios_has_contratos_ibfk_3` FOREIGN KEY (`relacao_id`) REFERENCES `relacao` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `usuarios_has_imoveis`
--
ALTER TABLE `usuarios_has_imoveis`
  ADD CONSTRAINT `usuarios_has_imoveis_ibfk_1` FOREIGN KEY (`usuarios_id`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `usuarios_has_imoveis_ibfk_2` FOREIGN KEY (`imoveis_id`) REFERENCES `imoveis` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `usuarios_has_imoveis_ibfk_3` FOREIGN KEY (`relacao_id`) REFERENCES `relacao` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
