import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { Member } from './Member';
import { Link2Icon } from 'lucide-react';
import { TeamMember } from '@/@types/team-member';

type TeamMembersProps = {
	teamMembers: TeamMember[];
	className?: string;
};

export function TeamMembers({ teamMembers, className }: TeamMembersProps) {
	return (
		<div className={`flex items-start justify-center gap-6 ${className}`}>
			{teamMembers &&
				teamMembers?.map((member) => (
					<Member
						key={member.id}
						name={member.name}
						profilePhoto={member.profilePhotoSrc}
					>
						{member.links.length > 0 &&
							member.links.map((link) => (
								<Link
									key={link.id}
									className={buttonVariants({
										variant: 'secondary',
									})}
									href={link.url}
									target="_blank"
									rel="noopener"
								>
									{link.icon ?? (
										<Link2Icon className="size-4 text-muted-foreground" />
									)}
								</Link>
							))}
					</Member>
				))}
		</div>
	);
}
