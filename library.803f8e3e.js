function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},a={},r=t.parcelRequired7c6;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in a){var t=a[e];delete a[e];var r={id:e,exports:{}};return n[e]=r,t.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){a[e]=t},t.parcelRequired7c6=r),r("krGWQ");var i=r("eWCmQ"),d=r("5o68A");const o=document.querySelector(".watchedJS"),c=document.querySelector(".queueJS"),s=document.querySelector(".main-section__allcards");function l(){s.innerHTML="Its empty here, add movies you've already watched.",o.classList.add("active"),c.classList.remove("active"),localStorage.getItem("watched")?v("watched"):e(i).Notify.warning("No movies added!")}function u(){s.innerHTML="It's empty here, add the movies you want to watch.",c.classList.add("active"),o.classList.remove("active"),localStorage.getItem("queue")?v("queue"):e(i).Notify.warning("No movies added!")}function v(t){let n=JSON.parse(localStorage.getItem(t));if(!n)return void e(i).Notify.warning("No movies added!");const a=(0,d.renderSearchResult)(n);s.innerHTML=a.join("");document.querySelectorAll(".main-section__card").forEach((e=>{"0"!==e.dataset.rating&&e.lastElementChild.insertAdjacentHTML("beforeend",`<span class="rating-span">${Math.round(10*e.dataset.rating)/10}<span>`)}))}v("watched"),o.classList.remove("inactive"),o.classList.add("active"),o.addEventListener("click",l),c.addEventListener("click",u);var m=r("37v9V"),f=r("krGWQ"),g=(i=r("eWCmQ"),r("99kNq"));const{allCardsSection:L,modal:h,overflow:E,closeBtn:w,innerModal:y,watchedBtn:p,queueBtn:k,cursor:S,body:q}=f.refs,N=localStorage.getItem("queue"),T=localStorage.getItem("watched");let I=JSON.parse(N)||[],_=JSON.parse(T)||[],x=J("watched"),O=!1;function J(e){const t=localStorage.getItem(e);return JSON.parse(t)}function M(t){t.target.innerText="remove from watched";const n=x[t.target.dataset.id];_.push(n),localStorage.setItem("watched",JSON.stringify(_)),t.target.addEventListener("click",b),t.target.removeEventListener("click",M),O=!0,e(i).Notify.success("Added to watched!")}function b(t){t.target.innerText="add to watched";const n=x[t.target.dataset.id];_=_.filter((e=>e.id!==n.id)),localStorage.setItem("watched",JSON.stringify(_)),t.target.removeEventListener("click",b),t.target.addEventListener("click",M),O=!0,e(i).Notify.success("Removed from watched!")}function A(t){t.target.innerText="remove from queue";const n=x[t.target.dataset.id];I.push(n),localStorage.setItem("queue",JSON.stringify(I)),t.target.addEventListener("click",H),t.target.removeEventListener("click",A),O=!0,e(i).Notify.success("Added to queue!")}function H(t){t.target.innerText="add to queue";const n=x[t.target.dataset.id];I=I.filter((e=>e.id!==n.id)),localStorage.setItem("queue",JSON.stringify(I)),t.target.removeEventListener("click",H),t.target.addEventListener("click",A),O=!0,e(i).Notify.success("Removed from queue!")}function C(e){if(e.currentTarget!==e.target){h.classList.remove("hidden-modal"),E.classList.remove("hidden-modal"),L.removeEventListener("click",C),document.addEventListener("keydown",B),w.addEventListener("click",Q),E.addEventListener("click",R);!function(e){const t=(0,g.renderModal)(x,e,_,I);y.innerHTML=t[0],function(e,t){const n=document.querySelector(".modal__btn-watched"),a=document.querySelector(".modal__btn-queue"),r=document.querySelector(".modal__btn-watch-trailer");e?a.addEventListener("click",H):a.addEventListener("click",A),t?n.addEventListener("click",b):n.addEventListener("click",M),r.addEventListener("click",m.watchTrailer),[r,a,r,w].forEach((e=>{e.addEventListener("mouseover",(()=>{S.classList.add("hover")})),e.addEventListener("mouseleave",(()=>{S.classList.remove("hover")}))}))}(t[1],t[2])}(e.target.parentElement.dataset.id?e.target.parentElement.dataset.id:e.target.parentElement.parentElement.dataset.id);const t=window.scrollY;q.style.position="fixed",q.style.top=`-${t}px`}}function R(e){e.currentTarget===e.target&&Q()}function B(e){"Escape"===e.code&&Q()}function Q(){h.classList.add("hidden-modal"),E.classList.add("hidden-modal"),L.addEventListener("click",C),document.removeEventListener("keydown",Q),w.removeEventListener("click",Q),E.removeEventListener("click",R),k.classList.contains("active")&&O?u():O&&l(),O=!1;const e=q.style.top;q.style.position="",q.style.top="",window.scrollTo(0,-1*parseInt(e||"0"))}p.addEventListener("click",(()=>{x=J("watched")})),k.addEventListener("click",(()=>{x=J("queue")})),L.addEventListener("click",C),r("kBf9a"),r("7tI6e"),r("6HA5D");
//# sourceMappingURL=library.803f8e3e.js.map
