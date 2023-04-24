if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./sw.js')
	.then(reg => console.log('service worker registered', reg))
	.catch(err => console.error('service worker not registered', err)) 
}


const MiddleSection = document.querySelector('#MiddleSection');
const LeftSection = document.querySelector('#LeftSection');
const RightSection = document.querySelector('#RightSection');
let PlayerSuitcase = 0;
let PlayerSuitcaseAmount = 0;

let count = 0

let money = [
    1,
  5,
  10,
  25,
  50,
  75,
  100,
  200,
  300,
  400,
  500,
  750,
  1000,
  5000,
  10000,
  25000,
  50000,
  75000,
  100000,
  200000,
  300000,
  400000,
  500000,
  750000,
  1000000
]
let click = money.length;
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
function initGame() {
    for (let index = 1; index < money.length; index++) {
    MiddleSection.innerHTML += `
    <article id="suitcase${index}" onclick="Choose(this)">
    <p>${index}</p>
    </article>
    `
    LeftSection.innerHTML += `<h6>${index}</h6>`
    
}

console.log(LeftSection);
for (let index = 0; index < money.length; index++) {
    const element = money[index];
    RightSection.innerHTML += `<h2>${element}</h2>`
}
shuffle(money)
setTimeout(() => {
  document.querySelectorAll('h1')[0].innerText = "Vælg din kuffert"
}, 300);

}

function bank() {
    let howManygray = 0
    let calc = 0
                        
                        for (let index = 0; index < document.querySelectorAll('h2').length; index++) {
                            const element = document.querySelectorAll('h2')[index];
                            if (element.style.backgroundColor !== "gray") {
                               
                               calc = parseInt(element.innerText) + calc
                                                        howManygray++
                                                        
                                
                            }
                            
                        }
                        
                        howManygray = howManygray/2
                        console.log("bank = " + calc/howManygray);
                        btn.click()
                        modalContent.innerHTML = ""
                        modalContent.innerHTML = `
                        <h3>Banken vil købe din kuffert for:</h3>
                        <h4>${parseInt(calc/howManygray)} Kr</h4>
                        <button type="button" onclick="dontSell()">Sælg ikke</button>
                        <button type="button" onclick="Sell()">Sælg</button>
                        `
                        calc = 0
                        
                        
                    }

                    function dontSell() {
                        modal.style.display = "none";
                    }
                    function Sell() {
                        let amount = document.querySelectorAll('h4')[0].innerText
                        modal.style.display = "none";
                        setTimeout(() => {
                            btn.click()
                            modalContent.innerHTML = ""
                            modalContent.innerHTML = `
                            <h3>Du vandt</h3>
                            <h4>${amount}</h4>
                            <p>Din egen kuffert indeholdte ${money[PlayerSuitcase]} Kr</p>
        <button onclick="location.reload()">Nyt spil?</button>
                            `
                        }, 100);

                    }

function Choose(obj) {
    
if (!obj.children[0].innerText.includes("Kr") && obj.children[0].innerText != PlayerSuitcase) {
    click--
}
    console.log(click);
    if (PlayerSuitcase === 0) {
        PlayerSuitcase = parseInt(obj.id.substring(8))
        document.querySelectorAll('h6')[PlayerSuitcase - 1].style.backgroundColor = "green"
        document.querySelectorAll('h1')[0].innerText = ""

    }else{
        console.log(money[PlayerSuitcase]);
        if (parseInt(obj.id.substring(8)) !== PlayerSuitcase) {
            if (!obj.children[0].innerText.includes("Kr")) {
                obj.children[0].innerText = `${money[parseInt(obj.id.substring(8))]} Kr`
            for (let index = 0; index < document.querySelectorAll('h2').length; index++) {
                const element = document.querySelectorAll('h2')[index];
                if (element.innerText == money[parseInt(obj.id.substring(8))]) {
                    element.style.backgroundColor = "gray"
                    document.querySelectorAll('h6')[parseInt(obj.id.substring(8)) - 1].style.backgroundColor = "gray"
                    
                    if (count < 4) {
                     count++   
                    }else{
                        setTimeout(() => {
                            bank()
                        count = 0
                        }, 300);
                        
                    console.log(click);
                    
                    
                }
                if (click === 3 ) {
                    console.log("Wanna sell?");
                    bank()
                }
                if (click === 2 ) {
                    console.log("you sure you dont wanna sell?");
                    bank()
                }
                if (click === 1 ) {
                    btn.click()
                    modalContent.innerHTML = ""
                    modalContent.innerHTML = `
                    <h3>Din egen kuffert indeholdte</h3>
                    <h4>${money[PlayerSuitcase]} Kr</h4>
<button onclick="location.reload()">Nyt spil?</button>
                    `
                }
        
            }
            }
        }
    }
    }
}

initGame()