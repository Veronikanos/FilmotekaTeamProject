function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},a={},i=t.parcelRequired7c6;null==i&&((i=function(e){if(e in n)return n[e].exports;if(e in a){var t=a[e];delete a[e];var i={id:e,exports:{}};return n[e]=i,t.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){a[e]=t},t.parcelRequired7c6=i),i("krGWQ"),i("b06V4");var r=i("eWCmQ"),o=i("5o68A");const c=document.querySelector(".watchedJS"),d=document.querySelector(".queueJS"),s=document.querySelector(".main-section__allcards");function l(){c.classList.add("active"),d.classList.remove("active"),localStorage.getItem("watched")?v("watched"):e(r).Notify.warning("No movies added!")}function u(){d.classList.add("active"),c.classList.remove("active"),localStorage.getItem("queue")?v("queue"):e(r).Notify.warning("No movies added!")}function v(t){let n=JSON.parse(localStorage.getItem(t));if(console.log(n),!n.length)return s.innerHTML="You have not added anything to this list yet.",void e(r).Notify.warning("No movies added!");const a=(0,o.renderSearchResult)(n);s.innerHTML=a.join("");document.querySelectorAll(".main-section__card").forEach((e=>{"0"!==e.dataset.rating&&e.lastElementChild.insertAdjacentHTML("beforeend",`<span class="rating-span">${Math.round(10*e.dataset.rating)/10}</span>`)}))}v("watched"),c.classList.remove("inactive"),c.classList.add("active"),c.addEventListener("click",l),d.addEventListener("click",u);var m=i("37v9V"),f=i("krGWQ"),g=(r=i("eWCmQ"),i("99kNq"));const{allCardsSection:L,modal:h,overflow:w,closeBtn:E,innerModal:y,watchedBtn:k,queueBtn:S,cursor:p,body:q}=f.refs,N=localStorage.getItem("queue"),T=localStorage.getItem("watched");let _=JSON.parse(N)||[],I=JSON.parse(T)||[],x=b("watched"),O=!1;function b(e){const t=localStorage.getItem(e);return JSON.parse(t)}function J(t){t.target.innerText="remove from watched";const n=x[t.target.dataset.id];I.push(n),localStorage.setItem("watched",JSON.stringify(I)),t.target.addEventListener("click",M),t.target.removeEventListener("click",J),O=!0,e(r).Notify.success("Added to watched!")}function M(t){t.target.innerText="add to watched";const n=x[t.target.dataset.id];I=I.filter((e=>e.id!==n.id)),localStorage.setItem("watched",JSON.stringify(I)),t.target.removeEventListener("click",M),t.target.addEventListener("click",J),O=!0,e(r).Notify.success("Removed from watched!")}function A(t){t.target.innerText="remove from queue";const n=x[t.target.dataset.id];_.push(n),localStorage.setItem("queue",JSON.stringify(_)),t.target.addEventListener("click",C),t.target.removeEventListener("click",A),O=!0,e(r).Notify.success("Added to queue!")}function C(t){t.target.innerText="add to queue";const n=x[t.target.dataset.id];_=_.filter((e=>e.id!==n.id)),localStorage.setItem("queue",JSON.stringify(_)),t.target.removeEventListener("click",C),t.target.addEventListener("click",A),O=!0,e(r).Notify.success("Removed from queue!")}function H(e){if(e.currentTarget!==e.target){h.classList.remove("hidden-modal"),w.classList.remove("hidden-modal"),L.removeEventListener("click",H),document.addEventListener("keydown",B),E.addEventListener("click",D),w.addEventListener("click",R);!function(e){x=k.classList.contains("active")?b("watched"):b("queue");const t=(0,g.renderModal)(x,e,I,_);y.innerHTML=t[0],function(e,t){const n=document.querySelector(".modal__btn-watched"),a=document.querySelector(".modal__btn-queue"),i=document.querySelector(".modal__btn-watch-trailer");e?a.addEventListener("click",C):a.addEventListener("click",A),t?n.addEventListener("click",M):n.addEventListener("click",J),i.addEventListener("click",m.watchTrailer),[i,a,i,E].forEach((e=>{e.addEventListener("mouseover",(()=>{p.classList.add("hover")})),e.addEventListener("mouseleave",(()=>{p.classList.remove("hover")}))}))}(t[1],t[2])}("DIV"===e.target.nodeName?e.target.dataset.id:e.target.closest("div").dataset.id);const t=window.scrollY;q.style.position="fixed",q.style.top=`-${t}px`}}function R(e){e.currentTarget===e.target&&D()}function B(e){"Escape"===e.code&&D()}function D(){h.classList.add("hidden-modal"),w.classList.add("hidden-modal"),L.addEventListener("click",H),document.removeEventListener("keydown",D),E.removeEventListener("click",D),w.removeEventListener("click",R),S.classList.contains("active")&&O?u():O&&l(),O=!1;const e=q.style.top;q.style.position="",q.style.top="",window.scrollTo(0,-1*parseInt(e||"0"))}k.addEventListener("click",(()=>{x=b("watched")})),S.addEventListener("click",(()=>{x=b("queue")})),L.addEventListener("click",H),i("kBf9a"),i("7tI6e"),i("6HA5D");
//# sourceMappingURL=library.6444b466.js.map
