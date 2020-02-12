import { Feedback } from '../src/feedback/feedback.entity'
import { Comment } from '../src/comments/comment.entity'
import { ConnectionOptions } from 'typeorm'

export const TestDBConfig: ConnectionOptions = {
	type: 'sqlite',
	database: '../db/test-db.sql',
	entities: [Feedback, Comment],
	synchronize: true,
	dropSchema: true,
	name: 'test',
}
