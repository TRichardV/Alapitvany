const imageData = [];
const numbers = [];

for (let i = 1; i <= 9; i++) {
    numbers.push(i);
}

for (let i = 0; i < 3; i++) {
    shuffleArray(numbers);
    numbers.forEach(element => {
        imageData.push("img/" + element + ".jpg")
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const itemsPerPage = 9;
let currentPage = 1;
let currentImages = new Array();

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
                    <img src="${imageUrl}" class="card-img-top galleryImg" alt="Image ${i + 1}" onclick="imageClick('${imageUrl}')">
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

function closeModal() {
    var modal = document.getElementById('modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function changePage(page) {
    currentPage = page;
    displayImages();
    displayPagination();
}

function imageClick(imageSource) {
    var modal = document.getElementById('modal');
    var modalContent = document.getElementById('modal-content');

    document.body.style.overflow = 'hidden';
    modal.style.display = 'block';
    modalContent.src = imageSource;
}

displayImages();
displayPagination();