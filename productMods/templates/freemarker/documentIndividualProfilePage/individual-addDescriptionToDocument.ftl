

<section class="vcard person" id="individual-intro">
	<#assign property = propertyGroups.pullProperty("http://vivo.mydomain.edu/individual/documentDescription")!> 
	<#if property?has_content> 
	
	    <#if property?has_content> <#-- true when the property is in the list, even if not populated (when editing) -->
        	
        	<h2 id="${property.localName}" title="${property.publicDescription!}">
        		Description
	        	<#if !property.statements?has_content>
	        		<@p.addLink property editable property.localName?capitalize />	
	        	</#if>
	        </h2>
	        <#list property.statements as statement>
	        	 <#if property.rangeUri?? >
			        <#assign rangeUri = property.rangeUri /> 
			    <#else>
			        <#assign rangeUri = "" /> 
			    </#if>
					<#include "${property.template}">
					<@p.editingLinks "${property.localName}" "${property.name}" statement editable rangeUri/>
			    </li>
        	</#list>
   		 </#if>
	</#if>   
</section>