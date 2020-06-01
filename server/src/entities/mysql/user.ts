import {Entity, Column} from "typeorm";
import { BaseEntity } from './baseEntity'

@Entity('user')
export class User extends BaseEntity {

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  nickName: string;

  @Column()
  userType: number;

  @Column()
  sex: number;

  @Column()
  remark: string

}