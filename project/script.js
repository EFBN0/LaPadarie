// Modal //

function iniciaModal(modalID) {
    const modal = document.getElementById(modalID);
    modal.classList.add('mostrar');
    modal.addEventListener('click', (e) => {
        if(e.target.id == 'btn-cancelar') {
            modal.classList.remove('mostrar');
        }
    })
    
}

const adicionar = document.getElementById('btn-adicionar');
adicionar.addEventListener('click', () => iniciaModal('modal-add'));

function limpaModal() {
    // quando enviar os dados ou fechar o modal, quero que os inputs voltem a estar vazios
    const inputnome = document.getElementById('nome')
    const inputpaes = document.getElementById('quantidade')
    inputnome.value = ""
    inputpaes.value = ""
}

// Cards //

let cards = [
    {
        nome:"Erick Ferreira",
        paes:50,
        id: 0,
    },
    {
        nome: "Gabi Soares",
        paes: 10,
        id: 1,
    },
    {
        nome: "Ana Sampaio",
        paes: 606,
        id: 2,
    },
    
]

function remover(id){
    cards.splice(id, 1)
    DOM.updateTotal()
    app.reload()
}

function addCard() {
    const nome = document.getElementById('nome').value
    const paes = document.getElementById('quantidade').value

    if ( nome != "" && paes != "" ) {
        cards.push(
            {
                nome,
                paes,
                id: cards.length,
            }
        )
        document.getElementById('modal-add').classList.remove('mostrar')
        app.reload()
        DOM.updateTotal()
    }
    else{
        alert('Campo não preenchido')
    }
}

const Total = {
    all: cards,

    add(card) {
        Total.all.push(card)
        app.reload()
    },

    remove(index) {
        Total.all.splice(index, 1)

        app.reload()
    },

    Totalpessoas() {
        let tpessoas = 0;
        Total.all.forEach((cards) => {
            tpessoas = tpessoas + 1
        })
        return tpessoas;
    },

    Totalpaes() {
        let tpaes = 0;
        Total.all.forEach((value) => {
            tpaes += Number(value.paes)
        })
        return tpaes
    },

    Totaldinheiro() {
        let tdinheiro = 0;
        Total.all.forEach((value) => {
            tdinheiro += Number(value.paes/2)
        })
        return util.formatCurrency(tdinheiro)
    }
}

const DOM = {
    cardContainer: document.querySelector('.cards-container #cards'),

    addCard(cards, index) {
        const article = document.createElement('article')
        article.innerHTML = DOM.innerHTMLcard(cards)

        DOM.cardContainer.appendChild(article)
    },

    innerHTMLcard(cards) {

        const valorpaes = util.formatCurrency(cards.paes/2)

        const html = `
        <article class="cards">
            <div class="card-individual">
                <h4>${cards.nome}</h4>
                <div class="valores-individual">
                    <p>Total paes: <span>${cards.paes}</span></p>
                    <p>Total pagar: <span>${valorpaes}</span></p>
                </div>
            </div>
            <button id="btn-remover" onclick="remover(${cards.id})"><img src="./images/lixeira-btn.svg" alt="remover" /></button>
        </article>    
        `

        return html
    },

    updateTotal() {
        document.getElementById('total-pessoas').innerHTML = Total.Totalpessoas()
        document.getElementById('total-paes').innerHTML = Total.Totalpaes()
        document.getElementById('total-entrada').innerHTML = Total.Totaldinheiro()
    },

    clearCards() {
        DOM.cardContainer.innerHTML = ""
    }
}

const util = {
    formatCurrency(value) {
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return value
    }
}

const app = {
    init() {
        Total.all.forEach(card => {
            card.id = Total.all.indexOf(card)
            console.log(card.nome + " " + card.id)
            DOM.addCard(card)
        })
        
        DOM.updateTotal()
    },

    reload() {
        DOM.clearCards()
        app.init()
    },
}

app.init()