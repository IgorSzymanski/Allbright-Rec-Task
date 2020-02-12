import { Test, TestingModule } from '@nestjs/testing'
import { FeedbackService } from './feedback.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Feedback } from './feedback.entity'
import { Comment } from '../comments/comment.entity'
import { CommentsService } from '../comments/comments.service'

describe('FeedbackService', () => {
	let service: FeedbackService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				FeedbackService,
				CommentsService,
				{
					provide: getRepositoryToken(Comment),
					useValue: {},
				},
				{
					provide: getRepositoryToken(Feedback),
					useValue: {},
				},
			],
		}).compile()

		service = module.get<FeedbackService>(FeedbackService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
