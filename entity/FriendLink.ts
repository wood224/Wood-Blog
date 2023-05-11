import 'reflect-metadata';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FriendLink {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  introduction: string;

  @Column()
  link: string;

  @Column()
  img: string;

  @CreateDateColumn({ name: 'createtime' })
  createTime: string;
}