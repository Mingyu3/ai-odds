import React from 'react';

interface TabProps {
	ITEMS: string[];
	selectedItem: string;
	setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
}

export default function Tab({
	ITEMS,
	selectedItem,
	setSelectedItem,
}: TabProps) {
	return (
		<ul className='flex items-center w-full border rounded border-zinc-100 bg-zinc-900 cursor-pointer h-10'>
			{ITEMS.map((item, idx) => (
				<li
					key={idx}
					onClick={() => setSelectedItem(item)}
					className='w-full text-center transition ease-in-out duration-300 hover:scale-110 '>
					<div
						className={
							selectedItem === item
								? 'text-md text-zinc-100 font-bold'
								: 'text-sm text-zinc-300'
						}>
						{item}
					</div>
				</li>
			))}
		</ul>
	);
}
