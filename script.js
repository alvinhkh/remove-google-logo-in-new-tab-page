function inject(func) {
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.appendChild(document.createTextNode("(" + func + ")();"));
	document.body.appendChild(script);
}

inject(function() {

document.body.className += " REMOVE_LINKS"
						+ " REMOVE_LOGO"
						+ " REMOVE_SEARCH_BAR"
						+ " REMOVE_MV";

/*
 * Receive window message to take removal actions
 */
function receiveRemovalAction(e) {
	if (e.data.type && e.data.type == 'optionsMessage') {
		document.body.className = document.body.className.replace(/( )?REMOVE_LOGO|REMOVE_SEARCH_BAR|REMOVE_LINKS|REMOVE_MV/ig, '');
		var key;
		key = "option_links";
		if (e.data[key] != null) {
			document.body.className = document.body.className.replace(/( )?REMOVE_LINKS/ig, '');
			if (e.data[key].toString() == "true")
				document.body.className += " REMOVE_LINKS";
		}
		key = "option_logo";
		if (e.data[key] != null) {
			document.body.className = document.body.className.replace(/( )?REMOVE_LOGO/ig, '');
			if (e.data[key].toString() == "true")
				document.body.className += " REMOVE_LOGO";
		}
		key = "option_search_bar";
		if (e.data[key] != null) {
			document.body.className = document.body.className.replace(/( )?REMOVE_SEARCH_BAR/ig, '');
			if (e.data[key].toString() == "true")
				document.body.className += " REMOVE_SEARCH_BAR";
		}
		key = "option_most_visited";
		if (e.data[key] != null) {
			document.body.className = document.body.className.replace(/( )?REMOVE_MV/ig, '');
			if (e.data[key].toString() == "true")
				document.body.className += " REMOVE_MV";
		}
	}
}
window.removeEventListener('message', receiveRemovalAction, false);
window.addEventListener('message', receiveRemovalAction, false);

});

/*
 * Function to send
 */
function sendRemovalMessage() {
	window.postMessage({
		type: 'optionsMessage',
		option_links: localStorage['option_links'] && localStorage['option_links'].toString() == "true" ? true : false,
		option_logo: localStorage['option_logo'] && localStorage['option_logo'].toString() == "false" ? false : true,
		option_search_bar: localStorage['option_search_bar'] && localStorage['option_search_bar'].toString() == "false" ? false : true,
		option_most_visited: localStorage['option_most_visited'] && localStorage['option_most_visited'].toString() == "true" ? true : false,
	}, '*');
}

/**
 * Get synced options and save them in localStorage
 */
chrome.storage.sync.get(null, function(value){
	localStorage['option_links'] = value['option_links'] != null && value['option_links'].toString() == "true" ? true : false;
	localStorage['option_logo'] = value['option_logo'] != null && value['option_logo'].toString() == "false" ? false : true;
	localStorage['option_search_bar'] = value['option_search_bar'] != null && value['option_search_bar'].toString() == "false" ? false : true;
	localStorage['option_most_visited'] = value['option_most_visited'] != null && value['option_most_visited'].toString() == "true" ? true : false;

	window.postMessage({
		type: 'optionsMessage',
		option_links: value['option_links'] != null && value['option_links'].toString() == "true" ? true : false,
		option_logo: value['option_logo'] != null && value['option_logo'].toString() == "false" ? false : true,
		option_search_bar: value['option_search_bar'] != null && value['option_search_bar'].toString() == "false" ? false : true,
		option_most_visited: value['option_most_visited'] != null && value['option_most_visited'].toString() == "true" ? true : false,
	}, '*');
});

/**
 * Get new sync options via Chrome Storage API
 */
chrome.storage.onChanged.addListener(function(changes, namespace) {
	toSetup = false;
	for (key in changes) {
		var storageChange = changes[key];
		switch (key) {
		case 'option_logo':
		case 'option_search_bar':
		case 'option_links':
		case 'option_most_visited':
			localStorage[key] = storageChange.newValue;
			toSetup = true;
			break;
		}
	}
	if (toSetup == true) {
		sendRemovalMessage();
	}
});
