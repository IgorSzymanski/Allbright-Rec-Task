import { IsUUID } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UUIDQuery {
	@IsUUID()
	@ApiProperty({
		description: "Item's UUID.",
		required: true,
		type: 'string',
		format: 'uuid',
	})
	id!: string
}
