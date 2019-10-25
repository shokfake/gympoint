import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
	async store(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string().required(),
			email: Yup.string()
				.email()
				.required(),
			idade: Yup.number().required(),
			altura: Yup.number().required(),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validation fails' });
		}

		const studentExists = await Student.findOne({
			where: { email: req.body.email },
		});

		if (studentExists) {
			return res.status(400).json({ error: 'Student already exists' });
		}

		const { name, email, altura, idade } = req.body;

		const { id } = await Student.create({ name, email, altura, idade });

		return res.json({
			id,
			name,
			email,
			idade,
			altura,
		});
	}

	async update(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string(),
			email: Yup.string().email(),
			idade: Yup.number(),
			altura: Yup.number(),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validation fails' });
		}

		const { name, email, idade, altura } = req.body;
		const { id } = req.params;

		const student = await Student.findByPk(id);

		if (!student) {
			return res.status(400).json({ erro: 'Student does not exist' });
		}

		if (email && email !== student.email) {
			const studentExists = await Student.findOne({ where: { email } });

			if (studentExists) {
				return res.status(400).json({ error: 'Student already exists' });
			}
		}

		const updatedStudent = await student.update({ name, email, idade, altura });

		return res.json({
			id,
			name: updatedStudent.name,
			email: updatedStudent.email,
			idade: updatedStudent.idade,
			altura: updatedStudent.altura,
		});
	}
}

export default new StudentController();
