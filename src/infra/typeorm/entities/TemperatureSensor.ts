import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("temperature_sensor")
class TemperatureSensor {
  @PrimaryColumn()
  id: string;

  @Generated("uuid")
  @Column()
  data_group_id: string;

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}

export default TemperatureSensor;
