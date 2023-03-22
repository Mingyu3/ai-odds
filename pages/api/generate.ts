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

const FUNCTION = `Description: 글자를 복사하는 함수
Funtion: copyText, duplicateText, copyString
Description: 유저 정보를 가져오는 메소드
Funtion: getUserInfo, getuserData, getUser
`;

const CLASS = `Description: 사용자 계정 관리를 위한 클래스
Class: UserAccount, User, UserRegistration
Description: 계좌와 관련된 정보 관리
Class: BankAccount, Account, CustomerAccount
`;

const VARIABLE = `Description: 요금을 지불한 고객의 수
Funtion: paidCustomerCount, paidCustomerTotal, totalPaidCustomers
Description: 마지막으로 로그인한 날짜
Funtion: lastLoginDate, lastLoginTime, lastAccessedDate
`;

const CLASS_HTML = `Description: 카드 요소의 제목 부분을 나타내는 클래스
class(HTML): card-header, card-title, card-header-title
Description: navigation bar의 리스트의 아이템
class(HTML): nav-list-item, nav-item, list-item
`;

const ID_HTML = `Description: 문의하기 폼을 감싸는 아이디
id(HTML): contactFormWrapper, inquiryFormContainer, feedbackFormSection
Description: 비밀번호 찾기 폼
id(HTML): passwordRecoveryForm, forgotPasswordForm, resetPasswordForm
`;

function getExample(identifier: String) {
	let result = identifier;
	switch (identifier) {
		case 'Function':
		case 'Method':
			result = FUNCTION;
			break;
		case 'Class':
			result = CLASS;
			break;
		case 'Variable':
			result = VARIABLE;
			break;
		case 'class(HTML)':
			result = CLASS_HTML;
			break;
		case 'id(HTML)':
			result = ID_HTML;
			break;
	}

	return result;
}

function generatePrompt(description: String, identifier: String) {
	return `Suggest three names for a simple programming ${identifier} name.

${getExample(identifier)}
Description: ${description}
${identifier}:`;
}
