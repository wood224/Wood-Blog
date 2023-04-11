import 'reflect-metadata';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryInfo } from './CategoryInfo';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => CategoryInfo, categoryInfo => categoryInfo.category, { cascade: true })
  categoryInfo: CategoryInfo;
}