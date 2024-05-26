import { IsNotEmpty, Matches } from 'class-validator';
import { User } from 'src/components/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  name: string | undefined;

  @Column({ type: 'varchar', length: 255 })
  @Matches(/^\+?[1-9]\d{9,14}$/, { message: 'Phone number must be a valid mobile number with at least 10 digits' })

  phoneNumber: string | undefined;

  @Column({ type: 'boolean', default: false })
  isSpam: boolean | undefined;

  @ManyToOne(() => User, user => user.id)
  user?: User;
}
