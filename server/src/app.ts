// koa
import * as Koa from 'koa'
import * as KoaLogger from 'koa-logger'
import { Context } from '@core/koa'
import Catch from './middlewares/catch'
import Middlewares from './middlewares/index'
import {connectDB, connectMongo} from './database/conectDB'

const _DEV_ = process.env.NODE_ENV === 'development'

class Application {
	private app: Koa
	
	constructor(){
		this.app = new Koa()
		this.init()
	}

	// init middlewares
	private init(){
		if(_DEV_) {
			this.app.use(KoaLogger())
		}
		this.app.use(Catch) //catch middldware
		this.app.keys = ['APP_Keys']; // set app keys
		this.app.use(async (ctx: Context, next: () => Promise<any>) => {
			const path = ctx.request.path
			console.log(`path: ${path}`)
			if(path === '/') {
				ctx.body = 'Welcome to koa-graphql server.'
			}
			await next()
			ctx.set('X-Powered-By', 'Keefe');
		})

		Middlewares(this.app)
	}

	// start app
	public start(port: number) {
		this.app.listen(port, (): void => {
			console.log(`Koa server has started, running with: http://127.0.0.1:${port}. `)
			connectDB() // db start after server running
			connectMongo() // connect mongodb
		})
	}
}

export default new Application()