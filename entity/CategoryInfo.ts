import 'reflect-metadata';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Category } from './Category';

@Entity()
export class CategoryInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'cover_img' })
  coverImg: string;

  @Column()
  introduction: string;

  @CreateDateColumn({ type: 'timestamp', name: 'createtime' })
  createTime: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updatetime' })
  updateTime: Date;

  @OneToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category
}