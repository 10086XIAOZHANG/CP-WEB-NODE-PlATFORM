import 'reflect-metadata'
import { Entity, Column } from 'typeorm'
import { BaseEntity } from './baseModel'

@Entity()
export class TestMongo extends BaseEntity{
  
  @Column()
  name: string

  @Column()
  ip: string

}