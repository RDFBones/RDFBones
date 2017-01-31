<#macro js url>
	${scripts.add(
		'<script type="text/javascript" src="${urls.base}/js/${url}.js"></script>')}
</#macro>

<#macro css url>
	<link rel="stylesheet" type="text/css" href="${urls.base}/css/${url}.css">
</#macro>