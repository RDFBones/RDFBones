

<section class="vcard person" id="individual-intro">
	<#assign fileUpload = propertyGroups.pullProperty("http://vivo.mydomain.edu/individual/hasFile")!> 
	<#if fileUpload?has_content> <#-- true when the property is in the list, even if not populated (when editing) -->
		 
	   	<#assign localName = fileUpload.localName> 
	   	<h2 id="${localName}" class="mainPropGroup" style="clear:left" title="File" >
	        File <@p.addLink fileUpload editable /> <@p.verboseDisplay fileUpload />
	    </h2> 
	    
	   	<ul role="list" >
	        <@p.objectProperty fileUpload editable />
	    </ul>
	</#if>   
</section>