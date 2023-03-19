import { Configuration, OpenAIApi } from 'openai';
import { NextApiRequest, NextApiResponse } from 'next';

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req: NextApiRequest, res: NextApiResponse) {
	if (!configuration.apiKey) {
		res.status(500).json({
			error: {
				message:
					'OpenAI API key not configured, please follow instructions in README.md',
			},
		});
		return;
	}

	const description = req.body.description || '';
	const identifier = req.body.identifier || 'function';

	if (description.trim().length === 0) {
		res.status(400).json({
			error: {
				message: 'Please enter a vaild description',
			},
		});
	}

	try {
		const completion = await openai.createCompletion({
			model: 'text-davinci-003',
			prompt: generatePrompt(description, identifier),
			temperature: 1,
		});
		res.status(200).json({ result: completion.data.choices[0].text });
	} catch (error: any) {
		if (error.response) {
			console.error(error.response.status, error.response.data);
			res.status(error.response.status).json(error.response.data);
		} else {
			console.error(`Error with OpenAI API request: ${error.message}`);
			res.status(500).json({
				error: {
					message: 'An error occurred during your request.',
				},
			});
		}
	}
}

function generatePrompt(description: String, identifier: String) {
	return `Suggest three names for a simple programming ${identifier} name.

Description: 요금을 지불한 고객의 수
${identifier}: paidCustomerCount, paidCustomerTotal, totalPaidCustomers
Description: 텍스트를 복사하는 함수
${identifier}: copyText, duplicateText, cloneText
Description: ${description}
${identifier}:`;
}
