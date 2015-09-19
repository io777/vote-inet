// Route config
Router.configure({
	// main template
	layoutTemplate: 'vote_layout',
	// loadin template
	loadingTemplate: 'loading',
	// not found page
	notFoundTemplate: 'notFound',
});

// Main page
Router.route('/', function(){
		this.layout('layout');
		this.render('main');
	}, {
		name: 'main'
	}
);

// User table
Router.route('/user-table', {
	name: 'userTable',
	waitOn: function() {
		return [
			Meteor.subscribe('Users')
		];
	}
});

// Vote table
Router.route('/vote-table', {
	name: 'voteTable',
	waitOn: function() {
		return [
			Meteor.subscribe('Votes')
		];
	}
});

// Vote result
Router.route('/vote-result', {
	name: 'voteResult',
	waitOn: function() { 
		return [
			Meteor.subscribe('Votes')				
		];
	}
});

// Vote
Router.route('/vote', {
 	name: 'vote'
});

// Loading
Router.route('/loading',{
	name: 'loading'
});

// SignUp(registr) route
AccountsTemplates.configureRoute('signUp', {
	name: 'signUp',
	path: '/signUp',
	template: 'signUp',
	layoutTemplate: 'layout',
	redirect: '/vote',
});

// SignIn(login) route
AccountsTemplates.configureRoute('signIn', {
	name: 'signIn',
	path: '/signIn',
	template: 'signIn',
	layoutTemplate: 'layout',
	redirect: '/vote'
});

// Change password
AccountsTemplates.configureRoute('changePwd', {
	name: 'changePwd',
	path: '/change-password',
	template: 'changePwd',
	layoutTemplate: 'layout',
	redirect: '/vote-result'
});

// Forgot password
AccountsTemplates.configureRoute('forgotPwd', {
	name: 'forgotPwd',
	path: '/forgot-password',
	template: 'forgotPwd',
	layoutTemplate: 'layout',
	redirect: '/signIn'
});

AccountsTemplates.configureRoute('enrollAccount', {
	name: 'enrollAccount',
	path: '/enroll-account',
	template: 'enrollAccount',
	layoutTemplate: 'layout'

});

// Verify email
AccountsTemplates.configureRoute('verifyEmail', {
	name: 'verifyEmail',
	path: '/verify-email',
	template: 'verifyEmail',
	layoutTemplate: 'layout',
	redirect: '/vote'
});

// Reset password
AccountsTemplates.configureRoute('resetPwd', {
	name: 'resetPwd',
	path: '/reset-password',
	template: 'resetPwd',
	layoutTemplate: 'layout',
	redirect: '/vote-result'
});

// Resend verification email
AccountsTemplates.configureRoute('resendVerificationEmail', {
	name: 'resendVerificationEmail',
	path: 'send-again',
	template: 'resendVerificationEmail',
	layoutTemplate: 'layout',
	redirect: '/signIn'
});