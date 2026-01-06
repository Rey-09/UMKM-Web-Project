/* ====== HAMBURGER ====== */
function toggleMenu() {
    document.querySelector(".nav-menu").classList.toggle("active");
    document.querySelector(".hamburger").classList.toggle("active");
}

function closeMenu() {
    document.querySelector(".nav-menu").classList.remove("active");
    document.querySelector(".hamburger").classList.remove("active");
}

/* ====== ORDER SYSTEM ====== */
let pesanan = {};
let total = 0;

function tambahPesanan(nama, harga) {
    if (pesanan[nama]) {
        pesanan[nama].qty++;
        pesanan[nama].subtotal += harga;
    } else {
        pesanan[nama] = {
            harga: harga,
            qty: 1,
            subtotal: harga
        };
    }
    renderPesanan();
}

function hapusPesanan(nama) {
    delete pesanan[nama];
    renderPesanan();
}

function renderPesanan() {
    const list = document.getElementById("listPesanan");
    list.innerHTML = "";
    total = 0;

    for (let item in pesanan) {
        total += pesanan[item].subtotal;

        const li = document.createElement("li");
        li.innerHTML = `
            <b>${item}</b><br>
            ${pesanan[item].qty} x Rp${pesanan[item].harga} = Rp${pesanan[item].subtotal}
            <br>
            <button onclick="hapusPesanan('${item}')">Hapus</button>
        `;
        li.style.marginBottom = "10px";
        list.appendChild(li);
    }

    document.getElementById("total").innerText = total;
}

function kirimWA() {
    const nama = document.getElementById("nama").value;
    const alamat = document.getElementById("alamat").value;

    if (Object.keys(pesanan).length === 0) {
        alert("Pesanan masih kosong!");
        return;
    }

    let pesan = `Halo, saya ${nama}%0A`;
    pesan += `Pesanan:%0A`;

    for (let item in pesanan) {
        pesan += `- ${item} (${pesanan[item].qty}x) = Rp${pesanan[item].subtotal}%0A`;
    }

    pesan += `%0ATotal: Rp${total}%0A`;
    pesan += `Alamat: ${alamat}`;

    window.open(`https://wa.me/6281245162041?text=${pesan}`, "_blank");
}
