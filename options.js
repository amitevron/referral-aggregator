

$(function() {
	var sites, rowText;
	if(localStorage.websites) {sites= JSON.parse(localStorage.websites);}
	var numSites=1;	 
	var currentSite;
	for(var site in sites)
	{
		currentSite = sites[site];
		addRow(currentSite.url, currentSite.cookie, currentSite.regex);
	}


	$('#app-data-container').on('click', '.deleteButton', function() {
		$(this).parent().remove();
		storeData();
	})
	.on('keyup', '.form-control', storeData);
	$('#addRowButton').click(function(){
		addRow("", "", "");
	});

	function addRow(url, cookie, regex) {
		rowText = "<div id='site"+numSites+"' class='row app-data-row'> \
						<div class='col-md-3 app-data-col'> \
							<label for='siteURL"+numSites+"'>URL</label> \
							<input id='siteURL"+numSites+"' type='text' class='form-control' value='"+url+"'> \
						</div> \
						<div class='col-md-3 app-data-col'> \
							<label for='cookie"+numSites+"'>Cookie</label> \
							<input id='cookie"+numSites+"' type='text' class='form-control' value='"+cookie+"'> \
						</div> \
						<div class='col-md-3 app-data-col'> \
							<label for='regex"+numSites+"'>Regex</label> \
							<input id='regex"+numSites+"' type='text' class='form-control' value='"+regex+"'> \
						</div> \
						<div class='deleteButton btn btn-danger col-md-1'>Delete</div> \
					</div>";
		$('#app-data-container').append(rowText);
		numSites++;
	};

	function storeData() {
		var $test = $('#app-data-container');
		var websites = {};
		var siteName, siteURL, siteCookie, siteRegex;
		$('#app-data-container').find(".app-data-row").each(function(i){
			siteName = $(this).attr('id');
			siteURL = $(this).find('[id^=siteURL]').val();
			siteCookie = $(this).find('[id^=cookie]').val();
			siteRegex = $(this).find('[id^=regex]').val();
			websites[siteName] = {
				url:siteURL,
				cookie:siteCookie,
				regex:siteRegex
			};
		});
		// console.log(JSON.stringify(websites));
		localStorage.websites = JSON.stringify(websites);
	};
});




