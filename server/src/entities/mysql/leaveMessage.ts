import {Entity, Column} from "typeorm";
import { BaseEntity } from './baseEntity'

@Entity('leaveMessage')
export class LeaveMessage extends BaseEntity {

  @Column()
  description: string;

  @Column()
  parentId: string;

  @Column()
  ip: string;

  // @Column()
  // client: string;

}