let searchBtn = document.getElementById('searchBtn')
let contain = document.getElementsByClassName('contain')[0]
let input = document.getElementsByClassName('readyInput')[0]
let close = document.getElementsByClassName('readyX')[0]
searchBtn.onclick = function () {
	contain.className = '';
	input.className = '';
	close.className = 'X';
	searchBtn.className = '';
	let url='https://zh.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&origin=*&gsrsearch='
	if(input.value==''){
		return false;
	}else{
		let searchURL = url+input.value
		getContent(searchURL)
	}
}
close.onclick = function(){
	contain.className = 'contain'
	input.className = 'readyInput'
	searchBtn.className = 'readyBtn'
	close.className = 'X readyX'
	input.value = ''

}
function getContent(url){
	let req 
	if(window.XMLHttpRequest){
		req = new XMLHttpRequest()
	}else{
		req = new ActiveXObject('Mircosoft.XMLHTTP')
	}
	req.onreadystatechange = function(){
		if(req.readyState==4&&req.status==200){
			addContent(JSON.parse(req.response).query)
			console.log(JSON.parse(req.response).query)
		}
	}
	req.open('GET',url)
	req.send()
}
function addContent(data){
	let body = document.getElementsByTagName('body')[0]
	body.style.justifyContent = 'flex-start'
	let contentContain = document.getElementById('searchContent')
	let source = document.getElementById('template').innerHTML
	let myTemplate = Handlebars.compile(source)
	contentContain.innerHTML = myTemplate(data)
}