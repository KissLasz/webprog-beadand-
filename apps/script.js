let selectedRow = null;

let sutik = [
    { nev: "Dobos torta", tipus: "Torta", dijazott: true },
    { nev: "Isler", tipus: "Aprósütemény", dijazott: false },
    { nev: "Képviselőfánk", tipus: "Krémes sütemény", dijazott: true }
];

window.onload = function () {
    renderTable();
};

function onFormSubmit() {
    if (validate()) {
        const formData = readFormData();

        if (selectedRow === null) {
            sutik.push(formData);
        } else {
            updateRecord(formData);
        }

        renderTable();
        resetForm();
    }
}

function readFormData() {
    return {
        nev: document.getElementById("nev").value.trim(),
        tipus: document.getElementById("tipus").value.trim(),
        dijazott: document.getElementById("dijazott").checked
    };
}

function renderTable() {
    const tableBody = document.querySelector("#sutiList tbody");
    tableBody.innerHTML = "";

    for (let i = 0; i < sutik.length; i++) {
        const row = tableBody.insertRow();

        if (sutik[i].dijazott) {
            row.classList.add("dijazott-sor");
        }

        row.insertCell(0).innerHTML = sutik[i].nev;
        row.insertCell(1).innerHTML = sutik[i].tipus;
        row.insertCell(2).innerHTML = sutik[i].dijazott ? "Igen" : "Nem";
        row.insertCell(3).innerHTML =
            `<a href="#" onclick="onEdit(${i})">Szerkesztés</a>
             |
             <a href="#" onclick="onDelete(${i})">Törlés</a>`;
    }
}

function onEdit(index) {
    document.getElementById("nev").value = sutik[index].nev;
    document.getElementById("tipus").value = sutik[index].tipus;
    document.getElementById("dijazott").checked = sutik[index].dijazott;

    selectedRow = index;
}

function updateRecord(formData) {
    sutik[selectedRow].nev = formData.nev;
    sutik[selectedRow].tipus = formData.tipus;
    sutik[selectedRow].dijazott = formData.dijazott;
}

function onDelete(index) {
    if (confirm("Biztosan törölni szeretnéd ezt a süteményt?")) {
        sutik.splice(index, 1);
        renderTable();
        resetForm();
    }
}

function resetForm() {
    document.getElementById("nev").value = "";
    document.getElementById("tipus").value = "";
    document.getElementById("dijazott").checked = false;
    selectedRow = null;
    document.getElementById("nevValidationError").classList.add("hide");
}

function validate() {
    const nev = document.getElementById("nev").value.trim();

    if (nev === "") {
        document.getElementById("nevValidationError").classList.remove("hide");
        return false;
    } else {
        document.getElementById("nevValidationError").classList.add("hide");
        return true;
    }
}