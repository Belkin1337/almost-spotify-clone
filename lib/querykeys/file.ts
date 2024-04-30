import { QueryKey } from "@tanstack/react-query";

export const imageQueryKey = (bucket: string, path?: string): QueryKey => {
	return ["image", bucket, path]
}

export const backgroundColorSampleQueryKey: QueryKey = ['background_color'];