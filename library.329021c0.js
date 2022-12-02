!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},a={},i=t.parcelRequired7c6;null==i&&((i=function(e){if(e in n)return n[e].exports;if(e in a){var t=a[e];delete a[e];var i={id:e,exports:{}};return n[e]=i,t.call(i.exports,i,i.exports),i.exports}var c=new Error("Cannot find module '"+e+"'");throw c.code="MODULE_NOT_FOUND",c}).register=function(e,t){a[e]=t},t.parcelRequired7c6=i),i("4Nugj");var c=i("iU1Pc"),r=i("7VSht"),o=document.querySelector(".watchedJS"),d=document.querySelector(".queueJS"),s=document.querySelector(".main-section__allcards"),l="watched",u="queue";function v(){s.innerHTML="",o.classList.add("active"),d.classList.remove("active"),localStorage.getItem(l)?f(l):e(c).Notify.warning("No movies added!")}function m(){s.innerHTML="",d.classList.add("active"),o.classList.remove("active"),localStorage.getItem(u)?f(u):e(c).Notify.warning("No movies added!")}function f(t){var n=JSON.parse(localStorage.getItem(t));if(n){var a=(0,r.renderSearchResult)(n);s.innerHTML=a.join(""),document.querySelectorAll(".main-section__card").forEach((function(e){"0"!==e.dataset.rating&&e.lastElementChild.insertAdjacentHTML("beforeend",'<span class="rating-span">'.concat(Math.round(10*e.dataset.rating)/10,"<span>"))}))}else e(c).Notify.warning("No movies added!")}f(l),o.classList.remove("inactive"),o.classList.add("active"),o.addEventListener("click",v),d.addEventListener("click",m);var g=i("cDXQO"),_=i("4Nugj"),L=_.refs.allCardsSection,h=_.refs.modal,p=_.refs.overflow,E=_.refs.closeBtn,b=_.refs.innerModal,w=_.refs.watchedBtn,S=_.refs.queueBtn,k=_.refs.cursor,y=localStorage.getItem("queue"),q=localStorage.getItem("watched"),N=JSON.parse(y)||[],T=JSON.parse(q)||[],O=I("watched"),x=!1;function I(e){var t=localStorage.getItem(e);return JSON.parse(t)}function J(e){e.target.innerText="remove from watched";var t=O[e.target.dataset.id];T.push(t),localStorage.setItem("watched",JSON.stringify(T)),e.target.addEventListener("click",M),e.target.removeEventListener("click",J),x=!0}function M(e){e.target.innerText="add to watched";var t=O[e.target.dataset.id];T=T.filter((function(e){return e.id!==t.id})),localStorage.setItem("watched",JSON.stringify(T)),e.target.removeEventListener("click",M),e.target.addEventListener("click",J),x=!0}function j(e){e.target.innerText="remove from queue";var t=O[e.target.dataset.id];N.push(t),localStorage.setItem("queue",JSON.stringify(N)),e.target.addEventListener("click",H),e.target.removeEventListener("click",j),x=!0}function H(e){e.target.innerText="add to queue";var t=O[e.target.dataset.id];N=N.filter((function(e){return e.id!==t.id})),localStorage.setItem("queue",JSON.stringify(N)),e.target.removeEventListener("click",H),e.target.addEventListener("click",j),x=!0}function R(e){e.currentTarget!==e.target&&(h.classList.remove("hidden-modal"),p.classList.remove("hidden-modal"),L.removeEventListener("click",R),document.addEventListener("keydown",B),E.addEventListener("click",C),p.addEventListener("click",A),function(e){var t=O[e],n=t.poster_path,a=t.original_title,i=t.title,c=t.genre_ids,r=t.vote_average,o=t.vote_count,d=t.popularity,s=t.overview,l=t.id,u=JSON.parse(localStorage.getItem("allGenres")),v=[];c.forEach((function(e){v.push(u.find((function(t){return t.id===e})).name)}));var m=T.find((function(e){return e.id===l})),f=!!N.find((function(e){return e.id===l})),_=!!m,L='<button class="modal__btn-queue interactive-button" data-id='.concat(e,f?">remove from queue</button>":">add to queue</button>"),h='<button class="modal__btn-watched interactive-button" data-id='.concat(e,_?">\n        remove from Watched\n      </button>":">\n        add to Watched\n      </button>"),p=o&&r?'<li class="modal__item">\n          <div class="modal__item-first">Vote / Votes</div>\n          <div class="modal__item-votes">\n            <span class="modal__item-bg modal__item--accent">'.concat(r.toFixed(1),'</span> /\n            <span class="modal__item-bg modal__item--grey">').concat(o,"</span>\n          </div>\n        </li>"):"",w=d?'<li class="modal__item">\n          <div class="modal__item-first">Popularity</div>\n          <div>'.concat(d,"</div>\n        </li>"):"",S=v.length?'<li class="modal__item">\n          <div class="modal__item-first">Genre</div>\n          <div>'.concat(v.join(", "),"</div>\n        </li>"):"",y=a?'<li class="modal__item">\n          <div class="modal__item-first">Original Title</div>\n          <div class="modal__item-title">'.concat(a,"</div>\n        </li>"):"",q=s?'<div class="modal__about-info">\n        <p class="modal__about-headline">About</p>\n        <p class="modal__about-text">\n          '.concat(s,"\n        </p>\n      </div>"):"",x=n?'<div class="modal__img">\n      <img src="https://image.tmdb.org/t/p/w500'.concat(n,'" alt="').concat(i,'" />\n    </div>'):"",I="".concat(x,'\n    <div class="modal__about">\n      <div class="modal__headline">').concat(i,'</div>\n      <ul class="modal__list">\n        ').concat(p,"\n        ").concat(w,"\n        ").concat(y,"\n        ").concat(S,"\n      </ul> \n      ").concat(q,'\n          <div class="modal__buttons">\n      ').concat(h,"\n      ").concat(L,"\n      <button class='modal_btn-watched interactive-button modal_btn-watch-trailer' data-id=").concat(l,">watch trailer</button>\n    </div>\n    </div>\n    ");b.innerHTML=I,function(e,t){var n=document.querySelector(".modal__btn-watched"),a=document.querySelector(".modal__btn-queue"),i=document.querySelector(".modal_btn-watch-trailer");e?a.addEventListener("click",H):a.addEventListener("click",j),t?n.addEventListener("click",M):n.addEventListener("click",J),i.addEventListener("click",g.watchTrailer),[i,a,i,E].forEach((function(e){e.addEventListener("mouseover",(function(){k.classList.add("hover")})),e.addEventListener("mouseleave",(function(){k.classList.remove("hover")}))}))}(f,_)}(e.target.parentElement.dataset.id?e.target.parentElement.dataset.id:e.target.parentElement.parentElement.dataset.id))}function A(e){e.currentTarget===e.target&&C()}function B(e){"Escape"===e.code&&C()}function C(){h.classList.add("hidden-modal"),p.classList.add("hidden-modal"),L.addEventListener("click",R),document.removeEventListener("keydown",C),E.removeEventListener("click",C),p.removeEventListener("click",A),S.classList.contains("active")&&x?m():x&&v(),x=!1}w.addEventListener("click",(function(){O=I("watched")})),S.addEventListener("click",(function(){O=I("queue")})),L.addEventListener("click",R),i("jjs5m"),i("c1cRw")}();
//# sourceMappingURL=library.329021c0.js.map
