import { PaginationType } from '../utility/pagination'
import { Comment } from './comment.entity'
import { ApiProperty } from '@nestjs/swagger'

export class PaginatedComment extends PaginationType<Comment> {
	@ApiProperty({ type: [Comment], required: true })
	items!: Comment[]
}
