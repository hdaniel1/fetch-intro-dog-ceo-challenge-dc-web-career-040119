console.log('%c HI', 'color: firebrick')
document.addEventListener('DOMContentLoaded', function() {
 	getDogImages()
 	getDogBreeds() 
 })


function getDogBreeds() {
	fetch("https://dog.ceo/api/breeds/list/all")
	.then(response => response.json())
	.then(breeds => {addBreedToDOM(breeds.message)})
}

function addBreedToDOM(breeds) {
	let breedList = document.querySelector("#dog-breeds")

	for (let dog in breeds) {

		if (breeds[dog].length === 0) {

			let listItem = document.createElement("li")
			listItem.innerText = dog
			listItem.dataset.firstChar = dog[0]
			breedList.appendChild(listItem)
			//add color change
			listItem.addEventListener('click', function() {
				event.target.style.color = "green"
			})
		}
		else {
			let parentListItem = document.createElement("li")
			let unorderedList = document.createElement("ul")
			parentListItem.innerText = dog
			parentListItem.dataset.firstChar = dog[0]
			breedList.appendChild(parentListItem)
			parentListItem.appendChild(unorderedList)
			parentListItem.addEventListener('click', function() {
				event.target.style.color = "green"
			})

			for (let subdog of breeds[dog]) {
				let childListItem = document.createElement("li")
				childListItem.innerText = subdog 
				unorderedList.appendChild(childListItem)

			}}
	}

	filterBreeds(breedList)
}

function filterBreeds(breedlist) {
	let filter = document.querySelector("#breed-dropdown")
	
	let breeds = document.querySelectorAll("li")

	filter.addEventListener("change", function() {
	if (event.target.value === 'default') {
		breedlist.innerHTML = ''

		for (var breed of breeds) {
			breedlist.appendChild(breed);
		}}
	else {
		let filteredBreeds = Array.from(breeds).filter(breed => breed.dataset.firstChar === event.target.value)
		breedlist.innerHTML = ''

		for (var breed of filteredBreeds) {
		breedlist.appendChild(breed);
	}
	}
	
})
}


function getDogImages() {
	fetch("https://dog.ceo/api/breeds/image/random/4")
	.then(response => response.json())
	.then(images => images.message.forEach(addImageToDOM))
}

function addImageToDOM(image) {
	let imageContainer = document.querySelector("#dog-image-container")
	let imageNode = document.createElement("img")
	imageNode.src = image
	imageContainer.appendChild(imageNode)

}