!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},a=t.parcelRequired7c6;null==a&&((a=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var a={id:e,exports:{}};return n[e]=a,t.call(a.exports,a,a.exports),a.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){r[e]=t},t.parcelRequired7c6=a),a("4Nugj");var i=a("iU1Pc"),c=a("7VSht"),d=document.querySelector(".watchedJS"),o=document.querySelector(".queueJS"),s=document.querySelector(".main-section__allcards"),l="watched",u="queue";function v(){s.innerHTML="Its empty here, add movies you've already watched.",d.classList.add("active"),o.classList.remove("active"),localStorage.getItem(l)?m(l):e(i).Notify.warning("No movies added!")}function f(){s.innerHTML="It's empty here, add the movies you want to watch.",o.classList.add("active"),d.classList.remove("active"),localStorage.getItem(u)?m(u):e(i).Notify.warning("No movies added!")}function m(t){var n=JSON.parse(localStorage.getItem(t));if(n){var r=(0,c.renderSearchResult)(n);s.innerHTML=r.join(""),document.querySelectorAll(".main-section__card").forEach((function(e){"0"!==e.dataset.rating&&e.lastElementChild.insertAdjacentHTML("beforeend",'<span class="rating-span">'.concat(Math.round(10*e.dataset.rating)/10,"<span>"))}))}else e(i).Notify.warning("No movies added!")}m(l),d.classList.remove("inactive"),d.classList.add("active"),d.addEventListener("click",v),o.addEventListener("click",f);var g=a("cDXQO"),L=a("4Nugj"),E=(i=a("iU1Pc"),a("lEOFC")),h=L.refs.allCardsSection,w=L.refs.modal,y=L.refs.overflow,p=L.refs.closeBtn,S=L.refs.innerModal,k=L.refs.watchedBtn,N=L.refs.queueBtn,q=L.refs.cursor,T=L.refs.body,_=localStorage.getItem("queue"),I=localStorage.getItem("watched"),O=JSON.parse(_)||[],x=JSON.parse(I)||[],J=b("watched"),M=!1;function b(e){var t=localStorage.getItem(e);return JSON.parse(t)}function j(t){t.target.innerText="remove from watched";var n=J[t.target.dataset.id];x.push(n),localStorage.setItem("watched",JSON.stringify(x)),t.target.addEventListener("click",H),t.target.removeEventListener("click",j),M=!0,e(i).Notify.success("Added to watched!")}function H(t){t.target.innerText="add to watched";var n=J[t.target.dataset.id];x=x.filter((function(e){return e.id!==n.id})),localStorage.setItem("watched",JSON.stringify(x)),t.target.removeEventListener("click",H),t.target.addEventListener("click",j),M=!0,e(i).Notify.success("Removed from watched!")}function R(t){t.target.innerText="remove from queue";var n=J[t.target.dataset.id];O.push(n),localStorage.setItem("queue",JSON.stringify(O)),t.target.addEventListener("click",A),t.target.removeEventListener("click",R),M=!0,e(i).Notify.success("Added to queue!")}function A(t){t.target.innerText="add to queue";var n=J[t.target.dataset.id];O=O.filter((function(e){return e.id!==n.id})),localStorage.setItem("queue",JSON.stringify(O)),t.target.removeEventListener("click",A),t.target.addEventListener("click",R),M=!0,e(i).Notify.success("Removed from queue!")}function C(e){if(e.currentTarget!==e.target){w.classList.remove("hidden-modal"),y.classList.remove("hidden-modal"),h.removeEventListener("click",C),document.addEventListener("keydown",B),p.addEventListener("click",D),y.addEventListener("click",U),function(e){var t=(0,E.renderModal)(J,e,x,O);S.innerHTML=t[0],n=t[1],r=t[2],a=document.querySelector(".modal__btn-watched"),i=document.querySelector(".modal__btn-queue"),c=document.querySelector(".modal__btn-watch-trailer"),n?i.addEventListener("click",A):i.addEventListener("click",R),r?a.addEventListener("click",H):a.addEventListener("click",j),c.addEventListener("click",g.watchTrailer),[c,i,c,p].forEach((function(e){e.addEventListener("mouseover",(function(){q.classList.add("hover")})),e.addEventListener("mouseleave",(function(){q.classList.remove("hover")}))}));var n,r,a,i,c}(e.target.parentElement.dataset.id?e.target.parentElement.dataset.id:e.target.parentElement.parentElement.dataset.id);var t=window.scrollY;T.style.position="fixed",T.style.top="-".concat(t,"px")}}function U(e){e.currentTarget===e.target&&D()}function B(e){"Escape"===e.code&&D()}function D(){w.classList.add("hidden-modal"),y.classList.add("hidden-modal"),h.addEventListener("click",C),document.removeEventListener("keydown",D),p.removeEventListener("click",D),y.removeEventListener("click",U),N.classList.contains("active")&&M?f():M&&v(),M=!1;var e=T.style.top;T.style.position="",T.style.top="",window.scrollTo(0,-1*parseInt(e||"0"))}k.addEventListener("click",(function(){J=b("watched")})),N.addEventListener("click",(function(){J=b("queue")})),h.addEventListener("click",C),a("jjs5m"),a("c1cRw"),a("4F07H")}();
//# sourceMappingURL=library.d8ee3ab9.js.map
