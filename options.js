var storage = chrome.storage.sync;
var messages = chrome.i18n.getMessage;

/**
 * Show a saved message and disappear after 10 seconds
 */
var messageTimer;
function showMessage(message) {
	message = message ? message : "";
	document.getElementById('response_message').innerText = message;
	document.getElementById('response_message').style.display = "block";

	clearTimeout(messageTimer);
	messageTimer = setTimeout(function (){
		document.getElementById('response_message').style.display = "none";
		document.getElementById('response_message').innerText = "";
	}, 5000);
}

/**
 * Function to Get Synced Options
 */
function getSyncedOptions() {
	storage.get(null, function(value){
		console.debug(value);
		if (Object.getOwnPropertyNames(value).length == 0) {
			resetOptions();
		} else {
			document.getElementById('option_logo').checked = value['option_logo'] == true ? true : false;
			document.getElementById('option_search_bar').checked = value['option_search_bar'] == true ? true : false;
			document.getElementById('option_links').checked = value['option_links'] == true ? true : false;
			document.getElementById('option_most_visited').checked = value['option_most_visited'] == true ? true : false;
		}
	});
}

/**
 * Function to Check and Save Options
 */
function saveOptions(){
	storage.clear();
	var id, newValue;
	id = "option_logo";
	newValue = document.getElementById(id).checked;
	storage.set({option_logo : newValue});
	id = "option_search_bar";
	newValue = document.getElementById(id).checked;
	storage.set({option_search_bar : newValue});
	id = "option_links";
	newValue = document.getElementById(id).checked;
	storage.set({option_links : newValue});
	id = "option_most_visited";
	newValue = document.getElementById(id).checked;
	storage.set({option_most_visited : newValue});
}

/**
 * Reset options to recommend settings
 */
function resetOptions() {
	document.getElementById('option_logo').checked = true;
	document.getElementById('option_search_bar').checked = true;
	document.getElementById('option_links').checked = false;
	document.getElementById('option_most_visited').checked = false;
	saveOptions();
	showMessage(messages('message_reset'));
}

/**
 * Get Options via Chrome Storage API
 */
chrome.storage.onChanged.addListener(function(changes, namespace) {
	var saved = false,
		reset = false;
	for (key in changes) {
		var storageChange = changes[key];
		console.debug('result: ', key, storageChange);
		if (storageChange.newValue != undefined) {
			if (key == 'option_logo' || key == 'option_search_bar' || key == 'option_links' || key == 'option_most_visited') {
				if (document.getElementById(key)) {
					saved = true;
					document.getElementById(key).checked = storageChange.newValue;
				}
			}
		}
	}
	if (saved == true) {
		showMessage(messages('message_saved'));
	}
});

document.addEventListener ('DOMContentLoaded', function() {
	/**
	 * Display translated texts
	 */
	document.title = messages('extension_name');
	document.getElementById('extension_name').innerText = messages('extension_name');
	document.getElementById('by').innerText = messages('by');
	document.getElementById('response_message').style.display = "none";
	document.getElementById('button_save').innerText = messages('button_save');
	document.getElementById('button_all').innerText = messages('button_all');
	/**
	 * Get and display synced options value
	 */
	getSyncedOptions();
	/**
	 * Event that trigger to save options
	 */
	document.getElementById('button_save').addEventListener('click', saveOptions, false);
	/**
	 * Event that trigger to clear input value
	 */
	document.getElementById('button_all').addEventListener('click', function() {
		resetOptions();
	}, false);
}, false);
