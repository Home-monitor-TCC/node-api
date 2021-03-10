import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("temperature_sensor")
class TemperatureSensor {
  @PrimaryColumn()
  id: string;

  @Column()
  data_group_id: string;

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}
