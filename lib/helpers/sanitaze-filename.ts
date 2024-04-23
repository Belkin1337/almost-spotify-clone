export const sanitizeFileName = (
	file: File
): File => {
	const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9]/g, '');

	const sanitizedFile = new File([file], sanitizedFileName, {
		type: file.type
	});

	return sanitizedFile;
};