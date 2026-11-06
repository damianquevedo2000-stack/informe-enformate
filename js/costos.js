const nfNum = new Intl.NumberFormat("es-AR");
const pct = (a, b) => (a / b * 100);

function monto(x) { return "$ " + nfNum.format(Math.round(x)); }
const compacto = v => "$ " + (v >= 1000000 ? (v / 1000000).toFixed(1).replace(".", ",") + "M" : Math.round(v / 1000) + "k");

Chart.register(ChartDataLabels);
function fecha(f) {
  const [y, m, d] = f.split("-");
  return d + "/" + m + "/" + y;
}

/* ---------- Aclaracion previa ---------- */
(function () {
  const e = INFORME.egresos;
  const sm = e.sinmotivo.reduce((a, d) => a + d.monto, 0);
  const ex = e.excluidas.reduce((a, d) => a + d.monto, 0);
  const items = [];
  items.push('<strong>' + monto(sm) + ' en ' + nfNum.format(e.sinmotivo.length) + ' cargas sin motivo identificable</strong>: ' +
    nfNum.format(e.sinmotivo.length - 1) + ' dicen literalmente "NO SE SABE" en el detalle y 1 quedo sin detalle (Ibar Brian Avaca, 01/10). ' +
    'Representan el ' + pct(sm, e.total).toFixed(1) + '% del gasto del periodo.');
  items.push('<strong>' + monto(ex) + ' excluidos del analisis, en ' + nfNum.format(e.excluidas.length) + ' movimientos</strong>: ' +
    '3 cargas con Cuenta "Ingreso por ventas" (cobros, no egresos; se ajustaran contra los ingresos mas adelante) y 1 movimiento ' +
    'entre cajas de Zamora Roxana Maria Lorena, que es una transferencia entre sus propias cajas, no un gasto del negocio.');
  document.getElementById("listaAclaracion").innerHTML = items.map(t => "<li>" + t + "</li>").join("");
})();

/* ---------- KPIs ---------- */
(function () {
  const e = INFORME.egresos;
  const mejorMes = e.meses.reduce((a, b) => (a.monto > b.monto ? a : b));
  const rubroMas = e.rubros[0];
  const sm = e.sinmotivo.reduce((a, d) => a + d.monto, 0);
  const cards = [
    { cls: "violet", label: "Egresos totales", value: monto(e.total), extra: nfNum.format(e.ops) + " egresos \u00b7 " + pct(e.total, INFORME.total.monto).toFixed(0) + "% de las ventas" },
    { cls: "mint",   label: "Rubro mas pesado", value: monto(rubroMas.monto), extra: rubroMas.rubro + " \u00b7 " + nfNum.format(rubroMas.ops) + " egresos \u00b7 " + pct(rubroMas.monto, e.total).toFixed(0) + "% del gasto" },
    { cls: "amber",  label: "Mes mas costoso", value: monto(mejorMes.monto), extra: mejorMes.nombre + " \u00b7 " + nfNum.format(mejorMes.ops) + " egresos \u00b7 " + pct(mejorMes.monto, e.total).toFixed(0) + "% del gasto" },
    { cls: "rose",   label: "Sin motivo identificado", value: monto(sm), extra: nfNum.format(e.sinmotivo.length) + " cargas \u00b7 " + pct(sm, e.total).toFixed(1) + "% del gasto" }
  ];
  document.getElementById("kpis").innerHTML = cards.map(c =>
    `<div class="card ${c.cls}"><div class="label">${c.label}</div><div class="value">${c.value}</div><div class="extra">${c.extra}</div></div>`
  ).join("");
})();

/* ---------- Egresos por rubro ---------- */
(function () {
  const e = INFORME.egresos;
  new Chart(document.getElementById("chartRubros"), {
    type: "doughnut",
    data: {
      labels: e.rubros.map(r => r.rubro),
      datasets: [{ data: e.rubros.map(r => r.monto), backgroundColor: e.rubros.map(r => r.color), borderWidth: 0, hoverOffset: 6 }]
    },
    options: {
      cutout: "58%",
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        datalabels: {
          color: "#fff",
          font: { weight: "bold", size: 11 },
          clamp: true,
          display: ctx => ctx.dataset.data[ctx.dataIndex] / INFORME.egresos.total >= 0.028,
          formatter: v => pct(v, INFORME.egresos.total).toFixed(1).replace(".", ",") + "%"
        }
      }
    }
  });
  document.getElementById("barsRubros").innerHTML = e.rubros.map(r =>
    `<div class="bar-item">
      <div class="bar-head"><span class="name"><span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:${r.color};margin-right:7px"></span>${r.rubro}</span><span class="val">${monto(r.monto)}</span><span class="pct">${pct(r.monto, e.total).toFixed(1)}%</span></div>
      <div class="bar-track"><div class="bar-fill" style="width:${(r.monto / e.rubros[0].monto * 100).toFixed(1)}%;background:${r.color}"></div></div>
      <div class="ops-count">${nfNum.format(r.ops)} egreso${r.ops === 1 ? "" : "s"}</div>
    </div>`
  ).join("");
})();

