
<div id = "formError">
	<#list form.errors?keys as key>
		<#switch key>
			<#case "missingVars">
					<div> The following parameters are missing form request </div>	
					<ul>
						<#list form.errors.missingVars as var>
							<li> ${var} </li>
						</#list>
					</ul>
				<#break>
			<#default>
				<#break>
		</#switch>
	</#list>
<div>