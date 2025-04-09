(function() {
function hexToHsv(hex) {
  hex = hex.replace("#", "");

  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, v = max;

  const d = max - min;
  s = max === 0 ? 0 : d / max;

  if (max === min) {
    h = 0;
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100) / 100,
    v: Math.round(v * 100) / 100
  };
}
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "https://cdn.jsdelivr.net/gh/mdbassit/Coloris@latest/dist/coloris.min.css";
document.head.appendChild(link);
const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/gh/mdbassit/Coloris@latest/dist/coloris.min.js";
document.head.appendChild(script);
const box = document.createElement("div");
box.id = "div";
document.body.appendChild(box);
const div = document.getElementById("div");
div.style.margin = "auto";
div.style.width = "50%";
div.style.border = "3px solid green";
div.style.padding = "10px";
div.style.position = "relative";
div.style.zIndex = "999999999999999999999999999999999999";
div.style.background = "white";
let element = document.createElement("button");
element.style.position = "absolute";
element.style.right = "10px";
element.style.top = "5px";
element.innerText = "x";
element.onclick = function() {
document.body.removeChild(div);
}
div.appendChild(element);
element = document.createElement("h3");
element.innerText = "Tools";
div.appendChild(element);
element = document.createElement("p");
element.id = "divDisplay";
div.appendChild(element);
const display = document.getElementById("divDisplay");
element = document.createElement("button");
element.innerText = "get graph state";
element.onclick = function() {
display.innerText = "copied to clipboard"
navigator.clipboard.writeText(JSON.stringify(window.Calc.getState()));
}
div.appendChild(element);
element = document.createElement("button");
element.innerText = "set graph state";
element.onclick = function() {
window.Calc.setState(prompt());
}
div.appendChild(element);
element = document.createElement("button");
element.innerText = "Change slider time";
element.onclick = function() {
window.onclick = function() {
if(window.Calc.selectedExpressionId == null) {}
else {
Calc.controller.dispatch({
            id: window.Calc.selectedExpressionId,
            type: 'set-slider-animationperiod',
            animationPeriod: prompt()
});
window.onclick = function() {}
}
}
}
div.appendChild(element);
element = document.createElement("button");
element.innerText = "Add color to project";
let colorIndex = 1;
element.onclick = function() {
element.style.display = "none"
let input = document.createElement("input");
input.setAttribute("data-coloris", "");
input.id = "divNewColor";
div.appendChild(input);
let dismiss = document.createElement("button");
dismiss.innerText = "done";
dismiss.onclick = function() {
element.style.display = "block"
const { h, s, v } = hexToHsv(input.value);
const latex = `c_{bkUa1TDUdDC2fCqhfhvJ${colorIndex}} = \\operatorname{hsv}\\left(${h}, ${s}, ${v}\\right)`;
const eqId = `color${colorIndex}`;
window.Calc.setExpression({
    id: eqId,
    latex: latex,
    color: input.value,
    secret: true
  });
div.removeChild(input);
div.removeChild(dismiss);
colorIndex++;
}
div.appendChild(dismiss);
}
div.appendChild(element);
})();
