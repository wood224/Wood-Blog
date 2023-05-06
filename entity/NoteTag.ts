import 'reflect-metadata';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Note } from './Note';
import { Tag } from './Tag';

@Entity()
export class NoteTag {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Note)
  n: Note;

  @ManyToOne(() => Tag)
  t: Tag;
}