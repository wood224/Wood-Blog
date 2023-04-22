import 'reflect-metadata';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Admin } from './Admin';

@Entity()
export class AdminInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  avatar: string;

  @Column()
  name: string;

  @Column()
  signature: string;

  @Column()
  technology: string;

  @OneToOne(() => Admin)
  @JoinColumn({ name: 'admin_id' })
  admin: Admin;
}