import { buildSchema } from 'type-graphql';
import { CreatePostResolver } from '../resolvers/post/CreatePost';
import { DeletePostResolver } from '../resolvers/post/DeletePost';
import { EditPostResolver } from '../resolvers/post/EditPost';
import { PostQueryResolver } from '../resolvers/post/Post';
import { PostsQueryResolver } from '../resolvers/post/Posts';
import { PostsCountQueryResolver } from '../resolvers/post/PostsCount';
import { ProfilePictureResolver } from '../resolvers/user/AddProfilePicture';
import { ChangePasswordResolver } from '../resolvers/user/ChangePassword';
import { ConfirmUserResolver } from '../resolvers/user/ConfirmUser';
import { ForgotPasswordResolver } from '../resolvers/user/ForgotPassword';
import { LoginResolver } from '../resolvers/user/Login';
import { LogoutResolver } from '../resolvers/user/Logout';
import { MeResolver } from '../resolvers/user/Me';
import { RegisterResolver } from '../resolvers/user/Register';
import { UserQueryResolver } from '../resolvers/user/User';
import { CreateUserMetaResolver } from '../resolvers/userMeta/CreateMeta';

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
      PostsQueryResolver,
      PostQueryResolver,
      UserQueryResolver,
      ProfilePictureResolver,
      CreateUserMetaResolver,
      EditPostResolver,
      PostsCountQueryResolver,
      DeletePostResolver
    ],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    }
  });
