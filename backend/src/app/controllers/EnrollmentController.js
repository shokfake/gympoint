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
			})
		);
	}

	async index(req, res) {
		const enrolments = await Enrollment.findAll({
			// order: ['start_date'],
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

	async update(req, res) {
		const { enrollmentId } = req.params;

		const enrollment = await Enrollment.findByPk(enrollmentId);

		if (!enrollment) {
			return res.status(400).json({ error: 'Enrollment does not exist' });
		}

		const { student_id, plan_id } = req.body;

		/**
		 * Verifica se não é uma data passada.
		 */
		if (req.body.start_date && req.body.start_date !== enrollment.start_date) {
			const start_date = startOfDay(parseISO(req.body.start_date));
			if (isBefore(start_date, startOfDay(new Date()))) {
				return res
					.status(400)
					.json({ error: 'Enrollment date is not available' });
			}
		}

		/**
		 * Verifica se o plano existe
		 */
		if (plan_id && plan_id !== enrollment.plan_id) {
			const planExists = await Plan.findByPk(plan_id);
			if (!planExists) {
				return res.status(400).json({ error: 'Plan does not exist' });
			}
		}

		/**
		 * Verificando se quer alterar o estudante
		 */
		if (student_id) {
			const studentExists = await Student.findByPk(student_id);

			/**
			 * Verifica se esse estudante existe
			 */
			if (!studentExists) {
				return res.status(400).json({ error: 'Student does not exist' });
			}

			/**
			 * Verifica se esse estudante ja não tem uma outra matricula.
			 */
			if (student_id !== enrollment.student_id) {
				const enrollmentStudentExists = await Enrollment.findOne({
					where: { student_id },
				});

				if (enrollmentStudentExists) {
					return res
						.status(400)
						.json({ error: 'Student already has enrollment' });
				}
			}
		}

		const plan = await Plan.findByPk(plan_id);
		const { start_date } = req.body;

		const updated = await enrollment.update({
			student_id,
			plan_id,
			price: plan.price * plan.duration,
			end_date: start_date
				? endOfDay(addMonths(start_date, plan.duration))
				: undefined,
			start_date: start_date
				? startOfDay(parseISO(req.body.start_date))
				: undefined,
		});

		return res.json(updated);
	}

	async delete(req, res) {
		const { enrollmentId } = req.params;

		const enrrolment = await Enrollment.findByPk(enrollmentId);

		if (!enrrolment) {
			return res.status(400).json({ error: 'Enrrolment does not exist' });
		}

		enrrolment.destroy();

		return res.send();
	}
}

export default new EnrollmentController();
