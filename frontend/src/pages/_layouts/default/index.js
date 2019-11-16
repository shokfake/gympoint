import React from 'react';
import PropTypes from 'prop-types';

import Header from '~/components/header';

import { Wrapper } from './styles';

export default function defaultLayout({ children }) {
	return (
		<Wrapper>
			<Header>{children}</Header>
		</Wrapper>
	);
}

defaultLayout.propTypes = {
	children: PropTypes.element.isRequired,
};
