module.exports = {
	up: QueryInterface => {
		return QueryInterface.bulkInsert(
			'students',
			[
				{
					name: 'Elias Gabriel da Cruz Figueredo',
					email: 'eliasgabrielcf@gmail.com',
					idade: 18,
					altura: 1.72,
					created_at: new Date(),
					updated_at: new Date(),
				},
			],
			{}
		);
	},

	down: () => {},
};
