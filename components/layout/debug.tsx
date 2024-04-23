"use client"

import { Expand } from 'lucide-react';
import { Typography } from "@/ui/typography";
import { useWidget } from "@/lib/hooks/ui/use-widget";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/ui/accordion";
import { useUserQuery } from "@/lib/query/user/user-query";
import { useState } from "react";
import { useAudioStateQuery } from "@/lib/query/player/audio-state-query";
import { usePlayerStateQuery } from "@/lib/query/player/player-state-query";
import { useVolumeStateQuery } from "@/lib/query/player/volume-state-query";

export const Debug = () => {
	const [open, setOpen] = useState(false);

	const { data: user } = useUserQuery();
	const { widgetState } = useWidget()
	const { playerAttributes } = usePlayerStateQuery();
	const { audioAttributes } = useAudioStateQuery()
	const { volumeAttribute } = useVolumeStateQuery()

	return (
		<div className="absolute z-40 right-1/2 top-4 bg-neutral-800 w-fit p-2 rounded-xl h-fit border border-neutral-700">
			{open ? (
				<>
					<Expand onClick={() => {
						setOpen((prevState) => !prevState);
					}}/>
					<Accordion type="multiple" className="min-w-[400px]">
						<AccordionItem value="all">
							<AccordionTrigger>
								song state
							</AccordionTrigger>
							<AccordionContent>
								{playerAttributes?.active ? (
										<div className="flex flex-col">
											<Typography>
												Current Active Song: {playerAttributes?.active?.title || ''}
											</Typography>
											<Typography>
												Current Position: {audioAttributes.position || ''}
											</Typography>
											<Typography>
												Is Playing: {playerAttributes?.isPlaying?.toString()}
											</Typography>
											<Typography>
												Is Loaded: {playerAttributes?.isLoaded?.toString()}
											</Typography>
											<Typography>
												Current Volume: {volumeAttribute?.volume?.toString()}
											</Typography>
											<Typography>
												Widget (opened?): {widgetState?.data?.isOpen?.toString()}
											</Typography>
											{audioAttributes.howl ? (
												<Accordion type="multiple" className="min-w-[400px]">
													<AccordionItem value="howl">
														<AccordionTrigger>
															Howl Instance
														</AccordionTrigger>
														<AccordionContent>
															<Typography>
																Duration: {audioAttributes.howl?.duration().toString()}
															</Typography>
															<Typography>
																Song Url: {audioAttributes.songUrl}
															</Typography>
															<Typography>
																State: {audioAttributes.howl?.state().toString()}
															</Typography>
															<Typography>
																Loop: {audioAttributes.howl?.loop().toString()}
															</Typography>
															<Typography>
																Position: {audioAttributes.howl?.pos().toString()}
															</Typography>
														</AccordionContent>
													</AccordionItem>
												</Accordion>
											) : (
												<Typography>No howl instance.</Typography>
											)}
										</div>
									) :
									<Typography>No actived song.</Typography>
								}
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-2">
							<AccordionTrigger>
								user state
							</AccordionTrigger>
							<AccordionContent>
								{user ? (
										<div className="flex flex-col">
											<Typography>
												Username: {user.full_name}
											</Typography>
											<Typography>
												Id: {user.id}
											</Typography>
											<Typography>
												Email: {user.email?.toString()}
											</Typography>
											<Typography>
												Created at: {user.created_at?.toString()}
											</Typography>
											<Typography>
												Attributes:
												<p>
													Public profile: {user.attributes?.is_public?.toString()}
												</p>
												<p>
													Shuffled mode: {user.attributes?.is_shuffle?.toString()}
												</p>
											</Typography>
										</div>
									) :
									<Typography>Not auth.</Typography>
								}
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</>
			) : (
				<Expand onClick={() => {
					setOpen((prevState) => !prevState);
				}}/>
			)}
		</div>
	)
}