var Schemas = {};

Schemas.User = new SimpleSchema({
	username: {
		type: String,
		label: "Имя пользователя",
		regEx: /^[a-z0-9A-Z_]{3,25}$/,
		optional: true,
		max: 25
	},
	emails: {
		type: [Object],
		label: "Почтовый адрес",
		// this must be optional if you also use other login services like facebook,
		// but if you use only accounts-password, then it can be required
		optional: true
	},
	"emails.$.address": {
		type: String,
		label: "Почтовый адрес",
		regEx: SimpleSchema.RegEx.Email
		// max: 40
	},
	"emails.$.verified": {
		type: Boolean,
		label: "проверить"
	},
	createdAt: {
		type: Date,
		label: "Дата создания"
	},
	services: {
		type: Object,
		optional: true,
		blackbox: true
	},
	// Add `roles` to your schema if you use the meteor-roles package.
	// Note that when using this package, you must also specify the
	// `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
	// Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
	// You can't mix and match adding with and without a group since
	// you will fail validation in some cases.
	roles: {
		type: [String],
		label: "Роли",
		allowedValues: ['user', 'admin', 'moderator'],
			autoform: {
			  type: "select2",
			  afFieldInput: {
				placeholder: "Выберите роль",
				firstOption: "",
				multiple: true
			  },
			  options: function () {
				return [
					{
						optgroup: "Роли",
						options: [
							{label: "пользователь", value: "user"},
							{label: "администратор", value: "admin"},
							{label: "модератор", value: "moderator"}
						]
					}
				];
			  }
			},
		optional: true,
		blackbox: true
	}
});

Meteor.users.attachSchema(Schemas.User);

// права на изменение базы пользователь
Meteor.users.allow({
	insert: function(userId, doc){
		var loggedInUser = Meteor.user();
		if (Roles.userIsInRole(loggedInUser, ['admin'])) {
			return true;
		}
	},
	update: function(userId, doc, fields, modifier){
		// админ может изменять всех пользователей
		var loggedInUser = Meteor.user();
		if (Roles.userIsInRole(loggedInUser, ['admin'])) {
			return true;
		}
	},
	remove: function(userId, doc){
		var loggedInUser = Meteor.user();
		if (Roles.userIsInRole(loggedInUser, ['admin'])) {
			return true;
		}
	}
});

