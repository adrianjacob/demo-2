 $(function() {
    Highcharts.setOptions({
        chart: {
            backgroundColor:'rgba(255, 255, 255, 0)',
            margin: 10
        },
        title: {
            text: null
        },
        tooltip: {
            hideDelay:0,
            valuePrefix: '£',
            valueDecimals: 2,
            formatter: function() {
                return this.key + '<br><b>£' + this.y + ' </b>';
            }
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            pie: {
                size:'100%',
                innerSize:'80%',
                borderColor:'#FAFAFA',
                allowPointSelect: false,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                animation: {
					duration: 2000,
					easing: 'easeOutExpo'
				},
            }
        }
    });
});

 var chartData = {

	chart1: {
		chart: {
			type: 'pie',
			renderTo: 'chart1'
		},
		series: [{
			
			data: [{
				name: 'Net',
				y: 558.25,
				color: '#9cbf2b'
			}, {
				name: 'Income Tax',
				y: 238.18,
				color: '#d2234f'
			}, {
				name: 'National Insurance',
				y: 86.54,
				color: '#d2234f'
			}]
		}]
	},

	chart2: {
		chart: {
			type: 'pie',
			renderTo: 'chart2'
		},
		series: [{
			data: [{
				name: 'Net',
				y: 425.25,
				color: '#9cbf2b'
			}, {
				name: 'Income Tax',
				y: 101.21,
				color: '#d2234f'
			}, {
				name: 'National Insurance',
				y: 55.67,
				color: '#d2234f'
			}]
		}]
	},

	chart3: {
		chart: {
			type: 'pie',
			renderTo: 'chart3'
		},
		series: [{
			data: [{
				name: 'Net',
				y: 425.25,
				color: '#9cbf2b'
			}, {
				name: 'Income Tax',
				y: 50.18,
				color: '#d2234f'
			}, {
				name: 'National Insurance',
				y: 80.54,
				color: '#d2234f'
			}]
		}]
	},

	line: {
		chart: {
			renderTo: 'line',
			type: 'spline',
			margin: 0,
			marginBottom: 50
		},
		title: {
			text: null
		},
		credits: {
			enabled: false
		},
		legend: {
			enabled: false
		},
		xAxis: {
			tickmarkPlacement: 'on',
			tickWidth: 0,
			gridLineWidth: 1,
			categories: ['28 Jan', '05 Feb', '12 Feb', '19 Feb', '26 Feb', '02 Mar', '09 Mar', '16 Mar', '23 Mar', '30 Mar']
		},
		yAxis: {
			title: {
				text: null

			},
			labels: {
				align:'left',
				x:0,
				y:-2,
				style: {
					'color':'#CCC'
				},
				formatter: function () {
					return '£' + this.value;
				}
			}
		},
		tooltip: {
			pointFormat: '{series.name} = <b>£{point.y:,.0f}</b>'
		},
		plotOptions: {
			spline: {
				marker: {
					symbol: 'circle'
				},
				animation: false
			}

		},
		series: [{
			color: '#999',
			name: 'Total',
			data: random(650)
		},{
			color: '#9cbf2b',
			name: 'Payment',
			data: random(500)
		}, {
			color: '#d2234f',
			name: 'Deduction',
			data: random(100)
		}]
	}

};

 $(function() {

	var currentCharts = [];
	var position = 1;
	var spanleft;
	var spanwidth = $('.nav a.active').outerWidth();

	$('.nav span').css('width',spanwidth);
	$('.nav span').css('left',$('.nav a.active').offset().left + $('.nav').scrollLeft());

	function injectCharts(position) {
		chartData.line.xAxis.tickPositions = [position];
		charticide();
		currentCharts = [
			new Highcharts.Chart(chartData['chart' + position]),
			new Highcharts.Chart(chartData.line)
		];
		return currentCharts;
	}

	function charticide() {
		return currentCharts.map(function(chart) {
			return chart.destroy();
		});
	}

	function viewportWidth() {
		return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}

	injectCharts(position);

	$('.charts').hammer().on("swiperight", function(ev) {
		//if(position<2) return;
		position += 1;
		injectCharts(position);
	    $( ".charts ul" ).css('left','+='+viewportWidth()+'');
	    $('.nav a.active').removeClass('active').prev().addClass('active');
	    spanleft = $('.nav a.active').offset().left;
	    $('.nav span').css('left',spanleft);
	});

	 $('.charts').hammer().on("swipeleft", function(e) {
	 	if(position<2) return;
		position -= 1;
		injectCharts(position);
	    $( ".charts ul" ).css('left','-='+viewportWidth()+'');
	    $('.nav a.active').removeClass().next().addClass('active');
	    spanleft = $('.nav a.active').offset().left + $('.nav').scrollLeft();
	    $('.nav span').css('left',spanleft);
	});

	$('.tabletoggle').hammer().on("tap", function(e) {
	 	$(this).next().toggle();
	});

});

function random(max) {
	var items = 10;
	var arr = [];
	for(var i = 0; i<items; i++) {
		var bar = Math.floor(Math.random() * 50) + max;
		arr.push(bar);
	}
	return arr;
}

