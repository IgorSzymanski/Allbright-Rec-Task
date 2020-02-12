import {
	Controller,
	Get,
	Post,
	Body,
	Query,
	Param,
	HttpException,
} from '@nestjs/common'
import { ApiTags, ApiResponse } from '@nestjs/swagger'
import { CreateFeedbackDTO } from './create-feedback.dto'
import { FeedbackService } from './feedback.service'
import { PaginationQuery } from '../utility/pagination-query'
import { CommentsService } from '../comments/comments.service'
import { UUIDQuery } from '../utility/uuid-query'
import { PaginatedFeedback } from './paginated-feedback'

@ApiTags('feedbacks')
@Controller('api/feedbacks')
export class FeedbackApiController {
	constructor(
		protected readonly feedbackService: FeedbackService,
		protected readonly commentService: CommentsService,
	) {}

	@Get()
	@ApiResponse({ type: PaginatedFeedback })
	async list(@Query() { page, limit }: PaginationQuery) {
		return await this.feedbackService.listFeedbacks(page, limit)
	}

	@Get('/:id')
	async show(@Param() { id }: UUIDQuery) {
		try {
			return await this.feedbackService.findFeedback(id)
		} catch (e) {
			throw new HttpException(e.message, 404)
		}
	}

	@Get('/:id/comments')
	async listComments(
		@Param() { id }: UUIDQuery,
		@Query() { page, limit }: PaginationQuery,
	) {
		try {
			return await this.commentService.findCommentsForFeedback(
				id,
				page,
				limit,
			)
		} catch (e) {
			throw new HttpException(e.message, 404)
		}
	}

	@Post()
	async create(@Body() dto: CreateFeedbackDTO) {
		return await this.feedbackService.addFeedback(dto)
	}
}
