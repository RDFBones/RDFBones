var PageAssembler = {

	loadPage : function() {
	
			var pageElementBuffer = []
			if(pageData.pageElements != undefined){
				$.each(pageData.pageElements, function(index, element) {
					if(element.type == sw.customPage){
						pageElementBuffer.push(new element.pageLoader().container)
					} else {
						pageElementBuffer.push(new PageElementMap[element.type](element).container)	
					}
				})		
				$("#pageContent").append(pageElementBuffer)
			}
			
	},	
}
