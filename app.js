var canvas = window.document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	canvas.height = height = window.innerHeight;
	canvas.width = width = window.innerWidth;

	ELEMENTS = 12,
	ELEMENT_RADIUS = 10,
	CENTER_RADIUS = 5,
	PADDING = 300,
	DEFAULT_ELEMENT_COLOR = '#FFF',
	K = 3,
	centers = [],
	clusters = [],
	elements = [];

	window.requestAnimFrame = (function(callback) {
	  return window.requestAnimationFrame 		||
	   		 window.webkitRequestAnimationFrame ||
	   		 window.mozRequestAnimationFrame 	||
	   		 window.oRequestAnimationFrame 		||
	   		 window.msRequestAnimationFrame 	||
	  function(callback) {
	    window.setTimeout(callback, 1000 / 60);
	  };
	})();


// element class 
function Element(x, y){
	this.x = x;
	this.y = y;
	this.r = ELEMENT_RADIUS;
	this.cluster =0; // numero de classe
	this.color = DEFAULT_ELEMENT_COLOR;
	this.label = '';
};
function Center(x, y){
	this.x = x;
	this.y = y;
	this.r = CENTER_RADIUS;
	this.cluster =0; // numero de classe
	this.color = '';
};
Center.prototype.draw = function(){
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
	ctx.fillStyle = this.color;
	ctx.fill();
	ctx.closePath();
};
Element.prototype.draw = function(){
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
	ctx.fillStyle = this.color;
	ctx.fill();
	ctx.closePath();
};
function elementsInit(){
	for(var e=0; e<ELEMENTS; e++){
		var x = Math.floor(Math.random() * (width - PADDING)+100);
		var y = Math.floor(Math.random() * (height - PADDING)+100);
		elements.push(new Element(x, y));
	}
};
function centersCompute(){
	for(var i=1; i<=K; i++){
		 clusters.push(
		 	elements.filter(function(e){ return e.cluster == i;})
		);
	}
	var len = clusters.length;
	var _len=0;
	var sum_x=0, sum_y=0;
	for(var i=0; i<len; i++){
		_len = clusters[i].length;
		for(var x=0; x<_len; x++){
			sum_x += clusters[i][x].x;
		}
		for(var y=0; y<_len; y++){
			sum_y += clusters[i][y].y;
		}
		console.log('center li kan : ', centers[i], '_len = ', _len);
		centers[i].x = sum_x/_len;
		centers[i].y = sum_y/_len;
		sum_x=0; sum_y=0;
		console.log('center li ja : ', centers[i]);
	}
	console.log('clusters', clusters);
	console.log('centers', centers);
};
function centersInit(){
	for(var c=1; c<=K; c++){
		var x = Math.floor(Math.random() * (width - PADDING)+100);
		var y = Math.floor(Math.random() * (height - PADDING)+100);
		var center = new Center(x, y);
			center.color =  getRandomColor();
			center.cluster = c; 
		centers.push(center);
	}
	console.log(centers);
	// console.log(centers);
};


function elementsClustering(){
	var e_len = elements.length,
		c_len = centers.length,
		temp = [],
		i=0;
	for(var e=0; e<e_len; e++){
			for(var c=0; c<c_len; c++){
				temp.push(distance(elements[e], centers[c]));
			}
			i = temp.indexOf(getMinOfArray(temp));
			elements[e].cluster = centers[i].cluster;
			elements[e].color = centers[i].color;
			temp = [];
	}
};
function drawCenters(){
	var len = centers.length;
	for(var c=0; c<len; c++){
		ctx.fillStyle = centers[c].color;
		centers[c].draw();
		// console.log(elements[e]);
	}
};
function drawElements(){
	var len = elements.length;
	for(var e=0; e<len; e++){
		ctx.fillStyle = elements[e].color;
		console.log(elements[e]);
		elements[e].draw();
		ctx.font='10px Tahoma';
		ctx.fillStyle = 'white';
		ctx.fillText(elements[e].label,elements[e].x-5,elements[e].y+5);
		// console.log(elements[e]);
	}
};
function showClustersColors(){
	var len = centers.length;
	for(var i=0; i<len; i++){
		ctx.beginPath();
		ctx.arc((30*i)+30, height-10, 20, 0, 2*Math.PI);
		ctx.fillStyle = centers[i].color;
		ctx.fill();
		ctx.closePath();
		ctx.font='10px Tahoma';
		ctx.fillStyle = 'white';
		ctx.fillText('C'+(i+1),(30*i)+30,height-10);
	}
};
function start(){

	drawElements();
	drawCenters();
	showClustersColors();
	document.getElementById("next").addEventListener("click", function(){	
		elementsClustering();
		drawElements();
		centersCompute();
		drawCenters();
	});
};
	elementsInit();
	centersInit();
	//console.log(elements);
	start();
	//console.log(elements);
	
  // window.requestAnimationFrame(start);