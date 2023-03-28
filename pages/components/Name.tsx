import React, { useEffect, useState } from 'react';

interface NameProps {
	key: number;
	name: string;
	textCopied: boolean;
	setTextCopied: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Name({ name, textCopied, setTextCopied }: NameProps) {
	function copyText(e: React.MouseEvent<HTMLParagraphElement>) {
		const paragraph = e.target as HTMLParagraphElement;
		const text = paragraph.innerHTML;

		navigator.clipboard
			.writeText(text)
			.then(() => {
				setTextCopied(true);
			})
			.catch((error) => {
				console.error('copy error: ' + error);
			});
	}

	useEffect(() => {
		if (textCopied === true) {
			setTimeout(() => {
				setTextCopied(false);
			}, 1000);
		}
	}, [textCopied]);

	return (
		<p
			className='cursor-copy hover:text-zinc-400 transition duration-150 ease-out'
			onClick={copyText}>
			{name}
		</p>
	);
}
