Template.voteTable.helpers({
	settings: function () {
		return {
			collection: Votes,
			rowsPerPage: 10,
			showFilter: true,
			class: 'responsive-table',
			fields: [
				{ key: 'house', label: 'Дачный коопертив', sortable: true},
				{ key: 'speed', label: 'Какая скорость', sortable: true},
				{ key: 'money', label: 'Сколько денег готовы платить', sortable: true},
				{ key: 'pay', label: 'Способ оплаты', sortable: true },
				{ key: 'technology', label: 'Текущая технология', sortable: true},
				{ key: 'likeCurrentInet', label: 'Устраивает текущий интернет', sortable: true}
			]
		};
	}
});