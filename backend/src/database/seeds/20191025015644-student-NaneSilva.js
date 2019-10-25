module.exports = {
	up: QueryInterface => {
		return QueryInterface.bulkInsert(
			'students',
			[
				{
					name: 'Elaine Silva da Cruz',
					email: 'nanescruz@gmail.com',
					idade: 23,
					altura: 1.65,
					created_at: new Date(),
					updated_at: new Date(),
				},
			],
			{}
		);
	},

	down: () => {},
};
