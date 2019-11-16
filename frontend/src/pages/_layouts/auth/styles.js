import styled from 'styled-components';

export const Wrapper = styled.div`
	height: 100%;
	background: #ee4d64;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Content = styled.div`
	width: 100%;
	max-width: 315px;
	text-align: center;
	background: #fff;
	border-radius: 4px;
	padding: 50px 30px;

	h1 {
		margin-top: 10px;
		color: #ee4d64;
		font-size: 30px;
		font-weight: bold;
	}

	form {
		display: flex;
		flex-direction: column;
		margin-top: 30px;

		input {
			font-size: 16px;
			height: 45px;
			border-radius: 4px;
			border: 1px solid #dddddd;
			background: #fff;
			padding: 0 15px;
			margin-bottom: 20px;

			&::placeholder {
				color: #999999;
			}
		}

		span {
			color: #444444;
			font-weight: bold;
			font-size: 14px;
			text-align: left;
			margin-bottom: 10px;
		}

		button {
			height: 45px;
			background: #ee4d64;
			border: 0;
			border-radius: 4px;
			color: #fff;
			font-size: 16px;
			font-weight: bold;
		}
	}
`;
