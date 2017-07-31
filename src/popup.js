document.getElementsByClassName('button')[0].addEventListener('click', ()=>{
	//chrome.extension.getBackgroundPage().console.log('Settings Clicked!');
	// Center window on screen.
 	chrome.runtime.sendMessage({designation: "openSettings"});
});

//document.getElementsByClassName('check')[0].addEventListener('click', (e)=>{
//	console.log(e.target.checked)
//	if(e.target.checked){
//		setStatus();	
//	} else {
//		setStatus();	
//	}
//});

let dataStore = {
				usage: {
					inactive: 0,
					active:0
				},
				categories : {}
			};


chrome.storage.local.get("datastore", (datastore)=>{
	//first time opening the application?
	if(datastore.datastore === undefined){
		document.getElementsByClassName('check')[0].checked = false
 		chrome.storage.local.set({"datastore": dataStore}, ()=>{
 		})
	} else {
		document.getElementsByClassName('check')[0].checked = datastore.activated
	}
})	

function setStatus(){
	chrome.storage.local.get("datastore", (datastore)=>{
	//first time opening the application?
		if(datastore.datastore === undefined){
			document.getElementsByClassName('check')[0].checked = false
 			chrome.storage.local.set({"datastore": dataStore})
		} else {
			document.getElementsByClassName('check')[0].checked = !datastore.activated
			chrome.storage.local.set({"datastore": Object.assign(dataStore, {activated: !datastore.activated})})

		}
	})
}