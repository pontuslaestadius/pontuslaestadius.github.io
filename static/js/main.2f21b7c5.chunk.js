(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,a){e.exports=a(26)},20:function(e,t,a){},26:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(13),i=a.n(l),o=(a(20),a(2)),s=a(3),c=a(6),u=a(4),m=a(5),h=a(8);function d(e){return e.items&&0!==e.items.length?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"sub-menu-indicator"},r.a.createElement(h.a,{icon:"box"}),r.a.createElement(h.a,{icon:"box-open"})),r.a.createElement("div",{className:"sub-menu"}," ",e.items," ")):null}var p=function(e){function t(e){var a;Object(o.a)(this,t),a=Object(c.a)(this,Object(u.a)(t).call(this,e));var n=!!e.icon&&localStorage.getItem(e.icon)||"on";return a.state={ref:e.href||"",filler:e.filler||!1,icon:e.icon||"feather-alt",label_state:e.label.on?n:"",label_current:e.label.on||e.label,label_on:e.label.on||e.label,label_off:e.label.off||e.label,onClick:e.onClick||function(){window.location.hash=e.href},subMenu:(e.subMenu||[]).map(function(e,a){return r.a.createElement(t,Object.assign({},e,{key:a}))})},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){"off"===this.state.label_state&&(console.log("Loaded persisted setting ".concat(this.state.icon,"=").concat(this.state.label_state)),this.switchLabel(void 0,"off"))}},{key:"switchLabel",value:function(e,t){if(this.state.onClick(e),""!==this.state.label_state)return t=t||"on"===this.state.label_state?"off":"on",this.setState({label_state:t,label_current:this.state["label_".concat(t)]}),t}},{key:"render",value:function(){var e=this,t=this.state.filler?r.a.createElement("svg",{className:"svg-inline--fa"}):r.a.createElement(h.a,{icon:this.state.icon});return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"menu-item","data-filler":this.state.filler,"data-ref":this.state.ref},r.a.createElement("div",{className:"menu-item-wrapper",onClick:function(t){var a=e.switchLabel(t);localStorage.getItem("persist")&&localStorage.setItem(e.state.icon,a)}},r.a.createElement("i",{title:this.state.label_current,"data-state":this.state.label_state},t),r.a.createElement("span",null," ",this.state.label_current," ")),r.a.createElement(d,{items:this.state.subMenu,key:"none"})))}}]),t}(n.Component);function b(){return r.a.createElement("div",{className:"icon"},r.a.createElement("div",{className:"zero"},"P"),r.a.createElement("div",{className:"one"},"ontus"),r.a.createElement("div",{className:"two vh"},"L"),r.a.createElement("div",{className:"three h"},"aestadius"))}var f=function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=r.a.createElement(b,null);return r.a.createElement("div",{className:"settings"},r.a.createElement(p,{icon:"igloo",title:"home",href:"#root",label:e}),r.a.createElement(p,{icon:"bars",label:{on:"Small sidebar",off:"Large sidebar"},onClick:function(e){var t=document.querySelector("nav");t.classList[t.classList.contains("small")?"remove":"add"]("small")}}),r.a.createElement(p,{icon:"adjust",label:{on:"Dark mode",off:"Normal mode"},onClick:function(e){var t=document.querySelector("body");t.classList[t.classList.contains("dark")?"remove":"add"]("dark")}}),r.a.createElement(p,{icon:"archive",label:{on:"Persist settings",off:"Forget settings"},onClick:function(e){void 0!==e&&localStorage.getItem("persist")?localStorage.clear():localStorage.setItem("persist",!0)}}),r.a.createElement(p,{filler:!0,label:""}))}}]),t}(n.Component),g=a(14),E=a.n(g),v=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={menuItems:(e.menuItems||[]).map(function(e){return r.a.createElement(p,e)})},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){E()()&&document.querySelector("nav").classList.add("small")}},{key:"render",value:function(){return r.a.createElement("nav",null,r.a.createElement(r.a.Fragment,null,r.a.createElement(f,null)," ",this.state.menuItems," ")," ")}}]),t}(n.Component),w=a(9),j=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={type:e.type||"h1",title:e.title},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("h1",{id:this.state.title.toLowerCase().replace(/\s/g,"_"),dangerouslySetInnerHTML:{__html:this.state.title}})}}]),t}(n.Component),y=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={title:e.title,content:e.content},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"section"},r.a.createElement(j,{title:this.state.title}),r.a.createElement("div",{className:"section-content"}," ",this.state.content," "))}}]),t}(n.Component),k=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={title:e.title},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement(y,Object.assign({},this.state,{content:r.a.createElement("p",null,"Sample")}))}}]),t}(n.Component),O=function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"blog"},r.a.createElement(k,{title:"test"}))}}]),t}(n.Component),I=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={title:e.title,links:e.links,images:e.images,background:e.background,description:e.description},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"section section-large","data-background":this.state.background},r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"section-image-wrapper"},r.a.createElement("div",{className:"section-lr flex"},r.a.createElement("div",{className:"section-left"},r.a.createElement("div",{className:"section-left-header"},r.a.createElement(j,{title:this.state.title}),r.a.createElement("div",{className:"section-links"}," ",this.state.links," ")),this.state.description),r.a.createElement("div",{className:"section-right flex"}," ",this.state.images," ")))))}}]),t}(n.Component),N=function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(y,{title:"Projects",content:r.a.createElement("p",null,"Here are a list of highlighted projects I have developed. Keep in mind these are often proof of concepts when experimenting with new techonologies which I am exercising.")}),r.a.createElement(I,{title:"pathfinder",background:"star",images:r.a.createElement(r.a.Fragment,null,r.a.createElement("img",{alt:"Node plotting example",src:"https://raw.githubusercontent.com/pontuslaestadius/pathfinder/master/examples/out/node_plot.gif"}),r.a.createElement("img",{alt:"A simple linked list on Nodes",src:"https://raw.githubusercontent.com/pontuslaestadius/pathfinder/master/examples/out/hello_world.png"})),links:r.a.createElement(r.a.Fragment,null,r.a.createElement("a",{href:"https://github.com/pontuslaestadius/pathfinder"},r.a.createElement(h.a,{icon:"code-branch"})),r.a.createElement("a",{href:"https://crates.io/crates/pathfinder"},r.a.createElement(h.a,{icon:"cube"}))),description:r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"Pathfinder is a Node based graphics library for generating images and gifs with connected nodes."),r.a.createElement("p",null,"A two year project which is still in progress, with 1400+ downloads. It was the first semi-large Rust project which taught me many advantages of programming in Rust."),r.a.createElement("p",null,"The images shown are example outputs from the library. And can be located along with the example code that generated them in the github repository. Click the Code-branch indicator next to the 'pathfinder' to get there."))}),r.a.createElement(I,{title:"js-irt",images:r.a.createElement(r.a.Fragment,null,r.a.createElement("img",{alt:"Test example",src:"resources/jsirt.gif"})),links:r.a.createElement(r.a.Fragment,null,r.a.createElement("a",{href:"https://github.com/pontuslaestadius/js-irt"},r.a.createElement(h.a,{icon:"code-branch"}))),description:r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"js - irt stands for Javascript inline Rust testing "),r.a.createElement("p",null,"It tests the bounderies of what can be done in your.js files when tests are run from a rust module."),r.a.createElement("p",null,"I wanted to see if it was feasible to generate javascript code from comments, there was a few issues because javascript functions can be very abstractly defined."),r.a.createElement("p",null,"It remains a proof of concept since no one would integrated a Rust service to test your vanillia Javascript or Node projects."),r.a.createElement("p",null,"It is thus adviced that such functionality would be implemented in a seperate npm package, if one does not already exist. But that results in it not being as adept for vanila javascript which is a requirement when doing development in the ",r.a.createElement("a",{href:"https://developer.tizen.org/"},"Tizen sdk"),". Which of course you could compile your code down to ES3 standard to support, so there are many counter arguments towards not continuing with this."))}),r.a.createElement(I,{title:"this page",background:"bionic",images:r.a.createElement(r.a.Fragment,null,r.a.createElement("img",{alt:"Gimpified render of the site",src:"resources/site.gif"})),links:r.a.createElement(r.a.Fragment,null,r.a.createElement("a",{href:"https://github.com/pontuslaestadius/pontuslaestadius.github.io/tree/develop"},r.a.createElement(h.a,{icon:"code-branch"}))),description:r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"This static web page is developed using ",r.a.createElement("a",{href:"https://reactjs.org/"}," React"),"."),r.a.createElement("p",null,"It was developed in a week, between week 2 and week 3 of 2019. In an attempt to get familiar with React and better show off previous projects, thus it being the focus of the page."),r.a.createElement("p",null,"The menu was tedious to develop but I am quite happy about the resulting product, it has shown issues in self selecting the menu item based on scrolling in Firefox. And it at times be improperly offset."),r.a.createElement("p",null,"It ",r.a.createElement("i",null,"tries")," to only use JavaScript for non-required browsing features. I do realize this is not optimal being a React static page, but I do think it's an important design philosofy."),r.a.createElement("p",null,"Reiterating on the menu features, including an icon made using only Text and CSS. Which I thought was pretty fun to create, but obviously not optimal for browsers which might render it differently. Additionally the ",r.a.createElement("b",null,"dark mode")," uses a very browser compatible way of setting the body tag which then inherits to the children when enabled. It's not optimal but it is a viable solution while waiting for all browsers to offically support prefer-dark-scheme CSS query."))}))}}]),t}(n.Component),C=function(e){function t(e){var a;Object(o.a)(this,t),a=Object(c.a)(this,Object(u.a)(t).call(this,e));var n=Object(w.a)(Object(w.a)(a));n.state={};var r=function(e){if(!n.state.sorted_headers){var t=[];document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach(function(e){var a=e.innerHTML.toLowerCase().replace(/\s/g,"_"),n=document.querySelector('.menu-item[data-ref="#'.concat(a,'"]'));n&&t.push({dom:n,top:e.getBoundingClientRect().top+window.scrollY-29})});t.sort(function(e,t){return e.top===t.top?0:e.top<t.top?1:-1}),n.setState({sorted_headers:t}),console.log("MenuItems linked to headers: ".concat(t.length))}var a=e.pageY||window.scrollY,r=!0,l=!1,i=void 0;try{var o=function(){var e=s.value;if(e.top>a)return"continue";var t=n.state.active;if(t===e.dom)return"break";var r=function(e){t.classList[e]("active"),t.parentNode.parentNode.classList.contains("menu-item")&&t.parentNode.parentNode.classList[e]("sub-active")};return t&&r("remove"),t=e.dom,r("add"),n.setState({active:t,sorted_headers:!1}),"break"};e:for(var s,c=n.state.sorted_headers[Symbol.iterator]();!(r=(s=c.next()).done);r=!0){switch(o()){case"continue":continue;case"break":break e}}}catch(u){l=!0,i=u}finally{try{r||null==c.return||c.return()}finally{if(l)throw i}}};return window.onhashchange=r,window.onscroll=r,a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"content",onScroll:this.listenScrollEvent},r.a.createElement(y,{title:"Introduction",content:r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,r.a.createElement("b",null," Hi,")," ",r.a.createElement("br",null),"This github.io page groups all my projects, another reference table can be found ",r.a.createElement("a",{href:"https://github.com/pontuslaestadius/portfolio"},"here"),". This page will consist of project writeups and a programming related blog. ",r.a.createElement("br",null)),r.a.createElement(j,{type:"h2",title:"About me"}),r.a.createElement("p",null,"I am a 3rd year Software Engineering & Management Student at Gothenbourg University. I also intern part-time at Ericsson, but a lot of my sparetime revolves around learning new Programming languages, tools, algorithms and useful skills."),r.a.createElement(j,{type:"h2",title:"Contact"}),r.a.createElement("p",null,"Follow me on",r.a.createElement("a",{href:"https://github.com/pontuslaestadius"}," Github ")," and get up to date information about projects I am working on."),r.a.createElement("p",null,"For anything else. ",r.a.createElement("a",{href:'\\ // eslint-disable-next-line \\ javascript:window.location.href = "mailto:" + ["pontus.laestadius", "ail.com"].join("@gm")'},"Contact me by email"),"."))}),r.a.createElement(N,null),r.a.createElement(y,{title:"Blog",content:r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"Here are entries regarding programming related topics I feel the need to share my opinion on."),r.a.createElement(O,null))}),r.a.createElement("div",{className:"footer flex"},r.a.createElement("p",null," This is the end.There is no more. ")))}}]),t}(n.Component),S=a(10),_=a(7);S.b.add(_.d,_.c,_.h,_.l,_.k,_.e,_.f,_.g,_.m,_.i,_.j,_.a,_.b);var F=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={},a.state={menuItems:[{icon:"cat",label:"Introduction",href:"#introduction",subMenu:[{label:"About me",href:"#about_me"},{label:"Contact",href:"#contact"}]},{icon:"dragon",label:"Projects",href:"#projects",subMenu:[{label:"pathfinder",href:"#pathfinder"},{label:"js-irt",href:"#js-irt"},{label:"this page",href:"#this_page"}]},{icon:"broom",label:"Blog",href:"#blog",subMenu:[]}]},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(v,{menuItems:this.state.menuItems}),r.a.createElement(C,{sections:this.state.sections}))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(F,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[15,2,1]]]);
//# sourceMappingURL=main.2f21b7c5.chunk.js.map