# BeTalentProject - 👨🏻‍💻

Consiste em uma aplicação que permite, por meio de endpoints, cadastrar clientes, produtos e vendas. Para realizar essas funções, é necessário criar um usuário e fazer o login, haja vista é preciso ter permissão para fazer o gerenciamento das rotas acima.
* O sistema foi desenvolvido usando AdonisJS em sua versão 6 e utiliza MySQL como banco de dados.

### Instruções

- Para rodar a aplicação localmente e os testes do backend, realize o clone do projeto e utilize os comandos a seguir:
 ```
Para clonar o projeto:
git clone git@github.com:felmartins1985/beTalentProject.git

Para rodar a aplicação dockerizada, instalar as dependências e iniciar as aplicações:
<-- na raiz do projeto -->
docker compose up -d

Para instalar as dependências
<-- na raiz do projeto -->
npm run startup
Para iniciar o projeto
<-- na raiz do projeto -->
npm run dev
Para rodar os testes:
<-- na raiz do projeto -->
npm run test


```

```bash
copie o arquivo .env.example para .env e configure suas variáveis de ambiente
# esta é sua chave para gerar o jwt
APP_KEY=botafogocampeao24

# estas são suas configurações do banco de dados, certifique-se que elas são iguais aqui e no seu docker-compose.yml
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
NODE_ENV=development
HOST=localhost
DB_DATABASE=betalent-project

# aqui configure a porta que deseja utilizar no seu localhost
PORT=3333

```
### Endpoints

#### Signup

| Método | Funcionalidade | URL |
|---|---|---|
| `POST` | Cria o usuário administrador | http://localhost:3333/signup |

Nas requisições POST é necessário informar o seguinte JSON:

```
{
 "username": "felipe",
 "email": "felipe@email.com.br",
 "password": "felipe1235"
}
```

#### Login

| Método | Funcionalidade | URL |
|---|---|---|
| `POST` | Valida o usuário e gera um token | http://localhost:3333/login |

Nas requisições POST é necessário informar o seguinte JSON:

```
{
 "email": "felipe@email.com.br",
 "password": "felipe1235"
}
```
#### Products

| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Retorna os produtos criados | http://localhost:3333/products |
| `GET` | Retorna o produto especificado com seu id | http://localhost:3333/products/id |
| `POST` | Cria um novo produto | http://localhost:3333/products |
| `PATCH` | Atualiza um produto em específico | http://localhost:3333/products/:id |
| `DELETE` | Deleta um produto em específico | http://localhost:3333/products/:id |

Na requisição POST é necessário informar o seguinte JSON:
```
{
 "name": "Product",
 "description": "New Product",
 "price": 1.99 
}
```
#### Clients

| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Retorna os clientes criados | http://localhost:3333/clients |
| `GET` | Retorna o cliente especificado com seu id | http://localhost:3333/clients/id |
| `POST` | Cria um novo cliente | http://localhost:3333/clients |
| `PATCH` | Atualiza um cliente em específico | http://localhost:3333/clients/:id |
| `DELETE` | Deleta um cliente em específico | http://localhost:3333/clients/:id |

Na requisição POST é necessário informar o seguinte JSON:
```
{
  "name": "Kurt Cobain",
  "cpf": "66666666666",
  "telephone": "666666666",
  "address": {
    "address": "666 RockStar Street",
    "city": "Seattle",
    "state": "Washington",
    "postal": "66666666",
    "country": "USA"
  }
}
```
<details>
  <summary>💡 Observação Importante sobre o GET</summary>
  
  Ao buscar por um cliente em específico, é possivel filtrar as vendas que serão retornadas ao passar o mês e ano no endpoint.
  Exemplo: 
  `localhost:3333/clients/{id}?month={monthNumber}&year={yearNumber}`
  
</details>
#### Sales

| Método | Funcionalidade | URL |
|---|---|---|
| `POST` | Gera a venda de um produto relacionado ele com um cliente | http://localhost:3333/sales |

Na requisição POST é necessário informar o seguinte JSON:
```
{
  "customerId": 1,
  "productId": 1,
  "quantity": 2,
  "unit_price": 20.00,
}
```
## Como Utilizar

### Como logar no sistema
O primeiro passo para conseguir acessar as demais rotas é criar um usuário para si, é feito através do endpoint `POST /signup` com um body semelhante a:


```json
{
   "name": "nome",
   "password": "senha",
   "email": "test@test.com"
}
```
o próximo passo é fazer o login na rota `POST /login`:
```json
{
   "email": "test@test.com",
   "password": "123"
}


/* exemplo de retorno bem sucedido
{
   "type": "bearer",
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTcyMTU5ODgzM30.CgEycI6RjNmvZmYwKSQX85bk74iLVXeUXhznK4xlTJo"
}
*/

```
após isso é só colocar o token em um campo Authorization no header de suas requisições, o formato do token deve ser:

`Bearer {token}`




