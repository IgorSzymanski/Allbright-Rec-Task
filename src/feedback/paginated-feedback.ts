import { PaginationType } from '../utility/pagination'
import { Feedback } from './feedback.entity'
import { ApiProperty } from '@nestjs/swagger'

export class PaginatedFeedback extends PaginationType<Feedback> {
	@ApiProperty({ type: [Feedback] })
	items!: Feedback[]
}
