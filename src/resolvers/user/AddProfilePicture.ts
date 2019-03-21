import { createWriteStream } from 'fs';
import { GraphQLUpload } from 'graphql-upload';
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { Context } from '../../types/Context';
import { Upload } from '../../types/Upload';
import { isAuth } from '../middleware/isAuth';

@Resolver()
export class ProfilePictureResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async addProfilePicture(
    @Arg('picture', () => GraphQLUpload)
    { createReadStream }: Upload,
    @Ctx() ctx: Context
  ): Promise<boolean | null> {
    if (ctx.req.session!.userId) {
      return new Promise(async (resolve, reject) => {
        return createReadStream()
          .pipe(
            createWriteStream(
              __dirname +
                `/../../../public/avatars/${ctx.req.session!.userId}.jpg`
            )
          )
          .on('finish', () => {
            resolve(true);
          })
          .on('error', () => {
            reject(false);
          });
      });
    }
    return null;
  }
}
