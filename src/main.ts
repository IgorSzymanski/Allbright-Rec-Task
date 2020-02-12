import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { join } from 'path'
import hbs = require('express-handlebars')
import { ValidationPipe } from '@nestjs/common'
import { relativeDate, formatDate } from './utility/format-date'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)

	app.useGlobalPipes(new ValidationPipe({ transform: true }))

	const options = new DocumentBuilder()
		.setTitle('Allbright Technologies - Recruitment Task API')
		.setDescription('The cats API description')
		.setVersion('1.0')
		.build()

	const document = SwaggerModule.createDocument(app, options)
	SwaggerModule.setup('api', app, document)

	app.useStaticAssets(join(__dirname, '..', 'public'))
	app.setBaseViewsDir(join(__dirname, '..', 'views'))
	app.engine(
		'hbs',
		hbs({
			extname: 'hbs',
			defaultLayout: 'default',
			layoutsDir: join(__dirname, '..', 'views/layouts/'),
			partialsDir: join(__dirname, '..', 'views/partials/'),
			helpers: {
				formatDate,
				relativeDate,
			},
		}),
	)
	app.setViewEngine('hbs')

	const PORT = Number(process.env.PORT) || 3000

	await app.listen(PORT, () => {
		console.log(`The app is running on port ${PORT}.`)
	})
}
bootstrap()
