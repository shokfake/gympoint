import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
	async store(req, res) {
		const schema = Yup.object().shape({
			title: Yup.string().required(),
			duration: Yup.number().required(),
			price: Yup.number().required(),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validation fails' });
		}

		const planExists = await Plan.findOne({
			where: { title: req.body.title },
		});

		if (planExists) {
			return res.status(400).json({ error: 'Plan already exists' });
		}

		const { title, duration, price } = req.body;

		const { id } = await Plan.create({ title, duration, price });

		return res.json({
			id,
			title,
			duration,
			price,
		});
	}

	async index(req, res) {
		const plans = await Plan.findAll({
			attributes: ['id', 'title', 'duration', 'price'],
		});

		return res.json(plans);
	}

	async update(req, res) {
		const schema = Yup.object().shape({
			title: Yup.string(),
			duration: Yup.number(),
			price: Yup.number(),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validation fails' });
		}

		const { planId } = req.params;

		const plan = await Plan.findByPk(planId);

		if (!plan) {
			return res.status(400).json({ error: 'Plan does not exist' });
		}

		const { title, price, duration } = req.body;

		if (title && title !== plan.title) {
			const planExists = await Plan.findOne({ where: { title } });

			if (planExists) {
				return res.status(400).json({ error: 'Plan already exists' });
			}
		}

		const updatedPlan = await plan.update({ title, price, duration });

		return res.json({
			id: planId,
			title: updatedPlan.title,
			duration: updatedPlan.duration,
			price: updatedPlan.price,
		});
	}

	async delete(req, res) {
		const { planId } = req.params;

		const plan = await Plan.findByPk(planId);

		if (!plan) {
			return res.status(400).json({ error: 'Plan does not exist' });
		}

		await plan.destroy();

		return res.send();
	}
}

export default new PlanController();
