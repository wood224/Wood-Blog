import 'reflect-metadata';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Note } from './Note';
import { Tag } from './Tag';

@Entity()
export class NoteTag {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Note)
  note: Note;

  @ManyToOne(() => Tag)
  tag: Tag;
}