import 'reflect-metadata';
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { NoteInfo } from './NoteInfo';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @CreateDateColumn({ type: 'timestamp', name: 'createtime' })
  createTime: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updatetime' })
  updateTime: Date;

  @Column()
  delete: number;

  @OneToOne(() => NoteInfo, noteInfo => noteInfo.note, { cascade: true })
  noteInfo: NoteInfo;
}