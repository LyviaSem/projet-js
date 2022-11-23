function afficherNftParPages() {
    for (let j = 1; j <= 5; j++) {
        const titreNumeroPage = document.createElement('h1');
        titreNumeroPage.classList.add('titre');
        titreNumeroPage.innerHTML = "PAGE " + j
        document.body.append(titreNumeroPage);

        const elementsPage = document.createElement('div');
        elementsPage.classList.add('cards');
        elementsPage.id = "elements" + j;
        document.body.append(elementsPage);
        
        fetch('https://awesome-nft-app.herokuapp.com/?page=' + j)
        .then(response => {
            if(response.ok) {
                response.json().then(data => {
                    for (let i = 0; i < data.assets.length; i++) {
    
                        const card = document.createElement('div')
                        card.classList.add('card')
    
                            const cardTop = document.createElement('div')
                            cardTop.classList.add('card-top')
                            
                                const cardImage = document.createElement('img')
                                cardImage.classList.add('card-image')
                                cardImage.src = data.assets[i].image_url
                                
                                const cardButtons = document.createElement('div')
                                cardButtons.classList.add('card-buttons')
                                
                                    const buttonFav = document.createElement('button')
                                    buttonFav.classList.add('card-fav')
                                    buttonFav.innerHTML = "<i class='bx bx-star'></i>"
                                    
                                    const buttonPanier = document.createElement('button')
                                    buttonPanier.classList.add('card-panier')
                                    buttonPanier.innerHTML = "<i class='bx bx-cart'></i>"
                                
                            const cardInfos = document.createElement('div')
                            cardInfos.classList.add('card-infos')
                            
                                const cardName = document.createElement('p')
                                cardName.classList.add('card-name')
                                cardName.innerHTML = data.assets[i].name;
                                
                                const cardCreator = document.createElement('p')
                                cardCreator.classList.add('card-creator')
                                cardCreator.innerHTML = "<i class='bx bxs-user' style='color:#FF7F50'></i> <span>Créateur: </span>" + data.assets[i].creator.username;
    
                                const cardSales = document.createElement('p')
                                cardSales.classList.add('card-sales')
                                cardSales.innerHTML = "<i class='bx bx-money-withdraw' style='color:#FF7F50'></i> <span>Nombre de ventes: </span>" + data.assets[i].sales;
    
                                const cardCollection = document.createElement('p')
                                cardCollection.classList.add('card-collection')
                                cardCollection.innerHTML = "<i class='bx bxs-collection' style='color:#FF7F50'  ></i> <span>Collection: </span>" + data.assets[i].collection.name;
    
                                const buttonInfos = document.createElement('button')
                                buttonInfos.classList.add('card-detail')
                                buttonInfos.innerHTML = "Plus d'informations <i class='bx bx-plus'></i>"
                                buttonInfos.setAttribute('onclick','toggleSide(this)');

                            const cardInfosDetails = document.createElement('div')
                            cardInfosDetails.classList.add('card-infos-details')

                                const cardNameDetail = document.createElement('p')
                                cardNameDetail.classList.add('card-name')
                                cardNameDetail.innerHTML = data.assets[i].name;

                                const buttonInfosDetails = document.createElement('button')
                                buttonInfosDetails.classList.add('card-detail')
                                buttonInfosDetails.innerHTML = "Plus d'informations <i class='bx bx-plus'></i>"
                                buttonInfosDetails.setAttribute('onclick','toggleSide(this)');

                                const description = document.createElement('p')
                                description.classList.add('description')
                                description.innerHTML = data.assets[i].description;
                                
                    
            
                                document.getElementById('elements' + j).append(card)
                                    card.append(cardTop)
                                        if(data.assets[i].image_url != "") cardTop.append(cardImage)
                                        cardTop.append(cardButtons)
                                            cardButtons.append(buttonFav)
                                            cardButtons.append(buttonPanier)
                                        cardInfos.append(cardName)
                                        cardInfos.append(cardCreator)
                                        cardInfos.append(cardSales)
                                        cardInfos.append(cardCollection)
                                        card.append(cardInfos)
                                        cardInfosDetails.append(cardNameDetail)
                                        cardInfosDetails.append(description)
                                        cardInfosDetails.append(buttonInfosDetails)
                                        card.append(cardInfosDetails)
                                        cardInfos.append(buttonInfos)
    
                    }
                })
            } else {
                console.log('ERREUR');
                document.getElementById('erreur').innerHTML = "Erreur"
            }
        })
    }
}


function toggleSide(e) {
    const card = e.parentElement.parentElement;
    console.log(card);
    if(e.parentElement.classList.contains('card-infos'))
    {
        card.children[1].style.display = "none";
        card.children[2].style.display = "flex";        
    }
    if(e.parentElement.classList.contains('card-infos-details'))
    {
        card.children[1].style.display = "flex";
        card.children[2].style.display = "none";        
    }
}

// let selectFilter = document.getElementById('select-filter');
// selectFilter.addEventListener('change', function() {
//     console.log('You selected: ', this.value);
// });



afficherNftParPages();