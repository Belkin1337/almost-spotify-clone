import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { UploadFileBucketsType } from "@/lib/utils/file/upload-file-to-buckets";

const supabase = createClient();

type DeleteFileFromBucketsType = {
	bucket: UploadFileBucketsType,
	path: string
}

export async function deleteFileFromBuckets({
	bucket,
	path
}: DeleteFileFromBucketsType) {
	const { data: fileData, error: fileErr } = await supabase
		.storage
		.from(bucket)
		.remove([path])

	if (fileErr) throw fileErr;

	return { fileData }
}