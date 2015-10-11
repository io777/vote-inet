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
		waitOn: function() {
			return [
				Meteor.subscribe('Votes')
			];
		}
	}
);

////////////////////////////////////////////////////
///////////////////// User ////////////////////////
///////////////////////////////////////////////////

// User list
Router.route('/users', {
	name: 'userList',
	waitOn: function() {
		return [
			Meteor.subscribe('Users')
		];
	}
});

// Add user
Router.route('/user', {
	name: 'insertUserForm'
});

// Update user
Router.route('/users/:_id',{
	name: 'updateUserForm',
	waitOn: function () {
		return [
			Meteor.subscribe('singleUser', this.params._id)			
		];
	},
	data: function() { return Meteor.users.findOne({_id: this.params._id}); }
});

// маршрут для установки пароля пользователя
Router.route('/password/:_id',{
	name: 'setPasswordForm',
	waitOn: function() {
		return Meteor.subscribe('singleUser', this.params._id);
	},
	data: function() { return Meteor.users.findOne({_id: this.params._id}); }
})

// user status online
Router.route('/user-status', {
	name: 'userStatus',
	waitOn: function() {
		return [
			Meteor.subscribe('Users')
		];
	}
})

//////////////////////////////////////////////////////
////////////////// VOTE /////////////////////////////
/////////////////////////////////////////////////////

// List vote
Router.route('/votes', {
	name: 'voteList',
	waitOn: function() {
		return [
			Meteor.subscribe('Votes')
		];
	}
});

// Update vote
Router.route('/votes/:_id',{
	name: 'updateVoteForm',
	waitOn: function () {
		return [
			Meteor.subscribe('singleVote', this.params._id)			
		];
	},
	data: function() { return Votes.findOne({_id: this.params._id}); }
})

// Add vote
Router.route('/vote', {
	name: 'insertVoteForm',
	waitOn: function() {
		return [
			Meteor.subscribe('Users')
		];
	}
});

// Vote result
Router.route('/vote-result', {
	name: 'voteResult',
	waitOn: function() { 
		return [
			Meteor.subscribe('Votes'),
			Meteor.subscribe('Users')				
		];
	}
});

/////////////////////////////////////////////////////////////

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
	layoutTemplate: 'vote_layout',
	redirect: '/vote-result',
	waitOn: function() {
		return [
			Meteor.subscribe('Users')
		];
	}
});

// Forgot password
AccountsTemplates.configureRoute('forgotPwd', {
	name: 'forgotPwd',
	path: '/forgot-password',
	template: 'forgotPwd',
	layoutTemplate: 'layout',
	redirect: '/signIn'
});

// AccountsTemplates.configureRoute('enrollAccount', {
// 	name: 'enrollAccount',
// 	path: '/enroll-account',
// 	template: 'enrollAccount',
// 	layoutTemplate: 'layout'
// });

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

//////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

// функция проверки авторизации
var requireLogin = function() {
	if (!Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.layout('layout');
			this.render('accessDenied');
		}
	} else {
		this.next();
	}
}

// функция проверки авторизации и прав модератора и администратора
var requireLoginModeratorAdmin = function() {
	var loggedInUser = Meteor.user();
	if (!Meteor.user() || !Roles.userIsInRole(loggedInUser, ['admin','moderator'])) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.layout('layout');
			this.render('accessDenied');
		}
	} else {
		this.next();
	}
}

// функция проверки авторизации и прав администратора
var requireLoginAdmin = function() {
	var loggedInUser = Meteor.user();
	if (!Meteor.user() || !Roles.userIsInRole(loggedInUser, ['admin'])) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.layout('layout');
			this.render('accessDenied');
		}
	} else {
		this.next();
	}
}

// Vote true
var voteTrue = function() {
	if (!Meteor.user()){
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.layout('layout');
			this.render('accessDenied');
		}
	} else {
		if (Meteor.user().vote == true){
			if(Roles.userIsInRole(Meteor.user(), ['admin', 'moderator'])){
				this.next();
			}else{
				Router.go('voteResult');
			}
		}else{
			this.next();
		}
	}
}

// Vote true
Router.onBeforeAction(voteTrue, {only: [
	'insertVoteForm'
]});

// проверка прав перед переходом на страницу
Router.onBeforeAction(requireLogin, {only: [
	'voteResult',
	'changePwd',
]});
// права модератора
Router.onBeforeAction(requireLoginModeratorAdmin, {only: [
	'voteList',
	'updateVoteForm',
]});
// права админа
Router.onBeforeAction(requireLoginAdmin, {only: [
	'setPasswordForm',
	'updateUserForm',
	'insertUserForm',
	'userList',
	'userStatus'
]});