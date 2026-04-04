let adatokTomb = [];

async function adatBetoltes() {
    const valasz = await fetch('tartalom.json');
    adatokTomb = await valasz.json();
    
    fejlecGeneralas();
    kiiratas();
}

function fejlecGeneralas() {
    const fejlec = ["ID", "Süti ID", "Mentes", "Műveletek"];
    document.getElementById('fejlec').innerHTML =
        fejlec.map(cim => `<th>${cim}</th>`).join('');
}

function kiiratas() {
    const tbody = document.getElementById('tablazat-test');
    
    tbody.innerHTML = adatokTomb.map((elem, index) => `
        <tr>
            <td>${elem.id}</td>
            <td>${elem.sutiid}</td>
            <td>${elem.mentes}</td>
            <td>
                <button onclick="torol(${index})">Törlés</button>
                <button onclick="szerkeszt(${index})">Módosítás</button>
            </td>
        </tr>
    `).join('');
}

function hozzaad() {
    const sutiidInput = document.getElementById('nev').value;
    const mentesInput = document.getElementById('tipus').value;

    if (sutiidInput && mentesInput) {

        const ujId = adatokTomb.length > 0 
            ? Math.max(...adatokTomb.map(a => a.id)) + 1 
            : 1;

        const ujElem = { 
            id: ujId, 
            sutiid: parseInt(sutiidInput), 
            mentes: mentesInput 
        };

        adatokTomb.push(ujElem);

        kiiratas();

        document.getElementById('nev').value = "";
        document.getElementById('tipus').value = "";
    }
}


function torol(index) {
    adatokTomb.splice(index, 1);
    kiiratas();
}

function szerkeszt(index) {
    const suti = adatokTomb[index];

    const ujSutiId = prompt("Adja meg az új Süti ID-t:", suti.sutiid);
    if (ujSutiId === null) return;

    const ujMentes = prompt("Adja meg az új mentes kódot (G, L, HC, stb.):", suti.mentes);
    if (ujMentes === null) return;

    adatokTomb[index].sutiid = parseInt(ujSutiId);
    adatokTomb[index].mentes = ujMentes;

    kiiratas();
}



adatBetoltes();
