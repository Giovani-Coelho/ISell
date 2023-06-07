<h1 align="center">
   ISell 🤝
</h1>

<h3 align="center">
  Esta é uma API de um e-commerce que permite você publicar um produto para outras pessoas comprarem.
</h3>

## 🚀 Tecnologias

Principais tecnologias usadas para desenvolver esta API.

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Zod](https://github.com/colinhacks/zod)

## Modelagem de Dados

![image](modelagem.png)

## Requisitos Funcionais ⚙️

✅ - Deve ser possivel criar uma conta.<br>
✅ - Deve ser possivel o usuario se autenticar.<br>
✅ - Deve ser possivel o usuario publicar um produto.<br>
[X] - Deve ser possivel o usuario deletar um produto.<br>
✅ - Deve ser possivel o usuario listar todos os seus produto.<br>
✅ - Deve ser possivel o usuario listar todos seus produtos.<br>
✅ - Deve ser possivel o usuario criar um pedido.<br>
✅ - Deve ser possivel listar todos os pedidos.<br>
✅ - Deve ser possivel adicionar itens a um pedido.<br>
✅ - Deve ser possivel fazer um pedido de um produto.<br>
✅ - Deve ser possivel listar todos os produtos de um pedido. <br>

## Regras de Negocio 👔

✅ - Nao deve ser possivel se cadastrar com o mesmo e-mail.<br>
✅ - Nao deve ser possivel criar um produto se o usuario nao existir.<br>
✅ - Nao deve ser possivel listar produtos de um usuario inexistente.<br>
[X] - Nao deve ser possivel deletar um produto inexistente.<br>
[] - Nao deve ser possivel deletar um produto que nao pertence a um usuario.<br>
✅ - Nao deve ser possivel o usuario listar produtos caso nao tenha.<br>
✅ - Nao deve ser possivel criar um pedido usando um usuario inexistente.<br>
✅ - Nao deve ser possivel criar um pedido se for passado um valor de status incorreto.<br>
✅ - Nao deve ser possivel listar os produtos de um pedido inexistente.<br>


## Rquisitos nao Funcionais 🔧

✅ - A senha do usuario deve ser criptografada.<br>
✅ - Todas listas de dados precisam de paginacao de 20 itens.



🔰