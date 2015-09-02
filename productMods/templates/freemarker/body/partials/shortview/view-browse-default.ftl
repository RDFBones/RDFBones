<#-- $This file is distributed under the terms of the license in /doc/license.txt$ -->

<#-- Default individual browse view -->

<#import "lib-properties.ftl" as p>

<li class="individual" role="listitem" role="navigation">


<#if (individual.thumbUrl)??>
	<img src="/vivo/file/n5347/thumbnail_P6250093.jpg" width="90" alt="White, Bob ">
 <#--<img src="${individual.thumbUrl}" width="90" alt="${individual.name}" />
    <img src="${individual.thumbUrl}" width="90" alt="${individual.name}" /> -->
<#else>
    <h1>
        <a href="${individual.profileUrl}" title="${i18n().view_profile_page_for} ${individual.name}">${individual.name}</a>
    </h1>
</#if>

<#assign cleanTypes = 'edu.cornell.mannlib.vitro.webapp.web.TemplateUtils$DropFromSequence'?new()(individual.mostSpecificTypes, vclass) />
<#if cleanTypes?size == 1>
    <span class="title">${cleanTypes[0]}</span>
<#elseif (cleanTypes?size > 1) >
    <span class="title">
        <ul>
            <#list cleanTypes as type>
            <li>${type}</li>
            </#list>
        </ul>
    </span>
</#if>
</li>

