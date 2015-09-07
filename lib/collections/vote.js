// collection vote
Votes = new Mongo.Collection("Votes");

var Schemas = {};

Schemas.Vote = new SimpleSchema({
	house: {
		type: String,
		allowedValues: [
			"one",
			"two",
			"three"
		],
		autoform: {
			type: "select",
			afFieldInput: {
				firstOption: "(Выберите дачный кооператив)",
				class: 'browser-default'
			}
		},
		label: "Из какого вы дачного кооператива?"
	},
	speed: {
		type: String,
		allowedValues: [
			"мне не нужен интернет",
			"1-10 мегабит",
			"20-30 мегабит",
			"30-40 мегабит",
			"40-50 мегабит",
			"50-60 мегабит",
			"70-80 мегабит",
			"80-90 мегабит",
			"90-100 мегабит",
			"мне нужно больше скоростей"
		],
		autoform: {
			type: "select",
			afFieldInput: {
				firstOption: "(Выберите скорость интернета)",
				class: 'browser-default'
			}
		},
		label: "Какая скорость интернета Вам нужна?"
	},
	money: {
		type: String,
		allowedValues: [
			"не готов(а) платить",
			"0-250 руб.",
			"250-500 руб.",
			"500-750 руб.",
			"750-1000 руб.",
			"1000-1250 руб.",
			"1250-1500 руб.",
			"1500-1750 руб.",
			"1750-2000 руб.",
			"готов(а) платить еще больше"
		],
		autoform: {
			type: "select",
			afFieldInput: {
				firstOption: "(Выберите цену интернета)",
				class: 'browser-default'
			}
		},
		label: "Сколько Вы готовы платить за интернет?"
	},
	pay: {
		type: String,
		allowedValues: [
			"Наличная оплата в кассах",
			"Платеж в терминале или банкомате",
			"Оплата через интернет",
			"Автоплатеж/автопополнение в Личном кабинете или Сбербанк Онлайн",
		],
		autoform: {
			type: "select",
			afFieldInput: {
				firstOption: "(Выберите способ оплаты)",
				class: 'browser-default'
			}
		},
		label: "Какой способ оплаты для Вас наиболее удобен?"
	},
	technology: {
		type: String,
		allowedValues: [
			"Нет интернета",
			"Не знаю",
			"Wi-Fi",
			"USB модем",
			"Cпутниковый интернет",
			"ADSL",
			"PON",
			"Fttb",
			"РРЛ"
		],
		autoform: {
			type: "select",
			afFieldInput: {
				firstOption: "(Выберите технологию)",
				class: 'browser-default'
			}
		},
		label: "По какой технологии у Вас сейчас подключен интернет?"
	},
	likeCurrentInet: {
		type: String,
		allowedValues: [
			"Нет",
			"Да",
			"цена устраивает, скорость не устраивает",
			"скорость устравивает, цена не устраивает",
			"нет, потому что нестабильное подключение",
			"другой ответ",
		],
		autoform: {
			type: "select",
			afFieldInput: {
				firstOption: "(Выберите технологию)",
				class: 'browser-default'
			}
		},
		label: "Устраивает ли Вас текущий интернет?"
	}
	// roles: {
	// 	type: [String],
	// 	label: "Роли",
	// 	allowedValues: ['user', 'admin', 'moderator'],
	// 		autoform: {
	// 		  type: "select",
	// 		  afFieldInput: {
	// 			placeholder: "Выберите роль",
	// 			firstOption: "",
	// 			multiple: true
	// 		  },
	// 		  options: function () {
	// 			return [
	// 				{
	// 					optgroup: "Роли",
	// 					options: [
	// 						{label: "пользователь", value: "user"},
	// 						{label: "администратор", value: "admin"},
	// 						{label: "модератор", value: "moderator"}
	// 					]
	// 				}
	// 			];
	// 		  }
	// 		},
	// 	optional: true,
	// 	blackbox: true
	// }
	
	
});

Votes.attachSchema(Schemas.Vote);