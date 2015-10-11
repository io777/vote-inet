Template.voteResult.helpers({
	votes: function(){
		var votesCount = Votes.find().count();
		return votesCount;
	}
});

Template.voteResult.onRendered(function () {
	
	var votesCount = Votes.find().count();
	var votes = Votes.find().fetch();

	// House chart ///////////////////////////////////////////
	var voteHouse = ['voteHouse'];
	var voteHouseProcent = ['Количество голосов (%)'];

	var arrayHouse = [];
	
	_.filter(votes, function(vote){
		arrayHouse.push(vote.house);
	})

	var uniqHouse = _.uniq(arrayHouse);

	_.filter(uniqHouse, function(house){
		voteHouse.push(house);
		voteHouseProcent.push(((((_.where(votes, {house: house})).length) * 100)/votesCount).toFixed(1));
	})

	Session.set('voteHouse', voteHouse);
	Session.set('voteHouseProcent', voteHouseProcent);

	var houseChart = c3.generate({
		bindto: this.find('.houseChart'),
		size: {
	 		height: 770
			// width: 100
	 	},
		data: {
			x: 'voteHouse',
			columns: [
				['voteHouseProcent'],
				['voteHouse']
			],
			type: 'bar',
			labels: true
		},
		grid: {
			x: {
				show: true
			},
			y: {
				show: true
			}
		},
		bar: {
			width: {
				ratio: 0.3 // this makes bar width 50% of length between ticks
			}
			// or
			//width: 100 // this makes bar width 100px
		},
		axis: {
				rotated: true,
				x: {
					label: {
						text: 'Дачный кооператив',
						position: 'outer-top'
					},
					type: 'category', // this needed to load string x value
				},
				y: {
					label: {
						text: 'Голосов (%)',
						position: 'outer-top'
					}
				}
			}
	});

	// Speed chart ///////////////////////////////////
	var voteSpeed = ['voteSpeed'];
	var voteSpeedProcent = ['Количество голосов (%)']

	var arraySpeed = [];

	_.filter(votes, function(vote){
		arraySpeed.push(vote.speed);
	})

	var uniqSpeed = _.uniq(arraySpeed);

	_.filter(uniqSpeed, function(speed){
		voteSpeed.push(speed);
		voteSpeedProcent.push(((((_.where(votes, {speed: speed})).length) * 100)/votesCount).toFixed(1));
	})

	Session.set('voteSpeed', voteSpeed);
	Session.set('voteSpeedProcent', voteSpeedProcent);
	
	var speedChart = c3.generate({
		bindto: this.find('.speedChart'),
		// size: {
		// 		height: 770,
		//		width: 100
	 	// },
		data: {
			x: 'voteSpeed',
			columns: [
				['voteSpeedProcent'],
				['voteSpeed']
			],
			type: 'bar',
			labels: true
		},
		grid: {
			x: {
				show: true
			},
			y: {
				show: true
			}
		},
		bar: {
			width: {
				ratio: 0.3 // this makes bar width 50% of length between ticks
			}
			// or
			//width: 100 // this makes bar width 100px
		},
		axis: {
				rotated: true,
				x: {
					label: {
						text: 'Скорость',
						position: 'outer-top'
					},
					type: 'category', // this needed to load string x value
				},
				y: {
					label: {
						text: 'Голосов (%)',
						position: 'outer-top'
					}
				}
			}
	});

	// Money /////////////////////////////////////////
	var voteMoney = ['voteMoney'];
	var voteMoneyProcent = ['Количество голосов (%)']

	var arrayMoney = [];

	_.filter(votes, function(vote){
		arrayMoney.push(vote.money);
	});

	var uniqMoney = _.uniq(arrayMoney);

	_.filter(uniqMoney, function(money){
		voteMoney.push(money);
		voteMoneyProcent.push(((((_.where(votes, {money: money})).length) * 100)/votesCount).toFixed(1));
	});

	Session.set('voteMoney', voteMoney);
	Session.set('voteMoneyProcent', voteMoneyProcent);

	var moneyChart = c3.generate({
		bindto: this.find('.moneyChart'),
		// size: {
		// 		height: 770,
		//		width: 100
	 	// },
		data: {
			x: 'voteMoney',
			columns: [
				['voteMoneyProcent'],
				['voteMoney']
			],
			type: 'bar',
			labels: true
		},
		grid: {
			x: {
				show: true
			},
			y: {
				show: true
			}
		},
		bar: {
			width: {
				ratio: 0.3 // this makes bar width 50% of length between ticks
			}
			// or
			//width: 100 // this makes bar width 100px
		},
		axis: {
				rotated: true,
				x: {
					label: {
						text: 'Цена',
						position: 'outer-top'
					},
					type: 'category', // this needed to load string x value
				},
				y: {
					label: {
						text: 'Голосов (%)',
						position: 'outer-top'
					}
				}
			}
	});

	// Pay ///////////////////////////////////////
	var votePay = ['votePay'];
	var votePayProcent = ['Количество голосов (%)']

	var arrayPay = [];

	_.filter(votes, function(vote){
		arrayPay.push(vote.pay);
	});

	var uniqPay = _.uniq(arrayPay);

	_.filter(uniqPay, function(pay){
		votePay.push(pay);
		votePayProcent.push(((((_.where(votes, {pay: pay})).length) * 100)/votesCount).toFixed(1));
	});

	Session.set('votePay', votePay);
	Session.set('votePayProcent', votePayProcent);

	var payChart = c3.generate({
		bindto: this.find('.payChart'),
		// size: {
		// 		height: 770,
		//		width: 100
	 	// },
		data: {
			x: 'votePay',
			columns: [
				['votePayProcent'],
				['votePay']
			],
			type: 'bar',
			labels: true
		},
		grid: {
			x: {
				show: true
			},
			y: {
				show: true
			}
		},
		bar: {
			width: {
				ratio: 0.3 // this makes bar width 50% of length between ticks
			}
			// or
			//width: 100 // this makes bar width 100px
		},
		axis: {
				rotated: true,
				x: {
					label: {
						text: 'Цена',
						position: 'outer-top'
					},
					type: 'category', // this needed to load string x value
				},
				y: {
					label: {
						text: 'Голосов (%)',
						position: 'outer-top'
					}
				}
			}
	});

	// Technology //////////////////////////////////
	var voteTechnology = ['voteTechnology'];
	var voteTechnologyProcent = ['Количество голосов (%)']

	var arrayTechnology = [];

	_.filter(votes, function(vote){
		arrayTechnology.push(vote.technology);
	});

	var uniqTechnology = _.uniq(arrayTechnology);

	_.filter(uniqTechnology, function(technology){
		voteTechnology.push(technology);
		voteTechnologyProcent.push(((((_.where(votes, {technology: technology})).length) * 100)/votesCount).toFixed(1));
	});

	Session.set('voteTechnology', voteTechnology);
	Session.set('voteTechnologyProcent', voteTechnologyProcent);


	var technologyChart = c3.generate({
		bindto: this.find('.technologyChart'),
		// size: {
		// 		height: 770,
		//		width: 100
	 	// },
		data: {
			x: 'voteTechnology',
			columns: [
				['voteTechnologyProcent'],
				['voteTechnology']
			],
			type: 'bar',
			labels: true
		},
		grid: {
			x: {
				show: true
			},
			y: {
				show: true
			}
		},
		bar: {
			width: {
				ratio: 0.3 // this makes bar width 50% of length between ticks
			}
			// or
			//width: 100 // this makes bar width 100px
		},
		axis: {
				rotated: true,
				x: {
					label: {
						text: 'Технология',
						position: 'outer-top'
					},
					type: 'category', // this needed to load string x value
				},
				y: {
					label: {
						text: 'Голосов (%)',
						position: 'outer-top'
					}
				}
			}
	});
	
	// LikeCurrentInet ////////////////////////////
	var voteLikeCurrentInet = ['voteLikeCurrentInet'];
	var voteLikeCurrentInetProcent = ['Количество голосов (%)']

	var arrayLikeCurrentInet = [];

	_.filter(votes, function(vote){
		arrayLikeCurrentInet.push(vote.likeCurrentInet);
	});

	var uniqLikeCurrentInet = _.uniq(arrayLikeCurrentInet);

	_.filter(uniqLikeCurrentInet, function(likeCurrentInet){
		voteLikeCurrentInet.push(likeCurrentInet);
		voteLikeCurrentInetProcent.push(((((_.where(votes, {likeCurrentInet: likeCurrentInet})).length) * 100)/votesCount).toFixed(1));
	});

	Session.set('voteLikeCurrentInet', voteLikeCurrentInet);
	Session.set('voteLikeCurrentInetProcent', voteLikeCurrentInetProcent);

	var likeCurrentInetChart = c3.generate({
		bindto: this.find('.likeCurrentInetChart'),
		// size: {
		// 		height: 770,
		//		width: 100
	 	// },
		data: {
			x: 'voteLikeCurrentInet',
			columns: [
				['voteLikeCurrentInetProcent'],
				['voteLikeCurrentInet']
			],
			type: 'bar',
			labels: true
		},
		grid: {
			x: {
				show: true
			},
			y: {
				show: true
			}
		},
		bar: {
			width: {
				ratio: 0.3 // this makes bar width 50% of length between ticks
			}
			// or
			//width: 100 // this makes bar width 100px
		},
		axis: {
				rotated: true,
				x: {
					label: {
						text: 'Качество интернета',
						position: 'outer-top'
					},
					type: 'category', // this needed to load string x value
				},
				y: {
					label: {
						text: 'Голосов (%)',
						position: 'outer-top'
					}
				}
			}
	});


	this.autorun(function (tracker) {
		houseChart.load({columns: [
			Session.get('voteHouse'),
			Session.get('voteHouseProcent'),
			[]
		]});
		speedChart.load({columns: [
			Session.get('voteSpeed'),
			Session.get('voteSpeedProcent'),
			[]
		]});
		moneyChart.load({columns: [
			Session.get('voteMoney'),
			Session.get('voteMoneyProcent'),
			[]
		]});
		payChart.load({columns: [
			Session.get('votePay'),
			Session.get('votePayProcent'),
			[]
		]});
		technologyChart.load({columns: [
			Session.get('voteTechnology'),
			Session.get('voteTechnologyProcent'),
			[]
		]});
		likeCurrentInetChart.load({columns: [
			Session.get('voteLikeCurrentInet'),
			Session.get('voteLikeCurrentInetProcent'),
			[]
		]});
	});
});