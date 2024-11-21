# BeTalentProject - 👨🏻‍💻

Consiste em uma aplicação que permite, por meio de endpoints, cadastrar clientes, produtos e vendas.
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
# chave utilizada para gerar o jwt
APP_KEY=botafogocampeao24

# estas são suas configurações do banco de dados. IMPORTANTE verificar se está igual ao docker-compose.yml
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

<details>
  <summary> 👀 Como Utilizar da Forma Correta os Endpoints</summary>

a) Para acessar os endpoints de clients, products e sales, é necessário uma autenticação utilizando o JWT como ferramenta;    
b) Então, o primeiro passo para conseguir acessar as demais rotas é criar um usuário para si, por meio do endpoint `POST /signup`;    
c) O segundo passo é fazer o login na rota `POST /login`  
d) Ao fazer o login com um usuário cadastrado, será retornado um token da seguinte forma:  


```json
{
   "type": "Bearer",
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTcyMTU5ODgzM30.CgEycI6RjNmvZmYwKSQX85bk74iLVXeUXhznK4xlTJo"
}
```

```
Após realizar o login, basta inserir no Header dos endpoints que necessitam de Token, no campo Authorization, da seguinte forma:

`Bearer {token}`
```
</details>

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
| `PATCH` | Atualiza um produto em específico | http://localhost:3333/products/id |
| `DELETE` | Deleta um produto em específico | http://localhost:3333/products/id |

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
| `PATCH` | Atualiza um cliente em específico | http://localhost:3333/clients/id |
| `DELETE` | Deleta um cliente em específico | http://localhost:3333/clients/id |

Na requisição POST é necessário informar o seguinte JSON:
```
{
  "name": "Kurt Cobain",
  "cpf": "66666666666",
  "telephone": "666666666",
  "address": {
    "street": "666 RockStar Street",
    "city": "Seattle",
    "state": "Washington",
    "postal": "66666666",
    "country": "USA"
  }
}
```
<details>
  <summary>⚠️ Observação Importante sobre o `GET /clients/id`</summary>
  
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
  "clientId": 1,
  "productId": 1,
  "quantity": 2,
}
```

<details>
  <summary>💡 Notas sobre o Projeto </summary>
  
  a) Ao pesquisar sobre a versão 6 do adonis, a sua documentação nos informa que a forma "desejada" de fazer autenticação seria por meio do auth utilizando uma tabela que salvaria os tokens de acesso do usuário. Eles utilizam o que é chamado de Token Opaco.  
  b) Contudo, nada é falado sobre o jwt e não encontrei, em minhas pesquisas, documentação sobre a forma de utilizar o jwt com a versão 6 do Adonis.  
  c) Logo, ao procurar em repositórios de projetos de outros programadores, encontrei um em que a utilização do jwt é utilizada e o apliquei no meu projeto, funcionando da forma desejada.  
  d) No que diz respeito ao testes feitos, eles estão passando. Contudo, por algum motivo que não consegui descobrir, há momentos em que o node ace test falha. Mas, ao fazer o mesmo teste novamente, funciona. 
  
</details>


