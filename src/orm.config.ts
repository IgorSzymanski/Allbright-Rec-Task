import { ConnectionOptions } from 'typeorm'
import { Feedback } from './feedback/feedback.entity'
import { Comment } from './comments/comment.entity'

const OrmConfig: ConnectionOptions = {
	type: 'postgres',
	url:
		process.env.DATABASE_URL ||
		'postgres://user:password@localhost:5432/db',
	entities: [Feedback, Comment],
	logging: process.env.NODE_ENV !== 'production' ? 'all' : false,

	// We are using migrations, synchronize should be set to false.
	synchronize: false,

	// Run migrations automatically,
	// you can disable this if you prefer running migration manually.
	migrationsRun: true,
	// logger: 'file',

	// allow both start:prod and start:dev to use migrations
	// __dirname is either dist or src folder, meaning either
	// the compiled js in prod or the ts in dev
	migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
	cli: {
		migrationsDir: 'src/migrations',
	},
}

export = OrmConfig
