const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbya-sv6ScLUrQNAWbzNw-EpdkEUQE2LdjQqiIlrUz9IrDc91u6Be6C3XDr5S8jc9sBaYg/exec";

const app = document.getElementById("app");
const progress = document.getElementById("progress");

const dataForm = {
    tema:"",
    makanan:"",
    baju:"",
    jam:""
};

const noBtn = document.getElementById("noBtn");

function moveButton(){
    const maxX = window.innerWidth - noBtn.offsetWidth;
    const maxY = window.innerHeight - noBtn.offsetHeight;

    noBtn.style.position = "fixed";
    noBtn.style.left = Math.random() * maxX + "px";
    noBtn.style.top = Math.random() * maxY + "px";
}

noBtn.addEventListener("mouseover", moveButton);
noBtn.addEventListener("touchstart", moveButton);

document.getElementById("yesBtn").addEventListener("click", showTema);

function showTema(){

    progress.innerHTML = "1 / 4";

    app.innerHTML = `
        <h1>YEAYYYY 🥰🥰🥰<br>Tema mainnya mau apa ayang?</h1>

        <button class="primary option" onclick="pilihTema('Alam')">🌳 Alam</button>
        <button class="primary option" onclick="pilihTema('Jalan Jauh')">🚗 Jalan-jalan Jauh</button>
        <button class="primary option" onclick="pilihTema('Cafe')">☕ Cafe</button>
        <button class="primary option" onclick="pilihTema('Mall')">🛍️ Mall</button>
        <button class="primary option" onclick="pilihTema('Binatang')">🐱 Binatang</button>
        <button class="primary option" onclick="pilihTema('Nanti aja deh pas Ketemu')">Nanti aja deh pas Ketemu</button>
    `;
}

window.pilihTema = function(tema){

    dataForm.tema = tema;

    progress.innerHTML = "2 / 4";

    app.innerHTML = `
        <h1>Mau makan apaa ayang? 😋</h1>

        <button class="primary option" onclick="pilihMakanan('Ayam')">🍗 Ayam</button>
        <button class="primary option" onclick="pilihMakanan('Ikan')">🐟 Ikan</button>
        <button class="primary option" onclick="pilihMakanan('Seafood')">🦐 Seafood</button>
        <button class="primary option" onclick="pilihMakanan('Pasta')">🍝 Pasta</button>
        <button class="primary option" onclick="pilihMakanan('Burger')">🍔 Burger</button>
        <button class="primary option" onclick="pilihMakanan('Mie')">🍜 Mie</button>
        <button class="primary option" onclick="pilihMakanan('Nanti aja deh pas Ketemu')">Nanti aja deh pas Ketemu</button>
    `;
}

window.pilihMakanan = function(makanan){

    dataForm.makanan = makanan;

    progress.innerHTML = "3 / 4";

    app.innerHTML = `
        <h1>Pake baju apa ayang? 👗</h1>

        <input
            id="baju"
            placeholder="Contoh: Dress Hitam 🖤"
        >

        <br>

        <button
            class="primary"
            onclick="simpanBaju()"
        >
            Lanjut ➜
        </button>
    `;
}

window.simpanBaju = function(){

    dataForm.baju =
        document.getElementById("baju").value;

    progress.innerHTML = "4 / 4";

    app.innerHTML = `
        <h1>Kira-kira aku harus sampai tanggal dan jam berapa capaa? ⏰</h1>

        <input type="date" id="tanggal">
        <input type="time" id="jam">

        <br>

        <button
            class="primary"
            onclick="submitData()"
        >
            Kirim 🖤
        </button>
    `;
}

window.submitData = async function(){

    dataForm.tanggal =
        document.getElementById("tanggal").value;
    dataForm.jam =
        document.getElementById("jam").value;

    try{

        await fetch(APPS_SCRIPT_URL,{
            method:"POST",
            mode:"no-cors",
            body: JSON.stringify(dataForm)
        });

    }catch(err){
        console.error(err);
    }

    const tanggal = document.getElementById("tanggal").value;
    const date = new Date(tanggal);
    const hari = date.toLocaleDateString("id-ID", {weekday: "long"});
    const hariLower = hari.toLowerCase();
    const hariCapitalized = hariLower.charAt(0).toUpperCase() + hariLower.slice(1);

    progress.innerHTML = "";

    app.innerHTML = `
        <div class="success">
            YEAYYYY 🥰🥰🥰<br><br>
            Makaciiiiii capaa 🖤<br><br>
            Sampai ketemuuu ${hariCapitalized} 🥰
        </div>
    `;
}

const loveContainer =
    document.getElementById("loveContainer");

function createLove(){

    const love =
        document.createElement("img");

    love.src = "love.png";
    love.classList.add("floating-love");

    const size =
        Math.random() * 25 + 20;

    love.style.width = size + "px";

    love.style.left =
        Math.random() * window.innerWidth + "px";

    const duration =
        Math.random() * 4 + 5;

    love.style.animationDuration =
        duration + "s";

    loveContainer.appendChild(love);

    setTimeout(() => {
        love.remove();
    }, duration * 1000);
}

setInterval(() => {

    const amount =
        Math.floor(Math.random() * 3) + 1;

    for(let i = 0; i < amount; i++){
        createLove();
    }

}, 700);
