import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from './User';

@ObjectType({ description: 'Posts' })
@Entity()
export class Post extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  slug: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column('longtext')
  content: string;

  @Field()
  @Column({ default: false })
  deleted: boolean;

  @Field(() => User)
  @ManyToOne(() => User, user => user.posts, { nullable: false })
  user: User;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
