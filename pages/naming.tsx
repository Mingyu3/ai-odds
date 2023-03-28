import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import Head from 'next/head';
import { useState } from 'react';
import CopyAlert from './components/CopyAlert';
import Name from './components/Name';
import Main from './components/Main';
import Tab from './components/Tab';

const IDENTIFIERS = [
	'Function',
	'Method',
	'Variable',
	'Class',
	'id(HTML)',
	'class(HTML)',
];

export default function Naming() {
	const [description, setDescription] = useState('');
	const [result, setResult] = useState([]);
	const [selectedIdentifier, setSelectedIdentifier] = useState('Function');
	const [textCopied, setTextCopied] = useState(false);
	const [isSubmited, setIsSubmited] = useState(false);

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
		setIsSubmited(true);

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

		setIsSubmited(false);
	}

	return (
		<>
			<Head>
				<title>AI ODDS</title>
				<meta
					name='description'
					content='Name functions and variables easier'
				/>
			</Head>

			<CopyAlert show={textCopied} />

			<Main>
				<h2 className='p-2 text-lg text-gray-100'>
					Enter a description for naming
				</h2>
				<Tab
					ITEMS={IDENTIFIERS}
					selectedItem={selectedIdentifier}
					setSelectedItem={setSelectedIdentifier}
				/>

				<form onSubmit={handleSubmit}>
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
						{isSubmited ? (
							<span className='inline-block w-7 p-1 text-zinc-400 animate-spin-slow'>
								<FontAwesomeIcon icon={faArrowsRotate} />
							</span>
						) : (
							<button
								type='submit'
								className='text-zinc-300 p-1 rounded hover:bg-zinc-900 hover:text-zinc-400 active:text-zinc-200'>
								Submit
							</button>
						)}
					</div>
				</form>
				<div className='text-gray-100 mt-4'>
					<h3 className='py-3'>{selectedIdentifier}</h3>
					<div className='flex flex-row justify-around border h-10 p-2'>
						{!result[0]
							? 'No result'
							: result.map((text, index) => (
									<Name
										key={index}
										name={text}
										textCopied={textCopied}
										setTextCopied={setTextCopied}
									/>
							  ))}
					</div>
				</div>
			</Main>
		</>
	);
}
