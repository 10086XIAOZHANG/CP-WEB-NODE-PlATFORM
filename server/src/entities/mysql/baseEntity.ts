import {Entity, Column, PrimaryColumn} from "typeorm";

// @Entity()
export class BaseEntity {

  @PrimaryColumn({ unique: true })
  id?: string;

  @Column()
  createdBy?: string;

  @Column()
  createdAt: number;

  @Column({select: false})
  updatedBy?: string;

  @Column({select: false})
  updatedAt?: number;

  @Column({select: false})
  deletedBy?: string;

  @Column({select: false})
  deletedAt?: number;

  @Column({
    select: false,
    default: 0,
    onUpdate: '111'
  })
  version?: number;
}