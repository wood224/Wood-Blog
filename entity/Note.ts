import 'reflect-metadata';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { NoteInfo } from './NoteInfo';
import { Category } from './Category';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'cover_img' })
  coverImg: string;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @CreateDateColumn({ type: 'timestamp', name: 'createtime' })
  createTime: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updatetime' })
  updateTime: Date;

  @Column()
  delete: number;

  @OneToOne(() => NoteInfo, noteInfo => noteInfo.note, { cascade: true })
  noteInfo: NoteInfo;

  @ManyToOne(() => Category, category => category.notes)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}