module.exports = {
	up: QueryInterface => {
		return QueryInterface.bulkInsert(
			'students',
			[
				{
					name: 'Gustavo da Cruz Figueredo',
					email: 'gustavocf@gmail.com',
					idade: 11,
					altura: 1.52,
					created_at: new Date(),
					updated_at: new Date(),
				},
			],
			{}
		);
	},

	down: () => {},
};
