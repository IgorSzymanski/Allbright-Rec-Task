import {
	Controller,
	Get,
	Query,
	Render,
	Param,
	Post,
	Body,
	Redirect,
	HttpException,
	UseFilters,
	Res,
} from '@nestjs/common'
import { ApiExcludeEndpoint } from '@nestjs/swagger'
import { FeedbackService } from './feedback.service'
import { PaginationQuery } from '../utility/pagination-query'
import { UUIDQuery } from '../utility/uuid-query'
import { CommentsService } from '../comments/comments.service'
import { CreateFeedbackDTO } from './create-feedback.dto'
import { Http404Filter } from '../filters/http-404.filter'
import { CreateCommentDTO } from '../comments/create-comment.dto'
import { Response } from 'express'

@Controller('feedbacks')
@UseFilters(Http404Filter)
export class FeedbackController {
	constructor(
		protected readonly feedbackService: FeedbackService,
		protected readonly commentsService: CommentsService,
	) {}

	@Get()
	@ApiExcludeEndpoint()
	@Render('pages/feedbacks/index')
	async list(@Query() { page, limit }: PaginationQuery) {
		const result = await this.feedbackService.listFeedbacks(page, limit)
		return {
			...result,
			limit,
			previous: result.page > 1,
			next: result.page < result.pageCount,
		}
	}

	@Get('/add')
	@ApiExcludeEndpoint()
	@Render('pages/feedbacks/add')
	async add() {
		return {}
	}

	@Post()
	@ApiExcludeEndpoint()
	@Redirect('/feedbacks')
	async createFeedback(@Body() dto: CreateFeedbackDTO) {
		await this.feedbackService.addFeedback(dto)
	}

	@Post('/comments')
	@ApiExcludeEndpoint()
	async createComment(@Body() dto: CreateCommentDTO, @Res() res: Response) {
		await this.commentsService.addComment(dto)
		res.redirect('/feedbacks/' + dto.feedbackId)
	}

	@Get('/:id')
	@ApiExcludeEndpoint()
	@Render('pages/feedbacks/comments')
	async listComments(
		@Query() { page, limit }: PaginationQuery,
		@Param() { id }: UUIDQuery,
	) {
		try {
			const feedback = await this.feedbackService.findFeedback(id)
			const comments = await this.commentsService.findCommentsForFeedback(
				id,
				page,
				limit,
			)

			return {
				feedback,
				comments,
				page,
				limit,
				previous: page > 1,
				next: page < comments.pageCount,
			}
		} catch (e) {
			throw new HttpException(e.message, 404)
		}
	}
}
