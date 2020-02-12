import {
	Entity,
	PrimaryGeneratedColumn,
	OneToMany,
	UpdateDateColumn,
	CreateDateColumn,
	Column,
} from 'typeorm'
import { Comment } from '../comments/comment.entity'
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger'

@Entity()
export class Feedback {
	@PrimaryGeneratedColumn('uuid')
	@ApiProperty({ type: 'string', format: 'uuid' })
	id!: string

	@Column({ nullable: false })
	@ApiProperty({ type: 'string' })
	author!: string

	@Column({ nullable: false })
	@ApiProperty({ type: 'string' })
	title!: string

	@Column({ nullable: false })
	@ApiProperty({ type: 'string' })
	description!: string

	@Column('int', { nullable: false })
	@ApiProperty({ type: 'integer', minimum: 1, maximum: 5 })
	rating!: number

	@OneToMany(
		() => Comment,
		comment => comment.feedback,
	)
	@ApiHideProperty()
	comments?: Comment[]

	@ApiProperty({ type: 'integer', minimum: 0 })
	commentCount?: number

	@CreateDateColumn()
	@ApiProperty({ type: 'string', format: 'date-time' })
	createdDate?: Date

	@UpdateDateColumn()
	@ApiProperty({ type: 'string', format: 'date-time' })
	updatedDate?: Date
}
