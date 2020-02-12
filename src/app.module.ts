import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CommentsModule } from './comments/comments.module'
import { FeedbackModule } from './feedback/feedback.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as OrmConfig from './orm.config'
import { RateLimiterModule, RateLimiterInterceptor } from 'nestjs-rate-limiter'
import { APP_INTERCEPTOR } from '@nestjs/core'

@Module({
	imports: [
		TypeOrmModule.forRoot(OrmConfig),
		CommentsModule,
		FeedbackModule,
		RateLimiterModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_INTERCEPTOR,
			useClass: RateLimiterInterceptor,
		},
	],
})
export class AppModule {}
