import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { MdAdd, MdSearch } from 'react-icons/md';
import { Input } from '@rocketseat/unform';

import api from '~/services/api';
import { Container, Search, ListStudents } from './styles';

export default function Students() {
	const [students, setStudents] = useState([]);

	useEffect(() => {
		async function handleStudents() {
			const response = await api.get('students');

			setStudents(response.data.response);
		}

		handleStudents();
	}, []);

	return (
		<Container>
			<header>
				<h1>Gerenciando alunos</h1>
				<div>
					<button type="button">
						<MdAdd color="#fff" size={20} />
						CADASTRAR
					</button>
					<Search>
						<MdSearch color="#999" size={16} />
						<Input name="aluno" type="text" placeholder="Buscar aluno" />
					</Search>
				</div>
			</header>

			<ListStudents>
				<table>
					<thead>
						<tr>
							<th>NOME</th>
							<th>E-MAIL</th>
							<th>IDADE</th>
						</tr>
					</thead>
					<tbody>
						{students.map(student => (
							<tr>
								<td>{student.name}</td>
								<td>{student.email}</td>
								<td>{student.idade}</td>
								<td>
									<div>
										<Link to="/">editar</Link>
										<Link to="/">apagar</Link>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</ListStudents>
		</Container>
	);
}
