	<link rel="stylesheet" type="text/css" href="${urls.base}/css/lib.css">
	<link rel="stylesheet" type="text/css" href="${urls.base}/jsLibrary/previewJS/css/lightbox.css">
	
	<link rel="stylesheet" type="text/css" href="${urls.base}/jsLibrary/moduleLoader/css/tableView.css">
	<link rel="stylesheet" type="text/css" href="${urls.base}/jsLibrary/moduleLoader/css/treeView.css">	
	<link rel="stylesheet" type="text/css" href="${urls.base}/jsLibrary/moduleLoader/css/View.css">	
	<link rel="stylesheet" type="text/css" href="${urls.base}/jsLibrary/moduleLoader/css/boneEditor.css">	
	
	<link rel="stylesheet" type="text/css" href="${urls.base}/css/UIModules/LiteralEditor.css">	
	<link rel="stylesheet" type="text/css" href="${urls.base}/css/UIModules/ImageEditor.css">
	<link rel="stylesheet" type="text/css" href="${urls.base}/css/UIModules/SubboneEditor.css">
	<link rel="stylesheet" type="text/css" href="${urls.base}/css/UIModules/SingleElements.css">

<div>
	Skeletal Invertories
</div>

	<div id = "pageContainer">
	</div>
	<!--
	<form id="imageUploadForm">
		<input id="datafile" type="file" name="datafile" size="30" />    
		<input type="submit">
	</form>
	-->
	<script>
		var imgSrc = "${urls.base}/images/general/"
		var testImgSource = "${urls.base}/"
		var baseUrl = "${urls.base}/"
		var skeletalInventory = '${individual.uri!}'
$('input[type=file]').on('change', prepareUpload);

// Grab the files and set them to our variable
function prepareUpload(event)
{
   alert("jtt")
  files = event.target.files;
}

$('form').on('submit', uploadFiles);

// Catch the form submit and upload the files
function uploadFiles(event)
{
  event.stopPropagation(); // Stop stuff happening
    event.preventDefault(); // Totally stop stuff happening

    // START A LOADING SPINNER HERE

    // Create a formdata object and add the files
    var data = new FormData();
    $.each(files, function(key, value)
    {
        data.append(key, value);
    });

    $.ajax({
        url: baseUrl + "skeletalInventory",
        type: 'POST',
        data: data,
        cache: false,
        dataType: 'json',
        processData: false, // Don't process the files
        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
        success: function(data, textStatus, jqXHR)
        {
            if(typeof data.error === 'undefined')
            {
                // Success so call function to process the form
                submitForm(event, data);
            }
            else
            {
                // Handle errors here
                console.log('ERRORS: ' + data.error);
            }
        },
        error: function(jqXHR, textStatus, errorThrown)
        {
            // Handle errors here
            console.log('ERRORS: ' + textStatus);
            // STOP LOADING SPINNER
        }
    });
}
</script>
	</script>
	
${scripts.add('<script type="text/javascript" src="${urls.base}/js/classHierarchy/jquery-1.11.3.min.js"></script>')}

${scripts.add('<script type="text/javascript" src="${urls.base}/js/DataController.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/Controller.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/DataController.js"></script>',
	'<script type="text/javascript" src="${urls.base}/js/UIController.js"></script>',
	'<script type="text/javascript" src="${urls.base}/jsLibrary/previewJS/js/lightbox.js"></script>')}
	
${scripts.add('<script type="text/javascript" src="${urls.base}/jsLibrary/dataEdit/js/library.js"></script>',
	'<script type="text/javascript" src="${urls.base}/jsLibrary/dataEdit/js/stringOperation.js"></script>',
	'<script type="text/javascript" src="${urls.base}/jsLibrary/dataEdit/js/treeData.js"></script>',
	'<script type="text/javascript" src="${urls.base}/jsLibrary/dataEdit/js/configData.js"></script>')}
	
${scripts.add('<script type="text/javascript" src="${urls.base}/jsLibrary/moduleLoader/js/html.js"></script>',
	'<script type="text/javascript" src="${urls.base}/jsLibrary/moduleLoader/js/UI.js"></script>',
	'<script type="text/javascript" src="${urls.base}/jsLibrary/moduleLoader/js/pageLoader.js"></script>',
	'<script type="text/javascript" src="${urls.base}/jsLibrary/moduleLoader/js/treeLoader.js"></script>',
	'<script type="text/javascript" src="${urls.base}/jsLibrary/moduleLoader/js/treeLoaderUI.js"></script>',
	'<script type="text/javascript" src="${urls.base}/jsLibrary/moduleLoader/js/boneEditor.js"></script>')}
	<!-- UI Modules -->
${scripts.add('<script type="text/javascript" src="${urls.base}/jsLibrary/UIModules/ImageEditor.js"></script>',
	'<script type="text/javascript" src="${urls.base}/jsLibrary/UIModules/LiteralEditor.js"></script>',
	'<script type="text/javascript" src="${urls.base}/jsLibrary/UIModules/SubboneEditor.js"></script>',
	'<script type="text/javascript" src="${urls.base}/jsLibrary/UIModules/TableLoader.js"></script>',
	
	'<script type="text/javascript" src="${urls.base}/jsLibrary/UIModules/SingleElements.js"></script>')}
	