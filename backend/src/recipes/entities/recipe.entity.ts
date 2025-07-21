import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { User } from 'src/modules/user/entities/user.entity';
import { Rating } from './rating.entity';

@Entity('recipes')
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column('simple-array')
  ingredients: string[];

  @Column('simple-array')
  instructions: string[];

  @Column({ nullable: true })
  cookTime: number;

  @Column({ nullable: true })
  imageUrl: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.recipes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Rating, (rating) => rating.recipe, { cascade: true })
  ratings: Rating[];

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  averageRating: number;

  @Column({ default: 0 })
  totalRatings: number;
}