/* ---------- Caja de origen ---------- */
(function () {
  const e = INFORME.egresos;
  new Chart(document.getElementById("chartCajas"), {
    type: "doughnut",
    data: {
      labels: e.cajas.map(c => c.caja),
      datasets: [{ data: e.cajas.map(c => c.monto), backgroundColor: e.cajas.map(c => c.color), borderWidth: 0, hoverOffset: 6 }]
    },
    options: {
      cutout: "58%",
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom", labels: { usePointStyle: true, pointStyleWidth: 10, padding: 14, font: { size: 12 } } },
        datalabels: {
          color: "#fff",
          font: { weight: "bold", size: 11 },
          clamp: true,
          display: ctx => ctx.dataset.data[ctx.dataIndex] / INFORME.egresos.total >= 0.02,
          formatter: v => pct(v, INFORME.egresos.total).toFixed(1).replace(".", ",") + "%"
        }
      }
    }
  });
  document.getElementById("pillCajas").innerHTML = e.cajas.map(c =>
    `<div class="pill"><strong>${c.caja}</strong> \u00b7 ${monto(c.monto)} \u00b7 ${pct(c.monto, e.total).toFixed(1)}% \u00b7 ${nfNum.format(c.ops)} pago${c.ops === 1 ? "" : "s"}</div>`
  ).join("");
})();

/* ---------- Evolucion por mes ---------- */
(function () {
  const e = INFORME.egresos;
  Chart.defaults.color = getComputedStyle(document.documentElement).getPropertyValue("--muted").trim() || "#6B7280";
  Chart.defaults.font.family = "Inter";
  const maxMes = Math.max(...INFORME.egresos.meses.map(m => m.monto));
  new Chart(document.getElementById("chartMeses"), {
    type: "bar",
    data: {
      labels: e.meses.map(m => m.nombre),
      datasets: [
        { label: "Mercado Pago", data: e.meses.map(m => m.mp), backgroundColor: "rgba(26,48,80,.85)", borderRadius: 6, stack: "s" },
        { label: "Efectivo", data: e.meses.map(m => m.ef), backgroundColor: "rgba(102,153,204,.85)", borderRadius: 6, stack: "s" },
        { label: "Bancos", data: e.meses.map(m => m.banco), backgroundColor: "rgba(15,123,79,.8)", borderRadius: 6, stack: "s" }
      ]
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        x: { stacked: true, grid: { display: false }, ticks: { font: { size: 12 } } },
        y: {
          stacked: true, border: { display: false },
          grid: { color: "rgba(15,23,42,.08)" },
          ticks: { callback: v => "$ " + (v >= 1000000 ? (v / 1000000).toFixed(1).replace(".", ",") + "M" : (v / 1000).toFixed(0) + "k"), font: { size: 11 } }
        }
      },
      plugins: {
        legend: { position: "bottom", labels: { usePointStyle: true, pointStyleWidth: 10, padding: 16 } },
        tooltip: { callbacks: { label: ctx => ctx.dataset.label + ": " + monto(ctx.parsed.y) } },
        datalabels: {
          anchor: "center", clamp: true, color: "#fff",
          font: { weight: "bold", size: 10 },
          display: ctx => { const v = ctx.dataset.data[ctx.dataIndex]; return v > 0 && v / maxMes >= 0.055; },
          formatter: v => compacto(v)
        }
      }
    }
  });

  document.getElementById("tablaMeses").innerHTML = e.meses.map(m =>
    `<tr>
      <td>${m.nombre}</td>
      <td class="num">${nfNum.format(m.ops)}</td>
      <td class="num hl">${monto(m.monto)}</td>
      <td class="num">${m.mp ? monto(m.mp) : "-"}</td>
      <td class="num">${m.ef ? monto(m.ef) : "-"}</td>
      <td class="num">${m.banco ? monto(m.banco) : "-"}</td>
      <td class="num">${pct(m.monto, e.total).toFixed(1)}%</td>
    </tr>`
  ).join("") +
  `<tr><td>Total</td><td class="num">${nfNum.format(e.ops)}</td><td class="num">${monto(e.total)}</td><td class="num">${monto(e.cajas[0].monto)}</td><td class="num">${monto(e.cajas[1].monto)}</td><td class="num">${monto(e.cajas[2].monto + e.cajas[3].monto)}</td><td class="num">100%</td></tr>`;
})();

/* ---------- Top 10 ---------- */
(function () {
  const e = INFORME.egresos;
  const sumaTop = e.top.reduce((a, r) => a + r.monto, 0);
  document.getElementById("topPct").textContent = pct(sumaTop, e.total).toFixed(0) + "%";
  document.getElementById("tablaTop").innerHTML = e.top.map((r, i) =>
    `<tr>
      <td class="num">${i + 1}. ${fecha(r.fecha)}</td>
      <td>${r.quien}</td>
      <td>${r.rubro}</td>
      <td>${r.caja}</td>
      <td class="num hl">${monto(r.monto)}</td>
    </tr>`
  ).join("");
})();

/* ---------- Registro completo ---------- */
(function () {
  const e = INFORME.egresos;
  document.getElementById("tablaDetalle").innerHTML = e.detalle.map(d =>
    `<tr>
      <td class="num">${fecha(d.fecha)}</td>
      <td>${d.rubro}</td>
      <td>${d.detalle}</td>
      <td>${d.caja}</td>
      <td class="num hl">${monto(d.monto)}</td>
    </tr>`
  ).join("") +
  `<tr><td>Total</td><td></td><td></td><td class="num"></td><td class="num">${monto(e.total)}</td></tr>`;

  document.getElementById("datos").textContent =
    "Fuente: hoja \"Egresos\" de \"ventas informe sin duplicados.xlsx\" - 46 egresos del analisis (BRUTO: 50 filas)"
    + " - excluidos: 3 cargas \"Ingreso por ventas\" + 1 entre cajas (Zamora Roxana), y 9 retiros (hoja Retiros)";
})();
