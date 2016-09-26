
var PageInit = function() {

	this.counter = 0;
	this.next()
}

PageInit.prototype = {

	done : function() {
		this.counter++
		this.next()
	},

	next : function() {

		switch (this.counter) {

		case 0:
			new PageElementLoader(this)
			break;
		case 1: 
			new PageDataLoader(this)
			break;
		case 2 :  
			new PageDataPerform(this)
			break;
		case 3: 
			DataOperation.perform(this)
			break;
		case 4: 
			PageAssembler.loadPage()
			break;
		}
	}
}