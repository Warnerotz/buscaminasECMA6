!function e(n,t,r){function c(i,o){if(!t[i]){if(!n[i]){var m="function"==typeof require&&require;if(!o&&m)return m(i,!0);if(a)return a(i,!0);var s=new Error("Cannot find module '"+i+"'");throw s.code="MODULE_NOT_FOUND",s}var g=t[i]={exports:{}};n[i][0].call(g.exports,function(e){var t=n[i][1][e];return c(t||e)},g,g.exports,e,n,t,r)}return t[i].exports}for(var a="function"==typeof require&&require,i=0;i<r.length;i++)c(r[i]);return c}({1:[function(e,n,t){"use strict";window.onload=function(){function e(){h="prin"==this.id?1:2,n(),L=r(),C=c(L),o(),t()}function n(){switch(h){case 1:k=9,x=10;break;case 2:k=10,x=15}M=k*k-x}function t(){document.createElement("div");var e=document.createElement("table");e.setAttribute("id","tablaTablero");for(var n=0;n<k;n++){for(var t=document.createElement("tr"),r=0;r<k;r++){var c=document.createElement("td");c.setAttribute("id",n+"_"+r),c.setAttribute("class","celdas");var a=document.createElement("img");a.setAttribute("id","imagen-"+n+"_"+r),a.src="img/facingDown.png",c.appendChild(a),t.appendChild(c)}e.appendChild(t)}document.getElementById("tablero").appendChild(e),u()}function r(){for(var e=[],n=0;n<k;n++)e[n]=[];for(n=0;n<k;n++)for(var t=0;t<k;t++)e[n][t]=0;return e}function c(e){for(var n=x;n>0;){var t=Math.floor(Math.random()*k),r=Math.floor(Math.random()*k);0==e[t][r]&&(e[t][r]="*",n--)}return e}function a(e,n){var t=0;return e<0||e>=k||n<0||n>=k?t=0:"*"==C[e][n]&&(t=1),t}function i(e,n){return a(e-1,n-1)+a(e-1,n)+a(e-1,n+1)+a(e,n-1)+a(e,n)+a(e,n+1)+a(e+1,n-1)+a(e+1,n)+a(e+1,n+1)}function o(){for(var e=0;e<k;e++)for(var n=0;n<k;n++)"*"==C[e][n]&&(C[e][n]=i(e,n))}function m(e){if(0==(e||window.Event).button&&document.getElementById("imagen-"+this.id).src==l.src){var n=this.id.split("_");g(n[0],n[1])}}function s(e){}function g(e,n){if(e>=0&&e<k&&n>=0&&n<k&&document.getElementById("imagen-"+e+"_"+n).src==l.src){switch(C[e][n]){case 1:document.getElementById("imagen-"+e+"_"+n).src=p.src;break;case 2:document.getElementById("imagen-"+e+"_"+n).src=E.src;break;case 3:document.getElementById("imagen-"+e+"_"+n).src=v.src;break;case 4:document.getElementById("imagen-"+e+"_"+n).src=w.src;break;case 5:document.getElementById("imagen-"+e+"_"+n).src=y.src;break;case 6:document.getElementById("imagen-"+e+"_"+n).src=b.src;break;case 7:document.getElementById("imagen-"+e+"_"+n).src=_.src;break;case 8:document.getElementById("imagen-"+e+"_"+n).src=B.src;break;case 0:document.getElementById("imagen-"+e+"_"+n).src=I.src,d(e,n);break;case"*":document.getElementById("imagen-"+e+"_"+n).src=f.src}M--}}function d(e,n){for(var t=parseInt(e)-1;t<=parseInt(e)+1;t++)for(var r=parseInt(n)-1;r<=parseInt(n)+1;r++)t>=0&&t<k&&r>=0&&r<k&&document.getElementById("imagen-"+t+"_"+r).src==l.src&&"*"!=C[t][r]&&(console.log(document.getElementById("imagen-"+t+"_"+r).src),console.log("blanco.src "+l.src),console.log("minas[i][j] "+C[t][r]),console.log(t+" "+r),g(t,r))}function u(){for(var e=0;e<k;e++)for(var n=0;n<k;n++)document.getElementById(e+"_"+n).addEventListener("click",m,!1),document.getElementById(e+"_"+n).addEventListener("contextmenu",s,!1)}var l,f,I,p,E,v,w,y,b,_,B,h=0,k=0,x=0,C=[],L=[],M=0;(l=new Image).src="img/facingDown.png",(new Image).src="img/flagged.png",(f=new Image).src="img/fallo.gif",(I=new Image).src="img/0.png",(p=new Image).src="img/1.png",(E=new Image).src="img/2.png",(v=new Image).src="img/3.png",(w=new Image).src="img/4.png",(y=new Image).src="img/5.png",(b=new Image).src="img/6.png",(_=new Image).src="img/7.png",(B=new Image).src="img/8.png",document.getElementById("prin").addEventListener("click",e,!1),document.getElementById("inter").addEventListener("click",e,!1)}},{}]},{},[1]);