import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import uniqid from "uniqid";

const supabase = createClient();
const uniqueID = uniqid();

export type UploadFileType = "song" | "album" | "artists" | "cover_image" | "user" | "playlist";
export type UploadFileBucketsType = "songs" | "users" | "artists" | "images";

interface IUploadFile {
	bucket: UploadFileBucketsType,
	title: string,
	file: File,
	type: UploadFileType
}

export async function uploadFileToBuckets({
	bucket,
	file,
	type,
	title
}: IUploadFile) {
	const fileName = [type, title, uniqueID].join('-');

	const { data: fileData, error: fileErr } = await supabase
		.storage
		.from(bucket)
		.upload(fileName, file, {
			upsert: true,
			contentType: "fileBody"
		});

	if (fileErr) throw fileErr;

	return { fileData }
}