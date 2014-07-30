define([require],function(){function e(e){this.caption=e.caption||"",this.selector=e.selector||"body",this.classes=e.classes||"",this.width=e.width||200,this.fontSize=e.fontSize||12,this.titleWidth=e.titleWidth||100,this.bar=e.bar||{maxWidth:100},this.dataset=e.dataset||[],this.icon=e.icon||{path:"/assets/language",height:20};var t=this;this.templates={titleCell:function(e){return['<img src="'+t.icon.path+"/"+e.toLowerCase()+'.png"',' style = "height:'+t.icon.height+'px;" class = "pull-left"',' title = "'+e+'" />',"<strong>"+e+"</strong>"].join(" ")},valueCell:function(e){return['<small style="text-align: center;">'+e+"</small>"].join(" ")},caretCell:function(e){var t=parseInt(e)>=0;return['<i class = "icon-caret-',t?"up":"down",'" style = "color:',t?"green":"red",';"></i>'].join("")}}}return e.prototype.render=function(e){var t=this;t.dataset=e;var n=d3.select(t.selector).append("div");n.attr({"class":t.classes}).html("<h5>"+t.caption+"</h5>");var i=n.append("table");i.style({width:function(){return t.width+"px"},"font-size":function(){return t.fontSize+"px"}}).attr("class","table table-hover table-condensed");{var r=(i.append("thead"),i.append("tbody")),a=r.selectAll("tr").data(t.dataset).enter().append("tr").style("width",t.width);a.selectAll("td").data(function(e){return[e.title,e.value,e.t1]}).enter().append("td").attr("class",function(e,t){return 1==t?"value":"title"}).html(function(e,n){switch(n){case 0:return t.templates.titleCell(e);case 1:return t.templates.valueCell(e);case 2:return t.templates.caretCell(e)}})}},e.prototype.loadAndRender=function(e){var t=this;d3.json(e,function(n,i){return n?(console.error("Can not load data from "+e+"for SummaryTable"),console.error(n),1):void t.render(i)})},e});