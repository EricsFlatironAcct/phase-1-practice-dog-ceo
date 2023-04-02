document.addEventListener("DOMContentLoaded", () =>{
    const dogContainer = document.getElementById('dog-image-container')
    const dogBreedsUl = document.getElementById('dog-breeds')
    const breedDropdown = document.getElementById('breed-dropdown')
    const breedDropdownOptions = breedDropdown.querySelectorAll('option')
    //challenge 1
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    fetch(imgUrl).then(resp => resp.json()).then(dogList => {
           dogList.message.forEach(dog=> {
                const newDog = document.createElement('img');
                newDog.src = dog
                dogContainer.append(newDog)
           })
    })
    
    //challenge 2
    const breedUrl = "https://dog.ceo/api/breeds/list/all"
    const breedArr = []
    fetch(breedUrl).then(resp => resp.json()).then(breedList =>{
        for (const breed of Object.entries(breedList.message)) {
            if(breed[1].length === 0) breedArr.push(breed[0]) //adds breed to array if only item in list
            else{ //concats breed names for each one in list
                for(let i =0; i<breed[1].length;i++){
                    const newBreed = `${breed[0]}, ${breed[1][i]}`
                    breedArr.unshift(newBreed)
                }
            }

        }
    }).then(() =>{
        breedArr.forEach(breed => addBreed(breed))
    })
    //challenge 3
    function addBreed(breed){
        const newBreed = document.createElement('li');
        newBreed.setAttribute('class', breed)
        newBreed.innerHTML = breed
        newBreed.addEventListener('click', () => newBreed.style.color = 'red')
        dogBreedsUl.append(newBreed)
    }

    //challenge 4
    breedDropdown.addEventListener('change',function(event){
        const filterValue = event.target.value //store filter value 
        while(dogBreedsUl.firstChild) dogBreedsUl.removeChild(dogBreedsUl.firstChild) //remove all breeds in current list from DOM
        const filteredBreedArr = [...breedArr].filter(breed => breed.charAt(0) === filterValue) //create filtered list
        filteredBreedArr.forEach(breed => addBreed(breed)) //repopulate breed list on DOM
    })
})