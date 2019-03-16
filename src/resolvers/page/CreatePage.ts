import { Field, InputType } from 'type-graphql';
import { Page } from '../../entity/Page';
import { createResolver } from '../utils/CreateResolver';

@InputType()
class PageInput {
  @Field()
  title: string;
  @Field()
  slug: string;
  @Field()
  content: string;
}

export const CreatePageResolver = createResolver('Page', Page, PageInput, Page);
