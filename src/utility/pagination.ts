import { ApiProperty } from '@nestjs/swagger'

export class Pagination<PaginationObject> {
	constructor(
		public readonly items: PaginationObject[],
		public readonly itemCount: number,
		public readonly totalItems: number,
		public readonly pageCount: number,
		public readonly page: number,
	) {}
}

export abstract class PaginationType<PaginationObject> {
	abstract readonly items: PaginationObject[]

	@ApiProperty({ type: 'number', required: true })
	readonly itemCount!: number

	@ApiProperty({ type: 'number', required: true })
	readonly totalItems!: number

	@ApiProperty({ type: 'number', required: true })
	readonly pageCount!: number

	@ApiProperty({ type: 'number', required: true })
	readonly page!: number
}
