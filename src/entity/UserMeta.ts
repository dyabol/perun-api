import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { User } from './User';

@ObjectType({ description: 'User meta' })
@Entity()
export class UserMeta extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, user => user.meta, { nullable: false })
  user: User;

  @Field()
  @Column({ unique: true })
  key: string;

  @Field()
  @Column('longtext')
  value: string;
}
