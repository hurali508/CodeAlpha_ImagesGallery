// ===== 1. Elements pakdo =====
const items      = document.querySelectorAll(".item");
const filterBtns = document.querySelectorAll(".filter-btn");
const lightbox   = document.getElementById("lightbox");
const lbImg      = document.getElementById("lb-img");
const lbCaption  = document.getElementById("lb-caption");
const lbCounter  = document.getElementById("lb-counter");
const closeBtn   = document.getElementById("close");
const prevBtn    = document.getElementById("prev");
const nextBtn    = document.getElementById("next");

let visibleItems = Array.from(items);
let currentIndex = 0;

// ===== 2. Category filter =====
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    items.forEach((item) => {
      if (filter === "all" || item.dataset.category === filter) {
        item.classList.remove("hide");
      } else {
        item.classList.add("hide");
      }
    });

    visibleItems = Array.from(items).filter(
      (item) => !item.classList.contains("hide")
    );
  });
});

// ===== 3. Lightbox =====
function showImage(index) {
  const item = visibleItems[index];
  lbImg.src = item.querySelector("img").src;
  lbCaption.textContent = item.querySelector(".overlay span").textContent;
  lbCounter.textContent = (index + 1) + " / " + visibleItems.length;
}

function openLightbox(index) {
  currentIndex = index;
  showImage(currentIndex);
  lightbox.classList.add("show");
}

function closeLightbox() {
  lightbox.classList.remove("show");
}

items.forEach((item) => {
  item.addEventListener("click", () => {
    openLightbox(visibleItems.indexOf(item));
  });
});

// ===== 4. Next / Previous =====
function nextImage() {
  currentIndex = (currentIndex + 1) % visibleItems.length;
  showImage(currentIndex);
}

function prevImage() {
  currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
  showImage(currentIndex);
}

nextBtn.addEventListener("click", nextImage);
prevBtn.addEventListener("click", prevImage);
closeBtn.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

// ===== 5. Keyboard support =====
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("show")) return;

  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft")  prevImage();
  if (e.key === "Escape")     closeLightbox();
});