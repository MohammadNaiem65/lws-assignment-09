import { useGetMembersQuery } from '../../../features/teamMembers/teamMembersApi';
import { Error, Loading, NoContent } from '../../../ui';
import {
	akashImg,
	almasImg,
	ferdousImg,
	riyadhImg,
	sadhImg,
	salahuddinImg,
	sumitImg,
} from '../../../assets';

export default function TeamMembers() {
	// hooks
	const {
		data: members,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetMembersQuery();

	// local states
	const teamMembers = {
		akash: akashImg,
		almas: almasImg,
		ferdous: ferdousImg,
		riyadh: riyadhImg,
		sadh: sadhImg,
		salahuddin: salahuddinImg,
		sumit: sumitImg,
	};

	// decide what to render
	let content;

	if (isLoading) {
		content = <Loading />;
	} else if (!isLoading && isError) {
		content = <Error message={error} />;
	} else if (!isLoading && isSuccess && members.length === 0) {
		content = <NoContent />;
	} else if (!isLoading && isSuccess && members.length > 0) {
		content = (
			<>
				{members.map((task) => (
					<div key={task.id} className='checkbox-container'>
						<img
							src={
								teamMembers[
									task.avatar.split('/').pop().split('.')[0]
								]
							}
							className='team-avater'
						/>
						<p className='label'>{task.name}</p>
					</div>
				))}
			</>
		);
	}

	console.log('TeamMembers component rendered');

	return (
		<section className='mt-8'>
			<h3 className='text-xl font-bold'>Team Members</h3>
			<div className='mt-3 space-y-4'>{content}</div>
		</section>
	);
}
