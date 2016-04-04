/*******************************************************************************
 * This class is responsible for the UI loading based on configuration data
 ******************************************************************************/
var tableLoader = {

	showTable : function(module, tableData) {

		var tableContainer = html.getDivId(module.id)
		// TableTitle
		tableContainer.append(UI.getTitle(module.title))
		// ColumnTitles
		var columnTitles = html.getNewDiv()
		$.each(module.columns, function(index, value) {
			columnTitles.append(tableUI.getColumnTitle(value.columnName
					.capitalizeFirstLetter()))
		})
		tableContainer.append(columnTitles)
		// TableData
		var dataContainer = html.getNewDiv()
		$.each(tableData, function(outerIndex, data) {
			var rowContainer = tableUI.getRowContainer()
			$.each(module.columns, function(innerIndex, config) {
				var container = null
				if ("cardinality" in config) {
					// List of data
					container = tableLoader.getListElement(data, config,
							outerIndex)
				} else { // Simple Data
					container = tableUI.getColumnDiv(data[config.columnName])
				}
				rowContainer.append(container)
			})
			rowContainer.append(tableUI.getEditButton(data))
			dataContainer.append(rowContainer)
		})
		tableContainer.append(dataContainer)
		$("#pageContainer").append(tableContainer)
		return tableContainer
	},

	getListElement : function(data, config, inputIndex) {
		switch (config.ui.type) {
		case "imageList":
			var container = tableUI.getImageContainer()
			$.each(data.images, function(index, img) {
				var src = img[config.dataMap.src]
				var uri = img[config.dataMap.uri]
				var img = null
				if (config.ui.edit) {
					img = tableUI.getEditImg(src, uri, inputIndex)
				} else {
					img = tableUI.getImg(src, inputIndex)
				}
				container.find(".imagesInnerContainer").append(img)
			})
			break;
		default:
			break;
		}
		return container
	},
}


