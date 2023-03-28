import { ReactNode } from 'react';

interface MainProps {
	children: ReactNode;
}

export default function Main({ children }: MainProps) {
	return (
		<>
			<main className='flex flex-col items-center mt-5'>
				<div className='w-10/12'>{children}</div>
			</main>
		</>
	);
}
