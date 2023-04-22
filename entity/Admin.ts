import 'reflect-metadata';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AdminInfo } from './AdminInfo';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToOne(() => AdminInfo, adminInfo => adminInfo.admin, { cascade: true })
  adminInfo: AdminInfo;
}