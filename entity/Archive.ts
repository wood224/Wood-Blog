import 'reflect-metadata';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Category } from './Category';
import { Note } from './Note';
import { Tag } from './Tag';

@Entity()
export class Archive {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: number;

  @CreateDateColumn({ name: 'createtime' })
  createTime: string;

  @Column()
  update: boolean;

  @Column()
  pid: number;
}