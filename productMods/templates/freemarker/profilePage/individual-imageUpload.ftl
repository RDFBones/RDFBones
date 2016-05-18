
<style>
	  table {
  width: 700px;
}
	table tr td {
  		height: auto;
	}
	
	tr.border_bottom td {
	  border-bottom:1pt solid black;
	  padding: 3px 5px;
	}
	
	tr.spaceOver > td
	{
	  padding: 3px 5px;
	}
	
</style>

<section class="vcard person" id="individual-intro">
	<#assign fileUpload = propertyGroups.pullProperty("http://vivo.mydomain.edu/individual/hasFile")!> 
	<#if fileUpload?has_content> <#-- true when the property is in the list, even if not populated (when editing) -->
		 <#assign localName = fileUpload.localName> 
	   	<h2 id="${localName}" class="mainPropGroup" style="clear:left" title="File" >
	        File <@p.addLink fileUpload editable /> <@p.verboseDisplay fileUpload />
	    </h2> 
   		<table>	
   			<#if fileUpload.statements?has_content>
   				<tr class="border_bottom ">
   					<td>Filename or preview</td>
   					<td>Description</td>
   					<td></td>
   					<td></td>
   				</tr>
   				<tr style="height:10px;"><tr>
   				<#list fileUpload.statements as statement>
					<@tablePropertyList fileUpload statement editable><#include "${fileUpload.template}"></@tablePropertyList>	
				</#list>
   			</#if>
		</table>
	</#if>   
</section>

<#macro tablePropertyList property statement editable>
    <#if property.rangeUri?? >
        <#local rangeUri = property.rangeUri /> 
    <#else>
        <#local rangeUri = "" /> 
    </#if>
    <tr class="spaceOver"> 
        <#nested>       
        <td style="width: 80px; vertical-align:middle">
        		<@p.editingLinks "${property.localName}" "${property.name}" statement editable rangeUri/>
        </td>
     </tr>   	
</#macro>
