import { createWriteStream } from 'fs';
import { GraphQLUpload } from 'graphql-upload';
import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { Upload } from '../../types/Upload';
import { isAuth } from '../middleware/isAuth';

@Resolver()
export class ProfilePictureResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async addProfilePicture(@Arg('picture', () => GraphQLUpload)
  {
    createReadStream,
    filename
  }: Upload): Promise<boolean> {
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(__dirname + `/../../../images/${filename}`))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false))
    );
  }
}
