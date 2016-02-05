var canvas = window.document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	canvas.height = height = window.innerHeight - 50;
	canvas.width = width = window.innerWidth - 50;

	ELEMENTS = 50,
	ELEMENT_RADIUS = 15,
	CENTER_RADIUS = 5,
	PADDING = 300,
	DEFAULT_ELEMENT_COLOR = '#333',
	K = 3,
	centers = [],
	clusters = [],
	elements = [],
	clusterOrCenter=1;


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


function init(){
		K = document.getElementById("k").value;
		ELEMENTS = document.getElementById("elements").value;
		document.getElementById("center").disabled = true;
		document.getElementById("cluster").disabled = false;
		elements = [];
		centers = [];
		clusters = [];

};

function elementsInit(){
	for(var e=0; e<ELEMENTS; e++){
		var x = Math.floor(Math.random() * (width - PADDING)+100);
		var y = Math.floor(Math.random() * (height - PADDING)+100);
		elements.push(new Element(x, y));
	}
};
function centersCompute(){
	clusters = [];
	for(var i=1; i<=K; i++){
		 clusters.push(
		 	elements.filter(function(e){ return e.cluster == i;})
		);
	}
	console.log(clusters);
	var len = K;
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
		// console.log(i);
		console.log("x : "+_len+" / "+sum_x+" = "+(sum_x/_len));
		centers[i].x = sum_x/_len;
		centers[i].y = sum_y/_len;
		sum_x=0; sum_y=0;
	}
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
			// console.log(temp[i]);
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
		// console.log(elements[e]);
		elements[e].draw();
		ctx.font='10px Tahoma';
		ctx.fillStyle = 'white';
		elements[e].label = "C"+elements[e].cluster;
		ctx.fillText(elements[e].label,elements[e].x-5,elements[e].y+5);
		// console.log(elements[e]);
	}
};
function showClustersColors(){
	var len = centers.length;
	for(var i=0; i<len; i++){
		ctx.beginPath();
		ctx.arc((30*i)+30, 50, 20, 0, 2*Math.PI);
		ctx.fillStyle = centers[i].color;
		ctx.fill();
		ctx.closePath();
		ctx.font='10px Tahoma';
		ctx.fillStyle = 'white';
		ctx.fillText('C'+(i+1),(30*i)+30,50);
	}
};
function draw(){
	ctx.fillStyle = '#FFF';
	ctx.fillRect(0, 0, width, height);
	drawElements();
	drawCenters();
	showClustersColors();
};
function start(){
	init();
	elementsInit();
	centersInit();
	draw();
	document.getElementById("cluster").addEventListener("click", function(){
		document.getElementById("center").disabled = false;
		document.getElementById("cluster").disabled = true;
		elementsClustering();
		draw();
	});
	document.getElementById("center").addEventListener("click", function(){
		document.getElementById("center").disabled = true;
		document.getElementById("cluster").disabled = false;
		centersCompute();
		draw();

	});
  // window.requestAnimationFrame(start);

};
document.getElementById("restart").addEventListener("click", start);
	