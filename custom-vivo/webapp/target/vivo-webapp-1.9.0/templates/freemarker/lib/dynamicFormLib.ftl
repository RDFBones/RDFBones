

<#macro createJSONObject element parameters>
	{
		<@createJSONObjectSub element parameters />
	},
</#macro>

<#macro createJSONObjectSub element parameters>
	<#list parameters as param>
		<#if element[param]?has_content>
			${param} : "${element[param]}", 	
		</#if>
	</#list>
</#macro>


<#macro createJSONList varName elements parameters>
	var ${varName} = [
		<#if elements?has_content>
			<#list elements as element>
				<@createJSONObject element parameters />
			</#list>
		</#if>
	]
</#macro>


<#macro createJSONListSub varName elements parameters>
	${varName} : [
		<#if elements?has_content>
			<#list elements as element>
				<@createJSONObject element parameters />
			</#list>
		</#if>
	]
</#macro>