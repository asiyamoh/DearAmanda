import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app.config.module';
import { DatabaseModule } from './database/database.module';
import { TopicsModule } from './topics/topics.module';
import { ComplimentsModule } from './compliments/compliments.module';

@Module({
  imports: [AppConfigModule, DatabaseModule, TopicsModule, ComplimentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
