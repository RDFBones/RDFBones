<a href="${profileUrl(statement.uri("document"))}"><div>${statement.label}</div></a>
<#if statement.file?has_content >
	<a href="${urls.base}/${statement.downloadUrl}" download><div>Download file</div></a>
<#else>
	<div>There is no file</div>
</#if>	
	