import 'reflect-metadata'
import { createConnection, Connection } from 'typeorm'
import { MySqlConf, MongoConf } from '../../conf/db.conf'
import { Entities } from '../entities/mysql'
import { MongoEntities } from '../entities/mongo'

const _PROD_ = process.env.NODE_ENV === 'production'

const connectDB = (): void => {
  createConnection({
    type     : 'mysql',
    host     : MySqlConf.host,
    port     : MySqlConf.port,
    username : MySqlConf.username,
    password : MySqlConf.password,
    database : MySqlConf.database,
    entities : Entities,
    logging  : _PROD_ ? false : true,
    // logger   : 'simple-console'
  }).then((connect: Connection) => {
    console.log('mysql connect success!')
  }).catch((err) => {
    console.log('mysql connect fail!', err)
  })
}

const connectMongo = (): void => {
  createConnection({
    name     : 'mongo',
    type     : 'mongodb',
    host     : MongoConf.host,
    port     : MongoConf.port,
    // username : MongoConf.username,
    // password : MongoConf.password,
    database : MongoConf.database,
    entities : MongoEntities,
    logging  : _PROD_ ? false : true,
    useNewUrlParser: true
  }).then((connect: Connection) => {
    console.log('mongo connect success!')
  }).catch((err) => {
    console.log('mongo connect fail!', err)
  })
}

export {
  connectDB,
  connectMongo
}
