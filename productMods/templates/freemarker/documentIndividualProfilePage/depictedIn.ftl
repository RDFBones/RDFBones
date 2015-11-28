		<#if  statement.mimeType?upper_case =".PNG" || statement.mimeType?upper_case == ".JPG" || statement.mimeType?upper_case == ".JPEG">
			<a href="${urls.base}${statement.downloadUrl}" data-lightbox="previewSet" data-title="Click ">
				<img src="${urls.base}${statement.downloadUrl}" height="100" width="100">
			</a>	
		<#else>
			${statement.filename}
		</#if>