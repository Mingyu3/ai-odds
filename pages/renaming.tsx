import { useState } from 'react';
import Main from './components/Main';
import Tab from './components/Tab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const CASES = ['Camel', 'Pascal', 'Snake', 'Kebab', 'Upper snake'];

export default function Renaming() {
	const [selectedCase, setSelectedCase] = useState('Camel');

	return (
		<Main>
			<h2 className='p-2 text-lg text-gray-100'>Enter whatever for renaming</h2>
			<div className='flex justify-between'>
				<section className='w-5/12'>
					<Tab
						ITEMS={CASES}
						selectedItem={selectedCase}
						setSelectedItem={setSelectedCase}
					/>
					<textarea
						className='bg-zinc-500 text-zinc-100 w-full h-full py-1 px-2'
						name='description'
						rows={15}></textarea>
				</section>
				<div className='flex items-center'>
					<button className='text-zinc-300 w-12 h-12 font-bold text-xl'>
						<FontAwesomeIcon icon={faArrowRight} />
					</button>
				</div>
				<section className='w-5/12'>
					<div className='flex items-center justify-center w-full border rounded border-zinc-100 bg-zinc-900 h-10'>
						<span className='text-zinc-300'>Result</span>
					</div>
					<textarea
						className='bg-zinc-500 text-zinc-100 w-full h-full py-1 px-2'
						name='description'
						rows={15}></textarea>
				</section>
			</div>
		</Main>
	);
}
