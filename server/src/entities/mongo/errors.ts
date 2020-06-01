import {Entity, Column} from "typeorm";
import { BaseEntity } from './baseModel'

@Entity()
export class Errors extends BaseEntity{
  @Column()
  host: string

  @Column()
  path: string

  @Column()
  url: string

  @Column()
  params: any

  @Column()
  method: string

  @Column()
  origin: string

  @Column()
  hostname: string
  
  @Column()
  headers: string

  @Column()
  resHeaders: any

  @Column()
  resData: any

  @Column()
  time: number

  @Column()
  protocol: string

  @Column()
  status: number
  
  @Column()
  msg: string
  
  @Column()
  client: string

  @Column()
  errors: string[]

}
