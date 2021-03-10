import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("temperature_data")
class TemperatureData {
  @PrimaryColumn()
  id: string;

  @Column()
  sensor_id: string;

  @Column()
  date: Date;

  @Column()
  temperature: number;

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}
