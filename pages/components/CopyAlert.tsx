import React from 'react';

interface Props {
	show: boolean;
}

const CopyAlert = ({ show }: Props) => {
	return (
		<div
			className={`fixed flex justify-center w-full mt-2 transition-opacity duration-200 ${
				show ? 'opacity-100' : 'opacity-0'
			}`}>
			<div className='rounded-2xl px-6 py-1 text-zinc-300 bg-zinc-900'>
				Copied
			</div>
		</div>
	);
};

export default CopyAlert;
