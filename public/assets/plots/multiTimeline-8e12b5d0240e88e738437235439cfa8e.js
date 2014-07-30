define([require],function(){function e(e){this.selector=e.selector||"#area2",this.legend={},this.legend.selector=e.legend.selector,this.margin=e.margin||{top:20,right:20,bottom:20,left:80},this.width=e.width||960,this.height=e.height||400,this.canvasWidth=this.width-this.margin.left-this.margin.right,this.canvasHeight=this.height-this.margin.top-this.margin.bottom,this.dateFormat="%Y-%m-%d",this.title=e.title||"",this.dataset=e.dataset||[],this.colorScaler=d3.scale.category10(),this.xScaler=d3.time.scale().range([0,this.canvasWidth]),this.yScaler=d3.scale.linear().range([this.canvasHeight,0]),this.dateParser=d3.time.format(this.dateFormat).parse,this.bisectDate=d3.bisector(function(e){return e.date}).left,this.liner=d3.svg.line().interpolate("basis").x(function(e){return this.xScaler(e.date)}).y(function(e){return this.yScaler(e.value)})}return e.prototype.loadAndRender=function(e){var t=this;d3.json(e,function(n,i){return n?(console.error("Can not load data from url: "+e),1):(i.forEach(function(e){e.date=t.dateParser(e.date)}),i.sort(function(e,t){return e.date-t.date}),void t.render(i))})},e.prototype.render=function(e){var t=this;this.colorScaler.domain(d3.keys(e[0]).filter(function(e){return"date"!==e})),t.data=e,t.dataset=this.colorScaler.domain().map(function(t){return{name:t,values:e.map(function(e){return{date:e.date,value:+e[t]}})}}),t.xScaler.domain(d3.extent(e,function(e){return e.date})),t.yScaler.domain([d3.min(t.dataset,function(e){return d3.min(e.values,function(e){return e.value})}),d3.max(t.dataset,function(e){return d3.max(e.values,function(e){return e.value})})]),canvas=t.initCanvas().select(".canvas");var n=canvas.selectAll(".timeline").data(t.dataset).enter().append("g").attr("class","timeline");n.append("path").attr({"class":"line",id:function(e){return"line_"+e.name},d:function(e){return t.liner(e.values)}}).style({opacity:.3,stroke:function(e){return t.colorScaler(e.name)}}),t.addAxisX(),t.addAxisY(),t.addTitle(),t.addLegend()},e.prototype.initCanvas=function(){var e=this,t=d3.select(e.selector).append("svg").attr({width:e.width,height:e.height});return t.append("g").attr("class","canvas").attr("transform","translate("+e.margin.left+","+e.margin.top+")"),e.canvas=t,t},e.prototype.addAxisX=function(){var e=this,t=d3.svg.axis().scale(e.xScaler).orient("bottom").ticks(e.dataset.length,3);e.canvas.append("g").attr({"class":"x axis",transform:"translate("+e.margin.left+","+(e.height-e.margin.bottom)+")"}).call(t)},e.prototype.addAxisY=function(){var e=this,t=d3.svg.axis().scale(e.yScaler).orient("left").ticks(5);e.canvas.append("g").attr("class","y axis").attr("transform","translate("+e.margin.left+","+e.margin.top+")").call(t)},e.prototype.addTitle=function(){var e=this;e.canvas.append("g").attr("class","").append("text").text(e.title).attr({"class":"plotTitle",x:function(){return e.width/2},y:function(){return e.margin.top}})},e.prototype.addFocusator=function(){function e(){{var e=t.xScaler.invert(d3.mouse(this)[0]);t.yScaler.invert(d3.mouse(this)[1])}data=t.data,i=t.bisectDate(data,e,1),d0=data[i-1];var r=i<data.length?data[i]:data[data.length-1],a=e-d0.date>r.date-e?r:d0;console.debug(a),formatHTML="",d3.map(a).forEach(function(e,t){formatHTML+="<li>"+e+":"+t+"</li>"}),n.attr("transform","translate("+d3.mouse(this)[0]+","+d3.mouse(this)[1]+")"),d3.select("#focusator-tooltip").style({opacity:.9,left:d3.event.pageX+"px",top:d3.event.pageY+"px"}).html("<ul>"+formatHTML+"</ul>")}var t=this,n=(d3.select("body").append("div").attr("id","focusator-tooltip").attr("class","nav nav-list tooltip").style({position:"absolute"}).html("test"),t.canvas.append("g").attr("class","focus").style("display","none"));n.append("text").attr({x:9,dy:".35em"}),t.canvas.append("rect").attr({"class":"overlay",width:t.width+"px",height:t.height+"px"}).on("mouseover",function(){n.style("display",null)}).on("mouseout",function(){n.style("display","none")}).on("mousemove",e)},e.prototype.addLegend=function(){var e=this;d3.select(e.legend.selector).append("ul").attr("class","nav nav-pills").style({"padding-left":e.margin.left+"px"}).selectAll(".btn-legend").data(e.dataset).enter().append("li").attr({"class":"btn-legend","data-language":function(e){e.name}}).html(function(t){if("date"!=t.name){var n="",i=e.colorScaler(t.name);n=['<a href = "#">','<i class = "icon-stop" style = "color: ',i,' ;">&nbsp;</i>',"&nbsp;",t.name,"</a>"].join("")}else console.debug("MultiTimeline legend skips: "+t.name);return n}).on("mouseover",function(e){var t="#line_"+e.name;d3.select(t).style("opacity",.9)}).on("mouseout",function(e){console.log("OFF:"+e.name);var t="#line_"+e.name;d3.select(t).style("opacity",.3)})},e});