import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: ['normal', 'important', 'critical'],
    default: 'normal',
  })
  importance: 'normal' | 'important' | 'critical';

  @ManyToOne(() => User, (user) => user.events)
  user: User;
}
