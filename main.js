const swiper = new Swiper(".mySwiper", {
    loop: true, // biar muter terus

    autoplay: {
        delay: 2500, // ganti slide tiap 2.5 detik
        disableOnInteraction: false,
    },

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    effect: "slide", // bisa diganti fade

    
});