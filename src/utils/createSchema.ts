import { buildSchema } from 'type-graphql';
import { CreatePageResolver } from '../resolvers/page/CreatePage';
import { CreatePostResolver } from '../resolvers/post/CreatePost';
import { PostsQueryResolver } from '../resolvers/post/Posts';
import { ProfilePictureResolver } from '../resolvers/user/AddProfilePicture';
import { ChangePasswordResolver } from '../resolvers/user/ChangePassword';
import { ConfirmUserResolver } from '../resolvers/user/ConfirmUser';
import { ForgotPasswordResolver } from '../resolvers/user/ForgotPassword';
import { LoginResolver } from '../resolvers/user/Login';
import { LogoutResolver } from '../resolvers/user/Logout';
import { MeResolver } from '../resolvers/user/Me';
import { RegisterResolver } from '../resolvers/user/Register';
import { UserQueryResolver } from '../resolvers/user/User';

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
