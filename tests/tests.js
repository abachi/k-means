
function getTestElements(){
	var elements = [
		new Element(100, 500),
		new Element(500, 100),
		new Element(250, 250),
		new Element(600, 318),
		new Element(190, 125,
		new Element(400, 300)
	];

	return elements;
};

test('it should return the new center of each cluster', function(){
	 console.log(getTestElements());
});