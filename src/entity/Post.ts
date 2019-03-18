import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
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

export enum PostType {
  POST = 'post',
  PAGE = 'page'
}

registerEnumType(PostType, {
  name: 'PostType',
  description: 'Type of post'
});

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

  @Field(_ => PostType)
  @Column({
    type: 'enum',
    enum: PostType,
    default: PostType.POST
  })
  postType: PostType;

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
