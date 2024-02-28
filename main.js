
function main() {
	
	var svg = d3.select("svg"),
	margin = 200,
	width = svg.attr("width") - margin,
	height = svg.attr("height") - margin;
	
	svg.append("text").attr("transform","translate(100,0)").attr("x", 200).attr("y", 50).attr("font-size", "24px").text("Poverty rates, Daniel Chandler"); 
	
	var xScale = d3.scaleBand().range([0, width]).padding(0.4),
		yScale = d3.scaleLinear().range([height, 0]);
	var g = svg.append("g").attr("transform", "translate("+100+","+100+")");
	
	d3.csv("national_health_data.csv").then(function(data){
		xScale.domain(data.map(function(d){ return d.display_name;}));
		yScale.domain([0, d3.max(data, function(d){return d.poverty_perc;})])
		
		g.append("g").attr('transform', 'translate(0, '+height+'0)')
			.call(d3.axisBottom(xScale))
		g.append('g').call(d3.axisLeft(yScale).tickFormat(function(d){
			return d;		
		}).ticks(10));
		
	g.selectAll(".bar")
		.data(data)
		.enter().append("rect")
		.attr("class", "bar")
		.attr("x", function(d){return xScale(d.display_name);})
		.attr("y", function(d){return yScale(d.poverty_perc);})
		.attr("width", xScale.bandwidth())
		.attr("height", function(d){return height - yScale(d.poverty_perc);});
	
	});
}