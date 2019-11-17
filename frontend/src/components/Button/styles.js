import styled from 'styled-components';
import colors from '~/styles/colors';

export const DefaultButton = styled.button`
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

	background: #ccc;

	& + button {
		margin-left: 16px;
		background: ${colors.primary};
	}

	svg {
		margin-right: 8px;
	}
`;
