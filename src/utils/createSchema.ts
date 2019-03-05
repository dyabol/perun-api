import { buildSchema } from 'type-graphql';
import { CreatePageResolver } from '../modules/page/Resolver';
import { CreatePostResolver } from '../modules/post/CreatePost';
import { PostsQueryResolver } from '../modules/post/PostsQuery';
import { ChangePasswordResolver } from '../modules/user/ChangePassword';
import { ConfirmUserResolver } from '../modules/user/ConfirmUser';
import { ForgotPasswordResolver } from '../modules/user/ForgotPassword';
import { LoginResolver } from '../modules/user/Login';
import { LogoutResolver } from '../modules/user/Logout';
import { MeResolver } from '../modules/user/Me';
import { ProfilePictureResolver } from '../modules/user/ProfilePicture';
import { RegisterResolver } from '../modules/user/Register';
import { UserQueryResolver } from '../modules/user/UserQuery';

export const createSchema = () =>
  buildSchema({
    resolvers: [
      ChangePasswordResolver,
      ConfirmUserResolver,
      ForgotPasswordResolver,
      LoginResolver,
      LogoutResolver,
      MeResolver,
      RegisterResolver,
      CreatePostResolver,
      CreatePageResolver,
      PostsQueryResolver,
      UserQueryResolver,
      ProfilePictureResolver
    ],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    }
  });
