<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<link type="text/css" rel="stylesheet" href="resources/css/index.css"/>
<script type="text/javascript" language="javascript" charset="utf-8" src="resources/js/jquery-3.1.1.min.js"></script>
<script type="text/javascript" language="javascript" charset="utf-8" src="resources/js/surveyData.js"></script>
<script type="text/javascript" language="javascript" charset="utf-8" src="resources/js/index.js"></script>
</head>
<body>
<div class="Page1---surveyData-">
	<div class="div0">
		<div class="div1 gender">
			<div class="layer">성별</div>
		</div>
		<div class="div1 age">
			<div class="layer">연령</div>
		</div>
		<div class="div1 questions">
			<div class="layer">문항</div>
		</div>
		<div class="Rectangle">
			<div class="noChart">상단의 옵션을 선택하면, 그래프가 보여집니다.</div>
			<div class="pieChart">
				<div class="chartTitle"></div>
				<canvas class="Oval" width="300" height="300"></canvas>
				<div class="chartLegend"></div>
			</div>
			<div class="barChart">
				<div class="chartTitle">다가오는 설에 여행 계획이 있나요?</div>
				<div class="chartLegend"></div>
				<div class="yAxis">
					<div></div>
					<div></div>
					<div></div>
					<div>0</div>
				</div>
				<div class="chartBody">
					<table class="axisTable">
						<tr></tr>
						<tr></tr>
						<tr></tr>
					</table>
					<table class="chartTable">
						<tr></tr>
					</table>
					<div class="xAxis"></div>
				</div>
			</div>
		</div>
	</div>
</div>
</body>
</html>