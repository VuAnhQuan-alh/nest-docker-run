import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { UsersModule } from './users/users.module';
import { VideosModule } from './videos/videos.module';
import { SongsModule } from './songs/songs.module';
import { CommentsModule } from './comments/comments.module';
import { FavoritesModule } from './favorites/favorites.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGOOSE_URL'),
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get<string>('MAIL_HOST'),
          secure: false,
          auth: {
            user: config.get<string>('MAIL_USER'),
            pass: config.get<string>('MAIL_PASS'),
          },
        },
        defaults: {
          from: '"No Reply" <noreply@example.com>',
        },
      }),
      inject: [ConfigService],
    }),
    CoreModule,
    AuthModule,
    UsersModule,
    TodoModule,
    VideosModule,
    SongsModule,
    CommentsModule,
    FavoritesModule,
  ],
})
export class AppModule {}
