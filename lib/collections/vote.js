// collection vote
Votes = new Mongo.Collection("Votes");

var Schemas = {};

Schemas.Vote = new SimpleSchema({
	house: {
		type: String,
		allowedValues: [
			"Авиатор",
			"Автомобилист",
			"Автомобилист-1",
			"Барсовское",
			"Бережок-1",
			"Бережок-2",
			"Березовое",
			"Берендей",
			"Богдановское",
			"Брусничное",
			"Весеннее",
			"Ветеран-1",
			"Ветеран-2",
			"Виктория",
			"Витамин",
			"Газовик",
			"Геологоразведчик",
			"Грибное",
			"Дзержинец",
			"Дорожник",
			"Дорожный",
			"Дружба",
			"Железнодорожник",
			"Заречный",
			"Здоровье",
			"Интеграл",
			"Искра",
			"Кедр",
			"Кедровый бор",
			"Кедровый",
			"Клюквенное",
			"Кооператор",
			"Крылья Сургута",
			"Лазурное",
			"Лайнер",
			"Лесное",
			"Лесной",
			"Летние Юрты",
			"Лето",
			"Локомотив",
			"Лукоморье",
			"Магистраль",
			"Май",
			"Многодетная семья",
			"Монтажник",
			"Озерное",
			"Пищевик",
			"Подводник",
			"Прибрежный",
			"Прибрежный-2",
			"Прибрежный-3",
			"Приозерное",
			"Птицевод Севера",
			"Радуга",
			"Рассвет",
			"Речник",
			"Родничек",
			"Рябинка",
			"Рябинушка",
			"Светлое",
			"Север",
			"Север-1",
			"Сириус",
			"Снежный",
			"Солнечное",
			"Сосновый бор",
			"СТ №3",
			"СТ №4",
			"СТ №5",
			"СТ №7",
			"СТ №8",
			"Старожил Сургута",
			"Тюльпан",
			"Урожай",
			"Хвойный",
			"Черемушки",
			"Чернореченский",
			"Чистые пруды",
			"Энергетик",
			"Энергетик-2",
			"Энергостроитель",
			"Юность",
			"Ягодное"
		],
		autoform: {
			type: "select",
			afFieldInput: {
				firstOption: "",
				class: 'browser-default'
			}
		},
		label: "Из какого Вы дачного кооператива?"
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
				firstOption: "",
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
				firstOption: "",
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
				firstOption: "",
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
			"Fttb/Ftth",
			"РРЛ"
		],
		autoform: {
			type: "select",
			afFieldInput: {
				firstOption: "",
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
			"не устраивает скорость",
			"не устраивает цена",
			"нет, потому что нестабильное подключение",
			"другой ответ",
		],
		autoform: {
			type: "select",
			afFieldInput: {
				firstOption: "",
				class: 'browser-default'
			}
		},
		label: "Устраивает ли Вас текущий интернет?"
	},
	userId: {
		type: String,
		label: "ID пользователя",
		optional: true
	}
});

Votes.attachSchema(Schemas.Vote);

// права на изменение базы голосования
Votes.allow({
	insert: function(userId, doc){
		var loggedInUser = Meteor.user();
		if (Roles.userIsInRole(loggedInUser, ['admin','moderator'])) {
			return true;
		} else {
			if (Meteor.user().vote == true) {
				return false;
			} else {
				return true;
			}
		}
	},
	update: function(userId, doc, fields, modifier){
		var loggedInUser = Meteor.user();
		if (Roles.userIsInRole(loggedInUser, ['admin','moderator'])) {
			return true;
		}
	},
	remove: function(userId, doc){
		var loggedInUser = Meteor.user();
		if (Roles.userIsInRole(loggedInUser, ['admin','moderator'])) {
			return true;
		}
	}
});