"use client"

import { Expand } from 'lucide-react';
import { Typography } from "@/ui/typography";
import { useWidget } from "@/lib/hooks/ui/use-widget";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/ui/accordion";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query"
import { useAudioStateQuery } from "@/lib/query/player/audio-state-query";
import { usePlayerStateQuery } from "@/lib/query/player/player-state-query";
import { useVolumeStateQuery } from "@/lib/query/player/volume-state-query";
import { USER_QUERY_KEY } from "@/lib/query/user/user-query";
import { UserEntity } from "@/types/user";

export const Debug = () => {
	const qc = useQueryClient()
	const user = qc.getQueryData<UserEntity>(USER_QUERY_KEY)
	const [open, setOpen] = useState(false);
	const { widgetState } = useWidget()
	const { playerAttributes } = usePlayerStateQuery();
	const { audioAttributes } = useAudioStateQuery()
	const { volumeAttribute } = useVolumeStateQuery()

	const mapProperties = (properties: {
		label: string;
		value: string | null }[]
	) => {
		return properties.map((prop, index) => (
			<Typography key={index}>
				{prop.label}: {prop.value || ''}
			</Typography>
		));
	};

	return (
		<div
			className="absolute z-[1000] right-1/2 top-4 bg-neutral-800 w-fit p-2 rounded-xl h-fit border border-neutral-700">
			{open ? (
				<>
					<Expand onClick={() => setOpen((prevState) => !prevState)}/>
					<Accordion
						type="multiple"
						className="min-w-[400px]"
					>
						<AccordionItem value="all">
							<AccordionTrigger>Player</AccordionTrigger>
							<AccordionContent>
								{playerAttributes ? (
									<div className="flex flex-col">
										{playerAttributes && mapProperties([
											{ label: 'Current Active Song', value: playerAttributes.active?.title || '' },
											{ label: 'Current Position', value: audioAttributes.position?.toString() || '' },
											{ label: 'Is Playing', value: playerAttributes.isPlaying?.toString() || '' },
											{ label: 'Is Loaded', value: playerAttributes.isLoaded?.toString() || '' },
											{ label: 'Current Volume', value: volumeAttribute?.volume?.toString() || '' },
											{ label: 'Widget (opened?)', value: widgetState?.data?.isOpen?.toString() || '' },
										])}
										{audioAttributes.howl ? (
											<Accordion type="multiple" className="min-w-[400px]">
												<AccordionItem value="howl">
													<AccordionTrigger>Audio</AccordionTrigger>
													<AccordionContent>
														{mapProperties([
															{ label: 'Duration', value: audioAttributes.howl.duration().toString() },
															{ label: 'Song Url', value: audioAttributes.songUrl || '' },
															{ label: 'State', value: audioAttributes.howl.state().toString() },
															{ label: 'Loop', value: audioAttributes.howl.loop().toString() },
															{ label: 'Position', value: audioAttributes.howl.pos().toString() },
														])}
													</AccordionContent>
												</AccordionItem>
											</Accordion>
										) : (
											<Typography>No howl instance.</Typography>
										)}
									</div>
								) : (
									<Typography>No active song.</Typography>
								)}
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-2">
							<AccordionTrigger>User</AccordionTrigger>
							<AccordionContent>
								{user ? (
									<div className="flex flex-col">
										{mapProperties([
											// { label: 'Username', value: user.full_name },
											{ label: 'Id', value: user.id },
											{ label: 'Email', value: user.identities![0]?.identity_data?.email || '' },
											{ label: 'Created at', value: user.created_at?.toString() || '' },
											{ label: 'Role', value: user.role },
											{ label: 'Provider', value: user.identities![0]?.provider || '' },
										])}
									</div>
								) : (
									<Typography>Not auth.</Typography>
								)}
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</>
			) : (
				<Expand onClick={() => setOpen((prevState) => !prevState)}/>
			)}
		</div>
	)
}