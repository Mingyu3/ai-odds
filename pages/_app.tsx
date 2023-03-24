import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Header from './components/Header';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
			</Head>
			<Header />
			<Component {...pageProps} />
		</>
	);
}
