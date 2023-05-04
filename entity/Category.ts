import 'reflect-metadata';
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryInfo } from './CategoryInfo';
import { Note } from './Note';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'is_delete' })
  isDelete: number;

  @OneToOne(() => CategoryInfo, categoryInfo => categoryInfo.category, { cascade: true })
  categoryInfo: CategoryInfo;

  @OneToMany(() => Note, note => note.category)
  notes: Note[];
}