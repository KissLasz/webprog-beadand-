class Suti {
    constructor(nev, tipus, dijazott) {
        this.nev = nev;
        this.tipus = tipus;
        this.dijazott = dijazott;
    }

    letrehozKartya() {
        const kartya = document.createElement("div");
        kartya.className = "card p-3 shadow-sm mb-3";

        const cim = document.createElement("h5");
        cim.textContent = this.nev;

        const tipus = document.createElement("p");
        tipus.textContent = `Típus: ${this.tipus}`;

        const allapot = document.createElement("p");
        allapot.textContent = this.dijazott ? "Díjazott sütemény" : "Nem díjazott";

        kartya.appendChild(cim);
        kartya.appendChild(tipus);
        kartya.appendChild(allapot);

        return kartya;
    }
}

class DijazottSuti extends Suti {
    constructor(nev, tipus) {
        super(nev, tipus, true);
    }

    letrehozKartya() {
        const kartya = super.letrehozKartya();
        kartya.classList.add("border-success");

        const badge = document.createElement("span");
        badge.className = "badge text-bg-success mb-2";
        badge.textContent = "Különdíjas";

        kartya.insertBefore(badge, kartya.firstChild);

        return kartya;
    }
}

const sutik = [
    new Suti("Isler", "Aprósütemény", false),
    new Suti("Krémes", "Krémes sütemény", false),
    new DijazottSuti("Dobos torta", "Torta")
];

function megjelenitSutik() {
    const tarolo = document.getElementById("sutiTarolo");
    tarolo.innerHTML = "";

    sutik.forEach(suti => {
        tarolo.appendChild(suti.letrehozKartya());
    });
}

function ujSutiHozzaadas() {
    const uj = new DijazottSuti("Zserbó", "Hagyományos sütemény");
    sutik.push(uj);
    megjelenitSutik();
}

window.onload = function () {
    megjelenitSutik();

    const gomb = document.getElementById("ujSutiGomb");
    gomb.addEventListener("click", ujSutiHozzaadas);
};