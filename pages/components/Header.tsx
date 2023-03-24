import React from 'react';

function Header() {
	return (
		<header className='p-3 bg-zinc-700 text-gray-100 flex items-center'>
			<h1 className='font-bold mr-5'>AI ODDS</h1>
			<nav>
				<ul className='text-sm text-zinc-300 hover:text-zinc-400 cursor-pointer transition duration-150 ease-out'>
					<li>Naming</li>
				</ul>
			</nav>
		</header>
	);
}

export default Header;
