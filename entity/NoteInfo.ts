import 'reflect-metadata';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Note } from './Note';

@Entity()
export class NoteInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'cover_img' })
  coverImg: string;

  @Column()
  subtitle: string;

  @Column({ name: 'note_text' })
  noteText: string;

  @CreateDateColumn({ type: 'timestamp', name: 'createtime' })
  createTime: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updatetime' })
  updateTime: Date;

  @OneToOne(() => Note)
  @JoinColumn({ name: 'note_id' })
  note: Note;
}