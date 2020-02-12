import {
	Repository,
	FindConditions,
	FindManyOptions,
	SelectQueryBuilder,
} from 'typeorm'
import { Pagination } from './pagination'
import { IPaginationOptions } from './pagination-options.interface'

function createPaginationObject<T>(
	items: T[],
	total: number,
	page: number,
	limit: number,
) {
	return new Pagination(
		items,
		items.length,
		total,
		Math.ceil(total / limit),
		page,
	)
}

async function paginateQueryBuilder<T>(
	queryBuilder: SelectQueryBuilder<T>,
	{ page, limit }: IPaginationOptions,
): Promise<Pagination<T>> {
	const [items, total] = await queryBuilder
		.limit(limit)
		.offset((page - 1) * limit)
		.getManyAndCount()

	return createPaginationObject<T>(items, total, page, limit)
}

async function paginateRepo<T>(
	repository: Repository<T>,
	{ page, limit }: IPaginationOptions,
	searchOptions?: FindConditions<T> | FindManyOptions<T>,
): Promise<Pagination<T>> {
	const [items, total] = await repository.findAndCount({
		skip: (page - 1) * limit,
		take: limit,
		...searchOptions,
	})

	return createPaginationObject<T>(items, total, page, limit)
}

export async function paginate<T>(
	repository: Repository<T>,
	options: IPaginationOptions,
	searchOptions?: FindConditions<T> | FindManyOptions<T>,
): Promise<Pagination<T>>
export async function paginate<T>(
	queryBuilder: SelectQueryBuilder<T>,
	options: IPaginationOptions,
): Promise<Pagination<T>>
export async function paginate<T>(
	repositoryOrQueryBuilder: Repository<T> | SelectQueryBuilder<T>,
	options: IPaginationOptions,
	searchOptions?: FindConditions<T> | FindManyOptions<T>,
) {
	return repositoryOrQueryBuilder instanceof Repository
		? paginateRepo<T>(repositoryOrQueryBuilder, options, searchOptions)
		: paginateQueryBuilder(repositoryOrQueryBuilder, options)
}
