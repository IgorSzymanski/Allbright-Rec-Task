import { ApiProperty } from '@nestjs/swagger'
import { Min, Max, IsInt, IsString, Length } from 'class-validator'
import { Transform } from 'class-transformer'

export class CreateFeedbackDTO {
	@ApiProperty({
		description: "Author's name.",
		minLength: 8,
		maxLength: 20,
		example: 'John Smith',
	})
	@Length(8, 20)
	@IsString()
	author!: string

	@ApiProperty({
		description: 'Title of the feedback',
		minLength: 8,
		maxLength: 30,
	})
	@Length(8, 30)
	@IsString()
	title!: string

	@ApiProperty({
		description: 'Body of the feedback.',
		minLength: 1,
		maxLength: 1000,
	})
	@Length(1, 1000)
	@IsString()
	description!: string

	@ApiProperty({
		description: 'Rating',
		type: 'integer',
		example: 3,
		minimum: 1,
		maximum: 5,
	})
	@Min(1)
	@Max(5)
	@IsInt()
	@Transform(parseInt)
	rating!: number
}
