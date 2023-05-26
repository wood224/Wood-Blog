import 'reflect-metadata';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { AboutInfo } from './AboutInfo';

@Entity()
export class About {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn({ name: 'createtime' })
  createTime: Date;

  @UpdateDateColumn({ name: 'updatetime' })
  updateTime: Date;

  @OneToMany(() => AboutInfo, aboutInfo => aboutInfo.about)
  aboutInfos: AboutInfo[];
}