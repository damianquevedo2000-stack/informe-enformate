const nfNum = new Intl.NumberFormat("es-AR");
const pct = (a, b) => (a / b * 100);

function monto(x) { return "$ " + nfNum.format(Math.round(x)); }
const compacto = v => "$ " + (v >= 1000000 ? (v / 1000000).toFixed(1).replace(".", ",") + "M" : Math.round(v / 1000) + "k");

Chart.register(ChartDataLabels);
function fecha(f) {
  const [y, m, d] = f.split("-");
  return d + "/" + m + "/" + y;
}

/* ---------- Aclaración previa ---------- */
(function () {
  document.getElementById("itemAutoria").innerHTML =
    '<strong>No se sabe quien realiza los retiros de caja</strong>: las fotos o comprobantes provistos no indican el nombre de la persona que retira el efectivo.';
})();

/* ---------- KPIs ---------- */
(function () {
  const r = INFORME.retiros;
  const mejorMes = r.porMes.reduce((a, b) => (a.monto > b.monto ? a : b));
  const cards = [
    { cls: "violet", label: "Total retirado", value: monto(r.total), extra: nfNum.format(r.ops) + " retiros \u00b7 " + pct(r.total, INFORME.total.monto).toFixed(1) + "% de las ventas" },
    { cls: "mint",   label: "Retiro promedio", value: monto(r.promedio), extra: "por retiro del periodo" },
    { cls: "amber",  label: "Mes mas fuerte", value: monto(mejorMes.monto), extra: mejorMes.nombre + " \u00b7 " + nfNum.format(mejorMes.ops) + " retiros \u00b7 " + pct(mejorMes.monto, r.total).toFixed(0) + "% del total" },
    { cls: "rose",   label: "Forma de retiro", value: "100% Efectivo", extra: "ningun retiro por Mercado Pago ni transferencia" }
  ];
  document.getElementById("kpis").innerHTML = cards.map(c =>
    `<div class="card ${c.cls}"><div class="label">${c.label}</div><div class="value">${c.value}</div><div class="extra">${c.extra}</div></div>`
  ).join("");
})();

/* ---------- Registro de retiros ---------- */
(function () {
  const r = INFORME.retiros;
  document.getElementById("tablaRetiros").innerHTML = r.detalle.map(d =>
    `<tr>
      <td class="num">${fecha(d.fecha)}</td>
      <td>${d.detalle}</td>
      <td>Efectivo</td>
      <td class="num hl">${monto(d.monto)}</td>
      <td class="num">${pct(d.monto, r.total).toFixed(1)}%</td>
    </tr>`
  ).join("") +
  `<tr><td>Total</td><td></td><td></td><td class="num">${monto(r.total)}</td><td class="num">100%</td></tr>`;
})();

/* ---------- Evolución por mes ---------- */
(function () {
  const r = INFORME.retiros;
  Chart.defaults.color = getComputedStyle(document.documentElement).getPropertyValue("--muted").trim() || "#6B7280";
  Chart.defaults.font.family = "Inter";
  new Chart(document.getElementById("chartMeses"), {
    type: "bar",
    data: {
      labels: r.porMes.map(m => m.nombre + (m.parcial ? " *" : "")),
      datasets: [{
        label: "Retiros",
        data: r.porMes.map(m => m.monto),
        backgroundColor: "rgba(102,153,204,.9)",
        borderRadius: 6
      }]
    },
    options: {
      maintainAspectRatio: false,
      layout: { padding: { top: 22 } },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 12 } } },
        y: {
          border: { display: false },
          grid: { color: "rgba(15,23,42,.08)" },
          ticks: { callback: v => "$ " + (v >= 1000000 ? (v / 1000000).toFixed(1).replace(".", ",") + "M" : (v / 1000).toFixed(0) + "k"), font: { size: 11 } }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => "Retiros: " + monto(ctx.parsed.y) } },
        datalabels: {
          anchor: "end", align: "top", clamp: true, color: "#1A3050",
          font: { weight: "bold", size: 11 },
          formatter: v => compacto(v),
          display: ctx => ctx.dataset.data[ctx.dataIndex] > 0
        }
      }
    }
  });

  document.getElementById("tablaMeses").innerHTML = r.porMes.map(m =>
    `<tr>
      <td>${m.nombre}${m.parcial ? '<span class="tag-parcial">parcial</span>' : ""}</td>
      <td class="num">${nfNum.format(m.ops)}</td>
      <td class="num hl">${monto(m.monto)}</td>
      <td class="num">${m.monto ? pct(m.monto, r.total).toFixed(1) + "%" : "-"}</td>
    </tr>`
  ).join("") +
  `<tr><td>Total</td><td class="num">${nfNum.format(r.ops)}</td><td class="num">${monto(r.total)}</td><td class="num">100%</td></tr>`;

  document.getElementById("datos").textContent =
    "Fuente: hoja \"Retiros\" de \"ventas informe sin duplicados.xlsx\""
    + " - 9 registros de \"Retiro de caja\" separados de la hoja Egresos"
    + " - " + INFORME.retiros.desde.split("-").reverse().join("/") + " al " + INFORME.retiros.hasta.split("-").reverse().join("/");
})();
