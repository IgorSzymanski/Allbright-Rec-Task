export class FeedbackNotFoundError extends Error {
	constructor(readonly id: string) {
		super(`Feedback [id: ${id}] not found!`)
	}
}
