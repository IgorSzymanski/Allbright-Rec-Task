import { Test, TestingModule } from '@nestjs/testing'
import { FeedbackApiController } from './feedback.api-controller'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Feedback } from './feedback.entity'
import { CommentsService } from '../comments/comments.service'
import { Comment } from '../comments/comment.entity'
import { FeedbackService } from './feedback.service'

describe('Feedback Controller', () => {
	let controller: FeedbackApiController

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [FeedbackApiController],
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

		controller = module.get(FeedbackApiController)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})
})
