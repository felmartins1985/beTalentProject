import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const UsersController = () => import('#controllers/users_controller')
const LoginController = () => import('#controllers/login_controller')
const ProductsController = () => import('#controllers/products_controller')
const SalesController = () => import('#controllers/sales_controller')
const ClientsController = () => import('#controllers/clients_controller')
router.post('/signup', [UsersController, 'store'])
router.post('/login', [LoginController, 'login'])
router.post('/sales', [SalesController, 'store'])
router.group(() => {
  router.get('/products', [ProductsController, 'index'])
  router.get('/products/:id', [ProductsController, 'show'])
  router.post('/products', [ProductsController, 'store'])
  router.patch('/products/:id', [ProductsController, 'update'])
  router.delete('/products/:id', [ProductsController, 'destroy'])
})
router
  .group(() => {
    router.get('/clients', [ClientsController, 'index'])
    router.get('/clients/:id', [ClientsController, 'show'])
    router.post('/clients', [ClientsController, 'store'])
    router.patch('/clients/:id', [ClientsController, 'update'])
    router.delete('/clients/:id', [ClientsController, 'destroy'])
  })
  .use(
    middleware.auth({
      guards: ['api'],
    })
  )
