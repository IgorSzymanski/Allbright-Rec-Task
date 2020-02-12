import { Test, TestingModule } from '@nestjs/testing'
import { CommentsApiController } from './comments.api-controller'
import { getRepositoryToken } from '@nestjs/typeorm'
import { CommentsService } from './comments.service'
import { Feedback } from '../feedback/feedback.entity'
import { Comment } from './comment.entity'
import { FeedbackService } from '../feedback/feedback.service'

describe('Comments Controller', () => {
	let controller: CommentsApiController

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
			controllers: [CommentsApiController],
		}).compile()

		controller = module.get<CommentsApiController>(CommentsApiController)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})
})
