# Resumo do projeto

Este é o BackEnd do Teste Técnico para a Shopper.
Se trata de uma ferramenta para atualização de preços de produtos utilizando um arquivo csv.

# :hammer: Funcionalidades do projeto

- `Validação do CSV`: é possível enviar um arquivo csv com o código do produto(product_code) e o novo preço (new_price) para ser validado, seguindo algumas regras, tais como:

  - o novo preço não pode ficar abaixo do preço de custo;
  - o reajuste não pode ser maior ou menor do que 10% do preço atual do produto;
  - para aumentar o preço de um produto pacote, ou seja, que contenha outros produtos como componente só deve se dar caso também seja enviado os novos valores dos produtos componentes, além disso o preço deve bater, o inverso também é verdadeiro;

- `Atualizar o Banco de Dados usando o CSV`: caso o CSV seja validado, o botão de atualizar vai ser liberado e vai ser possível atualizar o Banco de Dados.

## ✔️ Técnicas e tecnologias utilizadas

- `NodeJs 18.5.0`
- `Express`
- `express-async-errors`
- `MySQL`
- `cors`
- `csv-parser`
- `dotenv`
- `multer`
- `npm`

# 🛠️ Abrir e rodar o projeto

**Passos para rodar a aplicação:**

- instalar MySQL 5
- criar um Banco de Dados no MySQL para testar a aplicação
- executar as queries do sql/database.sql no terminal ou em um programa de sua preferência
- utilizar node 18.5.0 ou versão compatível
- clonar este repositório
- abrir o terminal na pasta clonada no seu computador
- executar o comando de instalação de dependencias: npm install
- abrir a aplicação na IDE de sua escolha, criar um arquivo .env usando o .env.example como exemplo e preencher corretamente a variável de ambiente DATABASE_URL
- executar o comando para inicializar a API e o Banco de Dados: npm run dev
- agora basta ir parte do FrontEnd e executar as funcionalidades

GitHub do FrontEnd: https://github.com/AlexandreVianaDev/shopper-frontend/tree/main
