import { Test, TestingModule } from '@nestjs/testing'
import { CommentsService } from './comments.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Comment } from './comment.entity'
import { Feedback } from '../feedback/feedback.entity'
import { FeedbackService } from '../feedback/feedback.service'

describe('CommentsService', () => {
	let service: CommentsService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CommentsService,
				FeedbackService,
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

		service = module.get<CommentsService>(CommentsService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
