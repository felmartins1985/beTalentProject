import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
test.group('Product Group', (group) => {
  group.each.setup(() => testUtils.db().truncate())
  test('should create an Product', async ({ client }) => {
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
      .post('/products')
      .json({
        name: 'product 1',
        description: 'description 1',
        price: 1.99,
      })
      .header('Authorization', `Bearer ${token}`)
    response.text().match('Success')
    response.assertStatus(201)
  })
  test('should return an error when i try to create the same Product', async ({ client }) => {
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
      .post('/products')
      .json({
        name: 'product 1',
        description: 'description 1',
        price: 1.99,
      })
      .header('Authorization', `Bearer ${token}`)
    const response = await client
      .post('/products')
      .json({
        name: 'product 1',
        description: 'description 1',
        price: 1.99,
      })
      .header('Authorization', `Bearer ${token}`)
    response.text().match('Product already exists')
    response.assertStatus(400)
  })
  test('should return a product', async ({ client }) => {
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
      .post('/products')
      .json({
        name: 'product 1',
        description: 'description 1',
        price: 1.99,
      })
      .header('Authorization', `Bearer ${token}`)
    const response = await client.get('/products/1').header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
  })
  test('should delete a Product', async ({ client }) => {
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
      .post('/products')
      .json({
        name: 'product 1',
        description: 'description 1',
        price: 1.99,
      })
      .header('Authorization', `Bearer ${token}`)
    const response = await client.delete('/products/1').header('Authorization', `Bearer ${token}`)
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
      .post('/products')
      .json({
        name: 'product 1',
        description: 'description 1',
        price: 1.99,
      })
      .header('Authorization', `Bearer ${token}`)
    const response = await client
      .patch('/products/1')
      .json({
        description: 'descrição',
      })
      .header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
  })
})
