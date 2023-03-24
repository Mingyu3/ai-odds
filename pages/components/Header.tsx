import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

function Header() {
	const router = useRouter();

	const navItems = [
		{ title: 'Home', path: '/' },
		{ title: 'Naming', path: '/naming' },
	];

	return (
		<header className='p-3 bg-zinc-700 text-gray-100 flex items-center'>
			<h1 className='font-bold mr-5'>
				<Link href='/'>AI ODDS</Link>
			</h1>
			<nav>
				<ul className='flex text-sm text-zinc-300 '>
					{navItems.map((item) => (
						<li key={item.title}>
							<Link
								href={item.path}
								className={`mr-4  ${
									router.asPath === item.path
										? 'font-bold'
										: 'hover:text-zinc-400 transition duration-150 ease-out'
								}`}>
								{item.title}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}

export default Header;
