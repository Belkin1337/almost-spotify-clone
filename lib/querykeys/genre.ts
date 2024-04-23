import { QueryKey } from "@tanstack/react-query";

export const genreByParamQueryKey = (param: string): QueryKey => {
	return ["genre", param]
}

export const genresQueryKey: QueryKey = ["genres"]