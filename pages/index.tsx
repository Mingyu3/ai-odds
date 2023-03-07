import Head from 'next/head';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
	function copyHandler(e: React.MouseEvent<HTMLParagraphElement>) {
		const paragraph = e.target as HTMLParagraphElement;
		const text = paragraph.innerHTML;

		navigator.clipboard
			.writeText(text)
			.then(() => {
				console.log('copied');
			})
			.catch((error) => {
				console.error('copy error: ' + error);
			});
	}

	return (
		<>
			<Head>
				<title>AI ODDS</title>
				<meta
					name='description'
					content='Name functions and variables easier'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<header className='p-3 bg-zinc-700 text-gray-100 flex items-center'>
				<h1 className='text-xl font-bold mr-5'>AI ODDS</h1>
				<nav>
					<ul className='text-sm text-zinc-300 hover:text-zinc-400 cursor-pointer transition duration-150 ease-out'>
						<li>Naming</li>
					</ul>
				</nav>
			</header>

			<main className='flex flex-col items-center mt-5'>
				<div className='w-10/12'>
					<label className='mb-5'>
						<p className='p-2 text-lg text-gray-100'>
							Please provide a description for naming
						</p>
						<textarea
							className='bg-zinc-500 text-zinc-100 w-full'
							name='description'
							rows={3}></textarea>
					</label>
					<div className='text-right'>
						<button className='text-zinc-400 w-4 '>
							<FontAwesomeIcon icon={faSync} spin />
						</button>
					</div>
				</div>
				<div className='w-10/12 text-gray-100 mt-4'>
					<h3 className='py-3'>Functions</h3>
					<div className='flex flex-row justify-around border-2 p-2'>
						<p
							className='cursor-copy hover:text-zinc-400 transition duration-150 ease-out'
							onClick={copyHandler}>
							aaaaaaa
						</p>
						<p
							className='cursor-copy hover:text-zinc-400 transition duration-150 ease-out'
							onClick={copyHandler}>
							bbbb
						</p>
						<p
							className='cursor-copy hover:text-zinc-400 transition duration-150 ease-out'
							onClick={copyHandler}>
							ccccccc
						</p>
					</div>
					<h3 className='py-3 mt-5'>Variables</h3>
					<div className='flex flex-row justify-around border-2 p-2'>
						<p
							className='cursor-copy hover:text-zinc-400 transition duration-150 ease-out'
							onClick={copyHandler}>
							aaaaaaa
						</p>
						<p
							className='cursor-copy hover:text-zinc-400 transition duration-150 ease-out'
							onClick={copyHandler}>
							bbbb
						</p>
						<p
							className='cursor-copy hover:text-zinc-400 transition duration-150 ease-out'
							onClick={copyHandler}>
							ccccccc
						</p>
					</div>
				</div>
			</main>
		</>
	);
}
