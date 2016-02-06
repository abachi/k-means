var canvas = window.document.getElementById('canvas'),
	ctx = canvas.getContext('2d');
	canvas.height = height = window.innerHeight - 50;
	canvas.width = width = window.innerWidth - 50;
var
	clusterBtn = document.getElementById("cluster"),
	centerBtn = document.getElementById("center"),
	ELEMENTS = 50,
	ELEMENT_RADIUS = 15,
	CENTER_RADIUS = 5,
	PADDING = 200,
	DEFAULT_ELEMENT_COLOR = '#333',
	K = 3,
	centers = [],
	clusters = [],
	elements = [],
	clusterOrCenter=1;

function Element(x, y){
	this.x = x;
	this.y = y;
	this.r = ELEMENT_RADIUS;
	this.cluster = 0;
	this.color = DEFAULT_ELEMENT_COLOR;
	this.label = '';
};
function Center(x, y){
	this.x = x;
	this.y = y;
	this.r = CENTER_RADIUS;
	this.cluster = 0;
	this.color = '';
};
Center.prototype.draw = function(){
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
	ctx.fillStyle = this.color;
	ctx.fill();
	ctx.stroke();
	ctx.closePath();
};
Element.prototype.draw = function(){
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
	ctx.fillStyle = this.color;
	ctx.fill();
	ctx.closePath();
};

function init(){
	K = document.getElementById("k").value;
	ELEMENTS = document.getElementById("elements").value;
	centerBtn.disabled = true;
	clusterBtn.disabled = false;
	elements = [];
	centers = [];
	clusters = [];
	var infos = document.getElementsByClassName("clusters");
	infos[0].innerHTML = "";
	for (var i=1; i <= K; i++) {
		var c = document.createElement("span");
		c.innerHTML = "Classe "+i+" = 0";
		infos[0].appendChild(c);
	};
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
	}
};
function drawElements(){
	var len = elements.length;
	for(var e=0; e<len; e++){
		ctx.fillStyle = elements[e].color;
		elements[e].draw();
		ctx.font='10px Tahoma';
		ctx.fillStyle = 'white';
		if(elements[e].cluster > 0){
			elements[e].label = "C"+elements[e].cluster;
		}
		ctx.fillText(elements[e].label,elements[e].x-5,elements[e].y+5);
	}
};
function showClustersColors(){
	var len = centers.length;
	for(var i=0; i<len; i++){
		ctx.beginPath();
		ctx.arc((30*i*2)+15, 30, 20, 0, 2*Math.PI);
		ctx.fillStyle = centers[i].color;
		ctx.fill();
		ctx.closePath();
		ctx.font='10px Tahoma';
		ctx.fillStyle = 'white';
		ctx.fillText('C'+(i+1),(30*i*2)+10,35);
	}
};
function updateCentersDOM(){

};
function updateClustersDOM(){
	var _clusters = [];

	for(var i=1; i<=K; i++){
		 _clusters.push(
		 	elements.filter(function(e){ return e.cluster == i;})
		);
	}
	var clustersDOM = document.getElementsByClassName("clusters");
	for (var i=1; i <= K; i++) {
		clustersDOM[0].children[i-1].style= "color : "+centers[i-1].color;
		clustersDOM[0].children[i-1].innerHTML = "Classe "+i+" = "+_clusters[i-1].length; 
	};

};
function updateDOM(){
	updateClustersDOM();
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
		clusterBtn.addEventListener("click", function(){
		centerBtn.disabled = false;
		clusterBtn.disabled = true;
		elementsClustering();
		draw();
		updateDOM();
	});
	centerBtn.addEventListener("click", function(){
		centerBtn.disabled = true;
		clusterBtn.disabled = false;
		centersCompute();
		draw();
	});

};
document.getElementById("restart").addEventListener("click", start);
	