/**
 * created by 오훈탁
 */

//우클릭 메뉴 방지
document.oncontextmenu = function(e) { return false; };
// 선택 방지
document.onselectstart = function(e) { return false; };
// 드래그 방지
document.ondragstart = function(e) { return false; };

$(function() {
	// surveyData.js파일의 surveyData json 데이터로 버튼 동적 생성
	var gender = surveyData.gender;
	for (idx in gender) {
		var div = "<div class=\"Rectangle-2-Copy-4 clickOff\"><div class=\"layer\" value=\"" + gender[idx] + "\">";
		if (gender[idx] == "male")
			div += "남성";
		else if (gender[idx] == "female")
			div += "여성";
		div += "</div></div>";

		$(".gender").append(div);
	}
	var age = surveyData.age;
	for (idx in age) {
		$(".age").append("<div class=\"Rectangle-2-Copy-4 clickOff\"><div class=\"layer\" value=\"" + age[idx] + "\">"
			+ age[idx] + "대</div></div>");
	}
	var questions = surveyData.questions;
	for (idx in questions) {
		$(".questions").append("<div class=\"Rectangle-2-Copy-4 clickOff\"><div class=\"layer\" value=\"" + idx + "\">"
			+ (Number(idx) + 1) + "번문항</div></div>");
	}

	// 버튼 이벤트
	$(".div1 .Rectangle-2-Copy-4").click(function() {
		// 성별, 문항은 한개만 선택 가능. 연령은 여러개 선택 가능
		var prop = $(this);
		var parent = $(this).parent();
		if (parent.hasClass("gender") || parent.hasClass("questions")) {
			if (prop.hasClass("clickOn"))
				prop.removeClass("clickOn");
			else{
				parent.find(".clickOn").removeClass("clickOn");
				prop.addClass("clickOn");
			}
		} else {
			prop.toggleClass("clickOn");
		}

		// 성별, 연령, 문항이 한개씩만 선택되어 있는 경우 data를 계산 후 pie차트를 그림
		if($(".gender").find(".clickOn").length == 1 && $(".age").find(".clickOn").length == 1 && $(".questions").find(".clickOn").length == 1){
			drawPieChart();
			
			$(".noChart").hide();
			$(".pieChart").show();
			$(".barChart").hide();
		}
		// 연령이 두개 이상 선택되어 있는 경우 bar차트를 그림
		else if($(".gender").find(".clickOn").length == 1 && $(".age").find(".clickOn").length > 1 && $(".questions").find(".clickOn").length == 1){
			drawBarChart();
			
			$(".noChart").hide();
			$(".pieChart").hide();
			$(".barChart").show();
		}
		// 성별, 연령, 문항 중 하나라도 선택이 되어 있는게 있으면 그래프를 숨김
		else{
			$(".noChart").show();
			$(".pieChart").hide();
			$(".barChart").hide();
		}
	});
	
	
	
	function drawPieChart(){
		// 체크된 버튼의 기준으로 데이터를 계산함
		var genderVal = $(".gender").find(".clickOn").find(".layer").attr("value");
		var ageVal = $(".age").find(".clickOn").find(".layer").attr("value");
		var questionVal = $(".questions").find(".clickOn").find(".layer").attr("value");
		var colors = [ "#3ec1c1", "#f55858", "#4a90e2", "#ffcf00" ];
		var a = 0, b = 0, c = 0, d = 0;
		for(idx in surveyActionData){
			if(surveyActionData[idx].gender === genderVal && surveyActionData[idx].age == ageVal){
				var answer = surveyActionData[idx].answer[questionVal];
				if(answer === 'a')
					a++;
				else if(answer === 'b')
					b++;
				else if(answer === 'c')
					c++;
				else if(answer === 'd')
					d++;
			}
		}
		
		var data = [ a, b, c, d ];
		
		// 차트 제목, 범례 표시
		var checkedQuestion = surveyData.questions[questionVal];
		$(".pieChart .chartTitle").html(checkedQuestion.title);
		var index = 0;
		$(".pieChart .chartLegend").html("");
		for(prop in checkedQuestion.question){
			var html = '<div class="legendCriteria"><div class="Rectangle-2" style="background:' + colors[index] + '"></div><div class="legendCriteriaTitle"></div></div>';
			$(".pieChart .chartLegend").append(html);
			$(".pieChart .legendCriteriaTitle").eq(index).html(checkedQuestion.question[prop]);
			index++;
		}

		var canvas = $(".pieChart .Oval")[0];
		var context = canvas.getContext("2d");
		var width = canvas.width;
		var height = canvas.height;

		//원의 중심 x 좌표
		var center_X = width / 2;
		
		//원의 중심 y 좌표 
		var center_Y = height / 2;
		
		// 두 계산값 중 작은 값은 값을 원의 반지름으로 설정
		var radius = Math.min(width, height) / 2;
		var angle = 0;
		
		//데이터(data)의 총합 계산 
		var total = 0;
		for ( var i in data) {
			total += data[i];
		}
		
		for (var i = 0; i < data.length; i++) {
			// 원호를 따라 색을 칠해줌
			context.fillStyle = colors[i];
			context.beginPath();
			context.moveTo(center_X, center_Y);
			context.arc(center_X, center_Y, radius, angle, angle += Math.PI * 2 * (data[i] / total));
			context.lineTo(center_X, center_Y);
			context.fill();
		}
		
		/* (참고용) 응답 문항이 많아질 경우 random색상을 지정해서 문항 갯수만큼 colors변수에 담아줌 */
		/* var colors = [];
		for (var i = 0; i < data.length; i++) {
			// 원호를 따라 색을 칠해줌
			var randomColor = "#" + Math.round(Math.random() * 0xffffff).toString(16);
			console.log(JSON.stringify(colors).indexOf(randomColor));
			colors.push(randomColor);
			context.fillStyle = randomColor;
			context.beginPath();
			context.moveTo(center_X, center_Y);
			context.arc(center_X, center_Y, radius, angle, angle += Math.PI * 2 * (data[i] / total));
			context.lineTo(center_X, center_Y);
			context.fill();
		} */
	}
	
	function drawBarChart(){
		// 체크된 버튼의 기준으로 데이터를 계산함
		var genderVal = $(".gender").find(".clickOn").find(".layer").attr("value");
		var questionVal = $(".questions").find(".clickOn").find(".layer").attr("value");
		var ageVal, data = new Array();
		var colors = [ "#3ec1c1", "#f55858", "#4a90e2", "#ffcf00" ];
		$(".age").find(".clickOn").find(".layer").each(function(){
			ageVal = $(this).attr("value");
			
			var a = 0, b = 0, c = 0, d = 0;
			for(idx in surveyActionData){
				if(surveyActionData[idx].gender === genderVal && surveyActionData[idx].age == ageVal){
					var answer = surveyActionData[idx].answer[questionVal];
					if(answer === 'a')
						a++;
					else if(answer === 'b')
						b++;
					else if(answer === 'c')
						c++;
					else if(answer === 'd')
						d++;
				}
			}
			
			data.push([ a, b, c, d ]);
		});

		// 차트 제목, 범례 표시
		var checkedQuestion = surveyData.questions[questionVal];
		$(".barChart .chartTitle").html(checkedQuestion.title);
		
		$(".barChart .chartLegend").html("");
		$(".age").find(".clickOn").find(".layer").each(function(idx){
			var html = '<div class="Rectangle-2" style="background:' + colors[idx] + '"></div><div class="legendCriteriaTitle"></div>';
			$(".barChart .chartLegend").append(html);
			$(".barChart .legendCriteriaTitle").eq(idx).html($(this).attr("value") + "대");
		});
		
		// 데이터를 더하여 total을 만든 후 가장 큰 total을 구해줌
		var total = new Array();
		var biggestTotal = 0;
		for(idx in data[0]){
			var tot = 0;
			for(idx2 in data){
				tot += data[idx2][idx];
			}
			total.push(tot);
			
			if(biggestTotal < total[idx])
				biggestTotal = total[idx];
		}
		
		// 가장 큰 total의 2번째 자리가 5 이상이면 1번째 자리수를 1올림
		var biggestTotalStr = biggestTotal.toString();
		if(biggestTotalStr.substring(1, 2) >= 5){
			var first = Number(biggestTotalStr.substring(0, 1)) + 1;
			biggestTotal = first * Math.pow(10, biggestTotal.toString().length - 1);
		}
		// 가장 큰 total의 2번째 자리가 5 이하이면 2번째 자리수를 5로 만들어줌
		else{
			biggestTotal = Number(biggestTotalStr.substring(0, 1) + 5) * Math.pow(10, biggestTotal.toString().length - 2);
		}
		
		// bar차트의 height를 구해줌(285px 기준)
		var barHeightList = new Array();
		for(idx in data){
			var barHeight = new Array();
			for(idx2 in data[idx]){
				var height = 288 * data[idx][idx2] / biggestTotal;
				if(height !== 0)
					barHeight.push(height);
			}
			barHeightList.push(barHeight);
		}
		
		// 차트의 y축의 기준 값을 표시(3자리 콤마)
		$(".yAxis div").eq(0).html(biggestTotal.toString().replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,'));
		$(".yAxis div").eq(1).html(Math.round(biggestTotal / 2).toString().replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,'));
		$(".yAxis div").eq(2).html(Math.round(biggestTotal / 3).toString().replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,'));
		
		// 차트의 line과 x축이 될 element를 동적으로 생성
		$(".axisTable tr").html("");
		$(".chartTable tr").html("");
		$(".xAxis").html("");
		var index = 0;
		var html = '';
		for(prop in checkedQuestion.question){
			html += "<td></td>";
			$(".chartTable tr").append("<td rowspan=\"3\"></td>");
			$(".xAxis").append("<div></div>");
			$(".xAxis div").eq(index).html(checkedQuestion.question[prop]);
			
			var bottomPosition = 0;
			$(".age").find(".clickOn").find(".layer").each(function(idx){
				if(idx > 0)
					bottomPosition += barHeightList[idx - 1][index];
				
				$(".chartTable tr td").eq(index).append('<div style="width:94px;height:' 
					+ barHeightList[idx][index] + 'px;bottom:' 
					+ bottomPosition + 'px;background:' 
					+ colors[idx] + ';"><div class="tooltip"><div>' 
					+ data[idx][index].toString().replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,') + '명 (' 
					+ (data[idx][index] / total[index] * 100).toFixed(1)
					+ '%)</div></div></div>');
			});
			
			index++;
		}
		$(".axisTable tr").append(html);
		
		// html이 모두 그려진 후에 css를 적용
		$(document).ready(function(){
			// x축의 크기를 차트의 line에 맞춰 가운데 정렬
			$(".xAxis div").css("width", $(".axisTable tr td:eq(0)").width());
			
			// 차트의 line을 그려줌
			$(".barChart .chartBody .axisTable tr td").css({
				"border-top" : "solid 1px rgba(151, 151, 151, 0.3)",
				"border-right" : "solid 1px rgba(151, 151, 151, 0.3)"
			});
			$(".barChart .chartBody .axisTable").css({
				"border-bottom" : "solid 1px #979797",
				"border-left" : "solid 1px #979797"
			});
			
			// bar를 중앙으로 정렬
			$(".chartTable tr td > div").css("left", ($(".chartTable tr td:eq(0)").width() - 94) / 2);
			
			// bar가 너무 작으면 tooltip을 가운데로 정렬
			$(".chartTable tr td > div").each(function(idx){
				var height = $(this).css("height");
				height = Math.round(Number(height.substring(0, height.length - 2)));
				
				if(height < 28)
					$(".barChart .chartBody .chartTable .tooltip").eq(idx).css("top", "-10px");
			});
			
			// bar차트에 마우스 올리면 해당 영역에 투표한 사람의 수와 퍼센테이지를 말풍선으로 보여줌
			$(".chartTable tr td > div").mouseenter(function(){
				$(this).find(".tooltip").show();
			});
			
			// bar차트에서 마우스가 떠나면 말풍선을 다시 숨김
			$(".chartTable tr td > div").mouseleave(function(){
				$(this).find(".tooltip").hide();
			});
		});
	}
});