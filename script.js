// ================================
// GSAP AVAILABILITY CHECK
// ================================
// GSAP is loaded from an external CDN. If it fails to load (blocked
// network, offline, ad-blocker), the rest of this file must still run
// so the menu, cookie banner, configurator and contact form keep working.

const hasGSAP = typeof gsap !== "undefined";

// ================================
// LOADER
// ================================

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (hasGSAP) {

        gsap.to(".loader-progress", {
            width: "100%",
            duration: 1.2,
            ease: "power2.out"
        });

        gsap.to("#loader", {
            opacity: 0,
            duration: 0.8,
            delay: 1.2,
            pointerEvents: "none",
            onComplete: () => {
                if (loader) loader.style.display = "none";
            }
        });

    } else if (loader) {

        loader.style.display = "none";

    }

});

// Failsafe: never let the loader block the page for more than 4 seconds,
// even if the load event or GSAP misbehaves.
setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "none";
}, 4000);

// ================================
// HERO INTRO
// ================================

if (hasGSAP) {

    gsap.from(".hero-hotspots .hotspot",{
        opacity:0,
        scale:.5,
        stagger:.2,
        delay:2.2
    });

}

// ================================
// MOBILE NAV
// ================================

const navToggle=document.getElementById("navToggle");
const navMobile=document.getElementById("navMobile");

if(navToggle && navMobile){

navToggle.addEventListener("click",()=>{

const isOpen=navMobile.classList.toggle("open");

navToggle.classList.toggle("open");

navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");

});

navMobile.querySelectorAll("a").forEach(link=>{

link.addEventListener("click",()=>{

navMobile.classList.remove("open");

navToggle.classList.remove("open");

navToggle.setAttribute("aria-expanded","false");

});

});

}

// ================================
// HOTSPOTS
// ================================

document.querySelectorAll(".hotspot").forEach(hotspot=>{

hotspot.addEventListener("click",()=>{

const target=document.getElementById(hotspot.dataset.target);

if(!target) return;

target.scrollIntoView({

behavior:"smooth"

});

});

});

// ================================
// BACK TO TOP
// ================================

const back=document.getElementById("backToTop");

window.addEventListener("scroll",()=>{

if(window.scrollY>600){

back.style.opacity="1";
back.style.pointerEvents="auto";

}else{

back.style.opacity="0";
back.style.pointerEvents="none";

}

});

back.addEventListener("click",()=>{

window.scrollTo({

top:0,
behavior:"smooth"

});

});

// ================================
// HOTSPOT GLOW
// ================================

if (hasGSAP) {

    document.querySelectorAll(".hotspot").forEach(item=>{

    item.addEventListener("mouseenter",()=>{

    gsap.to(item,{
    scale:1.15,
    duration:.25
    });

    });

    item.addEventListener("mouseleave",()=>{

    gsap.to(item,{
    scale:1,
    duration:.25
    });

    });

    });

}
// ================================
// CONFIGURATOR
// ================================

const vehicles = document.querySelectorAll(".vehicle");
const packages = document.querySelectorAll(".package");
const extras = document.querySelectorAll(".extras-grid input");

const vehicleOutput = document.getElementById("vehicleOutput");
const packageOutput = document.getElementById("packageOutput");
const extrasOutput = document.getElementById("extrasOutput");
const priceOutput = document.getElementById("priceOutput");

let vehiclePrice = 0;
let packagePrice = 49;

function updatePrice() {

let extrasPrice = 0;
let extrasText = [];

extras.forEach(extra => {

if(extra.checked){

extrasPrice += Number(extra.value);

extrasText.push(
extra.parentElement.textContent.trim()
);

}

});

if(extrasText.length===0){

extrasOutput.textContent="Keine";

}else{

extrasOutput.textContent=extrasText.join(", ");

}

const total =
vehiclePrice+
packagePrice+
extrasPrice;

priceOutput.textContent=total+" €";

}

vehicles.forEach(vehicle=>{

vehicle.addEventListener("click",()=>{

vehicles.forEach(v=>v.classList.remove("active"));

vehicle.classList.add("active");

vehiclePrice=Number(vehicle.dataset.price);

vehicleOutput.textContent=vehicle.dataset.label || vehicle.textContent.trim();

updatePrice();

});

});

packages.forEach(pack=>{

pack.addEventListener("click",()=>{

packages.forEach(p=>p.classList.remove("active"));

pack.classList.add("active");

packagePrice=Number(pack.dataset.price);

packageOutput.textContent=pack.textContent.trim();

updatePrice();

});

});

extras.forEach(extra=>{

extra.addEventListener("change",updatePrice);

});

updatePrice();

// ================================
// COOKIE BANNER
// ================================

const cookieBanner=document.getElementById("cookieBanner");

if(localStorage.getItem("cookiesAccepted")){

cookieBanner.style.display="none";

}

