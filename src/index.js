
// assign various variables to their appropriate elementid
const championForm = document.querySelector('form')
const search = document.querySelector('input')
const champBlurb = document.querySelector('#champBlurb')
const champImage = document.getElementById("champImage")
const champTitle = document.getElementById("champTitle")
const champHP = document.getElementById("HP")
const champMP = document.getElementById("MP")
const champAttack = document.getElementById("Attack")
const champDefense = document.getElementById("Defense")
const champMagic = document.getElementById("Magic")




function fillDropdown() {
    const datalist = document.getElementById("champList") // assign the datalist variable to the elementid ChampList

    // fetch list of champions from API and retrieve the character names
    fetch('http://ddragon.leagueoflegends.com/cdn/13.5.1/data/en_US/champion.json')
        .then(res => res.json())
        .then(data => {
            try {
                let champs = data.data
                let champList1 = []
                // create and append each character name to the datalist variable and consequently the champlist element

                for (let char in champs) {
                    champList1.push(char) // add champ names to a varaible to verify user input against

                    var option = document.createElement('option')
                    option.value = (champs[char].id)
                    datalist.appendChild(option)
                }
                console.log(champList1)
                userValue(champList1)

            } catch (error) {
                console.log(error)
            }

        }
        )
}




function userValue(champList1) {
    console.log(champList1)
    //an event listerner for when the user submits their search
    championForm.addEventListener('submit', (e) => {
        //prevent the webpage from reloading
        e.preventDefault()
        //store the users search value
        const champion = search.value
        //search array of valid champions to check if user entry is valid -- using some method check whether an element in the arrary mataches user input
        if (champList1.some(i => champion.includes(i))) {
            displayINFO(champion)
            displayImage(champion)

        } else { //load invalid input response
            champTitle.textContent = 'Lost Poros'
            champBlurb.textContent = 'Please input a valid champion'
            champImage.src = "https://nexus.leagueoflegends.com/wp-content/uploads/2018/11/poros_banner-1_slno1owbdsxulmdvqomp.jpg"
            champHP.textContent = ''
            champMP.textContent = ''
            champAttack.textContent = ''
            champDefense.textContent = ''
            champMagic.textContent = ''


        }
    })
}


function displayINFO(champion) {
    //call the api and use the user's search value for their specific request
    fetch('http://ddragon.leagueoflegends.com/cdn/13.5.1/data/en_US/champion/' + champion + '.json')
        .then(res => res.json())
        .then(data => {
            try {
                //retrieve the appropriate data from the api and load it on the HTML page
                let champs = data.data
                blurb = (champs[champion].lore)
                title = (champs[champion].id)
                hp = (champs[champion].stats.hp)
                mp = (champs[champion].stats.mp)
                Attack = (champs[champion].info.attack)
                Defense = (champs[champion].info.defense)
                Magic = (champs[champion].info.magic)

                champBlurb.textContent = blurb
                champTitle.textContent = title

                champHP.textContent = "Hitpoints: " + hp
                champMP.textContent = "Mana: " + mp
                champAttack.textContent = "Attack: " + Attack
                champDefense.textContent = "Defense: " + Defense
                champMagic.textContent = "Magic: " + Magic
            } catch (error) {
                console.log(error)
            }

        })
}



function displayImage(champion) {
    //display the champion image
    champImage.src = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + champion + "_0.jpg"
}




function main() {
    fillDropdown()
    userValue()
    champArray()
}

main()

