import 'reflect-metadata';
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { NoteInfo } from './NoteInfo';
import { Category } from './Category';
import { Tag } from './Tag';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @CreateDateColumn({ type: 'timestamp', name: 'createtime' })
  createTime: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updatetime' })
  updateTime: Date;

  @Column({ name: 'is_delete' })
  isDelete: number;

  @OneToOne(() => NoteInfo, noteInfo => noteInfo.note, { cascade: true })
  noteInfo: NoteInfo;

  @ManyToOne(() => Category, category => category.notes)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToMany(() => Tag, tag => tag.notes)
  @JoinTable({
    name: 'note_tag',
    joinColumn: {
      name: 'nid',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tid',
      referencedColumnName: 'id'
    }
  })
  tags: Tag[];
}