(this["webpackJsonpgoit-react-hw-04-hooks-images"]=this["webpackJsonpgoit-react-hw-04-hooks-images"]||[]).push([[0],[,,,,,function(e,t,a){e.exports={Searchbar:"Searchbar_Searchbar__2qBTI",SearchForm:"Searchbar_SearchForm__2SCSk",SearchFormButton:"Searchbar_SearchFormButton__2Vc59",SearchFormInput:"Searchbar_SearchFormInput__31pgo"}},,,,,,function(e,t,a){e.exports={ImageGalleryItem:"ImageGalleryItem_ImageGalleryItem__2G8YX",ImageGalleryItemImage:"ImageGalleryItem_ImageGalleryItemImage__1eYwL"}},function(e,t,a){e.exports={Loading:"Loader_Loading__1iMDI",IconSpinner:"Loader_IconSpinner__2t8OS",spinner:"Loader_spinner__brfXn"}},function(e,t,a){e.exports={Overlay:"Modal_Overlay__2fef1",Modal:"Modal_Modal__zgzxi"}},,,,,,function(e,t,a){e.exports={ImageGallery:"ImageGallery_ImageGallery__beXih"}},function(e,t,a){e.exports={Button:"Button_Button__1r7Cv"}},function(e,t,a){e.exports={ErrorView:"ErrorView_ErrorView__2pl5F"}},,function(e,t,a){e.exports={RequestOffer:"PreView_RequestOffer__18FDK"}},,,,,,,,function(e,t,a){},function(e,t,a){},,function(e,t,a){"use strict";a.r(t);var r=a(1),n=a.n(r),o=a(4),c=a.n(o),s=(a(31),a(8)),i=(a(32),a(5)),l=a.n(i),u=a(15),m=a(3),d=(a(10),a(2));function g(e){var t=e.onSubmit,a=Object(r.useState)(""),n=Object(s.a)(a,2),o=n[0],c=n[1];return Object(d.jsx)("header",{className:l.a.Searchbar,children:Object(d.jsxs)("form",{className:l.a.SearchForm,onSubmit:function(e){if(e.preventDefault(),""===o.toLowerCase().trim())return m.b.warning("Enter your request please!");t(o),c("")},children:[Object(d.jsx)("button",{type:"submit",className:l.a.SearchFormButton,children:Object(d.jsx)("span",{className:l.a.SearchFormButtonLabel,children:Object(d.jsx)(u.a,{size:30})})}),Object(d.jsx)("input",{className:l.a.SearchFormInput,type:"text",autoComplete:"off",autoFocus:!0,placeholder:"Search images and photos",value:o,onChange:function(e){c(e.currentTarget.value)}})]})})}var h=a(14),j=a(16),f=a(17),b=a(25),p=a(24),O=a(19),S=a.n(O),_=a(11),v=a.n(_);var x=function(e){var t=e.src,a=e.alt,r=e.onClick,n=e.id;return Object(d.jsx)("li",{className:v.a.ImageGalleryItem,children:Object(d.jsx)("img",{id:n,src:t,alt:a,onClick:r,className:v.a.ImageGalleryItemImage})})},I=a(20),y=a.n(I);var w=function(e){var t=e.loadMore;return Object(d.jsx)("button",{id:"loadMore",onClick:t,type:"button",className:y.a.Button,children:"Load more"})},N=a(21),M=a.n(N);function L(e){var t=e.message;return Object(d.jsx)("p",{className:M.a.ErrorView,children:t})}var k=a(12),G=a.n(k),C=a(22);function F(){return Object(d.jsx)("p",{className:G.a.Loading,children:Object(d.jsx)(C.a,{size:"100",className:G.a.IconSpinner})})}var E=a(23),B=a.n(E);function U(){return Object(d.jsx)("p",{className:B.a.RequestOffer,children:"Enter your request..."})}var q=a(26);var R=function(e,t){return fetch("https://pixabay.com/api/?q=".concat(e,"&page=").concat(t,"&&key=").concat("24048830-4cc4486dcdd2cd17ebea2a9c8","&image_type=photo&orientation=horizontal&per_page=12")).then((function(t){return t.ok?t.json():Promise.reject(new Error("No image with name ".concat(e)))})).then((function(e){return e.hits}))},A=a(13),V=a.n(A),z=document.querySelector("#modal-root");function P(e){var t=e.toClose,a=e.src,n=e.alt,c=e.isShow;Object(r.useEffect)((function(){var e=function(e){"Escape"===e.code&&!0===c&&t()};return window.addEventListener("keydown",e),function(){window.removeEventListener("keydown",e)}}),[t,c]);return Object(o.createPortal)(Object(d.jsx)("div",{className:V.a.Overlay,onClick:function(e){e.target===e.currentTarget&&t()},children:Object(d.jsx)("div",{className:V.a.Modal,children:Object(d.jsx)("img",{src:a,alt:n})})}),z)}var D=function(e){Object(b.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(j.a)(this,a);for(var r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return(e=t.call.apply(t,[this].concat(n))).state={images:[],page:1,error:null,status:"idle",loading:!1,showModal:!1,modalUrl:"",modalAlt:""},e.toSetPage=function(){e.setState((function(t){if(e.state.images.length>1)return{page:t.page}}))},e.loadMore=function(){e.setState({loading:!0}),e.toSetPage(),e.fetchGallery(e.state.page),e.toSmoothScroll()},e.toSmoothScroll=function(){setTimeout((function(){window.scrollBy({top:document.documentElement.clientHeight,behavior:"smooth"})}),1e3)},e.fetchGallery=function(t){var a=e.props.imageName;R(a,t).then((function(t){var a=t.map((function(e){return{id:e.id,webformatURL:e.webformatURL,largeImageURL:e.largeImageURL,tags:e.tags}}));return e.setState((function(e){return{images:[].concat(Object(h.a)(e.images),Object(h.a)(a)),status:"resolved",page:e.page+1,loading:!1}})),0===e.state.images.length?m.b.error("No images matching your request!"):e.state.images.length>0&&0===a.length?m.b.info("No more images matching your request!"):void 0})).catch((function(t){return e.setState({error:t,status:"rejected"})}))},e.openModal=function(){e.setState({showModal:!0})},e.handleSelectImage=function(t){var a=e.state.images.findIndex((function(e){return e.id===+t.target.id})),r=e.state.images[a];e.setState({modalUrl:r.largeImageURL,modalAlt:r.tags}),e.openModal()},e.closeModal=function(){e.setState({showModal:!1,modalUrl:"",modalAlt:""})},e}return Object(f.a)(a,[{key:"componentDidUpdate",value:function(e,t){e.imageName!==this.props.imageName&&(this.setState({status:"pending",page:1,images:[]}),this.fetchGallery(1))}},{key:"render",value:function(){var e=this,t=this.state,a=t.images,r=t.error,n=t.status,o=t.loading,c=t.showModal,s=t.modalUrl,i=t.modalAlt;return"idle"===n?Object(d.jsx)(U,{}):"pending"===n?Object(d.jsx)(F,{}):"rejected"===n?Object(d.jsx)(L,{message:r.message}):"resolved"===n?Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)("ul",{className:S.a.ImageGallery,children:a&&a.map((function(t){return Object(d.jsx)(x,{id:t.id,src:t.webformatURL,alt:t.tags,onClick:e.handleSelectImage},Object(q.a)())}))}),c&&Object(d.jsx)(P,{toClose:this.closeModal,src:s,alt:i,isShow:c}),a.length>0&&!o&&Object(d.jsx)(w,{loadMore:this.loadMore}),o&&Object(d.jsx)(F,{})]}):void 0}}]),a}(r.Component),T=D;function X(){var e=Object(r.useState)(""),t=Object(s.a)(e,2),a=t[0],n=t[1];return Object(d.jsxs)("div",{className:"App",children:[Object(d.jsx)(g,{onSubmit:function(e){n(e)}}),Object(d.jsx)(T,{imageName:a}),Object(d.jsx)(m.a,{autoClose:"3000",position:"top-left",theme:"colored"})]})}c.a.render(Object(d.jsx)(n.a.StrictMode,{children:Object(d.jsx)(X,{})}),document.getElementById("root"))}],[[34,1,2]]]);
//# sourceMappingURL=main.75f696f2.chunk.js.map