document.getElementById("acceptCookies").onclick=()=>{

localStorage.setItem("cookiesAccepted","true");

cookieBanner.style.display="none";

};

document.getElementById("declineCookies").onclick=()=>{

cookieBanner.style.display="none";

};

// ================================
// SMOOTH SCROLL TO CONTACT
// ================================

document.querySelectorAll('a[href="#kontakt"]').forEach(button=>{

button.addEventListener("click",(e)=>{

const target = document.getElementById("kontakt");

if (!target) return;

e.preventDefault();

target.scrollIntoView({

behavior:"smooth"

});

});

});

// ================================
// CONTACT FORM
// ================================

const contactForm=document.getElementById("contactForm");

contactForm.addEventListener("submit", async (e) => {

e.preventDefault();

const submitBtn = contactForm.querySelector('button[type="submit"]');
const originalLabel = submitBtn.textContent;

submitBtn.disabled = true;
submitBtn.textContent = "Wird gesendet...";

try {

const formData = new FormData(contactForm);
formData.append("_subject", "Neue Anfrage über die Website");
formData.append("_template", "table");
formData.append("_captcha", "false");

const response = await fetch("https://formsubmit.co/ajax/autoreinigung.yilmaz@gmx.de", {
    method: "POST",
    headers: { "Accept": "application/json" },
    body: formData
});

if (!response.ok) throw new Error("Senden fehlgeschlagen");

alert("Vielen Dank! Deine Anfrage wurde erfolgreich gesendet. Wir melden uns schnellstmöglich.");

contactForm.reset();

} catch (err) {

alert("Da ist leider etwas schiefgelaufen. Bitte versuch es erneut oder schreib uns direkt per WhatsApp.");

} finally {

submitBtn.disabled = false;
submitBtn.textContent = originalLabel;

}

});

// ================================
// SCROLL ANIMATIONS
// ================================

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

if (hasGSAP) {

gsap.fromTo(

entry.target,

{
opacity:0,
y:80
},

{
opacity:1,
y:0,
duration:1,
ease:"power3.out"
}

);

}

observer.unobserve(entry.target);

}

});

},{
threshold:.15
});

document.querySelectorAll(

".experience-card,.price-card,.review-card,.stat,.summary-card,.contact-card"

).forEach(item=>{

observer.observe(item);

});

// ================================
// PARALLAX HERO
// ================================

window.addEventListener("scroll",()=>{

const y=window.scrollY;

const video=document.getElementById("heroVideo");

video.style.transform=`scale(1.08) translateY(${y*0.18}px)`;

});

// ================================
// NAVBAR BACKGROUND
// ================================

window.addEventListener("scroll",()=>{

const nav=document.querySelector("nav");

if(window.scrollY>80){

nav.style.background="rgba(5,5,5,.82)";
nav.style.backdropFilter="blur(18px)";

}else{

nav.style.background="rgba(0,0,0,.15)";
nav.style.backdropFilter="blur(20px)";

}

});

// ================================
// END
// ================================

console.log("Autoreinigung Yilmaz erfolgreich geladen.");

if (hasGSAP) {

const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });

heroTl
.from(".hero-top", {
    y: 40,
    opacity: 0,
    duration: .8
}, .3)
.from(".hero-content h1 .word", {
    y: 90,
    opacity: 0,
    rotate: 4,
    duration: 1,
    stagger: .12
}, .5)
.from(".hero-text", {
    y: 40,
    opacity: 0,
    duration: .8
}, "-=.4")
.from(".hero-buttons", {
    y: 40,
    opacity: 0,
    duration: .8
}, "-=.5")
.from(".hero-badge", {
    y: 20,
    opacity: 0,
    duration: .7
}, "-=.4")
.from(".scroll-indicator", {
    opacity: 0,
    duration: 1
}, "-=.3")
.from(".hero-marquee", {
    y: 30,
    opacity: 0,
    duration: 1
}, "-=.8");

}

// ================================
// HERO MOUSE PARALLAX
// ================================

const heroSection = document.querySelector(".hero");
const glowLeft = document.querySelector(".hero-glow-left");
const glowRight = document.querySelector(".hero-glow-right");

if (heroSection && glowLeft && glowRight) {

    heroSection.addEventListener("mousemove", (e) => {

        const { innerWidth, innerHeight } = window;

        const relX = (e.clientX / innerWidth - 0.5) * 2;
        const relY = (e.clientY / innerHeight - 0.5) * 2;

        glowLeft.style.transform = `translate(${relX * -30}px, ${relY * -30}px)`;
        glowRight.style.transform = `translate(${relX * 30}px, ${relY * 30}px)`;

    });

    heroSection.addEventListener("mouseleave", () => {

        glowLeft.style.transform = "translate(0,0)";
        glowRight.style.transform = "translate(0,0)";

    });

}