"use client"

import { Typography } from "@/ui/typography";
import { PlaylistEntity } from "@/types/playlist";
import { FormFieldItem } from "@/ui/form-field";
import { Input } from "@/ui/input";
import { FormField } from "@/ui/form";
import { zodPlaylistSchema } from "@/components/forms/playlist/hooks/use-update-playlist";
import { UseFormReturn } from "react-hook-form";
import { useRef } from "react";
import Image from "next/image";
import { Button } from "@/ui/button";

export const PlaylistEditFields = ({
	playlist,
	form
}: {
	playlist: PlaylistEntity,
	form: UseFormReturn<zodPlaylistSchema>
}) => {
	const imageRef = useRef(null);

	return (
		<div className="flex flex-col p-6 bg-neutral-800 gap-y-4 rounded-xl overflow-hidden w-full">
			<Typography size="xl" font="semibold">
				Edit details
			</Typography>
			<div className="flex items-stretch w-full h-[196px] gap-x-4">
				<div className="flex justify-center group items-center h-[196px] w-[196px] rounded-md overflow-hidden relative">
					<Image
						src={"/images/liked.png"}
						width={660}
						height={660}
						loading="lazy"
						alt={playlist.title}
						className="w-full h-full object-cover"
					/>
					<div
						className="group-hover:flex flex-col gap-y-4 cursor-pointer items-center justify-center hidden w-full
						top-0 bg-black/60 right-0 left-0 bottom-0 absolute h-full">
						<FormField
							control={form.control}
							name="image"
							render={({
								field: {
									onChange,
									...field
								}
							}) => (
								<FormFieldItem {...field}>
									<Input
										name="playlist_image"
										accept="image/*"
										type="file"
										className="!h-[196px] !w-[196px] border !bg-transparent"
									/>
								</FormFieldItem>
							)}
						/>
					</div>
				</div>
				<div className="flex flex-col gap-y-2 grow">
					<FormField
						control={form.control}
						name="title"
						render={({
							field: {
								onChange,
								...field
							}
						}) => (
							<FormFieldItem {...field}>
								<Input
									placeholder='Name...'
									name="playlist_name"
									autoComplete='false'
									autoCorrect='false'
									className="!bg-neutral-700 !py-2"
								/>
							</FormFieldItem>
						)}
					/>
					<div className="flex grow w-full border">
						<FormField
							control={form.control}
							name="description"
							render={({
								field: {
									onChange,
									...field
								}
							}) => (
								<FormFieldItem {...field}>
									<Input
										placeholder='Add an optional description'
										name="playlist_description"
										autoComplete='false'
										autoCorrect='false'
										className="!bg-neutral-700 !py-2 !h-full !justify-start"
									/>
								</FormFieldItem>
							)}
						/>
					</div>
				</div>
			</div>
			<div className="flex justify-end w-full">
				<Button rounded="full" align="centered" className="bg-white px-10 py-3">
					<Typography size="large" font="semibold" text_color="black">
						Save
					</Typography>
				</Button>
			</div>
			<Typography size="super_small" font="semibold">
				By proceeding, you agree to give Smotify access to the image you choose to upload.
				Please make sure you have the right to upload the image.
			</Typography>
		</div>
	)
}