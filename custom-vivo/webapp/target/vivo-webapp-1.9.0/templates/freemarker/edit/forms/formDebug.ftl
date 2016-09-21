
<div id = "formDebug">
	<#list form.debugData?keys as key>
		<#switch key>
			<#case "dataQueries">
				<div> Data queries </div>
				<#list form.debugData.dataQueries?keys as key1>
					<div class = "inline margin10">
						${key1}
					</div>
					<div class = "inline margin10">
						form.debugData["dataQueries"][${key1}]	
					</div>
				</#list>
			<#break>
		</#switch>
	</#list>
</div>