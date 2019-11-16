import React from 'react';

import { Form, Input } from '@rocketseat/unform';

import logo from '~/assets/logo.svg';

export default function SignIn() {
	return (
		<>
			<img src={logo} alt="GymPoint" />
			<h1>GYMPOINT</h1>
			<Form>
				<span>SEU E-MAIL</span>
				<Input name="email" type="emial" placeholder="exemplo@email.com" />
				<span>SUA SENHA</span>
				<Input name="password" type="password" placeholder="*************" />

				<button type="submit">Entrar no sistema</button>
			</Form>
		</>
	);
}
