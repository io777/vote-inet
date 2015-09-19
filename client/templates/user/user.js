Template.userTable.helpers({
	settings: function () {
		return {
			collection: Meteor.users.find(),
			rowsPerPage: 10,
			showFilter: true,
			class: 'responsive-table',
			fields: [
				{ key: 'emails.0.address', label: 'Почтовый адрес', sortable: true},
				{ key: 'emails.0.verified', label: 'Email подтвержден', sortable: true},
				{ 
					key: 'createdAt',
					label: 'Дата создания',
					sortable: true,
					fn: function(value){
						if(value){
							return moment(value).format('DD.MM.YYYY');
						}
					}
				},
				{ key: 'roles', label: 'Роли', sortable: true}
			]
		};
	}
});