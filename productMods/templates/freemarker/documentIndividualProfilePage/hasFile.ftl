
	<td>	${statement.filename} </td>
	<td>
		<#if statement.fileDescription?has_content>
			${statement.fileDescription}
		</#if>
	</td>
	<td style="width: 15px;">
		<a href="${urls.base}${statement.downloadUrl}" download style="color:white">
			<img style="width:12px; height:12px; margin-left: 25px;" id="downloadIcon" src="${urls.base}/images/individual/download-icon.png" alt="Download File" title="Download File" />
		</a>
	</td>