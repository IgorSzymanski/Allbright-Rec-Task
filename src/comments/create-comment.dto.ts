import { ApiProperty } from '@nestjs/swagger'
import { Length, IsString, IsUUID } from 'class-validator'

export class CreateCommentDTO {
	@ApiProperty({
		description: 'ID of the parent feedback.',
		type: 'string',
		format: 'uuid',
	})
	@IsUUID()
	feedbackId!: string

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
		description: 'Body of the comment.',
		minLength: 1,
		maxLength: 1000,
	})
	@Length(1, 1000)
	@IsString()
	body!: string
}
