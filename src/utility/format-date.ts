import moment = require('moment')

moment.locale('pl')

export const relativeDate = (date?: Date) => date && moment(date).fromNow()

export const formatDate = (date?: Date) =>
	date && moment(date).format('DD.MM.YYYY, hh:mm')
