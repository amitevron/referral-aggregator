$(function() {
	var sites, rowText;
	var numSites=1;
	var currentSite;
  //import from previous version if necessary
  if(localStorage.sites) {
    localStorage.websites = localStorage.sites;
    localStorage.removeItem('sites');
  }
	if(localStorage.websites) {
    console.log("loading sites from localStorage...");
    sites= JSON.parse(localStorage.websites);
    for(var site in sites)
    {
      currentSite = sites[site];
      addRow(site, currentSite.cookie, currentSite.regex);
    }
	}
  else {
		addRow("", "", "");
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
							<label for='siteURL"+numSites+"'>Base URL</label> \
							<input id='siteURL"+numSites+"' type='text' class='form-control' value='"+url+"'> \
						</div> \
						<div class='col-md-3 app-data-col'> \
							<label for='cookie"+numSites+"'>Referral Link</label> \
							<input id='cookie"+numSites+"' type='text' class='form-control' value='"+cookie+"'> \
						</div> \
						<div class='col-md-3 app-data-col'> \
							<label for='regex"+numSites+"'>Format *</label> \
							<input id='regex"+numSites+"' type='text' class='form-control' value='"+regex+"'> \
						</div> \
						<div class='deleteButton btn btn-danger col-md-2'>Delete</div> \
					</div>";
		$('#app-data-container').append(rowText);
		numSites++;
    //$('[data-toggle="tooltip"]').tooltip({"animation":true, "trigger":"click"});
    $('[data-toggle="popover"]').popover();

	};

	function storeData() {
		var websites = {};
		var siteName, siteURL, siteCookie, siteRegex;
		$('#app-data-container').find(".app-data-row").each(function(i){
			siteName = $(this).attr('id');
			siteURL = $(this).find('[id^=siteURL]').val();
			siteCookie = $(this).find('[id^=cookie]').val();
			siteRegex = $(this).find('[id^=regex]').val();
			websites[siteURL] = {
				cookie:siteCookie,
				regex:siteRegex
			};
		});
		// console.log(JSON.stringify(websites));
    //console.log(Object.keys(websites).length);
		localStorage.websites = JSON.stringify(websites);
    if(jQuery.isEmptyObject(websites))
    {
      localStorage.removeItem('websites');
    }
	};
});
