import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PropsWithChildren } from 'react';

type MemberProps = {
	name: string;
	profilePhoto?: string;
	description?: string;
	className?: string;
} & PropsWithChildren;

export function Member({
	name,
	profilePhoto,
	description,
	children,
	className,
}: MemberProps) {
	return (
		<div className={'flex flex-col gap-3 ' + className}>
			<Avatar className="rounded-full size-18 md:size-24 place-self-center">
				<AvatarImage
					draggable={false}
					loading="lazy"
					src={profilePhoto}
					width={72}
					height={72}
					alt={`${name} photo`}
				/>
				<AvatarFallback className="rounded-xl"></AvatarFallback>
			</Avatar>

			<div className="flex flex-col gap-1 text-center">
				<span className="font-semibold">{name}</span>
				{description && (
					<span className="text-muted-foreground text-sm">
						{description}
					</span>
				)}
				{children && (
					<div id="member-links" className="flex gap-2">
						{children}
					</div>
				)}
			</div>
		</div>
	);
}
