
  		
let data;

chrome.windows.onCreated.addListener((w) => {

	chrome.storage.local.get("datastore", (dataStore)=>{
		console.log("datastore mined",dataStore)
		data = dataStore.datastore
		if( chrome.runtime.lastError){
			console.log("ERROR")
			console.log(chrome.runtime.lastError)
		}
	})
})


chrome.runtime.onMessage.addListener(
	function(request, sender, sendMessage){
		console.log("REQ", request)
		


		switch(request.designation){
			
			case 'dataForUI':
				
				//sendResponse = data;
				sendMessage({response: data})

				console.log("fired here", request)
				return;

			case 'openSettings':
  				console.log("I get the message");
  				let width= Math.floor(screen.availWidth/2)//screen.availWidth;
  				let height = Math.floor(screen.availHeight/2)//screen.availHeight;
		
				chrome.windows.create({
					url: './react_stack/index.html',//'settings.html',
					left: Math.floor(width/2),
					top:  Math.floor(height/2),
					width: width,
					height: height
				});
				return;
		}
	}
)

  
