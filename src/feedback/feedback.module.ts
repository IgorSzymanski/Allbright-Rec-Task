import { Module, forwardRef } from '@nestjs/common'
import { FeedbackService } from './feedback.service'
import { FeedbackController } from './feedback.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Feedback } from './feedback.entity'
import { FeedbackApiController } from './feedback.api-controller'
import { CommentsModule } from '../comments/comments.module'

@Module({
	imports: [
		TypeOrmModule.forFeature([Feedback]),
		forwardRef(() => CommentsModule),
	],
	providers: [FeedbackService],
	controllers: [FeedbackController, FeedbackApiController],
	exports: [FeedbackService],
})
export class FeedbackModule {}
