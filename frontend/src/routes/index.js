import React from 'react';

import { Switch } from 'react-router-dom';
import Route from './Route';

// Pages
import SignIn from '~/pages/SignIn';
import Enrollments from '~/pages/Enrollments';
import HelpOrders from '~/pages/HelpOrders';
import Plans from '~/pages/Plans';

import Students from '~/pages/Students';
import StudentsRegister from '~/pages/Students/Register';
import StudentsEdit from '~/pages/Students/Edit';

export default function Routes() {
	return (
		<Switch>
			<Route path="/" exact component={SignIn} />

			<Route path="/students" exact component={Students} isPrivate />
			<Route path="/students/register" component={StudentsRegister} isPrivate />
			<Route path="/students/edit/:name" component={StudentsEdit} isPrivate />

			<Route path="/plans" component={Plans} isPrivate />
			<Route path="/enrollments" component={Enrollments} isPrivate />
			<Route path="/helpOrders" component={HelpOrders} isPrivate />
		</Switch>
	);
}
