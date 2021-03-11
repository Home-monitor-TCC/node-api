import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("component")
class Component {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Exclude()
  board_id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  pin: number;

  @Column()
  type: number;

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}

export default Component;
