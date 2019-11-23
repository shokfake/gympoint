import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Link } from 'react-router-dom';

import { MdCheckCircle } from 'react-icons/md';
import api from '~/services/api';

import { Container, Content, EnrollmentTable } from './styles';

import ButtonRegister from '~/components/ButtonRegister';

export default function Enrollments() {
	const [enrollments, setEnrollments] = useState([]);

	useEffect(() => {
		async function handleEnrollments() {
			const response = await api.get('enrollments');

			const data = response.data.map(enrollment => {
				enrollment.startDateFormated = format(
					parseISO(enrollment.start_date),
					"dd 'de' MMMM 'de' yyyy",
					{ locale: pt }
				);
				enrollment.endDateFormated = format(
					parseISO(enrollment.end_date),
					"dd 'de' MMMM 'de' yyyy",
					{ locale: pt }
				);
				return enrollment;
			});

			setEnrollments(data);
		}

		handleEnrollments();
	}, []);

	return (
		<Container>
			<Content>
				<header>
					<h1>Gerenciando matrículas</h1>
					<ButtonRegister type="button" />
				</header>

				<EnrollmentTable>
					<thead>
						<tr>
							<th>ALUNO</th>
							<th>PLANO</th>
							<th>INÍCIO</th>
							<th>TÉRMINO</th>
							<th>ATIVA</th>
						</tr>
					</thead>
					<tbody>
						{enrollments.map(enrollment => (
							<tr>
								<td>{enrollment.student.name}</td>
								<td>{enrollment.plan.title}</td>
								<td>{enrollment.startDateFormated}</td>
								<td>{enrollment.endDateFormated}</td>
								<td>
									{enrollment.active ? (
										<MdCheckCircle color="#42cb59" size={20} />
									) : (
										<MdCheckCircle color="#ddd" size={20} />
									)}
								</td>
								<td>
									<div>
										<Link to="/">editar</Link>
										<button type="button">apagar</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</EnrollmentTable>
			</Content>
		</Container>
	);
}
