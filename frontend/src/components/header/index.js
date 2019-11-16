import React from 'react';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo.svg';
import { Container, Content, Profile, Logo, Navigation } from './styles';

export default function header() {
	return (
		<Container>
			<Content>
				<nav>
					<Logo>
						<img src={logo} alt="GymPoint" />
						<Link to="/">GYMPOINT</Link>
					</Logo>
					<Navigation>
						<Link to="/">ALUNOS</Link>
						<Link to="/">PLANOS</Link>
						<Link to="/">MATRÍCULAS</Link>
						<Link to="/">PEDIDOS DE AUXÍLIO</Link>
					</Navigation>
				</nav>

				<aside>
					<Profile>
						<strong>Diego Fernandes</strong>
						<button type="button">sair do sistema</button>
					</Profile>
				</aside>
			</Content>
		</Container>
	);
}
