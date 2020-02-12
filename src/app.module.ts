import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CommentsModule } from './comments/comments.module'
import { FeedbackModule } from './feedback/feedback.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import * as OrmConfig from './orm.config'

@Module({
	imports: [TypeOrmModule.forRoot(OrmConfig), CommentsModule, FeedbackModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	constructor(private readonly connection: Connection) {}
}
