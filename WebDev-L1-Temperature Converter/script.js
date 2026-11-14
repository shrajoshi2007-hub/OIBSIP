(function () {
  var NAMES = { C: "°C", F: "°F", K: "K" };
  var ORDER = ["C", "F", "K"];
  var MIN_C = -273.15;
  var input = document.getElementById("value");
  var unitSel = document.getElementById("unit");
  var err = document.getElementById("err");
  var btn = document.getElementById("convert");
  var note = document.getElementById("note");
  var swapBtn = document.getElementById("swap");
  var outs = [
    { n: document.getElementById("n1"), l: document.getElementById("l1"), c: document.getElementById("c1") },
    { n: document.getElementById("n2"), l: document.getElementById("l2"), c: document.getElementById("c2") }
  ];
  var NUMBER_RE = /^[+-]?(\d+\.?\d*|\.\d+)$/;

  function toCelsius(v, u) { return u === "C" ? v : u === "F" ? (v - 32) * 5 / 9 : v - 273.15; }
  function fromCelsius(c, u) { return u === "C" ? c : u === "F" ? c * 9 / 5 + 32 : c + 273.15; }
  function fmt(x) {
    var r = Math.round(x * 100) / 100;
    if (Object.is(r, -0)) r = 0;
    return r.toLocaleString("en-US", { maximumFractionDigits: 2 });
  }
  function floorFor(u) { return fromCelsius(MIN_C, u); }

  // Returns {ok, value, msg}
  function validate() {
    var raw = input.value.trim();
    if (raw === "") return { ok: false, empty: true, msg: "Enter a temperature to convert." };
    if (!NUMBER_RE.test(raw)) return { ok: false, msg: "Numbers only, please. Use digits, one decimal point and an optional minus sign." };
    var v = parseFloat(raw);
    if (!isFinite(v)) return { ok: false, msg: "That number is too large to convert." };
    var u = unitSel.value;
    if (toCelsius(v, u) < MIN_C - 1e-9) {
      return { ok: false, msg: "Below absolute zero. The lowest possible value is " + fmt(floorFor(u)) + " " + NAMES[u] + "." };
    }
    return { ok: true, value: v };
  }

  function showError(msg) {
    err.textContent = msg || "";
    err.classList.toggle("show", !!msg);
    input.setAttribute("aria-invalid", msg ? "true" : "false");
  }

  function setLabels() {
    var u = unitSel.value;
    document.body.setAttribute("data-unit", u);
    var others = ORDER.filter(function (x) { return x !== u; });
    outs.forEach(function (o, i) { o.l.textContent = NAMES[others[i]]; o.l.dataset.unit = others[i]; });
  }

  function clearResults() {
    outs.forEach(function (o) {
      o.n.textContent = "–"; o.n.classList.add("empty");
      o.raw = null; o.c.disabled = true;
    });
  }

  function convert() {
    var r = validate();
    if (!r.ok) { showError(r.msg); clearResults(); note.textContent = ""; return; }
    showError("");
    var c = toCelsius(r.value, unitSel.value);
    outs.forEach(function (o) {
      var val = fromCelsius(c, o.l.dataset.unit);
      o.n.textContent = fmt(val);
      o.n.classList.remove("empty");
      o.raw = String(Math.round(val * 100) / 100).replace(/^-0$/, "0");
      o.c.disabled = false;
    });
    note.textContent = fmt(r.value) + " " + NAMES[unitSel.value] + " converted.";
  }

  // Real-time validation while typing (no calculation until Convert)
  input.addEventListener("input", function () {
    var r = validate();
    showError(r.ok || r.empty ? "" : r.msg);
    btn.disabled = !r.ok;
    if (!r.ok) { clearResults(); note.textContent = r.empty ? "Type a number, then press Convert." : ""; }
    else note.textContent = "Looks good. Press Convert.";
  });
  unitSel.addEventListener("change", function () {
    setLabels(); clearResults();
    var r = validate();
    showError(r.ok || r.empty ? "" : r.msg);
    btn.disabled = !r.ok;
    note.textContent = r.ok ? "Unit changed. Press Convert." : "";
  });
  btn.addEventListener("click", convert);
  input.addEventListener("keydown", function (e) { if (e.key === "Enter") convert(); });

  // Swap: make the first result unit the input unit, carrying the converted value over
  swapBtn.addEventListener("click", function () {
    var r = validate();
    var newUnit = outs[0].l.dataset.unit;
    var c = r.ok ? toCelsius(r.value, unitSel.value) : null;
    unitSel.value = newUnit;
    setLabels();
    if (c !== null) {
      input.value = String(Math.round(fromCelsius(c, newUnit) * 100) / 100);
      convert();
      btn.disabled = false;
    } else { clearResults(); }
  });

  // Copy a result to the clipboard (value + unit, e.g. "98.6 °F")
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(function () { return legacyCopy(text); });
    }
    return legacyCopy(text);
  }
  function legacyCopy(text) {
    return new Promise(function (resolve, reject) {
      var t = document.createElement("textarea");
      t.value = text; t.setAttribute("readonly", "");
      t.style.position = "fixed"; t.style.opacity = "0";
      document.body.appendChild(t); t.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(t);
      ok ? resolve() : reject();
    });
  }
  outs.forEach(function (o) {
    o.c.addEventListener("click", function () {
      if (o.raw === null) return;
      var text = o.raw + " " + o.l.textContent;
      copyText(text).then(function () {
        o.c.textContent = "Copied"; o.c.classList.add("done");
        note.textContent = "Copied " + text + " to the clipboard.";
        setTimeout(function () { o.c.textContent = "Copy"; o.c.classList.remove("done"); }, 1500);
      }, function () {
        note.textContent = "Copy failed. Select the value and copy it manually.";
      });
    });
  });

  setLabels();
  clearResults();
  btn.disabled = true;

  // Keep the swap button on the seam between the coloured and white halves
  function placeSwap() {
    var top = document.querySelector(".top");
    swapBtn.style.setProperty("--swap-top", (top.offsetHeight - 20) + "px");
  }
  placeSwap();
  window.addEventListener("resize", placeSwap);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeSwap);
  new MutationObserver(placeSwap).observe(err, { attributes: true });
})();
