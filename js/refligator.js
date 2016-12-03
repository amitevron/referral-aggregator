// 1. getCurrentURL
// 2. look up in table to find addition and append it
// 3. copy complete URL to clipboard
// 4. switch to gmail tab
// 

// var cookiesData = { "jamesallen": "?a_aid=dmnd1357&chan=x",
// 					"google": "?randomCook=1239"};


function start(tab) 
{
	  	chrome.tabs.getCurrent(getCurrentSite(tab));
}

function getCurrentSite(tab)
{
	var tabURL = tab.url;
	var parts=tabURL.split(/(.com\/|.net\/|.org\/)/);  
	var baseURL = parts[0];
	var urlPath = parts[2];
	baseURL = baseURL+parts[1];
	baseURL = baseURL.replace(/.*?:\/\//g, "");
  //alert("part0: " + parts[0] + "  part1: " + parts[1] + "  part2: " + parts[2]);
 	getCookie(baseURL, urlPath);
}

function getCookie(base, urlpath)
{
		//var cookiesData = JSON.parse(localStorage["sites"]);
		var cookiesData = JSON.parse(localStorage["websites"]);
		var myURL;//=fullURL;
		if (cookiesData[base])
		{
			var myCookie = cookiesData[base].cookie;
			var myRegex = cookiesData[base].regex;
			myURL = myRegex.replace("%s", base);	
			myURL = myURL.replace("%p", urlpath);
			myURL = myURL.replace("%c", myCookie);	
      //alert(myURL);
			copyToClipboard(myURL);		
		}
		else
		{
      //alert("There is no match for "+base);
      var addNow = confirm("There is no match for "+base+". Add it now?");
      if(addNow)
      {
        //add current URL to list of sites with default query string and regex
        cookiesData = JSON.parse(localStorage["websites"])
        cookiesData[base] = {cookie:"?", regex:"%s%c%p"}
        localStorage["websites"] = JSON.stringify(cookiesData) 
        chrome.runtime.openOptionsPage() 
      }
		}
}

function copyToClipboard(data)
{
		var copyString=data;
		var obj = document.createElement('div');
       	obj.contentEditable = true;
        document.body.appendChild(obj);
        obj.innerHTML = copyString;
        obj.unselectable = "off";
        obj.focus();
        document.execCommand('SelectAll');
        document.execCommand("Copy", false, null);
        document.body.removeChild(obj);
        
        chrome.tabs.query({"url" : "https://mail.google.com/*"}, switchToGmail);
}

function switchToGmail(tabs)
{
	var testTab = tabs[0];
	var tabId = testTab.id;
	chrome.tabs.update(tabId, {selected: true});//, url:"http://mail.google.com/mail/#compose"});
}

chrome.browserAction.onClicked.addListener(start);

