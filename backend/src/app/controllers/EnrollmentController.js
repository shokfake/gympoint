import * as Yup from 'yup';
import { parseISO, isBefore, addMonths, startOfDay, endOfDay } from 'date-fns';
import Enrollment from '../models/Enrollment';
import Student from '../models/Student';
import Plan from '../models/Plan';

class EnrollmentController {
	async store(req, res) {
		const schema = Yup.object().shape({
			student_id: Yup.number().required(),
			plan_id: Yup.number().required(),
			start_date: Yup.date().required(),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validation fails' });
		}

		const { student_id, plan_id } = req.body;

		/**
		 * Verificar se um estudante ja possui matricula
		 */
		const enrollmentExists = await Enrollment.findOne({
			where: { student_id },
		});

		if (enrollmentExists) {
			return res.status(400).json({ error: 'Enrollment already exists' });
		}

		/**
		 * Verificar se a data é anterior a atual
		 */
		const start_date = startOfDay(parseISO(req.body.start_date));
		if (isBefore(start_date, startOfDay(new Date()))) {
			return res
				.status(400)
				.json({ error: 'Enrollment date is not available' });
		}

		/**
		 * Verificar se o estudante existe
		 */
		const student = await Student.findByPk(student_id);

		if (!student) {
			return res.status(400).json({ error: 'Student does not exist' });
		}

		/**
		 * Verificar se o plano existe
		 */
		const plan = await Plan.findByPk(plan_id, {
			attributes: ['id', 'duration', 'price'],
		});

		if (!plan) {
			return res.status(400).json({ error: 'Plan does not exist' });
		}

		const price = plan.duration * plan.price;
		const end_date = endOfDay(addMonths(start_date, plan.duration));

		const { id } = await Enrollment.create({
			student_id,
			plan_id,
			price,
			end_date,
			start_date,
		});

		/* 	return res.json({
			id,
			student_id,
			plan_id,
			price,
			start_date,
			end_date,
		}); */

		return res.json(
			await Enrollment.findByPk(id, {
				attributes: [
					'id',
					'start_date',
					'end_date',
					'student_id',
					'plan_id',
					'price',
				],
				include: [
					{
						model: Student,
						as: 'student',
						attributes: ['id', 'name', 'email', 'idade', 'altura'],
					},
					{
						model: Plan,
						as: 'plan',
						attributes: ['id', 'title', 'duration', 'price'],
					},
				],
			})
		);
	}

	async index(req, res) {
		const enrolments = await Enrollment.findAll({
			attributes: ['id', 'start_date', 'end_date', 'price'],
			include: [
				{
					model: Student,
					as: 'student',
					attributes: ['id', 'name', 'email', 'idade', 'altura'],
				},
				{
					model: Plan,
					as: 'plan',
					attributes: ['id', 'title', 'duration', 'price'],
				},
			],
		});

		return res.json(enrolments);
	}
}

export default new EnrollmentController();
