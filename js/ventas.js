const nfARS = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });
const nfNum = new Intl.NumberFormat("es-AR");
const pct = (a, b) => (a / b * 100);

function monto(x) { return "$ " + nfNum.format(Math.round(x)); }

/* ---------- KPIs ---------- */
(function () {
  const t = INFORME.total;
  const mejorMes = INFORME.meses.reduce((a, b) => (a.mp + a.ef > b.mp + b.ef ? a : b));
  const mp = INFORME.metodos.find(m => m.metodo === "Mercado Pago");
  const muyMonto = monto(mp.monto) + " en " + nfNum.format(mp.ops) + " operaciones";
  const cards = [
    { cls: "violet", label: "Ventas totales", value: monto(t.monto), extra: nfNum.format(t.ops) + " operaciones registradas" },
    { cls: "mint",   label: "Ticket promedio", value: monto(t.ticket), extra: "por operacion de venta" },
    { cls: "amber",  label: "Mejor mes", value: monto(mejorMes.mp + mejorMes.ef), extra: mejorMes.nombre + " · " + ((mejorMes.mp + mejorMes.ef) / t.monto * 100).toFixed(0) + "% del total" },
    { cls: "rose",   label: "Cobrado por Mercado Pago", value: pct(mp.monto, t.monto).toFixed(0) + "%", extra: muyMonto }
  ];
  document.getElementById("kpis").innerHTML = cards.map(c =>
    `<div class="card ${c.cls}"><div class="label">${c.label}</div><div class="value">${c.value}</div><div class="extra">${c.extra}</div></div>`
  ).join("");
})();

/* ---------- Aclaracion previa ---------- */
(function () {
  const sin = INFORME.noventa.find(x => x.cuenta === "Sin asignar");
  const rend = INFORME.noventa.find(x => x.cuenta === "Rendimientos financiero");
  document.getElementById("itemSinAsignar").innerHTML =
    `<strong>${monto(sin.monto)}</strong> registrados como <strong>Sin asignar</strong> (01/10/2026): ${sin.detalle}`;
  document.getElementById("itemRendimientos").innerHTML =
    `<strong>${monto(rend.monto)}</strong> en rendimientos financieros: ${rend.detalle}`;
})();

/* ---------- Ventas por tipo de cuenta ---------- */
(function () {
  const t = INFORME.total.monto;
  const etiqueta = x => x.etiqueta + " (" + pct(x.monto, INFORME.total.monto).toFixed(1) + "%)";
  new Chart(document.getElementById("chartTipos"), {
    type: "doughnut",
    data: {
      labels: INFORME.tipos.map(x => etiqueta(x)),
      datasets: [{ data: INFORME.tipos.map(x => x.monto), backgroundColor: INFORME.tipos.map(x => x.color), borderWidth: 0, hoverOffset: 8 }]
    },
    options: {
      cutout: "62%",
      maintainAspectRatio: false,
      plugins: { legend: { position: "bottom", labels: { usePointStyle: true, pointStyleWidth: 10, padding: 16, font: { size: 12 } } } }
    }
  });
  document.getElementById("barsTipos").innerHTML = INFORME.tipos.map(x => {
    const w = (x.monto / INFORME.tipos[0].monto * 100).toFixed(1);
    return `<div class="bar-item">
      <div class="bar-head"><span class="name">${x.etiqueta}</span><span class="val">${monto(x.monto)}</span><span class="pct">${pct(x.monto, t).toFixed(1)}%</span></div>
      <div class="bar-track"><div class="bar-fill" style="width:${w}%;background:${x.color}"></div></div>
      <div class="ops-count">${nfNum.format(x.ops)} operaciones · ticket promedio ${monto(x.monto / x.ops)}</div>
    </div>`;
  }).join("");
})();

