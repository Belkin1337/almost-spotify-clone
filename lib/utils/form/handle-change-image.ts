import { ChangeEvent } from "react";
import { UseMutationResult } from "@tanstack/react-query";

export const handleChangeImage = (
	event: ChangeEvent<HTMLInputElement>,
	setValues: UseMutationResult<any | undefined, Error, any, unknown>,
	key: any,
) => {
	const file = event.target.files ? event.target.files[0] : null;

	if (file) {
		const reader = new FileReader();

		reader.readAsDataURL(file);
		reader.onload = () => {
			setValues.mutate({
				[key]: reader.result as string
			})
		}
	} else {
		setValues.mutate({
			[key]: ''
		})
	}
}