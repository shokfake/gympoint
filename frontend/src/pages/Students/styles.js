import styled from 'styled-components';
import colors from '~/styles/colors';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	padding: 34px 120px;

	header {
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: space-between;
	}

	div {
		display: flex;
		align-items: center;

		button {
			margin-right: 16px;
		}
	}
`;

export const Search = styled.div`
	input {
		height: 36px;
		padding-left: 32px;
		padding-right: 12px;
		margin-left: 8px;

		font-size: 14px;
	}

	svg {
		position: absolute;
		margin-left: 20px;
	}
`;

export const ListStudents = styled.div`
	table {
		margin-top: 20px;
		width: 100%;
		background: #fff;
		padding: 30px 30px 0px 30px;

		th {
			text-align: left;
			padding-bottom: 20px;
		}

		tbody tr {
			& + tr {
				td {
					padding-top: 15px;
					border-top: 1px solid #eee;
				}
			}
		}

		td {
			padding-bottom: 15px;
			font-size: 16px;
			color: #666;

			div {
				display: flex;
				justify-content: flex-end;

				> a {
					margin-left: 23px;
					color: #4d85ee;
				}

				a + a {
					color: ${colors.primary};
				}
			}
		}
	}
`;
