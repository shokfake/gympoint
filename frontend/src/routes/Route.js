import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import DefautlLayout from '~/pages/_layouts/default';
import AuthLayout from '~/pages/_layouts/auth';

import { store } from '~/store';

export default function RouteWrapper({
	component: Component,
	isPrivate,
	...rest
}) {
	const { signed } = store.getState().auth;

	if (!signed && isPrivate) {
		return <Redirect to="/" />;
	}

	if (signed && !isPrivate) {
		return <Redirect to="/students" />;
	}

	const Layout = signed ? DefautlLayout : AuthLayout;

	return (
		<Route
			{...rest}
			render={props => (
				<Layout>
					<Component {...props} />
				</Layout>
			)}
		/>
	);
}

RouteWrapper.propTypes = {
	isPrivate: PropTypes.bool,
	component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
		.isRequired,
};

RouteWrapper.defaultProps = {
	isPrivate: false,
};
