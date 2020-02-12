import {
	Controller,
	Post,
	Body,
	Get,
	Query,
	HttpException,
} from '@nestjs/common'
import { CreateCommentDTO } from './create-comment.dto'
import { ApiTags, ApiResponse, ApiCreatedResponse } from '@nestjs/swagger'
import { PaginatedComment } from './paginated-comment'
import { CommentsService } from './comments.service'
import { PaginationQuery } from '../utility/pagination-query'
import { Comment } from './comment.entity'

@ApiTags('comments')
@Controller('api/comments')
export class CommentsApiController {
	constructor(protected readonly service: CommentsService) {}

	@ApiResponse({ type: PaginatedComment })
	@Get()
	async list(@Query() { limit, page }: PaginationQuery) {
		return this.service.listComments(page, limit)
	}

	@Post()
	@ApiCreatedResponse({ type: Comment })
	async create(@Body() dto: CreateCommentDTO) {
		try {
			return await this.service.addComment(dto)
		} catch (e) {
			throw new HttpException(e.message, 400)
		}
	}
}
