
class Main {
	
	constructor(){
	
		this.loadExistingData()
	}
	
	loadExistingData(){
		
		$.ajax({
			type : 'POST',
			context : this,
			dataType : 'json',
			url : baseUrl + "dataTransformationAJAX",
			data : {
				task : "formData",
				subjectUri : subjectUri	
			}
		}).done((function(msg){
			this.init(msg.sexScores, msg.dataTransformations)
		}).bind(this))
	}
	
	init (sexScoreList, dataTransformationList){
		
		this.sexScores = new Object()
		this.dataTransformations = new Object()
		this.cnt = sexScoreList.length
		this.selector = html.selector()
		this.optionMap = new Object()
		this.allAddedOption = html.option(null, "All sex scores were already added")
		$.each(sexScoreList, (function(key, value){
			var sexScoreUri = value.sexScore
			var option = html.option(sexScoreUri, value.sexScoreLabel)
			option.appendTo(this.selector)
			this.optionMap[sexScoreUri] = option
			this.sexScores[sexScoreUri] = value
		}).bind(this))
		this.items = []
		$.each(dataTransformationList, (function(key, value){
			this.optionMap[value.sexScore].remove()
			this.cnt--
			this.items.push(new ExistingDataTransformation(this, value).container)
			this.dataTransformations[value.sexScore] = value
		}).bind(this))
		this.initUI()
	}
	
	initUI(){
		
		this.container = html.div()
		this.selectorCont = html.div("title")
		this.addButton = new TextButton("Add sex score", (this.addElement).bind(this))
		this.selectorCont.append([this.selector, this.addButton.container])
		this.elementContainer = html.div("margin10")
		this.elementContainer.append(this.items)
		this.container.append([this.selectorCont, this.elementContainer])
		this.refreshSelector()
		this.container.append(new TextButton("Done", util.redirect, null, "margin15V").container)
		$("#form").append(this.container)
	}
	
	addElement(){
		var sexScoreUri = this.selector.val()
		this.elementContainer.append(
			new DataTransformationItem(this, this.sexScores[sexScoreUri]).container)
		this.cnt--
		this.optionMap[sexScoreUri].remove()
		this.refreshSelector()
	}
	
	remove (data){
		this.selector.append(this.optionMap[data.sexScore])
		this.cnt++
		this.refreshSelector()
	}

	refreshSelector(){
		
		if(this.cnt == 0){
			this.allAddedOption.appendTo(this.selector)	
			this.addButton.disable()
		} else if (this.cnt == 1) {
			this.allAddedOption.remove()
			this.addButton.enable()
		}
	}
}

























	
