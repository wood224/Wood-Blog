import 'reflect-metadata';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { About } from './About';

@Entity()
export class AboutInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @CreateDateColumn({ name: 'createtime' })
  createTime: Date;

  @UpdateDateColumn({ name: 'updatetime' })
  updateTime: Date;

  @ManyToOne(() => About, about => about.aboutInfos)
  @JoinColumn({ name: 'about_id' })
  about: About;
}