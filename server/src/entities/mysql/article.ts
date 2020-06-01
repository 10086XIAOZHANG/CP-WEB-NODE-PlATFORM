import {Entity, Column} from "typeorm";
import { BaseEntity } from './baseEntity'

@Entity('article')
export class Article extends BaseEntity {

  @Column()
  title: string;

  @Column()
  abstract: string;

  @Column({
    type: 'longtext'
  })
  description: string;

  @Column({length: 32})
  typeId: string

  @Column({
    default: 0
  })
  isTop: number


  @Column()
  pics: string;

  @Column()
  tag: string;

}