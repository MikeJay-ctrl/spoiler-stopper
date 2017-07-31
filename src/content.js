let boundaries =  document.getElementsByClassName('tweet-text');
let parent_c = document.getElementsByClassName('AppContent-main')[0]
let globalHeight = 0;
let last = 0;
let spoilerArray = [];

window.addEventListener('scroll', function(e) {

	var height = parent_c.clientHeight;

	if(height > globalHeight){
		analyseAndReplace(last);
		globalHeight = height;
		last = boundaries.length
	}
});





function analyseAndReplace(first){
	let test_re ;
	for(var i = first; i < boundaries.length; i++){
		for(let x = 0; x < spoilerArray.length; x++){
			test_re = spoilerArray[x].toLowerCase()
			//console.log(boundaries[i].textContent+"\n\n\n");
			
			let testVal = boundaries[i].innerHTML;
			let child 	= boundaries[i].parentNode.parentNode;
			let parent 	= child.parentNode; 

			if(testVal.toLowerCase().includes(test_re)){
				createReplacementCont(parent, child);
			} else {
				let testChildNode
				for(let j = 0; j < boundaries[i].childNodes.length; j++){
					testChildNode = boundaries[i].childNodes[j].textContent;
					console.log(testChildNode)
					if(testChildNode.toLowerCase().includes(test_re)){
						createReplacementCont(parent, child);
						break;
					}
				}
			}
		}
	};
}

function createReplacementCont(parent, child){
	let newChild = document.createElement("div");
	let newsecond = document.createElement("button");
	newsecond.innerHTML = "Click to reveal";

	newsecond.addEventListener('click', (e)=>{
		let myC = e.target.parentNode
		let myP = myC.parentNode
		myP.replaceChild(child, myC);
	})
	newChild.appendChild(newsecond)
	parent.replaceChild(newChild, child);

}


chrome.runtime.onMessage.addListener(
	function(request, sender, sendMessage){
		console.log("IN UPDATED VALS", request)
		switch(request.designation){
			
			case 'updatedVals':
				spoilerArray = request.updatedVals;
				console.log("IN UPDATED VALS", )
				return;
		}
	}
)


chrome.storage.onChanged.addListener(function(changes, namespace){
	let datastore 
	console.log("THIS ", changes)


	datastore = changes.datastore.newValue

	let lists =  Object.values(datastore.categories).map(key =>{
		return key.keyPhrases.filter(val => {
    		if(val.isActive){
        		return {name: val.phrase, cat: key.name}
			}
		})
	})

	lists = [].concat.apply([],lists).map(obj => {
		return obj.phrase
	})
 //	chrome.runtime.sendMessage({designation: "openSettings"});
	 console.log(lists)
	 spoilerArray = lists;
	 analyseAndReplace(0)

	//chrome.runtime.sendMessage({"designation": "updatedVals", "updatedVals": "sss"});
	
});

// function analyseAndReplace(first){
// 	for(var i = first; i < boundaries.length; i++){
// 		console.log(boundaries[i].textContent+"\n\n\n");
// 		let test_re = new RegExp('hot')
// 		let testVal = boundaries[i].innerHTML;
// 		if(test_re.test(testVal.toLowerCase())/*.includes('hot')*/){
// 			let child 	= boundaries[i].parentNode.parentNode;
// 			let parent 	= child.parentNode; 
// 			let newChild = document.createElement("div");
// 			let newsecond = document.createElement("button");
// 			newsecond.innerHTML = "Click to reveal";
// 			newsecond.addEventListener('click', (e)=>{
// 				let myC = e.target.parentNode
// 				let myP = myC.parentNode
// 				myP.replaceChild(child, myC);
// 			})
// 			newChild.appendChild(newsecond);

// 			parent.replaceChild(newChild, child);
// 		}
// 	};
// }