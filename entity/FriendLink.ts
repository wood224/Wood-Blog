import 'reflect-metadata';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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