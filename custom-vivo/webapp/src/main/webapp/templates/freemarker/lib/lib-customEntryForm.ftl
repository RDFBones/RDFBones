<#macro fileInputField title>  
	<h3> ${title} </h3>
	<input id="datafile" type="file" name="datafile" size="30" /> 
	<input type="hidden" name ="dataUpload"  />
</#macro>

<#macro hiddenInputField name val=""> 
	<input type="hidden" name = ${name} value = ${val} />
</#macro>

<#macro descriptionField title name fileDescription>
	<h3> ${title} </h3>
	<textarea id="form" rows="4" cols="50" name='${name}'/>${fileDescription}</textarea>
</#macro>
	
<#macro editKey editKeyValue>
	<input type="hidden" name = "editKey" value="${editKeyValue}"/>
</#macro>
	
<#macro submitCancel cancelUrl>
	<div>
		<input type="submit" value="submit" class="submit">
		<span class="or"> or <a class="cancel"  href="${cancelUrl}" title="cancel">Cancel</a></span>
	</div>
</#macro>
<#macro done cancelUrl>
	<div class="submit">
		<a href="${cancelUrl}" title="cancel">Done</a>
	</div>
</#macro>