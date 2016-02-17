/**
 * Get a random color.
 * @return {string} Hex color
 */
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

/**
 * Calculate the distance between two points.
 * @param  {object} p1 object has a x and y as proprities
 * @param  {object} p2 object has a x and y as proprities
 * @return {number}    distance
 */
function distance(p1, p2){
	return Math.sqrt((p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y));
};
/**
 * Get the max value in array.
 * @param  {array} arr 
 * @return {number}
 */
function getMaxOfArray(arr) {
  return Math.max.apply(null, arr);
};
/**
 * Get the min value in array.
 * @param  {array} arr 
 * @return {number}
 */
function getMinOfArray(arr) {
  return Math.min.apply(null, arr);
};

// animation request frame
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
