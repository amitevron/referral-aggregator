// 1. getCurrentURL
// 2. look up in table to find addition and append it
// 3. copy complete URL to clipboard
// 4. move to gmail tab
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
// 	var webSite = tabURL.match(/www.(.*).com\//)[1];
	var parts=tabURL.split(/(.com\/|.net\/|.org\/)/);  //this is pretty weak because if ".com" appears in the path it'll fuck shit up
	var baseURL = parts[0];
	var urlPath = parts[2];
	baseURL = baseURL+parts[1];
	baseURL = baseURL.replace(/.*?:\/\//g, "");
 	getCookie(baseURL, urlPath);
}

function getCookie(base, urlpath)
{
		var cookiesData = JSON.parse(localStorage["sites"]);
		var myURL;//=fullURL;
		if (cookiesData[base])
		{
			var myCookie = cookiesData[base].cookie;
			var myRegex = cookiesData[base].regex;
			myURL = myRegex.replace("%s", base);	
			myURL = myURL.replace("%p", urlpath);
			myURL = myURL.replace("%c", myCookie);	
			copyToClipboard(myURL);		
		}
		else
		{
			alert("There is no match for "+base);
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







// 
//     	
// function getCurrentURL(tab) {
// 	alert("here I am!");	
// 		
// }
// 
// function getWindows(win) {
//   targetWindow = win;
//   chrome.tabs.getAllInWindow(targetWindow.id, getTabs);
// }
// 
// function getTabs(tabs) {
//   tabCount = tabs.length;
//   // We require all the tab information to be populated.
//   //chrome.windows.getAll({"populate" : true}, moveTabs);
// }


 	//chrome.tabs.create({'url': chrome.extension.getURL('f.html')}, function(tab) {
// 	 chrome.tabs.create({'url': "http://www.google.com"}, function(tab){});
// 	"props": 
// 	{
// 		"url": "http://www.google.com"
// 	},
	//URL=chrome.runtime.getURL();
//  	chrome.tabs.create({'url': URL}, getCurrentURL(tab));
 	
//  	alert("here I am now!");


 	//alerting();
 	//tabCount = tabs.length;
	 //chrome.tabs.get(1); 
	 //var x=chrome.tabs.get(3);