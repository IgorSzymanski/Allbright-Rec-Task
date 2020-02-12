import { BaseExceptionFilter } from '@nestjs/core'
import { Catch, HttpException, ArgumentsHost } from '@nestjs/common'
import { Response } from 'express'

@Catch(HttpException)
export class Http404Filter extends BaseExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()
		const status = exception.getStatus()

		if (status === 404) {
			response.redirect('/404')
		} else {
			throw exception
		}
	}
}
