(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var databaseinfo = require("./databaseinfo.json");

module.exports = {

    QUERY_SYSTEM: {
        innerTextNodeClass: "InTextN",
        innerTextEdgeClass: "InTextE",
        outerTextNodeClass: "OuTextN",
        outerTextEdgeClass: "OuTextE",
        outerTextClass: "OutText",
        graphClass: "Graph",
        nodeClass: "Node",
        nodesClass: "Nodes",
        edgeClass: "Edge",
        edgesClass: "Edges",
        nodeRadius: 45,
        rectangleWidth:40,
        delete: 68,
        outcomeAttributes: databaseinfo.outcome_attributes,
        nodeAttributes: databaseinfo.node_attributes,
        edgeAttributes: databaseinfo.edge_attributes,
        types: databaseinfo.types
    },

    QUERY_FORM:{
        nodeAttributes: databaseinfo.outcome_attributes,
        ID: "ID"
    }

};
},{"./databaseinfo.json":2}],2:[function(require,module,exports){
module.exports={
  "outcome_attributes": [
    {
      "name": "diagnosis1",
      "display": "Diagnosis",
      "type": "diagnosis1"
    },
    {
      "name": "diagnosis2",
      "display": "Morphology Code",
      "type": "number"
    },
    {
      "name": "lab_nr",
      "display": "Laboratory Number",
      "type": "number"
    },
    {
      "name": "reg",
      "display": "Region",
      "type": "region"
    },
    {
      "name": "stage",
      "display": "Stage",
      "type": "stage"
    },
    {
      "name": "type",
      "display": "Type of Exam",
      "type": "type"
    }
  ],
  "node_attributes": [
    {
      "name": "age",
      "display": "Age",
      "type": "month"
    },
    {
      "name": "birthdate",
      "display": "Birthdate",
      "type": "month"
    },
    {
      "name": "censordate",
      "display": "Censor Date",
      "type": "month"
    },
    {
      "name": "diagnosisdate",
      "display": "Diagnosis Date",
      "type": "month"
    },
    {
      "name": "diagnosis1",
      "display": "Diagnosis",
      "type": "diagnosis1"
    },
    {
      "name": "diagnosis2",
      "display": "Morphology Code",
      "type": "number"
    },
    {
      "name": "lab_nr",
      "display": "Laboratory Number",
      "type": "number"
    },
    {
      "name": "reg",
      "display": "Region",
      "type": "region"
    },
    {
      "name": "stage",
      "display": "Stage",
      "type": "stage"
    },
    {
      "name": "type",
      "display": "Type of Exam",
      "type": "type"
    }
  ],
  "edge_attributes": [
    {
      "name": "sincelast",
      "display": "Time Interval",
      "type": "time_interval"
    },
    {
      "name": "type",
      "display": "Exam Interval",
      "type": "number"
    }
  ],
  "types": {
    "month": {
      "constraints": [
        [
          ">",
          "bigger than"
        ],
        [
          "<",
          "smaller than"
        ]
      ],
      "values": "months",
      "display": "months"
    },
    "diagnosis1": {
      "constraints": [
        [
          "==",
          "is"
        ],
        [
          "<>",
          "is not"
        ]
      ],
      "values": {
        "0": "HPV: Positive",
        "1": "HPV: Negative",
        "9": "HPV: Unsatisfactory",
        "11": "Cyt: Normal",
        "12": "Cyt: ASC-US",
        "13": "Cyt: LSIL",
        "14": "Cyt: ASC-H",
        "15": "Cyt: AGUS/ACIS",
        "16": "Cyt: HSIL",
        "17": "Cyt: Cancer",
        "18": "Cyt: Metastasis",
        "10": "Cyt/Hist: Unsatisfactory",
        "20": "Hist: Benign",
        "21": "Hist: Polyp",
        "22": "Hist: Beningn without atypia",
        "30": "Hist: Unsure B.",
        "31": "Hist: CIN1",
        "32": "Hist: CIN2",
        "33": "Hist: CIN3",
        "34": "Hist: Irregular",
        "35": "Hist: ACIS",
        "99": "Hist: Unknown Morphology",
        "41": "Canc: Squamous cell carcinoma",
        "42": "Adenocarcinoma",
        "43": "Canc: Other Cancers"
      },
      "display": {
        "-2": {
          "text": "Origin",
          "color": "#00ffff"
        },
        "-1": {
          "text": "Nothing",
          "color": "#00cccc"
        },
        "0": {
          "text": "HPV+",
          "color": "#cc0066"
        },
        "1": {
          "text": "HPV-",
          "color": "#ff80bf"
        },
        "9": {
          "text": "HPV?",
          "color": "#5c8a8a"
        },
        "11": {
          "text": "Cyt: Normal",
          "color": "#d6e0f5"
        },
        "12": {
          "text": "Cyt: ASC-US",
          "color": "#98b1e6"
        },
        "13": {
          "text": "Cyt: LSIL",
          "color": "#6f92dc"
        },
        "14": {
          "text": "Cyt: ASC-H",
          "color": "#4673d2"
        },
        "15": {
          "text": "Cyt: AGUS/ACIS",
          "color": "#2d59b9"
        },
        "16": {
          "text": "Cyt: HSIL",
          "color": "#234590"
        },
        "17": {
          "text": "Cyt: Cancer",
          "color": "#193167"
        },
        "18": {
          "text": "Cyt: Metastasis",
          "color": "#0f1e3e"
        },
        "10": {
          "text": "Cyt/Hist?",
          "color": "#5c8a8a"
        },
        "20": {
          "text": "Hist: Benign",
          "color": "#5353c6"
        },
        "21": {
          "text": "Hist: Polyp",
          "color": "#3939ac"
        },
        "22": {
          "text": "Hist: Benign w/ a",
          "color": "#2d2d86"
        },
        "30": {
          "text": "Hist: Unsure B.",
          "color": "#5c8a8a"
        },
        "31": {
          "text": "Hist: CIN1",
          "color": "#19194d"
        },
        "32": {
          "text": "Hist: CIN2",
          "color": "#131339"
        },
        "33": {
          "text": "Hist: CIN3",
          "color": "#0d0d26"
        },
        "34": {
          "text": "Hist: Irregular",
          "color": "#3d0099"
        },
        "99": {
          "text": "Hist: Unknown",
          "color": "#330080"
        },
        "35": {
          "text": "Hist: ACIS",
          "color": "#330080"
        },
        "41": {
          "text": "Cancer: SCC",
          "color": "#336600"
        },
        "42": {
          "text": "Adenocarcinoma",
          "color": "#264d00"
        },
        "43": {
          "text": "Cancer: Other",
          "color": "#1a3300"
        }
      }
    },
    "region": {
      "constraints": [
        [
          "==",
          "is"
        ],
        [
          "<>",
          "is not"
        ]
      ],
      "values": {
        "1": "South-East",
        "2": "Middle",
        "3": "West",
        "4": "North",
        "9": "Unknown",
      },
      "display": "std"
    },
    "stage": {
      "constraints": [
        [
          "==",
          "is"
        ],
        [
          "<>",
          "is not"
        ]
      ],
      "values": {
        "100": "Stage 1",
        "110": "Stage 1a",
        "111": "Stage 1a1",
        "112": "Stage 1a22",
        "120": "Stage 1b",
        "200": "Stage 2",
        "210": "Stage 2a",
        "220": "Stage 2b2",
        "300": "Stage 3",
        "310": "Stage 3a",
        "320": "Stage 3b",
        "400": "Stage 4",
        "410": "Stage 4a",
        "420": "Stage 4b",
        "900": "Unknown stage",
        "999": "Unspecified stage"
      },
      "display": "std"
    },
    "type": {
      "constraints": [
        [
          "==",
          "is"
        ],
        [
          "<>",
          "is not"
        ]
      ],
      "values": {
        "cyt": "Cytological Smear",
        "hist": "Histological Sample",
        "hpv": "HPV Test",
        "cancer": "Cancer Diagnosis"
      },
      "display": "std"
    },
    "number": {
      "constraints": [
        [
          ">",
          "bigger than"
        ],
        [
          "<",
          "smaller than"
        ],
        [
          "==",
          "is"
        ]
      ],
      "values": "number",
      "display": "none"
    },
    "time_interval": {
      "constraints": [
        [
          ">",
          "bigger than"
        ],
        [
          "<",
          "smaller than"
        ],
        [
          "==",
          "is"
        ]
      ],
      "values": "time_interval",
      "display": "none"
    }
  }
}
},{}],3:[function(require,module,exports){
// https://d3js.org Version 4.1.1. Copyright 2016 Mike Bostock.
!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(t.d3=t.d3||{})}(this,function(t){"use strict";function n(t,n){return t<n?-1:t>n?1:t>=n?0:NaN}function e(t){return 1===t.length&&(t=r(t)),{left:function(n,e,r,i){for(null==r&&(r=0),null==i&&(i=n.length);r<i;){var o=r+i>>>1;t(n[o],e)<0?r=o+1:i=o}return r},right:function(n,e,r,i){for(null==r&&(r=0),null==i&&(i=n.length);r<i;){var o=r+i>>>1;t(n[o],e)>0?i=o:r=o+1}return r}}}function r(t){return function(e,r){return n(t(e),r)}}function i(t,n){return n<t?-1:n>t?1:n>=t?0:NaN}function o(t){return null===t?NaN:+t}function u(t,n){var e,r,i=t.length,u=0,a=0,c=-1,s=0;if(null==n)for(;++c<i;)isNaN(e=o(t[c]))||(r=e-u,u+=r/++s,a+=r*(e-u));else for(;++c<i;)isNaN(e=o(n(t[c],c,t)))||(r=e-u,u+=r/++s,a+=r*(e-u));if(s>1)return a/(s-1)}function a(t,n){var e=u(t,n);return e?Math.sqrt(e):e}function c(t,n){var e,r,i,o=-1,u=t.length;if(null==n){for(;++o<u;)if(null!=(r=t[o])&&r>=r){e=i=r;break}for(;++o<u;)null!=(r=t[o])&&(e>r&&(e=r),i<r&&(i=r))}else{for(;++o<u;)if(null!=(r=n(t[o],o,t))&&r>=r){e=i=r;break}for(;++o<u;)null!=(r=n(t[o],o,t))&&(e>r&&(e=r),i<r&&(i=r))}return[e,i]}function s(t){return function(){return t}}function f(t){return t}function l(t,n,e){t=+t,n=+n,e=(i=arguments.length)<2?(n=t,t=0,1):i<3?1:+e;for(var r=-1,i=0|Math.max(0,Math.ceil((n-t)/e)),o=new Array(i);++r<i;)o[r]=t+r*e;return o}function h(t,n,e){var r=p(t,n,e);return l(Math.ceil(t/r)*r,Math.floor(n/r)*r+r/2,r)}function p(t,n,e){var r=Math.abs(n-t)/Math.max(0,e),i=Math.pow(10,Math.floor(Math.log(r)/Math.LN10)),o=r/i;return o>=Pd?i*=10:o>=qd?i*=5:o>=Ld&&(i*=2),n<t?-i:i}function d(t){return Math.ceil(Math.log(t.length)/Math.LN2)+1}function v(){function t(t){var i,o,u=t.length,a=new Array(u);for(i=0;i<u;++i)a[i]=n(t[i],i,t);var c=e(a),s=c[0],f=c[1],l=r(a,s,f);Array.isArray(l)||(l=h(s,f,l));for(var p=l.length;l[0]<=s;)l.shift(),--p;for(;l[p-1]>=f;)l.pop(),--p;var d,v=new Array(p+1);for(i=0;i<=p;++i)d=v[i]=[],d.x0=i>0?l[i-1]:s,d.x1=i<p?l[i]:f;for(i=0;i<u;++i)o=a[i],s<=o&&o<=f&&v[Sd(l,o,0,p)].push(t[i]);return v}var n=f,e=c,r=d;return t.value=function(e){return arguments.length?(n="function"==typeof e?e:s(e),t):n},t.domain=function(n){return arguments.length?(e="function"==typeof n?n:s([n[0],n[1]]),t):e},t.thresholds=function(n){return arguments.length?(r="function"==typeof n?n:s(Array.isArray(n)?Cd.call(n):n),t):r},t}function _(t,n,e){if(null==e&&(e=o),r=t.length){if((n=+n)<=0||r<2)return+e(t[0],0,t);if(n>=1)return+e(t[r-1],r-1,t);var r,i=(r-1)*n,u=Math.floor(i),a=+e(t[u],u,t),c=+e(t[u+1],u+1,t);return a+(c-a)*(i-u)}}function y(t,e,r){return t=zd.call(t,o).sort(n),Math.ceil((r-e)/(2*(_(t,.75)-_(t,.25))*Math.pow(t.length,-1/3)))}function g(t,n,e){return Math.ceil((e-n)/(3.5*a(t)*Math.pow(t.length,-1/3)))}function m(t,n){var e,r,i=-1,o=t.length;if(null==n){for(;++i<o;)if(null!=(r=t[i])&&r>=r){e=r;break}for(;++i<o;)null!=(r=t[i])&&r>e&&(e=r)}else{for(;++i<o;)if(null!=(r=n(t[i],i,t))&&r>=r){e=r;break}for(;++i<o;)null!=(r=n(t[i],i,t))&&r>e&&(e=r)}return e}function x(t,n){var e,r=0,i=t.length,u=-1,a=i;if(null==n)for(;++u<i;)isNaN(e=o(t[u]))?--a:r+=e;else for(;++u<i;)isNaN(e=o(n(t[u],u,t)))?--a:r+=e;if(a)return r/a}function b(t,e){var r,i=[],u=t.length,a=-1;if(null==e)for(;++a<u;)isNaN(r=o(t[a]))||i.push(r);else for(;++a<u;)isNaN(r=o(e(t[a],a,t)))||i.push(r);return _(i.sort(n),.5)}function w(t){for(var n,e,r,i=t.length,o=-1,u=0;++o<i;)u+=t[o].length;for(e=new Array(u);--i>=0;)for(r=t[i],n=r.length;--n>=0;)e[--u]=r[n];return e}function M(t,n){var e,r,i=-1,o=t.length;if(null==n){for(;++i<o;)if(null!=(r=t[i])&&r>=r){e=r;break}for(;++i<o;)null!=(r=t[i])&&e>r&&(e=r)}else{for(;++i<o;)if(null!=(r=n(t[i],i,t))&&r>=r){e=r;break}for(;++i<o;)null!=(r=n(t[i],i,t))&&e>r&&(e=r)}return e}function T(t){for(var n=0,e=t.length-1,r=t[0],i=new Array(e<0?0:e);n<e;)i[n]=[r,r=t[++n]];return i}function k(t,n){for(var e=n.length,r=new Array(e);e--;)r[e]=t[n[e]];return r}function N(t,e){if(r=t.length){var r,i,o=0,u=0,a=t[u];for(e||(e=n);++o<r;)(e(i=t[o],a)<0||0!==e(a,a))&&(a=i,u=o);return 0===e(a,a)?u:void 0}}function S(t,n,e){for(var r,i,o=(null==e?t.length:e)-(n=null==n?0:+n);o;)i=Math.random()*o--|0,r=t[o+n],t[o+n]=t[i+n],t[i+n]=r;return t}function A(t,n){var e,r=0,i=t.length,o=-1;if(null==n)for(;++o<i;)(e=+t[o])&&(r+=e);else for(;++o<i;)(e=+n(t[o],o,t))&&(r+=e);return r}function E(t){if(!(i=t.length))return[];for(var n=-1,e=M(t,C),r=new Array(e);++n<e;)for(var i,o=-1,u=r[n]=new Array(i);++o<i;)u[o]=t[o][n];return r}function C(t){return t.length}function z(){return E(arguments)}function P(){}function q(t,n){var e=new P;if(t instanceof P)t.each(function(t,n){e.set(n,t)});else if(Array.isArray(t)){var r,i=-1,o=t.length;if(null==n)for(;++i<o;)e.set(i,t[i]);else for(;++i<o;)e.set(n(r=t[i],i,t),r)}else if(t)for(var u in t)e.set(u,t[u]);return e}function L(){function t(n,i,u,a){if(i>=o.length)return null!=r?r(n):null!=e?n.sort(e):n;for(var c,s,f,l=-1,h=n.length,p=o[i++],d=q(),v=u();++l<h;)(f=d.get(c=p(s=n[l])+""))?f.push(s):d.set(c,[s]);return d.each(function(n,e){a(v,e,t(n,i,u,a))}),v}function n(t,e){if(++e>o.length)return t;var i,a=u[e-1];return null!=r&&e>=o.length?i=t.entries():(i=[],t.each(function(t,r){i.push({key:r,values:n(t,e)})})),null!=a?i.sort(function(t,n){return a(t.key,n.key)}):i}var e,r,i,o=[],u=[];return i={object:function(n){return t(n,0,R,U)},map:function(n){return t(n,0,D,O)},entries:function(e){return n(t(e,0,D,O),0)},key:function(t){return o.push(t),i},sortKeys:function(t){return u[o.length-1]=t,i},sortValues:function(t){return e=t,i},rollup:function(t){return r=t,i}}}function R(){return{}}function U(t,n,e){t[n]=e}function D(){return q()}function O(t,n,e){t.set(n,e)}function F(){}function I(t,n){var e=new F;if(t instanceof F)t.each(function(t){e.add(t)});else if(t){var r=-1,i=t.length;if(null==n)for(;++r<i;)e.add(t[r]);else for(;++r<i;)e.add(n(t[r],r,t))}return e}function Y(t){var n=[];for(var e in t)n.push(e);return n}function B(t){var n=[];for(var e in t)n.push(t[e]);return n}function j(t){var n=[];for(var e in t)n.push({key:e,value:t[e]});return n}function H(t,n){return t=null==t?0:+t,n=null==n?1:+n,1===arguments.length?(n=t,t=0):n-=t,function(){return Math.random()*n+t}}function X(t,n){var e,r;return t=null==t?0:+t,n=null==n?1:+n,function(){var i;if(null!=e)i=e,e=null;else do e=2*Math.random()-1,i=2*Math.random()-1,r=e*e+i*i;while(!r||r>1);return t+n*i*Math.sqrt(-2*Math.log(r)/r)}}function V(){var t=X.apply(this,arguments);return function(){return Math.exp(t())}}function W(t){return function(){for(var n=0,e=0;e<t;++e)n+=Math.random();return n}}function $(t){var n=W(t);return function(){return n()/t}}function Z(t){return function(){return-Math.log(1-Math.random())/t}}function G(t){return+t}function J(t){return t*t}function Q(t){return t*(2-t)}function K(t){return((t*=2)<=1?t*t:--t*(2-t)+1)/2}function tt(t){return t*t*t}function nt(t){return--t*t*t+1}function et(t){return((t*=2)<=1?t*t*t:(t-=2)*t*t+2)/2}function rt(t){return 1-Math.cos(t*Bd)}function it(t){return Math.sin(t*Bd)}function ot(t){return(1-Math.cos(Yd*t))/2}function ut(t){return Math.pow(2,10*t-10)}function at(t){return 1-Math.pow(2,-10*t)}function ct(t){return((t*=2)<=1?Math.pow(2,10*t-10):2-Math.pow(2,10-10*t))/2}function st(t){return 1-Math.sqrt(1-t*t)}function ft(t){return Math.sqrt(1- --t*t)}function lt(t){return((t*=2)<=1?1-Math.sqrt(1-t*t):Math.sqrt(1-(t-=2)*t)+1)/2}function ht(t){return 1-pt(1-t)}function pt(t){return(t=+t)<jd?Qd*t*t:t<Xd?Qd*(t-=Hd)*t+Vd:t<$d?Qd*(t-=Wd)*t+Zd:Qd*(t-=Gd)*t+Jd}function dt(t){return((t*=2)<=1?1-pt(1-t):pt(t-1)+1)/2}function vt(t){for(var n,e=-1,r=t.length,i=t[r-1],o=0;++e<r;)n=i,i=t[e],o+=n[1]*i[0]-n[0]*i[1];return o/2}function _t(t){for(var n,e,r=-1,i=t.length,o=0,u=0,a=t[i-1],c=0;++r<i;)n=a,a=t[r],c+=e=n[0]*a[1]-a[0]*n[1],o+=(n[0]+a[0])*e,u+=(n[1]+a[1])*e;return c*=3,[o/c,u/c]}function yt(t,n,e){return(n[0]-t[0])*(e[1]-t[1])-(n[1]-t[1])*(e[0]-t[0])}function gt(t,n){return t[0]-n[0]||t[1]-n[1]}function mt(t){for(var n=t.length,e=[0,1],r=2,i=2;i<n;++i){for(;r>1&&yt(t[e[r-2]],t[e[r-1]],t[i])<=0;)--r;e[r++]=i}return e.slice(0,r)}function xt(t){if((e=t.length)<3)return null;var n,e,r=new Array(e),i=new Array(e);for(n=0;n<e;++n)r[n]=[+t[n][0],+t[n][1],n];for(r.sort(gt),n=0;n<e;++n)i[n]=[r[n][0],-r[n][1]];var o=mt(r),u=mt(i),a=u[0]===o[0],c=u[u.length-1]===o[o.length-1],s=[];for(n=o.length-1;n>=0;--n)s.push(t[r[o[n]][2]]);for(n=+a;n<u.length-c;++n)s.push(t[r[u[n]][2]]);return s}function bt(t,n){for(var e,r,i=t.length,o=t[i-1],u=n[0],a=n[1],c=o[0],s=o[1],f=!1,l=0;l<i;++l)o=t[l],e=o[0],r=o[1],r>a!=s>a&&u<(c-e)*(a-r)/(s-r)+e&&(f=!f),c=e,s=r;return f}function wt(t){for(var n,e,r=-1,i=t.length,o=t[i-1],u=o[0],a=o[1],c=0;++r<i;)n=u,e=a,o=t[r],u=o[0],a=o[1],n-=u,e-=a,c+=Math.sqrt(n*n+e*e);return c}function Mt(){this._x0=this._y0=this._x1=this._y1=null,this._=[]}function Tt(){return new Mt}function kt(t){var n=+this._x.call(null,t),e=+this._y.call(null,t);return Nt(this.cover(n,e),n,e,t)}function Nt(t,n,e,r){if(isNaN(n)||isNaN(e))return t;var i,o,u,a,c,s,f,l,h,p=t._root,d={data:r},v=t._x0,_=t._y0,y=t._x1,g=t._y1;if(!p)return t._root=d,t;for(;p.length;)if((s=n>=(o=(v+y)/2))?v=o:y=o,(f=e>=(u=(_+g)/2))?_=u:g=u,i=p,!(p=p[l=f<<1|s]))return i[l]=d,t;if(a=+t._x.call(null,p.data),c=+t._y.call(null,p.data),n===a&&e===c)return d.next=p,i?i[l]=d:t._root=d,t;do i=i?i[l]=new Array(4):t._root=new Array(4),(s=n>=(o=(v+y)/2))?v=o:y=o,(f=e>=(u=(_+g)/2))?_=u:g=u;while((l=f<<1|s)===(h=(c>=u)<<1|a>=o));return i[h]=p,i[l]=d,t}function St(t){var n,e,r,i,o=t.length,u=new Array(o),a=new Array(o),c=1/0,s=1/0,f=-(1/0),l=-(1/0);for(e=0;e<o;++e)isNaN(r=+this._x.call(null,n=t[e]))||isNaN(i=+this._y.call(null,n))||(u[e]=r,a[e]=i,r<c&&(c=r),r>f&&(f=r),i<s&&(s=i),i>l&&(l=i));for(f<c&&(c=this._x0,f=this._x1),l<s&&(s=this._y0,l=this._y1),this.cover(c,s).cover(f,l),e=0;e<o;++e)Nt(this,u[e],a[e],t[e]);return this}function At(t,n){if(isNaN(t=+t)||isNaN(n=+n))return this;var e=this._x0,r=this._y0,i=this._x1,o=this._y1;if(isNaN(e))i=(e=Math.floor(t))+1,o=(r=Math.floor(n))+1;else{if(!(e>t||t>i||r>n||n>o))return this;var u,a,c=i-e,s=this._root;switch(a=(n<(r+o)/2)<<1|t<(e+i)/2){case 0:do u=new Array(4),u[a]=s,s=u;while(c*=2,i=e+c,o=r+c,t>i||n>o);break;case 1:do u=new Array(4),u[a]=s,s=u;while(c*=2,e=i-c,o=r+c,e>t||n>o);break;case 2:do u=new Array(4),u[a]=s,s=u;while(c*=2,i=e+c,r=o-c,t>i||r>n);break;case 3:do u=new Array(4),u[a]=s,s=u;while(c*=2,e=i-c,r=o-c,e>t||r>n)}this._root&&this._root.length&&(this._root=s)}return this._x0=e,this._y0=r,this._x1=i,this._y1=o,this}function Et(){var t=[];return this.visit(function(n){if(!n.length)do t.push(n.data);while(n=n.next)}),t}function Ct(t){return arguments.length?this.cover(+t[0][0],+t[0][1]).cover(+t[1][0],+t[1][1]):isNaN(this._x0)?void 0:[[this._x0,this._y0],[this._x1,this._y1]]}function zt(t,n,e,r,i){this.node=t,this.x0=n,this.y0=e,this.x1=r,this.y1=i}function Pt(t,n,e){var r,i,o,u,a,c,s,f=this._x0,l=this._y0,h=this._x1,p=this._y1,d=[],v=this._root;for(v&&d.push(new zt(v,f,l,h,p)),null==e?e=1/0:(f=t-e,l=n-e,h=t+e,p=n+e,e*=e);c=d.pop();)if(!(!(v=c.node)||(i=c.x0)>h||(o=c.y0)>p||(u=c.x1)<f||(a=c.y1)<l))if(v.length){var _=(i+u)/2,y=(o+a)/2;d.push(new zt(v[3],_,y,u,a),new zt(v[2],i,y,_,a),new zt(v[1],_,o,u,y),new zt(v[0],i,o,_,y)),(s=(n>=y)<<1|t>=_)&&(c=d[d.length-1],d[d.length-1]=d[d.length-1-s],d[d.length-1-s]=c)}else{var g=t-+this._x.call(null,v.data),m=n-+this._y.call(null,v.data),x=g*g+m*m;if(x<e){var b=Math.sqrt(e=x);f=t-b,l=n-b,h=t+b,p=n+b,r=v.data}}return r}function qt(t){if(isNaN(o=+this._x.call(null,t))||isNaN(u=+this._y.call(null,t)))return this;var n,e,r,i,o,u,a,c,s,f,l,h,p=this._root,d=this._x0,v=this._y0,_=this._x1,y=this._y1;if(!p)return this;if(p.length)for(;;){if((s=o>=(a=(d+_)/2))?d=a:_=a,(f=u>=(c=(v+y)/2))?v=c:y=c,n=p,!(p=p[l=f<<1|s]))return this;if(!p.length)break;(n[l+1&3]||n[l+2&3]||n[l+3&3])&&(e=n,h=l)}for(;p.data!==t;)if(r=p,!(p=p.next))return this;return(i=p.next)&&delete p.next,r?(i?r.next=i:delete r.next,this):n?(i?n[l]=i:delete n[l],(p=n[0]||n[1]||n[2]||n[3])&&p===(n[3]||n[2]||n[1]||n[0])&&!p.length&&(e?e[h]=p:this._root=p),this):(this._root=i,this)}function Lt(t){for(var n=0,e=t.length;n<e;++n)this.remove(t[n]);return this}function Rt(){return this._root}function Ut(){var t=0;return this.visit(function(n){if(!n.length)do++t;while(n=n.next)}),t}function Dt(t){var n,e,r,i,o,u,a=[],c=this._root;for(c&&a.push(new zt(c,this._x0,this._y0,this._x1,this._y1));n=a.pop();)if(!t(c=n.node,r=n.x0,i=n.y0,o=n.x1,u=n.y1)&&c.length){var s=(r+o)/2,f=(i+u)/2;(e=c[3])&&a.push(new zt(e,s,f,o,u)),(e=c[2])&&a.push(new zt(e,r,f,s,u)),(e=c[1])&&a.push(new zt(e,s,i,o,f)),(e=c[0])&&a.push(new zt(e,r,i,s,f))}return this}function Ot(t){var n,e=[],r=[];for(this._root&&e.push(new zt(this._root,this._x0,this._y0,this._x1,this._y1));n=e.pop();){var i=n.node;if(i.length){var o,u=n.x0,a=n.y0,c=n.x1,s=n.y1,f=(u+c)/2,l=(a+s)/2;(o=i[0])&&e.push(new zt(o,u,a,f,l)),(o=i[1])&&e.push(new zt(o,f,a,c,l)),(o=i[2])&&e.push(new zt(o,u,l,f,s)),(o=i[3])&&e.push(new zt(o,f,l,c,s))}r.push(n)}for(;n=r.pop();)t(n.node,n.x0,n.y0,n.x1,n.y1);return this}function Ft(t){return t[0]}function It(t){return arguments.length?(this._x=t,this):this._x}function Yt(t){return t[1]}function Bt(t){return arguments.length?(this._y=t,this):this._y}function jt(t,n,e){var r=new Ht(null==n?Ft:n,null==e?Yt:e,NaN,NaN,NaN,NaN);return null==t?r:r.addAll(t)}function Ht(t,n,e,r,i,o){this._x=t,this._y=n,this._x0=e,this._y0=r,this._x1=i,this._y1=o,this._root=void 0}function Xt(t){for(var n={data:t.data},e=n;t=t.next;)e=e.next={data:t.data};return n}function Vt(t){if(!(t>=1))throw new Error;this._size=t,this._call=this._error=null,this._tasks=[],this._data=[],this._waiting=this._active=this._ended=this._start=0}function Wt(t){if(!t._start)try{$t(t)}catch(n){t._tasks[t._ended+t._active-1]&&Gt(t,n)}}function $t(t){for(;t._start=t._waiting&&t._active<t._size;){var n=t._ended+t._active,e=t._tasks[n],r=e.length-1,i=e[r];e[r]=Zt(t,n),--t._waiting,++t._active,e=i.apply(null,e),t._tasks[n]&&(t._tasks[n]=e||vv)}}function Zt(t,n){return function(e,r){t._tasks[n]&&(--t._active,++t._ended,t._tasks[n]=null,null==t._error&&(null!=e?Gt(t,e):(t._data[n]=r,t._waiting?Wt(t):Jt(t))))}}function Gt(t,n){var e,r=t._tasks.length;for(t._error=n,t._data=void 0,t._waiting=NaN;--r>=0;)if((e=t._tasks[r])&&(t._tasks[r]=null,e.abort))try{e.abort()}catch(t){}t._active=NaN,Jt(t)}function Jt(t){!t._active&&t._call&&t._call(t._error,t._data)}function Qt(t){return new Vt(arguments.length?+t:1/0)}function Kt(t){return function(){return t}}function tn(t){return t.innerRadius}function nn(t){return t.outerRadius}function en(t){return t.startAngle}function rn(t){return t.endAngle}function on(t){return t&&t.padAngle}function un(t){return t>=1?gv:t<=-1?-gv:Math.asin(t)}function an(t,n,e,r,i,o,u,a){var c=e-t,s=r-n,f=u-i,l=a-o,h=(f*(n-o)-l*(t-i))/(l*c-f*s);return[t+h*c,n+h*s]}function cn(t,n,e,r,i,o,u){var a=t-e,c=n-r,s=(u?o:-o)/Math.sqrt(a*a+c*c),f=s*c,l=-s*a,h=t+f,p=n+l,d=e+f,v=r+l,_=(h+d)/2,y=(p+v)/2,g=d-h,m=v-p,x=g*g+m*m,b=i-o,w=h*v-d*p,M=(m<0?-1:1)*Math.sqrt(Math.max(0,b*b*x-w*w)),T=(w*m-g*M)/x,k=(-w*g-m*M)/x,N=(w*m+g*M)/x,S=(-w*g+m*M)/x,A=T-_,E=k-y,C=N-_,z=S-y;return A*A+E*E>C*C+z*z&&(T=N,k=S),{cx:T,cy:k,x01:-f,y01:-l,x11:T*(i/b-1),y11:k*(i/b-1)}}function sn(){function t(){var t,s,f=+n.apply(this,arguments),l=+e.apply(this,arguments),h=o.apply(this,arguments)-gv,p=u.apply(this,arguments)-gv,d=Math.abs(p-h),v=p>h;if(c||(c=t=Tt()),l<f&&(s=l,l=f,f=s),l>_v)if(d>mv-_v)c.moveTo(l*Math.cos(h),l*Math.sin(h)),c.arc(0,0,l,h,p,!v),f>_v&&(c.moveTo(f*Math.cos(p),f*Math.sin(p)),c.arc(0,0,f,p,h,v));else{var _,y,g=h,m=p,x=h,b=p,w=d,M=d,T=a.apply(this,arguments)/2,k=T>_v&&(i?+i.apply(this,arguments):Math.sqrt(f*f+l*l)),N=Math.min(Math.abs(l-f)/2,+r.apply(this,arguments)),S=N,A=N;if(k>_v){var E=un(k/f*Math.sin(T)),C=un(k/l*Math.sin(T));(w-=2*E)>_v?(E*=v?1:-1,x+=E,b-=E):(w=0,x=b=(h+p)/2),(M-=2*C)>_v?(C*=v?1:-1,g+=C,m-=C):(M=0,g=m=(h+p)/2)}var z=l*Math.cos(g),P=l*Math.sin(g),q=f*Math.cos(b),L=f*Math.sin(b);if(N>_v){var R=l*Math.cos(m),U=l*Math.sin(m),D=f*Math.cos(x),O=f*Math.sin(x);if(d<yv){var F=w>_v?an(z,P,D,O,R,U,q,L):[q,L],I=z-F[0],Y=P-F[1],B=R-F[0],j=U-F[1],H=1/Math.sin(Math.acos((I*B+Y*j)/(Math.sqrt(I*I+Y*Y)*Math.sqrt(B*B+j*j)))/2),X=Math.sqrt(F[0]*F[0]+F[1]*F[1]);S=Math.min(N,(f-X)/(H-1)),A=Math.min(N,(l-X)/(H+1))}}M>_v?A>_v?(_=cn(D,O,z,P,l,A,v),y=cn(R,U,q,L,l,A,v),c.moveTo(_.cx+_.x01,_.cy+_.y01),A<N?c.arc(_.cx,_.cy,A,Math.atan2(_.y01,_.x01),Math.atan2(y.y01,y.x01),!v):(c.arc(_.cx,_.cy,A,Math.atan2(_.y01,_.x01),Math.atan2(_.y11,_.x11),!v),c.arc(0,0,l,Math.atan2(_.cy+_.y11,_.cx+_.x11),Math.atan2(y.cy+y.y11,y.cx+y.x11),!v),c.arc(y.cx,y.cy,A,Math.atan2(y.y11,y.x11),Math.atan2(y.y01,y.x01),!v))):(c.moveTo(z,P),c.arc(0,0,l,g,m,!v)):c.moveTo(z,P),f>_v&&w>_v?S>_v?(_=cn(q,L,R,U,f,-S,v),y=cn(z,P,D,O,f,-S,v),c.lineTo(_.cx+_.x01,_.cy+_.y01),S<N?c.arc(_.cx,_.cy,S,Math.atan2(_.y01,_.x01),Math.atan2(y.y01,y.x01),!v):(c.arc(_.cx,_.cy,S,Math.atan2(_.y01,_.x01),Math.atan2(_.y11,_.x11),!v),c.arc(0,0,f,Math.atan2(_.cy+_.y11,_.cx+_.x11),Math.atan2(y.cy+y.y11,y.cx+y.x11),v),c.arc(y.cx,y.cy,S,Math.atan2(y.y11,y.x11),Math.atan2(y.y01,y.x01),!v))):c.arc(0,0,f,b,x,v):c.lineTo(q,L)}else c.moveTo(0,0);if(c.closePath(),t)return c=null,t+""||null}var n=tn,e=nn,r=Kt(0),i=null,o=en,u=rn,a=on,c=null;return t.centroid=function(){var t=(+n.apply(this,arguments)+ +e.apply(this,arguments))/2,r=(+o.apply(this,arguments)+ +u.apply(this,arguments))/2-yv/2;return[Math.cos(r)*t,Math.sin(r)*t]},t.innerRadius=function(e){return arguments.length?(n="function"==typeof e?e:Kt(+e),t):n},t.outerRadius=function(n){return arguments.length?(e="function"==typeof n?n:Kt(+n),t):e},t.cornerRadius=function(n){return arguments.length?(r="function"==typeof n?n:Kt(+n),t):r},t.padRadius=function(n){return arguments.length?(i=null==n?null:"function"==typeof n?n:Kt(+n),t):i},t.startAngle=function(n){return arguments.length?(o="function"==typeof n?n:Kt(+n),t):o},t.endAngle=function(n){return arguments.length?(u="function"==typeof n?n:Kt(+n),t):u},t.padAngle=function(n){return arguments.length?(a="function"==typeof n?n:Kt(+n),t):a},t.context=function(n){return arguments.length?(c=null==n?null:n,t):c},t}function fn(t){this._context=t}function ln(t){return new fn(t)}function hn(t){return t[0]}function pn(t){return t[1]}function dn(){function t(t){var a,c,s,f=t.length,l=!1;for(null==i&&(u=o(s=Tt())),a=0;a<=f;++a)!(a<f&&r(c=t[a],a,t))===l&&((l=!l)?u.lineStart():u.lineEnd()),l&&u.point(+n(c,a,t),+e(c,a,t));if(s)return u=null,s+""||null}var n=hn,e=pn,r=Kt(!0),i=null,o=ln,u=null;return t.x=function(e){return arguments.length?(n="function"==typeof e?e:Kt(+e),t):n},t.y=function(n){return arguments.length?(e="function"==typeof n?n:Kt(+n),t):e},t.defined=function(n){return arguments.length?(r="function"==typeof n?n:Kt(!!n),t):r},t.curve=function(n){return arguments.length?(o=n,null!=i&&(u=o(i)),t):o},t.context=function(n){return arguments.length?(null==n?i=u=null:u=o(i=n),t):i},t}function vn(){function t(t){var n,f,l,h,p,d=t.length,v=!1,_=new Array(d),y=new Array(d);for(null==a&&(s=c(p=Tt())),n=0;n<=d;++n){if(!(n<d&&u(h=t[n],n,t))===v)if(v=!v)f=n,s.areaStart(),s.lineStart();else{for(s.lineEnd(),s.lineStart(),l=n-1;l>=f;--l)s.point(_[l],y[l]);s.lineEnd(),s.areaEnd()}v&&(_[n]=+e(h,n,t),y[n]=+i(h,n,t),s.point(r?+r(h,n,t):_[n],o?+o(h,n,t):y[n]))}if(p)return s=null,p+""||null}function n(){return dn().defined(u).curve(c).context(a)}var e=hn,r=null,i=Kt(0),o=pn,u=Kt(!0),a=null,c=ln,s=null;return t.x=function(n){return arguments.length?(e="function"==typeof n?n:Kt(+n),r=null,t):e},t.x0=function(n){return arguments.length?(e="function"==typeof n?n:Kt(+n),t):e},t.x1=function(n){return arguments.length?(r=null==n?null:"function"==typeof n?n:Kt(+n),t):r},t.y=function(n){return arguments.length?(i="function"==typeof n?n:Kt(+n),o=null,t):i},t.y0=function(n){return arguments.length?(i="function"==typeof n?n:Kt(+n),t):i},t.y1=function(n){return arguments.length?(o=null==n?null:"function"==typeof n?n:Kt(+n),t):o},t.lineX0=t.lineY0=function(){return n().x(e).y(i)},t.lineY1=function(){return n().x(e).y(o)},t.lineX1=function(){return n().x(r).y(i)},t.defined=function(n){return arguments.length?(u="function"==typeof n?n:Kt(!!n),t):u},t.curve=function(n){return arguments.length?(c=n,null!=a&&(s=c(a)),t):c},t.context=function(n){return arguments.length?(null==n?a=s=null:s=c(a=n),t):a},t}function _n(t,n){return n<t?-1:n>t?1:n>=t?0:NaN}function yn(t){return t}function gn(){function t(t){var a,c,s,f,l,h=t.length,p=0,d=new Array(h),v=new Array(h),_=+i.apply(this,arguments),y=Math.min(mv,Math.max(-mv,o.apply(this,arguments)-_)),g=Math.min(Math.abs(y)/h,u.apply(this,arguments)),m=g*(y<0?-1:1);for(a=0;a<h;++a)(l=v[d[a]=a]=+n(t[a],a,t))>0&&(p+=l);for(null!=e?d.sort(function(t,n){return e(v[t],v[n])}):null!=r&&d.sort(function(n,e){return r(t[n],t[e])}),a=0,s=p?(y-h*m)/p:0;a<h;++a,_=f)c=d[a],l=v[c],f=_+(l>0?l*s:0)+m,v[c]={data:t[c],index:a,value:l,startAngle:_,endAngle:f,padAngle:g};return v}var n=yn,e=_n,r=null,i=Kt(0),o=Kt(mv),u=Kt(0);return t.value=function(e){return arguments.length?(n="function"==typeof e?e:Kt(+e),t):n},t.sortValues=function(n){return arguments.length?(e=n,r=null,t):e},t.sort=function(n){return arguments.length?(r=n,e=null,t):r},t.startAngle=function(n){return arguments.length?(i="function"==typeof n?n:Kt(+n),t):i},t.endAngle=function(n){return arguments.length?(o="function"==typeof n?n:Kt(+n),t):o},t.padAngle=function(n){return arguments.length?(u="function"==typeof n?n:Kt(+n),t):u},t}function mn(t){this._curve=t}function xn(t){function n(n){return new mn(t(n))}return n._curve=t,n}function bn(t){var n=t.curve;return t.angle=t.x,delete t.x,t.radius=t.y,delete t.y,t.curve=function(t){return arguments.length?n(xn(t)):n()._curve},t}function wn(){return bn(dn().curve(xv))}function Mn(){var t=vn().curve(xv),n=t.curve,e=t.lineX0,r=t.lineX1,i=t.lineY0,o=t.lineY1;return t.angle=t.x,delete t.x,t.startAngle=t.x0,delete t.x0,t.endAngle=t.x1,delete t.x1,t.radius=t.y,delete t.y,t.innerRadius=t.y0,delete t.y0,t.outerRadius=t.y1,delete t.y1,t.lineStartAngle=function(){return bn(e())},delete t.lineX0,t.lineEndAngle=function(){return bn(r())},delete t.lineX1,t.lineInnerRadius=function(){return bn(i())},delete t.lineY0,t.lineOuterRadius=function(){return bn(o())},delete t.lineY1,t.curve=function(t){return arguments.length?n(xn(t)):n()._curve},t}function Tn(){function t(){var t;if(r||(r=t=Tt()),n.apply(this,arguments).draw(r,+e.apply(this,arguments)),t)return r=null,t+""||null}var n=Kt(bv),e=Kt(64),r=null;return t.type=function(e){return arguments.length?(n="function"==typeof e?e:Kt(e),t):n},t.size=function(n){return arguments.length?(e="function"==typeof n?n:Kt(+n),t):e},t.context=function(n){return arguments.length?(r=null==n?null:n,t):r},t}function kn(){}function Nn(t,n,e){t._context.bezierCurveTo((2*t._x0+t._x1)/3,(2*t._y0+t._y1)/3,(t._x0+2*t._x1)/3,(t._y0+2*t._y1)/3,(t._x0+4*t._x1+n)/6,(t._y0+4*t._y1+e)/6)}function Sn(t){this._context=t}function An(t){return new Sn(t)}function En(t){this._context=t}function Cn(t){return new En(t)}function zn(t){this._context=t}function Pn(t){return new zn(t)}function qn(t,n){this._basis=new Sn(t),this._beta=n}function Ln(t,n,e){t._context.bezierCurveTo(t._x1+t._k*(t._x2-t._x0),t._y1+t._k*(t._y2-t._y0),t._x2+t._k*(t._x1-n),t._y2+t._k*(t._y1-e),t._x2,t._y2)}function Rn(t,n){this._context=t,this._k=(1-n)/6}function Un(t,n){this._context=t,this._k=(1-n)/6}function Dn(t,n){this._context=t,this._k=(1-n)/6}function On(t,n,e){var r=t._x1,i=t._y1,o=t._x2,u=t._y2;if(t._l01_a>_v){var a=2*t._l01_2a+3*t._l01_a*t._l12_a+t._l12_2a,c=3*t._l01_a*(t._l01_a+t._l12_a);r=(r*a-t._x0*t._l12_2a+t._x2*t._l01_2a)/c,i=(i*a-t._y0*t._l12_2a+t._y2*t._l01_2a)/c}if(t._l23_a>_v){var s=2*t._l23_2a+3*t._l23_a*t._l12_a+t._l12_2a,f=3*t._l23_a*(t._l23_a+t._l12_a);o=(o*s+t._x1*t._l23_2a-n*t._l12_2a)/f,u=(u*s+t._y1*t._l23_2a-e*t._l12_2a)/f}t._context.bezierCurveTo(r,i,o,u,t._x2,t._y2)}function Fn(t,n){this._context=t,this._alpha=n}function In(t,n){this._context=t,this._alpha=n}function Yn(t,n){this._context=t,this._alpha=n}function Bn(t){this._context=t}function jn(t){return new Bn(t)}function Hn(t){return t<0?-1:1}function Xn(t,n,e){var r=t._x1-t._x0,i=n-t._x1,o=(t._y1-t._y0)/(r||i<0&&-0),u=(e-t._y1)/(i||r<0&&-0),a=(o*i+u*r)/(r+i);return(Hn(o)+Hn(u))*Math.min(Math.abs(o),Math.abs(u),.5*Math.abs(a))||0}function Vn(t,n){var e=t._x1-t._x0;return e?(3*(t._y1-t._y0)/e-n)/2:n}function Wn(t,n,e){var r=t._x0,i=t._y0,o=t._x1,u=t._y1,a=(o-r)/3;t._context.bezierCurveTo(r+a,i+a*n,o-a,u-a*e,o,u)}function $n(t){this._context=t}function Zn(t){this._context=new Gn(t)}function Gn(t){this._context=t}function Jn(t){return new $n(t)}function Qn(t){return new Zn(t)}function Kn(t){this._context=t}function te(t){var n,e,r=t.length-1,i=new Array(r),o=new Array(r),u=new Array(r);for(i[0]=0,o[0]=2,u[0]=t[0]+2*t[1],n=1;n<r-1;++n)i[n]=1,o[n]=4,u[n]=4*t[n]+2*t[n+1];for(i[r-1]=2,o[r-1]=7,u[r-1]=8*t[r-1]+t[r],n=1;n<r;++n)e=i[n]/o[n-1],o[n]-=e,u[n]-=e*u[n-1];for(i[r-1]=u[r-1]/o[r-1],n=r-2;n>=0;--n)i[n]=(u[n]-i[n+1])/o[n];for(o[r-1]=(t[r]+i[r-1])/2,n=0;n<r-1;++n)o[n]=2*t[n+1]-i[n+1];return[i,o]}function ne(t){return new Kn(t)}function ee(t,n){this._context=t,this._t=n}function re(t){return new ee(t,.5)}function ie(t){return new ee(t,0)}function oe(t){return new ee(t,1)}function ue(t,n){if((r=t.length)>1)for(var e,r,i=1,o=t[n[0]],u=o.length;i<r;++i){e=o,o=t[n[i]];for(var a=0;a<u;++a)o[a][1]+=o[a][0]=isNaN(e[a][1])?e[a][0]:e[a][1]}}function ae(t){for(var n=t.length,e=new Array(n);--n>=0;)e[n]=n;return e}function ce(t,n){return t[n]}function se(){function t(t){var o,u,a=n.apply(this,arguments),c=t.length,s=a.length,f=new Array(s);for(o=0;o<s;++o){for(var l,h=a[o],p=f[o]=new Array(c),d=0;d<c;++d)p[d]=l=[0,+i(t[d],h,d,t)],l.data=t[d];p.key=h}for(o=0,u=e(f);o<s;++o)f[u[o]].index=o;return r(f,u),f}var n=Kt([]),e=ae,r=ue,i=ce;return t.keys=function(e){return arguments.length?(n="function"==typeof e?e:Kt(Wv.call(e)),t):n},t.value=function(n){return arguments.length?(i="function"==typeof n?n:Kt(+n),t):i},t.order=function(n){return arguments.length?(e=null==n?ae:"function"==typeof n?n:Kt(Wv.call(n)),t):e},t.offset=function(n){return arguments.length?(r=null==n?ue:n,t):r},t}function fe(t,n){if((r=t.length)>0){for(var e,r,i,o=0,u=t[0].length;o<u;++o){for(i=e=0;e<r;++e)i+=t[e][o][1]||0;if(i)for(e=0;e<r;++e)t[e][o][1]/=i}ue(t,n)}}function le(t,n){if((e=t.length)>0){for(var e,r=0,i=t[n[0]],o=i.length;r<o;++r){for(var u=0,a=0;u<e;++u)a+=t[u][r][1]||0;i[r][1]+=i[r][0]=-a/2}ue(t,n)}}function he(t,n){if((i=t.length)>0&&(r=(e=t[n[0]]).length)>0){for(var e,r,i,o=0,u=1;u<r;++u){for(var a=0,c=0,s=0;a<i;++a){for(var f=t[n[a]],l=f[u][1]||0,h=f[u-1][1]||0,p=(l-h)/2,d=0;d<a;++d){var v=t[n[d]],_=v[u][1]||0,y=v[u-1][1]||0;p+=_-y}c+=l,s+=p*l}e[u-1][1]+=e[u-1][0]=o,c&&(o-=s/c)}e[u-1][1]+=e[u-1][0]=o,ue(t,n)}}function pe(t){var n=t.map(de);return ae(t).sort(function(t,e){return n[t]-n[e]})}function de(t){for(var n,e=0,r=-1,i=t.length;++r<i;)(n=+t[r][1])&&(e+=n);return e}function ve(t){return pe(t).reverse()}function _e(t){var n,e,r=t.length,i=t.map(de),o=ae(t).sort(function(t,n){return i[n]-i[t]}),u=0,a=0,c=[],s=[];for(n=0;n<r;++n)e=o[n],u<a?(u+=i[e],c.push(e)):(a+=i[e],s.push(e));return s.reverse().concat(c)}function ye(t){return ae(t).reverse()}function ge(t,n,e){t.prototype=n.prototype=e,e.constructor=t}function me(t,n){var e=Object.create(t.prototype);for(var r in n)e[r]=n[r];return e}function xe(){}function be(t){var n;return t=(t+"").trim().toLowerCase(),(n=Gv.exec(t))?(n=parseInt(n[1],16),new Ne(n>>8&15|n>>4&240,n>>4&15|240&n,(15&n)<<4|15&n,1)):(n=Jv.exec(t))?we(parseInt(n[1],16)):(n=Qv.exec(t))?new Ne(n[1],n[2],n[3],1):(n=Kv.exec(t))?new Ne(255*n[1]/100,255*n[2]/100,255*n[3]/100,1):(n=t_.exec(t))?Me(n[1],n[2],n[3],n[4]):(n=n_.exec(t))?Me(255*n[1]/100,255*n[2]/100,255*n[3]/100,n[4]):(n=e_.exec(t))?Se(n[1],n[2]/100,n[3]/100,1):(n=r_.exec(t))?Se(n[1],n[2]/100,n[3]/100,n[4]):i_.hasOwnProperty(t)?we(i_[t]):"transparent"===t?new Ne(NaN,NaN,NaN,0):null}function we(t){return new Ne(t>>16&255,t>>8&255,255&t,1)}function Me(t,n,e,r){return r<=0&&(t=n=e=NaN),new Ne(t,n,e,r)}function Te(t){return t instanceof xe||(t=be(t)),t?(t=t.rgb(),new Ne(t.r,t.g,t.b,t.opacity)):new Ne}function ke(t,n,e,r){return 1===arguments.length?Te(t):new Ne(t,n,e,null==r?1:r)}function Ne(t,n,e,r){this.r=+t,this.g=+n,this.b=+e,this.opacity=+r}function Se(t,n,e,r){return r<=0?t=n=e=NaN:e<=0||e>=1?t=n=NaN:n<=0&&(t=NaN),new Ce(t,n,e,r)}function Ae(t){if(t instanceof Ce)return new Ce(t.h,t.s,t.l,t.opacity);if(t instanceof xe||(t=be(t)),!t)return new Ce;if(t instanceof Ce)return t;t=t.rgb();var n=t.r/255,e=t.g/255,r=t.b/255,i=Math.min(n,e,r),o=Math.max(n,e,r),u=NaN,a=o-i,c=(o+i)/2;return a?(u=n===o?(e-r)/a+6*(e<r):e===o?(r-n)/a+2:(n-e)/a+4,a/=c<.5?o+i:2-o-i,u*=60):a=c>0&&c<1?0:u,new Ce(u,a,c,t.opacity)}function Ee(t,n,e,r){return 1===arguments.length?Ae(t):new Ce(t,n,e,null==r?1:r)}function Ce(t,n,e,r){this.h=+t,this.s=+n,this.l=+e,this.opacity=+r}function ze(t,n,e){return 255*(t<60?n+(e-n)*t/60:t<180?e:t<240?n+(e-n)*(240-t)/60:n)}function Pe(t){if(t instanceof Le)return new Le(t.l,t.a,t.b,t.opacity);if(t instanceof Ye){var n=t.h*o_;return new Le(t.l,Math.cos(n)*t.c,Math.sin(n)*t.c,t.opacity)}t instanceof Ne||(t=Te(t));var e=Oe(t.r),r=Oe(t.g),i=Oe(t.b),o=Re((.4124564*e+.3575761*r+.1804375*i)/c_),u=Re((.2126729*e+.7151522*r+.072175*i)/s_),a=Re((.0193339*e+.119192*r+.9503041*i)/f_);return new Le(116*u-16,500*(o-u),200*(u-a),t.opacity)}function qe(t,n,e,r){return 1===arguments.length?Pe(t):new Le(t,n,e,null==r?1:r)}function Le(t,n,e,r){this.l=+t,this.a=+n,this.b=+e,this.opacity=+r}function Re(t){return t>d_?Math.pow(t,1/3):t/p_+l_}function Ue(t){return t>h_?t*t*t:p_*(t-l_)}function De(t){return 255*(t<=.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055)}function Oe(t){return(t/=255)<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4)}function Fe(t){if(t instanceof Ye)return new Ye(t.h,t.c,t.l,t.opacity);t instanceof Le||(t=Pe(t));var n=Math.atan2(t.b,t.a)*u_;return new Ye(n<0?n+360:n,Math.sqrt(t.a*t.a+t.b*t.b),t.l,t.opacity)}function Ie(t,n,e,r){return 1===arguments.length?Fe(t):new Ye(t,n,e,null==r?1:r)}function Ye(t,n,e,r){this.h=+t,this.c=+n,this.l=+e,this.opacity=+r}function Be(t){if(t instanceof He)return new He(t.h,t.s,t.l,t.opacity);t instanceof Ne||(t=Te(t));var n=t.r/255,e=t.g/255,r=t.b/255,i=(w_*r+x_*n-b_*e)/(w_+x_-b_),o=r-i,u=(m_*(e-i)-y_*o)/g_,a=Math.sqrt(u*u+o*o)/(m_*i*(1-i)),c=a?Math.atan2(u,o)*u_-120:NaN;return new He(c<0?c+360:c,a,i,t.opacity)}function je(t,n,e,r){return 1===arguments.length?Be(t):new He(t,n,e,null==r?1:r)}function He(t,n,e,r){this.h=+t,this.s=+n,this.l=+e,this.opacity=+r}function Xe(t,n,e,r,i){var o=t*t,u=o*t;return((1-3*t+3*o-u)*n+(4-6*o+3*u)*e+(1+3*t+3*o-3*u)*r+u*i)/6}function Ve(t){var n=t.length-1;return function(e){var r=e<=0?e=0:e>=1?(e=1,n-1):Math.floor(e*n),i=t[r],o=t[r+1],u=r>0?t[r-1]:2*i-o,a=r<n-1?t[r+2]:2*o-i;return Xe((e-r/n)*n,u,i,o,a)}}function We(t){var n=t.length;return function(e){var r=Math.floor(((e%=1)<0?++e:e)*n),i=t[(r+n-1)%n],o=t[r%n],u=t[(r+1)%n],a=t[(r+2)%n];return Xe((e-r/n)*n,i,o,u,a)}}function $e(t){return function(){return t}}function Ze(t,n){return function(e){return t+e*n}}function Ge(t,n,e){return t=Math.pow(t,e),n=Math.pow(n,e)-t,e=1/e,function(r){return Math.pow(t+r*n,e)}}function Je(t,n){var e=n-t;return e?Ze(t,e>180||e<-180?e-360*Math.round(e/360):e):$e(isNaN(t)?n:t)}function Qe(t){return 1===(t=+t)?Ke:function(n,e){return e-n?Ge(n,e,t):$e(isNaN(n)?e:n)}}function Ke(t,n){var e=n-t;return e?Ze(t,e):$e(isNaN(t)?n:t)}function tr(t){return function(n){var e,r,i=n.length,o=new Array(i),u=new Array(i),a=new Array(i);for(e=0;e<i;++e)r=ke(n[e]),o[e]=r.r||0,u[e]=r.g||0,a[e]=r.b||0;return o=t(o),u=t(u),a=t(a),r.opacity=1,function(t){return r.r=o(t),r.g=u(t),r.b=a(t),r+""}}}function nr(t,n){var e,r=n?n.length:0,i=t?Math.min(r,t.length):0,o=new Array(r),u=new Array(r);for(e=0;e<i;++e)o[e]=cr(t[e],n[e]);
for(;e<r;++e)u[e]=n[e];return function(t){for(e=0;e<i;++e)u[e]=o[e](t);return u}}function er(t,n){var e=new Date;return t=+t,n-=t,function(r){return e.setTime(t+n*r),e}}function rr(t,n){return t=+t,n-=t,function(e){return t+n*e}}function ir(t,n){var e,r={},i={};null!==t&&"object"==typeof t||(t={}),null!==n&&"object"==typeof n||(n={});for(e in n)e in t?r[e]=cr(t[e],n[e]):i[e]=n[e];return function(t){for(e in r)i[e]=r[e](t);return i}}function or(t){return function(){return t}}function ur(t){return function(n){return t(n)+""}}function ar(t,n){var e,r,i,o=C_.lastIndex=z_.lastIndex=0,u=-1,a=[],c=[];for(t+="",n+="";(e=C_.exec(t))&&(r=z_.exec(n));)(i=r.index)>o&&(i=n.slice(o,i),a[u]?a[u]+=i:a[++u]=i),(e=e[0])===(r=r[0])?a[u]?a[u]+=r:a[++u]=r:(a[++u]=null,c.push({i:u,x:rr(e,r)})),o=z_.lastIndex;return o<n.length&&(i=n.slice(o),a[u]?a[u]+=i:a[++u]=i),a.length<2?c[0]?ur(c[0].x):or(n):(n=c.length,function(t){for(var e,r=0;r<n;++r)a[(e=c[r]).i]=e.x(t);return a.join("")})}function cr(t,n){var e,r=typeof n;return null==n||"boolean"===r?$e(n):("number"===r?rr:"string"===r?(e=be(n))?(n=e,S_):ar:n instanceof be?S_:n instanceof Date?er:Array.isArray(n)?nr:isNaN(n)?ir:rr)(t,n)}function sr(t,n){return t=+t,n-=t,function(e){return Math.round(t+n*e)}}function fr(t,n,e,r,i,o){var u,a,c;return(u=Math.sqrt(t*t+n*n))&&(t/=u,n/=u),(c=t*e+n*r)&&(e-=t*c,r-=n*c),(a=Math.sqrt(e*e+r*r))&&(e/=a,r/=a,c/=a),t*r<n*e&&(t=-t,n=-n,c=-c,u=-u),{translateX:i,translateY:o,rotate:Math.atan2(n,t)*P_,skewX:Math.atan(c)*P_,scaleX:u,scaleY:a}}function lr(t){return"none"===t?q_:(M_||(M_=document.createElement("DIV"),T_=document.documentElement,k_=document.defaultView),M_.style.transform=t,t=k_.getComputedStyle(T_.appendChild(M_),null).getPropertyValue("transform"),T_.removeChild(M_),t=t.slice(7,-1).split(","),fr(+t[0],+t[1],+t[2],+t[3],+t[4],+t[5]))}function hr(t){return null==t?q_:(N_||(N_=document.createElementNS("http://www.w3.org/2000/svg","g")),N_.setAttribute("transform",t),(t=N_.transform.baseVal.consolidate())?(t=t.matrix,fr(t.a,t.b,t.c,t.d,t.e,t.f)):q_)}function pr(t,n,e,r){function i(t){return t.length?t.pop()+" ":""}function o(t,r,i,o,u,a){if(t!==i||r!==o){var c=u.push("translate(",null,n,null,e);a.push({i:c-4,x:rr(t,i)},{i:c-2,x:rr(r,o)})}else(i||o)&&u.push("translate("+i+n+o+e)}function u(t,n,e,o){t!==n?(t-n>180?n+=360:n-t>180&&(t+=360),o.push({i:e.push(i(e)+"rotate(",null,r)-2,x:rr(t,n)})):n&&e.push(i(e)+"rotate("+n+r)}function a(t,n,e,o){t!==n?o.push({i:e.push(i(e)+"skewX(",null,r)-2,x:rr(t,n)}):n&&e.push(i(e)+"skewX("+n+r)}function c(t,n,e,r,o,u){if(t!==e||n!==r){var a=o.push(i(o)+"scale(",null,",",null,")");u.push({i:a-4,x:rr(t,e)},{i:a-2,x:rr(n,r)})}else 1===e&&1===r||o.push(i(o)+"scale("+e+","+r+")")}return function(n,e){var r=[],i=[];return n=t(n),e=t(e),o(n.translateX,n.translateY,e.translateX,e.translateY,r,i),u(n.rotate,e.rotate,r,i),a(n.skewX,e.skewX,r,i),c(n.scaleX,n.scaleY,e.scaleX,e.scaleY,r,i),n=e=null,function(t){for(var n,e=-1,o=i.length;++e<o;)r[(n=i[e]).i]=n.x(t);return r.join("")}}}function dr(t){return((t=Math.exp(t))+1/t)/2}function vr(t){return((t=Math.exp(t))-1/t)/2}function _r(t){return((t=Math.exp(2*t))-1)/(t+1)}function yr(t,n){var e,r,i=t[0],o=t[1],u=t[2],a=n[0],c=n[1],s=n[2],f=a-i,l=c-o,h=f*f+l*l;if(h<F_)r=Math.log(s/u)/U_,e=function(t){return[i+t*f,o+t*l,u*Math.exp(U_*t*r)]};else{var p=Math.sqrt(h),d=(s*s-u*u+O_*h)/(2*u*D_*p),v=(s*s-u*u-O_*h)/(2*s*D_*p),_=Math.log(Math.sqrt(d*d+1)-d),y=Math.log(Math.sqrt(v*v+1)-v);r=(y-_)/U_,e=function(t){var n=t*r,e=dr(_),a=u/(D_*p)*(e*_r(U_*n+_)-vr(_));return[i+a*f,o+a*l,u*e/dr(U_*n+_)]}}return e.duration=1e3*r,e}function gr(t){return function(n,e){var r=t((n=Ee(n)).h,(e=Ee(e)).h),i=Ke(n.s,e.s),o=Ke(n.l,e.l),u=Ke(n.opacity,e.opacity);return function(t){return n.h=r(t),n.s=i(t),n.l=o(t),n.opacity=u(t),n+""}}}function mr(t,n){var e=Ke((t=qe(t)).l,(n=qe(n)).l),r=Ke(t.a,n.a),i=Ke(t.b,n.b),o=Ke(t.opacity,n.opacity);return function(n){return t.l=e(n),t.a=r(n),t.b=i(n),t.opacity=o(n),t+""}}function xr(t){return function(n,e){var r=t((n=Ie(n)).h,(e=Ie(e)).h),i=Ke(n.c,e.c),o=Ke(n.l,e.l),u=Ke(n.opacity,e.opacity);return function(t){return n.h=r(t),n.c=i(t),n.l=o(t),n.opacity=u(t),n+""}}}function br(t){return function n(e){function r(n,r){var i=t((n=je(n)).h,(r=je(r)).h),o=Ke(n.s,r.s),u=Ke(n.l,r.l),a=Ke(n.opacity,r.opacity);return function(t){return n.h=i(t),n.s=o(t),n.l=u(Math.pow(t,e)),n.opacity=a(t),n+""}}return e=+e,r.gamma=n,r}(1)}function wr(t,n){for(var e=new Array(n),r=0;r<n;++r)e[r]=t(r/(n-1));return e}function Mr(){for(var t,n=0,e=arguments.length,r={};n<e;++n){if(!(t=arguments[n]+"")||t in r)throw new Error("illegal type: "+t);r[t]=[]}return new Tr(r)}function Tr(t){this._=t}function kr(t,n){return t.trim().split(/^|\s+/).map(function(t){var e="",r=t.indexOf(".");if(r>=0&&(e=t.slice(r+1),t=t.slice(0,r)),t&&!n.hasOwnProperty(t))throw new Error("unknown type: "+t);return{type:t,name:e}})}function Nr(t,n){for(var e,r=0,i=t.length;r<i;++r)if((e=t[r]).name===n)return e.value}function Sr(t,n,e){for(var r=0,i=t.length;r<i;++r)if(t[r].name===n){t[r]=V_,t=t.slice(0,r).concat(t.slice(r+1));break}return null!=e&&t.push({name:n,value:e}),t}function Ar(t){return new Function("d","return {"+t.map(function(t,n){return JSON.stringify(t)+": d["+n+"]"}).join(",")+"}")}function Er(t,n){var e=Ar(t);return function(r,i){return n(e(r),i,t)}}function Cr(t){var n=Object.create(null),e=[];return t.forEach(function(t){for(var r in t)r in n||e.push(n[r]=r)}),e}function zr(t){function n(t,n){var r,i,o=e(t,function(t,e){return r?r(t,e-1):(i=t,void(r=n?Er(t,n):Ar(t)))});return o.columns=i,o}function e(t,n){function e(){if(f>=s)return u;if(i)return i=!1,o;var n,e=f;if(34===t.charCodeAt(e)){for(var r=e;r++<s;)if(34===t.charCodeAt(r)){if(34!==t.charCodeAt(r+1))break;++r}return f=r+2,n=t.charCodeAt(r+1),13===n?(i=!0,10===t.charCodeAt(r+2)&&++f):10===n&&(i=!0),t.slice(e+1,r).replace(/""/g,'"')}for(;f<s;){var a=1;if(n=t.charCodeAt(f++),10===n)i=!0;else if(13===n)i=!0,10===t.charCodeAt(f)&&(++f,++a);else if(n!==c)continue;return t.slice(e,f-a)}return t.slice(e)}for(var r,i,o={},u={},a=[],s=t.length,f=0,l=0;(r=e())!==u;){for(var h=[];r!==o&&r!==u;)h.push(r),r=e();n&&null==(h=n(h,l++))||a.push(h)}return a}function r(n,e){return null==e&&(e=Cr(n)),[e.map(u).join(t)].concat(n.map(function(n){return e.map(function(t){return u(n[t])}).join(t)})).join("\n")}function i(t){return t.map(o).join("\n")}function o(n){return n.map(u).join(t)}function u(t){return null==t?"":a.test(t+="")?'"'+t.replace(/\"/g,'""')+'"':t}var a=new RegExp('["'+t+"\n]"),c=t.charCodeAt(0);return{parse:n,parseRows:e,format:r,formatRows:i}}function Pr(t,n){function e(t){var n,e=s.status;if(!e&&Lr(s)||e>=200&&e<300||304===e){if(o)try{n=o.call(r,s)}catch(t){return void a.call("error",r,t)}else n=s;a.call("load",r,n)}else a.call("error",r,t)}var r,i,o,u,a=Mr("beforesend","progress","load","error"),c=q(),s=new XMLHttpRequest,f=null,l=null,h=0;if("undefined"==typeof XDomainRequest||"withCredentials"in s||!/^(http(s)?:)?\/\//.test(t)||(s=new XDomainRequest),"onload"in s?s.onload=s.onerror=s.ontimeout=e:s.onreadystatechange=function(t){s.readyState>3&&e(t)},s.onprogress=function(t){a.call("progress",r,t)},r={header:function(t,n){return t=(t+"").toLowerCase(),arguments.length<2?c.get(t):(null==n?c.remove(t):c.set(t,n+""),r)},mimeType:function(t){return arguments.length?(i=null==t?null:t+"",r):i},responseType:function(t){return arguments.length?(u=t,r):u},timeout:function(t){return arguments.length?(h=+t,r):h},user:function(t){return arguments.length<1?f:(f=null==t?null:t+"",r)},password:function(t){return arguments.length<1?l:(l=null==t?null:t+"",r)},response:function(t){return o=t,r},get:function(t,n){return r.send("GET",t,n)},post:function(t,n){return r.send("POST",t,n)},send:function(n,e,o){return s.open(n,t,!0,f,l),null==i||c.has("accept")||c.set("accept",i+",*/*"),s.setRequestHeader&&c.each(function(t,n){s.setRequestHeader(n,t)}),null!=i&&s.overrideMimeType&&s.overrideMimeType(i),null!=u&&(s.responseType=u),h>0&&(s.timeout=h),null==o&&"function"==typeof e&&(o=e,e=null),null!=o&&1===o.length&&(o=qr(o)),null!=o&&r.on("error",o).on("load",function(t){o(null,t)}),a.call("beforesend",r,s),s.send(null==e?null:e),r},abort:function(){return s.abort(),r},on:function(){var t=a.on.apply(a,arguments);return t===a?r:t}},null!=n){if("function"!=typeof n)throw new Error("invalid callback: "+n);return r.get(n)}return r}function qr(t){return function(n,e){t(null==n?e:null)}}function Lr(t){var n=t.responseType;return n&&"text"!==n?t.response:t.responseText}function Rr(t,n){return function(e,r){var i=Pr(e).mimeType(t).response(n);if(null!=r){if("function"!=typeof r)throw new Error("invalid callback: "+r);return i.get(r)}return i}}function Ur(t,n){return function(e,r,i){arguments.length<3&&(i=r,r=null);var o=Pr(e).mimeType(t);return o.row=function(t){return arguments.length?o.response(Dr(n,r=t)):r},o.row(r),i?o.get(i):o}}function Dr(t,n){return function(e){return t(e.responseText,n)}}function Or(){return _y||(my(Fr),_y=gy.now()+yy)}function Fr(){_y=0}function Ir(){this._call=this._time=this._next=null}function Yr(t,n,e){var r=new Ir;return r.restart(t,n,e),r}function Br(){Or(),++ly;for(var t,n=W_;n;)(t=_y-n._time)>=0&&n._call.call(null,t),n=n._next;--ly}function jr(t){_y=(vy=t||gy.now())+yy,ly=hy=0;try{Br()}finally{ly=0,Xr(),_y=0}}function Hr(){var t=gy.now(),n=t-vy;n>dy&&(yy-=n,vy=t)}function Xr(){for(var t,n,e=W_,r=1/0;e;)e._call?(r>e._time&&(r=e._time),t=e,e=e._next):(n=e._next,e._next=null,e=t?t._next=n:W_=n);$_=t,Vr(r)}function Vr(t){if(!ly){hy&&(hy=clearTimeout(hy));var n=t-_y;n>24?(t<1/0&&(hy=setTimeout(jr,n)),py&&(py=clearInterval(py))):(py||(py=setInterval(Hr,dy)),ly=1,my(jr))}}function Wr(t,n,e){var r=new Ir;return n=null==n?0:+n,r.restart(function(e){r.stop(),t(e+n)},n,e),r}function $r(t,n,e){var r=new Ir,i=n;return null==n?(r.restart(t,n,e),r):(n=+n,e=null==e?Or():+e,r.restart(function o(u){u+=i,r.restart(o,i+=n,e),t(u)},n,e),r)}function Zr(t,n,e,r){function i(n){return t(n=new Date((+n))),n}return i.floor=i,i.ceil=function(e){return t(e=new Date(e-1)),n(e,1),t(e),e},i.round=function(t){var n=i(t),e=i.ceil(t);return t-n<e-t?n:e},i.offset=function(t,e){return n(t=new Date((+t)),null==e?1:Math.floor(e)),t},i.range=function(e,r,o){var u=[];if(e=i.ceil(e),o=null==o?1:Math.floor(o),!(e<r&&o>0))return u;do u.push(new Date((+e)));while(n(e,o),t(e),e<r);return u},i.filter=function(e){return Zr(function(n){for(;t(n),!e(n);)n.setTime(n-1)},function(t,r){for(;--r>=0;)for(;n(t,1),!e(t););})},e&&(i.count=function(n,r){return xy.setTime(+n),by.setTime(+r),t(xy),t(by),Math.floor(e(xy,by))},i.every=function(t){return t=Math.floor(t),isFinite(t)&&t>0?t>1?i.filter(r?function(n){return r(n)%t===0}:function(n){return i.count(0,n)%t===0}):i:null}),i}function Gr(t){return Zr(function(n){n.setDate(n.getDate()-(n.getDay()+7-t)%7),n.setHours(0,0,0,0)},function(t,n){t.setDate(t.getDate()+7*n)},function(t,n){return(n-t-(n.getTimezoneOffset()-t.getTimezoneOffset())*ky)/Ay})}function Jr(t){return Zr(function(n){n.setUTCDate(n.getUTCDate()-(n.getUTCDay()+7-t)%7),n.setUTCHours(0,0,0,0)},function(t,n){t.setUTCDate(t.getUTCDate()+7*n)},function(t,n){return(n-t)/Ay})}function Qr(t,n){if((e=(t=n?t.toExponential(n-1):t.toExponential()).indexOf("e"))<0)return null;var e,r=t.slice(0,e);return[r.length>1?r[0]+r.slice(2):r,+t.slice(e+1)]}function Kr(t){return t=Qr(Math.abs(t)),t?t[1]:NaN}function ti(t,n){return function(e,r){for(var i=e.length,o=[],u=0,a=t[0],c=0;i>0&&a>0&&(c+a+1>r&&(a=Math.max(1,r-c)),o.push(e.substring(i-=a,i+a)),!((c+=a+1)>r));)a=t[u=(u+1)%t.length];return o.reverse().join(n)}}function ni(t,n){t=t.toPrecision(n);t:for(var e,r=t.length,i=1,o=-1;i<r;++i)switch(t[i]){case".":o=e=i;break;case"0":0===o&&(o=i),e=i;break;case"e":break t;default:o>0&&(o=0)}return o>0?t.slice(0,o)+t.slice(e+1):t}function ei(t,n){var e=Qr(t,n);if(!e)return t+"";var r=e[0],i=e[1],o=i-(Tg=3*Math.max(-8,Math.min(8,Math.floor(i/3))))+1,u=r.length;return o===u?r:o>u?r+new Array(o-u+1).join("0"):o>0?r.slice(0,o)+"."+r.slice(o):"0."+new Array(1-o).join("0")+Qr(t,Math.max(0,n+o-1))[0]}function ri(t,n){var e=Qr(t,n);if(!e)return t+"";var r=e[0],i=e[1];return i<0?"0."+new Array((-i)).join("0")+r:r.length>i+1?r.slice(0,i+1)+"."+r.slice(i+1):r+new Array(i-r.length+2).join("0")}function ii(t){return new oi(t)}function oi(t){if(!(n=Sg.exec(t)))throw new Error("invalid format: "+t);var n,e=n[1]||" ",r=n[2]||">",i=n[3]||"-",o=n[4]||"",u=!!n[5],a=n[6]&&+n[6],c=!!n[7],s=n[8]&&+n[8].slice(1),f=n[9]||"";"n"===f?(c=!0,f="g"):Ng[f]||(f=""),(u||"0"===e&&"="===r)&&(u=!0,e="0",r="="),this.fill=e,this.align=r,this.sign=i,this.symbol=o,this.zero=u,this.width=a,this.comma=c,this.precision=s,this.type=f}function ui(t){return t}function ai(t){function n(t){function n(t){var n,i,c,g=d,m=v;if("c"===p)m=_(t)+m,t="";else{t=+t;var x=(t<0||1/t<0)&&(t*=-1,!0);if(t=_(t,h),x)for(n=-1,i=t.length,x=!1;++n<i;)if(c=t.charCodeAt(n),48<c&&c<58||"x"===p&&96<c&&c<103||"X"===p&&64<c&&c<71){x=!0;break}if(g=(x?"("===a?a:"-":"-"===a||"("===a?"":a)+g,m=m+("s"===p?Eg[8+Tg/3]:"")+(x&&"("===a?")":""),y)for(n=-1,i=t.length;++n<i;)if(c=t.charCodeAt(n),48>c||c>57){m=(46===c?o+t.slice(n+1):t.slice(n))+m,t=t.slice(0,n);break}}l&&!s&&(t=r(t,1/0));var b=g.length+t.length+m.length,w=b<f?new Array(f-b+1).join(e):"";switch(l&&s&&(t=r(w+t,w.length?f-m.length:1/0),w=""),u){case"<":return g+t+m+w;case"=":return g+w+t+m;case"^":return w.slice(0,b=w.length>>1)+g+t+m+w.slice(b)}return w+g+t+m}t=ii(t);var e=t.fill,u=t.align,a=t.sign,c=t.symbol,s=t.zero,f=t.width,l=t.comma,h=t.precision,p=t.type,d="$"===c?i[0]:"#"===c&&/[boxX]/.test(p)?"0"+p.toLowerCase():"",v="$"===c?i[1]:/[%p]/.test(p)?"%":"",_=Ng[p],y=!p||/[defgprs%]/.test(p);return h=null==h?p?6:12:/[gprs]/.test(p)?Math.max(1,Math.min(21,h)):Math.max(0,Math.min(20,h)),n.toString=function(){return t+""},n}function e(t,e){var r=n((t=ii(t),t.type="f",t)),i=3*Math.max(-8,Math.min(8,Math.floor(Kr(e)/3))),o=Math.pow(10,-i),u=Eg[8+i/3];return function(t){return r(o*t)+u}}var r=t.grouping&&t.thousands?ti(t.grouping,t.thousands):ui,i=t.currency,o=t.decimal;return{format:n,formatPrefix:e}}function ci(n){return Ag=ai(n),t.format=Ag.format,t.formatPrefix=Ag.formatPrefix,Ag}function si(t){return Math.max(0,-Kr(Math.abs(t)))}function fi(t,n){return Math.max(0,3*Math.max(-8,Math.min(8,Math.floor(Kr(n)/3)))-Kr(Math.abs(t)))}function li(t,n){return t=Math.abs(t),n=Math.abs(n)-t,Math.max(0,Kr(n)-Kr(t))+1}function hi(t){if(0<=t.y&&t.y<100){var n=new Date((-1),t.m,t.d,t.H,t.M,t.S,t.L);return n.setFullYear(t.y),n}return new Date(t.y,t.m,t.d,t.H,t.M,t.S,t.L)}function pi(t){if(0<=t.y&&t.y<100){var n=new Date(Date.UTC(-1,t.m,t.d,t.H,t.M,t.S,t.L));return n.setUTCFullYear(t.y),n}return new Date(Date.UTC(t.y,t.m,t.d,t.H,t.M,t.S,t.L))}function di(t){return{y:t,m:0,d:1,H:0,M:0,S:0,L:0}}function vi(t){function n(t,n){return function(e){var r,i,o,u=[],a=-1,c=0,s=t.length;for(e instanceof Date||(e=new Date((+e)));++a<s;)37===t.charCodeAt(a)&&(u.push(t.slice(c,a)),null!=(i=zg[r=t.charAt(++a)])?r=t.charAt(++a):i="e"===r?" ":"0",(o=n[r])&&(r=o(e,i)),u.push(r),c=a+1);return u.push(t.slice(c,a)),u.join("")}}function e(t,n){return function(e){var i=di(1900),o=r(i,t,e+="",0);if(o!=e.length)return null;if("p"in i&&(i.H=i.H%12+12*i.p),"W"in i||"U"in i){"w"in i||(i.w="W"in i?1:0);var u="Z"in i?pi(di(i.y)).getUTCDay():n(di(i.y)).getDay();i.m=0,i.d="W"in i?(i.w+6)%7+7*i.W-(u+5)%7:i.w+7*i.U-(u+6)%7}return"Z"in i?(i.H+=i.Z/100|0,i.M+=i.Z%100,pi(i)):n(i)}}function r(t,n,e,r){for(var i,o,u=0,a=n.length,c=e.length;u<a;){if(r>=c)return-1;if(i=n.charCodeAt(u++),37===i){if(i=n.charAt(u++),o=B[i in zg?n.charAt(u++):i],!o||(r=o(t,e,r))<0)return-1}else if(i!=e.charCodeAt(r++))return-1}return r}function i(t,n,e){var r=C.exec(n.slice(e));return r?(t.p=z[r[0].toLowerCase()],e+r[0].length):-1}function o(t,n,e){var r=L.exec(n.slice(e));return r?(t.w=R[r[0].toLowerCase()],e+r[0].length):-1}function u(t,n,e){var r=P.exec(n.slice(e));return r?(t.w=q[r[0].toLowerCase()],e+r[0].length):-1}function a(t,n,e){var r=O.exec(n.slice(e));return r?(t.m=F[r[0].toLowerCase()],e+r[0].length):-1}function c(t,n,e){var r=U.exec(n.slice(e));return r?(t.m=D[r[0].toLowerCase()],e+r[0].length):-1}function s(t,n,e){return r(t,w,n,e)}function f(t,n,e){return r(t,M,n,e)}function l(t,n,e){return r(t,T,n,e)}function h(t){return S[t.getDay()]}function p(t){return N[t.getDay()]}function d(t){return E[t.getMonth()]}function v(t){return A[t.getMonth()]}function _(t){return k[+(t.getHours()>=12)]}function y(t){return S[t.getUTCDay()]}function g(t){return N[t.getUTCDay()]}function m(t){return E[t.getUTCMonth()]}function x(t){return A[t.getUTCMonth()]}function b(t){return k[+(t.getUTCHours()>=12)]}var w=t.dateTime,M=t.date,T=t.time,k=t.periods,N=t.days,S=t.shortDays,A=t.months,E=t.shortMonths,C=gi(k),z=mi(k),P=gi(N),q=mi(N),L=gi(S),R=mi(S),U=gi(A),D=mi(A),O=gi(E),F=mi(E),I={a:h,A:p,b:d,B:v,c:null,d:Li,e:Li,H:Ri,I:Ui,j:Di,L:Oi,m:Fi,M:Ii,p:_,S:Yi,U:Bi,w:ji,W:Hi,x:null,X:null,y:Xi,Y:Vi,Z:Wi,"%":co},Y={a:y,A:g,b:m,B:x,c:null,d:$i,e:$i,H:Zi,I:Gi,j:Ji,L:Qi,m:Ki,M:to,p:b,S:no,U:eo,w:ro,W:io,x:null,X:null,y:oo,Y:uo,Z:ao,"%":co},B={a:o,A:u,b:a,B:c,c:s,d:Si,e:Si,H:Ei,I:Ei,j:Ai,L:Pi,m:Ni,M:Ci,p:i,S:zi,U:bi,w:xi,W:wi,x:f,X:l,y:Ti,Y:Mi,Z:ki,"%":qi};return I.x=n(M,I),I.X=n(T,I),I.c=n(w,I),Y.x=n(M,Y),Y.X=n(T,Y),Y.c=n(w,Y),{format:function(t){var e=n(t+="",I);return e.toString=function(){return t},e},parse:function(t){var n=e(t+="",hi);return n.toString=function(){return t},n},utcFormat:function(t){var e=n(t+="",Y);return e.toString=function(){return t},e},utcParse:function(t){var n=e(t,pi);return n.toString=function(){return t},n}}}function _i(t,n,e){var r=t<0?"-":"",i=(r?-t:t)+"",o=i.length;return r+(o<e?new Array(e-o+1).join(n)+i:i)}function yi(t){return t.replace(Lg,"\\$&")}function gi(t){return new RegExp("^(?:"+t.map(yi).join("|")+")","i")}function mi(t){for(var n={},e=-1,r=t.length;++e<r;)n[t[e].toLowerCase()]=e;return n}function xi(t,n,e){var r=Pg.exec(n.slice(e,e+1));return r?(t.w=+r[0],e+r[0].length):-1}function bi(t,n,e){var r=Pg.exec(n.slice(e));return r?(t.U=+r[0],e+r[0].length):-1}function wi(t,n,e){var r=Pg.exec(n.slice(e));return r?(t.W=+r[0],e+r[0].length):-1}function Mi(t,n,e){var r=Pg.exec(n.slice(e,e+4));return r?(t.y=+r[0],e+r[0].length):-1}function Ti(t,n,e){var r=Pg.exec(n.slice(e,e+2));return r?(t.y=+r[0]+(+r[0]>68?1900:2e3),e+r[0].length):-1}function ki(t,n,e){var r=/^(Z)|([+-]\d\d)(?:\:?(\d\d))?/.exec(n.slice(e,e+6));return r?(t.Z=r[1]?0:-(r[2]+(r[3]||"00")),e+r[0].length):-1}function Ni(t,n,e){var r=Pg.exec(n.slice(e,e+2));return r?(t.m=r[0]-1,e+r[0].length):-1}function Si(t,n,e){var r=Pg.exec(n.slice(e,e+2));return r?(t.d=+r[0],e+r[0].length):-1}function Ai(t,n,e){var r=Pg.exec(n.slice(e,e+3));return r?(t.m=0,t.d=+r[0],e+r[0].length):-1}function Ei(t,n,e){var r=Pg.exec(n.slice(e,e+2));return r?(t.H=+r[0],e+r[0].length):-1}function Ci(t,n,e){var r=Pg.exec(n.slice(e,e+2));return r?(t.M=+r[0],e+r[0].length):-1}function zi(t,n,e){var r=Pg.exec(n.slice(e,e+2));return r?(t.S=+r[0],e+r[0].length):-1}function Pi(t,n,e){var r=Pg.exec(n.slice(e,e+3));return r?(t.L=+r[0],e+r[0].length):-1}function qi(t,n,e){var r=qg.exec(n.slice(e,e+1));return r?e+r[0].length:-1}function Li(t,n){return _i(t.getDate(),n,2)}function Ri(t,n){return _i(t.getHours(),n,2)}function Ui(t,n){return _i(t.getHours()%12||12,n,2)}function Di(t,n){return _i(1+Ry.count(Ky(t),t),n,3)}function Oi(t,n){return _i(t.getMilliseconds(),n,3)}function Fi(t,n){return _i(t.getMonth()+1,n,2)}function Ii(t,n){return _i(t.getMinutes(),n,2)}function Yi(t,n){return _i(t.getSeconds(),n,2)}function Bi(t,n){return _i(Dy.count(Ky(t),t),n,2)}function ji(t){return t.getDay()}function Hi(t,n){return _i(Oy.count(Ky(t),t),n,2)}function Xi(t,n){return _i(t.getFullYear()%100,n,2)}function Vi(t,n){return _i(t.getFullYear()%1e4,n,4)}function Wi(t){var n=t.getTimezoneOffset();return(n>0?"-":(n*=-1,"+"))+_i(n/60|0,"0",2)+_i(n%60,"0",2)}function $i(t,n){return _i(t.getUTCDate(),n,2)}function Zi(t,n){return _i(t.getUTCHours(),n,2)}function Gi(t,n){return _i(t.getUTCHours()%12||12,n,2)}function Ji(t,n){return _i(1+og.count(Mg(t),t),n,3)}function Qi(t,n){return _i(t.getUTCMilliseconds(),n,3)}function Ki(t,n){return _i(t.getUTCMonth()+1,n,2)}function to(t,n){return _i(t.getUTCMinutes(),n,2)}function no(t,n){return _i(t.getUTCSeconds(),n,2)}function eo(t,n){return _i(ag.count(Mg(t),t),n,2)}function ro(t){return t.getUTCDay()}function io(t,n){return _i(cg.count(Mg(t),t),n,2)}function oo(t,n){return _i(t.getUTCFullYear()%100,n,2)}function uo(t,n){return _i(t.getUTCFullYear()%1e4,n,4)}function ao(){return"+0000"}function co(){return"%"}function so(n){return Cg=vi(n),t.timeFormat=Cg.format,t.timeParse=Cg.parse,t.utcFormat=Cg.utcFormat,t.utcParse=Cg.utcParse,Cg}function fo(t){return t.toISOString()}function lo(t){var n=new Date(t);return isNaN(n)?null:n}function ho(t){function n(n){var o=n+"",u=e.get(o);if(!u){if(i!==Yg)return i;e.set(o,u=r.push(n))}return t[(u-1)%t.length]}var e=q(),r=[],i=Yg;return t=null==t?[]:Ig.call(t),n.domain=function(t){if(!arguments.length)return r.slice();r=[],e=q();for(var i,o,u=-1,a=t.length;++u<a;)e.has(o=(i=t[u])+"")||e.set(o,r.push(i));return n},n.range=function(e){return arguments.length?(t=Ig.call(e),n):t.slice()},n.unknown=function(t){return arguments.length?(i=t,n):i},n.copy=function(){return ho().domain(r).range(t).unknown(i)},n}function po(){function t(){var t=i().length,r=u[1]<u[0],h=u[r-0],p=u[1-r];n=(p-h)/Math.max(1,t-c+2*s),a&&(n=Math.floor(n)),h+=(p-h-n*(t-c))*f,e=n*(1-c),a&&(h=Math.round(h),e=Math.round(e));var d=l(t).map(function(t){return h+n*t});return o(r?d.reverse():d)}var n,e,r=ho().unknown(void 0),i=r.domain,o=r.range,u=[0,1],a=!1,c=0,s=0,f=.5;return delete r.unknown,r.domain=function(n){return arguments.length?(i(n),t()):i()},r.range=function(n){return arguments.length?(u=[+n[0],+n[1]],t()):u.slice()},r.rangeRound=function(n){return u=[+n[0],+n[1]],a=!0,t()},r.bandwidth=function(){return e},r.step=function(){return n},r.round=function(n){return arguments.length?(a=!!n,t()):a},r.padding=function(n){return arguments.length?(c=s=Math.max(0,Math.min(1,n)),t()):c},r.paddingInner=function(n){return arguments.length?(c=Math.max(0,Math.min(1,n)),t()):c},r.paddingOuter=function(n){return arguments.length?(s=Math.max(0,Math.min(1,n)),t()):s},r.align=function(n){return arguments.length?(f=Math.max(0,Math.min(1,n)),t()):f},r.copy=function(){return po().domain(i()).range(u).round(a).paddingInner(c).paddingOuter(s).align(f)},t()}function vo(t){var n=t.copy;return t.padding=t.paddingOuter,delete t.paddingInner,delete t.paddingOuter,t.copy=function(){return vo(n())},t}function _o(){return vo(po().paddingInner(1))}function yo(t){return function(){return t}}function go(t){return+t}function mo(t,n){return(n-=t=+t)?function(e){return(e-t)/n}:yo(n)}function xo(t){return function(n,e){var r=t(n=+n,e=+e);return function(t){return t<=n?0:t>=e?1:r(t)}}}function bo(t){return function(n,e){var r=t(n=+n,e=+e);return function(t){return t<=0?n:t>=1?e:r(t)}}}function wo(t,n,e,r){var i=t[0],o=t[1],u=n[0],a=n[1];return o<i?(i=e(o,i),u=r(a,u)):(i=e(i,o),u=r(u,a)),function(t){return u(i(t))}}function Mo(t,n,e,r){var i=Math.min(t.length,n.length)-1,o=new Array(i),u=new Array(i),a=-1;for(t[i]<t[0]&&(t=t.slice().reverse(),n=n.slice().reverse());++a<i;)o[a]=e(t[a],t[a+1]),u[a]=r(n[a],n[a+1]);return function(n){var e=Sd(t,n,1,i)-1;return u[e](o[e](n))}}function To(t,n){return n.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp())}function ko(t,n){function e(){return i=Math.min(a.length,c.length)>2?Mo:wo,o=u=null,r}function r(n){return(o||(o=i(a,c,f?xo(t):t,s)))(+n)}var i,o,u,a=Bg,c=Bg,s=cr,f=!1;return r.invert=function(t){return(u||(u=i(c,a,mo,f?bo(n):n)))(+t)},r.domain=function(t){return arguments.length?(a=Fg.call(t,go),e()):a.slice()},r.range=function(t){return arguments.length?(c=Ig.call(t),e()):c.slice()},r.rangeRound=function(t){return c=Ig.call(t),s=sr,e()},r.clamp=function(t){return arguments.length?(f=!!t,e()):f},r.interpolate=function(t){return arguments.length?(s=t,e()):s},e()}function No(n,e,r){var i,o=n[0],u=n[n.length-1],a=p(o,u,null==e?10:e);switch(r=ii(null==r?",f":r),r.type){case"s":var c=Math.max(Math.abs(o),Math.abs(u));return null!=r.precision||isNaN(i=fi(a,c))||(r.precision=i),t.formatPrefix(r,c);case"":case"e":case"g":case"p":case"r":null!=r.precision||isNaN(i=li(a,Math.max(Math.abs(o),Math.abs(u))))||(r.precision=i-("e"===r.type));break;case"f":case"%":null!=r.precision||isNaN(i=si(a))||(r.precision=i-2*("%"===r.type))}return t.format(r)}function So(t){var n=t.domain;return t.ticks=function(t){var e=n();return h(e[0],e[e.length-1],null==t?10:t)},t.tickFormat=function(t,e){return No(n(),t,e)},t.nice=function(e){var r=n(),i=r.length-1,o=null==e?10:e,u=r[0],a=r[i],c=p(u,a,o);return c&&(c=p(Math.floor(u/c)*c,Math.ceil(a/c)*c,o),r[0]=Math.floor(u/c)*c,r[i]=Math.ceil(a/c)*c,n(r)),t},t}function Ao(){var t=ko(mo,rr);return t.copy=function(){return To(t,Ao())},So(t)}function Eo(){function t(t){return+t}var n=[0,1];return t.invert=t,t.domain=t.range=function(e){return arguments.length?(n=Fg.call(e,go),t):n.slice()},t.copy=function(){return Eo().domain(n)},So(t)}function Co(t,n){t=t.slice();var e,r=0,i=t.length-1,o=t[r],u=t[i];return u<o&&(e=r,r=i,i=e,e=o,o=u,u=e),t[r]=n.floor(o),t[i]=n.ceil(u),t}function zo(t,n){return(n=Math.log(n/t))?function(e){return Math.log(e/t)/n}:yo(n)}function Po(t,n){return t<0?function(e){return-Math.pow(-n,e)*Math.pow(-t,1-e)}:function(e){return Math.pow(n,e)*Math.pow(t,1-e)}}function qo(t){return isFinite(t)?+("1e"+t):t<0?0:t}function Lo(t){return 10===t?qo:t===Math.E?Math.exp:function(n){return Math.pow(t,n)}}function Ro(t){return t===Math.E?Math.log:10===t&&Math.log10||2===t&&Math.log2||(t=Math.log(t),function(n){return Math.log(n)/t})}function Uo(t){return function(n){return-t(-n)}}function Do(){function n(){return o=Ro(i),u=Lo(i),r()[0]<0&&(o=Uo(o),u=Uo(u)),e}var e=ko(zo,Po).domain([1,10]),r=e.domain,i=10,o=Ro(10),u=Lo(10);return e.base=function(t){return arguments.length?(i=+t,n()):i},e.domain=function(t){return arguments.length?(r(t),n()):r()},e.ticks=function(t){var n,e=r(),a=e[0],c=e[e.length-1];(n=c<a)&&(p=a,a=c,c=p);var s,f,l,p=o(a),d=o(c),v=null==t?10:+t,_=[];if(!(i%1)&&d-p<v){if(p=Math.round(p)-1,d=Math.round(d)+1,a>0){for(;p<d;++p)for(f=1,s=u(p);f<i;++f)if(l=s*f,!(l<a)){if(l>c)break;_.push(l)}}else for(;p<d;++p)for(f=i-1,s=u(p);f>=1;--f)if(l=s*f,!(l<a)){if(l>c)break;_.push(l)}}else _=h(p,d,Math.min(d-p,v)).map(u);return n?_.reverse():_},e.tickFormat=function(n,r){if(null==r&&(r=10===i?".0e":","),"function"!=typeof r&&(r=t.format(r)),n===1/0)return r;null==n&&(n=10);var a=Math.max(1,i*n/e.ticks().length);return function(t){var n=t/u(Math.round(o(t)));return n*i<i-.5&&(n*=i),n<=a?r(t):""}},e.nice=function(){return r(Co(r(),{floor:function(t){return u(Math.floor(o(t)))},ceil:function(t){return u(Math.ceil(o(t)))}}))},e.copy=function(){return To(e,Do().base(i))},e}function Oo(t,n){return t<0?-Math.pow(-t,n):Math.pow(t,n)}function Fo(){function t(t,n){return(n=Oo(n,e)-(t=Oo(t,e)))?function(r){return(Oo(r,e)-t)/n}:yo(n)}function n(t,n){return n=Oo(n,e)-(t=Oo(t,e)),function(r){return Oo(t+n*r,1/e)}}var e=1,r=ko(t,n),i=r.domain;return r.exponent=function(t){return arguments.length?(e=+t,i(i())):e},r.copy=function(){return To(r,Fo().exponent(e))},So(r)}function Io(){return Fo().exponent(.5)}function Yo(){function t(){var t=0,n=Math.max(1,i.length);for(o=new Array(n-1);++t<n;)o[t-1]=_(r,t/n);return e}function e(t){if(!isNaN(t=+t))return i[Sd(o,t)]}var r=[],i=[],o=[];return e.invertExtent=function(t){var n=i.indexOf(t);return n<0?[NaN,NaN]:[n>0?o[n-1]:r[0],n<o.length?o[n]:r[r.length-1]]},e.domain=function(e){if(!arguments.length)return r.slice();r=[];for(var i,o=0,u=e.length;o<u;++o)i=e[o],null==i||isNaN(i=+i)||r.push(i);return r.sort(n),t()},e.range=function(n){return arguments.length?(i=Ig.call(n),t()):i.slice()},e.quantiles=function(){return o.slice()},e.copy=function(){return Yo().domain(r).range(i)},e}function Bo(){function t(t){if(t<=t)return u[Sd(o,t,0,i)]}function n(){var n=-1;for(o=new Array(i);++n<i;)o[n]=((n+1)*r-(n-i)*e)/(i+1);return t}var e=0,r=1,i=1,o=[.5],u=[0,1];return t.domain=function(t){return arguments.length?(e=+t[0],r=+t[1],n()):[e,r]},t.range=function(t){return arguments.length?(i=(u=Ig.call(t)).length-1,n()):u.slice()},t.invertExtent=function(t){var n=u.indexOf(t);return n<0?[NaN,NaN]:n<1?[e,o[0]]:n>=i?[o[i-1],r]:[o[n-1],o[n]]},t.copy=function(){return Bo().domain([e,r]).range(u)},So(t)}function jo(){function t(t){if(t<=t)return e[Sd(n,t,0,r)]}var n=[.5],e=[0,1],r=1;return t.domain=function(i){return arguments.length?(n=Ig.call(i),r=Math.min(n.length,e.length-1),t):n.slice()},t.range=function(i){return arguments.length?(e=Ig.call(i),r=Math.min(n.length,e.length-1),t):e.slice()},t.invertExtent=function(t){var r=e.indexOf(t);return[n[r-1],n[r]]},t.copy=function(){return jo().domain(n).range(e)},t}function Ho(t){return new Date(t)}function Xo(t){return t instanceof Date?+t:+new Date((+t))}function Vo(t,n,r,i,o,u,a,c,s){function f(e){return(a(e)<e?_:u(e)<e?y:o(e)<e?g:i(e)<e?m:n(e)<e?r(e)<e?x:b:t(e)<e?w:M)(e)}function l(n,r,i,o){if(null==n&&(n=10),"number"==typeof n){var u=Math.abs(i-r)/n,a=e(function(t){return t[2]}).right(T,u);a===T.length?(o=p(r/Zg,i/Zg,n),n=t):a?(a=T[u/T[a-1][2]<T[a][2]/u?a-1:a],o=a[1],n=a[0]):(o=p(r,i,n),n=c)}return null==o?n:n.every(o)}var h=ko(mo,rr),d=h.invert,v=h.domain,_=s(".%L"),y=s(":%S"),g=s("%I:%M"),m=s("%I %p"),x=s("%a %d"),b=s("%b %d"),w=s("%B"),M=s("%Y"),T=[[a,1,jg],[a,5,5*jg],[a,15,15*jg],[a,30,30*jg],[u,1,Hg],[u,5,5*Hg],[u,15,15*Hg],[u,30,30*Hg],[o,1,Xg],[o,3,3*Xg],[o,6,6*Xg],[o,12,12*Xg],[i,1,Vg],[i,2,2*Vg],[r,1,Wg],[n,1,$g],[n,3,3*$g],[t,1,Zg]];return h.invert=function(t){return new Date(d(t))},h.domain=function(t){return arguments.length?v(Fg.call(t,Xo)):v().map(Ho)},h.ticks=function(t,n){var e,r=v(),i=r[0],o=r[r.length-1],u=o<i;return u&&(e=i,i=o,o=e),e=l(t,i,o,n),e=e?e.range(i,o+1):[],u?e.reverse():e},h.tickFormat=function(t,n){return null==n?f:s(n)},h.nice=function(t,n){var e=v();return(t=l(t,e[0],e[e.length-1],n))?v(Co(e,t)):h},h.copy=function(){return To(h,Vo(t,n,r,i,o,u,a,c,s))},h}function Wo(){return Vo(Ky,Jy,Dy,Ry,qy,zy,Ey,wy,t.timeFormat).domain([new Date(2e3,0,1),new Date(2e3,0,2)])}function $o(){return Vo(Mg,bg,ag,og,rg,ng,Ey,wy,t.utcFormat).domain([Date.UTC(2e3,0,1),Date.UTC(2e3,0,2)])}function Zo(t){return t.match(/.{6}/g).map(function(t){return"#"+t})}function Go(t){(t<0||t>1)&&(t-=Math.floor(t));var n=Math.abs(t-.5);return rm.h=360*t-100,rm.s=1.5-1.5*n,rm.l=.8-.9*n,rm+""}function Jo(t){var n=t.length;return function(e){return t[Math.max(0,Math.min(n-1,Math.floor(e*n)))]}}function Qo(t){function n(n){var o=(n-e)/(r-e);return t(i?Math.max(0,Math.min(1,o)):o)}var e=0,r=1,i=!1;return n.domain=function(t){return arguments.length?(e=+t[0],r=+t[1],n):[e,r]},n.clamp=function(t){return arguments.length?(i=!!t,n):i},n.interpolator=function(e){return arguments.length?(t=e,n):t},n.copy=function(){return Qo(t).domain([e,r]).clamp(i)},So(n)}function Ko(t){var n=t+="",e=n.indexOf(":");return e>=0&&"xmlns"!==(n=t.slice(0,e))&&(t=t.slice(e+1)),sm.hasOwnProperty(n)?{space:sm[n],local:t}:t}function tu(t){return function(){var n=this.ownerDocument,e=this.namespaceURI;return e===cm&&n.documentElement.namespaceURI===cm?n.createElement(t):n.createElementNS(e,t)}}function nu(t){return function(){return this.ownerDocument.createElementNS(t.space,t.local)}}function eu(t){var n=Ko(t);return(n.local?nu:tu)(n)}function ru(){return new iu}function iu(){this._="@"+(++fm).toString(36)}function ou(t,n,e){return t=uu(t,n,e),function(n){var e=n.relatedTarget;e&&(e===this||8&e.compareDocumentPosition(this))||t.call(this,n)}}function uu(n,e,r){return function(i){var o=t.event;t.event=i;try{n.call(this,this.__data__,e,r)}finally{t.event=o}}}function au(t){return t.trim().split(/^|\s+/).map(function(t){var n="",e=t.indexOf(".");return e>=0&&(n=t.slice(e+1),
t=t.slice(0,e)),{type:t,name:n}})}function cu(t){return function(){var n=this.__on;if(n){for(var e,r=0,i=-1,o=n.length;r<o;++r)e=n[r],t.type&&e.type!==t.type||e.name!==t.name?n[++i]=e:this.removeEventListener(e.type,e.listener,e.capture);++i?n.length=i:delete this.__on}}}function su(t,n,e){var r=vm.hasOwnProperty(t.type)?ou:uu;return function(i,o,u){var a,c=this.__on,s=r(n,o,u);if(c)for(var f=0,l=c.length;f<l;++f)if((a=c[f]).type===t.type&&a.name===t.name)return this.removeEventListener(a.type,a.listener,a.capture),this.addEventListener(a.type,a.listener=s,a.capture=e),void(a.value=n);this.addEventListener(t.type,s,e),a={type:t.type,name:t.name,value:n,listener:s,capture:e},c?c.push(a):this.__on=[a]}}function fu(t,n,e){var r,i,o=au(t+""),u=o.length;{if(!(arguments.length<2)){for(a=n?su:cu,null==e&&(e=!1),r=0;r<u;++r)this.each(a(o[r],n,e));return this}var a=this.node().__on;if(a)for(var c,s=0,f=a.length;s<f;++s)for(r=0,c=a[s];r<u;++r)if((i=o[r]).type===c.type&&i.name===c.name)return c.value}}function lu(n,e,r,i){var o=t.event;n.sourceEvent=t.event,t.event=n;try{return e.apply(r,i)}finally{t.event=o}}function hu(){for(var n,e=t.event;n=e.sourceEvent;)e=n;return e}function pu(t,n){var e=t.ownerSVGElement||t;if(e.createSVGPoint){var r=e.createSVGPoint();return r.x=n.clientX,r.y=n.clientY,r=r.matrixTransform(t.getScreenCTM().inverse()),[r.x,r.y]}var i=t.getBoundingClientRect();return[n.clientX-i.left-t.clientLeft,n.clientY-i.top-t.clientTop]}function du(t){var n=hu();return n.changedTouches&&(n=n.changedTouches[0]),pu(t,n)}function vu(){}function _u(t){return null==t?vu:function(){return this.querySelector(t)}}function yu(t){"function"!=typeof t&&(t=_u(t));for(var n=this._groups,e=n.length,r=new Array(e),i=0;i<e;++i)for(var o,u,a=n[i],c=a.length,s=r[i]=new Array(c),f=0;f<c;++f)(o=a[f])&&(u=t.call(o,o.__data__,f,a))&&("__data__"in o&&(u.__data__=o.__data__),s[f]=u);return new qa(r,this._parents)}function gu(){return[]}function mu(t){return null==t?gu:function(){return this.querySelectorAll(t)}}function xu(t){"function"!=typeof t&&(t=mu(t));for(var n=this._groups,e=n.length,r=[],i=[],o=0;o<e;++o)for(var u,a=n[o],c=a.length,s=0;s<c;++s)(u=a[s])&&(r.push(t.call(u,u.__data__,s,a)),i.push(u));return new qa(r,i)}function bu(t){"function"!=typeof t&&(t=dm(t));for(var n=this._groups,e=n.length,r=new Array(e),i=0;i<e;++i)for(var o,u=n[i],a=u.length,c=r[i]=[],s=0;s<a;++s)(o=u[s])&&t.call(o,o.__data__,s,u)&&c.push(o);return new qa(r,this._parents)}function wu(t){return new Array(t.length)}function Mu(){return new qa(this._enter||this._groups.map(wu),this._parents)}function Tu(t,n){this.ownerDocument=t.ownerDocument,this.namespaceURI=t.namespaceURI,this._next=null,this._parent=t,this.__data__=n}function ku(t){return function(){return t}}function Nu(t,n,e,r,i,o){for(var u,a=0,c=n.length,s=o.length;a<s;++a)(u=n[a])?(u.__data__=o[a],r[a]=u):e[a]=new Tu(t,o[a]);for(;a<c;++a)(u=n[a])&&(i[a]=u)}function Su(t,n,e,r,i,o,u){var a,c,s,f={},l=n.length,h=o.length,p=new Array(l);for(a=0;a<l;++a)(c=n[a])&&(p[a]=s=ym+u.call(c,c.__data__,a,n),s in f?i[a]=c:f[s]=c);for(a=0;a<h;++a)s=ym+u.call(t,o[a],a,o),(c=f[s])?(r[a]=c,c.__data__=o[a],f[s]=null):e[a]=new Tu(t,o[a]);for(a=0;a<l;++a)(c=n[a])&&f[p[a]]===c&&(i[a]=c)}function Au(t,n){if(!t)return p=new Array(this.size()),s=-1,this.each(function(t){p[++s]=t}),p;var e=n?Su:Nu,r=this._parents,i=this._groups;"function"!=typeof t&&(t=ku(t));for(var o=i.length,u=new Array(o),a=new Array(o),c=new Array(o),s=0;s<o;++s){var f=r[s],l=i[s],h=l.length,p=t.call(f,f&&f.__data__,s,r),d=p.length,v=a[s]=new Array(d),_=u[s]=new Array(d),y=c[s]=new Array(h);e(f,l,v,_,y,p,n);for(var g,m,x=0,b=0;x<d;++x)if(g=v[x]){for(x>=b&&(b=x+1);!(m=_[b])&&++b<d;);g._next=m||null}}return u=new qa(u,r),u._enter=a,u._exit=c,u}function Eu(){return new qa(this._exit||this._groups.map(wu),this._parents)}function Cu(t){for(var n=this._groups,e=t._groups,r=n.length,i=e.length,o=Math.min(r,i),u=new Array(r),a=0;a<o;++a)for(var c,s=n[a],f=e[a],l=s.length,h=u[a]=new Array(l),p=0;p<l;++p)(c=s[p]||f[p])&&(h[p]=c);for(;a<r;++a)u[a]=n[a];return new qa(u,this._parents)}function zu(){for(var t=this._groups,n=-1,e=t.length;++n<e;)for(var r,i=t[n],o=i.length-1,u=i[o];--o>=0;)(r=i[o])&&(u&&u!==r.nextSibling&&u.parentNode.insertBefore(r,u),u=r);return this}function Pu(t){function n(n,e){return n&&e?t(n.__data__,e.__data__):!n-!e}t||(t=qu);for(var e=this._groups,r=e.length,i=new Array(r),o=0;o<r;++o){for(var u,a=e[o],c=a.length,s=i[o]=new Array(c),f=0;f<c;++f)(u=a[f])&&(s[f]=u);s.sort(n)}return new qa(i,this._parents).order()}function qu(t,n){return t<n?-1:t>n?1:t>=n?0:NaN}function Lu(){var t=arguments[0];return arguments[0]=this,t.apply(null,arguments),this}function Ru(){var t=new Array(this.size()),n=-1;return this.each(function(){t[++n]=this}),t}function Uu(){for(var t=this._groups,n=0,e=t.length;n<e;++n)for(var r=t[n],i=0,o=r.length;i<o;++i){var u=r[i];if(u)return u}return null}function Du(){var t=0;return this.each(function(){++t}),t}function Ou(){return!this.node()}function Fu(t){for(var n=this._groups,e=0,r=n.length;e<r;++e)for(var i,o=n[e],u=0,a=o.length;u<a;++u)(i=o[u])&&t.call(i,i.__data__,u,o);return this}function Iu(t){return function(){this.removeAttribute(t)}}function Yu(t){return function(){this.removeAttributeNS(t.space,t.local)}}function Bu(t,n){return function(){this.setAttribute(t,n)}}function ju(t,n){return function(){this.setAttributeNS(t.space,t.local,n)}}function Hu(t,n){return function(){var e=n.apply(this,arguments);null==e?this.removeAttribute(t):this.setAttribute(t,e)}}function Xu(t,n){return function(){var e=n.apply(this,arguments);null==e?this.removeAttributeNS(t.space,t.local):this.setAttributeNS(t.space,t.local,e)}}function Vu(t,n){var e=Ko(t);if(arguments.length<2){var r=this.node();return e.local?r.getAttributeNS(e.space,e.local):r.getAttribute(e)}return this.each((null==n?e.local?Yu:Iu:"function"==typeof n?e.local?Xu:Hu:e.local?ju:Bu)(e,n))}function Wu(t){return t.ownerDocument&&t.ownerDocument.defaultView||t.document&&t||t.defaultView}function $u(t){return function(){this.style.removeProperty(t)}}function Zu(t,n,e){return function(){this.style.setProperty(t,n,e)}}function Gu(t,n,e){return function(){var r=n.apply(this,arguments);null==r?this.style.removeProperty(t):this.style.setProperty(t,r,e)}}function Ju(t,n,e){var r;return arguments.length>1?this.each((null==n?$u:"function"==typeof n?Gu:Zu)(t,n,null==e?"":e)):Wu(r=this.node()).getComputedStyle(r,null).getPropertyValue(t)}function Qu(t){return function(){delete this[t]}}function Ku(t,n){return function(){this[t]=n}}function ta(t,n){return function(){var e=n.apply(this,arguments);null==e?delete this[t]:this[t]=e}}function na(t,n){return arguments.length>1?this.each((null==n?Qu:"function"==typeof n?ta:Ku)(t,n)):this.node()[t]}function ea(t){return t.trim().split(/^|\s+/)}function ra(t){return t.classList||new ia(t)}function ia(t){this._node=t,this._names=ea(t.getAttribute("class")||"")}function oa(t,n){for(var e=ra(t),r=-1,i=n.length;++r<i;)e.add(n[r])}function ua(t,n){for(var e=ra(t),r=-1,i=n.length;++r<i;)e.remove(n[r])}function aa(t){return function(){oa(this,t)}}function ca(t){return function(){ua(this,t)}}function sa(t,n){return function(){(n.apply(this,arguments)?oa:ua)(this,t)}}function fa(t,n){var e=ea(t+"");if(arguments.length<2){for(var r=ra(this.node()),i=-1,o=e.length;++i<o;)if(!r.contains(e[i]))return!1;return!0}return this.each(("function"==typeof n?sa:n?aa:ca)(e,n))}function la(){this.textContent=""}function ha(t){return function(){this.textContent=t}}function pa(t){return function(){var n=t.apply(this,arguments);this.textContent=null==n?"":n}}function da(t){return arguments.length?this.each(null==t?la:("function"==typeof t?pa:ha)(t)):this.node().textContent}function va(){this.innerHTML=""}function _a(t){return function(){this.innerHTML=t}}function ya(t){return function(){var n=t.apply(this,arguments);this.innerHTML=null==n?"":n}}function ga(t){return arguments.length?this.each(null==t?va:("function"==typeof t?ya:_a)(t)):this.node().innerHTML}function ma(){this.nextSibling&&this.parentNode.appendChild(this)}function xa(){return this.each(ma)}function ba(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function wa(){return this.each(ba)}function Ma(t){var n="function"==typeof t?t:eu(t);return this.select(function(){return this.appendChild(n.apply(this,arguments))})}function Ta(){return null}function ka(t,n){var e="function"==typeof t?t:eu(t),r=null==n?Ta:"function"==typeof n?n:_u(n);return this.select(function(){return this.insertBefore(e.apply(this,arguments),r.apply(this,arguments)||null)})}function Na(){var t=this.parentNode;t&&t.removeChild(this)}function Sa(){return this.each(Na)}function Aa(t){return arguments.length?this.property("__data__",t):this.node().__data__}function Ea(t,n,e){var r=Wu(t),i=r.CustomEvent;i?i=new i(n,e):(i=r.document.createEvent("Event"),e?(i.initEvent(n,e.bubbles,e.cancelable),i.detail=e.detail):i.initEvent(n,!1,!1)),t.dispatchEvent(i)}function Ca(t,n){return function(){return Ea(this,t,n)}}function za(t,n){return function(){return Ea(this,t,n.apply(this,arguments))}}function Pa(t,n){return this.each(("function"==typeof n?za:Ca)(t,n))}function qa(t,n){this._groups=t,this._parents=n}function La(){return new qa([[document.documentElement]],gm)}function Ra(t){return"string"==typeof t?new qa([[document.querySelector(t)]],[document.documentElement]):new qa([[t]],gm)}function Ua(t){return"string"==typeof t?new qa([document.querySelectorAll(t)],[document.documentElement]):new qa([null==t?[]:t],gm)}function Da(t,n,e){arguments.length<3&&(e=n,n=hu().changedTouches);for(var r,i=0,o=n?n.length:0;i<o;++i)if((r=n[i]).identifier===e)return pu(t,r);return null}function Oa(t,n){null==n&&(n=hu().touches);for(var e=0,r=n?n.length:0,i=new Array(r);e<r;++e)i[e]=pu(t,n[e]);return i}function Fa(t,n,e,r,i,o){var u=t.__transition;if(u){if(e in u)return}else t.__transition={};ja(t,e,{name:n,index:r,group:i,on:mm,tween:xm,time:o.time,delay:o.delay,duration:o.duration,ease:o.ease,timer:null,state:bm})}function Ia(t,n){var e=t.__transition;if(!e||!(e=e[n])||e.state>bm)throw new Error("too late");return e}function Ya(t,n){var e=t.__transition;if(!e||!(e=e[n])||e.state>Mm)throw new Error("too late");return e}function Ba(t,n){var e=t.__transition;if(!e||!(e=e[n]))throw new Error("too late");return e}function ja(t,n,e){function r(t){e.state=wm,e.delay<=t?i(t-e.delay):e.timer.restart(i,e.delay,e.time)}function i(r){var i,c,s,f;for(i in a)f=a[i],f.name===e.name&&(f.state===Tm?(f.state=Nm,f.timer.stop(),f.on.call("interrupt",t,t.__data__,f.index,f.group),delete a[i]):+i<n&&(f.state=Nm,f.timer.stop(),delete a[i]));if(Wr(function(){e.state===Tm&&(e.timer.restart(o,e.delay,e.time),o(r))}),e.state=Mm,e.on.call("start",t,t.__data__,e.index,e.group),e.state===Mm){for(e.state=Tm,u=new Array(s=e.tween.length),i=0,c=-1;i<s;++i)(f=e.tween[i].value.call(t,t.__data__,e.index,e.group))&&(u[++c]=f);u.length=c+1}}function o(r){for(var i=r<e.duration?e.ease.call(null,r/e.duration):(e.state=km,1),o=-1,c=u.length;++o<c;)u[o].call(null,i);if(e.state===km){e.state=Nm,e.timer.stop(),e.on.call("end",t,t.__data__,e.index,e.group);for(o in a)if(+o!==n)return void delete a[n];delete t.__transition}}var u,a=t.__transition;a[n]=e,e.timer=Yr(r,0,e.time)}function Ha(t,n){var e,r,i,o=t.__transition,u=!0;if(o){n=null==n?null:n+"";for(i in o)(e=o[i]).name===n?(r=e.state===Tm,e.state=Nm,e.timer.stop(),r&&e.on.call("interrupt",t,t.__data__,e.index,e.group),delete o[i]):u=!1;u&&delete t.__transition}}function Xa(t){return this.each(function(){Ha(this,t)})}function Va(t,n){var e,r;return function(){var i=Ya(this,t),o=i.tween;if(o!==e){r=e=o;for(var u=0,a=r.length;u<a;++u)if(r[u].name===n){r=r.slice(),r.splice(u,1);break}}i.tween=r}}function Wa(t,n,e){var r,i;if("function"!=typeof e)throw new Error;return function(){var o=Ya(this,t),u=o.tween;if(u!==r){i=(r=u).slice();for(var a={name:n,value:e},c=0,s=i.length;c<s;++c)if(i[c].name===n){i[c]=a;break}c===s&&i.push(a)}o.tween=i}}function $a(t,n){var e=this._id;if(t+="",arguments.length<2){for(var r,i=Ba(this.node(),e).tween,o=0,u=i.length;o<u;++o)if((r=i[o]).name===t)return r.value;return null}return this.each((null==n?Va:Wa)(e,t,n))}function Za(t,n,e){var r=t._id;return t.each(function(){var t=Ya(this,r);(t.value||(t.value={}))[n]=e.apply(this,arguments)}),function(t){return Ba(t,r).value[n]}}function Ga(t,n){var e;return("number"==typeof n?rr:n instanceof be?S_:(e=be(n))?(n=e,S_):ar)(t,n)}function Ja(t){return function(){this.removeAttribute(t)}}function Qa(t){return function(){this.removeAttributeNS(t.space,t.local)}}function Ka(t,n,e){var r,i;return function(){var o=this.getAttribute(t);return o===e?null:o===r?i:i=n(r=o,e)}}function tc(t,n,e){var r,i;return function(){var o=this.getAttributeNS(t.space,t.local);return o===e?null:o===r?i:i=n(r=o,e)}}function nc(t,n,e){var r,i,o;return function(){var u,a=e(this);return null==a?void this.removeAttribute(t):(u=this.getAttribute(t),u===a?null:u===r&&a===i?o:o=n(r=u,i=a))}}function ec(t,n,e){var r,i,o;return function(){var u,a=e(this);return null==a?void this.removeAttributeNS(t.space,t.local):(u=this.getAttributeNS(t.space,t.local),u===a?null:u===r&&a===i?o:o=n(r=u,i=a))}}function rc(t,n){var e=Ko(t),r="transform"===e?R_:Ga;return this.attrTween(t,"function"==typeof n?(e.local?ec:nc)(e,r,Za(this,"attr."+t,n)):null==n?(e.local?Qa:Ja)(e):(e.local?tc:Ka)(e,r,n))}function ic(t,n){function e(){var e=this,r=n.apply(e,arguments);return r&&function(n){e.setAttributeNS(t.space,t.local,r(n))}}return e._value=n,e}function oc(t,n){function e(){var e=this,r=n.apply(e,arguments);return r&&function(n){e.setAttribute(t,r(n))}}return e._value=n,e}function uc(t,n){var e="attr."+t;if(arguments.length<2)return(e=this.tween(e))&&e._value;if(null==n)return this.tween(e,null);if("function"!=typeof n)throw new Error;var r=Ko(t);return this.tween(e,(r.local?ic:oc)(r,n))}function ac(t,n){return function(){Ia(this,t).delay=+n.apply(this,arguments)}}function cc(t,n){return n=+n,function(){Ia(this,t).delay=n}}function sc(t){var n=this._id;return arguments.length?this.each(("function"==typeof t?ac:cc)(n,t)):Ba(this.node(),n).delay}function fc(t,n){return function(){Ya(this,t).duration=+n.apply(this,arguments)}}function lc(t,n){return n=+n,function(){Ya(this,t).duration=n}}function hc(t){var n=this._id;return arguments.length?this.each(("function"==typeof t?fc:lc)(n,t)):Ba(this.node(),n).duration}function pc(t,n){if("function"!=typeof n)throw new Error;return function(){Ya(this,t).ease=n}}function dc(t){var n=this._id;return arguments.length?this.each(pc(n,t)):Ba(this.node(),n).ease}function vc(t){"function"!=typeof t&&(t=dm(t));for(var n=this._groups,e=n.length,r=new Array(e),i=0;i<e;++i)for(var o,u=n[i],a=u.length,c=r[i]=[],s=0;s<a;++s)(o=u[s])&&t.call(o,o.__data__,s,u)&&c.push(o);return new Uc(r,this._parents,this._name,this._id)}function _c(t){if(t._id!==this._id)throw new Error;for(var n=this._groups,e=t._groups,r=n.length,i=e.length,o=Math.min(r,i),u=new Array(r),a=0;a<o;++a)for(var c,s=n[a],f=e[a],l=s.length,h=u[a]=new Array(l),p=0;p<l;++p)(c=s[p]||f[p])&&(h[p]=c);for(;a<r;++a)u[a]=n[a];return new Uc(u,this._parents,this._name,this._id)}function yc(t){return(t+"").trim().split(/^|\s+/).every(function(t){var n=t.indexOf(".");return n>=0&&(t=t.slice(0,n)),!t||"start"===t})}function gc(t,n,e){var r,i,o=yc(n)?Ia:Ya;return function(){var u=o(this,t),a=u.on;a!==r&&(i=(r=a).copy()).on(n,e),u.on=i}}function mc(t,n){var e=this._id;return arguments.length<2?Ba(this.node(),e).on.on(t):this.each(gc(e,t,n))}function xc(t){return function(){var n=this.parentNode;for(var e in this.__transition)if(+e!==t)return;n&&n.removeChild(this)}}function bc(){return this.on("end.remove",xc(this._id))}function wc(t){var n=this._name,e=this._id;"function"!=typeof t&&(t=_u(t));for(var r=this._groups,i=r.length,o=new Array(i),u=0;u<i;++u)for(var a,c,s=r[u],f=s.length,l=o[u]=new Array(f),h=0;h<f;++h)(a=s[h])&&(c=t.call(a,a.__data__,h,s))&&("__data__"in a&&(c.__data__=a.__data__),l[h]=c,Fa(l[h],n,e,h,l,Ba(a,e)));return new Uc(o,this._parents,n,e)}function Mc(t){var n=this._name,e=this._id;"function"!=typeof t&&(t=mu(t));for(var r=this._groups,i=r.length,o=[],u=[],a=0;a<i;++a)for(var c,s=r[a],f=s.length,l=0;l<f;++l)if(c=s[l]){for(var h,p=t.call(c,c.__data__,l,s),d=Ba(c,e),v=0,_=p.length;v<_;++v)(h=p[v])&&Fa(h,n,e,v,p,d);o.push(p),u.push(c)}return new Uc(o,u,n,e)}function Tc(){return new Sm(this._groups,this._parents)}function kc(t,n){var e,r,i;return function(){var o=Wu(this).getComputedStyle(this,null),u=o.getPropertyValue(t),a=(this.style.removeProperty(t),o.getPropertyValue(t));return u===a?null:u===e&&a===r?i:i=n(e=u,r=a)}}function Nc(t){return function(){this.style.removeProperty(t)}}function Sc(t,n,e){var r,i;return function(){var o=Wu(this).getComputedStyle(this,null).getPropertyValue(t);return o===e?null:o===r?i:i=n(r=o,e)}}function Ac(t,n,e){var r,i,o;return function(){var u=Wu(this).getComputedStyle(this,null),a=u.getPropertyValue(t),c=e(this);return null==c&&(this.style.removeProperty(t),c=u.getPropertyValue(t)),a===c?null:a===r&&c===i?o:o=n(r=a,i=c)}}function Ec(t,n,e){var r="transform"==(t+="")?L_:Ga;return null==n?this.styleTween(t,kc(t,r)).on("end.style."+t,Nc(t)):this.styleTween(t,"function"==typeof n?Ac(t,r,Za(this,"style."+t,n)):Sc(t,r,n),e)}function Cc(t,n,e){function r(){var r=this,i=n.apply(r,arguments);return i&&function(n){r.style.setProperty(t,i(n),e)}}return r._value=n,r}function zc(t,n,e){var r="style."+(t+="");if(arguments.length<2)return(r=this.tween(r))&&r._value;if(null==n)return this.tween(r,null);if("function"!=typeof n)throw new Error;return this.tween(r,Cc(t,n,null==e?"":e))}function Pc(t){return function(){this.textContent=t}}function qc(t){return function(){var n=t(this);this.textContent=null==n?"":n}}function Lc(t){return this.tween("text","function"==typeof t?qc(Za(this,"text",t)):Pc(null==t?"":t+""))}function Rc(){for(var t=this._name,n=this._id,e=Oc(),r=this._groups,i=r.length,o=0;o<i;++o)for(var u,a=r[o],c=a.length,s=0;s<c;++s)if(u=a[s]){var f=Ba(u,n);Fa(u,t,e,s,a,{time:f.time+f.delay+f.duration,delay:0,duration:f.duration,ease:f.ease})}return new Uc(r,this._parents,t,e)}function Uc(t,n,e,r){this._groups=t,this._parents=n,this._name=e,this._id=r}function Dc(t){return La().transition(t)}function Oc(){return++Am}function Fc(t,n){for(var e;!(e=t.__transition)||!(e=e[n]);)if(!(t=t.parentNode))return Cm.time=Or(),Cm;return e}function Ic(t){var n,e;t instanceof Uc?(n=t._id,t=t._name):(n=Oc(),(e=Cm).time=Or(),t=null==t?null:t+"");for(var r=this._groups,i=r.length,o=0;o<i;++o)for(var u,a=r[o],c=a.length,s=0;s<c;++s)(u=a[s])&&Fa(u,t,n,s,a,e||Fc(u,n));return new Uc(r,this._parents,t,n)}function Yc(t,n){var e,r,i=t.__transition;if(i){n=null==n?null:n+"";for(r in i)if((e=i[r]).state>wm&&e.name===n)return new Uc([[t]],zm,n,(+r))}return null}function Bc(t){return t}function jc(t,n,e){var r=t(e);return"translate("+(isFinite(r)?r:n(e))+",0)"}function Hc(t,n,e){var r=t(e);return"translate(0,"+(isFinite(r)?r:n(e))+")"}function Xc(t){var n=t.bandwidth()/2;return function(e){return t(e)+n}}function Vc(){return!this.__axis}function Wc(t,n){function e(e){var s,f=null==i?n.ticks?n.ticks.apply(n,r):n.domain():i,l=null==o?n.tickFormat?n.tickFormat.apply(n,r):Bc:o,h=Math.max(u,0)+c,p=t===qm||t===Rm?jc:Hc,d=n.range(),v=d[0]+.5,_=d[d.length-1]+.5,y=(n.bandwidth?Xc:Bc)(n.copy()),g=e.selection?e.selection():e,m=g.selectAll(".domain").data([null]),x=g.selectAll(".tick").data(f,n).order(),b=x.exit(),w=x.enter().append("g").attr("class","tick"),M=x.select("line"),T=x.select("text"),k=t===qm||t===Um?-1:1,N=t===Um||t===Lm?(s="x","y"):(s="y","x");m=m.merge(m.enter().insert("path",".tick").attr("class","domain").attr("stroke","#000")),x=x.merge(w),M=M.merge(w.append("line").attr("stroke","#000").attr(s+"2",k*u).attr(N+"1",.5).attr(N+"2",.5)),T=T.merge(w.append("text").attr("fill","#000").attr(s,k*h).attr(N,.5).attr("dy",t===qm?"0em":t===Rm?".71em":".32em")),e!==g&&(m=m.transition(e),x=x.transition(e),M=M.transition(e),T=T.transition(e),b=b.transition(e).attr("opacity",Dm).attr("transform",function(t){return p(y,this.parentNode.__axis||y,t)}),w.attr("opacity",Dm).attr("transform",function(t){return p(this.parentNode.__axis||y,y,t)})),b.remove(),m.attr("d",t===Um||t==Lm?"M"+k*a+","+v+"H0.5V"+_+"H"+k*a:"M"+v+","+k*a+"V0.5H"+_+"V"+k*a),x.attr("opacity",1).attr("transform",function(t){return p(y,y,t)}),M.attr(s+"2",k*u),T.attr(s,k*h).text(l),g.filter(Vc).attr("fill","none").attr("font-size",10).attr("font-family","sans-serif").attr("text-anchor",t===Lm?"start":t===Um?"end":"middle"),g.each(function(){this.__axis=y})}var r=[],i=null,o=null,u=6,a=6,c=3;return e.scale=function(t){return arguments.length?(n=t,e):n},e.ticks=function(){return r=Pm.call(arguments),e},e.tickArguments=function(t){return arguments.length?(r=null==t?[]:Pm.call(t),e):r.slice()},e.tickValues=function(t){return arguments.length?(i=null==t?null:Pm.call(t),e):i&&i.slice()},e.tickFormat=function(t){return arguments.length?(o=t,e):o},e.tickSize=function(t){return arguments.length?(u=a=+t,e):u},e.tickSizeInner=function(t){return arguments.length?(u=+t,e):u},e.tickSizeOuter=function(t){return arguments.length?(a=+t,e):a},e.tickPadding=function(t){return arguments.length?(c=+t,e):c},e}function $c(t){return Wc(qm,t)}function Zc(t){return Wc(Lm,t)}function Gc(t){return Wc(Rm,t)}function Jc(t){return Wc(Um,t)}function Qc(t,n){return t.parent===n.parent?1:2}function Kc(t){return t.reduce(ts,0)/t.length}function ts(t,n){return t+n.x}function ns(t){return 1+t.reduce(es,0)}function es(t,n){return Math.max(t,n.y)}function rs(t){for(var n;n=t.children;)t=n[0];return t}function is(t){for(var n;n=t.children;)t=n[n.length-1];return t}function os(){function t(t){var o,u=0;t.eachAfter(function(t){var e=t.children;e?(t.x=Kc(e),t.y=ns(e)):(t.x=o?u+=n(t,o):0,t.y=0,o=t)});var a=rs(t),c=is(t),s=a.x-n(a,c)/2,f=c.x+n(c,a)/2;return t.eachAfter(i?function(n){n.x=(n.x-t.x)*e,n.y=(t.y-n.y)*r}:function(n){n.x=(n.x-s)/(f-s)*e,n.y=(1-(t.y?n.y/t.y:1))*r})}var n=Qc,e=1,r=1,i=!1;return t.separation=function(e){return arguments.length?(n=e,t):n},t.size=function(n){return arguments.length?(i=!1,e=+n[0],r=+n[1],t):i?null:[e,r]},t.nodeSize=function(n){return arguments.length?(i=!0,e=+n[0],r=+n[1],t):i?[e,r]:null},t}function us(t){var n,e,r,i,o=this,u=[o];do for(n=u.reverse(),u=[];o=n.pop();)if(t(o),e=o.children)for(r=0,i=e.length;r<i;++r)u.push(e[r]);while(u.length);return this}function as(t){for(var n,e,r=this,i=[r];r=i.pop();)if(t(r),n=r.children)for(e=n.length-1;e>=0;--e)i.push(n[e]);return this}function cs(t){for(var n,e,r,i=this,o=[i],u=[];i=o.pop();)if(u.push(i),n=i.children)for(e=0,r=n.length;e<r;++e)o.push(n[e]);for(;i=u.pop();)t(i);return this}function ss(t){return this.eachAfter(function(n){for(var e=+t(n.data)||0,r=n.children,i=r&&r.length;--i>=0;)e+=r[i].value;n.value=e})}function fs(t){return this.eachBefore(function(n){n.children&&n.children.sort(t)})}function ls(t){for(var n=this,e=hs(n,t),r=[n];n!==e;)n=n.parent,r.push(n);for(var i=r.length;t!==e;)r.splice(i,0,t),t=t.parent;return r}function hs(t,n){if(t===n)return t;var e=t.ancestors(),r=n.ancestors(),i=null;for(t=e.pop(),n=r.pop();t===n;)i=t,t=e.pop(),n=r.pop();return i}function ps(){for(var t=this,n=[t];t=t.parent;)n.push(t);return n}function ds(){var t=[];return this.each(function(n){t.push(n)}),t}function vs(){var t=[];return this.eachBefore(function(n){n.children||t.push(n)}),t}function _s(){var t=this,n=[];return t.each(function(e){e!==t&&n.push({source:e.parent,target:e})}),n}function ys(t,n){var e,r,i,o,u,a=new ws(t),c=+t.value&&(a.value=t.value),s=[a];for(null==n&&(n=ms);e=s.pop();)if(c&&(e.value=+e.data.value),(i=n(e.data))&&(u=i.length))for(e.children=new Array(u),o=u-1;o>=0;--o)s.push(r=e.children[o]=new ws(i[o])),r.parent=e,r.depth=e.depth+1;return a.eachBefore(bs)}function gs(){return ys(this).eachBefore(xs)}function ms(t){return t.children}function xs(t){t.data=t.data.data}function bs(t){var n=0;do t.height=n;while((t=t.parent)&&t.height<++n)}function ws(t){this.data=t,this.depth=this.height=0,this.parent=null}function Ms(t){this._=t,this.next=null}function Ts(t){for(var n,e=(t=t.slice()).length,r=null,i=r;e;){var o=new Ms(t[e-1]);i=i?i.next=o:r=o,t[n]=t[--e]}return{head:r,tail:i}}function ks(t){return Ss(Ts(t),[])}function Ns(t,n){var e=n.x-t.x,r=n.y-t.y,i=t.r-n.r;return i*i+1e-6>e*e+r*r}function Ss(t,n){var e,r,i,o=null,u=t.head;switch(n.length){case 1:e=As(n[0]);break;case 2:e=Es(n[0],n[1]);break;case 3:e=Cs(n[0],n[1],n[2])}for(;u;)i=u._,r=u.next,e&&Ns(e,i)?o=u:(o?(t.tail=o,o.next=null):t.head=t.tail=null,n.push(i),e=Ss(t,n),n.pop(),t.head?(u.next=t.head,t.head=u):(u.next=null,t.head=t.tail=u),o=t.tail,o.next=r),u=r;return t.tail=o,e}function As(t){return{x:t.x,y:t.y,r:t.r}}function Es(t,n){var e=t.x,r=t.y,i=t.r,o=n.x,u=n.y,a=n.r,c=o-e,s=u-r,f=a-i,l=Math.sqrt(c*c+s*s);return{x:(e+o+c/l*f)/2,y:(r+u+s/l*f)/2,r:(l+i+a)/2}}function Cs(t,n,e){var r=t.x,i=t.y,o=t.r,u=n.x,a=n.y,c=n.r,s=e.x,f=e.y,l=e.r,h=2*(r-u),p=2*(i-a),d=2*(c-o),v=r*r+i*i-o*o-u*u-a*a+c*c,_=2*(r-s),y=2*(i-f),g=2*(l-o),m=r*r+i*i-o*o-s*s-f*f+l*l,x=_*p-h*y,b=(p*m-y*v)/x-r,w=(y*d-p*g)/x,M=(_*v-h*m)/x-i,T=(h*g-_*d)/x,k=w*w+T*T-1,N=2*(b*w+M*T+o),S=b*b+M*M-o*o,A=(-N-Math.sqrt(N*N-4*k*S))/(2*k);return{x:b+w*A+r,y:M+T*A+i,r:A}}function zs(t,n,e){var r=t.x,i=t.y,o=n.r+e.r,u=t.r+e.r,a=n.x-r,c=n.y-i,s=a*a+c*c;if(s){var f=.5+((u*=u)-(o*=o))/(2*s),l=Math.sqrt(Math.max(0,2*o*(u+s)-(u-=s)*u-o*o))/(2*s);e.x=r+f*a+l*c,e.y=i+f*c-l*a}else e.x=r+u,e.y=i}function Ps(t,n){var e=n.x-t.x,r=n.y-t.y,i=t.r+n.r;return i*i>e*e+r*r}function qs(t,n,e){var r=t.x-n,i=t.y-e;return r*r+i*i}function Ls(t){this._=t,this.next=null,this.previous=null}function Rs(t){if(!(i=t.length))return 0;var n,e,r,i;if(n=t[0],n.x=0,n.y=0,!(i>1))return n.r;if(e=t[1],n.x=-e.r,e.x=n.r,e.y=0,!(i>2))return n.r+e.r;zs(e,n,r=t[2]);var o,u,a,c,s,f,l,h=n.r*n.r,p=e.r*e.r,d=r.r*r.r,v=h+p+d,_=h*n.x+p*e.x+d*r.x,y=h*n.y+p*e.y+d*r.y;n=new Ls(n),e=new Ls(e),r=new Ls(r),n.next=r.previous=e,e.next=n.previous=r,r.next=e.previous=n;t:for(a=3;a<i;++a){if(zs(n._,e._,r=t[a]),r=new Ls(r),(s=n.previous)===(c=e.next)){if(Ps(c._,r._)){n=e,e=c,--a;continue t}}else{f=c._.r,l=s._.r;do if(f<=l){if(Ps(c._,r._)){e=c,n.next=e,e.previous=n,--a;continue t}c=c.next,f+=c._.r}else{if(Ps(s._,r._)){n=s,n.next=e,e.previous=n,--a;continue t}s=s.previous,l+=s._.r}while(c!==s.next)}for(r.previous=n,r.next=e,n.next=e.previous=e=r,v+=d=r._.r*r._.r,_+=d*r._.x,y+=d*r._.y,h=qs(n._,o=_/v,u=y/v);(r=r.next)!==e;)(d=qs(r._,o,u))<h&&(n=r,h=d);e=n.next}for(n=[e._],r=e;(r=r.next)!==e;)n.push(r._);for(r=ks(n),a=0;a<i;++a)n=t[a],n.x-=r.x,n.y-=r.y;return r.r}function Us(t){return Rs(t),t}function Ds(t){return null==t?null:Os(t)}function Os(t){if("function"!=typeof t)throw new Error;return t}function Fs(){return 0}function Is(t){return function(){return t}}function Ys(t){return Math.sqrt(t.value)}function Bs(){function t(t){return t.x=e/2,t.y=r/2,n?t.eachBefore(js(n)).eachAfter(Hs(i,.5)).eachBefore(Xs(1)):t.eachBefore(js(Ys)).eachAfter(Hs(Fs,1)).eachAfter(Hs(i,t.r/Math.min(e,r))).eachBefore(Xs(Math.min(e,r)/(2*t.r))),t}var n=null,e=1,r=1,i=Fs;return t.radius=function(e){return arguments.length?(n=Ds(e),t):n},t.size=function(n){return arguments.length?(e=+n[0],r=+n[1],t):[e,r]},t.padding=function(n){return arguments.length?(i="function"==typeof n?n:Is(+n),t):i},t}function js(t){return function(n){n.children||(n.r=Math.max(0,+t(n)||0))}}function Hs(t,n){return function(e){if(r=e.children){var r,i,o,u=r.length,a=t(e)*n||0;if(a)for(i=0;i<u;++i)r[i].r+=a;if(o=Rs(r),a)for(i=0;i<u;++i)r[i].r-=a;e.r=o+a}}}function Xs(t){return function(n){var e=n.parent;n.r*=t,e&&(n.x=e.x+t*n.x,n.y=e.y+t*n.y)}}function Vs(t){t.x0=Math.round(t.x0),t.y0=Math.round(t.y0),t.x1=Math.round(t.x1),t.y1=Math.round(t.y1)}function Ws(t,n,e,r,i){for(var o,u=t.children,a=-1,c=u.length,s=t.value&&(r-n)/t.value;++a<c;)o=u[a],o.y0=e,o.y1=i,o.x0=n,o.x1=n+=o.value*s}function $s(){function t(t){var u=t.height+1;return t.x0=t.y0=i,t.x1=e,t.y1=r/u,t.eachBefore(n(r,u)),o&&t.eachBefore(Vs),t}function n(t,n){return function(e){e.children&&Ws(e,e.x0,t*(e.depth+1)/n,e.x1,t*(e.depth+2)/n);var r=e.x0,o=e.y0,u=e.x1-i,a=e.y1-i;u<r&&(r=u=(r+u)/2),a<o&&(o=a=(o+a)/2),e.x0=r,e.y0=o,e.x1=u,e.y1=a}}var e=1,r=1,i=0,o=!1;return t.round=function(n){return arguments.length?(o=!!n,t):o},t.size=function(n){return arguments.length?(e=+n[0],r=+n[1],t):[e,r]},t.padding=function(n){return arguments.length?(i=+n,t):i},t}function Zs(t){return t.id}function Gs(t){return t.parentId}function Js(){function t(t){var r,i,o,u,a,c,s,f=t.length,l=new Array(f),h={};for(i=0;i<f;++i)r=t[i],a=l[i]=new ws(r),null!=(c=n(r,i,t))&&(c+="")&&(s=Om+(a.id=c),h[s]=s in h?Im:a);for(i=0;i<f;++i)if(a=l[i],c=e(t[i],i,t),null!=c&&(c+="")){if(u=h[Om+c],!u)throw new Error("missing: "+c);if(u===Im)throw new Error("ambiguous: "+c);u.children?u.children.push(a):u.children=[a],a.parent=u}else{if(o)throw new Error("multiple roots");o=a}if(!o)throw new Error("no root");if(o.parent=Fm,o.eachBefore(function(t){t.depth=t.parent.depth+1,--f}).eachBefore(bs),o.parent=null,f>0)throw new Error("cycle");return o}var n=Zs,e=Gs;return t.id=function(e){return arguments.length?(n=Os(e),t):n},t.parentId=function(n){return arguments.length?(e=Os(n),t):e},t}function Qs(t,n){return t.parent===n.parent?1:2}function Ks(t){var n=t.children;return n?n[0]:t.t}function tf(t){var n=t.children;return n?n[n.length-1]:t.t}function nf(t,n,e){var r=e/(n.i-t.i);n.c-=r,n.s+=e,t.c+=r,n.z+=e,n.m+=e}function ef(t){for(var n,e=0,r=0,i=t.children,o=i.length;--o>=0;)n=i[o],n.z+=e,n.m+=e,e+=n.s+(r+=n.c)}function rf(t,n,e){return t.a.parent===n.parent?t.a:e}function of(t,n){this._=t,this.parent=null,this.children=null,this.A=null,this.a=this,this.z=0,this.m=0,this.c=0,this.s=0,this.t=null,this.i=n}function uf(t){for(var n,e,r,i,o,u=new of(t,0),a=[u];n=a.pop();)if(r=n._.children)for(n.children=new Array(o=r.length),i=o-1;i>=0;--i)a.push(e=n.children[i]=new of(r[i],i)),e.parent=n;return(u.parent=new of(null,0)).children=[u],u}function af(){function t(t){var r=uf(t);if(r.eachAfter(n),r.parent.m=-r.z,r.eachBefore(e),c)t.eachBefore(i);else{var s=t,f=t,l=t;t.eachBefore(function(t){t.x<s.x&&(s=t),t.x>f.x&&(f=t),t.depth>l.depth&&(l=t)});var h=s===f?1:o(s,f)/2,p=h-s.x,d=u/(f.x+h+p),v=a/(l.depth||1);t.eachBefore(function(t){t.x=(t.x+p)*d,t.y=t.depth*v})}return t}function n(t){var n=t.children,e=t.parent.children,i=t.i?e[t.i-1]:null;if(n){ef(t);var u=(n[0].z+n[n.length-1].z)/2;i?(t.z=i.z+o(t._,i._),t.m=t.z-u):t.z=u}else i&&(t.z=i.z+o(t._,i._));t.parent.A=r(t,i,t.parent.A||e[0])}function e(t){t._.x=t.z+t.parent.m,t.m+=t.parent.m}function r(t,n,e){if(n){for(var r,i=t,u=t,a=n,c=i.parent.children[0],s=i.m,f=u.m,l=a.m,h=c.m;a=tf(a),i=Ks(i),a&&i;)c=Ks(c),u=tf(u),u.a=t,r=a.z+l-i.z-s+o(a._,i._),r>0&&(nf(rf(a,t,e),t,r),s+=r,f+=r),l+=a.m,s+=i.m,h+=c.m,f+=u.m;a&&!tf(u)&&(u.t=a,u.m+=l-f),i&&!Ks(c)&&(c.t=i,c.m+=s-h,e=t)}return e}function i(t){t.x*=u,t.y=t.depth*a}var o=Qs,u=1,a=1,c=null;return t.separation=function(n){return arguments.length?(o=n,t):o},t.size=function(n){return arguments.length?(c=!1,u=+n[0],a=+n[1],t):c?null:[u,a]},t.nodeSize=function(n){return arguments.length?(c=!0,u=+n[0],a=+n[1],t):c?[u,a]:null},t}function cf(t,n,e,r,i){for(var o,u=t.children,a=-1,c=u.length,s=t.value&&(i-e)/t.value;++a<c;)o=u[a],o.x0=n,o.x1=r,o.y0=e,o.y1=e+=o.value*s}function sf(t,n,e,r,i,o){for(var u,a,c,s,f,l,h,p,d,v,_,y,g=[],m=n.children,x=0,b=m.length,w=n.value;x<b;){for(s=i-e,f=o-r,h=p=l=m[x].value,_=Math.max(f/s,s/f)/(w*t),y=l*l*_,v=Math.max(p/y,y/h),c=x+1;c<b;++c){if(l+=a=m[c].value,a<h&&(h=a),a>p&&(p=a),y=l*l*_,d=Math.max(p/y,y/h),d>v){l-=a;break}v=d}g.push(u={value:l,dice:s<f,children:m.slice(x,c)}),u.dice?Ws(u,e,r,i,w?r+=f*l/w:o):cf(u,e,r,w?e+=s*l/w:i,o),w-=l,x=c}return g}function ff(){function t(t){return t.x0=t.y0=0,t.x1=i,t.y1=o,t.eachBefore(n),u=[0],r&&t.eachBefore(Vs),t}function n(t){var n=u[t.depth],r=t.x0+n,i=t.y0+n,o=t.x1-n,h=t.y1-n;
o<r&&(r=o=(r+o)/2),h<i&&(i=h=(i+h)/2),t.x0=r,t.y0=i,t.x1=o,t.y1=h,t.children&&(n=u[t.depth+1]=a(t)/2,r+=l(t)-n,i+=c(t)-n,o-=s(t)-n,h-=f(t)-n,o<r&&(r=o=(r+o)/2),h<i&&(i=h=(i+h)/2),e(t,r,i,o,h))}var e=Bm,r=!1,i=1,o=1,u=[0],a=Fs,c=Fs,s=Fs,f=Fs,l=Fs;return t.round=function(n){return arguments.length?(r=!!n,t):r},t.size=function(n){return arguments.length?(i=+n[0],o=+n[1],t):[i,o]},t.tile=function(n){return arguments.length?(e=Os(n),t):e},t.padding=function(n){return arguments.length?t.paddingInner(n).paddingOuter(n):t.paddingInner()},t.paddingInner=function(n){return arguments.length?(a="function"==typeof n?n:Is(+n),t):a},t.paddingOuter=function(n){return arguments.length?t.paddingTop(n).paddingRight(n).paddingBottom(n).paddingLeft(n):t.paddingTop()},t.paddingTop=function(n){return arguments.length?(c="function"==typeof n?n:Is(+n),t):c},t.paddingRight=function(n){return arguments.length?(s="function"==typeof n?n:Is(+n),t):s},t.paddingBottom=function(n){return arguments.length?(f="function"==typeof n?n:Is(+n),t):f},t.paddingLeft=function(n){return arguments.length?(l="function"==typeof n?n:Is(+n),t):l},t}function lf(t,n,e,r,i){function o(t,n,e,r,i,u,a){if(t>=n-1){var s=c[t];return s.x0=r,s.y0=i,s.x1=u,s.y1=a,void 0}for(var l=f[t],h=e/2+l,p=t+1,d=n-1;p<d;){var v=p+d>>>1;f[v]<h?p=v+1:d=v}var _=f[p]-l,y=e-_;if(a-i>u-r){var g=(i*y+a*_)/e;o(t,p,_,r,i,u,g),o(p,n,y,r,g,u,a)}else{var m=(r*y+u*_)/e;o(t,p,_,r,i,m,a),o(p,n,y,m,i,u,a)}}var u,a,c=t.children,s=c.length,f=new Array(s+1);for(f[0]=a=u=0;u<s;++u)f[u+1]=a+=c[u].value;o(0,s,t.value,n,e,r,i)}function hf(t,n,e,r,i){(1&t.depth?cf:Ws)(t,n,e,r,i)}function pf(t,n){function e(){var e,i,o=r.length,u=0,a=0;for(e=0;e<o;++e)i=r[e],u+=i.x,a+=i.y;for(u=u/o-t,a=a/o-n,e=0;e<o;++e)i=r[e],i.x-=u,i.y-=a}var r;return null==t&&(t=0),null==n&&(n=0),e.initialize=function(t){r=t},e.x=function(n){return arguments.length?(t=+n,e):t},e.y=function(t){return arguments.length?(n=+t,e):n},e}function df(t){return function(){return t}}function vf(){return 1e-6*(Math.random()-.5)}function _f(t){return t.x+t.vx}function yf(t){return t.y+t.vy}function gf(t){function n(){function t(t,e,r,i,u){var a=t.data,p=t.r,d=l+p;{if(!a)return e>s+d||i<s-d||r>f+d||u<f-d;if(a.index>n){var v=s-a.x-a.vx,_=f-a.y-a.vy,y=v*v+_*_;y<d*d&&(0===v&&(v=vf(),y+=v*v),0===_&&(_=vf(),y+=_*_),y=(d-(y=Math.sqrt(y)))/y*o,c.vx+=(v*=y)*(d=(p*=p)/(h+p)),c.vy+=(_*=y)*d,a.vx-=v*(d=1-d),a.vy-=_*d)}}}for(var n,a,c,s,f,l,h,p=r.length,d=0;d<u;++d)for(a=jt(r,_f,yf).visitAfter(e),n=0;n<p;++n)c=r[n],l=i[n],h=l*l,s=c.x+c.vx,f=c.y+c.vy,a.visit(t)}function e(t){if(t.data)return t.r=i[t.data.index];for(var n=t.r=0;n<4;++n)t[n]&&t[n].r>t.r&&(t.r=t[n].r)}var r,i,o=1,u=1;return"function"!=typeof t&&(t=df(null==t?1:+t)),n.initialize=function(n){var e,o=(r=n).length;for(i=new Array(o),e=0;e<o;++e)i[e]=+t(r[e],e,r)},n.iterations=function(t){return arguments.length?(u=+t,n):u},n.strength=function(t){return arguments.length?(o=+t,n):o},n.radius=function(e){return arguments.length?(t="function"==typeof e?e:df(+e),n):t},n}function mf(t,n){return n}function xf(t){function n(t){return 1/Math.min(s[t.source.index],s[t.target.index])}function e(n){for(var e=0,r=t.length;e<d;++e)for(var i,o,c,s,l,h,p,v=0;v<r;++v)i=t[v],o=i.source,c=i.target,s=c.x+c.vx-o.x-o.vx||vf(),l=c.y+c.vy-o.y-o.vy||vf(),h=Math.sqrt(s*s+l*l),h=(h-a[v])/h*n*u[v],s*=h,l*=h,c.vx-=s*(p=f[v]),c.vy-=l*p,o.vx+=s*(p=1-p),o.vy+=l*p}function r(){if(c){var n,e,r=c.length,h=t.length,p=q(c,l);for(n=0,s=new Array(r);n<r;++n)s[n]=0;for(n=0;n<h;++n)e=t[n],e.index=n,"object"!=typeof e.source&&(e.source=p.get(e.source)),"object"!=typeof e.target&&(e.target=p.get(e.target)),++s[e.source.index],++s[e.target.index];for(n=0,f=new Array(h);n<h;++n)e=t[n],f[n]=s[e.source.index]/(s[e.source.index]+s[e.target.index]);u=new Array(h),i(),a=new Array(h),o()}}function i(){if(c)for(var n=0,e=t.length;n<e;++n)u[n]=+h(t[n],n,t)}function o(){if(c)for(var n=0,e=t.length;n<e;++n)a[n]=+p(t[n],n,t)}var u,a,c,s,f,l=mf,h=n,p=df(30),d=1;return null==t&&(t=[]),e.initialize=function(t){c=t,r()},e.links=function(n){return arguments.length?(t=n,r(),e):t},e.id=function(t){return arguments.length?(l=t,e):l},e.iterations=function(t){return arguments.length?(d=+t,e):d},e.strength=function(t){return arguments.length?(h="function"==typeof t?t:df(+t),i(),e):h},e.distance=function(t){return arguments.length?(p="function"==typeof t?t:df(+t),o(),e):p},e}function bf(t){return t.x}function wf(t){return t.y}function Mf(t){function n(){e(),p.call("tick",o),u<a&&(h.stop(),p.call("end",o))}function e(){var n,e,r=t.length;for(u+=(s-u)*c,l.each(function(t){t(u)}),n=0;n<r;++n)e=t[n],null==e.fx?e.x+=e.vx*=f:(e.x=e.fx,e.vx=0),null==e.fy?e.y+=e.vy*=f:(e.y=e.fy,e.vy=0)}function r(){for(var n,e=0,r=t.length;e<r;++e){if(n=t[e],n.index=e,isNaN(n.x)||isNaN(n.y)){var i=Hm*Math.sqrt(e),o=e*Xm;n.x=i*Math.cos(o),n.y=i*Math.sin(o)}(isNaN(n.vx)||isNaN(n.vy))&&(n.vx=n.vy=0)}}function i(n){return n.initialize&&n.initialize(t),n}var o,u=1,a=.001,c=1-Math.pow(a,1/300),s=0,f=.6,l=q(),h=Yr(n),p=Mr("tick","end");return null==t&&(t=[]),r(),o={tick:e,restart:function(){return h.restart(n),o},stop:function(){return h.stop(),o},nodes:function(n){return arguments.length?(t=n,r(),l.each(i),o):t},alpha:function(t){return arguments.length?(u=+t,o):u},alphaMin:function(t){return arguments.length?(a=+t,o):a},alphaDecay:function(t){return arguments.length?(c=+t,o):+c},alphaTarget:function(t){return arguments.length?(s=+t,o):s},velocityDecay:function(t){return arguments.length?(f=1-t,o):1-f},force:function(t,n){return arguments.length>1?(null==n?l.remove(t):l.set(t,i(n)),o):l.get(t)},find:function(n,e,r){var i,o,u,a,c,s=0,f=t.length;for(null==r?r=1/0:r*=r,s=0;s<f;++s)a=t[s],i=n-a.x,o=e-a.y,u=i*i+o*o,u<r&&(c=a,r=u);return c},on:function(t,n){return arguments.length>1?(p.on(t,n),o):p.on(t)}}}function Tf(){function t(t){var n,a=i.length,c=jt(i,bf,wf).visitAfter(e);for(u=t,n=0;n<a;++n)o=i[n],c.visit(r)}function n(){if(i){var t,n=i.length;for(a=new Array(n),t=0;t<n;++t)a[t]=+c(i[t],t,i)}}function e(t){var n,e,r,i,o,u=0;if(t.length){for(r=i=o=0;o<4;++o)(n=t[o])&&(e=n.value)&&(u+=e,r+=e*n.x,i+=e*n.y);t.x=r/u,t.y=i/u}else{n=t,n.x=n.data.x,n.y=n.data.y;do u+=a[n.data.index];while(n=n.next)}t.value=u}function r(t,n,e,r){if(!t.value)return!0;var i=t.x-o.x,c=t.y-o.y,h=r-n,p=i*i+c*c;if(h*h/l<p)return p<f&&(0===i&&(i=vf(),p+=i*i),0===c&&(c=vf(),p+=c*c),p<s&&(p=Math.sqrt(s*p)),o.vx+=i*t.value*u/p,o.vy+=c*t.value*u/p),!0;if(!(t.length||p>=f)){(t.data!==o||t.next)&&(0===i&&(i=vf(),p+=i*i),0===c&&(c=vf(),p+=c*c),p<s&&(p=Math.sqrt(s*p)));do t.data!==o&&(h=a[t.data.index]*u/p,o.vx+=i*h,o.vy+=c*h);while(t=t.next)}}var i,o,u,a,c=df(-30),s=1,f=1/0,l=.81;return t.initialize=function(t){i=t,n()},t.strength=function(e){return arguments.length?(c="function"==typeof e?e:df(+e),n(),t):c},t.distanceMin=function(n){return arguments.length?(s=n*n,t):Math.sqrt(s)},t.distanceMax=function(n){return arguments.length?(f=n*n,t):Math.sqrt(f)},t.theta=function(n){return arguments.length?(l=n*n,t):Math.sqrt(l)},t}function kf(t){function n(t){for(var n,e=0,u=r.length;e<u;++e)n=r[e],n.vx+=(o[e]-n.x)*i[e]*t}function e(){if(r){var n,e=r.length;for(i=new Array(e),o=new Array(e),n=0;n<e;++n)i[n]=isNaN(o[n]=+t(r[n],n,r))?0:+u(r[n],n,r)}}var r,i,o,u=df(.1);return"function"!=typeof t&&(t=df(null==t?0:+t)),n.initialize=function(t){r=t,e()},n.strength=function(t){return arguments.length?(u="function"==typeof t?t:df(+t),e(),n):u},n.x=function(r){return arguments.length?(t="function"==typeof r?r:df(+r),e(),n):t},n}function Nf(t){function n(t){for(var n,e=0,u=r.length;e<u;++e)n=r[e],n.vy+=(o[e]-n.y)*i[e]*t}function e(){if(r){var n,e=r.length;for(i=new Array(e),o=new Array(e),n=0;n<e;++n)i[n]=isNaN(o[n]=+t(r[n],n,r))?0:+u(r[n],n,r)}}var r,i,o,u=df(.1);return"function"!=typeof t&&(t=df(null==t?0:+t)),n.initialize=function(t){r=t,e()},n.strength=function(t){return arguments.length?(u="function"==typeof t?t:df(+t),e(),n):u},n.y=function(r){return arguments.length?(t="function"==typeof r?r:df(+r),e(),n):t},n}function Sf(){t.event.stopImmediatePropagation()}function Af(){t.event.preventDefault(),t.event.stopImmediatePropagation()}function Ef(t){var n=t.document.documentElement,e=Ra(t).on("dragstart.drag",Af,!0);"onselectstart"in n?e.on("selectstart.drag",Af,!0):(n.__noselect=n.style.MozUserSelect,n.style.MozUserSelect="none")}function Cf(t,n){var e=t.document.documentElement,r=Ra(t).on("dragstart.drag",null);n&&(r.on("click.drag",Af,!0),setTimeout(function(){r.on("click.drag",null)},0)),"onselectstart"in e?r.on("selectstart.drag",null):(e.style.MozUserSelect=e.__noselect,delete e.__noselect)}function zf(t){return function(){return t}}function Pf(t,n,e,r,i,o,u,a,c,s){this.target=t,this.type=n,this.subject=e,this.identifier=r,this.active=i,this.x=o,this.y=u,this.dx=a,this.dy=c,this._=s}function qf(){return!t.event.button}function Lf(){return this.parentNode}function Rf(n){return null==n?{x:t.event.x,y:t.event.y}:n}function Uf(){function n(t){t.on("mousedown.drag",e).on("touchstart.drag",o).on("touchmove.drag",u).on("touchend.drag touchcancel.drag",a).style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}function e(){if(!f&&l.apply(this,arguments)){var n=c("mouse",h.apply(this,arguments),du,this,arguments);n&&(Ra(t.event.view).on("mousemove.drag",r,!0).on("mouseup.drag",i,!0),Ef(t.event.view),Sf(),s=!1,n("start"))}}function r(){Af(),s=!0,d.mouse("drag")}function i(){Ra(t.event.view).on("mousemove.drag mouseup.drag",null),Cf(t.event.view,s),Af(),d.mouse("end")}function o(){if(l.apply(this,arguments)){var n,e,r=t.event.changedTouches,i=h.apply(this,arguments),o=r.length;for(n=0;n<o;++n)(e=c(r[n].identifier,i,Da,this,arguments))&&(Sf(),e("start"))}}function u(){var n,e,r=t.event.changedTouches,i=r.length;for(n=0;n<i;++n)(e=d[r[n].identifier])&&(Af(),e("drag"))}function a(){var n,e,r=t.event.changedTouches,i=r.length;for(f&&clearTimeout(f),f=setTimeout(function(){f=null},500),n=0;n<i;++n)(e=d[r[n].identifier])&&(Sf(),e("end"))}function c(e,r,i,o,u){var a,c,s,f=i(r,e),l=v.copy();if(lu(new Pf(n,"beforestart",a,e,_,f[0],f[1],0,0,l),function(){return null!=(t.event.subject=a=p.apply(o,u))&&(c=a.x-f[0]||0,s=a.y-f[1]||0,!0)}))return function t(h){var p,v=f;switch(h){case"start":d[e]=t,p=_++;break;case"end":delete d[e],--_;case"drag":f=i(r,e),p=_}lu(new Pf(n,h,a,e,p,f[0]+c,f[1]+s,f[0]-v[0],f[1]-v[1],l),l.apply,l,[h,o,u])}}var s,f,l=qf,h=Lf,p=Rf,d={},v=Mr("start","drag","end"),_=0;return n.filter=function(t){return arguments.length?(l="function"==typeof t?t:zf(!!t),n):l},n.container=function(t){return arguments.length?(h="function"==typeof t?t:zf(t),n):h},n.subject=function(t){return arguments.length?(p="function"==typeof t?t:zf(t),n):p},n.on=function(){var t=v.on.apply(v,arguments);return t===v?n:t},n}function Df(t){return function(){return t}}function Of(t){return t[0]}function Ff(t){return t[1]}function If(){this._=null}function Yf(t){t.U=t.C=t.L=t.R=t.P=t.N=null}function Bf(t,n){var e=n,r=n.R,i=e.U;i?i.L===e?i.L=r:i.R=r:t._=r,r.U=i,e.U=r,e.R=r.L,e.R&&(e.R.U=e),r.L=e}function jf(t,n){var e=n,r=n.L,i=e.U;i?i.L===e?i.L=r:i.R=r:t._=r,r.U=i,e.U=r,e.L=r.R,e.L&&(e.L.U=e),r.R=e}function Hf(t){for(;t.L;)t=t.L;return t}function Xf(t,n,e,r){var i=[null,null],o=Gm.push(i)-1;return i.left=t,i.right=n,e&&Wf(i,t,n,e),r&&Wf(i,n,t,r),$m[t.index].halfedges.push(o),$m[n.index].halfedges.push(o),i}function Vf(t,n,e){var r=[n,e];return r.left=t,r}function Wf(t,n,e,r){t[0]||t[1]?t.left===e?t[1]=r:t[0]=r:(t[0]=r,t.left=n,t.right=e)}function $f(t,n,e,r,i){var o,u=t[0],a=t[1],c=u[0],s=u[1],f=a[0],l=a[1],h=0,p=1,d=f-c,v=l-s;if(o=n-c,d||!(o>0)){if(o/=d,d<0){if(o<h)return;o<p&&(p=o)}else if(d>0){if(o>p)return;o>h&&(h=o)}if(o=r-c,d||!(o<0)){if(o/=d,d<0){if(o>p)return;o>h&&(h=o)}else if(d>0){if(o<h)return;o<p&&(p=o)}if(o=e-s,v||!(o>0)){if(o/=v,v<0){if(o<h)return;o<p&&(p=o)}else if(v>0){if(o>p)return;o>h&&(h=o)}if(o=i-s,v||!(o<0)){if(o/=v,v<0){if(o>p)return;o>h&&(h=o)}else if(v>0){if(o<h)return;o<p&&(p=o)}return!(h>0||p<1)||(h>0&&(t[0]=[c+h*d,s+h*v]),p<1&&(t[1]=[c+p*d,s+p*v]),!0)}}}}}function Zf(t,n,e,r,i){var o=t[1];if(o)return!0;var u,a,c=t[0],s=t.left,f=t.right,l=s[0],h=s[1],p=f[0],d=f[1],v=(l+p)/2,_=(h+d)/2;if(d===h){if(v<n||v>=r)return;if(l>p){if(c){if(c[1]>=i)return}else c=[v,e];o=[v,i]}else{if(c){if(c[1]<e)return}else c=[v,i];o=[v,e]}}else if(u=(l-p)/(d-h),a=_-u*v,u<-1||u>1)if(l>p){if(c){if(c[1]>=i)return}else c=[(e-a)/u,e];o=[(i-a)/u,i]}else{if(c){if(c[1]<e)return}else c=[(i-a)/u,i];o=[(e-a)/u,e]}else if(h<d){if(c){if(c[0]>=r)return}else c=[n,u*n+a];o=[r,u*r+a]}else{if(c){if(c[0]<n)return}else c=[r,u*r+a];o=[n,u*n+a]}return t[0]=c,t[1]=o,!0}function Gf(t,n,e,r){for(var i,o=Gm.length;o--;)Zf(i=Gm[o],t,n,e,r)&&$f(i,t,n,e,r)&&(Math.abs(i[0][0]-i[1][0])>Km||Math.abs(i[0][1]-i[1][1])>Km)||delete Gm[o]}function Jf(t){return $m[t.index]={site:t,halfedges:[]}}function Qf(t,n){var e=t.site,r=n.left,i=n.right;return e===i&&(i=r,r=e),i?Math.atan2(i[1]-r[1],i[0]-r[0]):(e===r?(r=n[1],i=n[0]):(r=n[0],i=n[1]),Math.atan2(r[0]-i[0],i[1]-r[1]))}function Kf(t,n){return n[+(n.left!==t.site)]}function tl(t,n){return n[+(n.left===t.site)]}function nl(){for(var t,n,e,r,i=0,o=$m.length;i<o;++i)if((t=$m[i])&&(r=(n=t.halfedges).length)){var u=new Array(r),a=new Array(r);for(e=0;e<r;++e)u[e]=e,a[e]=Qf(t,Gm[n[e]]);for(u.sort(function(t,n){return a[n]-a[t]}),e=0;e<r;++e)a[e]=n[u[e]];for(e=0;e<r;++e)n[e]=a[e]}}function el(t,n,e,r){var i,o,u,a,c,s,f,l,h,p,d,v,_=$m.length,y=!0;for(i=0;i<_;++i)if(o=$m[i]){for(u=o.site,c=o.halfedges,a=c.length;a--;)Gm[c[a]]||c.splice(a,1);for(a=0,s=c.length;a<s;)p=tl(o,Gm[c[a]]),d=p[0],v=p[1],f=Kf(o,Gm[c[++a%s]]),l=f[0],h=f[1],(Math.abs(d-l)>Km||Math.abs(v-h)>Km)&&(c.splice(a,0,Gm.push(Vf(u,p,Math.abs(d-t)<Km&&r-v>Km?[t,Math.abs(l-t)<Km?h:r]:Math.abs(v-r)<Km&&e-d>Km?[Math.abs(h-r)<Km?l:e,r]:Math.abs(d-e)<Km&&v-n>Km?[e,Math.abs(l-e)<Km?h:n]:Math.abs(v-n)<Km&&d-t>Km?[Math.abs(h-n)<Km?l:t,n]:null))-1),++s);s&&(y=!1)}if(y){var g,m,x,b=1/0;for(i=0,y=null;i<_;++i)(o=$m[i])&&(u=o.site,g=u[0]-t,m=u[1]-n,x=g*g+m*m,x<b&&(b=x,y=o));if(y){var w=[t,n],M=[t,r],T=[e,r],k=[e,n];y.halfedges.push(Gm.push(Vf(u=y.site,w,M))-1,Gm.push(Vf(u,M,T))-1,Gm.push(Vf(u,T,k))-1,Gm.push(Vf(u,k,w))-1)}}for(i=0;i<_;++i)(o=$m[i])&&(o.halfedges.length||delete $m[i])}function rl(){Yf(this),this.x=this.y=this.arc=this.site=this.cy=null}function il(t){var n=t.P,e=t.N;if(n&&e){var r=n.site,i=t.site,o=e.site;if(r!==o){var u=i[0],a=i[1],c=r[0]-u,s=r[1]-a,f=o[0]-u,l=o[1]-a,h=2*(c*l-s*f);if(!(h>=-tx)){var p=c*c+s*s,d=f*f+l*l,v=(l*p-s*d)/h,_=(c*d-f*p)/h,y=Jm.pop()||new rl;y.arc=t,y.site=i,y.x=v+u,y.y=(y.cy=_+a)+Math.sqrt(v*v+_*_),t.circle=y;for(var g=null,m=Zm._;m;)if(y.y<m.y||y.y===m.y&&y.x<=m.x){if(!m.L){g=m.P;break}m=m.L}else{if(!m.R){g=m;break}m=m.R}Zm.insert(g,y),g||(Vm=y)}}}}function ol(t){var n=t.circle;n&&(n.P||(Vm=n.N),Zm.remove(n),Jm.push(n),Yf(n),t.circle=null)}function ul(){Yf(this),this.edge=this.site=this.circle=null}function al(t){var n=Qm.pop()||new ul;return n.site=t,n}function cl(t){ol(t),Wm.remove(t),Qm.push(t),Yf(t)}function sl(t){var n=t.circle,e=n.x,r=n.cy,i=[e,r],o=t.P,u=t.N,a=[t];cl(t);for(var c=o;c.circle&&Math.abs(e-c.circle.x)<Km&&Math.abs(r-c.circle.cy)<Km;)o=c.P,a.unshift(c),cl(c),c=o;a.unshift(c),ol(c);for(var s=u;s.circle&&Math.abs(e-s.circle.x)<Km&&Math.abs(r-s.circle.cy)<Km;)u=s.N,a.push(s),cl(s),s=u;a.push(s),ol(s);var f,l=a.length;for(f=1;f<l;++f)s=a[f],c=a[f-1],Wf(s.edge,c.site,s.site,i);c=a[0],s=a[l-1],s.edge=Xf(c.site,s.site,null,i),il(c),il(s)}function fl(t){for(var n,e,r,i,o=t[0],u=t[1],a=Wm._;a;)if(r=ll(a,u)-o,r>Km)a=a.L;else{if(i=o-hl(a,u),!(i>Km)){r>-Km?(n=a.P,e=a):i>-Km?(n=a,e=a.N):n=e=a;break}if(!a.R){n=a;break}a=a.R}Jf(t);var c=al(t);if(Wm.insert(n,c),n||e){if(n===e)return ol(n),e=al(n.site),Wm.insert(c,e),c.edge=e.edge=Xf(n.site,c.site),il(n),void il(e);if(!e)return void(c.edge=Xf(n.site,c.site));ol(n),ol(e);var s=n.site,f=s[0],l=s[1],h=t[0]-f,p=t[1]-l,d=e.site,v=d[0]-f,_=d[1]-l,y=2*(h*_-p*v),g=h*h+p*p,m=v*v+_*_,x=[(_*g-p*m)/y+f,(h*m-v*g)/y+l];Wf(e.edge,s,d,x),c.edge=Xf(s,t,null,x),e.edge=Xf(t,d,null,x),il(n),il(e)}}function ll(t,n){var e=t.site,r=e[0],i=e[1],o=i-n;if(!o)return r;var u=t.P;if(!u)return-(1/0);e=u.site;var a=e[0],c=e[1],s=c-n;if(!s)return a;var f=a-r,l=1/o-1/s,h=f/s;return l?(-h+Math.sqrt(h*h-2*l*(f*f/(-2*s)-c+s/2+i-o/2)))/l+r:(r+a)/2}function hl(t,n){var e=t.N;if(e)return ll(e,n);var r=t.site;return r[1]===n?r[0]:1/0}function pl(t,n,e){return(t[0]-e[0])*(n[1]-t[1])-(t[0]-n[0])*(e[1]-t[1])}function dl(t,n){return n[1]-t[1]||n[0]-t[0]}function vl(t,n){var e,r,i,o=t.sort(dl).pop();for(Gm=[],$m=new Array(t.length),Wm=new If,Zm=new If;;)if(i=Vm,o&&(!i||o[1]<i.y||o[1]===i.y&&o[0]<i.x))o[0]===e&&o[1]===r||(fl(o),e=o[0],r=o[1]),o=t.pop();else{if(!i)break;sl(i.arc)}if(nl(),n){var u=+n[0][0],a=+n[0][1],c=+n[1][0],s=+n[1][1];Gf(u,a,c,s),el(u,a,c,s)}this.edges=Gm,this.cells=$m,Wm=Zm=Gm=$m=null}function _l(){function t(t){return new vl(t.map(function(r,i){var o=[Math.round(n(r,i,t)/Km)*Km,Math.round(e(r,i,t)/Km)*Km];return o.index=i,o.data=r,o}),r)}var n=Of,e=Ff,r=null;return t.polygons=function(n){return t(n).polygons()},t.links=function(n){return t(n).links()},t.triangles=function(n){return t(n).triangles()},t.x=function(e){return arguments.length?(n="function"==typeof e?e:Df(+e),t):n},t.y=function(n){return arguments.length?(e="function"==typeof n?n:Df(+n),t):e},t.extent=function(n){return arguments.length?(r=null==n?null:[[+n[0][0],+n[0][1]],[+n[1][0],+n[1][1]]],t):r&&[[r[0][0],r[0][1]],[r[1][0],r[1][1]]]},t.size=function(n){return arguments.length?(r=null==n?null:[[0,0],[+n[0],+n[1]]],t):r&&[r[1][0]-r[0][0],r[1][1]-r[0][1]]},t}function yl(t){return function(){return t}}function gl(t,n,e){this.target=t,this.type=n,this.transform=e}function ml(t,n,e){this.k=t,this.x=n,this.y=e}function xl(t){return t.__zoom||nx}function bl(){t.event.stopImmediatePropagation()}function wl(){t.event.preventDefault(),t.event.stopImmediatePropagation()}function Ml(){return!t.event.button}function Tl(){var t,n,e=this;return e instanceof SVGElement?(e=e.ownerSVGElement||e,t=e.width.baseVal.value,n=e.height.baseVal.value):(t=e.clientWidth,n=e.clientHeight),[[0,0],[t,n]]}function kl(){return this.__zoom||nx}function Nl(){function n(t){t.on("wheel.zoom",s).on("mousedown.zoom",f).on("dblclick.zoom",l).on("touchstart.zoom",h).on("touchmove.zoom",p).on("touchend.zoom touchcancel.zoom",d).style("-webkit-tap-highlight-color","rgba(0,0,0,0)").property("__zoom",kl)}function e(t,n){return n=Math.max(m,Math.min(x,n)),n===t.k?t:new ml(n,t.x,t.y)}function r(t,n,e){var r=n[0]-e[0]*t.k,i=n[1]-e[1]*t.k;return r===t.x&&i===t.y?t:new ml(t.k,r,i)}function i(t,n){var e=Math.min(0,t.invertX(n[0][0])-b)||Math.max(0,t.invertX(n[1][0])-w),r=Math.min(0,t.invertY(n[0][1])-M)||Math.max(0,t.invertY(n[1][1])-T);return e||r?t.translate(e,r):t}function o(t){return[(+t[0][0]+ +t[1][0])/2,(+t[0][1]+ +t[1][1])/2]}function u(t,n,e){t.on("start.zoom",function(){a(this,arguments).start()}).on("interrupt.zoom end.zoom",function(){a(this,arguments).end()}).tween("zoom",function(){var t=this,r=arguments,i=a(t,r),u=g.apply(t,r),c=e||o(u),s=Math.max(u[1][0]-u[0][0],u[1][1]-u[0][1]),f=t.__zoom,l="function"==typeof n?n.apply(t,r):n,h=yr(f.invert(c).concat(s/f.k),l.invert(c).concat(s/l.k));return function(t){if(1===t)t=l;else{var n=h(t),e=s/n[2];t=new ml(e,c[0]-n[0]*e,c[1]-n[1]*e)}i.zoom(null,t)}})}function a(t,n){for(var e,r=0,i=N.length;r<i;++r)if((e=N[r]).that===t)return e;return new c(t,n)}function c(t,n){this.that=t,this.args=n,this.index=-1,this.active=0,this.extent=g.apply(t,n)}function s(){function n(){o.wheel=null,o.end()}if(y.apply(this,arguments)){var o=a(this,arguments),u=this.__zoom,c=Math.max(m,Math.min(x,u.k*Math.pow(2,-t.event.deltaY*(t.event.deltaMode?120:1)/500))),s=du(this);if(o.wheel)o.mouse[0][0]===s[0]&&o.mouse[0][1]===s[1]||(o.mouse[1]=u.invert(o.mouse[0]=s)),clearTimeout(o.wheel);else{if(u.k===c)return;o.mouse=[s,u.invert(s)],Ha(this),o.start()}wl(),o.wheel=setTimeout(n,E),o.zoom("mouse",i(r(e(u,c),o.mouse[0],o.mouse[1]),o.extent))}}function f(){function n(){wl(),o.moved=!0,o.zoom("mouse",i(r(o.that.__zoom,o.mouse[0]=du(o.that),o.mouse[1]),o.extent))}function e(){u.on("mousemove.zoom mouseup.zoom",null),Cf(t.event.view,o.moved),wl(),o.end()}if(!_&&y.apply(this,arguments)){var o=a(this,arguments),u=Ra(t.event.view).on("mousemove.zoom",n,!0).on("mouseup.zoom",e,!0),c=du(this);Ef(t.event.view),bl(),o.mouse=[c,this.__zoom.invert(c)],Ha(this),o.start()}}function l(){if(y.apply(this,arguments)){var o=this.__zoom,a=du(this),c=o.invert(a),s=o.k*(t.event.shiftKey?.5:2),f=i(r(e(o,s),a,c),g.apply(this,arguments));wl(),k>0?Ra(this).transition().duration(k).call(u,f,a):Ra(this).call(n.transform,f)}}function h(){if(y.apply(this,arguments)){var n,e,r,i=a(this,arguments),o=t.event.changedTouches,u=o.length;for(bl(),n=0;n<u;++n)e=o[n],r=Da(this,o,e.identifier),r=[r,this.__zoom.invert(r),e.identifier],i.touch0?i.touch1||(i.touch1=r):i.touch0=r;return v&&(v=clearTimeout(v),!i.touch1)?(i.end(),l.apply(this,arguments)):void(t.event.touches.length===u&&(v=setTimeout(function(){v=null},A),Ha(this),i.start()))}}function p(){var n,o,u,c,s=a(this,arguments),f=t.event.changedTouches,l=f.length;for(wl(),v&&(v=clearTimeout(v)),n=0;n<l;++n)o=f[n],u=Da(this,f,o.identifier),s.touch0&&s.touch0[2]===o.identifier?s.touch0[0]=u:s.touch1&&s.touch1[2]===o.identifier&&(s.touch1[0]=u);if(o=s.that.__zoom,s.touch1){var h=s.touch0[0],p=s.touch0[1],d=s.touch1[0],_=s.touch1[1],y=(y=d[0]-h[0])*y+(y=d[1]-h[1])*y,g=(g=_[0]-p[0])*g+(g=_[1]-p[1])*g;o=e(o,Math.sqrt(y/g)),u=[(h[0]+d[0])/2,(h[1]+d[1])/2],c=[(p[0]+_[0])/2,(p[1]+_[1])/2]}else{if(!s.touch0)return;u=s.touch0[0],c=s.touch0[1]}s.zoom("touch",i(r(o,u,c),s.extent))}function d(){var n,e,r=a(this,arguments),i=t.event.changedTouches,o=i.length;for(bl(),_&&clearTimeout(_),_=setTimeout(function(){_=null},A),n=0;n<o;++n)e=i[n],r.touch0&&r.touch0[2]===e.identifier?delete r.touch0:r.touch1&&r.touch1[2]===e.identifier&&delete r.touch1;r.touch1&&!r.touch0&&(r.touch0=r.touch1,delete r.touch1),r.touch0||r.end()}var v,_,y=Ml,g=Tl,m=0,x=1/0,b=-x,w=x,M=b,T=w,k=250,N=[],S=Mr("start","zoom","end"),A=500,E=150;return n.transform=function(t,n){var e=t.selection?t.selection():t;e.property("__zoom",kl),t!==e?u(t,n):e.interrupt().each(function(){a(this,arguments).start().zoom(null,"function"==typeof n?n.apply(this,arguments):n).end()})},n.scaleBy=function(t,e){n.scaleTo(t,function(){var t=this.__zoom.k,n="function"==typeof e?e.apply(this,arguments):e;return t*n})},n.scaleTo=function(t,u){n.transform(t,function(){var t=g.apply(this,arguments),n=this.__zoom,a=o(t),c=n.invert(a),s="function"==typeof u?u.apply(this,arguments):u;return i(r(e(n,s),a,c),t)})},n.translateBy=function(t,e,r){n.transform(t,function(){return i(this.__zoom.translate("function"==typeof e?e.apply(this,arguments):e,"function"==typeof r?r.apply(this,arguments):r),g.apply(this,arguments))})},c.prototype={start:function(){return 1===++this.active&&(this.index=N.push(this)-1,this.emit("start")),this},zoom:function(t,n){return this.mouse&&"mouse"!==t&&(this.mouse[1]=n.invert(this.mouse[0])),this.touch0&&"touch"!==t&&(this.touch0[1]=n.invert(this.touch0[0])),this.touch1&&"touch"!==t&&(this.touch1[1]=n.invert(this.touch1[0])),this.that.__zoom=n,this.emit("zoom"),this},end:function(){return 0===--this.active&&(N.splice(this.index,1),this.index=-1,this.emit("end")),this},emit:function(t){lu(new gl(n,t,this.that.__zoom),S.apply,S,[t,this.that,this.args])}},n.filter=function(t){return arguments.length?(y="function"==typeof t?t:yl(!!t),n):y},n.extent=function(t){return arguments.length?(g="function"==typeof t?t:yl([[+t[0][0],+t[0][1]],[+t[1][0],+t[1][1]]]),n):g},n.scaleExtent=function(t){return arguments.length?(m=+t[0],x=+t[1],n):[m,x]},n.translateExtent=function(t){return arguments.length?(b=+t[0][0],w=+t[1][0],M=+t[0][1],T=+t[1][1],n):[[b,M],[w,T]]},n.duration=function(t){return arguments.length?(k=+t,n):k},n.on=function(){var t=S.on.apply(S,arguments);return t===S?n:t},n}function Sl(t){return function(){return t}}function Al(t,n,e){this.target=t,this.type=n,this.selection=e}function El(){t.event.stopImmediatePropagation()}function Cl(){t.event.preventDefault(),t.event.stopImmediatePropagation()}function zl(t){return{type:t}}function Pl(){return!t.event.button}function ql(){var t=this.ownerSVGElement||this;return[[0,0],[t.width.baseVal.value,t.height.baseVal.value]]}function Ll(t){for(;!t.__brush;)if(!(t=t.parentNode))return;return t.__brush}function Rl(t){return t[0][0]===t[1][0]||t[0][1]===t[1][1]}function Ul(t){var n=t.__brush;return n?n.dim.output(n.selection):null}function Dl(){return Il(ux)}function Ol(){return Il(ax)}function Fl(){return Il(cx)}function Il(n){function e(t){var e=t.property("__brush",a).selectAll(".overlay").data([zl("overlay")]);e.enter().append("rect").attr("class","overlay").attr("pointer-events","all").attr("cursor",sx.overlay).merge(e).each(function(){var t=Ll(this).extent;Ra(this).attr("x",t[0][0]).attr("y",t[0][1]).attr("width",t[1][0]-t[0][0]).attr("height",t[1][1]-t[0][1])}),t.selectAll(".selection").data([zl("selection")]).enter().append("rect").attr("class","selection").attr("cursor",sx.selection).attr("fill","#777").attr("fill-opacity",.3).attr("stroke","#fff").attr("shape-rendering","crispEdges");var i=t.selectAll(".handle").data(n.handles,function(t){return t.type});i.exit().remove(),i.enter().append("rect").attr("class",function(t){return"handle handle--"+t.type}).attr("cursor",function(t){return sx[t.type]}),t.each(r).attr("fill","none").attr("pointer-events","all").style("-webkit-tap-highlight-color","rgba(0,0,0,0)").on("mousedown.brush touchstart.brush",u)}function r(){var t=Ra(this),n=Ll(this).selection;n?(t.selectAll(".selection").style("display",null).attr("x",n[0][0]).attr("y",n[0][1]).attr("width",n[1][0]-n[0][0]).attr("height",n[1][1]-n[0][1]),t.selectAll(".handle").style("display",null).attr("x",function(t){return"e"===t.type[t.type.length-1]?n[1][0]-h/2:n[0][0]-h/2}).attr("y",function(t){return"s"===t.type[0]?n[1][1]-h/2:n[0][1]-h/2}).attr("width",function(t){return"n"===t.type||"s"===t.type?n[1][0]-n[0][0]+h:h}).attr("height",function(t){return"e"===t.type||"w"===t.type?n[1][1]-n[0][1]+h:h})):t.selectAll(".selection,.handle").style("display","none").attr("x",null).attr("y",null).attr("width",null).attr("height",null)}function i(t,n){return t.__brush.emitter||new o(t,n)}function o(t,n){this.that=t,this.args=n,this.state=t.__brush,this.active=0}function u(){function e(){var t=du(T);!U||w||M||(Math.abs(t[0]-O[0])>Math.abs(t[1]-O[1])?M=!0:w=!0),O=t,b=!0,Cl(),o()}function o(){var t;switch(m=O[0]-D[0],x=O[1]-D[1],N){case rx:case ex:S&&(m=Math.max(P-l,Math.min(L-v,m)),h=l+m,_=v+m),A&&(x=Math.max(q-p,Math.min(R-y,x)),d=p+x,g=y+x);break;case ix:S<0?(m=Math.max(P-l,Math.min(L-l,m)),h=l+m,_=v):S>0&&(m=Math.max(P-v,Math.min(L-v,m)),h=l,_=v+m),A<0?(x=Math.max(q-p,Math.min(R-p,x)),d=p+x,g=y):A>0&&(x=Math.max(q-y,Math.min(R-y,x)),d=p,g=y+x);break;case ox:S&&(h=Math.max(P,Math.min(L,l-m*S)),_=Math.max(P,Math.min(L,v+m*S))),A&&(d=Math.max(q,Math.min(R,p-x*A)),g=Math.max(q,Math.min(R,y+x*A)))}_<h&&(S*=-1,t=l,l=v,v=t,t=h,h=_,_=t,k in fx&&Y.attr("cursor",sx[k=fx[k]])),g<d&&(A*=-1,t=p,p=y,y=t,t=d,d=g,g=t,k in lx&&Y.attr("cursor",sx[k=lx[k]])),z=E.selection,w&&(h=z[0][0],_=z[1][0]),M&&(d=z[0][1],g=z[1][1]),z[0][0]===h&&z[0][1]===d&&z[1][0]===_&&z[1][1]===g||(E.selection=[[h,d],[_,g]],r.call(T),F.brush())}function u(){if(El(),t.event.touches){if(t.event.touches.length)return;c&&clearTimeout(c),c=setTimeout(function(){c=null},500),I.on("touchmove.brush touchend.brush touchcancel.brush",null)}else Cf(t.event.view,b),B.on("keydown.brush keyup.brush mousemove.brush mouseup.brush",null);I.attr("pointer-events","all"),Y.attr("cursor",sx.overlay),Rl(z)&&(E.selection=null,r.call(T)),F.end()}function a(){switch(t.event.keyCode){case 16:U=S&&A;break;case 18:N===ix&&(S&&(v=_-m*S,l=h+m*S),A&&(y=g-x*A,p=d+x*A),N=ox,o());break;case 32:N!==ix&&N!==ox||(S<0?v=_-m:S>0&&(l=h-m),A<0?y=g-x:A>0&&(p=d-x),N=rx,Y.attr("cursor",sx.selection),o());break;default:return}Cl()}function s(){switch(t.event.keyCode){case 16:U&&(w=M=U=!1,o());break;case 18:N===ox&&(S<0?v=_:S>0&&(l=h),A<0?y=g:A>0&&(p=d),N=ix,o());break;case 32:N===rx&&(t.event.altKey?(S&&(v=_-m*S,l=h+m*S),A&&(y=g-x*A,p=d+x*A),N=ox):(S<0?v=_:S>0&&(l=h),A<0?y=g:A>0&&(p=d),N=ix),Y.attr("cursor",sx[k]),o());break;default:return}Cl()}if(t.event.touches){if(t.event.changedTouches.length<t.event.touches.length)return Cl()}else if(c)return;if(f.apply(this,arguments)){var l,h,p,d,v,_,y,g,m,x,b,w,M,T=this,k=t.event.target.__data__.type,N="selection"===(t.event.metaKey?k="overlay":k)?ex:t.event.altKey?ox:ix,S=n===ax?null:hx[k],A=n===ux?null:px[k],E=Ll(T),C=E.extent,z=E.selection,P=C[0][0],q=C[0][1],L=C[1][0],R=C[1][1],U=S&&A&&t.event.shiftKey,D=du(T),O=D,F=i(T,arguments).beforestart();"overlay"===k?E.selection=z=[[l=n===ax?P:D[0],p=n===ux?q:D[1]],[v=n===ax?L:l,y=n===ux?R:p]]:(l=z[0][0],p=z[0][1],v=z[1][0],y=z[1][1]),h=l,d=p,_=v,g=y;var I=Ra(T).attr("pointer-events","none"),Y=I.selectAll(".overlay").attr("cursor",sx[k]);if(t.event.touches)I.on("touchmove.brush",e,!0).on("touchend.brush touchcancel.brush",u,!0);else{var B=Ra(t.event.view).on("keydown.brush",a,!0).on("keyup.brush",s,!0).on("mousemove.brush",e,!0).on("mouseup.brush",u,!0);Ef(t.event.view)}El(),Ha(T),r.call(T),F.start()}}function a(){var t=this.__brush||{selection:null};return t.extent=s.apply(this,arguments),t.dim=n,t}var c,s=ql,f=Pl,l=Mr(e,"start","brush","end"),h=6;return e.move=function(t,e){t.selection?t.on("start.brush",function(){i(this,arguments).beforestart().start()}).on("interrupt.brush end.brush",function(){i(this,arguments).end()}).tween("brush",function(){function t(t){u.selection=1===t&&Rl(s)?null:f(t),r.call(o),a.brush()}var o=this,u=o.__brush,a=i(o,arguments),c=u.selection,s=n.input("function"==typeof e?e.apply(this,arguments):e,u.extent),f=cr(c,s);return c&&s?t:t(1)}):t.each(function(){var t=this,o=arguments,u=t.__brush,a=n.input("function"==typeof e?e.apply(t,o):e,u.extent),c=i(t,o).beforestart();Ha(t),u.selection=null==a||Rl(a)?null:a,r.call(t),c.start().brush().end()})},o.prototype={beforestart:function(){return 1===++this.active&&(this.state.emitter=this,this.starting=!0),this},start:function(){return this.starting&&(this.starting=!1,this.emit("start")),this},brush:function(){return this.emit("brush"),this},end:function(){return 0===--this.active&&(delete this.state.emitter,this.emit("end")),this},emit:function(t){lu(new Al(e,t,n.output(this.state.selection)),l.apply,l,[t,this.that,this.args])}},e.extent=function(t){return arguments.length?(s="function"==typeof t?t:Sl([[+t[0][0],+t[0][1]],[+t[1][0],+t[1][1]]]),e):s},e.filter=function(t){return arguments.length?(f="function"==typeof t?t:Sl(!!t),e):f},e.handleSize=function(t){return arguments.length?(h=+t,e):h},e.on=function(){var t=l.on.apply(l,arguments);return t===l?e:t},e}function Yl(t){return function(n,e){return t(n.source.value+n.target.value,e.source.value+e.target.value)}}function Bl(){function t(t){var o,u,a,c,s,f,h=t.length,p=[],d=l(h),v=[],_=[],y=_.groups=new Array(h),g=new Array(h*h);for(o=0,s=-1;++s<h;){for(u=0,f=-1;++f<h;)u+=t[s][f];p.push(u),v.push(l(h)),o+=u}for(e&&d.sort(function(t,n){return e(p[t],p[n])}),r&&v.forEach(function(n,e){n.sort(function(n,i){return r(t[e][n],t[e][i])})}),o=mx(0,gx-n*h)/o,c=o?n:gx/h,u=0,s=-1;++s<h;){for(a=u,f=-1;++f<h;){var m=d[s],x=v[m][f],b=t[m][x],w=u,M=u+=b*o;g[x*h+m]={index:m,subindex:x,startAngle:w,endAngle:M,value:b}}y[m]={index:m,startAngle:a,endAngle:u,value:p[m]},u+=c}for(s=-1;++s<h;)for(f=s-1;++f<h;){var T=g[f*h+s],k=g[s*h+f];(T.value||k.value)&&_.push(T.value<k.value?{source:k,target:T}:{source:T,target:k})}return i?_.sort(i):_}var n=0,e=null,r=null,i=null;return t.padAngle=function(e){return arguments.length?(n=mx(0,e),t):n},t.sortGroups=function(n){return arguments.length?(e=n,t):e},t.sortSubgroups=function(n){return arguments.length?(r=n,t):r},t.sortChords=function(n){return arguments.length?(null==n?i=null:(i=Yl(n))._=n,
t):i&&i._},t}function jl(t){return function(){return t}}function Hl(t){return t.source}function Xl(t){return t.target}function Vl(t){return t.radius}function Wl(t){return t.startAngle}function $l(t){return t.endAngle}function Zl(){function t(){var t,a=xx.call(arguments),c=n.apply(this,a),s=e.apply(this,a),f=+r.apply(this,(a[0]=c,a)),l=i.apply(this,a)-yx,h=o.apply(this,a)-yx,p=f*dx(l),d=f*vx(l),v=+r.apply(this,(a[0]=s,a)),_=i.apply(this,a)-yx,y=o.apply(this,a)-yx;if(u||(u=t=Tt()),u.moveTo(p,d),u.arc(0,0,f,l,h),l===_&&h===y||(u.quadraticCurveTo(0,0,v*dx(_),v*vx(_)),u.arc(0,0,v,_,y)),u.quadraticCurveTo(0,0,p,d),u.closePath(),t)return u=null,t+""||null}var n=Hl,e=Xl,r=Vl,i=Wl,o=$l,u=null;return t.radius=function(n){return arguments.length?(r="function"==typeof n?n:jl(+n),t):r},t.startAngle=function(n){return arguments.length?(i="function"==typeof n?n:jl(+n),t):i},t.endAngle=function(n){return arguments.length?(o="function"==typeof n?n:jl(+n),t):o},t.source=function(e){return arguments.length?(n=e,t):n},t.target=function(n){return arguments.length?(e=n,t):e},t.context=function(n){return arguments.length?(u=null==n?null:n,t):u},t}function Gl(){return new Jl}function Jl(){this.reset()}function Ql(t,n,e){var r=t.s=n+e,i=r-n,o=r-i;t.t=n-o+(e-i)}function Kl(t){return t>1?0:t<-1?ib:Math.acos(t)}function th(t){return t>1?ob:t<-1?-ob:Math.asin(t)}function nh(t){return(t=gb(t/2))*t}function eh(){}function rh(t,n){t&&Mb.hasOwnProperty(t.type)&&Mb[t.type](t,n)}function ih(t,n,e){var r,i=-1,o=t.length-e;for(n.lineStart();++i<o;)r=t[i],n.point(r[0],r[1],r[2]);n.lineEnd()}function oh(t,n){var e=-1,r=t.length;for(n.polygonStart();++e<r;)ih(t[e],n,1);n.polygonEnd()}function uh(t,n){t&&wb.hasOwnProperty(t.type)?wb[t.type](t,n):rh(t,n)}function ah(){Tb.point=sh}function ch(){fh(Mx,Tx)}function sh(t,n){Tb.point=fh,Mx=t,Tx=n,t*=sb,n*=sb,kx=t,Nx=pb(n=n/2+ub),Sx=gb(n)}function fh(t,n){t*=sb,n*=sb,n=n/2+ub;var e=t-kx,r=e>=0?1:-1,i=r*e,o=pb(n),u=gb(n),a=Sx*u,c=Nx*o+a*pb(i),s=a*r*gb(i);bx.add(hb(s,c)),kx=t,Nx=o,Sx=u}function lh(t){return wx?wx.reset():(wx=Gl(),bx=Gl()),uh(t,Tb),2*wx}function hh(t){return[hb(t[1],t[0]),th(t[2])]}function ph(t){var n=t[0],e=t[1],r=pb(e);return[r*pb(n),r*gb(n),gb(e)]}function dh(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]}function vh(t,n){return[t[1]*n[2]-t[2]*n[1],t[2]*n[0]-t[0]*n[2],t[0]*n[1]-t[1]*n[0]]}function _h(t,n){t[0]+=n[0],t[1]+=n[1],t[2]+=n[2]}function yh(t,n){return[t[0]*n,t[1]*n,t[2]*n]}function gh(t){var n=xb(t[0]*t[0]+t[1]*t[1]+t[2]*t[2]);t[0]/=n,t[1]/=n,t[2]/=n}function mh(t,n){Dx.push(Ox=[Ax=t,Cx=t]),n<Ex&&(Ex=n),n>zx&&(zx=n)}function xh(t,n){var e=ph([t*sb,n*sb]);if(Rx){var r=vh(Rx,e),i=[r[1],-r[0],0],o=vh(i,r);gh(o),o=hh(o);var u,a=t-Px,c=a>0?1:-1,s=o[0]*cb*c,f=fb(a)>180;f^(c*Px<s&&s<c*t)?(u=o[1]*cb,u>zx&&(zx=u)):(s=(s+360)%360-180,f^(c*Px<s&&s<c*t)?(u=-o[1]*cb,u<Ex&&(Ex=u)):(n<Ex&&(Ex=n),n>zx&&(zx=n))),f?t<Px?Nh(Ax,t)>Nh(Ax,Cx)&&(Cx=t):Nh(t,Cx)>Nh(Ax,Cx)&&(Ax=t):Cx>=Ax?(t<Ax&&(Ax=t),t>Cx&&(Cx=t)):t>Px?Nh(Ax,t)>Nh(Ax,Cx)&&(Cx=t):Nh(t,Cx)>Nh(Ax,Cx)&&(Ax=t)}else mh(t,n);Rx=e,Px=t}function bh(){kb.point=xh}function wh(){Ox[0]=Ax,Ox[1]=Cx,kb.point=mh,Rx=null}function Mh(t,n){if(Rx){var e=t-Px;Ux.add(fb(e)>180?e+(e>0?360:-360):e)}else qx=t,Lx=n;Tb.point(t,n),xh(t,n)}function Th(){Tb.lineStart()}function kh(){Mh(qx,Lx),Tb.lineEnd(),fb(Ux)>eb&&(Ax=-(Cx=180)),Ox[0]=Ax,Ox[1]=Cx,Rx=null}function Nh(t,n){return(n-=t)<0?n+360:n}function Sh(t,n){return t[0]-n[0]}function Ah(t,n){return t[0]<=t[1]?t[0]<=n&&n<=t[1]:n<t[0]||t[1]<n}function Eh(t){var n,e,r,i,o,u,a;if(Ux?Ux.reset():Ux=Gl(),zx=Cx=-(Ax=Ex=1/0),Dx=[],uh(t,kb),e=Dx.length){for(Dx.sort(Sh),n=1,r=Dx[0],o=[r];n<e;++n)i=Dx[n],Ah(r,i[0])||Ah(r,i[1])?(Nh(r[0],i[1])>Nh(r[0],r[1])&&(r[1]=i[1]),Nh(i[0],r[1])>Nh(r[0],r[1])&&(r[0]=i[0])):o.push(r=i);for(u=-(1/0),e=o.length-1,n=0,r=o[e];n<=e;r=i,++n)i=o[n],(a=Nh(r[1],i[0]))>u&&(u=a,Ax=i[0],Cx=r[1])}return Dx=Ox=null,Ax===1/0||Ex===1/0?[[NaN,NaN],[NaN,NaN]]:[[Ax,Ex],[Cx,zx]]}function Ch(t,n){t*=sb,n*=sb;var e=pb(n);zh(e*pb(t),e*gb(t),gb(n))}function zh(t,n,e){++Fx,Yx+=(t-Yx)/Fx,Bx+=(n-Bx)/Fx,jx+=(e-jx)/Fx}function Ph(){Nb.point=qh}function qh(t,n){t*=sb,n*=sb;var e=pb(n);Qx=e*pb(t),Kx=e*gb(t),tb=gb(n),Nb.point=Lh,zh(Qx,Kx,tb)}function Lh(t,n){t*=sb,n*=sb;var e=pb(n),r=e*pb(t),i=e*gb(t),o=gb(n),u=hb(xb((u=Kx*o-tb*i)*u+(u=tb*r-Qx*o)*u+(u=Qx*i-Kx*r)*u),Qx*r+Kx*i+tb*o);Ix+=u,Hx+=u*(Qx+(Qx=r)),Xx+=u*(Kx+(Kx=i)),Vx+=u*(tb+(tb=o)),zh(Qx,Kx,tb)}function Rh(){Nb.point=Ch}function Uh(){Nb.point=Oh}function Dh(){Fh(Gx,Jx),Nb.point=Ch}function Oh(t,n){Gx=t,Jx=n,t*=sb,n*=sb,Nb.point=Fh;var e=pb(n);Qx=e*pb(t),Kx=e*gb(t),tb=gb(n),zh(Qx,Kx,tb)}function Fh(t,n){t*=sb,n*=sb;var e=pb(n),r=e*pb(t),i=e*gb(t),o=gb(n),u=Kx*o-tb*i,a=tb*r-Qx*o,c=Qx*i-Kx*r,s=xb(u*u+a*a+c*c),f=Qx*r+Kx*i+tb*o,l=s&&-Kl(f)/s,h=hb(s,f);Wx+=l*u,$x+=l*a,Zx+=l*c,Ix+=h,Hx+=h*(Qx+(Qx=r)),Xx+=h*(Kx+(Kx=i)),Vx+=h*(tb+(tb=o)),zh(Qx,Kx,tb)}function Ih(t){Fx=Ix=Yx=Bx=jx=Hx=Xx=Vx=Wx=$x=Zx=0,uh(t,Nb);var n=Wx,e=$x,r=Zx,i=n*n+e*e+r*r;return i<rb&&(n=Hx,e=Xx,r=Vx,Ix<eb&&(n=Yx,e=Bx,r=jx),i=n*n+e*e+r*r,i<rb)?[NaN,NaN]:[hb(e,n)*cb,th(r/xb(i))*cb]}function Yh(t){return function(){return t}}function Bh(t,n){function e(e,r){return e=t(e,r),n(e[0],e[1])}return t.invert&&n.invert&&(e.invert=function(e,r){return e=n.invert(e,r),e&&t.invert(e[0],e[1])}),e}function jh(t,n){return[t>ib?t-ab:t<-ib?t+ab:t,n]}function Hh(t,n,e){return(t%=ab)?n||e?Bh(Vh(t),Wh(n,e)):Vh(t):n||e?Wh(n,e):jh}function Xh(t){return function(n,e){return n+=t,[n>ib?n-ab:n<-ib?n+ab:n,e]}}function Vh(t){var n=Xh(t);return n.invert=Xh(-t),n}function Wh(t,n){function e(t,n){var e=pb(n),a=pb(t)*e,c=gb(t)*e,s=gb(n),f=s*r+a*i;return[hb(c*o-f*u,a*r-s*i),th(f*o+c*u)]}var r=pb(t),i=gb(t),o=pb(n),u=gb(n);return e.invert=function(t,n){var e=pb(n),a=pb(t)*e,c=gb(t)*e,s=gb(n),f=s*o-c*u;return[hb(c*o+s*u,a*r+f*i),th(f*r-a*i)]},e}function $h(t){function n(n){return n=t(n[0]*sb,n[1]*sb),n[0]*=cb,n[1]*=cb,n}return t=Hh(t[0]*sb,t[1]*sb,t.length>2?t[2]*sb:0),n.invert=function(n){return n=t.invert(n[0]*sb,n[1]*sb),n[0]*=cb,n[1]*=cb,n},n}function Zh(t,n,e,r,i,o){if(e){var u=pb(n),a=gb(n),c=r*e;null==i?(i=n+r*ab,o=n-c/2):(i=Gh(u,i),o=Gh(u,o),(r>0?i<o:i>o)&&(i+=r*ab));for(var s,f=i;r>0?f>o:f<o;f-=c)s=hh([u,-a*pb(f),-a*gb(f)]),t.point(s[0],s[1])}}function Gh(t,n){n=ph(n),n[0]-=t,gh(n);var e=Kl(-n[1]);return((-n[2]<0?-e:e)+ab-eb)%ab}function Jh(){function t(t,n){e.push(t=r(t,n)),t[0]*=cb,t[1]*=cb}function n(){var t=i.apply(this,arguments),n=o.apply(this,arguments)*sb,c=u.apply(this,arguments)*sb;return e=[],r=Hh(-t[0]*sb,-t[1]*sb,0).invert,Zh(a,n,c,1),t={type:"Polygon",coordinates:[e]},e=r=null,t}var e,r,i=Yh([0,0]),o=Yh(90),u=Yh(6),a={point:t};return n.center=function(t){return arguments.length?(i="function"==typeof t?t:Yh([+t[0],+t[1]]),n):i},n.radius=function(t){return arguments.length?(o="function"==typeof t?t:Yh(+t),n):o},n.precision=function(t){return arguments.length?(u="function"==typeof t?t:Yh(+t),n):u},n}function Qh(){var t,n=[];return{point:function(n,e){t.push([n,e])},lineStart:function(){n.push(t=[])},lineEnd:eh,rejoin:function(){n.length>1&&n.push(n.pop().concat(n.shift()))},result:function(){var e=n;return n=[],t=null,e}}}function Kh(t,n,e,r,i,o){var u,a=t[0],c=t[1],s=n[0],f=n[1],l=0,h=1,p=s-a,d=f-c;if(u=e-a,p||!(u>0)){if(u/=p,p<0){if(u<l)return;u<h&&(h=u)}else if(p>0){if(u>h)return;u>l&&(l=u)}if(u=i-a,p||!(u<0)){if(u/=p,p<0){if(u>h)return;u>l&&(l=u)}else if(p>0){if(u<l)return;u<h&&(h=u)}if(u=r-c,d||!(u>0)){if(u/=d,d<0){if(u<l)return;u<h&&(h=u)}else if(d>0){if(u>h)return;u>l&&(l=u)}if(u=o-c,d||!(u<0)){if(u/=d,d<0){if(u>h)return;u>l&&(l=u)}else if(d>0){if(u<l)return;u<h&&(h=u)}return l>0&&(t[0]=a+l*p,t[1]=c+l*d),h<1&&(n[0]=a+h*p,n[1]=c+h*d),!0}}}}}function tp(t,n){return fb(t[0]-n[0])<eb&&fb(t[1]-n[1])<eb}function np(t,n,e,r){this.x=t,this.z=n,this.o=e,this.e=r,this.v=!1,this.n=this.p=null}function ep(t,n,e,r,i){var o,u,a=[],c=[];if(t.forEach(function(t){if(!((n=t.length-1)<=0)){var n,e,r=t[0],u=t[n];if(tp(r,u)){for(i.lineStart(),o=0;o<n;++o)i.point((r=t[o])[0],r[1]);return void i.lineEnd()}a.push(e=new np(r,t,null,(!0))),c.push(e.o=new np(r,null,e,(!1))),a.push(e=new np(u,t,null,(!1))),c.push(e.o=new np(u,null,e,(!0)))}}),a.length){for(c.sort(n),rp(a),rp(c),o=0,u=c.length;o<u;++o)c[o].e=e=!e;for(var s,f,l=a[0];;){for(var h=l,p=!0;h.v;)if((h=h.n)===l)return;s=h.z,i.lineStart();do{if(h.v=h.o.v=!0,h.e){if(p)for(o=0,u=s.length;o<u;++o)i.point((f=s[o])[0],f[1]);else r(h.x,h.n.x,1,i);h=h.n}else{if(p)for(s=h.p.z,o=s.length-1;o>=0;--o)i.point((f=s[o])[0],f[1]);else r(h.x,h.p.x,-1,i);h=h.p}h=h.o,s=h.z,p=!p}while(!h.v);i.lineEnd()}}}function rp(t){if(n=t.length){for(var n,e,r=0,i=t[0];++r<n;)i.n=e=t[r],e.p=i,i=e;i.n=e=t[0],e.p=i}}function ip(t,n,e,r){function i(i,o){return t<=i&&i<=e&&n<=o&&o<=r}function o(i,o,a,s){var f=0,l=0;if(null==i||(f=u(i,a))!==(l=u(o,a))||c(i,o)<0^a>0){do s.point(0===f||3===f?t:e,f>1?r:n);while((f=(f+a+4)%4)!==l)}else s.point(o[0],o[1])}function u(r,i){return fb(r[0]-t)<eb?i>0?0:3:fb(r[0]-e)<eb?i>0?2:1:fb(r[1]-n)<eb?i>0?1:0:i>0?3:2}function a(t,n){return c(t.x,n.x)}function c(t,n){var e=u(t,1),r=u(n,1);return e!==r?e-r:0===e?n[1]-t[1]:1===e?t[0]-n[0]:2===e?t[1]-n[1]:n[0]-t[0]}return function(u){function c(t,n){i(t,n)&&S.point(t,n)}function s(){for(var n=0,e=0,i=_.length;e<i;++e)for(var o,u,a=_[e],c=1,s=a.length,f=a[0],l=f[0],h=f[1];c<s;++c)o=l,u=h,f=a[c],l=f[0],h=f[1],u<=r?h>r&&(l-o)*(r-u)>(h-u)*(t-o)&&++n:h<=r&&(l-o)*(r-u)<(h-u)*(t-o)&&--n;return n}function f(){S=A,v=[],_=[],N=!0}function l(){var t=s(),n=N&&t,e=(v=w(v)).length;(n||e)&&(u.polygonStart(),n&&(u.lineStart(),o(null,null,1,u),u.lineEnd()),e&&ep(v,a,t,o,u),u.polygonEnd()),S=u,v=_=y=null}function h(){E.point=d,_&&_.push(y=[]),k=!0,T=!1,b=M=NaN}function p(){v&&(d(g,m),x&&T&&A.rejoin(),v.push(A.result())),E.point=c,T&&S.lineEnd()}function d(o,u){var a=i(o,u);if(_&&y.push([o,u]),k)g=o,m=u,x=a,k=!1,a&&(S.lineStart(),S.point(o,u));else if(a&&T)S.point(o,u);else{var c=[b=Math.max(Ib,Math.min(Fb,b)),M=Math.max(Ib,Math.min(Fb,M))],s=[o=Math.max(Ib,Math.min(Fb,o)),u=Math.max(Ib,Math.min(Fb,u))];Kh(c,s,t,n,e,r)?(T||(S.lineStart(),S.point(c[0],c[1])),S.point(s[0],s[1]),a||S.lineEnd(),N=!1):a&&(S.lineStart(),S.point(o,u),N=!1)}b=o,M=u,T=a}var v,_,y,g,m,x,b,M,T,k,N,S=u,A=Qh(),E={point:c,lineStart:h,lineEnd:p,polygonStart:f,polygonEnd:l};return E}}function op(){var t,n,e,r=0,i=0,o=960,u=500;return e={stream:function(e){return t&&n===e?t:t=ip(r,i,o,u)(n=e)},extent:function(a){return arguments.length?(r=+a[0][0],i=+a[0][1],o=+a[1][0],u=+a[1][1],t=n=null,e):[[r,i],[o,u]]}}}function up(){Yb.point=cp,Yb.lineEnd=ap}function ap(){Yb.point=Yb.lineEnd=eh}function cp(t,n){t*=sb,n*=sb,Ab=t,Eb=gb(n),Cb=pb(n),Yb.point=sp}function sp(t,n){t*=sb,n*=sb;var e=gb(n),r=pb(n),i=fb(t-Ab),o=pb(i),u=gb(i),a=r*u,c=Cb*e-Eb*r*o,s=Eb*e+Cb*r*o;Sb.add(hb(xb(a*a+c*c),s)),Ab=t,Eb=e,Cb=r}function fp(t){return Sb?Sb.reset():Sb=Gl(),uh(t,Yb),+Sb}function lp(t,n){return Bb[0]=t,Bb[1]=n,fp(jb)}function hp(t,n,e){var r=l(t,n-eb,e).concat(n);return function(t){return r.map(function(n){return[t,n]})}}function pp(t,n,e){var r=l(t,n-eb,e).concat(n);return function(t){return r.map(function(n){return[n,t]})}}function dp(){function t(){return{type:"MultiLineString",coordinates:n()}}function n(){return l(db(o/y)*y,i,y).map(p).concat(l(db(s/g)*g,c,g).map(d)).concat(l(db(r/v)*v,e,v).filter(function(t){return fb(t%y)>eb}).map(f)).concat(l(db(a/_)*_,u,_).filter(function(t){return fb(t%g)>eb}).map(h))}var e,r,i,o,u,a,c,s,f,h,p,d,v=10,_=v,y=90,g=360,m=2.5;return t.lines=function(){return n().map(function(t){return{type:"LineString",coordinates:t}})},t.outline=function(){return{type:"Polygon",coordinates:[p(o).concat(d(c).slice(1),p(i).reverse().slice(1),d(s).reverse().slice(1))]}},t.extent=function(n){return arguments.length?t.extentMajor(n).extentMinor(n):t.extentMinor()},t.extentMajor=function(n){return arguments.length?(o=+n[0][0],i=+n[1][0],s=+n[0][1],c=+n[1][1],o>i&&(n=o,o=i,i=n),s>c&&(n=s,s=c,c=n),t.precision(m)):[[o,s],[i,c]]},t.extentMinor=function(n){return arguments.length?(r=+n[0][0],e=+n[1][0],a=+n[0][1],u=+n[1][1],r>e&&(n=r,r=e,e=n),a>u&&(n=a,a=u,u=n),t.precision(m)):[[r,a],[e,u]]},t.step=function(n){return arguments.length?t.stepMajor(n).stepMinor(n):t.stepMinor()},t.stepMajor=function(n){return arguments.length?(y=+n[0],g=+n[1],t):[y,g]},t.stepMinor=function(n){return arguments.length?(v=+n[0],_=+n[1],t):[v,_]},t.precision=function(n){return arguments.length?(m=+n,f=hp(a,u,90),h=pp(r,e,m),p=hp(s,c,90),d=pp(o,i,m),t):m},t.extentMajor([[-180,-90+eb],[180,90-eb]]).extentMinor([[-180,-80-eb],[180,80+eb]])}function vp(t,n){var e=t[0]*sb,r=t[1]*sb,i=n[0]*sb,o=n[1]*sb,u=pb(r),a=gb(r),c=pb(o),s=gb(o),f=u*pb(e),l=u*gb(e),h=c*pb(i),p=c*gb(i),d=2*th(xb(nh(o-r)+u*c*nh(i-e))),v=gb(d),_=d?function(t){var n=gb(t*=d)/v,e=gb(d-t)/v,r=e*f+n*h,i=e*l+n*p,o=e*a+n*s;return[hb(i,r)*cb,hb(o,xb(r*r+i*i))*cb]}:function(){return[e*cb,r*cb]};return _.distance=d,_}function _p(t){return t}function yp(){Vb.point=gp}function gp(t,n){Vb.point=mp,zb=qb=t,Pb=Lb=n}function mp(t,n){Xb.add(Lb*t-qb*n),qb=t,Lb=n}function xp(){mp(zb,Pb)}function bp(t,n){t<Wb&&(Wb=t),t>Zb&&(Zb=t),n<$b&&($b=n),n>Gb&&(Gb=n)}function wp(t,n){Qb+=t,Kb+=n,++tw}function Mp(){aw.point=Tp}function Tp(t,n){aw.point=kp,wp(Db=t,Ob=n)}function kp(t,n){var e=t-Db,r=n-Ob,i=xb(e*e+r*r);nw+=i*(Db+t)/2,ew+=i*(Ob+n)/2,rw+=i,wp(Db=t,Ob=n)}function Np(){aw.point=wp}function Sp(){aw.point=Ep}function Ap(){Cp(Rb,Ub)}function Ep(t,n){aw.point=Cp,wp(Rb=Db=t,Ub=Ob=n)}function Cp(t,n){var e=t-Db,r=n-Ob,i=xb(e*e+r*r);nw+=i*(Db+t)/2,ew+=i*(Ob+n)/2,rw+=i,i=Ob*t-Db*n,iw+=i*(Db+t),ow+=i*(Ob+n),uw+=3*i,wp(Db=t,Ob=n)}function zp(t){function n(n,e){t.moveTo(n+u,e),t.arc(n,e,u,0,ab)}function e(n,e){t.moveTo(n,e),a.point=r}function r(n,e){t.lineTo(n,e)}function i(){a.point=n}function o(){t.closePath()}var u=4.5,a={point:n,lineStart:function(){a.point=e},lineEnd:i,polygonStart:function(){a.lineEnd=o},polygonEnd:function(){a.lineEnd=i,a.point=n},pointRadius:function(t){return u=t,a},result:eh};return a}function Pp(){function t(t,n){a.push("M",t,",",n,u)}function n(t,n){a.push("M",t,",",n),c.point=e}function e(t,n){a.push("L",t,",",n)}function r(){c.point=n}function i(){c.point=t}function o(){a.push("Z")}var u=qp(4.5),a=[],c={point:t,lineStart:r,lineEnd:i,polygonStart:function(){c.lineEnd=o},polygonEnd:function(){c.lineEnd=i,c.point=t},pointRadius:function(t){return u=qp(t),c},result:function(){if(a.length){var t=a.join("");return a=[],t}}};return c}function qp(t){return"m0,"+t+"a"+t+","+t+" 0 1,1 0,"+-2*t+"a"+t+","+t+" 0 1,1 0,"+2*t+"z"}function Lp(){function t(t){return t&&("function"==typeof o&&i.pointRadius(+o.apply(this,arguments)),uh(t,e(i))),i.result()}var n,e,r,i,o=4.5;return t.area=function(t){return uh(t,e(Vb)),Vb.result()},t.bounds=function(t){return uh(t,e(Jb)),Jb.result()},t.centroid=function(t){return uh(t,e(aw)),aw.result()},t.projection=function(r){return arguments.length?(e=null==(n=r)?_p:r.stream,t):n},t.context=function(n){return arguments.length?(i=null==(r=n)?new Pp:new zp(n),"function"!=typeof o&&i.pointRadius(o),t):r},t.pointRadius=function(n){return arguments.length?(o="function"==typeof n?n:(i.pointRadius(+n),+n),t):o},t.projection(null).context(null)}function Rp(t,n){for(var e=n[0],r=n[1],i=[gb(e),-pb(e),0],o=0,u=0,a=0,c=t.length;a<c;++a)if(f=(s=t[a]).length)for(var s,f,l=s[f-1],h=l[0],p=l[1]/2+ub,d=gb(p),v=pb(p),_=0;_<f;++_,h=g,d=x,v=b,l=y){var y=s[_],g=y[0],m=y[1]/2+ub,x=gb(m),b=pb(m),w=g-h,M=w>=0?1:-1,T=M*w,k=T>ib,N=d*x;if(cw.add(hb(N*M*gb(T),v*b+N*pb(T))),o+=k?w+M*ab:w,k^h>=e^g>=e){var S=vh(ph(l),ph(y));gh(S);var A=vh(i,S);gh(A);var E=(k^w>=0?-1:1)*th(A[2]);(r>E||r===E&&(S[0]||S[1]))&&(u+=k^w>=0?1:-1)}}var C=(o<-eb||o<eb&&cw<-eb)^1&u;return cw.reset(),C}function Up(t,n,e,r){return function(i,o){function u(n,e){var r=i(n,e);t(n=r[0],e=r[1])&&o.point(n,e)}function a(t,n){var e=i(t,n);_.point(e[0],e[1])}function c(){b.point=a,_.lineStart()}function s(){b.point=u,_.lineEnd()}function f(t,n){v.push([t,n]);var e=i(t,n);m.point(e[0],e[1])}function l(){m.lineStart(),v=[]}function h(){f(v[0][0],v[0][1]),m.lineEnd();var t,n,e,r,i=m.clean(),u=g.result(),a=u.length;if(v.pop(),p.push(v),v=null,a)if(1&i){if(e=u[0],(n=e.length-1)>0){for(x||(o.polygonStart(),x=!0),o.lineStart(),t=0;t<n;++t)o.point((r=e[t])[0],r[1]);o.lineEnd()}}else a>1&&2&i&&u.push(u.pop().concat(u.shift())),d.push(u.filter(Dp))}var p,d,v,_=n(o),y=i.invert(r[0],r[1]),g=Qh(),m=n(g),x=!1,b={point:u,lineStart:c,lineEnd:s,polygonStart:function(){b.point=f,b.lineStart=l,b.lineEnd=h,d=[],p=[]},polygonEnd:function(){b.point=u,b.lineStart=c,b.lineEnd=s,d=w(d);var t=Rp(p,y);d.length?(x||(o.polygonStart(),x=!0),ep(d,Op,t,e,o)):t&&(x||(o.polygonStart(),x=!0),o.lineStart(),e(null,null,1,o),o.lineEnd()),x&&(o.polygonEnd(),x=!1),d=p=null},sphere:function(){o.polygonStart(),o.lineStart(),e(null,null,1,o),o.lineEnd(),o.polygonEnd()}};return b}}function Dp(t){return t.length>1}function Op(t,n){return((t=t.x)[0]<0?t[1]-ob-eb:ob-t[1])-((n=n.x)[0]<0?n[1]-ob-eb:ob-n[1])}function Fp(t){var n,e=NaN,r=NaN,i=NaN;return{lineStart:function(){t.lineStart(),n=1},point:function(o,u){var a=o>0?ib:-ib,c=fb(o-e);fb(c-ib)<eb?(t.point(e,r=(r+u)/2>0?ob:-ob),t.point(i,r),t.lineEnd(),t.lineStart(),t.point(a,r),t.point(o,r),n=0):i!==a&&c>=ib&&(fb(e-i)<eb&&(e-=i*eb),fb(o-a)<eb&&(o-=a*eb),r=Ip(e,r,o,u),t.point(i,r),t.lineEnd(),t.lineStart(),t.point(a,r),n=0),t.point(e=o,r=u),i=a},lineEnd:function(){t.lineEnd(),e=r=NaN},clean:function(){return 2-n}}}function Ip(t,n,e,r){var i,o,u=gb(t-e);return fb(u)>eb?lb((gb(n)*(o=pb(r))*gb(e)-gb(r)*(i=pb(n))*gb(t))/(i*o*u)):(n+r)/2}function Yp(t,n,e,r){var i;if(null==t)i=e*ob,r.point(-ib,i),r.point(0,i),r.point(ib,i),r.point(ib,0),r.point(ib,-i),r.point(0,-i),r.point(-ib,-i),r.point(-ib,0),r.point(-ib,i);else if(fb(t[0]-n[0])>eb){var o=t[0]<n[0]?ib:-ib;i=e*o/2,r.point(-o,i),r.point(0,i),r.point(o,i)}else r.point(n[0],n[1])}function Bp(t,n){function e(e,r,i,o){Zh(o,t,n,i,e,r)}function r(t,n){return pb(t)*pb(n)>a}function i(t){var n,e,i,a,f;return{lineStart:function(){a=i=!1,f=1},point:function(l,h){var p,d=[l,h],v=r(l,h),_=c?v?0:u(l,h):v?u(l+(l<0?ib:-ib),h):0;if(!n&&(a=i=v)&&t.lineStart(),v!==i&&(p=o(n,d),(tp(n,p)||tp(d,p))&&(d[0]+=eb,d[1]+=eb,v=r(d[0],d[1]))),v!==i)f=0,v?(t.lineStart(),p=o(d,n),t.point(p[0],p[1])):(p=o(n,d),t.point(p[0],p[1]),t.lineEnd()),n=p;else if(s&&n&&c^v){var y;_&e||!(y=o(d,n,!0))||(f=0,c?(t.lineStart(),t.point(y[0][0],y[0][1]),t.point(y[1][0],y[1][1]),t.lineEnd()):(t.point(y[1][0],y[1][1]),t.lineEnd(),t.lineStart(),t.point(y[0][0],y[0][1])))}!v||n&&tp(n,d)||t.point(d[0],d[1]),n=d,i=v,e=_},lineEnd:function(){i&&t.lineEnd(),n=null},clean:function(){return f|(a&&i)<<1}}}function o(t,n,e){var r=ph(t),i=ph(n),o=[1,0,0],u=vh(r,i),c=dh(u,u),s=u[0],f=c-s*s;if(!f)return!e&&t;var l=a*c/f,h=-a*s/f,p=vh(o,u),d=yh(o,l),v=yh(u,h);_h(d,v);var _=p,y=dh(d,_),g=dh(_,_),m=y*y-g*(dh(d,d)-1);if(!(m<0)){var x=xb(m),b=yh(_,(-y-x)/g);if(_h(b,d),b=hh(b),!e)return b;var w,M=t[0],T=n[0],k=t[1],N=n[1];T<M&&(w=M,M=T,T=w);var S=T-M,A=fb(S-ib)<eb,E=A||S<eb;if(!A&&N<k&&(w=k,k=N,N=w),E?A?k+N>0^b[1]<(fb(b[0]-M)<eb?k:N):k<=b[1]&&b[1]<=N:S>ib^(M<=b[0]&&b[0]<=T)){var C=yh(_,(-y+x)/g);return _h(C,d),[b,hh(C)]}}}function u(n,e){var r=c?t:ib-t,i=0;return n<-r?i|=1:n>r&&(i|=2),e<-r?i|=4:e>r&&(i|=8),i}var a=pb(t),c=a>0,s=fb(a)>eb;return Up(r,i,e,c?[0,-t]:[-ib,t-ib])}function jp(t){return{stream:Hp(t)}}function Hp(t){function n(){}var e=n.prototype=Object.create(Xp.prototype);for(var r in t)e[r]=t[r];return function(t){var e=new n;return e.stream=t,e}}function Xp(){}function Vp(t,n){return+n?$p(t,n):Wp(t)}function Wp(t){return Hp({point:function(n,e){n=t(n,e),this.stream.point(n[0],n[1])}})}function $p(t,n){function e(r,i,o,u,a,c,s,f,l,h,p,d,v,_){var y=s-r,g=f-i,m=y*y+g*g;if(m>4*n&&v--){var x=u+h,b=a+p,w=c+d,M=xb(x*x+b*b+w*w),T=th(w/=M),k=fb(fb(w)-1)<eb||fb(o-l)<eb?(o+l)/2:hb(b,x),N=t(k,T),S=N[0],A=N[1],E=S-r,C=A-i,z=g*E-y*C;(z*z/m>n||fb((y*E+g*C)/m-.5)>.3||u*h+a*p+c*d<lw)&&(e(r,i,o,u,a,c,S,A,k,x/=M,b/=M,w,v,_),_.point(S,A),e(S,A,k,x,b,w,s,f,l,h,p,d,v,_))}}return function(n){function r(e,r){e=t(e,r),n.point(e[0],e[1])}function i(){y=NaN,w.point=o,n.lineStart()}function o(r,i){var o=ph([r,i]),u=t(r,i);e(y,g,_,m,x,b,y=u[0],g=u[1],_=r,m=o[0],x=o[1],b=o[2],fw,n),n.point(y,g)}function u(){w.point=r,n.lineEnd()}function a(){i(),w.point=c,w.lineEnd=s}function c(t,n){o(f=t,n),l=y,h=g,p=m,d=x,v=b,w.point=o}function s(){e(y,g,_,m,x,b,l,h,f,p,d,v,fw,n),w.lineEnd=u,u()}var f,l,h,p,d,v,_,y,g,m,x,b,w={point:r,lineStart:i,lineEnd:u,polygonStart:function(){n.polygonStart(),w.lineStart=a},polygonEnd:function(){n.polygonEnd(),w.lineStart=i}};return w}}function Zp(t){return Gp(function(){return t})()}function Gp(t){function n(t){return t=f(t[0]*sb,t[1]*sb),[t[0]*_+a,c-t[1]*_]}function e(t){return t=f.invert((t[0]-a)/_,(c-t[1])/_),t&&[t[0]*cb,t[1]*cb]}function r(t,n){return t=u(t,n),[t[0]*_+a,c-t[1]*_]}function i(){f=Bh(s=Hh(b,w,M),u);var t=u(m,x);return a=y-t[0]*_,c=g+t[1]*_,o()}function o(){return d=v=null,n}var u,a,c,s,f,l,h,p,d,v,_=150,y=480,g=250,m=0,x=0,b=0,w=0,M=0,T=null,k=sw,N=null,S=_p,A=.5,E=Vp(r,A);return n.stream=function(t){return d&&v===t?d:d=hw(k(s,E(S(v=t))))},n.clipAngle=function(t){return arguments.length?(k=+t?Bp(T=t*sb,6*sb):(T=null,sw),o()):T*cb},n.clipExtent=function(t){return arguments.length?(S=null==t?(N=l=h=p=null,_p):ip(N=+t[0][0],l=+t[0][1],h=+t[1][0],p=+t[1][1]),o()):null==N?null:[[N,l],[h,p]]},n.scale=function(t){return arguments.length?(_=+t,i()):_},n.translate=function(t){return arguments.length?(y=+t[0],g=+t[1],i()):[y,g]},n.center=function(t){return arguments.length?(m=t[0]%360*sb,x=t[1]%360*sb,i()):[m*cb,x*cb]},n.rotate=function(t){return arguments.length?(b=t[0]%360*sb,w=t[1]%360*sb,M=t.length>2?t[2]%360*sb:0,i()):[b*cb,w*cb,M*cb]},n.precision=function(t){return arguments.length?(E=Vp(r,A=t*t),o()):xb(A)},function(){return u=t.apply(this,arguments),n.invert=u.invert&&e,i()}}function Jp(t){var n=0,e=ib/3,r=Gp(t),i=r(n,e);return i.parallels=function(t){return arguments.length?r(n=t[0]*sb,e=t[1]*sb):[n*cb,e*cb]},i}function Qp(t,n){function e(t,n){var e=xb(o-2*i*gb(n))/i;return[e*gb(t*=i),u-e*pb(t)]}var r=gb(t),i=(r+gb(n))/2,o=1+r*(2*i-r),u=xb(o)/i;return e.invert=function(t,n){var e=u-n;return[hb(t,e)/i,th((o-(t*t+e*e)*i*i)/(2*i))]},e}function Kp(){return Jp(Qp).scale(155.424).center([0,33.6442])}function td(){return Kp().parallels([29.5,45.5]).scale(1070).translate([480,250]).rotate([96,0]).center([-.6,38.7])}function nd(t){var n=t.length;return{point:function(e,r){for(var i=-1;++i<n;)t[i].point(e,r)},sphere:function(){for(var e=-1;++e<n;)t[e].sphere()},lineStart:function(){for(var e=-1;++e<n;)t[e].lineStart()},lineEnd:function(){for(var e=-1;++e<n;)t[e].lineEnd()},polygonStart:function(){for(var e=-1;++e<n;)t[e].polygonStart()},polygonEnd:function(){for(var e=-1;++e<n;)t[e].polygonEnd()}}}function ed(){function t(t){var n=t[0],e=t[1];return u=null,r.point(n,e),u||(i.point(n,e),u)||(o.point(n,e),u)}var n,e,r,i,o,u,a=td(),c=Kp().rotate([154,0]).center([-2,58.5]).parallels([55,65]),s=Kp().rotate([157,0]).center([-3,19.9]).parallels([8,18]),f={point:function(t,n){u=[t,n]}};return t.invert=function(t){var n=a.scale(),e=a.translate(),r=(t[0]-e[0])/n,i=(t[1]-e[1])/n;return(i>=.12&&i<.234&&r>=-.425&&r<-.214?c:i>=.166&&i<.234&&r>=-.214&&r<-.115?s:a).invert(t)},t.stream=function(t){return n&&e===t?n:n=nd([a.stream(e=t),c.stream(t),s.stream(t)])},t.precision=function(n){return arguments.length?(a.precision(n),c.precision(n),s.precision(n),t):a.precision()},t.scale=function(n){return arguments.length?(a.scale(n),c.scale(.35*n),s.scale(n),t.translate(a.translate())):a.scale()},t.translate=function(n){if(!arguments.length)return a.translate();var e=a.scale(),u=+n[0],l=+n[1];return r=a.translate(n).clipExtent([[u-.455*e,l-.238*e],[u+.455*e,l+.238*e]]).stream(f),i=c.translate([u-.307*e,l+.201*e]).clipExtent([[u-.425*e+eb,l+.12*e+eb],[u-.214*e-eb,l+.234*e-eb]]).stream(f),o=s.translate([u-.205*e,l+.212*e]).clipExtent([[u-.214*e+eb,l+.166*e+eb],[u-.115*e-eb,l+.234*e-eb]]).stream(f),t},t.scale(1070)}function rd(t){return function(n,e){var r=pb(n),i=pb(e),o=t(r*i);return[o*i*gb(n),o*gb(e)]}}function id(t){return function(n,e){var r=xb(n*n+e*e),i=t(r),o=gb(i),u=pb(i);return[hb(n*o,r*u),th(r&&e*o/r)]}}function od(){return Zp(pw).scale(124.75).clipAngle(179.999)}function ud(){return Zp(dw).scale(79.4188).clipAngle(179.999)}function ad(t,n){return[t,_b(bb((ob+n)/2))]}function cd(){return sd(ad).scale(961/ab)}function sd(t){var n,e=Zp(t),r=e.scale,i=e.translate,o=e.clipExtent;return e.scale=function(t){return arguments.length?(r(t),n&&e.clipExtent(null),e):r()},e.translate=function(t){return arguments.length?(i(t),n&&e.clipExtent(null),e):i()},e.clipExtent=function(t){if(!arguments.length)return n?null:o();if(n=null==t){var u=ib*r(),a=i();t=[[a[0]-u,a[1]-u],[a[0]+u,a[1]+u]]}return o(t),e},e.clipExtent(null)}function fd(t){return bb((ob+t)/2)}function ld(t,n){function e(t,n){o>0?n<-ob+eb&&(n=-ob+eb):n>ob-eb&&(n=ob-eb);var e=o/yb(fd(n),i);return[e*gb(i*t),o-e*pb(i*t)]}var r=pb(t),i=t===n?gb(t):_b(r/pb(n))/_b(fd(n)/fd(t)),o=r*yb(fd(t),i)/i;return i?(e.invert=function(t,n){var e=o-n,r=mb(i)*xb(t*t+e*e);return[hb(t,e)/i,2*lb(yb(o/r,1/i))-ob]},e):ad}function hd(){return Jp(ld).scale(109.5).parallels([30,30])}function pd(t,n){return[t,n]}function dd(){return Zp(pd).scale(152.63)}function vd(t,n){function e(t,n){var e=o-n,r=i*t;return[e*gb(r),o-e*pb(r)]}var r=pb(t),i=t===n?gb(t):(r-pb(n))/(n-t),o=r/i+t;return fb(i)<eb?pd:(e.invert=function(t,n){var e=o-n;return[hb(t,e)/i,o-mb(i)*xb(t*t+e*e)]},e)}function _d(){return Jp(vd).scale(131.154).center([0,13.9389])}function yd(t,n){var e=pb(n),r=pb(t)*e;return[e*gb(t)/r,gb(n)/r]}function gd(){return Zp(yd).scale(144.049).clipAngle(60)}function md(t,n){return[pb(n)*gb(t),gb(n)]}function xd(){return Zp(md).scale(249.5).clipAngle(90+eb)}function bd(t,n){var e=pb(n),r=1+pb(t)*e;return[e*gb(t)/r,gb(n)/r]}function wd(){return Zp(bd).scale(250).clipAngle(142)}function Md(t,n){return[_b(bb((ob+n)/2)),-t]}function Td(){var t=sd(Md),n=t.center,e=t.rotate;return t.center=function(t){return arguments.length?n([-t[1],t[0]]):(t=n(),[t[1],-t[0]])},t.rotate=function(t){return arguments.length?e([t[0],t[1],t.length>2?t[2]+90:90]):(t=e(),[t[0],t[1],t[2]-90])},e([0,0,90]).scale(159.155)}var kd="4.1.1",Nd=e(n),Sd=Nd.right,Ad=Nd.left,Ed=Array.prototype,Cd=Ed.slice,zd=Ed.map,Pd=Math.sqrt(50),qd=Math.sqrt(10),Ld=Math.sqrt(2),Rd="$";P.prototype=q.prototype={constructor:P,has:function(t){return Rd+t in this},get:function(t){return this[Rd+t]},set:function(t,n){return this[Rd+t]=n,this},remove:function(t){var n=Rd+t;return n in this&&delete this[n]},clear:function(){for(var t in this)t[0]===Rd&&delete this[t]},keys:function(){var t=[];for(var n in this)n[0]===Rd&&t.push(n.slice(1));return t},values:function(){var t=[];for(var n in this)n[0]===Rd&&t.push(this[n]);return t},entries:function(){var t=[];for(var n in this)n[0]===Rd&&t.push({key:n.slice(1),value:this[n]});return t},size:function(){var t=0;for(var n in this)n[0]===Rd&&++t;return t},empty:function(){for(var t in this)if(t[0]===Rd)return!1;return!0},each:function(t){for(var n in this)n[0]===Rd&&t(this[n],n.slice(1),this)}};var Ud=q.prototype;F.prototype=I.prototype={constructor:F,has:Ud.has,add:function(t){return t+="",this[Rd+t]=t,this},remove:Ud.remove,clear:Ud.clear,values:Ud.keys,size:Ud.size,empty:Ud.empty,each:Ud.each};var Dd=3,Od=function t(n){function e(t){return Math.pow(t,n)}return n=+n,e.exponent=t,e}(Dd),Fd=function t(n){function e(t){return 1-Math.pow(1-t,n)}return n=+n,e.exponent=t,e}(Dd),Id=function t(n){function e(t){return((t*=2)<=1?Math.pow(t,n):2-Math.pow(2-t,n))/2}return n=+n,e.exponent=t,e}(Dd),Yd=Math.PI,Bd=Yd/2,jd=4/11,Hd=6/11,Xd=8/11,Vd=.75,Wd=9/11,$d=10/11,Zd=.9375,Gd=21/22,Jd=63/64,Qd=1/jd/jd,Kd=1.70158,tv=function t(n){function e(t){return t*t*((n+1)*t-n)}return n=+n,e.overshoot=t,e}(Kd),nv=function t(n){function e(t){return--t*t*((n+1)*t+n)+1}return n=+n,e.overshoot=t,e}(Kd),ev=function t(n){function e(t){return((t*=2)<1?t*t*((n+1)*t-n):(t-=2)*t*((n+1)*t+n)+2)/2}return n=+n,e.overshoot=t,e}(Kd),rv=2*Math.PI,iv=1,ov=.3,uv=function t(n,e){function r(t){return n*Math.pow(2,10*--t)*Math.sin((i-t)/e)}var i=Math.asin(1/(n=Math.max(1,n)))*(e/=rv);return r.amplitude=function(n){return t(n,e*rv)},r.period=function(e){return t(n,e)},r}(iv,ov),av=function t(n,e){function r(t){return 1-n*Math.pow(2,-10*(t=+t))*Math.sin((t+i)/e)}var i=Math.asin(1/(n=Math.max(1,n)))*(e/=rv);return r.amplitude=function(n){return t(n,e*rv)},r.period=function(e){return t(n,e)},r}(iv,ov),cv=function t(n,e){function r(t){return((t=2*t-1)<0?n*Math.pow(2,10*t)*Math.sin((i-t)/e):2-n*Math.pow(2,-10*t)*Math.sin((i+t)/e))/2}var i=Math.asin(1/(n=Math.max(1,n)))*(e/=rv);return r.amplitude=function(n){return t(n,e*rv)},r.period=function(e){return t(n,e)},r}(iv,ov),sv=Math.PI,fv=2*sv,lv=1e-6,hv=fv-lv;Mt.prototype=Tt.prototype={constructor:Mt,moveTo:function(t,n){this._.push("M",this._x0=this._x1=+t,",",this._y0=this._y1=+n)},closePath:function(){null!==this._x1&&(this._x1=this._x0,this._y1=this._y0,this._.push("Z"))},lineTo:function(t,n){this._.push("L",this._x1=+t,",",this._y1=+n)},quadraticCurveTo:function(t,n,e,r){this._.push("Q",+t,",",+n,",",this._x1=+e,",",this._y1=+r)},bezierCurveTo:function(t,n,e,r,i,o){this._.push("C",+t,",",+n,",",+e,",",+r,",",this._x1=+i,",",this._y1=+o)},arcTo:function(t,n,e,r,i){t=+t,n=+n,e=+e,r=+r,i=+i;var o=this._x1,u=this._y1,a=e-t,c=r-n,s=o-t,f=u-n,l=s*s+f*f;if(i<0)throw new Error("negative radius: "+i);if(null===this._x1)this._.push("M",this._x1=t,",",this._y1=n);else if(l>lv)if(Math.abs(f*a-c*s)>lv&&i){var h=e-o,p=r-u,d=a*a+c*c,v=h*h+p*p,_=Math.sqrt(d),y=Math.sqrt(l),g=i*Math.tan((sv-Math.acos((d+l-v)/(2*_*y)))/2),m=g/y,x=g/_;Math.abs(m-1)>lv&&this._.push("L",t+m*s,",",n+m*f),this._.push("A",i,",",i,",0,0,",+(f*h>s*p),",",this._x1=t+x*a,",",this._y1=n+x*c)}else this._.push("L",this._x1=t,",",this._y1=n);else;},arc:function(t,n,e,r,i,o){t=+t,n=+n,e=+e;var u=e*Math.cos(r),a=e*Math.sin(r),c=t+u,s=n+a,f=1^o,l=o?r-i:i-r;if(e<0)throw new Error("negative radius: "+e);null===this._x1?this._.push("M",c,",",s):(Math.abs(this._x1-c)>lv||Math.abs(this._y1-s)>lv)&&this._.push("L",c,",",s),e&&(l>hv?this._.push("A",e,",",e,",0,1,",f,",",t-u,",",n-a,"A",e,",",e,",0,1,",f,",",this._x1=c,",",this._y1=s):(l<0&&(l=l%fv+fv),this._.push("A",e,",",e,",0,",+(l>=sv),",",f,",",this._x1=t+e*Math.cos(i),",",this._y1=n+e*Math.sin(i))))},rect:function(t,n,e,r){this._.push("M",this._x0=this._x1=+t,",",this._y0=this._y1=+n,"h",+e,"v",+r,"h",-e,"Z")},toString:function(){return this._.join("")}};var pv=jt.prototype=Ht.prototype;pv.copy=function(){var t,n,e=new Ht(this._x,this._y,this._x0,this._y0,this._x1,this._y1),r=this._root;if(!r)return e;if(!r.length)return e._root=Xt(r),e;for(t=[{source:r,target:e._root=new Array(4)}];r=t.pop();)for(var i=0;i<4;++i)(n=r.source[i])&&(n.length?t.push({source:n,target:r.target[i]=new Array(4)}):r.target[i]=Xt(n));return e},pv.add=kt,pv.addAll=St,pv.cover=At,pv.data=Et,pv.extent=Ct,pv.find=Pt,pv.remove=qt,pv.removeAll=Lt,pv.root=Rt,pv.size=Ut,pv.visit=Dt,pv.visitAfter=Ot,pv.x=It,pv.y=Bt;var dv=[].slice,vv={};Vt.prototype=Qt.prototype={constructor:Vt,defer:function(t){if("function"!=typeof t||this._call)throw new Error;if(null!=this._error)return this;var n=dv.call(arguments,1);return n.push(t),++this._waiting,this._tasks.push(n),Wt(this),this},abort:function(){return null==this._error&&Gt(this,new Error("abort")),this},await:function(t){if("function"!=typeof t||this._call)throw new Error;return this._call=function(n,e){t.apply(null,[n].concat(e))},Jt(this),this},awaitAll:function(t){if("function"!=typeof t||this._call)throw new Error;return this._call=t,Jt(this),this}};var _v=1e-12,yv=Math.PI,gv=yv/2,mv=2*yv;fn.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line;
},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;default:this._context.lineTo(t,n)}}};var xv=xn(ln);mn.prototype={areaStart:function(){this._curve.areaStart()},areaEnd:function(){this._curve.areaEnd()},lineStart:function(){this._curve.lineStart()},lineEnd:function(){this._curve.lineEnd()},point:function(t,n){this._curve.point(n*Math.sin(t),n*-Math.cos(t))}};var bv={draw:function(t,n){var e=Math.sqrt(n/yv);t.moveTo(e,0),t.arc(0,0,e,0,mv)}},wv={draw:function(t,n){var e=Math.sqrt(n/5)/2;t.moveTo(-3*e,-e),t.lineTo(-e,-e),t.lineTo(-e,-3*e),t.lineTo(e,-3*e),t.lineTo(e,-e),t.lineTo(3*e,-e),t.lineTo(3*e,e),t.lineTo(e,e),t.lineTo(e,3*e),t.lineTo(-e,3*e),t.lineTo(-e,e),t.lineTo(-3*e,e),t.closePath()}},Mv=Math.sqrt(1/3),Tv=2*Mv,kv={draw:function(t,n){var e=Math.sqrt(n/Tv),r=e*Mv;t.moveTo(0,-e),t.lineTo(r,0),t.lineTo(0,e),t.lineTo(-r,0),t.closePath()}},Nv=.8908130915292852,Sv=Math.sin(yv/10)/Math.sin(7*yv/10),Av=Math.sin(mv/10)*Sv,Ev=-Math.cos(mv/10)*Sv,Cv={draw:function(t,n){var e=Math.sqrt(n*Nv),r=Av*e,i=Ev*e;t.moveTo(0,-e),t.lineTo(r,i);for(var o=1;o<5;++o){var u=mv*o/5,a=Math.cos(u),c=Math.sin(u);t.lineTo(c*e,-a*e),t.lineTo(a*r-c*i,c*r+a*i)}t.closePath()}},zv={draw:function(t,n){var e=Math.sqrt(n),r=-e/2;t.rect(r,r,e,e)}},Pv=Math.sqrt(3),qv={draw:function(t,n){var e=-Math.sqrt(n/(3*Pv));t.moveTo(0,2*e),t.lineTo(-Pv*e,-e),t.lineTo(Pv*e,-e),t.closePath()}},Lv=-.5,Rv=Math.sqrt(3)/2,Uv=1/Math.sqrt(12),Dv=3*(Uv/2+1),Ov={draw:function(t,n){var e=Math.sqrt(n/Dv),r=e/2,i=e*Uv,o=r,u=e*Uv+e,a=-o,c=u;t.moveTo(r,i),t.lineTo(o,u),t.lineTo(a,c),t.lineTo(Lv*r-Rv*i,Rv*r+Lv*i),t.lineTo(Lv*o-Rv*u,Rv*o+Lv*u),t.lineTo(Lv*a-Rv*c,Rv*a+Lv*c),t.lineTo(Lv*r+Rv*i,Lv*i-Rv*r),t.lineTo(Lv*o+Rv*u,Lv*u-Rv*o),t.lineTo(Lv*a+Rv*c,Lv*c-Rv*a),t.closePath()}},Fv=[bv,wv,kv,zv,Cv,qv,Ov];Sn.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=NaN,this._point=0},lineEnd:function(){switch(this._point){case 3:Nn(this,this._x1,this._y1);case 2:this._context.lineTo(this._x1,this._y1)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;break;case 2:this._point=3,this._context.lineTo((5*this._x0+this._x1)/6,(5*this._y0+this._y1)/6);default:Nn(this,t,n)}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=n}},En.prototype={areaStart:kn,areaEnd:kn,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._y0=this._y1=this._y2=this._y3=this._y4=NaN,this._point=0},lineEnd:function(){switch(this._point){case 1:this._context.moveTo(this._x2,this._y2),this._context.closePath();break;case 2:this._context.moveTo((this._x2+2*this._x3)/3,(this._y2+2*this._y3)/3),this._context.lineTo((this._x3+2*this._x2)/3,(this._y3+2*this._y2)/3),this._context.closePath();break;case 3:this.point(this._x2,this._y2),this.point(this._x3,this._y3),this.point(this._x4,this._y4)}},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._x2=t,this._y2=n;break;case 1:this._point=2,this._x3=t,this._y3=n;break;case 2:this._point=3,this._x4=t,this._y4=n,this._context.moveTo((this._x0+4*this._x1+t)/6,(this._y0+4*this._y1+n)/6);break;default:Nn(this,t,n)}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=n}},zn.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=NaN,this._point=0},lineEnd:function(){(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3;var e=(this._x0+4*this._x1+t)/6,r=(this._y0+4*this._y1+n)/6;this._line?this._context.lineTo(e,r):this._context.moveTo(e,r);break;case 3:this._point=4;default:Nn(this,t,n)}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=n}},qn.prototype={lineStart:function(){this._x=[],this._y=[],this._basis.lineStart()},lineEnd:function(){var t=this._x,n=this._y,e=t.length-1;if(e>0)for(var r,i=t[0],o=n[0],u=t[e]-i,a=n[e]-o,c=-1;++c<=e;)r=c/e,this._basis.point(this._beta*t[c]+(1-this._beta)*(i+r*u),this._beta*n[c]+(1-this._beta)*(o+r*a));this._x=this._y=null,this._basis.lineEnd()},point:function(t,n){this._x.push(+t),this._y.push(+n)}};var Iv=function t(n){function e(t){return 1===n?new Sn(t):new qn(t,n)}return e.beta=function(n){return t(+n)},e}(.85);Rn.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:Ln(this,this._x1,this._y1)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2,this._x1=t,this._y1=n;break;case 2:this._point=3;default:Ln(this,t,n)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var Yv=function t(n){function e(t){return new Rn(t,n)}return e.tension=function(n){return t(+n)},e}(0);Un.prototype={areaStart:kn,areaEnd:kn,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._x5=this._y0=this._y1=this._y2=this._y3=this._y4=this._y5=NaN,this._point=0},lineEnd:function(){switch(this._point){case 1:this._context.moveTo(this._x3,this._y3),this._context.closePath();break;case 2:this._context.lineTo(this._x3,this._y3),this._context.closePath();break;case 3:this.point(this._x3,this._y3),this.point(this._x4,this._y4),this.point(this._x5,this._y5)}},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._x3=t,this._y3=n;break;case 1:this._point=2,this._context.moveTo(this._x4=t,this._y4=n);break;case 2:this._point=3,this._x5=t,this._y5=n;break;default:Ln(this,t,n)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var Bv=function t(n){function e(t){return new Un(t,n)}return e.tension=function(n){return t(+n)},e}(0);Dn.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},lineEnd:function(){(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3,this._line?this._context.lineTo(this._x2,this._y2):this._context.moveTo(this._x2,this._y2);break;case 3:this._point=4;default:Ln(this,t,n)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var jv=function t(n){function e(t){return new Dn(t,n)}return e.tension=function(n){return t(+n)},e}(0);Fn.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:this.point(this,this._x2,this._y2)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){if(t=+t,n=+n,this._point){var e=this._x2-t,r=this._y2-n;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(e*e+r*r,this._alpha))}switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;break;case 2:this._point=3;default:On(this,t,n)}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var Hv=function t(n){function e(t){return n?new Fn(t,n):new Rn(t,0)}return e.alpha=function(n){return t(+n)},e}(.5);In.prototype={areaStart:kn,areaEnd:kn,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._x5=this._y0=this._y1=this._y2=this._y3=this._y4=this._y5=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){switch(this._point){case 1:this._context.moveTo(this._x3,this._y3),this._context.closePath();break;case 2:this._context.lineTo(this._x3,this._y3),this._context.closePath();break;case 3:this.point(this._x3,this._y3),this.point(this._x4,this._y4),this.point(this._x5,this._y5)}},point:function(t,n){if(t=+t,n=+n,this._point){var e=this._x2-t,r=this._y2-n;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(e*e+r*r,this._alpha))}switch(this._point){case 0:this._point=1,this._x3=t,this._y3=n;break;case 1:this._point=2,this._context.moveTo(this._x4=t,this._y4=n);break;case 2:this._point=3,this._x5=t,this._y5=n;break;default:On(this,t,n)}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var Xv=function t(n){function e(t){return n?new In(t,n):new Un(t,0)}return e.alpha=function(n){return t(+n)},e}(.5);Yn.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){if(t=+t,n=+n,this._point){var e=this._x2-t,r=this._y2-n;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(e*e+r*r,this._alpha))}switch(this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3,this._line?this._context.lineTo(this._x2,this._y2):this._context.moveTo(this._x2,this._y2);break;case 3:this._point=4;default:On(this,t,n)}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var Vv=function t(n){function e(t){return n?new Yn(t,n):new Dn(t,0)}return e.alpha=function(n){return t(+n)},e}(.5);Bn.prototype={areaStart:kn,areaEnd:kn,lineStart:function(){this._point=0},lineEnd:function(){this._point&&this._context.closePath()},point:function(t,n){t=+t,n=+n,this._point?this._context.lineTo(t,n):(this._point=1,this._context.moveTo(t,n))}},$n.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=this._t0=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x1,this._y1);break;case 3:Wn(this,this._t0,Vn(this,this._t0))}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){var e=NaN;if(t=+t,n=+n,t!==this._x1||n!==this._y1){switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;break;case 2:this._point=3,Wn(this,Vn(this,e=Xn(this,t,n)),e);break;default:Wn(this,this._t0,e=Xn(this,t,n))}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=n,this._t0=e}}},(Zn.prototype=Object.create($n.prototype)).point=function(t,n){$n.prototype.point.call(this,n,t)},Gn.prototype={moveTo:function(t,n){this._context.moveTo(n,t)},closePath:function(){this._context.closePath()},lineTo:function(t,n){this._context.lineTo(n,t)},bezierCurveTo:function(t,n,e,r,i,o){this._context.bezierCurveTo(n,t,r,e,o,i)}},Kn.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x=[],this._y=[]},lineEnd:function(){var t=this._x,n=this._y,e=t.length;if(e)if(this._line?this._context.lineTo(t[0],n[0]):this._context.moveTo(t[0],n[0]),2===e)this._context.lineTo(t[1],n[1]);else for(var r=te(t),i=te(n),o=0,u=1;u<e;++o,++u)this._context.bezierCurveTo(r[0][o],i[0][o],r[1][o],i[1][o],t[u],n[u]);(this._line||0!==this._line&&1===e)&&this._context.closePath(),this._line=1-this._line,this._x=this._y=null},point:function(t,n){this._x.push(+t),this._y.push(+n)}},ee.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x=this._y=NaN,this._point=0},lineEnd:function(){0<this._t&&this._t<1&&2===this._point&&this._context.lineTo(this._x,this._y),(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line>=0&&(this._t=1-this._t,this._line=1-this._line)},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;default:if(this._t<=0)this._context.lineTo(this._x,n),this._context.lineTo(t,n);else{var e=this._x*(1-this._t)+t*this._t;this._context.lineTo(e,this._y),this._context.lineTo(e,n)}}this._x=t,this._y=n}};var Wv=Array.prototype.slice,$v=.7,Zv=1/$v,Gv=/^#([0-9a-f]{3})$/,Jv=/^#([0-9a-f]{6})$/,Qv=/^rgb\(\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*\)$/,Kv=/^rgb\(\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*\)$/,t_=/^rgba\(\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)$/,n_=/^rgba\(\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)$/,e_=/^hsl\(\s*([-+]?\d+(?:\.\d+)?)\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*\)$/,r_=/^hsla\(\s*([-+]?\d+(?:\.\d+)?)\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)$/,i_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};ge(xe,be,{displayable:function(){return this.rgb().displayable()},toString:function(){return this.rgb()+""}}),ge(Ne,ke,me(xe,{brighter:function(t){return t=null==t?Zv:Math.pow(Zv,t),new Ne(this.r*t,this.g*t,this.b*t,this.opacity)},darker:function(t){return t=null==t?$v:Math.pow($v,t),new Ne(this.r*t,this.g*t,this.b*t,this.opacity)},rgb:function(){return this},displayable:function(){return 0<=this.r&&this.r<=255&&0<=this.g&&this.g<=255&&0<=this.b&&this.b<=255&&0<=this.opacity&&this.opacity<=1},toString:function(){var t=this.opacity;return t=isNaN(t)?1:Math.max(0,Math.min(1,t)),(1===t?"rgb(":"rgba(")+Math.max(0,Math.min(255,Math.round(this.r)||0))+", "+Math.max(0,Math.min(255,Math.round(this.g)||0))+", "+Math.max(0,Math.min(255,Math.round(this.b)||0))+(1===t?")":", "+t+")")}})),ge(Ce,Ee,me(xe,{brighter:function(t){return t=null==t?Zv:Math.pow(Zv,t),new Ce(this.h,this.s,this.l*t,this.opacity)},darker:function(t){return t=null==t?$v:Math.pow($v,t),new Ce(this.h,this.s,this.l*t,this.opacity)},rgb:function(){var t=this.h%360+360*(this.h<0),n=isNaN(t)||isNaN(this.s)?0:this.s,e=this.l,r=e+(e<.5?e:1-e)*n,i=2*e-r;return new Ne(ze(t>=240?t-240:t+120,i,r),ze(t,i,r),ze(t<120?t+240:t-120,i,r),this.opacity)},displayable:function(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1}}));var o_=Math.PI/180,u_=180/Math.PI,a_=18,c_=.95047,s_=1,f_=1.08883,l_=4/29,h_=6/29,p_=3*h_*h_,d_=h_*h_*h_;ge(Le,qe,me(xe,{brighter:function(t){return new Le(this.l+a_*(null==t?1:t),this.a,this.b,this.opacity)},darker:function(t){return new Le(this.l-a_*(null==t?1:t),this.a,this.b,this.opacity)},rgb:function(){var t=(this.l+16)/116,n=isNaN(this.a)?t:t+this.a/500,e=isNaN(this.b)?t:t-this.b/200;return t=s_*Ue(t),n=c_*Ue(n),e=f_*Ue(e),new Ne(De(3.2404542*n-1.5371385*t-.4985314*e),De(-.969266*n+1.8760108*t+.041556*e),De(.0556434*n-.2040259*t+1.0572252*e),this.opacity)}})),ge(Ye,Ie,me(xe,{brighter:function(t){return new Ye(this.h,this.c,this.l+a_*(null==t?1:t),this.opacity)},darker:function(t){return new Ye(this.h,this.c,this.l-a_*(null==t?1:t),this.opacity)},rgb:function(){return Pe(this).rgb()}}));var v_=-.14861,__=1.78277,y_=-.29227,g_=-.90649,m_=1.97294,x_=m_*g_,b_=m_*__,w_=__*y_-g_*v_;ge(He,je,me(xe,{brighter:function(t){return t=null==t?Zv:Math.pow(Zv,t),new He(this.h,this.s,this.l*t,this.opacity)},darker:function(t){return t=null==t?$v:Math.pow($v,t),new He(this.h,this.s,this.l*t,this.opacity)},rgb:function(){var t=isNaN(this.h)?0:(this.h+120)*o_,n=+this.l,e=isNaN(this.s)?0:this.s*n*(1-n),r=Math.cos(t),i=Math.sin(t);return new Ne(255*(n+e*(v_*r+__*i)),255*(n+e*(y_*r+g_*i)),255*(n+e*(m_*r)),this.opacity)}}));var M_,T_,k_,N_,S_=function t(n){function e(t,n){var e=r((t=ke(t)).r,(n=ke(n)).r),i=r(t.g,n.g),o=r(t.b,n.b),u=r(t.opacity,n.opacity);return function(n){return t.r=e(n),t.g=i(n),t.b=o(n),t.opacity=u(n),t+""}}var r=Qe(n);return e.gamma=t,e}(1),A_=tr(Ve),E_=tr(We),C_=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,z_=new RegExp(C_.source,"g"),P_=180/Math.PI,q_={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1},L_=pr(lr,"px, ","px)","deg)"),R_=pr(hr,", ",")",")"),U_=Math.SQRT2,D_=2,O_=4,F_=1e-12,I_=gr(Je),Y_=gr(Ke),B_=xr(Je),j_=xr(Ke),H_=br(Je),X_=br(Ke),V_={value:function(){}};Tr.prototype=Mr.prototype={constructor:Tr,on:function(t,n){var e,r=this._,i=kr(t+"",r),o=-1,u=i.length;{if(!(arguments.length<2)){if(null!=n&&"function"!=typeof n)throw new Error("invalid callback: "+n);for(;++o<u;)if(e=(t=i[o]).type)r[e]=Sr(r[e],t.name,n);else if(null==n)for(e in r)r[e]=Sr(r[e],t.name,null);return this}for(;++o<u;)if((e=(t=i[o]).type)&&(e=Nr(r[e],t.name)))return e}},copy:function(){var t={},n=this._;for(var e in n)t[e]=n[e].slice();return new Tr(t)},call:function(t,n){if((e=arguments.length-2)>0)for(var e,r,i=new Array(e),o=0;o<e;++o)i[o]=arguments[o+2];if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(r=this._[t],o=0,e=r.length;o<e;++o)r[o].value.apply(n,i)},apply:function(t,n,e){if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(var r=this._[t],i=0,o=r.length;i<o;++i)r[i].value.apply(n,e)}};var W_,$_,Z_=zr(","),G_=Z_.parse,J_=Z_.parseRows,Q_=Z_.format,K_=Z_.formatRows,ty=zr("\t"),ny=ty.parse,ey=ty.parseRows,ry=ty.format,iy=ty.formatRows,oy=Rr("text/html",function(t){return document.createRange().createContextualFragment(t.responseText)}),uy=Rr("application/json",function(t){return JSON.parse(t.responseText)}),ay=Rr("text/plain",function(t){return t.responseText}),cy=Rr("application/xml",function(t){var n=t.responseXML;if(!n)throw new Error("parse error");return n}),sy=Ur("text/csv",G_),fy=Ur("text/tab-separated-values",ny),ly=0,hy=0,py=0,dy=1e3,vy=0,_y=0,yy=0,gy="object"==typeof performance&&performance.now?performance:Date,my="function"==typeof requestAnimationFrame?gy===Date?function(t){requestAnimationFrame(function(){t(gy.now())})}:requestAnimationFrame:function(t){setTimeout(t,17)};Ir.prototype=Yr.prototype={constructor:Ir,restart:function(t,n,e){if("function"!=typeof t)throw new TypeError("callback is not a function");e=(null==e?Or():+e)+(null==n?0:+n),this._next||$_===this||($_?$_._next=this:W_=this,$_=this),this._call=t,this._time=e,Vr()},stop:function(){this._call&&(this._call=null,this._time=1/0,Vr())}};var xy=new Date,by=new Date,wy=Zr(function(){},function(t,n){t.setTime(+t+n)},function(t,n){return n-t});wy.every=function(t){return t=Math.floor(t),isFinite(t)&&t>0?t>1?Zr(function(n){n.setTime(Math.floor(n/t)*t)},function(n,e){n.setTime(+n+e*t)},function(n,e){return(e-n)/t}):wy:null};var My=wy.range,Ty=1e3,ky=6e4,Ny=36e5,Sy=864e5,Ay=6048e5,Ey=Zr(function(t){t.setTime(Math.floor(t/Ty)*Ty)},function(t,n){t.setTime(+t+n*Ty)},function(t,n){return(n-t)/Ty},function(t){return t.getUTCSeconds()}),Cy=Ey.range,zy=Zr(function(t){t.setTime(Math.floor(t/ky)*ky)},function(t,n){t.setTime(+t+n*ky)},function(t,n){return(n-t)/ky},function(t){return t.getMinutes()}),Py=zy.range,qy=Zr(function(t){var n=t.getTimezoneOffset()*ky%Ny;n<0&&(n+=Ny),t.setTime(Math.floor((+t-n)/Ny)*Ny+n)},function(t,n){t.setTime(+t+n*Ny)},function(t,n){return(n-t)/Ny},function(t){return t.getHours()}),Ly=qy.range,Ry=Zr(function(t){t.setHours(0,0,0,0)},function(t,n){t.setDate(t.getDate()+n)},function(t,n){return(n-t-(n.getTimezoneOffset()-t.getTimezoneOffset())*ky)/Sy},function(t){return t.getDate()-1}),Uy=Ry.range,Dy=Gr(0),Oy=Gr(1),Fy=Gr(2),Iy=Gr(3),Yy=Gr(4),By=Gr(5),jy=Gr(6),Hy=Dy.range,Xy=Oy.range,Vy=Fy.range,Wy=Iy.range,$y=Yy.range,Zy=By.range,Gy=jy.range,Jy=Zr(function(t){t.setDate(1),t.setHours(0,0,0,0)},function(t,n){t.setMonth(t.getMonth()+n)},function(t,n){return n.getMonth()-t.getMonth()+12*(n.getFullYear()-t.getFullYear())},function(t){return t.getMonth()}),Qy=Jy.range,Ky=Zr(function(t){t.setMonth(0,1),t.setHours(0,0,0,0)},function(t,n){t.setFullYear(t.getFullYear()+n)},function(t,n){return n.getFullYear()-t.getFullYear()},function(t){return t.getFullYear()});Ky.every=function(t){return isFinite(t=Math.floor(t))&&t>0?Zr(function(n){n.setFullYear(Math.floor(n.getFullYear()/t)*t),n.setMonth(0,1),n.setHours(0,0,0,0)},function(n,e){n.setFullYear(n.getFullYear()+e*t)}):null};var tg=Ky.range,ng=Zr(function(t){t.setUTCSeconds(0,0)},function(t,n){t.setTime(+t+n*ky)},function(t,n){return(n-t)/ky},function(t){return t.getUTCMinutes()}),eg=ng.range,rg=Zr(function(t){t.setUTCMinutes(0,0,0)},function(t,n){t.setTime(+t+n*Ny)},function(t,n){return(n-t)/Ny},function(t){return t.getUTCHours()}),ig=rg.range,og=Zr(function(t){t.setUTCHours(0,0,0,0)},function(t,n){t.setUTCDate(t.getUTCDate()+n)},function(t,n){return(n-t)/Sy},function(t){return t.getUTCDate()-1}),ug=og.range,ag=Jr(0),cg=Jr(1),sg=Jr(2),fg=Jr(3),lg=Jr(4),hg=Jr(5),pg=Jr(6),dg=ag.range,vg=cg.range,_g=sg.range,yg=fg.range,gg=lg.range,mg=hg.range,xg=pg.range,bg=Zr(function(t){t.setUTCDate(1),t.setUTCHours(0,0,0,0)},function(t,n){t.setUTCMonth(t.getUTCMonth()+n)},function(t,n){return n.getUTCMonth()-t.getUTCMonth()+12*(n.getUTCFullYear()-t.getUTCFullYear())},function(t){return t.getUTCMonth()}),wg=bg.range,Mg=Zr(function(t){t.setUTCMonth(0,1),t.setUTCHours(0,0,0,0)},function(t,n){t.setUTCFullYear(t.getUTCFullYear()+n)},function(t,n){return n.getUTCFullYear()-t.getUTCFullYear()},function(t){return t.getUTCFullYear()});Mg.every=function(t){return isFinite(t=Math.floor(t))&&t>0?Zr(function(n){n.setUTCFullYear(Math.floor(n.getUTCFullYear()/t)*t),n.setUTCMonth(0,1),n.setUTCHours(0,0,0,0)},function(n,e){n.setUTCFullYear(n.getUTCFullYear()+e*t)}):null};var Tg,kg=Mg.range,Ng={"":ni,"%":function(t,n){return(100*t).toFixed(n)},b:function(t){return Math.round(t).toString(2)},c:function(t){return t+""},d:function(t){return Math.round(t).toString(10)},e:function(t,n){return t.toExponential(n)},f:function(t,n){return t.toFixed(n)},g:function(t,n){return t.toPrecision(n)},o:function(t){return Math.round(t).toString(8)},p:function(t,n){return ri(100*t,n)},r:ri,s:ei,X:function(t){return Math.round(t).toString(16).toUpperCase()},x:function(t){return Math.round(t).toString(16)}},Sg=/^(?:(.)?([<>=^]))?([+\-\( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?([a-z%])?$/i;oi.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(null==this.width?"":Math.max(1,0|this.width))+(this.comma?",":"")+(null==this.precision?"":"."+Math.max(0,0|this.precision))+this.type};var Ag,Eg=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];t.format,t.formatPrefix,ci({decimal:".",thousands:",",grouping:[3],currency:["$",""]});var Cg,zg={"-":"",_:" ",0:"0"},Pg=/^\s*\d+/,qg=/^%/,Lg=/[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;t.timeFormat,t.timeParse,t.utcFormat,t.utcParse,so({dateTime:"%x, %X",date:"%-m/%-d/%Y",time:"%-I:%M:%S %p",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]});var Rg="%Y-%m-%dT%H:%M:%S.%LZ",Ug=Date.prototype.toISOString?fo:t.utcFormat(Rg),Dg=+new Date("2000-01-01T00:00:00.000Z")?lo:t.utcParse(Rg),Og=Array.prototype,Fg=Og.map,Ig=Og.slice,Yg={name:"implicit"},Bg=[0,1],jg=1e3,Hg=60*jg,Xg=60*Hg,Vg=24*Xg,Wg=7*Vg,$g=30*Vg,Zg=365*Vg,Gg=Zo("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf"),Jg=Zo("393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6"),Qg=Zo("3182bd6baed69ecae1c6dbefe6550dfd8d3cfdae6bfdd0a231a35474c476a1d99bc7e9c0756bb19e9ac8bcbddcdadaeb636363969696bdbdbdd9d9d9"),Kg=Zo("1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5"),tm=X_(je(300,.5,0),je(-240,.5,1)),nm=X_(je(-100,.75,.35),je(80,1.5,.8)),em=X_(je(260,.75,.35),je(80,1.5,.8)),rm=je(),im=Jo(Zo("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725")),om=Jo(Zo("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf")),um=Jo(Zo("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4")),am=Jo(Zo("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921")),cm="http://www.w3.org/1999/xhtml",sm={
svg:"http://www.w3.org/2000/svg",xhtml:cm,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"},fm=0;iu.prototype=ru.prototype={constructor:iu,get:function(t){for(var n=this._;!(n in t);)if(!(t=t.parentNode))return;return t[n]},set:function(t,n){return t[this._]=n},remove:function(t){return this._ in t&&delete t[this._]},toString:function(){return this._}};var lm=function(t){return function(){return this.matches(t)}};if("undefined"!=typeof document){var hm=document.documentElement;if(!hm.matches){var pm=hm.webkitMatchesSelector||hm.msMatchesSelector||hm.mozMatchesSelector||hm.oMatchesSelector;lm=function(t){return function(){return pm.call(this,t)}}}}var dm=lm,vm={};if(t.event=null,"undefined"!=typeof document){var _m=document.documentElement;"onmouseenter"in _m||(vm={mouseenter:"mouseover",mouseleave:"mouseout"})}Tu.prototype={constructor:Tu,appendChild:function(t){return this._parent.insertBefore(t,this._next)},insertBefore:function(t,n){return this._parent.insertBefore(t,n)},querySelector:function(t){return this._parent.querySelector(t)},querySelectorAll:function(t){return this._parent.querySelectorAll(t)}};var ym="$";ia.prototype={add:function(t){var n=this._names.indexOf(t);n<0&&(this._names.push(t),this._node.setAttribute("class",this._names.join(" ")))},remove:function(t){var n=this._names.indexOf(t);n>=0&&(this._names.splice(n,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(t){return this._names.indexOf(t)>=0}};var gm=[null];qa.prototype=La.prototype={constructor:qa,select:yu,selectAll:xu,filter:bu,data:Au,enter:Mu,exit:Eu,merge:Cu,order:zu,sort:Pu,call:Lu,nodes:Ru,node:Uu,size:Du,empty:Ou,each:Fu,attr:Vu,style:Ju,property:na,classed:fa,text:da,html:ga,raise:xa,lower:wa,append:Ma,insert:ka,remove:Sa,datum:Aa,on:fu,dispatch:Pa};var mm=Mr("start","end","interrupt"),xm=[],bm=0,wm=1,Mm=2,Tm=3,km=4,Nm=5,Sm=La.prototype.constructor,Am=0,Em=La.prototype;Uc.prototype=Dc.prototype={constructor:Uc,select:wc,selectAll:Mc,filter:vc,merge:_c,selection:Tc,transition:Rc,call:Em.call,nodes:Em.nodes,node:Em.node,size:Em.size,empty:Em.empty,each:Em.each,on:mc,attr:rc,attrTween:uc,style:Ec,styleTween:zc,text:Lc,remove:bc,tween:$a,delay:sc,duration:hc,ease:dc};var Cm={time:null,delay:0,duration:250,ease:et};La.prototype.interrupt=Xa,La.prototype.transition=Ic;var zm=[null],Pm=Array.prototype.slice,qm=1,Lm=2,Rm=3,Um=4,Dm=1e-6;ws.prototype=ys.prototype={constructor:ws,each:us,eachAfter:cs,eachBefore:as,sum:ss,sort:fs,path:ls,ancestors:ps,descendants:ds,leaves:vs,links:_s,copy:gs};var Om="$",Fm={depth:-1},Im={};of.prototype=Object.create(ws.prototype);var Ym=(1+Math.sqrt(5))/2,Bm=function t(n){function e(t,e,r,i,o){sf(n,t,e,r,i,o)}return e.ratio=function(n){return t((n=+n)>1?n:1)},e}(Ym),jm=function t(n){function e(t,e,r,i,o){if((u=t._squarify)&&u.ratio===n)for(var u,a,c,s,f,l=-1,h=u.length,p=t.value;++l<h;){for(a=u[l],c=a.children,s=a.value=0,f=c.length;s<f;++s)a.value+=c[s].value;a.dice?Ws(a,e,r,i,r+=(o-r)*a.value/p):cf(a,e,r,e+=(i-e)*a.value/p,o),p-=a.value}else t._squarify=u=sf(n,t,e,r,i,o),u.ratio=n}return e.ratio=function(n){return t((n=+n)>1?n:1)},e}(Ym),Hm=10,Xm=Math.PI*(3-Math.sqrt(5));Pf.prototype.on=function(){var t=this._.on.apply(this._,arguments);return t===this._?this:t},If.prototype={constructor:If,insert:function(t,n){var e,r,i;if(t){if(n.P=t,n.N=t.N,t.N&&(t.N.P=n),t.N=n,t.R){for(t=t.R;t.L;)t=t.L;t.L=n}else t.R=n;e=t}else this._?(t=Hf(this._),n.P=null,n.N=t,t.P=t.L=n,e=t):(n.P=n.N=null,this._=n,e=null);for(n.L=n.R=null,n.U=e,n.C=!0,t=n;e&&e.C;)r=e.U,e===r.L?(i=r.R,i&&i.C?(e.C=i.C=!1,r.C=!0,t=r):(t===e.R&&(Bf(this,e),t=e,e=t.U),e.C=!1,r.C=!0,jf(this,r))):(i=r.L,i&&i.C?(e.C=i.C=!1,r.C=!0,t=r):(t===e.L&&(jf(this,e),t=e,e=t.U),e.C=!1,r.C=!0,Bf(this,r))),e=t.U;this._.C=!1},remove:function(t){t.N&&(t.N.P=t.P),t.P&&(t.P.N=t.N),t.N=t.P=null;var n,e,r,i=t.U,o=t.L,u=t.R;if(e=o?u?Hf(u):o:u,i?i.L===t?i.L=e:i.R=e:this._=e,o&&u?(r=e.C,e.C=t.C,e.L=o,o.U=e,e!==u?(i=e.U,e.U=t.U,t=e.R,i.L=t,e.R=u,u.U=e):(e.U=i,i=e,t=e.R)):(r=t.C,t=e),t&&(t.U=i),!r){if(t&&t.C)return void(t.C=!1);do{if(t===this._)break;if(t===i.L){if(n=i.R,n.C&&(n.C=!1,i.C=!0,Bf(this,i),n=i.R),n.L&&n.L.C||n.R&&n.R.C){n.R&&n.R.C||(n.L.C=!1,n.C=!0,jf(this,n),n=i.R),n.C=i.C,i.C=n.R.C=!1,Bf(this,i),t=this._;break}}else if(n=i.L,n.C&&(n.C=!1,i.C=!0,jf(this,i),n=i.L),n.L&&n.L.C||n.R&&n.R.C){n.L&&n.L.C||(n.R.C=!1,n.C=!0,Bf(this,n),n=i.L),n.C=i.C,i.C=n.L.C=!1,jf(this,i),t=this._;break}n.C=!0,t=i,i=i.U}while(!t.C);t&&(t.C=!1)}}};var Vm,Wm,$m,Zm,Gm,Jm=[],Qm=[],Km=1e-6,tx=1e-12;vl.prototype={constructor:vl,polygons:function(){var t=this.edges;return this.cells.map(function(n){var e=n.halfedges.map(function(e){return Kf(n,t[e])});return e.data=n.site.data,e})},triangles:function(){var t=[],n=this.edges;return this.cells.forEach(function(e,r){for(var i,o=e.site,u=e.halfedges,a=-1,c=u.length,s=n[u[c-1]],f=s.left===o?s.right:s.left;++a<c;)i=f,s=n[u[a]],f=s.left===o?s.right:s.left,r<i.index&&r<f.index&&pl(o,i,f)<0&&t.push([o.data,i.data,f.data])}),t},links:function(){return this.edges.filter(function(t){return t.right}).map(function(t){return{source:t.left.data,target:t.right.data}})}},ml.prototype={constructor:ml,scale:function(t){return 1===t?this:new ml(this.k*t,this.x,this.y)},translate:function(t,n){return 0===t&0===n?this:new ml(this.k,this.x+this.k*t,this.y+this.k*n)},apply:function(t){return[t[0]*this.k+this.x,t[1]*this.k+this.y]},applyX:function(t){return t*this.k+this.x},applyY:function(t){return t*this.k+this.y},invert:function(t){return[(t[0]-this.x)/this.k,(t[1]-this.y)/this.k]},invertX:function(t){return(t-this.x)/this.k},invertY:function(t){return(t-this.y)/this.k},rescaleX:function(t){return t.copy().domain(t.range().map(this.invertX,this).map(t.invert,t))},rescaleY:function(t){return t.copy().domain(t.range().map(this.invertY,this).map(t.invert,t))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};var nx=new ml(1,0,0);xl.prototype=ml.prototype;var ex={name:"drag"},rx={name:"space"},ix={name:"handle"},ox={name:"center"},ux={name:"x",handles:["e","w"].map(zl),input:function(t,n){return t&&[[t[0],n[0][1]],[t[1],n[1][1]]]},output:function(t){return t&&[t[0][0],t[1][0]]}},ax={name:"y",handles:["n","s"].map(zl),input:function(t,n){return t&&[[n[0][0],t[0]],[n[1][0],t[1]]]},output:function(t){return t&&[t[0][1],t[1][1]]}},cx={name:"xy",handles:["n","e","s","w","nw","ne","se","sw"].map(zl),input:function(t){return t},output:function(t){return t}},sx={overlay:"crosshair",selection:"move",n:"ns-resize",e:"ew-resize",s:"ns-resize",w:"ew-resize",nw:"nwse-resize",ne:"nesw-resize",se:"nwse-resize",sw:"nesw-resize"},fx={e:"w",w:"e",nw:"ne",ne:"nw",se:"sw",sw:"se"},lx={n:"s",s:"n",nw:"sw",ne:"se",se:"ne",sw:"nw"},hx={overlay:1,selection:1,n:null,e:1,s:null,w:-1,nw:-1,ne:1,se:1,sw:-1},px={overlay:1,selection:1,n:-1,e:null,s:1,w:null,nw:-1,ne:-1,se:1,sw:1},dx=Math.cos,vx=Math.sin,_x=Math.PI,yx=_x/2,gx=2*_x,mx=Math.max,xx=Array.prototype.slice;Jl.prototype={constructor:Jl,reset:function(){this.s=this.t=0},add:function(t){Ql(nb,t,this.t),Ql(this,nb.s,this.s),this.s?this.t+=nb.t:this.s=nb.t},valueOf:function(){return this.s}};var bx,wx,Mx,Tx,kx,Nx,Sx,Ax,Ex,Cx,zx,Px,qx,Lx,Rx,Ux,Dx,Ox,Fx,Ix,Yx,Bx,jx,Hx,Xx,Vx,Wx,$x,Zx,Gx,Jx,Qx,Kx,tb,nb=new Jl,eb=1e-6,rb=1e-12,ib=Math.PI,ob=ib/2,ub=ib/4,ab=2*ib,cb=180/ib,sb=ib/180,fb=Math.abs,lb=Math.atan,hb=Math.atan2,pb=Math.cos,db=Math.ceil,vb=Math.exp,_b=Math.log,yb=Math.pow,gb=Math.sin,mb=Math.sign||function(t){return t>0?1:t<0?-1:0},xb=Math.sqrt,bb=Math.tan,wb={Feature:function(t,n){rh(t.geometry,n)},FeatureCollection:function(t,n){for(var e=t.features,r=-1,i=e.length;++r<i;)rh(e[r].geometry,n)}},Mb={Sphere:function(t,n){n.sphere()},Point:function(t,n){t=t.coordinates,n.point(t[0],t[1],t[2])},MultiPoint:function(t,n){for(var e=t.coordinates,r=-1,i=e.length;++r<i;)t=e[r],n.point(t[0],t[1],t[2])},LineString:function(t,n){ih(t.coordinates,n,0)},MultiLineString:function(t,n){for(var e=t.coordinates,r=-1,i=e.length;++r<i;)ih(e[r],n,0)},Polygon:function(t,n){oh(t.coordinates,n)},MultiPolygon:function(t,n){for(var e=t.coordinates,r=-1,i=e.length;++r<i;)oh(e[r],n)},GeometryCollection:function(t,n){for(var e=t.geometries,r=-1,i=e.length;++r<i;)rh(e[r],n)}},Tb={point:eh,lineStart:eh,lineEnd:eh,polygonStart:function(){bx.reset(),Tb.lineStart=ah,Tb.lineEnd=ch},polygonEnd:function(){var t=+bx;wx.add(t<0?ab+t:t),this.lineStart=this.lineEnd=this.point=eh},sphere:function(){wx.add(ab)}},kb={point:mh,lineStart:bh,lineEnd:wh,polygonStart:function(){kb.point=Mh,kb.lineStart=Th,kb.lineEnd=kh,Ux.reset(),Tb.polygonStart()},polygonEnd:function(){Tb.polygonEnd(),kb.point=mh,kb.lineStart=bh,kb.lineEnd=wh,bx<0?(Ax=-(Cx=180),Ex=-(zx=90)):Ux>eb?zx=90:Ux<-eb&&(Ex=-90),Ox[0]=Ax,Ox[1]=Cx}},Nb={sphere:eh,point:Ch,lineStart:Ph,lineEnd:Rh,polygonStart:function(){Nb.lineStart=Uh,Nb.lineEnd=Dh},polygonEnd:function(){Nb.lineStart=Ph,Nb.lineEnd=Rh}};jh.invert=jh;var Sb,Ab,Eb,Cb,zb,Pb,qb,Lb,Rb,Ub,Db,Ob,Fb=1e9,Ib=-Fb,Yb={sphere:eh,point:eh,lineStart:up,lineEnd:eh,polygonStart:eh,polygonEnd:eh},Bb=[null,null],jb={type:"LineString",coordinates:Bb},Hb=Gl(),Xb=Gl(),Vb={point:eh,lineStart:eh,lineEnd:eh,polygonStart:function(){Vb.lineStart=yp,Vb.lineEnd=xp},polygonEnd:function(){Vb.lineStart=Vb.lineEnd=Vb.point=eh,Hb.add(fb(Xb)),Xb.reset()},result:function(){var t=Hb/2;return Hb.reset(),t}},Wb=1/0,$b=Wb,Zb=-Wb,Gb=Zb,Jb={point:bp,lineStart:eh,lineEnd:eh,polygonStart:eh,polygonEnd:eh,result:function(){var t=[[Wb,$b],[Zb,Gb]];return Zb=Gb=-($b=Wb=1/0),t}},Qb=0,Kb=0,tw=0,nw=0,ew=0,rw=0,iw=0,ow=0,uw=0,aw={point:wp,lineStart:Mp,lineEnd:Np,polygonStart:function(){aw.lineStart=Sp,aw.lineEnd=Ap},polygonEnd:function(){aw.point=wp,aw.lineStart=Mp,aw.lineEnd=Np},result:function(){var t=uw?[iw/uw,ow/uw]:rw?[nw/rw,ew/rw]:tw?[Qb/tw,Kb/tw]:[NaN,NaN];return Qb=Kb=tw=nw=ew=rw=iw=ow=uw=0,t}},cw=Gl(),sw=Up(function(){return!0},Fp,Yp,[-ib,-ob]);Xp.prototype={point:function(t,n){this.stream.point(t,n)},sphere:function(){this.stream.sphere()},lineStart:function(){this.stream.lineStart()},lineEnd:function(){this.stream.lineEnd()},polygonStart:function(){this.stream.polygonStart()},polygonEnd:function(){this.stream.polygonEnd()}};var fw=16,lw=pb(30*sb),hw=Hp({point:function(t,n){this.stream.point(t*sb,n*sb)}}),pw=rd(function(t){return xb(2/(1+t))});pw.invert=id(function(t){return 2*th(t/2)});var dw=rd(function(t){return(t=Kl(t))&&t/gb(t)});dw.invert=id(function(t){return t}),ad.invert=function(t,n){return[t,2*lb(vb(n))-ob]},pd.invert=pd,yd.invert=id(lb),md.invert=id(th),bd.invert=id(function(t){return 2+lb(t)}),Md.invert=function(t,n){return[-n,2*lb(vb(t))-ob]},t.version=kd,t.bisect=Sd,t.bisectRight=Sd,t.bisectLeft=Ad,t.ascending=n,t.bisector=e,t.descending=i,t.deviation=a,t.extent=c,t.histogram=v,t.thresholdFreedmanDiaconis=y,t.thresholdScott=g,t.thresholdSturges=d,t.max=m,t.mean=x,t.median=b,t.merge=w,t.min=M,t.pairs=T,t.permute=k,t.quantile=_,t.range=l,t.scan=N,t.shuffle=S,t.sum=A,t.ticks=h,t.tickStep=p,t.transpose=E,t.variance=u,t.zip=z,t.entries=j,t.keys=Y,t.values=B,t.map=q,t.set=I,t.nest=L,t.randomUniform=H,t.randomNormal=X,t.randomLogNormal=V,t.randomBates=$,t.randomIrwinHall=W,t.randomExponential=Z,t.easeLinear=G,t.easeQuad=K,t.easeQuadIn=J,t.easeQuadOut=Q,t.easeQuadInOut=K,t.easeCubic=et,t.easeCubicIn=tt,t.easeCubicOut=nt,t.easeCubicInOut=et,t.easePoly=Id,t.easePolyIn=Od,t.easePolyOut=Fd,t.easePolyInOut=Id,t.easeSin=ot,t.easeSinIn=rt,t.easeSinOut=it,t.easeSinInOut=ot,t.easeExp=ct,t.easeExpIn=ut,t.easeExpOut=at,t.easeExpInOut=ct,t.easeCircle=lt,t.easeCircleIn=st,t.easeCircleOut=ft,t.easeCircleInOut=lt,t.easeBounce=pt,t.easeBounceIn=ht,t.easeBounceOut=pt,t.easeBounceInOut=dt,t.easeBack=ev,t.easeBackIn=tv,t.easeBackOut=nv,t.easeBackInOut=ev,t.easeElastic=av,t.easeElasticIn=uv,t.easeElasticOut=av,t.easeElasticInOut=cv,t.polygonArea=vt,t.polygonCentroid=_t,t.polygonHull=xt,t.polygonContains=bt,t.polygonLength=wt,t.path=Tt,t.quadtree=jt,t.queue=Qt,t.arc=sn,t.area=vn,t.line=dn,t.pie=gn,t.radialArea=Mn,t.radialLine=wn,t.symbol=Tn,t.symbols=Fv,t.symbolCircle=bv,t.symbolCross=wv,t.symbolDiamond=kv,t.symbolSquare=zv,t.symbolStar=Cv,t.symbolTriangle=qv,t.symbolWye=Ov,t.curveBasisClosed=Cn,t.curveBasisOpen=Pn,t.curveBasis=An,t.curveBundle=Iv,t.curveCardinalClosed=Bv,t.curveCardinalOpen=jv,t.curveCardinal=Yv,t.curveCatmullRomClosed=Xv,t.curveCatmullRomOpen=Vv,t.curveCatmullRom=Hv,t.curveLinearClosed=jn,t.curveLinear=ln,t.curveMonotoneX=Jn,t.curveMonotoneY=Qn,t.curveNatural=ne,t.curveStep=re,t.curveStepAfter=oe,t.curveStepBefore=ie,t.stack=se,t.stackOffsetExpand=fe,t.stackOffsetNone=ue,t.stackOffsetSilhouette=le,t.stackOffsetWiggle=he,t.stackOrderAscending=pe,t.stackOrderDescending=ve,t.stackOrderInsideOut=_e,t.stackOrderNone=ae,t.stackOrderReverse=ye,t.color=be,t.rgb=ke,t.hsl=Ee,t.lab=qe,t.hcl=Ie,t.cubehelix=je,t.interpolate=cr,t.interpolateArray=nr,t.interpolateDate=er,t.interpolateNumber=rr,t.interpolateObject=ir,t.interpolateRound=sr,t.interpolateString=ar,t.interpolateTransformCss=L_,t.interpolateTransformSvg=R_,t.interpolateZoom=yr,t.interpolateRgb=S_,t.interpolateRgbBasis=A_,t.interpolateRgbBasisClosed=E_,t.interpolateHsl=I_,t.interpolateHslLong=Y_,t.interpolateLab=mr,t.interpolateHcl=B_,t.interpolateHclLong=j_,t.interpolateCubehelix=H_,t.interpolateCubehelixLong=X_,t.interpolateBasis=Ve,t.interpolateBasisClosed=We,t.quantize=wr,t.dispatch=Mr,t.dsvFormat=zr,t.csvParse=G_,t.csvParseRows=J_,t.csvFormat=Q_,t.csvFormatRows=K_,t.tsvParse=ny,t.tsvParseRows=ey,t.tsvFormat=ry,t.tsvFormatRows=iy,t.request=Pr,t.html=oy,t.json=uy,t.text=ay,t.xml=cy,t.csv=sy,t.tsv=fy,t.now=Or,t.timer=Yr,t.timerFlush=Br,t.timeout=Wr,t.interval=$r,t.timeInterval=Zr,t.timeMillisecond=wy,t.timeMilliseconds=My,t.timeSecond=Ey,t.timeSeconds=Cy,t.timeMinute=zy,t.timeMinutes=Py,t.timeHour=qy,t.timeHours=Ly,t.timeDay=Ry,t.timeDays=Uy,t.timeWeek=Dy;t.timeWeeks=Hy;t.timeSunday=Dy,t.timeSundays=Hy,t.timeMonday=Oy,t.timeMondays=Xy,t.timeTuesday=Fy,t.timeTuesdays=Vy,t.timeWednesday=Iy,t.timeWednesdays=Wy,t.timeThursday=Yy,t.timeThursdays=$y,t.timeFriday=By,t.timeFridays=Zy,t.timeSaturday=jy,t.timeSaturdays=Gy,t.timeMonth=Jy,t.timeMonths=Qy,t.timeYear=Ky,t.timeYears=tg,t.utcMillisecond=wy,t.utcMilliseconds=My,t.utcSecond=Ey,t.utcSeconds=Cy,t.utcMinute=ng,t.utcMinutes=eg,t.utcHour=rg,t.utcHours=ig,t.utcDay=og,t.utcDays=ug,t.utcWeek=ag,t.utcWeeks=dg,t.utcSunday=ag,t.utcSundays=dg,t.utcMonday=cg,t.utcMondays=vg,t.utcTuesday=sg,t.utcTuesdays=_g,t.utcWednesday=fg,t.utcWednesdays=yg,t.utcThursday=lg,t.utcThursdays=gg,t.utcFriday=hg,t.utcFridays=mg,t.utcSaturday=pg,t.utcSaturdays=xg,t.utcMonth=bg,t.utcMonths=wg,t.utcYear=Mg,t.utcYears=kg,t.formatLocale=ai,t.formatDefaultLocale=ci,t.formatSpecifier=ii,t.precisionFixed=si,t.precisionPrefix=fi,t.precisionRound=li,t.isoFormat=Ug,t.isoParse=Dg,t.timeFormatLocale=vi,t.timeFormatDefaultLocale=so,t.scaleBand=po,t.scalePoint=_o,t.scaleIdentity=Eo,t.scaleLinear=Ao,t.scaleLog=Do,t.scaleOrdinal=ho,t.scaleImplicit=Yg,t.scalePow=Fo,t.scaleSqrt=Io,t.scaleQuantile=Yo,t.scaleQuantize=Bo,t.scaleThreshold=jo,t.scaleTime=Wo,t.scaleUtc=$o,t.schemeCategory10=Gg,t.schemeCategory20b=Jg,t.schemeCategory20c=Qg,t.schemeCategory20=Kg,t.scaleSequential=Qo,t.interpolateCubehelixDefault=tm,t.interpolateRainbow=Go,t.interpolateWarm=nm,t.interpolateCool=em,t.interpolateViridis=im,t.interpolateMagma=om,t.interpolateInferno=um,t.interpolatePlasma=am,t.creator=eu,t.customEvent=lu,t.local=ru,t.matcher=dm,t.mouse=du,t.namespace=Ko,t.namespaces=sm,t.select=Ra,t.selectAll=Ua,t.selection=La,t.selector=_u,t.selectorAll=mu,t.touch=Da,t.touches=Oa,t.window=Wu,t.active=Yc,t.interrupt=Ha,t.transition=Dc,t.axisTop=$c,t.axisRight=Zc,t.axisBottom=Gc,t.axisLeft=Jc,t.cluster=os,t.hierarchy=ys,t.pack=Bs,t.packSiblings=Us,t.packEnclose=ks,t.partition=$s,t.stratify=Js,t.tree=af,t.treemap=ff,t.treemapBinary=lf,t.treemapDice=Ws,t.treemapSlice=cf,t.treemapSliceDice=hf,t.treemapSquarify=Bm,t.treemapResquarify=jm,t.forceCenter=pf,t.forceCollide=gf,t.forceLink=xf,t.forceManyBody=Tf,t.forceSimulation=Mf,t.forceX=kf,t.forceY=Nf,t.drag=Uf,t.dragDisable=Ef,t.dragEnable=Cf,t.voronoi=_l,t.zoom=Nl,t.zoomIdentity=nx,t.zoomTransform=xl,t.brush=Fl,t.brushX=Dl,t.brushY=Ol,t.brushSelection=Ul,t.chord=Bl,t.ribbon=Zl,t.geoAlbers=td,t.geoAlbersUsa=ed,t.geoArea=lh,t.geoAzimuthalEqualArea=od,t.geoAzimuthalEqualAreaRaw=pw,t.geoAzimuthalEquidistant=ud,t.geoAzimuthalEquidistantRaw=dw,t.geoBounds=Eh,t.geoCentroid=Ih,t.geoCircle=Jh,t.geoClipExtent=op,t.geoConicConformal=hd,t.geoConicConformalRaw=ld,t.geoConicEqualArea=Kp,t.geoConicEqualAreaRaw=Qp,t.geoConicEquidistant=_d,t.geoConicEquidistantRaw=vd,t.geoDistance=lp,t.geoEquirectangular=dd,t.geoEquirectangularRaw=pd,t.geoGnomonic=gd,t.geoGnomonicRaw=yd,t.geoGraticule=dp,t.geoInterpolate=vp,t.geoLength=fp,t.geoMercator=cd,t.geoMercatorRaw=ad,t.geoOrthographic=xd,t.geoOrthographicRaw=md,t.geoPath=Lp,t.geoProjection=Zp,t.geoProjectionMutator=Gp,t.geoRotation=$h,t.geoStereographic=wd,t.geoStereographicRaw=bd,t.geoStream=uh,t.geoTransform=jp,t.geoTransverseMercator=Td,t.geoTransverseMercatorRaw=Md,Object.defineProperty(t,"__esModule",{value:!0})});
},{}],4:[function(require,module,exports){
/*! jQuery v1.11.3 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l="1.11.3",m=function(a,b){return new m.fn.init(a,b)},n=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,o=/^-ms-/,p=/-([\da-z])/gi,q=function(a,b){return b.toUpperCase()};m.fn=m.prototype={jquery:l,constructor:m,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=m.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return m.each(this,a,b)},map:function(a){return this.pushStack(m.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},m.extend=m.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||m.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(e=arguments[h]))for(d in e)a=g[d],c=e[d],g!==c&&(j&&c&&(m.isPlainObject(c)||(b=m.isArray(c)))?(b?(b=!1,f=a&&m.isArray(a)?a:[]):f=a&&m.isPlainObject(a)?a:{},g[d]=m.extend(j,f,c)):void 0!==c&&(g[d]=c));return g},m.extend({expando:"jQuery"+(l+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===m.type(a)},isArray:Array.isArray||function(a){return"array"===m.type(a)},isWindow:function(a){return null!=a&&a==a.window},isNumeric:function(a){return!m.isArray(a)&&a-parseFloat(a)+1>=0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},isPlainObject:function(a){var b;if(!a||"object"!==m.type(a)||a.nodeType||m.isWindow(a))return!1;try{if(a.constructor&&!j.call(a,"constructor")&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}if(k.ownLast)for(b in a)return j.call(a,b);for(b in a);return void 0===b||j.call(a,b)},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(b){b&&m.trim(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(o,"ms-").replace(p,q)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=r(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(n,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(r(Object(a))?m.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){var d;if(b){if(g)return g.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,b){var c=+b.length,d=0,e=a.length;while(c>d)a[e++]=b[d++];if(c!==c)while(void 0!==b[d])a[e++]=b[d++];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=r(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(f=a[b],b=a,a=f),m.isFunction(a)?(c=d.call(arguments,2),e=function(){return a.apply(b||this,c.concat(d.call(arguments)))},e.guid=a.guid=a.guid||m.guid++,e):void 0},now:function(){return+new Date},support:k}),m.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function r(a){var b="length"in a&&a.length,c=m.type(a);return"function"===c||m.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var s=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ha(),z=ha(),A=ha(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N=M.replace("w","w#"),O="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+N+"))|)"+L+"*\\]",P=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+O+")*)|.*)\\)|)",Q=new RegExp(L+"+","g"),R=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),S=new RegExp("^"+L+"*,"+L+"*"),T=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),U=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),V=new RegExp(P),W=new RegExp("^"+N+"$"),X={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+O),PSEUDO:new RegExp("^"+P),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,aa=/[+~]/,ba=/'|\\/g,ca=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),da=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},ea=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(fa){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function ga(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],k=b.nodeType,"string"!=typeof a||!a||1!==k&&9!==k&&11!==k)return d;if(!e&&p){if(11!==k&&(f=_.exec(a)))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return H.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName)return H.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=1!==k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(ba,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+ra(o[l]);w=aa.test(a)&&pa(b.parentNode)||b,x=o.join(",")}if(x)try{return H.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function ha(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ia(a){return a[u]=!0,a}function ja(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ka(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function la(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function na(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function oa(a){return ia(function(b){return b=+b,ia(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function pa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=ga.support={},f=ga.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=ga.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=g.documentElement,e=g.defaultView,e&&e!==e.top&&(e.addEventListener?e.addEventListener("unload",ea,!1):e.attachEvent&&e.attachEvent("onunload",ea)),p=!f(g),c.attributes=ja(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ja(function(a){return a.appendChild(g.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(g.getElementsByClassName),c.getById=ja(function(a){return o.appendChild(a).id=u,!g.getElementsByName||!g.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(g.querySelectorAll))&&(ja(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\f]' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ja(function(a){var b=g.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ja(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",P)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===g||a.ownerDocument===v&&t(v,a)?-1:b===g||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,h=[a],i=[b];if(!e||!f)return a===g?-1:b===g?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return la(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?la(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},g):n},ga.matches=function(a,b){return ga(a,null,null,b)},ga.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return ga(b,n,null,[a]).length>0},ga.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},ga.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},ga.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},ga.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=ga.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=ga.selectors={cacheLength:50,createPseudo:ia,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ca,da),a[3]=(a[3]||a[4]||a[5]||"").replace(ca,da),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||ga.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&ga.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ca,da).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=ga.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(Q," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||ga.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ia(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ia(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?ia(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ia(function(a){return function(b){return ga(a,b).length>0}}),contains:ia(function(a){return a=a.replace(ca,da),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ia(function(a){return W.test(a||"")||ga.error("unsupported lang: "+a),a=a.replace(ca,da).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:oa(function(){return[0]}),last:oa(function(a,b){return[b-1]}),eq:oa(function(a,b,c){return[0>c?c+b:c]}),even:oa(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:oa(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:oa(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:oa(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=ma(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=na(b);function qa(){}qa.prototype=d.filters=d.pseudos,d.setFilters=new qa,g=ga.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?ga.error(a):z(a,i).slice(0)};function ra(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function sa(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function ta(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ua(a,b,c){for(var d=0,e=b.length;e>d;d++)ga(a,b[d],c);return c}function va(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function wa(a,b,c,d,e,f){return d&&!d[u]&&(d=wa(d)),e&&!e[u]&&(e=wa(e,f)),ia(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ua(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:va(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=va(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=va(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function xa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=sa(function(a){return a===b},h,!0),l=sa(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[sa(ta(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return wa(i>1&&ta(m),i>1&&ra(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&xa(a.slice(i,e)),f>e&&xa(a=a.slice(e)),f>e&&ra(a))}m.push(c)}return ta(m)}function ya(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=F.call(i));s=va(s)}H.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&ga.uniqueSort(i)}return k&&(w=v,j=t),r};return c?ia(f):f}return h=ga.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=xa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,ya(e,d)),f.selector=a}return f},i=ga.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ca,da),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ca,da),aa.test(j[0].type)&&pa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&ra(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,aa.test(a)&&pa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ja(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ja(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ka("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ja(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ka("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ja(function(a){return null==a.getAttribute("disabled")})||ka(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),ga}(a);m.find=s,m.expr=s.selectors,m.expr[":"]=m.expr.pseudos,m.unique=s.uniqueSort,m.text=s.getText,m.isXMLDoc=s.isXML,m.contains=s.contains;var t=m.expr.match.needsContext,u=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,v=/^.[^:#\[\.,]*$/;function w(a,b,c){if(m.isFunction(b))return m.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return m.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(v.test(b))return m.filter(b,a,c);b=m.filter(b,a)}return m.grep(a,function(a){return m.inArray(a,b)>=0!==c})}m.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?m.find.matchesSelector(d,a)?[d]:[]:m.find.matches(a,m.grep(b,function(a){return 1===a.nodeType}))},m.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;if("string"!=typeof a)return this.pushStack(m(a).filter(function(){for(b=0;e>b;b++)if(m.contains(d[b],this))return!0}));for(b=0;e>b;b++)m.find(a,d[b],c);return c=this.pushStack(e>1?m.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c},filter:function(a){return this.pushStack(w(this,a||[],!1))},not:function(a){return this.pushStack(w(this,a||[],!0))},is:function(a){return!!w(this,"string"==typeof a&&t.test(a)?m(a):a||[],!1).length}});var x,y=a.document,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=m.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||x).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof m?b[0]:b,m.merge(this,m.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:y,!0)),u.test(c[1])&&m.isPlainObject(b))for(c in b)m.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}if(d=y.getElementById(c[2]),d&&d.parentNode){if(d.id!==c[2])return x.find(a);this.length=1,this[0]=d}return this.context=y,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):m.isFunction(a)?"undefined"!=typeof x.ready?x.ready(a):a(m):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),m.makeArray(a,this))};A.prototype=m.fn,x=m(y);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};m.extend({dir:function(a,b,c){var d=[],e=a[b];while(e&&9!==e.nodeType&&(void 0===c||1!==e.nodeType||!m(e).is(c)))1===e.nodeType&&d.push(e),e=e[b];return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),m.fn.extend({has:function(a){var b,c=m(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if(m.contains(this,c[b]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=t.test(a)||"string"!=typeof a?m(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&m.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?m.unique(f):f)},index:function(a){return a?"string"==typeof a?m.inArray(this[0],m(a)):m.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(m.unique(m.merge(this.get(),m(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}m.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return m.dir(a,"parentNode")},parentsUntil:function(a,b,c){return m.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return m.dir(a,"nextSibling")},prevAll:function(a){return m.dir(a,"previousSibling")},nextUntil:function(a,b,c){return m.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return m.dir(a,"previousSibling",c)},siblings:function(a){return m.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return m.sibling(a.firstChild)},contents:function(a){return m.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:m.merge([],a.childNodes)}},function(a,b){m.fn[a]=function(c,d){var e=m.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=m.filter(d,e)),this.length>1&&(C[a]||(e=m.unique(e)),B.test(a)&&(e=e.reverse())),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return m.each(a.match(E)||[],function(a,c){b[c]=!0}),b}m.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):m.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(c=a.memory&&l,d=!0,f=g||0,g=0,e=h.length,b=!0;h&&e>f;f++)if(h[f].apply(l[0],l[1])===!1&&a.stopOnFalse){c=!1;break}b=!1,h&&(i?i.length&&j(i.shift()):c?h=[]:k.disable())},k={add:function(){if(h){var d=h.length;!function f(b){m.each(b,function(b,c){var d=m.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&f(c)})}(arguments),b?e=h.length:c&&(g=d,j(c))}return this},remove:function(){return h&&m.each(arguments,function(a,c){var d;while((d=m.inArray(c,h,d))>-1)h.splice(d,1),b&&(e>=d&&e--,f>=d&&f--)}),this},has:function(a){return a?m.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],e=0,this},disable:function(){return h=i=c=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,c||k.disable(),this},locked:function(){return!i},fireWith:function(a,c){return!h||d&&!i||(c=c||[],c=[a,c.slice?c.slice():c],b?i.push(c):j(c)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!d}};return k},m.extend({Deferred:function(a){var b=[["resolve","done",m.Callbacks("once memory"),"resolved"],["reject","fail",m.Callbacks("once memory"),"rejected"],["notify","progress",m.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return m.Deferred(function(c){m.each(b,function(b,f){var g=m.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&m.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?m.extend(a,d):d}},e={};return d.pipe=d.then,m.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&m.isFunction(a.promise)?e:0,g=1===f?a:m.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&m.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;m.fn.ready=function(a){return m.ready.promise().done(a),this},m.extend({isReady:!1,readyWait:1,holdReady:function(a){a?m.readyWait++:m.ready(!0)},ready:function(a){if(a===!0?!--m.readyWait:!m.isReady){if(!y.body)return setTimeout(m.ready);m.isReady=!0,a!==!0&&--m.readyWait>0||(H.resolveWith(y,[m]),m.fn.triggerHandler&&(m(y).triggerHandler("ready"),m(y).off("ready")))}}});function I(){y.addEventListener?(y.removeEventListener("DOMContentLoaded",J,!1),a.removeEventListener("load",J,!1)):(y.detachEvent("onreadystatechange",J),a.detachEvent("onload",J))}function J(){(y.addEventListener||"load"===event.type||"complete"===y.readyState)&&(I(),m.ready())}m.ready.promise=function(b){if(!H)if(H=m.Deferred(),"complete"===y.readyState)setTimeout(m.ready);else if(y.addEventListener)y.addEventListener("DOMContentLoaded",J,!1),a.addEventListener("load",J,!1);else{y.attachEvent("onreadystatechange",J),a.attachEvent("onload",J);var c=!1;try{c=null==a.frameElement&&y.documentElement}catch(d){}c&&c.doScroll&&!function e(){if(!m.isReady){try{c.doScroll("left")}catch(a){return setTimeout(e,50)}I(),m.ready()}}()}return H.promise(b)};var K="undefined",L;for(L in m(k))break;k.ownLast="0"!==L,k.inlineBlockNeedsLayout=!1,m(function(){var a,b,c,d;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",k.inlineBlockNeedsLayout=a=3===b.offsetWidth,a&&(c.style.zoom=1)),c.removeChild(d))}),function(){var a=y.createElement("div");if(null==k.deleteExpando){k.deleteExpando=!0;try{delete a.test}catch(b){k.deleteExpando=!1}}a=null}(),m.acceptData=function(a){var b=m.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;return 1!==c&&9!==c?!1:!b||b!==!0&&a.getAttribute("classid")===b};var M=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,N=/([A-Z])/g;function O(a,b,c){if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(N,"-$1").toLowerCase();if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:M.test(c)?m.parseJSON(c):c}catch(e){}m.data(a,b,c)}else c=void 0}return c}function P(a){var b;for(b in a)if(("data"!==b||!m.isEmptyObject(a[b]))&&"toJSON"!==b)return!1;

return!0}function Q(a,b,d,e){if(m.acceptData(a)){var f,g,h=m.expando,i=a.nodeType,j=i?m.cache:a,k=i?a[h]:a[h]&&h;if(k&&j[k]&&(e||j[k].data)||void 0!==d||"string"!=typeof b)return k||(k=i?a[h]=c.pop()||m.guid++:h),j[k]||(j[k]=i?{}:{toJSON:m.noop}),("object"==typeof b||"function"==typeof b)&&(e?j[k]=m.extend(j[k],b):j[k].data=m.extend(j[k].data,b)),g=j[k],e||(g.data||(g.data={}),g=g.data),void 0!==d&&(g[m.camelCase(b)]=d),"string"==typeof b?(f=g[b],null==f&&(f=g[m.camelCase(b)])):f=g,f}}function R(a,b,c){if(m.acceptData(a)){var d,e,f=a.nodeType,g=f?m.cache:a,h=f?a[m.expando]:m.expando;if(g[h]){if(b&&(d=c?g[h]:g[h].data)){m.isArray(b)?b=b.concat(m.map(b,m.camelCase)):b in d?b=[b]:(b=m.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;while(e--)delete d[b[e]];if(c?!P(d):!m.isEmptyObject(d))return}(c||(delete g[h].data,P(g[h])))&&(f?m.cleanData([a],!0):k.deleteExpando||g!=g.window?delete g[h]:g[h]=null)}}}m.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?m.cache[a[m.expando]]:a[m.expando],!!a&&!P(a)},data:function(a,b,c){return Q(a,b,c)},removeData:function(a,b){return R(a,b)},_data:function(a,b,c){return Q(a,b,c,!0)},_removeData:function(a,b){return R(a,b,!0)}}),m.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=m.data(f),1===f.nodeType&&!m._data(f,"parsedAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=m.camelCase(d.slice(5)),O(f,d,e[d])));m._data(f,"parsedAttrs",!0)}return e}return"object"==typeof a?this.each(function(){m.data(this,a)}):arguments.length>1?this.each(function(){m.data(this,a,b)}):f?O(f,a,m.data(f,a)):void 0},removeData:function(a){return this.each(function(){m.removeData(this,a)})}}),m.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=m._data(a,b),c&&(!d||m.isArray(c)?d=m._data(a,b,m.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=m.queue(a,b),d=c.length,e=c.shift(),f=m._queueHooks(a,b),g=function(){m.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return m._data(a,c)||m._data(a,c,{empty:m.Callbacks("once memory").add(function(){m._removeData(a,b+"queue"),m._removeData(a,c)})})}}),m.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?m.queue(this[0],a):void 0===b?this:this.each(function(){var c=m.queue(this,a,b);m._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&m.dequeue(this,a)})},dequeue:function(a){return this.each(function(){m.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=m.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=m._data(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var S=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=["Top","Right","Bottom","Left"],U=function(a,b){return a=b||a,"none"===m.css(a,"display")||!m.contains(a.ownerDocument,a)},V=m.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===m.type(c)){e=!0;for(h in c)m.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,m.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(m(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},W=/^(?:checkbox|radio)$/i;!function(){var a=y.createElement("input"),b=y.createElement("div"),c=y.createDocumentFragment();if(b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",k.leadingWhitespace=3===b.firstChild.nodeType,k.tbody=!b.getElementsByTagName("tbody").length,k.htmlSerialize=!!b.getElementsByTagName("link").length,k.html5Clone="<:nav></:nav>"!==y.createElement("nav").cloneNode(!0).outerHTML,a.type="checkbox",a.checked=!0,c.appendChild(a),k.appendChecked=a.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue,c.appendChild(b),b.innerHTML="<input type='radio' checked='checked' name='t'/>",k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,k.noCloneEvent=!0,b.attachEvent&&(b.attachEvent("onclick",function(){k.noCloneEvent=!1}),b.cloneNode(!0).click()),null==k.deleteExpando){k.deleteExpando=!0;try{delete b.test}catch(d){k.deleteExpando=!1}}}(),function(){var b,c,d=y.createElement("div");for(b in{submit:!0,change:!0,focusin:!0})c="on"+b,(k[b+"Bubbles"]=c in a)||(d.setAttribute(c,"t"),k[b+"Bubbles"]=d.attributes[c].expando===!1);d=null}();var X=/^(?:input|select|textarea)$/i,Y=/^key/,Z=/^(?:mouse|pointer|contextmenu)|click/,$=/^(?:focusinfocus|focusoutblur)$/,_=/^([^.]*)(?:\.(.+)|)$/;function aa(){return!0}function ba(){return!1}function ca(){try{return y.activeElement}catch(a){}}m.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m._data(a);if(r){c.handler&&(i=c,c=i.handler,e=i.selector),c.guid||(c.guid=m.guid++),(g=r.events)||(g=r.events={}),(k=r.handle)||(k=r.handle=function(a){return typeof m===K||a&&m.event.triggered===a.type?void 0:m.event.dispatch.apply(k.elem,arguments)},k.elem=a),b=(b||"").match(E)||[""],h=b.length;while(h--)f=_.exec(b[h])||[],o=q=f[1],p=(f[2]||"").split(".").sort(),o&&(j=m.event.special[o]||{},o=(e?j.delegateType:j.bindType)||o,j=m.event.special[o]||{},l=m.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&m.expr.match.needsContext.test(e),namespace:p.join(".")},i),(n=g[o])||(n=g[o]=[],n.delegateCount=0,j.setup&&j.setup.call(a,d,p,k)!==!1||(a.addEventListener?a.addEventListener(o,k,!1):a.attachEvent&&a.attachEvent("on"+o,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),e?n.splice(n.delegateCount++,0,l):n.push(l),m.event.global[o]=!0);a=null}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m.hasData(a)&&m._data(a);if(r&&(k=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=_.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=m.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,n=k[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),i=f=n.length;while(f--)g=n[f],!e&&q!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(n.splice(f,1),g.selector&&n.delegateCount--,l.remove&&l.remove.call(a,g));i&&!n.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||m.removeEvent(a,o,r.handle),delete k[o])}else for(o in k)m.event.remove(a,o+b[j],c,d,!0);m.isEmptyObject(k)&&(delete r.handle,m._removeData(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,n,o=[d||y],p=j.call(b,"type")?b.type:b,q=j.call(b,"namespace")?b.namespace.split("."):[];if(h=l=d=d||y,3!==d.nodeType&&8!==d.nodeType&&!$.test(p+m.event.triggered)&&(p.indexOf(".")>=0&&(q=p.split("."),p=q.shift(),q.sort()),g=p.indexOf(":")<0&&"on"+p,b=b[m.expando]?b:new m.Event(p,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=q.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:m.makeArray(c,[b]),k=m.event.special[p]||{},e||!k.trigger||k.trigger.apply(d,c)!==!1)){if(!e&&!k.noBubble&&!m.isWindow(d)){for(i=k.delegateType||p,$.test(i+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),l=h;l===(d.ownerDocument||y)&&o.push(l.defaultView||l.parentWindow||a)}n=0;while((h=o[n++])&&!b.isPropagationStopped())b.type=n>1?i:k.bindType||p,f=(m._data(h,"events")||{})[b.type]&&m._data(h,"handle"),f&&f.apply(h,c),f=g&&h[g],f&&f.apply&&m.acceptData(h)&&(b.result=f.apply(h,c),b.result===!1&&b.preventDefault());if(b.type=p,!e&&!b.isDefaultPrevented()&&(!k._default||k._default.apply(o.pop(),c)===!1)&&m.acceptData(d)&&g&&d[p]&&!m.isWindow(d)){l=d[g],l&&(d[g]=null),m.event.triggered=p;try{d[p]()}catch(r){}m.event.triggered=void 0,l&&(d[g]=l)}return b.result}},dispatch:function(a){a=m.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(m._data(this,"events")||{})[a.type]||[],k=m.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=m.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,g=0;while((e=f.handlers[g++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(e.namespace))&&(a.handleObj=e,a.data=e.data,c=((m.event.special[e.origType]||{}).handle||e.handler).apply(f.elem,i),void 0!==c&&(a.result=c)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!=this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(e=[],f=0;h>f;f++)d=b[f],c=d.selector+" ",void 0===e[c]&&(e[c]=d.needsContext?m(c,this).index(i)>=0:m.find(c,this,null,[i]).length),e[c]&&e.push(d);e.length&&g.push({elem:i,handlers:e})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},fix:function(a){if(a[m.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=Z.test(e)?this.mouseHooks:Y.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new m.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=f.srcElement||y),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,g.filter?g.filter(a,f):a},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button,g=b.fromElement;return null==a.pageX&&null!=b.clientX&&(d=a.target.ownerDocument||y,e=d.documentElement,c=d.body,a.pageX=b.clientX+(e&&e.scrollLeft||c&&c.scrollLeft||0)-(e&&e.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||c&&c.scrollTop||0)-(e&&e.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&g&&(a.relatedTarget=g===a.target?b.toElement:g),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==ca()&&this.focus)try{return this.focus(),!1}catch(a){}},delegateType:"focusin"},blur:{trigger:function(){return this===ca()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return m.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(a){return m.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=m.extend(new m.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?m.event.trigger(e,null,b):m.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},m.removeEvent=y.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]===K&&(a[d]=null),a.detachEvent(d,c))},m.Event=function(a,b){return this instanceof m.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?aa:ba):this.type=a,b&&m.extend(this,b),this.timeStamp=a&&a.timeStamp||m.now(),void(this[m.expando]=!0)):new m.Event(a,b)},m.Event.prototype={isDefaultPrevented:ba,isPropagationStopped:ba,isImmediatePropagationStopped:ba,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=aa,a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=aa,a&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=aa,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},m.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){m.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!m.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.submitBubbles||(m.event.special.submit={setup:function(){return m.nodeName(this,"form")?!1:void m.event.add(this,"click._submit keypress._submit",function(a){var b=a.target,c=m.nodeName(b,"input")||m.nodeName(b,"button")?b.form:void 0;c&&!m._data(c,"submitBubbles")&&(m.event.add(c,"submit._submit",function(a){a._submit_bubble=!0}),m._data(c,"submitBubbles",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&m.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){return m.nodeName(this,"form")?!1:void m.event.remove(this,"._submit")}}),k.changeBubbles||(m.event.special.change={setup:function(){return X.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(m.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._just_changed=!0)}),m.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),m.event.simulate("change",this,a,!0)})),!1):void m.event.add(this,"beforeactivate._change",function(a){var b=a.target;X.test(b.nodeName)&&!m._data(b,"changeBubbles")&&(m.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||m.event.simulate("change",this.parentNode,a,!0)}),m._data(b,"changeBubbles",!0))})},handle:function(a){var b=a.target;return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return m.event.remove(this,"._change"),!X.test(this.nodeName)}}),k.focusinBubbles||m.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){m.event.simulate(b,a.target,m.event.fix(a),!0)};m.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=m._data(d,b);e||d.addEventListener(a,c,!0),m._data(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=m._data(d,b)-1;e?m._data(d,b,e):(d.removeEventListener(a,c,!0),m._removeData(d,b))}}}),m.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(f in a)this.on(f,b,c,a[f],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=ba;else if(!d)return this;return 1===e&&(g=d,d=function(a){return m().off(a),g.apply(this,arguments)},d.guid=g.guid||(g.guid=m.guid++)),this.each(function(){m.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,m(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=ba),this.each(function(){m.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){m.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?m.event.trigger(a,b,c,!0):void 0}});function da(a){var b=ea.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}var ea="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",fa=/ jQuery\d+="(?:null|\d+)"/g,ga=new RegExp("<(?:"+ea+")[\\s/>]","i"),ha=/^\s+/,ia=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,ja=/<([\w:]+)/,ka=/<tbody/i,la=/<|&#?\w+;/,ma=/<(?:script|style|link)/i,na=/checked\s*(?:[^=]|=\s*.checked.)/i,oa=/^$|\/(?:java|ecma)script/i,pa=/^true\/(.*)/,qa=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ra={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:k.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},sa=da(y),ta=sa.appendChild(y.createElement("div"));ra.optgroup=ra.option,ra.tbody=ra.tfoot=ra.colgroup=ra.caption=ra.thead,ra.th=ra.td;function ua(a,b){var c,d,e=0,f=typeof a.getElementsByTagName!==K?a.getElementsByTagName(b||"*"):typeof a.querySelectorAll!==K?a.querySelectorAll(b||"*"):void 0;if(!f)for(f=[],c=a.childNodes||a;null!=(d=c[e]);e++)!b||m.nodeName(d,b)?f.push(d):m.merge(f,ua(d,b));return void 0===b||b&&m.nodeName(a,b)?m.merge([a],f):f}function va(a){W.test(a.type)&&(a.defaultChecked=a.checked)}function wa(a,b){return m.nodeName(a,"table")&&m.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function xa(a){return a.type=(null!==m.find.attr(a,"type"))+"/"+a.type,a}function ya(a){var b=pa.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function za(a,b){for(var c,d=0;null!=(c=a[d]);d++)m._data(c,"globalEval",!b||m._data(b[d],"globalEval"))}function Aa(a,b){if(1===b.nodeType&&m.hasData(a)){var c,d,e,f=m._data(a),g=m._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)m.event.add(b,c,h[c][d])}g.data&&(g.data=m.extend({},g.data))}}function Ba(a,b){var c,d,e;if(1===b.nodeType){if(c=b.nodeName.toLowerCase(),!k.noCloneEvent&&b[m.expando]){e=m._data(b);for(d in e.events)m.removeEvent(b,d,e.handle);b.removeAttribute(m.expando)}"script"===c&&b.text!==a.text?(xa(b).text=a.text,ya(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),k.html5Clone&&a.innerHTML&&!m.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&W.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}}m.extend({clone:function(a,b,c){var d,e,f,g,h,i=m.contains(a.ownerDocument,a);if(k.html5Clone||m.isXMLDoc(a)||!ga.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(ta.innerHTML=a.outerHTML,ta.removeChild(f=ta.firstChild)),!(k.noCloneEvent&&k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||m.isXMLDoc(a)))for(d=ua(f),h=ua(a),g=0;null!=(e=h[g]);++g)d[g]&&Ba(e,d[g]);if(b)if(c)for(h=h||ua(a),d=d||ua(f),g=0;null!=(e=h[g]);g++)Aa(e,d[g]);else Aa(a,f);return d=ua(f,"script"),d.length>0&&za(d,!i&&ua(a,"script")),d=h=e=null,f},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,l,n=a.length,o=da(b),p=[],q=0;n>q;q++)if(f=a[q],f||0===f)if("object"===m.type(f))m.merge(p,f.nodeType?[f]:f);else if(la.test(f)){h=h||o.appendChild(b.createElement("div")),i=(ja.exec(f)||["",""])[1].toLowerCase(),l=ra[i]||ra._default,h.innerHTML=l[1]+f.replace(ia,"<$1></$2>")+l[2],e=l[0];while(e--)h=h.lastChild;if(!k.leadingWhitespace&&ha.test(f)&&p.push(b.createTextNode(ha.exec(f)[0])),!k.tbody){f="table"!==i||ka.test(f)?"<table>"!==l[1]||ka.test(f)?0:h:h.firstChild,e=f&&f.childNodes.length;while(e--)m.nodeName(j=f.childNodes[e],"tbody")&&!j.childNodes.length&&f.removeChild(j)}m.merge(p,h.childNodes),h.textContent="";while(h.firstChild)h.removeChild(h.firstChild);h=o.lastChild}else p.push(b.createTextNode(f));h&&o.removeChild(h),k.appendChecked||m.grep(ua(p,"input"),va),q=0;while(f=p[q++])if((!d||-1===m.inArray(f,d))&&(g=m.contains(f.ownerDocument,f),h=ua(o.appendChild(f),"script"),g&&za(h),c)){e=0;while(f=h[e++])oa.test(f.type||"")&&c.push(f)}return h=null,o},cleanData:function(a,b){for(var d,e,f,g,h=0,i=m.expando,j=m.cache,l=k.deleteExpando,n=m.event.special;null!=(d=a[h]);h++)if((b||m.acceptData(d))&&(f=d[i],g=f&&j[f])){if(g.events)for(e in g.events)n[e]?m.event.remove(d,e):m.removeEvent(d,e,g.handle);j[f]&&(delete j[f],l?delete d[i]:typeof d.removeAttribute!==K?d.removeAttribute(i):d[i]=null,c.push(f))}}}),m.fn.extend({text:function(a){return V(this,function(a){return void 0===a?m.text(this):this.empty().append((this[0]&&this[0].ownerDocument||y).createTextNode(a))},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wa(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wa(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?m.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||m.cleanData(ua(c)),c.parentNode&&(b&&m.contains(c.ownerDocument,c)&&za(ua(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++){1===a.nodeType&&m.cleanData(ua(a,!1));while(a.firstChild)a.removeChild(a.firstChild);a.options&&m.nodeName(a,"select")&&(a.options.length=0)}return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return m.clone(this,a,b)})},html:function(a){return V(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a)return 1===b.nodeType?b.innerHTML.replace(fa,""):void 0;if(!("string"!=typeof a||ma.test(a)||!k.htmlSerialize&&ga.test(a)||!k.leadingWhitespace&&ha.test(a)||ra[(ja.exec(a)||["",""])[1].toLowerCase()])){a=a.replace(ia,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(m.cleanData(ua(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,m.cleanData(ua(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,n=this,o=l-1,p=a[0],q=m.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&na.test(p))return this.each(function(c){var d=n.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(i=m.buildFragment(a,this[0].ownerDocument,!1,this),c=i.firstChild,1===i.childNodes.length&&(i=c),c)){for(g=m.map(ua(i,"script"),xa),f=g.length;l>j;j++)d=i,j!==o&&(d=m.clone(d,!0,!0),f&&m.merge(g,ua(d,"script"))),b.call(this[j],d,j);if(f)for(h=g[g.length-1].ownerDocument,m.map(g,ya),j=0;f>j;j++)d=g[j],oa.test(d.type||"")&&!m._data(d,"globalEval")&&m.contains(h,d)&&(d.src?m._evalUrl&&m._evalUrl(d.src):m.globalEval((d.text||d.textContent||d.innerHTML||"").replace(qa,"")));i=c=null}return this}}),m.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){m.fn[a]=function(a){for(var c,d=0,e=[],g=m(a),h=g.length-1;h>=d;d++)c=d===h?this:this.clone(!0),m(g[d])[b](c),f.apply(e,c.get());return this.pushStack(e)}});var Ca,Da={};function Ea(b,c){var d,e=m(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:m.css(e[0],"display");return e.detach(),f}function Fa(a){var b=y,c=Da[a];return c||(c=Ea(a,b),"none"!==c&&c||(Ca=(Ca||m("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=(Ca[0].contentWindow||Ca[0].contentDocument).document,b.write(),b.close(),c=Ea(a,b),Ca.detach()),Da[a]=c),c}!function(){var a;k.shrinkWrapBlocks=function(){if(null!=a)return a;a=!1;var b,c,d;return c=y.getElementsByTagName("body")[0],c&&c.style?(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",b.appendChild(y.createElement("div")).style.width="5px",a=3!==b.offsetWidth),c.removeChild(d),a):void 0}}();var Ga=/^margin/,Ha=new RegExp("^("+S+")(?!px)[a-z%]+$","i"),Ia,Ja,Ka=/^(top|right|bottom|left)$/;a.getComputedStyle?(Ia=function(b){return b.ownerDocument.defaultView.opener?b.ownerDocument.defaultView.getComputedStyle(b,null):a.getComputedStyle(b,null)},Ja=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ia(a),g=c?c.getPropertyValue(b)||c[b]:void 0,c&&(""!==g||m.contains(a.ownerDocument,a)||(g=m.style(a,b)),Ha.test(g)&&Ga.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0===g?g:g+""}):y.documentElement.currentStyle&&(Ia=function(a){return a.currentStyle},Ja=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ia(a),g=c?c[b]:void 0,null==g&&h&&h[b]&&(g=h[b]),Ha.test(g)&&!Ka.test(b)&&(d=h.left,e=a.runtimeStyle,f=e&&e.left,f&&(e.left=a.currentStyle.left),h.left="fontSize"===b?"1em":g,g=h.pixelLeft+"px",h.left=d,f&&(e.left=f)),void 0===g?g:g+""||"auto"});function La(a,b){return{get:function(){var c=a();if(null!=c)return c?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d,e,f,g,h;if(b=y.createElement("div"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=d&&d.style){c.cssText="float:left;opacity:.5",k.opacity="0.5"===c.opacity,k.cssFloat=!!c.cssFloat,b.style.backgroundClip="content-box",b.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===b.style.backgroundClip,k.boxSizing=""===c.boxSizing||""===c.MozBoxSizing||""===c.WebkitBoxSizing,m.extend(k,{reliableHiddenOffsets:function(){return null==g&&i(),g},boxSizingReliable:function(){return null==f&&i(),f},pixelPosition:function(){return null==e&&i(),e},reliableMarginRight:function(){return null==h&&i(),h}});function i(){var b,c,d,i;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),b.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",e=f=!1,h=!0,a.getComputedStyle&&(e="1%"!==(a.getComputedStyle(b,null)||{}).top,f="4px"===(a.getComputedStyle(b,null)||{width:"4px"}).width,i=b.appendChild(y.createElement("div")),i.style.cssText=b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",i.style.marginRight=i.style.width="0",b.style.width="1px",h=!parseFloat((a.getComputedStyle(i,null)||{}).marginRight),b.removeChild(i)),b.innerHTML="<table><tr><td></td><td>t</td></tr></table>",i=b.getElementsByTagName("td"),i[0].style.cssText="margin:0;border:0;padding:0;display:none",g=0===i[0].offsetHeight,g&&(i[0].style.display="",i[1].style.display="none",g=0===i[0].offsetHeight),c.removeChild(d))}}}(),m.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var Ma=/alpha\([^)]*\)/i,Na=/opacity\s*=\s*([^)]*)/,Oa=/^(none|table(?!-c[ea]).+)/,Pa=new RegExp("^("+S+")(.*)$","i"),Qa=new RegExp("^([+-])=("+S+")","i"),Ra={position:"absolute",visibility:"hidden",display:"block"},Sa={letterSpacing:"0",fontWeight:"400"},Ta=["Webkit","O","Moz","ms"];function Ua(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=Ta.length;while(e--)if(b=Ta[e]+c,b in a)return b;return d}function Va(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=m._data(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&U(d)&&(f[g]=m._data(d,"olddisplay",Fa(d.nodeName)))):(e=U(d),(c&&"none"!==c||!e)&&m._data(d,"olddisplay",e?c:m.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}function Wa(a,b,c){var d=Pa.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Xa(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=m.css(a,c+T[f],!0,e)),d?("content"===c&&(g-=m.css(a,"padding"+T[f],!0,e)),"margin"!==c&&(g-=m.css(a,"border"+T[f]+"Width",!0,e))):(g+=m.css(a,"padding"+T[f],!0,e),"padding"!==c&&(g+=m.css(a,"border"+T[f]+"Width",!0,e)));return g}function Ya(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Ia(a),g=k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Ja(a,b,f),(0>e||null==e)&&(e=a.style[b]),Ha.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Xa(a,b,c||(g?"border":"content"),d,f)+"px"}m.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Ja(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":k.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=m.camelCase(b),i=a.style;if(b=m.cssProps[h]||(m.cssProps[h]=Ua(i,h)),g=m.cssHooks[b]||m.cssHooks[h],void 0===c)return g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b];if(f=typeof c,"string"===f&&(e=Qa.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(m.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||m.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),!(g&&"set"in g&&void 0===(c=g.set(a,c,d)))))try{i[b]=c}catch(j){}}},css:function(a,b,c,d){var e,f,g,h=m.camelCase(b);return b=m.cssProps[h]||(m.cssProps[h]=Ua(a.style,h)),g=m.cssHooks[b]||m.cssHooks[h],g&&"get"in g&&(f=g.get(a,!0,c)),void 0===f&&(f=Ja(a,b,d)),"normal"===f&&b in Sa&&(f=Sa[b]),""===c||c?(e=parseFloat(f),c===!0||m.isNumeric(e)?e||0:f):f}}),m.each(["height","width"],function(a,b){m.cssHooks[b]={get:function(a,c,d){return c?Oa.test(m.css(a,"display"))&&0===a.offsetWidth?m.swap(a,Ra,function(){return Ya(a,b,d)}):Ya(a,b,d):void 0},set:function(a,c,d){var e=d&&Ia(a);return Wa(a,c,d?Xa(a,b,d,k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,e),e):0)}}}),k.opacity||(m.cssHooks.opacity={get:function(a,b){return Na.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=m.isNumeric(b)?"alpha(opacity="+100*b+")":"",f=d&&d.filter||c.filter||"";c.zoom=1,(b>=1||""===b)&&""===m.trim(f.replace(Ma,""))&&c.removeAttribute&&(c.removeAttribute("filter"),""===b||d&&!d.filter)||(c.filter=Ma.test(f)?f.replace(Ma,e):f+" "+e)}}),m.cssHooks.marginRight=La(k.reliableMarginRight,function(a,b){return b?m.swap(a,{display:"inline-block"},Ja,[a,"marginRight"]):void 0}),m.each({margin:"",padding:"",border:"Width"},function(a,b){m.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+T[d]+b]=f[d]||f[d-2]||f[0];return e}},Ga.test(a)||(m.cssHooks[a+b].set=Wa)}),m.fn.extend({css:function(a,b){return V(this,function(a,b,c){var d,e,f={},g=0;if(m.isArray(b)){for(d=Ia(a),e=b.length;e>g;g++)f[b[g]]=m.css(a,b[g],!1,d);return f}return void 0!==c?m.style(a,b,c):m.css(a,b)},a,b,arguments.length>1)},show:function(){return Va(this,!0)},hide:function(){return Va(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){U(this)?m(this).show():m(this).hide()})}});function Za(a,b,c,d,e){
return new Za.prototype.init(a,b,c,d,e)}m.Tween=Za,Za.prototype={constructor:Za,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(m.cssNumber[c]?"":"px")},cur:function(){var a=Za.propHooks[this.prop];return a&&a.get?a.get(this):Za.propHooks._default.get(this)},run:function(a){var b,c=Za.propHooks[this.prop];return this.options.duration?this.pos=b=m.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Za.propHooks._default.set(this),this}},Za.prototype.init.prototype=Za.prototype,Za.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=m.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){m.fx.step[a.prop]?m.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[m.cssProps[a.prop]]||m.cssHooks[a.prop])?m.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Za.propHooks.scrollTop=Za.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},m.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},m.fx=Za.prototype.init,m.fx.step={};var $a,_a,ab=/^(?:toggle|show|hide)$/,bb=new RegExp("^(?:([+-])=|)("+S+")([a-z%]*)$","i"),cb=/queueHooks$/,db=[ib],eb={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=bb.exec(b),f=e&&e[3]||(m.cssNumber[a]?"":"px"),g=(m.cssNumber[a]||"px"!==f&&+d)&&bb.exec(m.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,m.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function fb(){return setTimeout(function(){$a=void 0}),$a=m.now()}function gb(a,b){var c,d={height:a},e=0;for(b=b?1:0;4>e;e+=2-b)c=T[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function hb(a,b,c){for(var d,e=(eb[b]||[]).concat(eb["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function ib(a,b,c){var d,e,f,g,h,i,j,l,n=this,o={},p=a.style,q=a.nodeType&&U(a),r=m._data(a,"fxshow");c.queue||(h=m._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,n.always(function(){n.always(function(){h.unqueued--,m.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[p.overflow,p.overflowX,p.overflowY],j=m.css(a,"display"),l="none"===j?m._data(a,"olddisplay")||Fa(a.nodeName):j,"inline"===l&&"none"===m.css(a,"float")&&(k.inlineBlockNeedsLayout&&"inline"!==Fa(a.nodeName)?p.zoom=1:p.display="inline-block")),c.overflow&&(p.overflow="hidden",k.shrinkWrapBlocks()||n.always(function(){p.overflow=c.overflow[0],p.overflowX=c.overflow[1],p.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],ab.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(q?"hide":"show")){if("show"!==e||!r||void 0===r[d])continue;q=!0}o[d]=r&&r[d]||m.style(a,d)}else j=void 0;if(m.isEmptyObject(o))"inline"===("none"===j?Fa(a.nodeName):j)&&(p.display=j);else{r?"hidden"in r&&(q=r.hidden):r=m._data(a,"fxshow",{}),f&&(r.hidden=!q),q?m(a).show():n.done(function(){m(a).hide()}),n.done(function(){var b;m._removeData(a,"fxshow");for(b in o)m.style(a,b,o[b])});for(d in o)g=hb(q?r[d]:0,d,n),d in r||(r[d]=g.start,q&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function jb(a,b){var c,d,e,f,g;for(c in a)if(d=m.camelCase(c),e=b[d],f=a[c],m.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=m.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function kb(a,b,c){var d,e,f=0,g=db.length,h=m.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=$a||fb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:m.extend({},b),opts:m.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:$a||fb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=m.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(jb(k,j.opts.specialEasing);g>f;f++)if(d=db[f].call(j,a,k,j.opts))return d;return m.map(k,hb,j),m.isFunction(j.opts.start)&&j.opts.start.call(a,j),m.fx.timer(m.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}m.Animation=m.extend(kb,{tweener:function(a,b){m.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],eb[c]=eb[c]||[],eb[c].unshift(b)},prefilter:function(a,b){b?db.unshift(a):db.push(a)}}),m.speed=function(a,b,c){var d=a&&"object"==typeof a?m.extend({},a):{complete:c||!c&&b||m.isFunction(a)&&a,duration:a,easing:c&&b||b&&!m.isFunction(b)&&b};return d.duration=m.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in m.fx.speeds?m.fx.speeds[d.duration]:m.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){m.isFunction(d.old)&&d.old.call(this),d.queue&&m.dequeue(this,d.queue)},d},m.fn.extend({fadeTo:function(a,b,c,d){return this.filter(U).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=m.isEmptyObject(a),f=m.speed(b,c,d),g=function(){var b=kb(this,m.extend({},a),f);(e||m._data(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=m.timers,g=m._data(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&cb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&m.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=m._data(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=m.timers,g=d?d.length:0;for(c.finish=!0,m.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),m.each(["toggle","show","hide"],function(a,b){var c=m.fn[b];m.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(gb(b,!0),a,d,e)}}),m.each({slideDown:gb("show"),slideUp:gb("hide"),slideToggle:gb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){m.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),m.timers=[],m.fx.tick=function(){var a,b=m.timers,c=0;for($a=m.now();c<b.length;c++)a=b[c],a()||b[c]!==a||b.splice(c--,1);b.length||m.fx.stop(),$a=void 0},m.fx.timer=function(a){m.timers.push(a),a()?m.fx.start():m.timers.pop()},m.fx.interval=13,m.fx.start=function(){_a||(_a=setInterval(m.fx.tick,m.fx.interval))},m.fx.stop=function(){clearInterval(_a),_a=null},m.fx.speeds={slow:600,fast:200,_default:400},m.fn.delay=function(a,b){return a=m.fx?m.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a,b,c,d,e;b=y.createElement("div"),b.setAttribute("className","t"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=y.createElement("select"),e=c.appendChild(y.createElement("option")),a=b.getElementsByTagName("input")[0],d.style.cssText="top:1px",k.getSetAttribute="t"!==b.className,k.style=/top/.test(d.getAttribute("style")),k.hrefNormalized="/a"===d.getAttribute("href"),k.checkOn=!!a.value,k.optSelected=e.selected,k.enctype=!!y.createElement("form").enctype,c.disabled=!0,k.optDisabled=!e.disabled,a=y.createElement("input"),a.setAttribute("value",""),k.input=""===a.getAttribute("value"),a.value="t",a.setAttribute("type","radio"),k.radioValue="t"===a.value}();var lb=/\r/g;m.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=m.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,m(this).val()):a,null==e?e="":"number"==typeof e?e+="":m.isArray(e)&&(e=m.map(e,function(a){return null==a?"":a+""})),b=m.valHooks[this.type]||m.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=m.valHooks[e.type]||m.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(lb,""):null==c?"":c)}}}),m.extend({valHooks:{option:{get:function(a){var b=m.find.attr(a,"value");return null!=b?b:m.trim(m.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&m.nodeName(c.parentNode,"optgroup"))){if(b=m(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=m.makeArray(b),g=e.length;while(g--)if(d=e[g],m.inArray(m.valHooks.option.get(d),f)>=0)try{d.selected=c=!0}catch(h){d.scrollHeight}else d.selected=!1;return c||(a.selectedIndex=-1),e}}}}),m.each(["radio","checkbox"],function(){m.valHooks[this]={set:function(a,b){return m.isArray(b)?a.checked=m.inArray(m(a).val(),b)>=0:void 0}},k.checkOn||(m.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var mb,nb,ob=m.expr.attrHandle,pb=/^(?:checked|selected)$/i,qb=k.getSetAttribute,rb=k.input;m.fn.extend({attr:function(a,b){return V(this,m.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){m.removeAttr(this,a)})}}),m.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===K?m.prop(a,b,c):(1===f&&m.isXMLDoc(a)||(b=b.toLowerCase(),d=m.attrHooks[b]||(m.expr.match.bool.test(b)?nb:mb)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=m.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void m.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=m.propFix[c]||c,m.expr.match.bool.test(c)?rb&&qb||!pb.test(c)?a[d]=!1:a[m.camelCase("default-"+c)]=a[d]=!1:m.attr(a,c,""),a.removeAttribute(qb?c:d)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&m.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),nb={set:function(a,b,c){return b===!1?m.removeAttr(a,c):rb&&qb||!pb.test(c)?a.setAttribute(!qb&&m.propFix[c]||c,c):a[m.camelCase("default-"+c)]=a[c]=!0,c}},m.each(m.expr.match.bool.source.match(/\w+/g),function(a,b){var c=ob[b]||m.find.attr;ob[b]=rb&&qb||!pb.test(b)?function(a,b,d){var e,f;return d||(f=ob[b],ob[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,ob[b]=f),e}:function(a,b,c){return c?void 0:a[m.camelCase("default-"+b)]?b.toLowerCase():null}}),rb&&qb||(m.attrHooks.value={set:function(a,b,c){return m.nodeName(a,"input")?void(a.defaultValue=b):mb&&mb.set(a,b,c)}}),qb||(mb={set:function(a,b,c){var d=a.getAttributeNode(c);return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0}},ob.id=ob.name=ob.coords=function(a,b,c){var d;return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null},m.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);return c&&c.specified?c.value:void 0},set:mb.set},m.attrHooks.contenteditable={set:function(a,b,c){mb.set(a,""===b?!1:b,c)}},m.each(["width","height"],function(a,b){m.attrHooks[b]={set:function(a,c){return""===c?(a.setAttribute(b,"auto"),c):void 0}}})),k.style||(m.attrHooks.style={get:function(a){return a.style.cssText||void 0},set:function(a,b){return a.style.cssText=b+""}});var sb=/^(?:input|select|textarea|button|object)$/i,tb=/^(?:a|area)$/i;m.fn.extend({prop:function(a,b){return V(this,m.prop,a,b,arguments.length>1)},removeProp:function(a){return a=m.propFix[a]||a,this.each(function(){try{this[a]=void 0,delete this[a]}catch(b){}})}}),m.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!m.isXMLDoc(a),f&&(b=m.propFix[b]||b,e=m.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=m.find.attr(a,"tabindex");return b?parseInt(b,10):sb.test(a.nodeName)||tb.test(a.nodeName)&&a.href?0:-1}}}}),k.hrefNormalized||m.each(["href","src"],function(a,b){m.propHooks[b]={get:function(a){return a.getAttribute(b,4)}}}),k.optSelected||(m.propHooks.selected={get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}}),m.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){m.propFix[this.toLowerCase()]=this}),k.enctype||(m.propFix.enctype="encoding");var ub=/[\t\r\n\f]/g;m.fn.extend({addClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j="string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).addClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ub," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=m.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j=0===arguments.length||"string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).removeClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ub," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?m.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(m.isFunction(a)?function(c){m(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=m(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===K||"boolean"===c)&&(this.className&&m._data(this,"__className__",this.className),this.className=this.className||a===!1?"":m._data(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ub," ").indexOf(b)>=0)return!0;return!1}}),m.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){m.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),m.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var vb=m.now(),wb=/\?/,xb=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;m.parseJSON=function(b){if(a.JSON&&a.JSON.parse)return a.JSON.parse(b+"");var c,d=null,e=m.trim(b+"");return e&&!m.trim(e.replace(xb,function(a,b,e,f){return c&&b&&(d=0),0===d?a:(c=e||b,d+=!f-!e,"")}))?Function("return "+e)():m.error("Invalid JSON: "+b)},m.parseXML=function(b){var c,d;if(!b||"string"!=typeof b)return null;try{a.DOMParser?(d=new DOMParser,c=d.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b))}catch(e){c=void 0}return c&&c.documentElement&&!c.getElementsByTagName("parsererror").length||m.error("Invalid XML: "+b),c};var yb,zb,Ab=/#.*$/,Bb=/([?&])_=[^&]*/,Cb=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Db=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Eb=/^(?:GET|HEAD)$/,Fb=/^\/\//,Gb=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Hb={},Ib={},Jb="*/".concat("*");try{zb=location.href}catch(Kb){zb=y.createElement("a"),zb.href="",zb=zb.href}yb=Gb.exec(zb.toLowerCase())||[];function Lb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(m.isFunction(c))while(d=f[e++])"+"===d.charAt(0)?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Mb(a,b,c,d){var e={},f=a===Ib;function g(h){var i;return e[h]=!0,m.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Nb(a,b){var c,d,e=m.ajaxSettings.flatOptions||{};for(d in b)void 0!==b[d]&&((e[d]?a:c||(c={}))[d]=b[d]);return c&&m.extend(!0,a,c),a}function Ob(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===e&&(e=a.mimeType||b.getResponseHeader("Content-Type"));if(e)for(g in h)if(h[g]&&h[g].test(e)){i.unshift(g);break}if(i[0]in c)f=i[0];else{for(g in c){if(!i[0]||a.converters[g+" "+i[0]]){f=g;break}d||(d=g)}f=f||d}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Pb(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}m.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:zb,type:"GET",isLocal:Db.test(yb[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Jb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":m.parseJSON,"text xml":m.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Nb(Nb(a,m.ajaxSettings),b):Nb(m.ajaxSettings,a)},ajaxPrefilter:Lb(Hb),ajaxTransport:Lb(Ib),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=m.ajaxSetup({},b),l=k.context||k,n=k.context&&(l.nodeType||l.jquery)?m(l):m.event,o=m.Deferred(),p=m.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!j){j={};while(b=Cb.exec(f))j[b[1].toLowerCase()]=b[2]}b=j[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?f:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return i&&i.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||zb)+"").replace(Ab,"").replace(Fb,yb[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=m.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(c=Gb.exec(k.url.toLowerCase()),k.crossDomain=!(!c||c[1]===yb[1]&&c[2]===yb[2]&&(c[3]||("http:"===c[1]?"80":"443"))===(yb[3]||("http:"===yb[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=m.param(k.data,k.traditional)),Mb(Hb,k,b,v),2===t)return v;h=m.event&&k.global,h&&0===m.active++&&m.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!Eb.test(k.type),e=k.url,k.hasContent||(k.data&&(e=k.url+=(wb.test(e)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=Bb.test(e)?e.replace(Bb,"$1_="+vb++):e+(wb.test(e)?"&":"?")+"_="+vb++)),k.ifModified&&(m.lastModified[e]&&v.setRequestHeader("If-Modified-Since",m.lastModified[e]),m.etag[e]&&v.setRequestHeader("If-None-Match",m.etag[e])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+Jb+"; q=0.01":""):k.accepts["*"]);for(d in k.headers)v.setRequestHeader(d,k.headers[d]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(d in{success:1,error:1,complete:1})v[d](k[d]);if(i=Mb(Ib,k,b,v)){v.readyState=1,h&&n.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,i.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,c,d){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),i=void 0,f=d||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,c&&(u=Ob(k,v,c)),u=Pb(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(m.lastModified[e]=w),w=v.getResponseHeader("etag"),w&&(m.etag[e]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,h&&n.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),h&&(n.trigger("ajaxComplete",[v,k]),--m.active||m.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return m.get(a,b,c,"json")},getScript:function(a,b){return m.get(a,void 0,b,"script")}}),m.each(["get","post"],function(a,b){m[b]=function(a,c,d,e){return m.isFunction(c)&&(e=e||d,d=c,c=void 0),m.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),m._evalUrl=function(a){return m.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},m.fn.extend({wrapAll:function(a){if(m.isFunction(a))return this.each(function(b){m(this).wrapAll(a.call(this,b))});if(this[0]){var b=m(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&1===a.firstChild.nodeType)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return this.each(m.isFunction(a)?function(b){m(this).wrapInner(a.call(this,b))}:function(){var b=m(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=m.isFunction(a);return this.each(function(c){m(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){m.nodeName(this,"body")||m(this).replaceWith(this.childNodes)}).end()}}),m.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0||!k.reliableHiddenOffsets()&&"none"===(a.style&&a.style.display||m.css(a,"display"))},m.expr.filters.visible=function(a){return!m.expr.filters.hidden(a)};var Qb=/%20/g,Rb=/\[\]$/,Sb=/\r?\n/g,Tb=/^(?:submit|button|image|reset|file)$/i,Ub=/^(?:input|select|textarea|keygen)/i;function Vb(a,b,c,d){var e;if(m.isArray(b))m.each(b,function(b,e){c||Rb.test(a)?d(a,e):Vb(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==m.type(b))d(a,b);else for(e in b)Vb(a+"["+e+"]",b[e],c,d)}m.param=function(a,b){var c,d=[],e=function(a,b){b=m.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=m.ajaxSettings&&m.ajaxSettings.traditional),m.isArray(a)||a.jquery&&!m.isPlainObject(a))m.each(a,function(){e(this.name,this.value)});else for(c in a)Vb(c,a[c],b,e);return d.join("&").replace(Qb,"+")},m.fn.extend({serialize:function(){return m.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=m.prop(this,"elements");return a?m.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!m(this).is(":disabled")&&Ub.test(this.nodeName)&&!Tb.test(a)&&(this.checked||!W.test(a))}).map(function(a,b){var c=m(this).val();return null==c?null:m.isArray(c)?m.map(c,function(a){return{name:b.name,value:a.replace(Sb,"\r\n")}}):{name:b.name,value:c.replace(Sb,"\r\n")}}).get()}}),m.ajaxSettings.xhr=void 0!==a.ActiveXObject?function(){return!this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&Zb()||$b()}:Zb;var Wb=0,Xb={},Yb=m.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in Xb)Xb[a](void 0,!0)}),k.cors=!!Yb&&"withCredentials"in Yb,Yb=k.ajax=!!Yb,Yb&&m.ajaxTransport(function(a){if(!a.crossDomain||k.cors){var b;return{send:function(c,d){var e,f=a.xhr(),g=++Wb;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)void 0!==c[e]&&f.setRequestHeader(e,c[e]+"");f.send(a.hasContent&&a.data||null),b=function(c,e){var h,i,j;if(b&&(e||4===f.readyState))if(delete Xb[g],b=void 0,f.onreadystatechange=m.noop,e)4!==f.readyState&&f.abort();else{j={},h=f.status,"string"==typeof f.responseText&&(j.text=f.responseText);try{i=f.statusText}catch(k){i=""}h||!a.isLocal||a.crossDomain?1223===h&&(h=204):h=j.text?200:404}j&&d(h,i,j,f.getAllResponseHeaders())},a.async?4===f.readyState?setTimeout(b):f.onreadystatechange=Xb[g]=b:b()},abort:function(){b&&b(void 0,!0)}}}});function Zb(){try{return new a.XMLHttpRequest}catch(b){}}function $b(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}m.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return m.globalEval(a),a}}}),m.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),m.ajaxTransport("script",function(a){if(a.crossDomain){var b,c=y.head||m("head")[0]||y.documentElement;return{send:function(d,e){b=y.createElement("script"),b.async=!0,a.scriptCharset&&(b.charset=a.scriptCharset),b.src=a.url,b.onload=b.onreadystatechange=function(a,c){(c||!b.readyState||/loaded|complete/.test(b.readyState))&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),b=null,c||e(200,"success"))},c.insertBefore(b,c.firstChild)},abort:function(){b&&b.onload(void 0,!0)}}}});var _b=[],ac=/(=)\?(?=&|$)|\?\?/;m.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=_b.pop()||m.expando+"_"+vb++;return this[a]=!0,a}}),m.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(ac.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&ac.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=m.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(ac,"$1"+e):b.jsonp!==!1&&(b.url+=(wb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||m.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,_b.push(e)),g&&m.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),m.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||y;var d=u.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=m.buildFragment([a],b,e),e&&e.length&&m(e).remove(),m.merge([],d.childNodes))};var bc=m.fn.load;m.fn.load=function(a,b,c){if("string"!=typeof a&&bc)return bc.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=m.trim(a.slice(h,a.length)),a=a.slice(0,h)),m.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(f="POST"),g.length>0&&m.ajax({url:a,type:f,dataType:"html",data:b}).done(function(a){e=arguments,g.html(d?m("<div>").append(m.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,e||[a.responseText,b,a])}),this},m.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){m.fn[b]=function(a){return this.on(b,a)}}),m.expr.filters.animated=function(a){return m.grep(m.timers,function(b){return a===b.elem}).length};var cc=a.document.documentElement;function dc(a){return m.isWindow(a)?a:9===a.nodeType?a.defaultView||a.parentWindow:!1}m.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=m.css(a,"position"),l=m(a),n={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=m.css(a,"top"),i=m.css(a,"left"),j=("absolute"===k||"fixed"===k)&&m.inArray("auto",[f,i])>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),m.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(n.top=b.top-h.top+g),null!=b.left&&(n.left=b.left-h.left+e),"using"in b?b.using.call(a,n):l.css(n)}},m.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){m.offset.setOffset(this,a,b)});var b,c,d={top:0,left:0},e=this[0],f=e&&e.ownerDocument;if(f)return b=f.documentElement,m.contains(b,e)?(typeof e.getBoundingClientRect!==K&&(d=e.getBoundingClientRect()),c=dc(f),{top:d.top+(c.pageYOffset||b.scrollTop)-(b.clientTop||0),left:d.left+(c.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}):d},position:function(){if(this[0]){var a,b,c={top:0,left:0},d=this[0];return"fixed"===m.css(d,"position")?b=d.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),m.nodeName(a[0],"html")||(c=a.offset()),c.top+=m.css(a[0],"borderTopWidth",!0),c.left+=m.css(a[0],"borderLeftWidth",!0)),{top:b.top-c.top-m.css(d,"marginTop",!0),left:b.left-c.left-m.css(d,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||cc;while(a&&!m.nodeName(a,"html")&&"static"===m.css(a,"position"))a=a.offsetParent;return a||cc})}}),m.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c=/Y/.test(b);m.fn[a]=function(d){return V(this,function(a,d,e){var f=dc(a);return void 0===e?f?b in f?f[b]:f.document.documentElement[d]:a[d]:void(f?f.scrollTo(c?m(f).scrollLeft():e,c?e:m(f).scrollTop()):a[d]=e)},a,d,arguments.length,null)}}),m.each(["top","left"],function(a,b){m.cssHooks[b]=La(k.pixelPosition,function(a,c){return c?(c=Ja(a,b),Ha.test(c)?m(a).position()[b]+"px":c):void 0})}),m.each({Height:"height",Width:"width"},function(a,b){m.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){m.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return V(this,function(b,c,d){var e;return m.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?m.css(b,c,g):m.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),m.fn.size=function(){return this.length},m.fn.andSelf=m.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return m});var ec=a.jQuery,fc=a.$;return m.noConflict=function(b){return a.$===m&&(a.$=fc),b&&a.jQuery===m&&(a.jQuery=ec),m},typeof b===K&&(a.jQuery=a.$=m),m});

},{}],5:[function(require,module,exports){
function Event(name) {
    this.name = name;
    this.callbacks = [];
}

Event.prototype.registerCallback = function (callback) {
    this.callbacks.push(callback);
};

function Reactor() {
    this.events = {};
}

Reactor.prototype.registerEvent = function (eventName) {
    var event = new Event(eventName);
    this.events[eventName] = event;
};

Reactor.prototype.dispatchEvent = function (eventName, eventArgs) {
    var return_events = []
    this.events[eventName].callbacks.forEach(function (callback) {
        return_events.push(callback(eventArgs));
    });
    return return_events
};

Reactor.prototype.addEventListener = function (eventName, callback) {
    this.events[eventName].registerCallback(callback);
};

module.exports = Reactor;
},{}],6:[function(require,module,exports){
var d3 = require("./d3.min.v4.js");

d3.sankey = function() {
  var sankey = {},
      nodeWidth = 24,
      nodePadding = 8,
      size = [1, 1],
      nodes = [],
      links = [];

  sankey.nodeWidth = function(_) {
    if (!arguments.length) return nodeWidth;
    nodeWidth = +_;
    return sankey;
  };

  sankey.nodePadding = function(_) {
    if (!arguments.length) return nodePadding;
    nodePadding = +_;
    return sankey;
  };

  sankey.nodes = function(_) {
    if (!arguments.length) return nodes;
    nodes = _;
    return sankey;
  };

  sankey.links = function(_) {
    if (!arguments.length) return links;
    links = _;
    return sankey;
  };

  sankey.size = function(_) {
    if (!arguments.length) return size;
    size = _;
    return sankey;
  };

  sankey.layout = function(iterations) {
    computeNodeLinks();
    computeNodeValues();
    computeNodeBreadths();
    computeNodeDepths(iterations);
    computeLinkDepths();
    return sankey;
  };

  sankey.relayout = function() {
    computeLinkDepths();
    return sankey;
  };

  sankey.link = function() {
    var curvature = .5;

    function link(d) {
      var x0 = d.source.x + d.source.dx,
          x1 = d.target.x,
          xi = d3.interpolateNumber(x0, x1),
          x2 = xi(curvature),
          x3 = xi(1 - curvature),
          y0 = d.source.y + d.sy + d.dy / 2,
          y1 = d.target.y + d.ty + d.dy / 2;
      return "M" + x0 + "," + y0
           + "C" + x2 + "," + y0
           + " " + x3 + "," + y1
           + " " + x1 + "," + y1;
    }

    link.curvature = function(_) {
      if (!arguments.length) return curvature;
      curvature = +_;
      return link;
    };

    return link;
  };

  // Populate the sourceLinks and targetLinks for each node.
  // Also, if the source and target are not objects, assume they are indices.
  function computeNodeLinks() {
    nodes.forEach(function(node) {
      node.sourceLinks = [];
      node.targetLinks = [];
    });
    links.forEach(function(link) {
      var source = link.source,
          target = link.target;
      if (typeof source === "number") source = link.source = nodes[link.source];
      if (typeof target === "number") target = link.target = nodes[link.target];
      source.sourceLinks.push(link);
      target.targetLinks.push(link);
    });
  }

  // Compute the value (size) of each node by summing the associated links.
  function computeNodeValues() {
    nodes.forEach(function(node) {
      node.value = Math.max(
        d3.sum(node.sourceLinks, value),
        d3.sum(node.targetLinks, value)
      );
    });
  }

  // Iteratively assign the breadth (x-position) for each node.
  // Nodes are assigned the maximum breadth of incoming neighbors plus one;
  // nodes with no incoming links are assigned breadth zero, while
  // nodes with no outgoing links are assigned the maximum breadth.
  function computeNodeBreadths() {
    var remainingNodes = nodes,
        nextNodes,
        x = 0;

    while (remainingNodes.length) {
      nextNodes = [];
      remainingNodes.forEach(function(node) {
        node.x = x;
        node.dx = nodeWidth;
        node.sourceLinks.forEach(function(link) {
          if (nextNodes.indexOf(link.target) < 0) {
            nextNodes.push(link.target);
          }
        });
      });
      remainingNodes = nextNodes;
      ++x;
    }

    //
    moveSinksRight(x);
    scaleNodeBreadths((size[0] - nodeWidth) / (x - 1));
  }

  function moveSourcesRight() {
    nodes.forEach(function(node) {
      if (!node.targetLinks.length) {
        node.x = d3.min(node.sourceLinks, function(d) { return d.target.x; }) - 1;
      }
    });
  }

  function moveSinksRight(x) {
    nodes.forEach(function(node) {
      if (!node.sourceLinks.length) {
        node.x = x - 1;
      }
    });
  }

  function scaleNodeBreadths(kx) {
    nodes.forEach(function(node) {
      node.x *= kx;
    });
  }

  function computeNodeDepths(iterations) {
    var nodesByBreadth = d3.nest()
        .key(function(d) { return d.x; })
        .sortKeys(d3.ascending)
        .entries(nodes)
        .map(function(d) { return d.values; });

    //
    initializeNodeDepth();
    resolveCollisions();
    for (var alpha = 1; iterations > 0; --iterations) {
      relaxRightToLeft(alpha *= .99);
      resolveCollisions();
      relaxLeftToRight(alpha);
      resolveCollisions();
    }

    function initializeNodeDepth() {
      var ky = d3.min(nodesByBreadth, function(nodes) {
        return (size[1] - (nodes.length - 1) * nodePadding) / d3.sum(nodes, value);
      });

      nodesByBreadth.forEach(function(nodes) {
        nodes.forEach(function(node, i) {
          node.y = i;
          node.dy = node.value * ky;
        });
      });

      links.forEach(function(link) {
        link.dy = link.value * ky;
      });
    }

    function relaxLeftToRight(alpha) {
      nodesByBreadth.forEach(function(nodes, breadth) {
        nodes.forEach(function(node) {
          if (node.targetLinks.length) {
            var y = d3.sum(node.targetLinks, weightedSource) / d3.sum(node.targetLinks, value);
            node.y += (y - center(node)) * alpha;
          }
        });
      });

      function weightedSource(link) {
        return center(link.source) * link.value;
      }
    }

    function relaxRightToLeft(alpha) {
      nodesByBreadth.slice().reverse().forEach(function(nodes) {
        nodes.forEach(function(node) {
          if (node.sourceLinks.length) {
            var y = d3.sum(node.sourceLinks, weightedTarget) / d3.sum(node.sourceLinks, value);
            node.y += (y - center(node)) * alpha;
          }
        });
      });

      function weightedTarget(link) {
        return center(link.target) * link.value;
      }
    }

    function resolveCollisions() {
      nodesByBreadth.forEach(function(nodes) {
        var node,
            dy,
            y0 = 0,
            n = nodes.length,
            i;

        // Push any overlapping nodes down.
        nodes.sort(ascendingDepth);
        for (i = 0; i < n; ++i) {
          node = nodes[i];
          dy = y0 - node.y;
          if (dy > 0) node.y += dy;
          y0 = node.y + node.dy + nodePadding;
        }

        // If the bottommost node goes outside the bounds, push it back up.
        dy = y0 - nodePadding - size[1];
        if (dy > 0) {
          y0 = node.y -= dy;

          // Push any overlapping nodes back up.
          for (i = n - 2; i >= 0; --i) {
            node = nodes[i];
            dy = node.y + node.dy + nodePadding - y0;
            if (dy > 0) node.y -= dy;
            y0 = node.y;
          }
        }
      });
    }

    function ascendingDepth(a, b) {
      return a.y - b.y;
    }
  }

  function computeLinkDepths() {
    nodes.forEach(function(node) {
      node.sourceLinks.sort(ascendingTargetDepth);
      node.targetLinks.sort(ascendingSourceDepth);
    });
    nodes.forEach(function(node) {
      var sy = 0, ty = 0;
      node.sourceLinks.forEach(function(link) {
        link.sy = sy;
        sy += link.dy;
      });
      node.targetLinks.forEach(function(link) {
        link.ty = ty;
        ty += link.dy;
      });
    });

    function ascendingSourceDepth(a, b) {
      return a.source.y - b.source.y;
    }

    function ascendingTargetDepth(a, b) {
      return a.target.y - b.target.y;
    }
  }

  function center(node) {
    return node.y + node.dy / 2;
  }

  function value(link) {
    return link.value;
  }

  return sankey;
};

},{"./d3.min.v4.js":3}],7:[function(require,module,exports){
var d3 = require("../external/d3.min.v4.js"),
    $ = require("../external/jquery.min.js"),
    json_config = require("../config.js");

function PredictionForm(future_form_selection, graph, reactor) {

    // ** Config
    var thisForm = this;
    thisForm.graph = graph;
    thisForm.reactor = reactor;
    thisForm.config = json_config.QUERY_FORM;

    // ** Model
    thisForm.futureNodes = [1, 2, 3, 4, 5];

    var values = [];
    thisForm.config.nodeAttributes.forEach(function (attr) {
        values.push([attr.name, attr.display]);
    });

    var dataInput = future_form_selection.append("form");

    //- builds form! -
    dataInput.classed("triggerquery", true)
        .attr("id", "queryval");

    var select_attr = dataInput.append("select")
        .classed("styled_form", true)
        .attr("name", "attribute");

    values.forEach(function (value) {
        select_attr.append("option")
            .attr("value", value[0])
            .text(value[1]);
    });

    var future_nodes = dataInput.append("select")
        .classed("styled_form", true)
        .attr("name", "operator");

    thisForm.futureNodes.forEach(function (op) {
        future_nodes.append("option")
            .attr("value", op)
            .text(op);
    });

    dataInput.append("input")
        .classed("styled_form", true)
        .attr("name", "begin_date")
        .attr("type", "text")
        .attr("placeholder", "Start");

    dataInput.append("input")
        .classed("styled_form", true)
        .attr("name", "end_date")
        .attr("type", "text")
        .attr("placeholder", "End");

    dataInput.append("input")
        .classed("styled_form", true)
        .attr("type", "submit");

    $(".triggerquery").bind("submit", function (event) {
        var data = $("#queryval").serializeArray();

        var attr = [data[0].value, data[1].value, data[2].value, data[3].value];

        var posted_data = {
            'nodes': JSON.stringify(thisForm.graph.nodes),
            'edges': JSON.stringify(thisForm.graph.edges),
            'pred_attr': JSON.stringify(attr[0]),
            'future_nodes': JSON.stringify(attr[1]),
            'begin_date': JSON.stringify(attr[2]),
            'end_date': JSON.stringify(attr[3]),
            'id': JSON.stringify(thisForm.config.ID)
        };

        console.log(posted_data);

        $(".content").slideToggle(200);



        $.post("http://localhost:5000/", posted_data, function (data) {

            /***
            var graph = JSON.parse(data);

            graph.pred_attr = attr[0];
            graph.future_nodes = attr[1];
            graph.begin_date = attr[2];
            graph.end_date = attr[3];

            thisForm.reactor.dispatchEvent("query_successful", graph);
            ***/
        });

        event.preventDefault();
    });
}

module.exports = PredictionForm;

},{"../config.js":1,"../external/d3.min.v4.js":3,"../external/jquery.min.js":4}],8:[function(require,module,exports){
var d3 = require("../external/d3.min.v4.js"),
    json_config = require("../config.js");

require("../external/sankey.js");

function PredictionGraph(svg1, svg2, reactor) {

    var thisResult = this;

    thisResult.config = json_config.VIEW_PREDICTION_GRAPH;

    thisResult.svg1text = svg1;
    thisResult.svg2text = svg2;

    thisResult.svg1 = svg1.append("svg")
        .classed("shadow-box", true)
        .classed("grid-svg", true)
        .attr("width", "600px")
        .attr("height", "825px")
        .attr("visibility", "hidden");

    thisResult.svg2 = svg2.append("svg")
        .classed("shadow-box", true)
        .classed("grid-svg", true)
        .attr("width", "600px")
        .attr("height", "825px")
        .attr("visibility", "hidden");

    thisResult.svg = null;
    thisResult.svgtext = null;

    thisResult.start = 0;
    thisResult.queryNumber = 1;

    thisResult.reactor = reactor;
    thisResult.reactor.addEventListener('query_successful', thisResult.updateResult.bind(this));
}

PredictionGraph.prototype.updateResult = function (graph) {

    var thisResult = this;

    var width = parseInt(d3.select("#query-results1 svg").attr("width")) - 10;
    var height = parseInt(d3.select("#query-results1 svg").attr("height")) - 10;

    if (thisResult.start == 0) {
        this.svg = this.svg1;
        this.svgtext = this.svg1text;
    }
    else {
        this.svg = this.svg2;
        this.svgtext = this.svg2text;
    }


    this.svgtext.select("p").remove();

    this.svgtext.insert("p", ":first-child")
        .text("query: " + this.queryNumber.toString() +
              ", attr: "  + graph.pred_attr.toString() +
              ", steps: " + graph.future_nodes.toString() +
              ", time range: [" + graph.begin_date.toString() + "," + graph.end_date.toString() + "]");

    this.svg.attr("visibility","visible");
    this.svg.select("*").remove();

    var svg = this.svg.append("g");

    var sankey = d3.sankey()
        .nodeWidth(25)
        .nodePadding(20)
        .size([width, height]);

    var path = sankey.link();

    sankey.nodes(graph.nodes)
        .links(graph.links)
        .layout(32);

    var units = "individuals";

    var formatNumber = d3.format(",.0f"),    // zero decimal places
        format = function (d) {
            return formatNumber(d) + " " + units;
        };

    // add in the links
    var link = svg.append("g").selectAll(".sankey_link")
        .data(graph.links)
        .enter()
        .append("path")
        .attr("class", "sankey_link")
        .attr("d", path)
        .style("stroke-width", function (d) {
            return Math.max(1, d.dy);
        }).sort(function (a, b) {
            if (a.target.name == -1 || a.source.name == -1) {
                return -1;
            }
            else if (b.target.name == -1 || b.source.name == -1) {
                return 1;
            }
            else {
                return b.dy - a.dy;
            }
        });

    link.each(function (p) {
        if (p.target.name == -1) {
            d3.select(this)
                .attr("visibility", "hidden");
        }
    });

    // add the link titles
    link.append("title")
        .text(function (d) {
            var array = d.source.sourceLinks;
            var value = 0;
            var last = 0;
            array.forEach(function (p) {
                value += p.value;
                if (p.target.name == -1) {
                    last += p.value;
                }
            });
            console.log(d.source.sourceLinks);
            console.log(value);
            console.log(last);

            var round_abs = Math.round((d.value / value) * 10000) / 100;
            var round_rel = Math.round((d.value / (value - last)) * 10000) / 100;


            return thisResult.config.display[d.source.name.toString()].text + " → " +
                thisResult.config.display[d.target.name.toString()].text + "\n" + format(d.value) + "\n" +
                "(" + round_abs + "% of total) \n" +
                "(" + round_rel + "% of taken exams)";
        });

    // add in the nodes
    var node = svg.append("g").selectAll(".sankey_node")
        .data(graph.nodes)
        .enter().append("g")
        .attr("class", "sankey_node")
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

    // add the rectangles for the nodes
    node.append("rect")
        .attr("height", function (d) {
            return d.dy;
        })
        .attr("width", sankey.nodeWidth())
        .style("fill", function (d) {
            return d.color = thisResult.config.display[d.name.toString()].color;
        })
        .style("stroke", function (d) {
            return d3.rgb(d.color).darker(2);
        })
        .append("title")
        .text(function (d) {
            var value = 0;
            var last = 0;
            var array = [];
            var aux = false;
            if (d.sourceLinks.length == 0) {
                array = d.targetLinks;
            }
            else {
                array = d.sourceLinks;
                aux = true;
            }

            if (d.name == -2){
                aux = false;
            }

            array.forEach(function (p) {
                value += p.value;
                if (p.target.name == -1) {
                    last += p.value;
                }
            });

            var round = Math.round((last / value) * 10000) / 100;
            var title = "";

            title += thisResult.config.display[d.name.toString()].text;
            title += "\n";
            title += value.toString() + " Individuals \n";
            if (aux == true) {
                title += last.toString() + " didn't follow up (" + round.toString() + "%)";
            }

            return title;
        });

    // add in the title for the nodes
    node.append("text")
        .attr("x", -6)
        .attr("y", function (d) {
            return d.dy / 2;
        })
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .attr("transform", null)
        .text(function (d) {
            return thisResult.config.display[d.name.toString()].text;
        })
        .filter(function (d) {
            return d.x < width / 2;
        })
        .attr("x", 6 + sankey.nodeWidth())
        .attr("text-anchor", "start");

    node.each(function (p) {
        if (p.name == -1) {
            d3.select(this)
                .attr("visibility", "hidden");
        }
    });

    this.start = (this.start + 1) % 2;
    this.queryNumber += 1;
};

module.exports = PredictionGraph;
},{"../config.js":1,"../external/d3.min.v4.js":3,"../external/sankey.js":6}],9:[function(require,module,exports){
var d3 = require("./external/d3.min.v4.js"),
    QueryForm = require("./query_system/query_form.js"),
    QueryGraph = require("./query_system/query_graph.js"),
    PredictionForm = require("./graph_creator/prediction_form.js"),
    PredictionGraph = require("./graph_creator/prediction_graph.js"),
    Reactor = require("./external/reactor.js");


// Creates reactor pattern
var reactor = new Reactor();

/* ---  Query System --- */

// Register events
reactor.registerEvent('selected_node_changed');
reactor.registerEvent('constraint_added');
reactor.registerEvent('outcome_added');

// Create needed selections
var query_graph_selection = d3.select("#query-interface-graph");
var query_form_selection = d3.select("#query-interface-form");
var query_current_selection = d3.select("#query-interface-current");
var outcomes_form_selection = d3.select("#query-outcomes-form");
var outcomes_current_selection = d3.select("#query-outcomes-current");

// Creates query graph interface
var query_graph = new QueryGraph(query_graph_selection, reactor);

// Creates query form interface
var query_form = new QueryForm(query_form_selection,
    query_current_selection,
    outcomes_form_selection,
    outcomes_current_selection,
    reactor);

/* ---  Prediction System --- */

var future_form_selection = d3.select("#form-future-nodes");

// Creates prediction form interface
var prediction_form = new PredictionForm(future_form_selection, query_graph.graph, reactor);


//reactor.registerEvent('query_successful');

// var future_form_selection = d3.select("#form-future-nodes");
//var prediction_graph_selection1 = d3.select("#query-results1");
//var prediction_graph_selection2 = d3.select("#query-results2");





// Append the svg canvas to the page
// var prediction_graph = new PredictionGraph(prediction_graph_selection1, prediction_graph_selection2, reactor);

},{"./external/d3.min.v4.js":3,"./external/reactor.js":5,"./graph_creator/prediction_form.js":7,"./graph_creator/prediction_graph.js":8,"./query_system/query_form.js":10,"./query_system/query_graph.js":11}],10:[function(require,module,exports){
var d3 = require("../external/d3.min.v4.js"),
    $ = require("../external/jquery.min.js"),
    json_config = require("../config.js");

function FormHandler(qif, qic, qcf, qcc, reactor) {

    var thisForm = this;

    // ** Config
    thisForm.config = json_config.QUERY_SYSTEM;
    thisForm.reactor = reactor;
    thisForm.reactor.addEventListener('selected_node_changed', this.updateForm.bind(this));

    // ** Model
    // constraints forms
    thisForm.qif = qif;
    thisForm.qif.append("p").text("select a node or edge to add constraints");
    thisForm.qic = qic;
    thisForm.qic.append("p").text("select a node to see its constraints");
    thisForm.form = qif.append("form");

    // outcome forms
    thisForm.qcf = qcf;
    thisForm.qcc = qcc;
    thisForm.qcc.append("p").text("outcomes to be inspected will appear here");
    thisForm.outcome = qcf.append("form");
    // get the attributes
    var attributes =thisForm.config.outcomeAttributes;
    make_form(thisForm.outcome, thisForm.qcc, "outcomes", attributes, thisForm, outcome_form_callback)

}

FormHandler.prototype.updateForm = function (element) {

    var thisForm = this;

    // removes everything in the form
    thisForm.form.selectAll("*").remove();
    thisForm.qif.selectAll("p").remove();

    // in case someone just deleted a node, returns
    if (element == undefined) {
        if (thisForm.qic.select("p").empty()) {
            thisForm.qic.append("p").text("select a node to see its constraints");
        }
        thisForm.qif.append("p").text("select a node or edge to add constraints");
        thisForm.qic.select("ul").selectAll("li").remove();
        return;
    }

    // displays all constraints of the element that was selected above the form
    updateConstraints(thisForm, thisForm.qic, element);

    // get the attributes
    var attributes;
    if (element.className == thisForm.config.nodeClass) {
        attributes = thisForm.config.nodeAttributes;
    }
    else {
        attributes = thisForm.config.edgeAttributes;
    }

    make_form(thisForm.form, thisForm.qic, "constraints", attributes, thisForm, constraints_form_callback)
};

function make_form(form, current, name, attributes, thisForm, callback) {
    // form
    form.classed("query_" + name, true)
        .attr("id", "new_" + name);

    // ** FORM Pt1. attr_name **
    var select_attr = form.append("select")
        .classed("styled_form", true)
        .attr("id", "attr_name_" + name)
        .attr("name", "attribute");

    select_attr.append("option")
        .classed("styled_form", true)
        .classed("disabled", true)
        .classed("hidden", true)
        .attr("style", true)
        .text("Select Attribute");

    attributes.forEach(function (op) {
        select_attr.append("option")
            .attr("value", op.name)
            .attr("type", op.type)
            .text(op.display);
    });

    // Dynamic Fields
    $("#attr_name_" + name).change(function () {

        // cleans rest of the form
        d3.select("#oper_field_" + name).remove();
        d3.select("#value_field_" + name).remove();
        d3.select("#submit_query_form_" + name).remove();

        var sel = $("#attr_name_" + name).val();
        var type_name = d3.select("#attr_name_" + name + " [value=" + sel + "]").attr("type");
        var types = thisForm.config.types[type_name];

        // ** FORM Pt2. oper_field **
        var select_oper = form.append("select")
            .classed("styled_form", true)
            .attr("id", "oper_field_" + name)
            .attr("name", "operator");

        types.constraints.forEach(function (op) {
            select_oper.append("option").attr("value", op[0]).text(op[1]);
        });


        // ** FORM Pt3 value_field **

        var select_value = form;

        switch (type_name) {
            case "number":
                select_value.append("input")
                    .classed("styled_form", true)
                    .attr("id", "value_field_" + name)
                    .attr("name", "value")
                    .attr("type", "text")
                    .attr("placeholder", "Value");
                break;

            case "month":
                select_value.append("input")
                    .classed("styled_form", true)
                    .attr("id", "value_field_" + name)
                    .attr("name", "value")
                    .attr("type", "date")
                    .attr("placeholder", "month");
                break;

            case "time_interval":
                select_value.append("input")
                    .classed("styled_form", true)
                    .attr("id", "value_field_" + name)
                    .attr("name", "value")
                    .attr("type", "text")
                    .attr("placeholder", "Value");
                break;

            default:
                select_value = select_value.append("select")
                    .classed("styled_form", true)
                    .attr("id", "value_field_" + name)
                    .attr("name", "value");

                select_value.append("option")
                    .classed("styled_form", true)
                    .classed("disabled", true)
                    .classed("hidden", true)
                    .attr("style", true)
                    .attr("value", "Value");

                var keys = Object.keys(types.values);
                var keys_values = keys.map(function (v) {
                    return [v, types.values[v]];
                });
                console.log(keys_values);
                keys_values.forEach(function (op) {
                    select_value.append("option")
                        .attr("value", op[0])
                        .text(op[1]);
                });
        }

        form.append("input")
            .classed("styled_form", true)
            .attr("id", "submit_query_form_" + name)
            .attr("type", "submit");

    });

    $(".query_" + name).unbind();

    $(".query_" + name).bind("submit", function (event) {
        event.preventDefault();

        var data = $("#new_" + name).serializeArray();
        var attr = [data[0].value, data[1].value, data[2].value];
        var disp = attr_getter("#attr_name_" + name, "#oper_field_" + name, "#value_field_" + name);


        callback(attr, disp, current, thisForm)

    });
}

function outcome_form_callback(attr, disp, current, thisForm){

    var element = thisForm.reactor.dispatchEvent("outcome_added")[0];
    element.outcome_key_op_value.push(attr);
    element.outcome_display_value.push(disp);
    current.selectAll("p").remove();
    var list = current.select("ul");

    list.selectAll("li").remove();

    list.selectAll("li")
        .data(element.outcome_display_value)
        .enter()
        .append("li")
        .text(function (d, i) {
            return d;
        })
        .on("click", function () {
            var value = d3.select(this).data()[0];
            var graph = element;
            var index = graph.outcome_display_value.indexOf(value);
            graph.outcome_key_op_value.splice(index, 1);
            graph.outcome_display_value.splice(index, 1);
            d3.select(this).remove();
        });
}

function constraints_form_callback(attr, disp, current, thisForm) {
    var element = d3.select(".selected").data()[0];
    element.key_op_value.push(attr);
    element.display_value.push(disp);
    current.selectAll("p").remove();
    updateConstraints(thisForm, current, element);
    thisForm.reactor.dispatchEvent("constraint_added");
}

function updateConstraints(form, current, element) {

    var list = current.select("ul");

    list.selectAll("li").remove();

    list.selectAll("li")
        .data(element.display_value)
        .enter()
        .append("li")
        .text(function (d, i) {
            return d;
        })
        .on("click", function () {
            var value = d3.select(this).data()[0];
            var node = d3.select(".selected").data()[0];
            var index = node.display_value.indexOf(value);
            node.key_op_value.splice(index, 1);
            node.display_value.splice(index, 1);
            d3.select(this).remove();
            form.reactor.dispatchEvent("constraint_added");
        });
}


function attr_getter(id, oper, val) {
    var aux = $(id).val();
    var id_text = d3.select(id + " [value='" + aux + "']").text();

    var type_name = d3.select(id + " [value=" + aux + "]").attr("type");

    aux = $(oper).val();
    var oper_text = d3.select(oper + " [value='" + aux + "']").text();

    if (type_name == "month" || type_name == "number") {
        return id_text + " " + oper_text + " " + $(val).val();
    }

    aux = $(val).val();
    var value_text = d3.select(val + " [value='" + aux + "']").text();

    return id_text + " " + oper_text + " " + value_text;
}

module.exports = FormHandler;

},{"../config.js":1,"../external/d3.min.v4.js":3,"../external/jquery.min.js":4}],11:[function(require,module,exports){
var d3 = require("../external/d3.min.v4.js"),
    utils = require("./utils.js"),
    json_config = require("../config.js");

function GC(query_interface_selection, reactor) {

    var thisGraph = this;

    // -- Config
    thisGraph.idct = 0;
    thisGraph.aspect = [0, 0, 1600, 600];
    thisGraph.selectedSvgID = -1;
    thisGraph.reactor = reactor;
    thisGraph.reactor.addEventListener('constraint_added', this.updateGraph.bind(this));
    thisGraph.reactor.addEventListener('outcome_added', this.getGraph.bind(this));
    thisGraph.config = json_config.QUERY_SYSTEM;

    // -- Model
    thisGraph.graph = {};
    thisGraph.graph.nodes = [];
    thisGraph.graph.edges = [];
    thisGraph.graph.future_nodes = 0;
    thisGraph.graph.prediction_attr = "None";
    thisGraph.graph.id_attr = "None";
    thisGraph.graph.outcome_key_op_value = [];
    thisGraph.graph.outcome_display_value = [];


    // -- View
    // svg
    thisGraph.svg = query_interface_selection.append("svg")
        .attr("viewBox", thisGraph.aspect[0] + " " +
            thisGraph.aspect[1] + " " +
            thisGraph.aspect[2] + " " +
            thisGraph.aspect[3])
        .attr("preserveAspectRatio", "xMinYMin meet");

    // graph
    thisGraph.svgG = thisGraph.svg.append("g")
        .classed(thisGraph.config.graphClass, true);
    // nodes
    thisGraph.vis_nodes = thisGraph.svgG.append("g")
        .classed(thisGraph.config.nodesClass, true);
    // edges
    thisGraph.vis_edges = thisGraph.svgG.append("g")
        .classed(thisGraph.config.edgesClass, true);
    // node text
    thisGraph.vis_node_text = thisGraph.svgG.append("g")
        .classed(thisGraph.config.innerTextNodeClass, true);
    // edge text
    thisGraph.vis_edge_text = thisGraph.svgG.append("g")
        .classed(thisGraph.config.innerTextEdgeClass, true);
    // node constraint text
    thisGraph.vis_node_c_text = thisGraph.svgG.append("g")
        .classed(thisGraph.config.outerTextNodeClass, true);
    // edge constraint text
    thisGraph.vis_edge_c_text = thisGraph.svgG.append("g")
        .classed(thisGraph.config.outerTextEdgeClass, true);
    // marker
    var defs = thisGraph.svg.append('svg:defs');
    defs.append('svg:marker')
        .attr('id', 'end-arrow').attr('viewBox', '0 -5 10 10')
        .attr('refX', 8.5).attr('markerWidth', 3.5)
        .attr('markerHeight', 3.5).attr('orient', 'auto')
        .append('svg:path').attr('d', 'M0,-5L10,0L0,5');

    // ** Effects
    // mouse down on
    thisGraph.svg.on("mousedown", function (d) {
        GC.prototype.svgMouseDown.call(thisGraph);
    });
    // key down on window
    d3.select(window).on("keydown", function () {
        if (d3.event.shiftKey) {
            thisGraph.svgKeyDown.call(thisGraph);
        }
    });
    // drag
    thisGraph.drag = d3.drag().on("drag", function (d) {

        var tmp_x = d.x + d3.event.dx,
            tmp_y = d.y + d3.event.dy,
            radius = thisGraph.config.nodeRadius,
            aspect = thisGraph.aspect,
            nodes = thisGraph.graph.nodes,
            node = d;

        var can_move = utils.canDo(tmp_x, tmp_y, radius, aspect, nodes, node);

        if (can_move) {
            d.x += d3.event.dx;
            d.y += d3.event.dy;
            thisGraph.updateGraph();
        }
    });
}

//- Node behaviour -
GC.prototype.addNode = function (coordinates) {
    var thisGraph = this;
    var node = new utils.Node(coordinates, thisGraph.idct);
    thisGraph.graph.nodes.push(node);
    thisGraph.idct += 1;
    thisGraph.updateGraph();
};

GC.prototype.nodeMouseDown = function (svg_element) {
    var thisGraph = this;
    d3.event.stopPropagation();
    var p_selected = d3.select(".selected").data();

    if (d3.event.shiftKey && p_selected.length != 0) {
        var n_selected = d3.select(svg_element).data();

        var aux = thisGraph.graph.edges.filter(function (a) {
            return ((a.source == p_selected[0].name) &&
                (a.destination == n_selected[0].name)) ||
                ((a.source == n_selected[0].name) &&
                (a.destination == p_selected[0].name))
        });

        if (aux.length == 0) {
            if (d3.event.ctrlKey) {
                console.log("adsfaad");
                thisGraph.addEdge(p_selected[0], n_selected[0], "undirected");
            }
            else {
                thisGraph.addEdge(p_selected[0], n_selected[0], "directed");
            }
        }
    }
    else {
        thisGraph.replaceSelected(svg_element);
    }
};

// - Edge behaviour -
GC.prototype.addEdge = function (src, dst, kind) {
    var thisGraph = this;
    var edge = new utils.Edge(src, dst, thisGraph.idct, kind);
    thisGraph.graph.edges.push(edge);
    thisGraph.idct += 1;
    thisGraph.updateGraph();
};

GC.prototype.edgeMouseDown = function (svg_element) {
    var thisGraph = this;
    d3.event.stopPropagation();
    thisGraph.replaceSelected(svg_element);
};

// - SVG Behaviour
GC.prototype.svgMouseDown = function () {
    var thisGraph = this;
    if (d3.event.shiftKey) {
        var coordinates = d3.mouse(thisGraph.svg.node());

        var tmp_x = coordinates[0],
            tmp_y = coordinates[1],
            radius = thisGraph.config.nodeRadius,
            aspect = thisGraph.aspect,
            nodes = thisGraph.graph.nodes;

        var can_create = utils.canDo(tmp_x, tmp_y, radius, aspect, nodes);

        if (can_create) {
            thisGraph.addNode(coordinates);
        }
    }
};

GC.prototype.svgKeyDown = function () {
    var thisGraph = this;
    var nodes = thisGraph.graph.nodes;
    var edges = thisGraph.graph.edges;

    switch (d3.event.keyCode) {
        case thisGraph.config.delete:
            // - deletes a node/edge -
            var selected = d3.select(".selected").data();
            if (selected.length == 0) {
                break;
            }
            var sel_id = selected[0].id;
            nodes = nodes.filter(function (a) {
                return a.id !== sel_id
            });
            edges = edges.filter(function (a) {
                return (a.id !== sel_id) &&
                    (a.src.id !== sel_id) &&
                    (a.dst.id !== sel_id);
            });

            thisGraph.graph.nodes = nodes;
            thisGraph.graph.edges = edges;
            thisGraph.selectedSvgID = -1;
            thisGraph.updateGraph();
            thisGraph.reactor.dispatchEvent("selected_node_changed", undefined);

    }
};

// - General Behaviour
GC.prototype.replaceSelected = function (svg_element) {
    var thisGraph = this;
    var svg_d = d3.select(svg_element).data()[0];
    var svg_id = svg_d.id;
    d3.select(".selected").classed("selected", false);
    d3.select(svg_element).classed("selected", true);
    thisGraph.selectedSvgID = svg_id;

    thisGraph.reactor.dispatchEvent("selected_node_changed", svg_d);
};

GC.prototype.updateGraph = function () {

    var thisGraph = this;

    // -- Nodes --
    var nodes = thisGraph.svg
        .select("g." + thisGraph.config.nodesClass)
        .selectAll("g." + thisGraph.config.nodeClass);
    var data = thisGraph.graph.nodes;
    // - enter
    var aux = nodes.data(data, function (d) {
        return d.name;
    }).enter()
        .append("g")
        .classed(thisGraph.config.nodeClass, true)
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        })
        .on("mousedown", function (d) {
            thisGraph.nodeMouseDown(this)
        })
        .call(thisGraph.drag);
    aux.append("circle")
        .attr("r", String(thisGraph.config.nodeRadius));

    // - update
    nodes.data(data, function (d) {
        return d.name;
    })
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
    // - exit
    nodes.data(data, function (d) {
        return d.name;
    })
        .exit()
        .remove();

    // -- InText/Nodes--
    var text = thisGraph.svg
        .select("g." + thisGraph.config.innerTextNodeClass)
        .selectAll("text");
    var data = thisGraph.graph.nodes;
    // -- enter
    var aux = text.data(data, function (d) {
        return d.name;
    }).enter()
        .append("text")
        .attr("x", function (d) {
            return d.x
        })
        .attr("y", function (d) {
            return d.y
        })
        .attr("text-anchor", "middle")
        .text(function (d) {
            return d.name;
        });
    // -- update
    text.data(data, function (d) {
        return d.name;
    }).attr("x", function (d) {
        return d.x
    })
        .attr("y", function (d) {
            return d.y
        });
    // -- exit
    text.data(data, function (d) {
        return d.name;
    }).exit()
        .remove();

    // -- OutText/Nodes --
    var text = thisGraph.svg
        .select("g." + thisGraph.config.outerTextNodeClass)
        .selectAll("text");
    var data = thisGraph.graph.nodes;
    // -- enter
    var aux = text.data(data, function (d) {
        return d.name;
    }).enter()
        .append("text")
        .attr("x", function (d) {
            return d.x
        })
        .attr("y", function (d) {
            return d.y
        })
        .attr("text-anchor", "middle");

    // -- update
    var aux = text.data(data, function (d) {
        return d.name;
    }).attr("x", function (d) {
        return d.x
    })
        .attr("y", function (d) {
            return d.y + 50
        })
        .html(function (d) {
            var string = "";
            var x = d.x;
            d.key_op_value.forEach(function (d) {
                string += "<tspan x=" + x + " dy=\"1.2em\">" + d[0] + d[1] + d[2] + "<\/tspan>";
            });
            return string;
        });
    // -- exit
    text.data(data, function (d) {
        return d.name;
    }).exit()
        .remove();

    // -- Edges --
    var edges = thisGraph.svg
        .select("g." + thisGraph.config.edgesClass)
        .selectAll("g." + thisGraph.config.edgeClass);
    var data = thisGraph.graph.edges;
    // - enter
    var aux = edges.data(data, function (d) {
        return d.name;
    }).enter()
        .append("g")
        .classed(thisGraph.config.edgeClass, true)
        .on("mousedown", function (d) {
            thisGraph.edgeMouseDown(this)
        });
    aux.append("path")
        .style('marker-end', function (d) {
            if (d.kind == "directed") {
                return 'url(#end-arrow)'
            }
            else return 'none';
        })
        .attr("d", function (d) {
            return utils.calcEdgePath(d, thisGraph.config.nodeRadius);
        })
        .classed("link", true);
    // - update
    edges.data(data, function (d) {
        return d.name;
    })
        .selectAll("path")
        .attr("d", function (d) {
            return utils.calcEdgePath(d, thisGraph.config.nodeRadius);
        });
    // - exit
    edges.data(data, function (d) {
        return d.name;
    })
        .exit()
        .remove();


    // -- InText/Edges--
    var text = thisGraph.svg
        .select("g." + thisGraph.config.innerTextEdgeClass)
        .selectAll("text");
    var data = thisGraph.graph.edges;
    var modifier = -10;
    // -- enter
    var aux = text.data(data, function (d) {
        return d.name;
    }).enter()
        .append("text")
        .attr("x", function (d) {
            return utils.calcTextEdgePath(d, thisGraph.config.nodeRadius, modifier)[0];
        })
        .attr("y", function (d) {
            return utils.calcTextEdgePath(d, thisGraph.config.nodeRadius, modifier)[1];
        })
        .attr("text-anchor", "middle")
        .text(function (d) {
            return " " + d.name + " ";
        });
    // -- update
    text.data(data, function (d) {
        return d.name;
    }).attr("x", function (d) {
        return utils.calcTextEdgePath(d, thisGraph.config.nodeRadius, modifier)[0];
    })
        .attr("y", function (d) {
            return utils.calcTextEdgePath(d, thisGraph.config.nodeRadius, modifier)[1];
        });
    // -- exit
    text.data(data, function (d) {
        return d.name;
    }).exit()
        .remove();


    // -- OutText/Edges --
    var text = thisGraph.svg
        .select("g." + thisGraph.config.outerTextEdgeClass)
        .selectAll("text");
    var data = thisGraph.graph.edges;
    var modifier = 15;
    // -- enter
    var aux = text.data(data, function (d) {
        return d.name;
    }).enter()
        .append("text")
        .attr("x", function (d) {
            return utils.calcTextEdgePath(d, thisGraph.config.nodeRadius, modifier)[0];
        })
        .attr("y", function (d) {
            return utils.calcTextEdgePath(d, thisGraph.config.nodeRadius, modifier)[1];
        })
        .attr("text-anchor", "middle");

    // -- update
    var aux = text.data(data, function (d) {
        return d.name;
    }).attr("x", function (d) {
        return utils.calcTextEdgePath(d, thisGraph.config.nodeRadius, modifier)[0];
    })
        .attr("y", function (d) {
            return utils.calcTextEdgePath(d, thisGraph.config.nodeRadius, modifier)[1];
        })
        .html(function (d) {
            var string = "";
            var x = utils.calcTextEdgePath(d, thisGraph.config.nodeRadius, modifier)[0].toString();
            d.key_op_value.forEach(function (d) {
                string += "<tspan x=" + x + " dy=\"1.2em\">" + d[0] + d[1] + d[2] + "<\/tspan>";
            });
            return string;
        });
    // -- exit
    text.data(data, function (d) {
        return d.name;
    }).exit()
        .remove();
};

GC.prototype.getGraph = function () {
    var thisGraph = this;
    return thisGraph.graph;
};

module.exports = GC;

},{"../config.js":1,"../external/d3.min.v4.js":3,"./utils.js":12}],12:[function(require,module,exports){
var json_config = require("../config.js");

function canDo(tmp_x, tmp_y, radius, aspect, nodes, node) {

    var can = true;

    if (radius + tmp_x > aspect[2] ||
        tmp_x - radius < aspect[0] ||
        radius + tmp_y > aspect[3] ||
        tmp_y - radius < aspect[1]) {
        can = false;
    }

    nodes.forEach(function (n) {
        var dist = Math.sqrt(Math.pow(tmp_x - n.x, 2) + Math.pow(tmp_y - n.y, 2));
        console.log(dist);

        if (dist <= 2 * radius && (typeof node == "undefined" || node.id != n.id)) {
            can = false;
        }
    });

    return can;
}

function internalCalc(d, consts) {
    var vx = d.dst.x - d.src.x;
    var vy = d.dst.y - d.src.y;
    var norm = Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2));
    vx = vx / norm;
    vy = vy / norm;
    var pos_xs = d.src.x + vx * consts;
    var pos_ys = d.src.y + vy * consts;
    var pos_xd = d.dst.x - vx * consts;
    var pos_yd = d.dst.y - vy * consts;
    return [pos_xd, pos_xs, pos_yd, pos_ys];
}

function calcTextEdgePath(d, consts, mod) {
    var result = internalCalc(d, consts);
    return [(result[0] + result[1]) / 2, (result[2] + result[3]) / 2 + mod];
}

function calcEdgePath(d, consts) {
    var result = internalCalc(d, consts);
    return "M" + result[1] + " " + result[3] + " L" + result[0] + " " + result[2];
}

function Node(coordinates, id) {
    this.className = "Node";
    this.name = "n" + id;
    this.label = "Event";
    this.key_op_value = [];
    this.display_value = [];
    this.x = coordinates[0];
    this.y = coordinates[1];
    this.id = id;
}

function Edge(src, dst, id, kind) {
    var thisEdge = this;
    this.className = "Edge";
    this.name = "e" + id;
    this.label = "";
    this.source = src.name;
    this.destination = dst.name;
    this.key_op_value = [];
    this.display_value = [];
    this.kind = kind;
    this.src = src;
    this.dst = dst;
    this.id = id;
}

module.exports = {
    Node: Node,
    Edge: Edge,
    calcEdgePath: calcEdgePath,
    calcTextEdgePath: calcTextEdgePath,
    canDo: canDo
};
},{"../config.js":1}]},{},[9]);
