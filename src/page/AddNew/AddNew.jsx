import { useGetProjectsQuery } from '../../features/projects/projectsApi';
import { useGetMembersQuery } from '../../features/teamMembers/teamMembersApi';
import Loading from '../../ui/Loading';
import Form from './Form/Form';

export default function AddNew() {
	// hooks
	const { data: members, isLoading: membersLoading } = useGetMembersQuery();
	const { data: projects, isLoading: projectsLoading } =
		useGetProjectsQuery();

	// decide what to render
	let content;
	if (membersLoading || projectsLoading) {
		content = <Loading />;
	} else if (members.length && projects.length) {
		content = <Form members={members} projects={projects} />;
	}

	return (
		<div>
			<div className='container relative'>
				<main className='relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none'>
					<h1 className='mt-4 mb-8 text-3xl font-bold text-center text-gray-800'>
						Create Task for Your Team
					</h1>

					<div className='justify-center mb-10 space-y-2 md:flex md:space-y-0'>
						{content}
					</div>
				</main>
			</div>
		</div>
	);
}
