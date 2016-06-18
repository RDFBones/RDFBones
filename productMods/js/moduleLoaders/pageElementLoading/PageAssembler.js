var PageAssembler = {

	loadPage : function() {
	
		if(pageData.initiator != undefined){
			
			var obj = pageData.initiator.object
			switch(pageData.initiator.inputs.length){
			case 1 :
				$("#pageContent").append(new obj(pageData[pageData.initiator.inputs[0]]).container)
				break
			case 2 :
				$("#pageContent").append(new obj(pageData[pageData.initiator.inputs[0]],
						pageData[pageData.initiator.inputs[1]]).container)
				break
			}
		} else {
			var pageElementBuffer = []
			$.each(pageData["pageConfig"]["pageElements"], function(index, element) {
				pageElementBuffer.push(new PageElementMap[element.type](element).container)
			})
			$("#pageContent").append(pageElementBuffer)
			
		}
	},	
}


