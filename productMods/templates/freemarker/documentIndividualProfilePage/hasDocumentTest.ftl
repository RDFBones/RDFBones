<a href="${profileUrl(statement.uri("document"))}"><div>${statement.label}</div></a>
<div>${statement.documentClass}</div>
<#if statement.file?has_content >
	<a href="${urls.base}/${statement.downloadUrl}" download>Download file</a>
<#else>
	<div>There is no file</div>
</#if>	
