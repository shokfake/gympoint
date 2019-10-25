module.exports = {
	up: QueryInterface => {
		return QueryInterface.bulkInsert(
			'students',
			[
				{
					name: 'Kaique Figueredo Merces de Oliveira',
					email: 'kaique.f.merces@live.com',
					idade: 22,
					altura: 1.67,
					created_at: new Date(),
					updated_at: new Date(),
				},
			],
			{}
		);
	},

	down: () => {},
};
