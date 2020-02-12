import { Injectable, Inject, forwardRef } from '@nestjs/common'
import { CreateCommentDTO } from './create-comment.dto'
import { Repository } from 'typeorm'
import { Comment } from './comment.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { paginate } from '../utility/paginate'
import { FeedbackService } from '../feedback/feedback.service'

@Injectable()
export class CommentsService {
	constructor(
		@InjectRepository(Comment) protected repository: Repository<Comment>,
		@Inject(forwardRef(() => FeedbackService))
		protected feedbackService: FeedbackService,
	) {}

	async listComments(page = 1, limit = 10) {
		return await paginate(this.repository, { page, limit })
	}

	async addComment(dto: CreateCommentDTO) {
		if (await this.feedbackService.findFeedback(dto.feedbackId)) {
			return await this.repository.save(dto)
		}
	}

	async findCommentsForFeedback(id: string, page = 1, limit = 10) {
		return paginate(
			this.repository,
			{ page, limit },
			{ where: { feedbackId: id }, order: { createdDate: 'DESC' } },
		)
	}
}
