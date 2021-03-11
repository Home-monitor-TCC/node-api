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
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  sensor_id: string;

  @Column()
  temperature: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}

export default TemperatureData;
