import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserToken } from './user_tokens.entity';
import { Recipe } from 'src/recipes/entities/recipe.entity';
import { Rating } from 'src/recipes/entities/rating.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => UserToken, (token) => token.user)
  tokens: UserToken[];

  @OneToMany(() => Recipe, (recipe) => recipe.user)
  recipes: Recipe[];

  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
