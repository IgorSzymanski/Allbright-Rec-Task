import {
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	Column,
	Index,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm'
import { Feedback } from '../feedback/feedback.entity'
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger'

@Entity()
export class Comment {
	@PrimaryGeneratedColumn('uuid')
	@ApiProperty({ type: 'string', format: 'uuid' })
	id!: string

	@Column({ nullable: false })
	@Index()
	@ApiProperty({ type: 'string', format: 'uuid' })
	feedbackId!: string

	@ManyToOne(
		() => Feedback,
		feedback => feedback.comments,
	)
	@ApiHideProperty()
	feedback?: Feedback

	@Column({ nullable: false })
	@Index()
	author!: string

	@Column({ nullable: false })
	body!: string

	@CreateDateColumn()
	@ApiProperty({ type: 'string', format: 'date-time' })
	createdDate?: Date

	@UpdateDateColumn()
	@ApiProperty({ type: 'string', format: 'date-time' })
	updatedDate?: Date
}
