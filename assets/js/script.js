window.onscroll = function() {
    let pos = document.documentElement.scrollTop;
    let calc_height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scroll = (pos * 100 / calc_height);
    if (scroll != 0) { scroll++ };
    document.getElementById("progress_bar").style.width = scroll + "%";
}

class TypeWriter {
    constructor(txtElement, words, wait) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = "";
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }
    type() {
        const current = this.wordIndex % this.words.length; // Indice attuale della parola
        const fullTxt = this.words[current]; // Ottengo tutto il testo della parola corrente
        // controllo se da cancellare
        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1); // Rimuovi carattere
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1); // Aggiungi carattere
        }
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`; // Inserisco il testo nell'elemento
        let typeSpeed = 300; // VelocitÃ  iniziale di scrittura
        if (this.isDeleting) {
            typeSpeed /= 2;
        }
        // Se la parola Ã¨ completa
        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait; // pausa alla fine
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++; // Parola successiva
            typeSpeed = 500; // Pausa prima di iniziare a scrivere
        }
        setTimeout(() => this.type(), typeSpeed);
    }
}
document.addEventListener('DOMContentLoaded', init);
// Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = 3000;
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
}

function esercizi() {
    const accordionHeader = document.querySelectorAll(".es_button");
    accordionHeader.forEach(accordionHeader => {
        accordionHeader.addEventListener("click", event => {
            accordionHeader.classList.toggle("es_active");
        });
    });
}
esercizi();

function scrollTxt() {
    let atScroll = false;
    let parallaxTitle = document.querySelectorAll(".parallax_txt");

    const scrollProgress = () => {
        atScroll = true;
    };

    const raf = () => {
        if (atScroll) {
            parallaxTitle.forEach((element, index) => {
                element.style.transform = "translateY(" + (-window.scrollY) + "%)";
            });
            atScroll = false;
        }
        requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
    window.addEventListener("scroll", scrollProgress);
}
scrollTxt();