import {Entity, Column} from "typeorm";
import { BaseEntity } from './baseEntity'

@Entity('tag')
export class Tag extends BaseEntity {

  @Column()
  name: string;

  @Column()
  remark: string

}