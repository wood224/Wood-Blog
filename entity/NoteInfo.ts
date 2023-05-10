import 'reflect-metadata';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Note } from './Note';
@Entity()
export class NoteInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'note_text' })
  noteText: string;

  @OneToOne(() => Note)
  @JoinColumn({ name: 'note_id' })
  note: Note;
}