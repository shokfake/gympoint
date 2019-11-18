import React from 'react';

import { MdChevronLeft } from 'react-icons/md';
import { Button } from './styles';

export default function ButtonBack({ ...props }) {
	return (
		<Button {...props}>
			<MdChevronLeft color="#fff" size={20} />
			VOLTAR
		</Button>
	);
}
