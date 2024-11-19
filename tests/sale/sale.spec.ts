import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
test.group('Sale Group', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  test('should create a sale', async ({ client }) => {
    await client.post('/clients').json({
      name: 'John Doe',
      cpf: '12345678903',
      telephone: '+5511987654321',
      address: {
        address: '123 Main St',
        city: 'Belo Horizonte',
        state: 'SP',
        postal: '01000000',
        country: 'Brasil',
      },
    })
    await client.post('/products').json({
      name: 'product 1',
      description: 'description 1',
      price: 1.99,
    })
    const response = await client.post('/sales').json({
      customerId: 1,
      productId: 1,
      quantity: 2,
      unitPrice: 10.0,
    })
    response.assertStatus(201)
  })
})
