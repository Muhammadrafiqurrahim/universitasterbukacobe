const form = document.getElementById("formPendaftaran");

// =========================
// PREVIEW GAMBAR
// =========================
function previewImage(inputId, previewId){
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);

    input.addEventListener("change", function(e){
        const file = e.target.files[0];

        if(file){
            if(file.type.startsWith("image")){
                preview.src = URL.createObjectURL(file);
                preview.style.display = "block";
            } else {
                preview.style.display = "none";
            }
        }
    });
}

// aktifkan preview
previewImage("foto_diri", "preview_foto");
previewImage("ktp", "preview_ktp");
previewImage("ijazah", "preview_ijazah");


// =========================
// CONVERT FILE KE BASE64
// =========================
function toBase64(file) {
    return new Promise((resolve) => {
        if (!file) return resolve("");

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            resolve(reader.result.split(",")[1]);
        };
    });
}


// =========================
// VALIDASI
// =========================
function validateForm() {
    const nama = document.querySelector('[name="nama"]').value;
    const nik = document.querySelector('[name="nik"]').value;
    const email = document.querySelector('[name="email"]').value;

    if(!nama || !nik || !email){
        alert("⚠️ Nama, NIK, dan Email wajib diisi!");
        return false;
    }

    return true;
}


// =========================
// SUBMIT FORM
// =========================
form.addEventListener("submit", async function(e){
    e.preventDefault();

    if(!validateForm()) return;

    // ambil file
    const foto = document.getElementById("foto_diri").files[0];
    const ktp = document.getElementById("ktp").files[0];
    const ijazah = document.getElementById("ijazah").files[0];

    // loading effect
    const btn = document.querySelector(".submit");
    btn.innerText = "Mengirim...";
    btn.disabled = true;

    try {

        const data = {
            nama: document.querySelector('[name="nama"]').value,
            nik: document.querySelector('[name="nik"]').value,
            tempat: document.querySelector('[name="tempat"]').value,
            tanggal: document.querySelector('[name="tanggal"]').value,
            email: document.querySelector('[name="email"]').value,
            status: document.querySelector('[name="status"]').value,
            ibu: document.querySelector('[name="ibu"]').value,
            jalur: document.querySelector('[name="jalur"]:checked')?.value || "",
            jurusan: document.querySelector('[name="jurusan"]').value,
            foto: await toBase64(foto),
            ktp: await toBase64(ktp),
            ijazah: await toBase64(ijazah)
        };

        await fetch("https://script.google.com/macros/s/AKfycbwcAHihd88nN1x58Qymv0Hozgytr8h6_zGYHGzHhChuLiDv60AJ0quGqM08aSgTJMUtzg/exec", {
            method: "POST",
            body: new URLSearchParams(data)
        });

        alert("🎉 Pendaftaran berhasil dikirim!");

        form.reset();

        // reset preview
        document.querySelectorAll(".preview").forEach(img => {
            img.style.display = "none";
        });

    } catch (err) {
        alert("❌ Gagal mengirim data!");
        console.error(err);
    }

    btn.innerText = "Daftar";
    btn.disabled = false;
});