import { IsInt, Min, IsOptional } from 'class-validator'
import { Transform } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class PaginationQuery {
	@IsOptional()
	@IsInt()
	@Transform(parseInt)
	@Min(1)
	@ApiProperty({
		description: 'Page number.',
		type: 'integer',
		required: false,
		default: 1,
		minimum: 1,
	})
	page = 1

	@IsOptional()
	@IsInt()
	@Min(1)
	@Transform(parseInt)
	@ApiProperty({
		description: 'Items per page.',
		type: 'integer',
		required: false,
		default: 10,
		minimum: 1,
	})
	limit = 10
}
