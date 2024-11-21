import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
test.group('Sale Group', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  test('should create a sale', async ({ client }) => {
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
    const clientResponse = await client
      .post('/clients')
      .json({
        name: 'John Doe',
        cpf: '12345678903',
        telephone: "5511987654321",
        address: {
          street: '123 Main St',
          city: 'Belo Horizonte',
          state: 'SP',
          postal: '01000000',
          country: 'Brasil',
        },
      })
      .header('Authorization', `Bearer ${token}`)
    const clientId = clientResponse.body().client.id

    const productResponse = await client
      .post('/products')
      .json({
        name: 'product 1',
        description: 'description 1',
        price: 1.99,
      })
      .header('Authorization', `Bearer ${token}`)
    const productId = productResponse.body().data.id

    const response = await client
      .post('/sales')
      .json({
        clientId: clientId,
        productId: productId,
        quantity: 2,
        unit_price: 10.0,
      })
      .header('Authorization', `Bearer ${token}`)
    response.assertStatus(201)
  })
})
