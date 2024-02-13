const imageData = [];
const numbers = [];
const itemsPerPage = 9;
let currentPage = 1;
let currentImages = new Array();

window.onload = function (event) {
    for (let i = 1; i <= 9; i++) {
        numbers.push(i);
    }

    for (let i = 0; i < 3; i++) {
        shuffleArray(numbers);
        numbers.forEach(element => {
            imageData.push("img/" + element + ".jpg")
        });
    }

    const carouselContainer = document.getElementById("carouselContainer");

    for (let i = 0; i < imageData.length; i++) {
        const imageUrl = imageData[i];
        const slide = `
            <div class="carousel-item ${i == 0 ? 'active' : ''}">
                <img src="${imageUrl}" class="d-block" id="slide-${i + 1}" alt="Slide ${i + 1}">
            </div>
        `;
        carouselContainer.innerHTML += slide;
    }

    displayImages();
    displayPagination();
};



function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayImages() {
    const galleryContainer = document.getElementById("gallery");
    galleryContainer.innerHTML = "";

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    for (let i = startIndex; i < endIndex && i < imageData.length; i++) {
        const imageUrl = imageData[i];
        const card = `
            <div class="col">
                <div class="card">
                    <img src="${imageUrl}" class="card-img-top galleryImg" alt="Image ${i + 1}" onclick='imageClick("${i}")'>
                </div>
            </div>
        `;
        galleryContainer.innerHTML += card;
    }
}

function displayPagination() {
    const totalPages = Math.ceil(imageData.length / itemsPerPage);
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement("li");
        li.className = `page-item ${i === currentPage ? "active" : ""}`;
        li.innerHTML = `<a class="page-link" onclick="changePage(${i})">${i}</a>`;
        paginationContainer.appendChild(li);
    }
}

function changePage(page) {
    currentPage = page;
    displayImages();
    displayPagination();
}

function imageClick(imageId) {
    var overlayPanel = document.getElementById("overlayPanel");
    overlayPanel.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    var carousel = $('#carouselExample');
    carousel.find('.carousel-item.active').removeClass('active');
    carousel.find('.carousel-item').eq(imageId).addClass('active');
}

function closePanel() {
    var overlayPanel = document.getElementById("overlayPanel");
    document.body.style.overflow = 'auto';
    overlayPanel.style.display = 'none';
}

document.getElementsByTagName("main")[0].classList.add("loaded");