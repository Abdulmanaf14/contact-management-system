import { Matches } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['phoneNumber'])
export class User {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column({ type: 'varchar', length: 255 })
  
  name: string | undefined;

  @Column({ type: 'varchar', length: 255 })
  @Matches(/^\+?[1-9]\d{9,14}$/, { message: 'Phone number must be a valid mobile number with at least 10 digits' })
  phoneNumber: string | undefined;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string | undefined;

  @Column({ type: 'varchar', length: 255 })
  password: string | undefined;
   
}

