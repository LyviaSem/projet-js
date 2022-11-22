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
                                buttonPanier.innerHTML = "<i class='bx bx-shopping-bag'></i>"
                            
                        const cardInfos = document.createElement('div')
                        cardInfos.classList.add('card-infos')

                            const buttonDetails = document.createElement('button')
                            buttonDetails.classList.add('card-detail')
                            buttonDetails.innerHTML = "Plus d'informations <i class='bx bx-plus'></i>"
                        
                            const cardName = document.createElement('p')
                            cardName.classList.add('card-name')
                            cardName.innerHTML = data.assets[i].name;
                            
                            const cardCreator = document.createElement('p')
                            cardCreator.classList.add('card-creator')
                            cardCreator.innerHTML = "Créateur: " + data.assets[i].creator.username;

                            const cardSales = document.createElement('p')
                            cardSales.classList.add('card-sales')
                            cardSales.innerHTML = " Nombre de ventes: " + data.assets[i].sales ;

                            const cardCollection = document.createElement('p')
                            cardCollection.classList.add('card-collection')
                            cardCollection.innerHTML = "Collection: " + data.assets[i].collection.name;
                            
                
        
                            document.getElementById('elements' + j).append(card)
                                card.append(cardTop)
                                    if(data.assets[i].image_url != "") cardTop.append(cardImage)
                                    cardTop.append(cardButtons)
                                        cardButtons.append(buttonFav)
                                        cardButtons.append(buttonPanier)
                                card.append(cardInfos)
                                    cardInfos.append(buttonDetails)
                                    cardInfos.append(cardName)
                                    cardInfos.append(cardCreator)
                                    cardInfos.append(cardSales)
                                    cardInfos.append(cardCollection)

                }
            })
        } else {
            console.log('ERREUR');
            document.getElementById('erreur').innerHTML = "Erreur"
        }
    })
}