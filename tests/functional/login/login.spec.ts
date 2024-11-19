import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
test.group('Login Group', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  test('should login', async ({ client }) => {
    await client.post('/signup').json({
      username: 'test',
      email: 'teste4@test.com',
      password: 'senha',
    })
    const response = await client.post('/login').json({
      email: 'teste4@test.com',
      password: 'senha',
    })
    response.assertStatus(200)
  })
})
