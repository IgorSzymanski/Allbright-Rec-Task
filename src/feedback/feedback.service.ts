import { Injectable, Inject, forwardRef } from '@nestjs/common'
import { CreateFeedbackDTO } from './create-feedback.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Feedback } from './feedback.entity'
import { Repository } from 'typeorm'
import { CommentsService } from '../comments/comments.service'
import { FeedbackNotFoundError } from './feedback-not-found.error'
import { paginate } from '../utility/paginate'

@Injectable()
export class FeedbackService {
	constructor(
		@InjectRepository(Feedback)
		protected readonly repository: Repository<Feedback>,
		@Inject(forwardRef(() => CommentsService))
		protected readonly commentService: CommentsService,
	) {}

	async addFeedback(dto: CreateFeedbackDTO) {
		return await this.repository.save(dto)
	}

	async listFeedbacks(page = 1, limit = 10) {
		return await paginate(
			this.repository
				.createQueryBuilder('f')
				.loadRelationCountAndMap('f.commentCount', 'f.comments')
				.orderBy('f.createdDate', 'DESC'),
			{ limit, page },
		)
	}

	async findFeedback(id: string) {
		const feedback = await this.repository.findOne(id)
		if (feedback) {
			return feedback
		} else {
			throw new FeedbackNotFoundError(id)
		}
	}
}
