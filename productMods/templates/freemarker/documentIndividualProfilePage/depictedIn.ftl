<table>	
	<tr>
		<td style="vertical-align:middle; width:150px"> 
			<#if  statement.mimeType?upper_case =".PNG" || statement.mimeType?upper_case == ".JPG" || statement.mimeType?upper_case == ".JPEG">
				<a href="${urls.base}${statement.downloadUrl}" data-lightbox="previewSet" data-title="Click ">
					<img src="${urls.base}${statement.downloadUrl}" height="100" width="100">
				</a>	
			<#else>
				${statement.filename}
			</#if>
		</td>
		<td style="vertical-align:middle; width:150px">
			<#if statement.fileDescription?has_content>
				${statement.fileDescription}
			</#if>
		</td>
		<td style="width:15px; vertical-align:middle">
			<a href="${urls.base}${statement.downloadUrl}" download style="color:white">
				<img style="width:12px; height:12px; margin-left: 25px;" id="downloadIcon" src="${urls.base}/images/individual/download-icon.png" alt="Download File" title="Download File" />
			</a>
		</td>
		<td style="width:15px; vertical-align:middle">
			<a href="${profileUrl(statement.uri("image"))}" title="${i18n().name}">
				<img style="width:12px; height:12px; margin-left: 25px;" id="downloadIcon" src="${urls.base}/images/individual/jump-icon.png" />
			</a>
		</td>
	</tr>
</table>
	