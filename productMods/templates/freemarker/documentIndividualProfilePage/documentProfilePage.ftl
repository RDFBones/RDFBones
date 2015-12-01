<#-- $This file is distributed under the terms of the license in /doc/license.txt$ -->

<#-- 
    Individual profile page template for foaf:Person individuals. This is the default template for foaf persons
    in the Wilma theme and should reside in the themes/wilma/templates directory. 
-->
 
<#include "individual-setup.ftl">
<#import "lib-vivo-properties.ftl" as vp>

<#include "individual-adminPanel.ftl">

<link rel="stylesheet" href="${urls.base}/js/previewJS/css/lightbox.css" />
<script type="text/javascript" src="${urls.base}/js/previewJS/js/lightbox-plus-jquery.js"></script>
<script type="text/javascript">
	var jQuery_2_1_4 = $.noConflict(true); 
</script> 

<#if !labelCount??>
    <#assign labelCount = 0 >
</#if>       
<#if !localesCount??>
	<#assign localesCount = 1>
</#if>

<#assign nameForOtherGroup = "${i18n().other}"> 
<section itemscope itemtype="http://schema.org/Person" id="individual-intro" class="vcard person" role="region">
	<section id="individual-info" ${infoClass!} role="region"> 
		<header>
			<h1 class="vcard foaf-person">
			    <#-- Label -->
			    <span itemprop="name" class="fn"><@p.label individual editable labelCount localesCount/></span>
			    <@p.mostSpecificTypes individual />
			 </h1>
		</header>
		<#include "individual-webpage.ftl">
	</section>
</section>

<#assign hideMainImage = propertyGroups.pullProperty("http://vitro.mannlib.cornell.edu/ns/vitro/public#mainImage")!>
<#include "individual-fileUpload.ftl">


<#include "individual-property-group-tabs.ftl">
 
<#assign rdfUrl = individual.rdfUrl>

<#if rdfUrl??>
    <script>
        var individualRdfUrl = '${rdfUrl}';
    </script>
</#if>
<script>
    var imagesPath = '${urls.images}';
	var individualUri = '${individual.uri!}';
	var individualPhoto = '${individual.thumbNail!}';
	var exportQrCodeUrl = '${urls.base}/qrcode?uri=${individual.uri!}';
	var baseUrl = '${urls.base}';
    var i18nStrings = {
        displayLess: '${i18n().display_less}',
        displayMoreEllipsis: '${i18n().display_more_ellipsis}',
        showMoreContent: '${i18n().show_more_content}',
        verboseTurnOff: '${i18n().verbose_turn_off}',
        researchAreaTooltipOne: '${i18n().research_area_tooltip_one}',
        researchAreaTooltipTwo: '${i18n().research_area_tooltip_two}'
    };
    var i18nStringsUriRdf = {
        shareProfileUri: '${i18n().share_profile_uri}',
        viewRDFProfile: '${i18n().view_profile_in_rdf}',
        closeString: '${i18n().close}'
    };
</script>

${stylesheets.add('<link rel="stylesheet" href="${urls.base}/css/individual/individual.css" />',
                  '<link rel="stylesheet" href="${urls.base}/css/individual/individual-vivo.css" />',
                  '<link rel="stylesheet" href="${urls.base}/js/jquery-ui/css/smoothness/jquery-ui-1.8.9.custom.css" />')}

${headScripts.add('<script type="text/javascript" src="${urls.base}/js/tiny_mce/tiny_mce.js"></script>',
                  '<script type="text/javascript" src="${urls.base}/js/jquery_plugins/qtip/jquery.qtip-1.0.0-rc3.min.js"></script>',
                  '<script type="text/javascript" src="${urls.base}/js/jquery_plugins/jquery.truncator.js"></script>')}

${scripts.add('<script type="text/javascript" src="${urls.base}/js/individual/individualUtils.js"></script>',
              '<script type="text/javascript" src="${urls.base}/js/individual/individualQtipBubble.js"></script>',
              '<script type="text/javascript" src="${urls.base}/js/individual/individualUriRdf.js"></script>',
              '<script type="text/javascript" src="${urls.base}/js/jquery-ui/js/jquery-ui-1.8.9.custom.min.js"></script>',
              '<script type="text/javascript" src="${urls.base}/js/individual/moreLessController.js"></script>',
              '<script type="text/javascript" src="${urls.base}/js/imageUpload/imageUploadUtils.js"></script>')}