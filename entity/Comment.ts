import "reflect-metadata";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  content: string;

  @CreateDateColumn({ type: "timestamp", name: "createtime" })
  createTime: Date;
}
