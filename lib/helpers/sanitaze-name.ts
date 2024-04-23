export const sanitizeName = (value: string) => {
	const sanitizedName = value.replace(/[^a-zA-Z0-9]/g, '');

	return sanitizedName;
};