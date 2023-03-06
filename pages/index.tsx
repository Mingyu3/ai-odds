import Head from 'next/head';

export default function Home() {
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
			<main>
				<label>
					Describe what you want
					<textarea name='description' cols={30} rows={10}></textarea>
				</label>
				<button>Submit</button>
			</main>
		</>
	);
}
