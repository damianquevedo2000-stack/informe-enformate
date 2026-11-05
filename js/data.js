// Datos generados desde "C:\Users\Damian\Desktop\ventas informe sin duplicados.xlsx"
// Hoja "Datos sin duplicados" (259 registros: 256 ventas + 3 registros no considerados)
// Dupes: 15 cargas repetidas excluidas (criterio acordado 2026-11-05)
// Retiros: 9 registros "Retiro de caja" separados de la hoja "Egresos" a la hoja "Retiros" (2026-11-05)

const INFORME = {
  total: { monto: 8706436, ops: 256, ticket: 34010 },
  periodo: { desde: "2026-07-18", hasta: "2026-10-02", mesParcial: "2026-10" },
  tipos: [
    { tipo: "Ingreso por ventas",              etiqueta: "Cuota normal",  monto: 6366436, ops: 180, color: "#8b5cf6" },
    { tipo: "Ingreso por ventas con promoción", etiqueta: "Con promoción", monto: 1696000, ops: 64,  color: "#f472b6" },
    { tipo: "Ingreso por ventas Pack familiar", etiqueta: "Pack familiar", monto: 644000,  ops: 12,  color: "#34d399" }
  ],
  metodos: [
    { metodo: "Mercado Pago", monto: 6193436, ops: 179, color: "#8b5cf6" },
    { metodo: "Efectivo",     monto: 2513000, ops: 77,  color: "#34d399" }
  ],
  meses: [
    { mes: "2026-07", nombre: "Julio",      parcial: false, mp: 1380000,   ef: 360000,  normal: 980000,  promo: 760000, pack: 0 },
    { mes: "2026-08", nombre: "Agosto",     parcial: false, mp: 1908000,   ef: 1115000, normal: 2451000, promo: 324000, pack: 248000 },
    { mes: "2026-09", nombre: "Septiembre", parcial: false, mp: 2745436,   ef: 1038000, normal: 2775436, promo: 612000, pack: 396000 },
    { mes: "2026-10", nombre: "Octubre",    parcial: true,  mp: 160000,    ef: 0,       normal: 160000,  promo: 0,      pack: 0 }
  ],
  noventa: [
    { cuenta: "Sin asignar",              detalle: "Ingreso del 01/10/2026 cuyo origen no se identificó. Sin categoría por lo que no entra en ventas ni en métodos.", monto: 330000 },
    { cuenta: "Rendimientos financiero",  detalle: "Dos registros (18/09 y 20/07) por intereses de la cuenta. Peso inferior al 0,01%; se obvian del análisis para reducir ruido.", monto: 400.21 }
  ],
  dupes: { excluidas: 15, monto: 547000 },
  retiros: {
    total: 1080000, ops: 9, promedio: 120000,
    desde: "2026-08-10", hasta: "2026-10-01",
    porMes: [
      { mes: "2026-07", nombre: "Julio",      parcial: false, monto: 0,      ops: 0 },
      { mes: "2026-08", nombre: "Agosto",     parcial: false, monto: 820000, ops: 6 },
      { mes: "2026-09", nombre: "Septiembre", parcial: false, monto: 220000, ops: 2 },
      { mes: "2026-10", nombre: "Octubre",    parcial: true,  monto: 40000,  ops: 1 }
    ],
    detalle: [
      { fecha: "2026-08-10", detalle: "Retiros de los propietarios", monto: 26000 },
      { fecha: "2026-08-19", detalle: "Retiro de los propietarios",  monto: 120000 },
      { fecha: "2026-08-24", detalle: "Retiros de los propietarios", monto: 130000 },
      { fecha: "2026-08-25", detalle: "Retiro de los propietarios",  monto: 220000 },
      { fecha: "2026-08-26", detalle: "Retiro en efectivo",          monto: 180000 },
      { fecha: "2026-08-31", detalle: "Retiro de los propietarios",  monto: 144000 },
      { fecha: "2026-09-24", detalle: "Retiros de caja",             monto: 180000 },
      { fecha: "2026-09-29", detalle: "Retiros",                     monto: 40000 },
      { fecha: "2026-10-01", detalle: "Retiro de caja",              monto: 40000 }
    ]
  }
};