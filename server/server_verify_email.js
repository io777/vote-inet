Meteor.startup(function () {
	// test with gmail
	
	process.env.MAIL_URL='smtp://opros.intreneta%40mail.ru:' + encodeURIComponent("{thdfvdctv777") + '@smtp.mail.ru:465';
	// test with SendGrid
	// process.env.MAIL_URL = 'smtp://your_username:your_password@smtp.sendgrid.net:587';
	// console.log(process.env);
});

// Accounts.emailTemplates.siteName = "Опрос интернета";
// Accounts.emailTemplates.from = "Опрос интренета <opros.intreneta@mail.ru>";

// if (Meteor.isServer) {
		// Email.send({
		//     from: 'server@example.com',
		//     to: 'shirling@mail.ru',
		//     subject: 'This is a test email',
		//     html: '<b>Congrats, it works!</b>'
		// });
// }

PrettyEmail.options = {
	from: 'opros.intreneta@mail.ru',
	logoUrl: 'http://www.opros.maddesire.net/images/house.png',
	companyName: 'Maddesire',
	companyUrl: 'http://maddesire.net',
	companyAddress: 'maddesire.net',
	companyTelephone: 'mad.desire.db',
	companyEmail: 'maddesire@inbox.ru',
	siteName: 'Опрос интернета'
};

PrettyEmail.defaults.verifyEmail = {
	heading: 'Всего один шаг...',
	message: 'Нажмите на большую кнопку ниже, чтобы активировать свой аккаунт',
	buttonText: 'Активировать аккаунт'
};

PrettyEmail.defaults.resetPassword = {
	heading: 'Сброс пароля',
	message: 'Нажмите большую кнопку ниже, чтобы сбросить пароль',
	buttonText: 'Сброс пароля'
};