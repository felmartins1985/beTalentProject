import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
test.group('Client Group', (group) => {
  group.each.setup(() => testUtils.db().truncate())
  test('should create an Client', async ({ client }) => {
    await client.post('/signup').json({
      username: 'teste',
      email: 'test@example.com',
      password: 'password123',
    })

    const loginResponse = await client.post('/login').json({
      email: 'test@example.com',
      password: 'password123',
    })
    const token = loginResponse.body().token
    const response = await client
      .post('/clients')
      .json({
        name: 'Felipe',
        cpf: '12345678903',
        telephone: '5511987654321',
        address: {
          street: '123 Main St',
          city: 'Belo Horizonte',
          state: 'MG',
          postal: '01000000',
          country: 'Brasil',
        },
      })
      .header('Authorization', `Bearer ${token}`)
    response.text().match('Client created')
    response.assertStatus(201)
  })
  test('should return an error when i try to create the same Client', async ({ client }) => {
    await client.post('/signup').json({
      username: 'teste',
      email: 'test@example.com',
      password: 'password123',
    })

    const loginResponse = await client.post('/login').json({
      email: 'test@example.com',
      password: 'password123',
    })
    const token = loginResponse.body().token
    await client
      .post('/clients')
      .json({
        name: 'Felipe',
        cpf: '12345678903',
        telephone: '5511987654321',
        address: {
          street: '123 Main St',
          city: 'Belo Horizonte',
          state: 'MG',
          postal: '01000000',
          country: 'Brasil',
        },
      })
      .header('Authorization', `Bearer ${token}`)
    const response = await client
      .post('/clients')
      .json({
        name: 'Felipe',
        cpf: '12345678903',
        telephone: '+5511987654321',
        address: {
          street: '123 Main St',
          city: 'Belo Horizonte',
          state: 'MG',
          postal: '01000000',
          country: 'Brasil',
        },
      })
      .header('Authorization', `Bearer ${token}`)
    response.text().match('CPF already exists')
    response.assertStatus(400)
  })
  test('should return a client', async ({ client }) => {
    await client.post('/signup').json({
      username: 'teste',
      email: 'test@example.com',
      password: 'password123',
    })

    const loginResponse = await client.post('/login').json({
      email: 'test@example.com',
      password: 'password123',
    })
    const token = loginResponse.body().token
    await client
      .post('/clients')
      .json({
        name: 'Felipe',
        cpf: '12345678903',
        telephone: '5511987654321',
        address: {
          street: '123 Main St',
          city: 'Belo Horizonte',
          state: 'SP',
          postal: '01000000',
          country: 'Brasil',
        },
      })
      .header('Authorization', `Bearer ${token}`)
    const response = await client.get('/clients/1').header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
  })
  test('should return all the clients', async ({ client }) => {
    await client.post('/signup').json({
      username: 'teste',
      email: 'test@example.com',
      password: 'password123',
    })

    const loginResponse = await client.post('/login').json({
      email: 'test@example.com',
      password: 'password123',
    })
    const token = loginResponse.body().token
    await client
      .post('/clients')
      .json({
        name: 'Felipe',
        cpf: '12345678903',
        telephone: '5511987654321',
        address: {
          street: '123 Main St',
          city: 'Belo Horizonte',
          state: 'MG',
          postal: '01000000',
          country: 'Brasil',
        },
      })
      .header('Authorization', `Bearer ${token}`)
    await client
      .post('/clients')
      .json({
        name: 'Joao das Neves',
        cpf: '12345678903',
        telephone: '5511987654321',
        address: {
          street: '123 Main St',
          city: 'Belo Horizonte',
          state: 'SP',
          postal: '01000000',
          country: 'Brasil',
        },
      })
      .header('Authorization', `Bearer ${token}`)
    const response = await client.get('/clients/').header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
  })
  test('should delete a client', async ({ client }) => {
    await client.post('/signup').json({
      username: 'teste',
      email: 'test@example.com',
      password: 'password123',
    })

    const loginResponse = await client.post('/login').json({
      email: 'test@example.com',
      password: 'password123',
    })
    const token = loginResponse.body().token
    await client
      .post('/clients')
      .json({
        name: 'Felipe',
        cpf: '12345678903',
        telephone: '5511987654321',
        address: {
          street: '123 Main St',
          city: 'Belo Horizonte',
          state: 'MG',
          postal: '01000000',
          country: 'Brasil',
        },
      })
      .header('Authorization', `Bearer ${token}`)
    const response = await client.delete('/clients/1').header('Authorization', `Bearer ${token}`)
    response.assertStatus(204)
  })
  test('should patch a client', async ({ client }) => {
    await client.post('/signup').json({
      username: 'teste',
      email: 'test@example.com',
      password: 'password123',
    })

    const loginResponse = await client.post('/login').json({
      email: 'test@example.com',
      password: 'password123',
    })
    const token = loginResponse.body().token
    await client
      .post('/clients')
      .json({
        name: 'Felipe',
        cpf: '12345678903',
        telephone: '5511987654321',
        address: {
          street: '123 Main St',
          city: 'Belo Horizonte',
          state: 'MG',
          postal: '01000000',
          country: 'Brasil',
        },
      })
      .header('Authorization', `Bearer ${token}`)
    const response = await client
      .patch('/clients/1')
      .json({
        telephone: '+5511987654111',
      })
      .header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
  })
})
