"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[479],{479:function(e,n,s){s.r(n),s.d(n,{default:function(){return S}});var r=s(439),o=s(791),t=s(184);function l(e){var n=e.title,s=e.amount;return console.log("\uc790\uc2dd \ucef4\ud3ec\ub10c\ud2b8"),(0,t.jsxs)("div",{className:"child",children:[(0,t.jsx)("h4",{children:"Child Component"}),(0,t.jsxs)("p",{children:["\uc81c\ubaa9: ",n]}),(0,t.jsxs)("p",{children:["\uc218\ub7c9: ",s]})]})}var i=(0,o.memo)(l);function c(){console.log("\ubd80\ubaa8 \ucef4\ud3ec\ub10c\ud2b8");var e=(0,o.useState)(0),n=(0,r.Z)(e,2),s=n[0],l=n[1],c=(0,o.useState)(0),a=(0,r.Z)(c,2),d=a[0],h=a[1];return(0,t.jsxs)("section",{className:"memo1",children:[(0,t.jsx)("h3",{children:"Parent Component"}),(0,t.jsxs)("span",{children:["\uc218\ub7c9: ",s]}),(0,t.jsx)("button",{type:"button",onClick:function(){l(s+1)},children:"\ubd80\ubaa8 \uc218\ub7c9 \uc99d\uac00"}),(0,t.jsx)("button",{type:"button",onClick:function(){h(d+1)},children:"\uc790\uc2dd \uc218\ub7c9 \uc99d\uac00"}),(0,t.jsx)(i,{title:"april",amount:d.toString()})]})}function a(e){var n=e.data;return console.log("\uc790\uc2dd \ucef4\ud3ec\ub10c\ud2b8"),(0,t.jsxs)("div",{className:"child",children:[(0,t.jsx)("h4",{children:"Child Component"}),(0,t.jsx)("p",{children:n.a}),(0,t.jsx)("p",{children:n.b})]})}var d=(0,o.memo)(a);function h(){console.log("\ubd80\ubaa8 \ucef4\ud3ec\ub10c\ud2b8");var e=(0,o.useState)(0),n=(0,r.Z)(e,2),s=n[0],l=n[1],i=(0,o.useMemo)((function(){return{a:"a",b:"b"}}),[]);return(0,t.jsxs)("section",{className:"memo1",children:[(0,t.jsx)("h3",{children:"Parent Component"}),(0,t.jsxs)("span",{children:["\uc218\ub7c9: ",s]}),(0,t.jsx)("button",{type:"button",onClick:function(){l(s+1)},children:"\ubd80\ubaa8 \uc218\ub7c9 \uc99d\uac00"}),(0,t.jsx)(d,{data:i})]})}function u(e){var n=e.title,s=e.passFn;return console.log("\uc790\uc2dd \ucef4\ud3ec\ub10c\ud2b8"),(0,t.jsxs)("div",{className:"child",children:[(0,t.jsx)("h4",{children:"Child Component"}),(0,t.jsxs)("p",{children:["\uc81c\ubaa9: ",n]}),(0,t.jsx)("button",{onClick:s,children:"\ubd80\ubaa8 \uba54\uc11c\ub4dc \uc2e4\ud589"})]})}var m=(0,o.memo)(u);function x(){console.log("\ubd80\ubaa8 \ucef4\ud3ec\ub10c\ud2b8");var e=(0,o.useState)(0),n=(0,r.Z)(e,2),s=n[0],l=n[1],i=(0,o.useCallback)((function(){console.log("\ubd80\ubaa8 \uba54\uc11c\ub4dc \uc2e4\ud589")}),[]);return(0,t.jsxs)("section",{className:"memo1",children:[(0,t.jsx)("h3",{children:"Parent Component"}),(0,t.jsxs)("span",{children:["\uc218\ub7c9: ",s]}),(0,t.jsx)("button",{type:"button",onClick:function(){l(s+1)},children:"\ubd80\ubaa8 \uc218\ub7c9 \uc99d\uac00"}),(0,t.jsx)(m,{title:"april",passFn:i})]})}var p=(0,o.memo)((function(e){var n=e.name;return console.log("Greeting was rendered at",(new Date).toLocaleTimeString()),(0,t.jsxs)("h3",{children:["Hello",n&&", ",n,"!"]})})),j=function(){var e=(0,o.useState)(""),n=(0,r.Z)(e,2),s=n[0],l=n[1],i=(0,o.useState)(""),c=(0,r.Z)(i,2),a=c[0],d=c[1];return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{style:{display:"flex",gap:"10px"},children:[(0,t.jsxs)("label",{children:["Name",": ",(0,t.jsx)("input",{value:s,onChange:function(e){l(e.target.value)}})]}),(0,t.jsxs)("label",{children:["Address",": ",(0,t.jsx)("input",{value:a,onChange:function(e){d(e.target.value)}})]})]}),(0,t.jsx)(p,{name:s})]})};function g(){var e=(0,o.useState)(""),n=(0,r.Z)(e,2),s=n[0],l=n[1],i=(0,o.useState)(""),c=(0,r.Z)(i,2),a=c[0],d=c[1];return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{style:{display:"flex",gap:"10px"},children:[(0,t.jsxs)("label",{children:["Name",": ",(0,t.jsx)("input",{value:s,onChange:function(e){return l(e.target.value)}})]}),(0,t.jsxs)("label",{children:["Address",": ",(0,t.jsx)("input",{value:a,onChange:function(e){return d(e.target.value)}})]})]}),(0,t.jsx)(f,{name:s})]})}var f=(0,o.memo)((function(e){var n=e.name;console.log("Greeting was rendered at",(new Date).toLocaleTimeString());var s=(0,o.useState)("Hello"),l=(0,r.Z)(s,2),i=l[0],c=l[1];return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("h3",{children:[i,n&&", ",n,"!"]}),(0,t.jsx)(v,{value:i,onChange:c})]})})),v=function(e){var n=e.value,s=e.onChange;return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("label",{children:[(0,t.jsx)("input",{type:"radio",checked:"Hello"===n,onChange:function(){return s("Hello")}}),"Regular greeting"]}),(0,t.jsxs)("label",{children:[(0,t.jsx)("input",{type:"radio",checked:"Hello and welcome"===n,onChange:function(){return s("Hello and welcome")}}),"Enthusiastic greeting"]})]})},C=(0,o.createContext)(null);function b(){var e=(0,o.useState)("dark"),n=(0,r.Z)(e,2),s=n[0],l=n[1];return(0,t.jsxs)(C.Provider,{value:s,children:[(0,t.jsx)("button",{onClick:function(){l((function(e){return"dark"===e?"light":"dark"}))},children:"Switch theme"}),(0,t.jsx)(k,{name:"Taylor"})]})}var k=(0,o.memo)((function(e){var n=e.name;console.log("Greeting was rendered at",(new Date).toLocaleTimeString());var s=(0,o.useContext)(C);if(!s)throw new Error("Theme context is not set!");return(0,t.jsxs)("h3",{className:s,children:["Hello, ",n,"!"]})}));function S(){return(0,t.jsxs)("section",{className:"memoPage",children:[(0,t.jsx)("h1",{children:"React Memo"}),(0,t.jsx)("p",{children:(0,t.jsx)("strong",{children:"prop\uc774 \ubcc0\ub3d9\ub418\uc9c0 \uc54a\uc73c\uba74 \ub9ac\ub80c\ub354\ub9c1\uc744 \ud558\uc9c0 \uc54a\ub294\ub2e4."})}),(0,t.jsx)("code",{className:"code-reference",children:"const MemoizedComponent = memo(SomeComponent, arePropsEqual?)"}),(0,t.jsxs)("ul",{children:[(0,t.jsx)("li",{children:"memo: memoization"}),(0,t.jsx)("li",{children:"\ubd88\ud544\uc694\ud55c \ub80c\ub354\ub9c1\uc744 \ud558\uc9c0 \uc54a\ub294\ub2e4."}),(0,t.jsx)("li",{children:"\ub9ac\uc5d1\ud2b8\ub294 \ubd80\ubaa8 \ucef4\ud3ec\ub10c\ud2b8\uac00 \ub80c\ub354\ub9c1\ub418\uba74 \uc790\uc2dd \ucef4\ud3ec\ub10c\ud2b8\ub85c \uc790\ub3d9\uc73c\ub85c \ub80c\ub354\ub9c1\ub41c\ub2e4."}),(0,t.jsx)("li",{children:"react memo\ub97c \uc801\uc6a9\ud558\uba74 \uc790\uc2dd \ucef4\ud3ec\ub10c\ud2b8\ub97c props\uac00 \ubcc0\uacbd\ub420 \ub54c\ub9cc \ub80c\ub354\ub9c1\ud55c\ub2e4."}),(0,t.jsx)("li",{children:"react memo\ub97c \uc801\uc6a9\ud558\uba74 props\uac00 \ubcc0\uacbd\ub418\uc9c0 \uc54a\uc73c\uba74 \ucef4\ud3ec\ub10c\ud2b8\ub294 \ub9ac\ub80c\ub354\ub9c1\uc744 \ud558\uc9c0 \uc54a\uace0 \uae30\uc874\uc5d0 \ub80c\ub354\ub9c1\ub41c \uac83\uc744 \uc7ac\uc0ac\uc6a9\ud55c\ub2e4."}),(0,t.jsx)("li",{children:"\ub80c\ub354\ub9c1\ub41c \uacb0\uacfc\ub97c \uc5b4\ub518\uac00\uc5d0 \uc800\uc7a5\ud558\uae30 \ub54c\ubb38\uc5d0 \ubb34\ubd84\ubcc4\ud558\uac8c \uc0ac\uc6a9\ud558\uba74 \uc548\ub41c\ub2e4. \uaf2d \ud544\uc694\ud560\ub54c\ub9cc!"}),(0,t.jsx)("li",{children:"useState, useReducer, useContext \uc640 \uac19\uc740 \uc0c1\ud0dc\uc640 \uac19\uc740 hook\uc744 \uc0ac\uc6a9\ud558\uba74 props\uc640 \uc0c1\uad00\uc5c6\uc774 \ub9ac\ub80c\ub354\ub9c1\ub41c\ub2e4."})]}),(0,t.jsx)("h2",{children:"\uac04\ub2e8\ud55c \uc608\uc81c : memo "}),(0,t.jsx)(c,{}),(0,t.jsx)("p",{children:"- \ubd80\ubaa8 props\uac00 \ubcc0\uacbd\ub420 \ub54c\ub9c8\ub2e4 \uc790\uc2dd \ucef4\ud3ec\ud134\ud2b8\uc758 props\uac00 \ubcc0\uacbd\uc774 \uc5c6\uc5b4\ub3c4 \ub9ac\ub80c\ub354\ub9c1\uc774 \ub41c\ub2e4."}),(0,t.jsx)("p",{children:"- React.memo\ub97c \uc0ac\uc6a9\ud558\uba74 \ubd80\ubaa8 props\uac00 \ubcc0\uacbd\ub418\ub354\ub77c\ub3c4 \uc790\uc2dd \ucef4\ud3ec\ub10c\ud2b8\uc758 prop\uc774 \ubcc0\ud654\uac00 \uc5c6\uc73c\uba74 \ub9ac\ub80c\ub354\ub9c1\uc744 \ud558\uc9c0 \uc54a\uace0 \uc800\uc7a5\ub418\uc5c8\ub358 \uac83\uc744 \uc0ac\uc6a9\ud55c\ub2e4."}),(0,t.jsx)("h2",{children:"\uac04\ub2e8\ud55c \uc608\uc81c2: memo, useMemo"}),(0,t.jsx)(h,{}),(0,t.jsx)("p",{children:"- useMemo\ub97c \uc0ac\uc6a9\ud558\uc5ec Child\ub294 \ub9ac\ub80c\ub354\ub9c1\uc774 \ub418\uc9c0 \uc54a\ub294\ub2e4."}),(0,t.jsx)("h2",{children:"\uac04\ub2e8\ud55c \uc608\uc81c3: memo, useCallback"}),(0,t.jsx)(x,{}),(0,t.jsx)("p",{children:"- useCallback \uc0ac\uc6a9\ud558\uc5ec Child\ub294 \ub9ac\ub80c\ub354\ub9c1\uc774 \ub418\uc9c0 \uc54a\ub294\ub2e4."}),(0,t.jsx)("h2",{children:"Skipping re-rendering when props are unchanged"}),(0,t.jsx)(j,{}),(0,t.jsxs)("p",{children:["- name\uc774 \ubcc0\uacbd\ub418\uba74 Greeting component\ub294 \ub9ac\ub80c\ub354\ub9c1\ub41c\ub2e4. ",(0,t.jsx)("br",{}),"but memo\ub97c \uc801\uc6a9\ud558\uc600\uc73c\ubbc0\ub85c address\uac00 \ubcc0\uacbd\ub418\uba74 Greeting component\ub294 \ub9ac\ub80c\ub354\ub9c1\ub418\uc9c0 \uc54a\ub294\ub2e4."]}),(0,t.jsx)("h2",{children:"Updating a memoized component using state"}),(0,t.jsx)(g,{}),(0,t.jsx)("p",{children:"- \ucef4\ud3ec\ub10c\ud2b8\uc758 state\uac00 \ubcc0\uacbd\ub418\uba74 \ucef4\ud3ec\ub10c\ud2b8\uac00 memo \ub418\uc5c8\ub354\ub77c\ub3c4 \ub9ac\ub80c\ub354\ub9c1\ub41c\ub2e4."}),(0,t.jsx)("h2",{children:"Updating a memoized component using a context "}),(0,t.jsx)(b,{}),(0,t.jsx)("p",{children:"memo\ub97c \uc801\uc6a9\ud588\ub354\ub77c\ub3c4 useContext\ub97c \uc0ac\uc6a9\ud558\uace0 \ubcc0\uacbd\ub418\uc5c8\ub2e4\uba74 \ub9ac\ub80c\ub354\ub9c1\ub41c\ub2e4."}),(0,t.jsx)("h2",{children:"Minimizing props changes"}),(0,t.jsx)("p",{children:"- memo\ub97c \ucd5c\ub300\ud55c \ud65c\uc6a9\ud558\ub824\uba74 props\uc758 \ubcc0\uacbd\uc744 \ucd5c\uc18c\ud654"}),(0,t.jsx)("p",{children:"- \uc608, prop\uc774 object \uc774\uba74, useMemo\ub97c \uc0ac\uc6a9\ud558\uc5ec object\uac00 parent component\uac00 \ub9e4\ubc88 object\ub97c re-create \ud558\uc9c0 \uc54a\ub3c4\ub85d \ud55c\ub2e4."}),(0,t.jsxs)("p",{children:["- props\uac00 \ubcc0\uacbd\ub418\ub294 \uac83\uc744 \ucd5c\uc18c\ud654\ud558\uae30 \uc704\ud574, whole object \ub300\uc2e0 individual value\ub97c props\ub85c \uc801\uc6a9\ud558\ub77c.",(0,t.jsx)("code",{children:"<Profile person={person} />"})," \ub300\uc2e0",(0,t.jsx)("code",{children:"<Profile name={name} age={age} />"})]}),(0,t.jsxs)("p",{children:["- \uac12 \uc790\uccb4 \ubcf4\ub2e4\ub294 \uac12\uc758 \uc874\uc7ac \uc5ec\ubd80",(0,t.jsx)("code",{children:"<CallToAction hasGroups={hasGroups} />"})]}),(0,t.jsxs)("h2",{children:["arePropsEqual\uc758 \ud65c\uc6a9 :S pecifying a custom comparison function"," "]})]})}}}]);
//# sourceMappingURL=479.32f1de9d.chunk.js.map