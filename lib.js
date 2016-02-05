function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

// calculate the distance between two pointes 
function distance(p1, p2){
	return Math.sqrt((p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y));
};

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
};

function getMinOfArray(numArray) {
  return Math.min.apply(null, numArray);
};