import {Entity, Column} from "typeorm";
import { BaseEntity } from './baseEntity'

@Entity('articleType')
export class ArticleType extends BaseEntity {

  @Column()
  name: string;

  @Column()
  remark: string

}