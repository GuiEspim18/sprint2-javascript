const banners = [
    "./img/banner.png",
    "./img/banner2.jpg",
    "./img/banner3.jpg"
];

let controle = 0;
const banner = document.querySelector("#banner");


setInterval(() => {
    controle = (controle + 1) % banners.length;
    banner.classList.remove('fade-in');
    setTimeout(() => {
        banner.style.backgroundImage = `url('${banners[controle]}')`;
        banner.classList.add('fade-in');
    }, 1000);
}, 5000);