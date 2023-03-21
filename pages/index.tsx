import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import CopyAlert from './components/CopyAlert';

const Identifiers = [
	'Function',
	'Method',
	'Variable',
	'Class',
	'Id(html)',
	'Class(html)',
];

export default function Home() {
	const [description, setDescription] = useState('');
	const [result, setResult] = useState([]);
	const [selectedIdentifier, setSelectedIdentifier] = useState('Function');
	const [textCopied, setTextCopied] = useState(false);

	function handleTextarea(event: React.ChangeEvent<HTMLTextAreaElement>) {
		setDescription(event.target.value);
	}

	function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
		if (event.shiftKey && event.key === 'Enter') {
			setDescription((prevDesc) => prevDesc + '\n');
		} else if (event.key === 'Enter') {
			handleSubmit(event);
		}
	}

	async function handleSubmit(event: any) {
		event.preventDefault();
		try {
			const response = await fetch('/api/generate', {
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify({
					description: description,
					identifier: selectedIdentifier,
				}),
			});

			const data = await response.json();
			if (response.status !== 200) {
				throw (
					data.error ||
					new Error(`Request failed with status ${response.status}`)
				);
			}

			setResult(data.result.split(','));
		} catch (error: any) {
			console.error(error);
			alert(error.message);
		}
	}

	function copyText(e: React.MouseEvent<HTMLParagraphElement>) {
		const paragraph = e.target as HTMLParagraphElement;
		const text = paragraph.innerHTML;

		navigator.clipboard
			.writeText(text)
			.then(() => {
				console.log('copied');
				setTextCopied(true);
			})
			.catch((error) => {
				console.error('copy error: ' + error);
			});
	}

	interface NameProps {
		key: number;
		name: String;
	}
	const Name = (props: NameProps) => {
		return (
			<p
				className='cursor-copy hover:text-zinc-400 transition duration-150 ease-out'
				onClick={copyText}>
				{props.name}
			</p>
		);
	};

	useEffect(() => {
		if (textCopied === true) {
			setTimeout(() => {
				setTextCopied(false);
			}, 1000);
		}
	}, [textCopied]);

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
				<h1 className='font-bold mr-5'>AI ODDS</h1>
				<nav>
					<ul className='text-sm text-zinc-300 hover:text-zinc-400 cursor-pointer transition duration-150 ease-out'>
						<li>Naming</li>
					</ul>
				</nav>
			</header>

			<CopyAlert show={textCopied} />

			<main className='flex flex-col items-center mt-5'>
				<form className='w-10/12' onSubmit={handleSubmit}>
					<p className='p-2 text-lg text-gray-100'>
						Enter a description for naming
					</p>
					<ul className='flex items-center w-full border rounded border-zinc-100 bg-zinc-900 cursor-pointer h-10'>
						{Identifiers.map((item, idx) => (
							<li
								key={idx}
								onClick={() => setSelectedIdentifier(item)}
								className='w-full text-center transition ease-in-out duration-300 hover:scale-110 '>
								<div
									className={
										selectedIdentifier === item
											? 'text-md text-zinc-100 font-bold'
											: 'text-sm text-zinc-300'
									}>
									{item}
								</div>
							</li>
						))}
					</ul>
					<label className='mb-5'>
						<textarea
							className='bg-zinc-500 text-zinc-100 w-full py-1 px-2'
							onChange={handleTextarea}
							onKeyDown={handleKeyDown}
							value={description}
							name='description'
							rows={3}></textarea>
					</label>
					<div className='text-right'>
						<button
							type='submit'
							className='text-zinc-300 p-1 rounded hover:bg-zinc-900 hover:text-zinc-400 active:text-zinc-200'>
							Sumbit
						</button>
					</div>
				</form>
				<div className='w-10/12 text-gray-100 mt-4'>
					<h3 className='py-3'>{selectedIdentifier}</h3>
					<div className='flex flex-row justify-around border h-10 p-2'>
						{!result[0]
							? 'No result'
							: result.map((text, index) => <Name key={index} name={text} />)}
					</div>
				</div>
			</main>
		</>
	);
}