/* ---------- Métodos de pago ---------- */
(function () {
  new Chart(document.getElementById("chartMetodos"), {
    type: "doughnut",
    data: {
      labels: INFORME.metodos.map(x => x.metodo),
      datasets: [{ data: INFORME.metodos.map(x => x.monto), backgroundColor: INFORME.metodos.map(x => x.color), borderWidth: 0, hoverOffset: 8 }]
    },
    options: {
      cutout: "62%",
      maintainAspectRatio: false,
      plugins: { legend: { position: "bottom", labels: { usePointStyle: true, pointStyleWidth: 10, padding: 16, font: { size: 12 } } } }
    }
  });
  const total = INFORME.total;
  document.getElementById("pillMetodos").innerHTML = INFORME.metodos.map(x =>
    `<div class="pill"><strong>${x.metodo}</strong> · ${monto(x.monto)} · ${pct(x.monto, total.monto).toFixed(1)}% del monto · ${nfNum.format(x.ops)} ops · ticket ${monto(x.monto / x.ops)}</div>`
  ).join("");
})();

/* ---------- Evolucion por mes ---------- */
(function () {
  Chart.defaults.color = getComputedStyle(document.documentElement).getPropertyValue("--muted").trim() || "#9c93b8";
  Chart.defaults.font.family = "Inter";
  new Chart(document.getElementById("chartMeses"), {
    type: "bar",
    data: {
      labels: INFORME.meses.map(m => m.nombre + (m.parcial ? " *" : "")),
      datasets: [
        { label: "Mercado Pago", data: INFORME.meses.map(m => m.mp), backgroundColor: "rgba(139,92,246,.75)", borderRadius: 6, stack: "s" },
        { label: "Efectivo", data: INFORME.meses.map(m => m.ef), backgroundColor: "rgba(52,211,153,.75)", borderRadius: 6, stack: "s" }
      ]
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        x: { stacked: true, grid: { display: false }, ticks: { font: { size: 12 } } },
        y: {
          stacked: true, border: { display: false },
          grid: { color: "rgba(255,255,255,.05)" },
          ticks: { callback: v => "$ " + (v >= 1000000 ? (v / 1000000).toFixed(1).replace(".", ",") + "M" : (v / 1000).toFixed(0) + "k"), font: { size: 11 } }
        }
      },
      plugins: {
        legend: { position: "bottom", labels: { usePointStyle: true, pointStyleWidth: 10, padding: 16 } },
        tooltip: { callbacks: { label: ctx => ctx.dataset.label + ": " + monto(ctx.parsed.y) } }
      }
    }
  });

  const cuerpo = INFORME.meses.map(m => {
    const tot = m.mp + m.ef;
    return `<tr>
      <td>${m.nombre}${m.parcial ? '<span class="tag-parcial">parcial</span>' : ""}</td>
      <td class="num hl">${monto(tot)}</td>
      <td class="num">${monto(m.mp)}</td>
      <td class="num">${monto(m.ef)}</td>
      <td class="num">${monto(m.normal)}</td>
      <td class="num">${monto(m.promo)}</td>
      <td class="num">${monto(m.pack)}</td>
    </tr>`;
  }).join("");
  const tt = INFORME.meses.reduce((a, m) => ({ mp: a.mp + m.mp, ef: a.ef + m.ef, normal: a.normal + m.normal, promo: a.promo + m.promo, pack: a.pack + m.pack }), { mp: 0, ef: 0, normal: 0, promo: 0, pack: 0 });
  document.getElementById("tablaMeses").innerHTML = cuerpo +
    `<tr><td>Total</td><td class="num">${monto(tt.mp + tt.ef)}</td><td class="num">${monto(tt.mp)}</td><td class="num">${monto(tt.ef)}</td><td class="num">${monto(tt.normal)}</td><td class="num">${monto(tt.promo)}</td><td class="num">${monto(tt.pack)}</td></tr>`;
  document.getElementById("datos").textContent =
    "Fuente: \"ventas informe sin duplicados.xlsx\" - " + (INFORME.periodo.desde + " al " + INFORME.periodo.hasta) +
    " - " + nfNum.format(INFORME.dupes.excluidas) + " cargas duplicadas (" + monto(INFORME.dupes.monto) + ") detectadas y excluidas del analisis";
})();