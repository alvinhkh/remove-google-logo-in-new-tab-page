# Remove Google Logo in New Tab Page
A Chrome Extension attempt to remove elements like the Google Logo, Search bar and Most Visited in New Tab Page.

## Install
Install from Chrome Web Store (http://bit.ly/rm-ntp)

** IMPORTANT! ** It works only if using Google Search as default search engine (start with {google:baseURL} in chrome://settings/searchEngines).
Plus, it may not work when offline.


## Background
Since up to this moment *(May 2015)* there is no way to access Chrome theme background in new tab page from any Chrome API.
In order to get a blank NTP while preserving the theme background;
I wrote this extension to remove all or some elements, like the Google logo, the search bar and Most Visited thumbnail on the NTP; rather than using some existing approach to create a new blank NTP without theme background.

This extension ***will not*** work forever as this is not a replacement of NTP, but a content script that does tricks to chrome specific google search page *(i.e. www.google.com/_/chrome/newtab)*.

Theme lovers, star these issues (https://crbug.com/11854 , https://crbug.com/463822) so developers can access theme background in extension.


## License
	Copyright (c) 2014-2015, AlvinHKH
	http://www.alvinhkh.com

	Redistribution and use in source and binary forms, with or without modification,
	are permitted provided that the following conditions are met:

	1. Redistributions of source code must retain the above copyright notice,
	this list of conditions and the following disclaimer.

	2. Redistributions in binary form must reproduce the above copyright notice,
	this list of conditions and the following disclaimer in the documentation and/or
	other materials provided with the distribution.

	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR
	IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
	FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
	CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
	DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
	DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
	IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT
	OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
