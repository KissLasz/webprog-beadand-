let adatokTomb = [];

function inicializal() {
    const sorok = nyersAdat.trim().split('\n');
    const fejlec = sorok.shift().split('\t');

    document.getElementById('fejlec').innerHTML =
        fejlec.map(cim => `<th>${cim}</th>`).join('') + "<th>Műveletek</th>";

    adatokTomb = sorok.map(sor => {
        const [id, nev, tipus, dij] = sor.split('\t');
        return { id: parseInt(id), nev, tipus, dijazott: parseInt(dij) };
    });

    kiiratas();
}

function kiiratas() {
    const tbody = document.getElementById('tablazat-test');

    tbody.innerHTML = adatokTomb.map((szemely, index) => `
        <tr class="${szemely.dijazott === -1 ? 'dijazott-sor' : ''}">
            <td>${szemely.id}</td>
            <td>${szemely.nev}</td>
            <td>${szemely.tipus}</td>
            <td>${szemely.dijazott === -1 ? 'Igen' : 'Nem'}</td>
            <td>
                <button onclick="torol(${index})">Törlés</button>
                <button onclick="szerkeszt(${index})">Módosítás</button>
            </td>
        </tr>
    `).join('');
}

function hozzaad() {
    const nev = document.getElementById('nev').value;
    const tipus = document.getElementById('tipus').value;
    const dij = parseInt(document.getElementById('dij-statusz').value);
    const ujId = adatokTomb.length > 0 ? adatokTomb[adatokTomb.length - 1].id + 1 : 1;

    if (nev && tipus) {
        adatokTomb.push({ id: ujId, nev, tipus, dijazott: dij });
        kiiratas();
    }
}

function torol(index) {
    adatokTomb.splice(index, 1);
    kiiratas();
}

function szerkeszt(index) {
    const s = adatokTomb[index];

    const ujNev = prompt("Adja meg az új nevet:", s.nev);
    if (ujNev === null) return;

    const ujTipus = prompt("Adja meg az új típust:", s.tipus);
    if (ujTipus === null) return;

    const ujDij = confirm("Díjazott legyen? (OK = Igen, Mégse = Nem)");

    adatokTomb[index].nev = ujNev;
    adatokTomb[index].tipus = ujTipus;
    adatokTomb[index].dijazott = ujDij ? -1 : 0;

    kiiratas();
}

inicializal();

