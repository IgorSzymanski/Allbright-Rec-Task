import { Controller, Get, Render } from '@nestjs/common'
import { ApiExcludeEndpoint } from '@nestjs/swagger'

@Controller()
export class AppController {
	@Get()
	@Render('pages/index')
	@ApiExcludeEndpoint()
	index() {
		return {}
	}

	@Get('/404')
	@Render('pages/404')
	@ApiExcludeEndpoint()
	error404() {
		return {}
	}
}
