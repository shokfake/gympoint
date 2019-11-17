import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { MdDone, MdChevronLeft } from 'react-icons/md';

import api from '~/services/api';

import Input from '~/components/Input';
import Button from '~/components/Button';
import Form from '~/components/DefaultForm';

import { Container } from './styles';

export default function Edit({ match }) {
	const [student, setStudent] = useState({});
	const { name: studentName } = match.params;

	useEffect(() => {
		async function handleStudent() {
			const response = await api.get('students', {
				params: { q: studentName },
			});

			const { name, email, id, idade, altura } = response.data.response[0];

			setStudent({
				name,
				email,
				id,
				idade,
				altura,
			});
		}

		handleStudent();
	}, [studentName]);

	return (
		<Container>
			<header>
				<h1>Cadastro de aluno</h1>

				<div>
					<Button type="button">
						<MdChevronLeft color="#fff" size={20} />
						VOLTAR
					</Button>
					<Button type="button">
						<MdDone color="#fff" size={20} />
						SALVAR
					</Button>
				</div>
			</header>

			<Form initialData={student}>
				<span>NOME COMPLETO</span>
				<Input name="name" type="text" placeholder="Nome completo do aluno" />
				<span>ENDEREÇO DE E-MAIL</span>
				<Input
					name="email"
					type="email"
					placeholder="exemplo@email.com"
					/* value={student.email} */
				/>
				<div>
					<div>
						<span>IDADE</span>
						<Input name="idade" type="text" />
					</div>
					<div>
						<span>PESO (em kg)</span>
						<Input name="peso" type="text" />
					</div>
					<div>
						<span>Altura</span>
						<Input name="altura" type="text" />
					</div>
				</div>
			</Form>
		</Container>
	);
}

Edit.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			name: PropTypes.string.isRequired,
		}),
	}),
};

Edit.defaultProps = {
	match: {
		params: {
			name: '',
		},
	},
};
