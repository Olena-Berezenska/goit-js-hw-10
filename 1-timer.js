import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{f as u,i as S}from"./assets/vendor-BZoxUzx5.js";const r={DateInput:document.querySelector("#datetime-picker"),StartBtn:document.querySelector("[data-start]"),ClockFace:document.querySelector(".timer")};r.StartBtn.disabled=!0;const c={intervalId:null,userSelectedDate:null,selectData(){const t={enableTime:!0,time_24hr:!0,minuteIncrement:1,onClose(e){e.length!==0&&(e[0]<=Date.now()?(S.error({title:"Hey",message:"Please choose a date in the future",position:"topRight"}),r.StartBtn.disabled=!0):(c.userSelectedDate=e[0],console.log("Selected date:",this.userSelectedDate),r.StartBtn.disabled=!1))}};u(r.DateInput,t)},start(){console.log("Start"),this.intervalId=setInterval(()=>{this.tick()},1e3),r.StartBtn.disabled=!0,r.DateInput.disabled=!0},tick(){const t=Date.now(),e=this.userSelectedDate.getTime()-t;if(e<=0){this.stop();return}const n=m(e),o=f(n);console.log(o),Object.entries(o).forEach(([s,i])=>{const a=r.ClockFace.querySelector(`[data-${s}]`);a&&(a.textContent=i)})},stop(){clearInterval(this.intervalId),r.StartBtn.disabled=!1,r.DateInput.disabled=!1}};c.selectData();r.StartBtn.addEventListener("click",()=>{c.start()});function m(t){const i=Math.floor(t/864e5),a=Math.floor(t%864e5/36e5),l=Math.floor(t%864e5%36e5/6e4),d=Math.floor(t%864e5%36e5%6e4/1e3);return{days:i,hours:a,minutes:l,seconds:d}}function f({days:t,hours:e,minutes:n,seconds:o}){return t=t>99?t.toString().padStart(3,"0"):t.toString().padStart(2,"0"),e=e.toString().padStart(2,"0"),n=n.toString().padStart(2,"0"),o=o.toString().padStart(2,"0"),{days:t,hours:e,minutes:n,seconds:o}}
//# sourceMappingURL=1-timer.js.map
