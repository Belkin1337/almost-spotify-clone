"use server"

import { createClient } from "@/lib/utils/supabase/server/supabase-server";
import { decode } from "base64-arraybuffer"

export type UploadFileBucketsType = "songs" | "users" | "artists" | "images";

interface IUploadFile {
	bucket: UploadFileBucketsType,
	fileName: string,
	file: string,
	contentType: "image/png" | "audio/mp4"
}

export async function uploadFileToBuckets({
	bucket, file, fileName, contentType
}: IUploadFile) {
	const supabase = await createClient()
	const decodedFile = decode(file)
	
	const { data: fileData, error } = await supabase
		.storage
		.from(bucket)
		.upload(fileName, decodedFile, {
			upsert: true, contentType: contentType
		})
	
	if (error) throw new Error(error.message);

	return fileData
}