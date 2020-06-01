import { BaseModel } from './BaseModel'
import { Entity } from 'typeorm';

@Entity()
export class Chat extends BaseModel {
  
  message: string

  username: string

  ip: string

}