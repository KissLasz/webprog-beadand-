const API_READ = "../api/suti_read.php";
const API_CREATE = "../api/suti_create.php";
const API_UPDATE = "../api/suti_update.php";
const API_DELETE = "../api/suti_delete.php";

window.onload = function () {
    loadSutik();
};

async function loadSutik() {
    try {
        const response = await fetch(API_READ);
        const sutik = await response.json();
        renderTable(sutik);
    } catch (error) {
        console.error("Hiba a sütemények betöltésekor:", error);
    }
}

function renderTable(sutik) {
    const tableBody = document.querySelector("#sutiList tbody");
    tableBody.innerHTML = "";

    sutik.forEach((suti) => {
        const row = tableBody.insertRow();

        if (Number(suti.dijazott) === 1) {
            row.classList.add("dijazott-sor");
        }

        row.insertCell(0).innerText = suti.id;
        row.insertCell(1).innerText = suti.nev;
        row.insertCell(2).innerText = suti.tipus ?? "";
        row.insertCell(3).innerText = Number(suti.dijazott) === 1 ? "Igen" : "Nem";
        row.insertCell(4).innerHTML = `
            <button class="btn btn-sm btn-primary me-2" onclick='onEdit(${JSON.stringify(suti)})'>Módosítás</button>
            <button class="btn btn-sm btn-danger" onclick="onDelete(${suti.id})">Törlés</button>
        `;
    });
}

async function onFormSubmit() {
    if (!validate()) return;

    const id = document.getElementById("sutiId").value;
    const formData = {
        nev: document.getElementById("nev").value.trim(),
        tipus: document.getElementById("tipus").value.trim(),
        dijazott: document.getElementById("dijazott").checked ? 1 : 0
    };

    try {
        if (id === "") {
            await fetch(API_CREATE, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
        } else {
            await fetch(API_UPDATE, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, ...formData })
            });
        }

        resetForm();
        loadSutik();
    } catch (error) {
        console.error("Hiba mentés közben:", error);
    }
}

function onEdit(suti) {
    document.getElementById("sutiId").value = suti.id;
    document.getElementById("nev").value = suti.nev;
    document.getElementById("tipus").value = suti.tipus ?? "";
    document.getElementById("dijazott").checked = Number(suti.dijazott) === 1;
    document.getElementById("submitButton").value = "Módosítás";
}

async function onDelete(id) {
    if (!confirm("Biztosan törölni szeretnéd ezt a süteményt?")) return;

    try {
        await fetch(API_DELETE, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        });

        loadSutik();
    } catch (error) {
        console.error("Hiba törlés közben:", error);
    }
}

function resetForm() {
    document.getElementById("sutiId").value = "";
    document.getElementById("nev").value = "";
    document.getElementById("tipus").value = "";
    document.getElementById("dijazott").checked = false;
    document.getElementById("submitButton").value = "Hozzáadás";
    document.getElementById("nevValidationError").classList.add("hide");
}

function validate() {
    const nev = document.getElementById("nev").value.trim();

    if (nev === "") {
        document.getElementById("nevValidationError").classList.remove("hide");
        return false;
    }

    document.getElementById("nevValidationError").classList.add("hide");
    return true;
}