<#import "lib-customEntryForm.ftl" as cef>
<#import "lib-vitro-form.ftl" as lvf>

<div id = "choose">
	<div id = "newSelector" class = "choice">
		Create new 
	</div>	
	<div id = "existingSelector" class = "choice">
		Add existing
	</div>
</div>

<#assign fileDescription = lvf.getFormFieldValue(editSubmission, editConfiguration, "fileDescription") />

<div id = "newForm" class="invisible" >
	<form id="form"	action="${submitUrl}" enctype="multipart/form-data" method="post" >
		<#list sparql.formElements as formElement>
			<#switch formElement.type>
				<#case "file">
			    	<@cef.fileInputField formElement.title/>
			 	<#break>
				<#case "hidden">
			    	<@cef.hiddenInputField formElement.name/>
				<#break>
				<#case "description">
			    	<@cef.descriptionField formElement.title formElement.name fileDescription/>
			  	<#break>
			 </#switch>
		</#list>
		<@cef.editKey editKey/>
		<@cef.submitCancel cancelUrl/>
	</form>
	<div class="backButton">
		Back
	</div>
</div>
<div id = "existingForm" class = "invisible">
	<div id="listTitles" class = "titleContainer">
		<#list sparql.listViewTitles as title>
			<div class = "data">
				${title.name}
			</div>
		</#list>
	<div>
	<div id="elementList">
		
	</div>
	<div class="backButton">
		Back
	</div>
</div>
<script>
	var customFormData = {
	
		//There is one AJAX servlet which handles the request. Its mapping is constant.
		urlBase : '${urls.base}' ,
		servletAddress : '${urls.base}/ajaxSparlqServlet' ,
		newUrl: '${urls.base}/instanceToOffer?tokenize=true',
		subjectUri : '${editConfiguration.subjectUri}',
        predicateUri : '${editConfiguration.predicateUri}',
        customEntryFormUri: '${sparql.customEntryFormUri}',
		// Based on this variable can the servlet decide what has to be sent back
		taskDef : "customEntryForm" ,
		listView : [
				<#list sparql.listViewTitles  as field>
					{ name : '${field.name}' , number : ${field.nr} , type : '${field.type}' } ,
				</#list>
		]
		//This variable will be substituted into the query
	}
</script>
${stylesheets.add('<link rel="stylesheet" href="${urls.base}/templates/freemarker/edit/forms/css/mainCustomEntryForm.css" />')}
<script type = "text/javascript" src="${urls.base}/templates/freemarker/edit/forms/js/mainCustomEntryForm.js"></script>