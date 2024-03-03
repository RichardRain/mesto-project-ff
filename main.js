(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e,t,n,r){t.classList.add(r.inputErrorClass),e.textContent=n,e.classList.add(r.errorClass)}function n(e,t,n){t.classList.remove(n.inputErrorClass),e.classList.remove(n.errorClass),e.textContent=""}function r(e,t){return e.querySelector(".".concat(t.id,"-error"))}function o(e,t,n){!function(e){return e.some((function(e){if(!e.validity.valid)return!0}))}(e)?(t.classList.remove(n.inactiveButtonClass),t.disabled=!1):(t.classList.add(n.inactiveButtonClass),t.disabled=!0)}function c(e,c,u,a,i){!function(e,r,o){r.validity.valid?n(e,r,o):(r.validity.patternMismatch?r.setCustomValidity(r.dataset.errorMessage):r.setCustomValidity(""),t(e,r,r.validationMessage,o))}(r(e,c),c,i),o(u,a,i)}e.d({},{SB:()=>F});var u={baseUrl:"https://nomoreparties.co/v1/wff-cohort-7",headers:{authorization:"1f63c2d3-d524-4b9d-bfad-0d7f89779a3c","Content-Type":"application/json"}};function a(e){return e.ok?e.json():Promise.reject("Не удалось получить данные: ".concat(e.status))}function i(e){return fetch("".concat(u.baseUrl,"/cards/likes/").concat(e._id),{method:"PUT",headers:u.headers}).then(a)}function l(e){return fetch("".concat(u.baseUrl,"/cards/likes/").concat(e._id),{method:"DELETE",headers:u.headers}).then(a)}var s=document.querySelector("#card-template").content;function d(e,t,n,r,o){var c=s.querySelector(".card").cloneNode(!0),u=c.querySelector(".card__delete-button"),a=c.querySelector(".card__image"),i=c.querySelector(".card__title"),l=c.querySelector(".card__like-button"),d=c.querySelector(".card__like-number");return a.src=e.link,a.alt=e.name,i.textContent=e.name,d.textContent=e.likes.length,e.owner._id===o?u.addEventListener("click",(function(){return t(c,e)})):u.remove(),e.likes.some((function(e){return e._id===o}))&&l.classList.add("card__like-button_is-active"),l.addEventListener("click",(function(t){return n(t,e,d)})),a.addEventListener("click",(function(){return r(e.link,e.name)})),c}function p(e,t,n){(e.target.classList.contains("card__like-button_is-active")?l:i)(t).then((function(t){!function(e,t){t.textContent=e.likes.length}(t,n),e.target.classList.toggle("card__like-button_is-active")})).catch((function(e){console.log(e)}))}function f(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",m)}function _(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",m)}function m(e){"Escape"===e.key&&F(document.querySelector(".popup_is-opened"))}function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var h,v,b=document.querySelector(".places__list"),S=document.querySelector(".profile__edit-button"),g=document.querySelector(".profile__add-button"),q=document.querySelector(".profile__image-edit-button"),L=document.querySelectorAll(".popup"),E=document.querySelector(".popup_type_edit-avatar"),C=document.querySelector(".popup_type_edit"),k=document.querySelector(".popup_type_new-card"),A=document.querySelector(".popup_type_image"),x=document.querySelector(".popup__image"),w=document.querySelector(".popup__caption"),j=document.forms["edit-avatar"],O=j.elements.link,U=document.querySelector(".avatar-link-input-error"),T=document.forms["edit-profile"],P=T.elements.name,B=T.elements.description,D=document.querySelector(".profile__title"),M=document.querySelector(".profile__description"),N=document.querySelector(".profile__image"),H=document.forms["new-place"],I=H.elements["place-name"],J=H.elements.link,V={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},z=document.querySelector(".popup_type_delete"),$=z.querySelector(".popup__button");function F(e,t,u){var a=e.querySelector(".popup__form");if(e.classList.contains("popup_is-opened"))_(e),null==a||a.reset(),a&&function(e,t){var c=Array.from(e.querySelectorAll(".popup__input")),u=e.querySelector(".popup__button");c.forEach((function(o){n(r(e,o),o,t)})),o(c,u,t)}(a,V);else{if(e.classList.contains("popup_type_edit")&&(t.value=D.textContent,u.value=M.textContent),a){var i=Array.from(a.querySelectorAll(V.inputSelector)),l=a.querySelector(V.submitButtonSelector);i.forEach((function(e){c(a,e,i,l,V)}))}f(e)}}function G(e,t){x.src=e,x.alt=t,w.textContent=t,f(A)}function K(e){e.classList.contains("popup__button_loading")?(e.classList.remove("popup__button_loading"),e.textContent="Сохранить"):(e.classList.add("popup__button_loading"),e.textContent="Сохранить...")}function Q(e,t,n){D.textContent=e,M.textContent=t,N.style="background-image: url(".concat(n,")")}function R(e,t){h=e,v=t,f(z)}j.addEventListener("submit",(function(e){e.preventDefault();var n=O.value;K(e.target.querySelector(".popup__button")),function(e,n,r,o){return fetch(e,{method:"HEAD"}).then((function(e){if(e.ok)if(e.headers.has("Content-Type")){if(e.headers.get("Content-Type").includes("image"))return!0;t(n,r,"Ссылка не ведет на изображение.",o)}else t(n,r,"Не удалось определить тип контента.",o);return t(n,r,"Не удалось получить данные.",o),!1}))}(n,U,O,V).then((function(e){return e?function(e){return fetch(u.baseUrl+"/users/me/avatar",{method:"PATCH",headers:u.headers,body:JSON.stringify({avatar:e})}).then(a)}(n):Promise.reject("Не удалось получить данные: ".concat(e.status))})).then((function(e){Q(e.name,e.about,e.avatar)})).catch((function(e){console.log(e)})).finally((function(){K(e.target.querySelector(".popup__button"))})),F(E)})),T.addEventListener("submit",(function(e){var t,n;e.preventDefault(),K(e.target.querySelector(".popup__button")),(t=P.value,n=B.value,fetch(u.baseUrl+"/users/me",{method:"PATCH",headers:u.headers,body:JSON.stringify({name:t,about:n})}).then(a)).then((function(e){D.textContent=e.name,M.textContent=e.about})).catch((function(e){return console.log(e)})).finally((function(){K(e.target.querySelector(".popup__button"))})),F(C)})),H.addEventListener("submit",(function(e){var t,n;e.preventDefault(),K(e.target.querySelector(".popup__button")),(t=I.value,n=J.value,fetch(u.baseUrl+"/cards",{method:"POST",headers:u.headers,body:JSON.stringify({name:t,link:n})}).then(a)).then((function(e){var t=d(e,R,p,G,e.owner._id);b.prepend(t)})).catch((function(e){return console.log(e)})).finally((function(){K(e.target.querySelector(".popup__button"))})),F(k)})),q.addEventListener("click",(function(){return F(E)})),S.addEventListener("click",(function(){return F(C,P,B)})),g.addEventListener("click",(function(){return F(k)})),$.addEventListener("click",(function(){var e;h&&(e=h,function(e){return fetch("".concat(u.baseUrl,"/cards/").concat(e._id),{method:"DELETE",headers:u.headers})}(v).then(a).then((function(){e.remove()})),_(z))})),L.forEach((function(e){e.addEventListener("mousedown",(function(t){(t.target.classList.contains("popup_is-opened")||t.target.classList.contains("popup__close"))&&F(e)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(o){o.addEventListener("input",(function(){c(e,o,n,r,t)}))})),n.forEach((function(o){o.addEventListener("focusout",(function(){c(e,o,n,r,t)}))}))}(t,e)}))}(V),Promise.all([fetch(u.baseUrl+"/users/me",{headers:u.headers}).then(a),fetch(u.baseUrl+"/cards",{headers:u.headers}).then(a)]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,a=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(a.push(r.value),a.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(t,n)||function(e,t){if(e){if("string"==typeof e)return y(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?y(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];Q(o.name,o.about,o.avatar),function(e,t){e.forEach((function(e){var n=d(e,R,p,G,t);b.append(n)}))}(c,o._id)})).catch((function(e){return console.log(e)}))})();