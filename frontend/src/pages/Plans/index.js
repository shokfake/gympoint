import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '~/services/api';
import { formatPrice } from '~/util/format';

import ButtonRegister from '~/components/ButtonRegister';
import { Container, Contente, PlanTable } from './styles';

export default function Plans() {
	const [plans, setPlans] = useState([]);

	useEffect(() => {
		async function handlePlans() {
			const response = await api.get('plans');

			const data = response.data.map(plan => {
				plan.priceFormated = formatPrice(plan.price);
				if (plan.duration === 1) {
					plan.durationFormated = '1 mês';
				} else {
					plan.durationFormated = `${plan.duration} meses`;
				}
				return plan;
			});

			setPlans(data);
		}

		handlePlans();
	}, []);

	return (
		<Container>
			<Contente>
				<header>
					<h1>Gerenciando planos</h1>
					<ButtonRegister />
				</header>

				<PlanTable>
					<thead>
						<tr>
							<th>TÍTULO</th>
							<th>DURAÇÃO</th>
							<th>VALOR p/ MÊS</th>
						</tr>
					</thead>
					<tbody>
						{plans.map(plan => (
							<tr key={plan.id}>
								<td>{plan.title}</td>
								<td align="center">{plan.durationFormated}</td>
								<td align="center">{plan.priceFormated}</td>
								<td>
									<div>
										<Link to="/">editar</Link>
										<button type="button">apagar</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</PlanTable>
			</Contente>
		</Container>
	);
}
