import React from 'react';

import { MdDone, MdChevronLeft } from 'react-icons/md';

import Input from '~/components/Input';
import Button from '~/components/Button';
import Form from '~/components/DefaultForm';

import { Container } from './styles';

export default function Register() {
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

			<Form>
				<span>NOME COMPLETO</span>
				<Input name="name" type="text" placeholder="Nome completo do aluno" />
				<span>ENDEREÇO DE E-MAIL</span>
				<Input name="email" type="email" placeholder="exemplo@email.com" />
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
