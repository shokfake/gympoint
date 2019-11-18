import styled from 'styled-components';
import colors from '~/styles/colors';

export const Button = styled.button`
	height: 36px;
	font-size: 14px;
	font-weight: bold;
	color: #fff;
	border: 0;
	border-radius: 4px;
	padding: 10px 16px;

	display: flex;
	justify-content: center;
	align-items: center;

	background: ${colors.primary};
	padding: 10px 16px;

	svg {
		margin-right: 8px;
	}
`;
