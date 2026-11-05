const nfNum = new Intl.NumberFormat("es-AR");
const pct = (a, b) => (a / b * 100);

function monto(x) { return "$ " + nfNum.format(Math.round(x)); }

/* ---------- El periodo en un vistazo ---------- */
(function () {
  const max = Math.max(INFORME.total.monto, INFORME.egresos.total, INFORME.retiros.total);
  const filas = [
    { nombre: "Ventas (hasta 02/10)", val: INFORME.total.monto, comp: "100% (base de comparacion)", color: "var(--violet)", ops: nfNum.format(INFORME.total.ops) + " ventas registradas" },
    { nombre: "Egresos (hasta 15/10)", val: INFORME.egresos.total, comp: pct(INFORME.egresos.total, INFORME.total.monto).toFixed(0) + "% de las ventas", color: "var(--amber)", ops: nfNum.format(INFORME.egresos.ops) + " egresos pagados" },
    { nombre: "Retiros (hasta 01/10)", val: INFORME.retiros.total, comp: pct(INFORME.retiros.total, INFORME.total.monto).toFixed(1) + "% de las ventas", color: "var(--mint)", ops: nfNum.format(INFORME.retiros.ops) + " retiros de caja" }
  ];
  document.getElementById("barsResumen").innerHTML = filas.map(f =>
    `<div class="bar-item">
      <div class="bar-head"><span class="name">${f.nombre}</span><span class="val">${monto(f.val)}</span><span class="pct">${f.comp}</span></div>
      <div class="bar-track"><div class="bar-fill" style="width:${(f.val / max * 100).toFixed(1)}%;background:${f.color}"></div></div>
      <div class="ops-count">${f.ops}</div>
    </div>`
  ).join("");
})();

/* ---------- KPIs de Ventas ---------- */
(function () {
  const mejorMes = INFORME.meses.reduce((a, b) => (a.mp + a.ef > b.mp + b.ef ? a : b));
  const mp = INFORME.metodos.find(m => m.metodo === "Mercado Pago");
  const cards = [
    { cls: "violet", label: "Ventas totales", value: monto(INFORME.total.monto), extra: nfNum.format(INFORME.total.ops) + " ventas \u00b7 ticket promedio " + monto(INFORME.total.ticket) },
    { cls: "mint",   label: "Mejor mes", value: monto(mejorMes.mp + mejorMes.ef), extra: mejorMes.nombre + " \u00b7 " + pct(mejorMes.mp + mejorMes.ef, INFORME.total.monto).toFixed(0) + "% del total" },
    { cls: "amber",  label: "Cobro digital", value: pct(mp.monto, INFORME.total.monto).toFixed(0) + "%", extra: "Mercado Pago \u00b7 " + monto(mp.monto) },
    { cls: "rose",   label: "Cuotas normales", value: monto(INFORME.tipos[0].monto), extra: pct(INFORME.tipos[0].monto, INFORME.total.monto).toFixed(0) + "% de las ventas \u00b7 " + pct(INFORME.tipos[1].monto, INFORME.total.monto).toFixed(0) + "% con promocion" }
  ];
  document.getElementById("kpisVentas").innerHTML = cards.map(c =>
    `<div class="card ${c.cls}"><div class="label">${c.label}</div><div class="value">${c.value}</div><div class="extra">${c.extra}</div></div>`
  ).join("");
})();

/* ---------- KPIs de Costos y Gastos ---------- */
(function () {
  const e = INFORME.egresos;
  const sm = e.sinmotivo.reduce((a, d) => a + d.monto, 0);
  const cards = [
    { cls: "violet", label: "Egresos totales", value: monto(e.total), extra: nfNum.format(e.ops) + " egresos \u00b7 " + pct(e.total, INFORME.total.monto).toFixed(0) + "% de las ventas" },
    { cls: "mint",   label: "Rubro mas pesado", value: monto(e.rubros[0].monto), extra: e.rubros[0].rubro + " \u00b7 " + pct(e.rubros[0].monto, e.total).toFixed(0) + "% del gasto" },
    { cls: "amber",  label: "Alquileres + sueldos", value: monto(e.rubros[1].monto + e.rubros[2].monto), extra: pct(e.rubros[1].monto + e.rubros[2].monto, e.total).toFixed(0) + "% del gasto \u00b7 la mayor parte es fija" },
    { cls: "rose",   label: "Sin motivo ident.", value: monto(sm), extra: nfNum.format(e.sinmotivo.length) + " cargas \u00b7 " + pct(sm, e.total).toFixed(1) + "% del gasto" }
  ];
  document.getElementById("kpisCostos").innerHTML = cards.map(c =>
    `<div class="card ${c.cls}"><div class="label">${c.label}</div><div class="value">${c.value}</div><div class="extra">${c.extra}</div></div>`
  ).join("");
})();

/* ---------- KPIs de Retiros ---------- */
(function () {
  const r = INFORME.retiros;
  const mejorMes = r.porMes.reduce((a, b) => (a.monto > b.monto ? a : b));
  const cards = [
    { cls: "violet", label: "Total retirado", value: monto(r.total), extra: nfNum.format(r.ops) + " retiros \u00b7 " + pct(r.total, INFORME.total.monto).toFixed(1) + "% de las ventas" },
    { cls: "mint",   label: "Forma de retiro", value: "100% Efectivo", extra: "ningun retiro por Mercado Pago ni transferencia" },
    { cls: "amber",  label: "Mes mas fuerte", value: monto(mejorMes.monto), extra: mejorMes.nombre + " \u00b7 " + nfNum.format(mejorMes.ops) + " retiros \u00b7 " + pct(mejorMes.monto, r.total).toFixed(0) + "% del total" },
    { cls: "rose",   label: "Autoria desconocida", value: "9 de 9", extra: "los retiros no indican quien los realiza" }
  ];
  document.getElementById("kpisRetiros").innerHTML = cards.map(c =>
    `<div class="card ${c.cls}"><div class="label">${c.label}</div><div class="value">${c.value}</div><div class="extra">${c.extra}</div></div>`
  ).join("");
})();

/* ---------- Footer ---------- */
(function () {
  document.getElementById("datos").textContent =
    "Fuente: \"ventas informe sin duplicados.xlsx\" (hojas Datos sin duplicados, Egresos, Retiros)"
    + " - ventas 2026-07-18 al 2026-10-02 - egresos 2026-07-23 al 2026-10-15"
    + " - informe preliminar, sujeto a validar causas y responsables con el negocio";
})();
