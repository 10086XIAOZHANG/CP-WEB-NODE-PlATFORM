import * as Router from 'koa-router'
import { KoaGraphql } from '../core/graphql'
import { RootSchema } from '../schema/graphql/index'
import DemoCtrl from '../controllers/DemoController'
import AccountCtrl from '../controllers/AccountController'
import UserCtrl from '../controllers/UserController'
import LogsCtrl from '../controllers/LogsController'
import ServerAPI from '../controllers/ServerAPIController'

const router = new Router();

router
  .post('/api/login', AccountCtrl.login)
  .post('/api/logout', AccountCtrl.logout)
  .post('/api/register', AccountCtrl.register)
  .get('/view/:site', DemoCtrl.views)
  .post('/api/compose', DemoCtrl.compose)
  .post('/platform/*', ServerAPI.KDJZ)
  .get('/api/log-api', LogsCtrl.apiPages)
  .get('/api/log-errors', LogsCtrl.errorsPages)
  .get('/graphql', KoaGraphql({
    schema: RootSchema,
    graphql: true
  }))
  .post('/graphql', KoaGraphql({
    schema: RootSchema,
  }))

export default router