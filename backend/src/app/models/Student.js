import Sequelize, { Model } from 'sequelize';

class Student extends Model {
	static init(sequelize) {
		super.init(
			{
				name: Sequelize.STRING,
				email: Sequelize.STRING,
				idade: Sequelize.INTEGER,
				altura: Sequelize.FLOAT,
			},
			{
				sequelize,
			}
		);
	}
}

export default Student;
