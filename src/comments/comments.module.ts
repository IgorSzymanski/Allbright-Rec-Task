import { Module, forwardRef } from '@nestjs/common'
import { CommentsService } from './comments.service'
import { CommentsApiController } from './comments.api-controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Comment } from './comment.entity'
import { FeedbackModule } from '../feedback/feedback.module'

@Module({
	imports: [
		TypeOrmModule.forFeature([Comment]),
		forwardRef(() => FeedbackModule),
	],
	providers: [CommentsService],
	controllers: [CommentsApiController],
	exports: [CommentsService],
})
export class CommentsModule {}
