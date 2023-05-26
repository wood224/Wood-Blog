import 'reflect-metadata';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Archive {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: number;

  @CreateDateColumn({ name: 'createtime' })
  createTime: Date;

  @Column()
  update: boolean;

  @Column()
  pid: number;
}