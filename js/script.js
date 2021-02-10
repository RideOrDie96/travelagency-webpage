const navSlide = () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-div");
    const navLinks = document.querySelectorAll(".nav-links li")
    
    //Navbar Toggle
    burger.addEventListener("click", () => {
        if (nav.style.animation) {
            nav.style.animation = `navActiveOut 0.5s ease backwards 1.2s`;
            burger.style.pointerEvents = "none";
            setTimeout(() => {nav.style.animation = ''; burger.style.pointerEvents = "auto";}, 1900); 
        }
        else {
            nav.style.animation = `navActiveIn 0.5s ease forwards`;
        }
    //Links Animation
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = `navLinkFadeOut 0.5s ease backwards ${index / 7}s`;
                setTimeout(() => {link.style.animation = '';}, 1100); 
            }
            else {
                link.style.animation = `navLinkFadeIn 0.5s ease forwards ${index / 7 + 0.5}s`;
            }
        });
    //Burger to X
        burger.classList.toggle('toggle');
    });
}
navSlide();

//Slideshow

let slides = document.getElementsByClassName('slides');
let slideIndex = 0;

const showSlides = () => {  
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; 
    };
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1};
    slides[slideIndex-1].style.display = "block"; 
    setTimeout(showSlides, 14000); // Change image every 14 seconds
}

showSlides();

//For Arrows if needed
/*
const plusSlides = (n) => {
    let newslideIndex = slideIndex + n;
    if (newslideIndex > slides.length) {newslideIndex = 1;}
    if (newslideIndex < 1) {newslideIndex = slides.length;}
    currentSlide(newslideIndex);
}
*/

//Nav-bar animation
const header = document.querySelector("nav");
const sectionOne = document.getElementById("banner-container")

const sectionOneOptions = {
    rootMargin: "-80px 0px 0px 0px"
};

const sectionOneObserver = new IntersectionObserver(function(
    entries, 
    sectionOneObserver
    ) {
        entries.forEach(entry => {
            if(!entry.isIntersecting) {
                header.classList.add("nav-scrolled");
            }
            else {
                header.classList.remove("nav-scrolled");
            }
        });

},
sectionOneOptions);

sectionOneObserver.observe(sectionOne);

//Sliders&Faders
const faders = document.querySelectorAll(".fade-in");
const sliders = document.querySelectorAll(".slide-in");

const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -200px 0px"
};

const appearOnScroll = new IntersectionObserver(function(
    entries,
    appearOnScroll
    ) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } 
            else {
                entry.target.classList.add("appear");
                appearOnScroll.unobserve(entry.target);
            }
        });
    },
    appearOptions);
    
sliders.forEach(slider => {
    appearOnScroll.observe(slider);
});
  
faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

let cities = document.querySelectorAll(".cities");
let dealContainers = document.querySelectorAll(".deal-containers");

dealContainers.forEach((image, index) => {
    image.addEventListener("mouseover", () => {  
        cities[index].style.opacity = "1";
    });
});

dealContainers.forEach((image, index) => {
    image.addEventListener("mouseout", () => {  
        cities[index].style.opacity = "0";
    });
});

//Gallery

let galleryImages = document.querySelectorAll(".gal-img");
let getLatestOpenedImg;
let windowWidth = window.innerWidth;

if (galleryImages) {
    galleryImages.forEach((image, index) => {
        image.addEventListener("click", () => {
            let getFullImgUrl = image.src;
            let getImgUrlPos = getFullImgUrl.split("css/images/");
            let setNewImgUrl = getImgUrlPos[1].replace('")', '');
            
            getLatestOpenedImg = index + 1;

            let container = document.body;
            let newImgWindow = document.createElement("div");
            container.appendChild(newImgWindow);
            newImgWindow.setAttribute("class", "img-window");
            newImgWindow.setAttribute("onclick", "closeImg()");

            let newImg = document.createElement("img");
            newImgWindow.appendChild(newImg);
            newImg.setAttribute("src", "css/images/" + setNewImgUrl);
            newImg.setAttribute("id", "current-img");
            
            newImg.onload = function () {
                let imgWidth = this.width;
                let calcImgToEdge = ((windowWidth - imgWidth) / 50);
                
                let newNextBtn = document.createElement("a")
                let btnNextText = document.createTextNode(">")
                newNextBtn.appendChild(btnNextText);
                container.appendChild(newNextBtn);
                newNextBtn.setAttribute("class", "img-btn-next");
                newNextBtn.setAttribute("onclick", "changeImg(1)");
                newNextBtn.style.cssText = "right: " + calcImgToEdge + "vw;";

                let newPrevBtn = document.createElement("a")
                let btnPrevText = document.createTextNode("<")
                newPrevBtn.appendChild(btnPrevText);
                container.appendChild(newPrevBtn);
                newPrevBtn.setAttribute("class", "img-btn-prev");
                newPrevBtn.setAttribute("onclick", "changeImg(0)");
                newPrevBtn.style.cssText = "left: " + calcImgToEdge + "vw;";

            };
        })
    });
}

const closeImg = () => {
    document.querySelector(".img-window").remove();
    document.querySelector(".img-btn-next").remove();
    document.querySelector(".img-btn-prev").remove();
}

const changeImg = (changeDir) => {
    document.querySelector("#current-img").remove();

    let getImgWindow = document.querySelector(".img-window");
    let newImg = document.createElement("img");
    getImgWindow.appendChild(newImg);

    let calcNewImg;

    if(changeDir === 1) {
        calcNewImg = getLatestOpenedImg + 1;
            if (calcNewImg > galleryImages.length) {
                calcNewImg = 1;
            }
    }
    else if (changeDir === 0) {
        calcNewImg = getLatestOpenedImg - 1;
            if (calcNewImg < 1) {
                calcNewImg = galleryImages.length;
            }
    }

    newImg.setAttribute("src", "css/images/image" + calcNewImg + ".jpg");
    newImg.setAttribute("id", "current-img");

    getLatestOpenedImg = calcNewImg;

    newImg.onload = function () {
        let imgWidth = this.width;
        let calcImgToEdge = ((windowWidth - imgWidth) / 50);

        let nextBtn = document.querySelector(".img-btn-next");
        nextBtn.style.cssText = "right: " + calcImgToEdge + "vw;";

        let prevBtn = document.querySelector(".img-btn-prev");
        prevBtn.style.cssText = "left: " + calcImgToEdge + "vw;";
    }
}

//Preloader

const body = document.querySelector("body");
const preloader = document.querySelector(".preloader");
const prePreloader = document.querySelector(".pre-preloader");

body.onload = function () {
    setTimeout( () => {preloader.style.animation = "preloaderOut 1s forwards";}, 2500);
    setTimeout( () => {prePreloader.style.animation = "preloaderOut 1s forwards";}, 2600);
    setTimeout( () => {preloader.remove();}, 3400);
    setTimeout( () => {prePreloader.remove();}, 3400);
}