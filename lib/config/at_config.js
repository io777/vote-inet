// Options
AccountsTemplates.configure({
	//defaultLayout: 'emptyLayout',
	showForgotPasswordLink: true,
	overrideLoginErrors: true,
	enablePasswordChange: true,
	sendVerificationEmail: true,

	enforceEmailVerification: true,
	//confirmPassword: true,
	continuousValidation: true,
	//displayFormLabels: true,
	//forbidClientAccountCreation: false,
	//formValidationFeedback: true,
	//homeRoutePath: '/',
	//showAddRemoveServices: false,
	//showPlaceholders: true,

	showResendVerificationEmailLink: true,

	negativeValidation: true,
	positiveValidation:true,
	negativeFeedback: false,
	positiveFeedback:false,

	// Privacy Policy and Terms of Use
	//privacyUrl: 'privacy',
	//termsUrl: 'terms-of-use',
	texts: {
		resendVerificationEmailLink_pre: "Письмо с подтверждением потерялось?",
		resendVerificationEmailLink_link: "Отправить еще раз",
		title: {
		// 	changePwd: "Password Title",
		// 	enrollAccount: "Enroll Title",
		// 	forgotPwd: "Forgot Pwd Title",
		// 	resetPwd: "Reset Pwd Title",
		// 	signIn: "Sign In Title",
		// 	signUp: "Sign Up Title",
		// 	verifyEmail: "Verify Email Title",
			resendVerificationEmail: "Отправить письмо с подтверждением еще раз"
		},
		button: {
		// 	changePwd: "Password Text",
		// 	enrollAccount: "Enroll Text",
		// 	forgotPwd: "Forgot Pwd Text",
		// 	resetPwd: "Reset Pwd Text",
		// 	signIn: "Sign In Text",
		// 	signUp: "Sign Up Text",
			resendVerificationEmail: "Отправить письмо еще раз"
		},
		info: {
			// emailSent: "info.emailSent",
			// emailVerified: "info.emailVerified",
			// pwdChanged: "info.passwordChanged",
			// pwdReset: "info.passwordReset",
			// pwdSet: "info.passwordReset",
			signUpVerifyEmail: "Регистрация прошла успешно! Пожалуйста, проверьте свою электронную почту и следуйте инструкциям.",
			verificationEmailSent: "Новое письмо было вам отправлено. Если письмо не отображается во входящих, то проверьте папку со спамом.",
		},
		errors: {
			// accountsCreationDisabled: "Client side accounts creation is disabled!!!",
			// cannotRemoveService: "Cannot remove the only active service!",
			// captchaVerification: "Captcha verification failed!",
			// loginForbidden: "error.accounts.Login forbidden",
			// mustBeLoggedIn: "error.accounts.Must be logged in",
			// pwdMismatch: "error.pwdsDontMatch",
			// validationErrors: "Validation Errors",
			verifyEmailFirst: "Пожалуйста, сначало подтвердите свою почту. Для этого проверьте свою почту и перейдите по ссылке",
		},
		maxAllowedLength: "Максимальная допустимая длина",
		minRequiredLength: "Минимальная требуемая длина",
		requiredField: "Обязательное поле",
	},
});

AccountsTemplates.removeField('email');
AccountsTemplates.removeField('password');
AccountsTemplates.addField({
	_id: "email",
    type: "email",
    required: true,
    lowercase: true,
    trim: true,
    func: function(email) {
        return !_.contains(email, '@');
    },
    errStr: 'Несуществующий Email',
});
AccountsTemplates.addField({
	 _id: "password",
    type: "password",
    required: true,
    minLength: 6,
    displayName: {
        "default": "password",
        changePwd: "newPassword",
        resetPwd: "newPassword",
    },
    placeholder: {
        "default": "password",
        changePwd: "newPassword",
        resetPwd: "newPassword",
    },
});