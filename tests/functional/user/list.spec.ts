import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
test.group('User store', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  test('should create an user', async ({ client }) => {
    const response = await client.post('/signup').json({
      username: 'test',
      email: 'teste4@test.com',
      password: 'senha',
    })
    response.assertStatus(201)
  })
  test('shoud fail if email already exists', async ({ client }) => {
    await client.post('/signup').json({
      username: 'test',
      email: 'teste4@test.com',
      password: 'senha',
    })
    const response = await client.post('/signup').json({
      username: 'test',
      email: 'teste4@test.com',
      password: 'senha',
    })
    response.assertStatus(404)
  })
})
