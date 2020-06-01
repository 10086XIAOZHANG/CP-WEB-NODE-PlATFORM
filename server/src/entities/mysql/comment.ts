import {Entity, Column} from "typeorm";
import { BaseEntity } from './baseEntity'

@Entity('comment')
export class Comment extends BaseEntity {

  @Column()
  description: string;

  @Column()
  articleId: string;
  
  @Column()
  parentId: string;

  @Column()
  ip: string;

  @Column()
  client: string;

  @Column()
  url: string;

}