(this.webpackJsonpcovaccination=this.webpackJsonpcovaccination||[]).push([[0],{13:function(e,t,n){},15:function(e,t,n){},18:function(e,t,n){"use strict";n.r(t);var c=n(1),i=n.n(c),a=n(6),s=n.n(a),r=(n(13),n(8)),l=n(5),o=n.n(l),d=n(7),u=n(2);n(15);function j(e,t){var n=e;if(void 0!==t){var c=Object.keys(t).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(t[e])})).join("&");n="".concat(e,"?").concat(c)}return fetch(n).then((function(e){return e.json()}))}var f=function(e,t){return j("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict",{district_id:e,date:t})},b=n(3),h=n.n(b),v=n(0),m=function(e){var t=Object(c.useState)(e),n=Object(u.a)(t,2),i=n[0],a=n[1];return[i,a,function(e){return!i||e}]};var p=function(e){var t=e.vaccineCenter,n=e.checkUnder45Filter,c=e.checkAvailabilityFilter,i=t.name,a=t.block_name,s=t.pincode,l=t.fee_type,o=t.sessions.filter((function(e){return c(e.available_capacity>0)})).filter((function(e){return n(e.min_age_limit<45)}));return Object(v.jsxs)("div",{className:"flexColumn flexStart flex1 vaccine-center",children:[Object(v.jsxs)("div",{className:"flexRow spaceBetween flex1",style:{width:"100%"},children:[Object(v.jsx)("p",{style:{fontSize:16,fontWeight:"bold"},children:i}),Object(v.jsx)("p",{style:{fontSize:16,fontWeight:"bold",color:"red"},children:l})]}),Object(v.jsxs)("p",{style:{fontSize:12,color:"#2F2F2F"},children:[a," ( ",s," )"]}),o.map((function(e){return Object(v.jsx)(O,Object(r.a)({},e))}))]})},O=function(e){var t=e.min_age_limit,n=e.available_capacity,c=e.slots,i=e.date,a=n>0?Object(v.jsx)("p",{className:"availableSlot",children:"".concat(n," Slots \u2705")}):Object(v.jsx)("p",{className:"notAvailableSlot",children:"Not Available \u274c"}),s=t<45?"\ud83d\udc66\ud83c\udffb":"\ud83e\uddd3\ud83c\udffc";return Object(v.jsxs)("div",{className:"vaccine-session flexColumn flexStart",children:[Object(v.jsxs)("div",{className:"flexRow spaceBetween flex1",style:{width:"100%"},children:[Object(v.jsxs)("p",{style:{fontSize:12,fontWeight:"bold"},children:[i," ",s]}),a]}),Object(v.jsx)("div",{className:"flexRow vaccine-slot",children:c.map((function(e){return Object(v.jsx)("p",{className:"slotTime",children:e})}))})]})},x=function(){var e="DD-MM-YYYY",t=Object(c.useState)([]),n=Object(u.a)(t,2),i=n[0],a=n[1],s=Object(c.useState)([]),r=Object(u.a)(s,2),l=r[0],b=r[1],O=Object(c.useState)({state_id:"36",state_name:"West Bengal"}),x=Object(u.a)(O,2),_=x[0],S=x[1],g=Object(c.useState)({district_id:"730",district_name:"North 24 Parganas"}),C=Object(u.a)(g,2),N=C[0],y=C[1],w=Object(c.useState)([]),F=Object(u.a)(w,2),k=F[0],R=F[1],A=Object(c.useState)(h()().format(e)),B=Object(u.a)(A,2),D=B[0],I=(B[1],m(!1)),P=Object(u.a)(I,3),U=(P[0],P[1],P[2]),z=m(!0),W=Object(u.a)(z,3),Y=(W[0],W[1],W[2]);Object(c.useEffect)((function(){var t=new URLSearchParams(window.location.search),n=t.get("district_id"),c=t.get("pincode");h()().format(e);j("https://cdn-api.co-vin.in/api/v2/admin/location/states").then((function(e){return a(e.states)})),null!=c&&function(e,t){return j("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin",{pincode:e,date:t})}(c,D).then((function(e){return R(e.centers)})),null!=n&&f(n,D).then((function(e){return R(e.centers)}))}),[]);var E=function(){var t=Object(d.a)(o.a.mark((function t(){var n;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:N&&(n=h()().format(e),f(N.district_id,n).then((function(e){return R(e.centers)})));case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),L=k.filter((function(e){return Y(e.sessions.some((function(e){return e.available_capacity>0})))})).filter((function(e){return U(e.sessions.some((function(e){return e.min_age_limit<45})))}));return Object(v.jsxs)("div",{className:"App flexColumn",children:[Object(v.jsx)("header",{className:"flexRow",children:Object(v.jsxs)("div",{className:"flexColumn flexCenter",children:[Object(v.jsx)("p",{id:"title",children:"COVID VACCINES \ud83d\udc89"}),Object(v.jsx)("p",{id:"subtitle",children:"Check your nearest vaccine centers and slot availability"})]})}),Object(v.jsxs)("div",{className:"search flexColumn spaceAround",children:[Object(v.jsxs)("div",{className:"select-container",children:[Object(v.jsx)("label",{htmlFor:"states",children:"Select State:"}),Object(v.jsx)("select",{name:"states",onChange:function(e){var t,n=i.find((function(t){return t.state_id==e.target.value}));void 0!=n&&n.state_id!==_.state_id&&(S(n),(t=n.state_id,j("https://cdn-api.co-vin.in/api/v2/admin/location/districts/".concat(t))).then((function(e){return b(e.districts)})))},children:i.map((function(e){return Object(v.jsx)("option",{value:e.state_id,children:e.state_name})}))})]}),Object(v.jsxs)("div",{className:"select-container",children:[Object(v.jsx)("label",{htmlFor:"districts",children:"Select District:"}),Object(v.jsx)("select",{name:"districts",onChange:function(e){var t=l.find((function(t){return t.district_id==e.target.value}));void 0!==t&&t.district_id!==N.district_id&&y(t)},children:l.map((function(e){return Object(v.jsx)("option",{value:e.district_id,children:e.district_name})}))})]}),Object(v.jsx)("button",{onClick:E,children:"Search"})]}),Object(v.jsx)("div",{className:"flexColumn list-container",children:L.length>0?L.map((function(e){return Object(v.jsx)(p,{vaccineCenter:e,checkAvailabilityFilter:Y,checkUnder45Filter:U})})):Object(v.jsx)("div",{className:"error",children:"No Results found"})})]})},_=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,19)).then((function(t){var n=t.getCLS,c=t.getFID,i=t.getFCP,a=t.getLCP,s=t.getTTFB;n(e),c(e),i(e),a(e),s(e)}))};s.a.render(Object(v.jsx)(i.a.StrictMode,{children:Object(v.jsx)(x,{})}),document.getElementById("root")),_()}},[[18,1,2]]]);
//# sourceMappingURL=main.b96be556.chunk.js.map