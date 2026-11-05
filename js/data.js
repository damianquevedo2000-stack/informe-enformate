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
  },
  egresos: {
    total: 10014393, ops: 46, promedio: 217704,
    desde: "2026-07-23", hasta: "2026-10-15",
    rubros: [
      { rubro: "Otros Egresos", monto: 5603823, ops: 25, color: "#8b5cf6" },
      { rubro: "Alquiler", monto: 2550000, ops: 3, color: "#f59e0b" },
      { rubro: "Sueldos Profesores", monto: 1338000, ops: 4, color: "#34d399" },
      { rubro: "Luz", monto: 304600, ops: 3, color: "#f472b6" },
      { rubro: "Articulos de limpieza", monto: 83390, ops: 5, color: "#c4b5fd" },
      { rubro: "Servicios y obras", monto: 70000, ops: 2, color: "#fbbf24" },
      { rubro: "Inversiones equipamiento", monto: 32000, ops: 1, color: "#6ee7b7" },
      { rubro: "Ferreteria y herramientas", monto: 16250, ops: 1, color: "#f9a8d4" },
      { rubro: "Agua", monto: 9000, ops: 1, color: "#a78bfa" },
      { rubro: "Gastos personales.", monto: 7330, ops: 1, color: "#9c93b8" }
    ],
    cajas: [
      { caja: "Mercado Pago", monto: 5140416, ops: 27, color: "#8b5cf6" },
      { caja: "Efectivo", monto: 3868420, ops: 17, color: "#f59e0b" },
      { caja: "Banco Galicia Jonathan", monto: 955557, ops: 1, color: "#34d399" },
      { caja: "Banco XX", monto: 50000, ops: 1, color: "#f472b6" }
    ],
    meses: [
      { mes: "2026-07", nombre: "Julio", parcial: false, monto: 83180, ops: 3, mp: 0, ef: 33180, banco: 50000 },
      { mes: "2026-08", nombre: "Agosto", parcial: false, monto: 5011267, ops: 20, mp: 3087830, ef: 967880, banco: 955557 },
      { mes: "2026-09", nombre: "Septiembre", parcial: false, monto: 3676586, ops: 15, mp: 841086, ef: 2835500, banco: 0 },
      { mes: "2026-10", nombre: "Octubre", parcial: true, monto: 1243360, ops: 8, mp: 1211500, ef: 31860, banco: 0 },
    ],
    sinmotivo: [
      { fecha: "2026-09-18", cliente: "Maria Graciela Sanchez", detalle: "NO SE SABE", monto: 5500 },
      { fecha: "2026-09-18", cliente: "Mauricio Fabian Videla Cabello", detalle: "NO SE SABE", monto: 160000 },
      { fecha: "2026-09-22", cliente: "Mauricio Fabian Videla Cabello", detalle: "NO SE SABE", monto: 123500 },
      { fecha: "2026-09-23", cliente: "Damian Panza", detalle: "MOTIVO: NO SE SABE", monto: 160000 },
      { fecha: "2026-10-01", cliente: "Ibar Brian Avaca", detalle: "sin detalle de motivo", monto: 400000 },
      { fecha: "2026-10-05", cliente: "Jose Adrian Quiroga", detalle: "NO SE SABE", monto: 120000 }
    ],
    excluidas: [
      { fecha: "2026-07-28", quien: "Marcos Bonaffini", monto: 100000, motivo: "Ingreso por ventas" },
      { fecha: "2026-08-06", quien: "Zamora Roxana Maria Lorena", monto: 90000, motivo: "Movimiento entre cajas" },
      { fecha: "2026-08-26", quien: "Zoe Manrique", monto: 20000, motivo: "Ingreso por ventas" },
      { fecha: "2026-09-24", quien: "Axel Castro", monto: 40000, motivo: "Ingreso por ventas" }
    ],
    top: [
      { fecha: "2026-08-22", quien: "Daniela Aguirre", caja: "Banco Galicia Jonathan", rubro: "Otros Egresos", monto: 955557 },
      { fecha: "2026-09-11", quien: "Mauricio Videla", caja: "Efectivo", rubro: "Sueldos Profesores", monto: 863500 },
      { fecha: "2026-08-14", quien: "Alquileres pagados", caja: "Efectivo", rubro: "Alquiler", monto: 850000 },
      { fecha: "2026-09-03", quien: "Pago de alquiler", caja: "Efectivo", rubro: "Alquiler", monto: 850000 },
      { fecha: "2026-09-16", quien: "Alquiler del salon", caja: "Efectivo", rubro: "Alquiler", monto: 850000 },
      { fecha: "2026-08-27", quien: "Aguirre Daniela", caja: "Mercado Pago", rubro: "Otros Egresos", monto: 800000 },
      { fecha: "2026-08-03", quien: "Guadalupe Maria Luz Pirani", caja: "Mercado Pago", rubro: "Otros Egresos", monto: 440000 },
      { fecha: "2026-08-06", quien: "Jose Adrian Quiroga", caja: "Mercado Pago", rubro: "Otros Egresos", monto: 400000 },
      { fecha: "2026-08-21", quien: "Ibar Brian Avaca", caja: "Mercado Pago", rubro: "Otros Egresos", monto: 400000 },
      { fecha: "2026-10-01", quien: "Ibar Brian Avaca", caja: "Mercado Pago", rubro: "Otros Egresos", monto: 400000 }
    ],
    detalle: [
      { fecha: "2026-07-23", rubro: "Otros Egresos", detalle: "Marcos Roberto Bonaffini", caja: "Banco XX", monto: 50000 },
      { fecha: "2026-07-23", rubro: "Articulos de limpieza", detalle: "Artículos de limpieza", caja: "Efectivo", monto: 15100 },
      { fecha: "2026-07-25", rubro: "Articulos de limpieza", detalle: "Artículos de limpieza", caja: "Efectivo", monto: 18080 },
      { fecha: "2026-08-03", rubro: "Otros Egresos", detalle: "Transferencia enviada a Enformate Sas", caja: "Mercado Pago", monto: 30000 },
      { fecha: "2026-08-03", rubro: "Otros Egresos", detalle: "Guadalupe Maria Luz Pirani", caja: "Mercado Pago", monto: 440000 },
      { fecha: "2026-08-03", rubro: "Otros Egresos", detalle: "Ibar Brian Avaca", caja: "Mercado Pago", monto: 335500 },
      { fecha: "2026-08-06", rubro: "Otros Egresos", detalle: "Jose Adrian Quiroga", caja: "Mercado Pago", monto: 400000 },
      { fecha: "2026-08-10", rubro: "Otros Egresos", detalle: "Marcos Bonaffini", caja: "Mercado Pago", monto: 70000 },
      { fecha: "2026-08-10", rubro: "Gastos personales.", detalle: "Articulos Varios", caja: "Efectivo", monto: 7330 },
      { fecha: "2026-08-10", rubro: "Otros Egresos", detalle: "Pa S A S", caja: "Mercado Pago", monto: 7330 },
      { fecha: "2026-08-13", rubro: "Servicios y obras", detalle: "Arreglo de puerta", caja: "Efectivo", monto: 30000 },
      { fecha: "2026-08-14", rubro: "Ferreteria y herramientas", detalle: "Articulos varios", caja: "Efectivo", monto: 16250 },
      { fecha: "2026-08-14", rubro: "Alquiler", detalle: "Alquileres pagados", caja: "Efectivo", monto: 850000 },
      { fecha: "2026-08-15", rubro: "Luz", detalle: "Servicios de luz pagados", caja: "Efectivo", monto: 39300 },
      { fecha: "2026-08-20", rubro: "Articulos de limpieza", detalle: "Plumero", caja: "Efectivo", monto: 16000 },
      { fecha: "2026-08-21", rubro: "Otros Egresos", detalle: "Ibar Avaca", caja: "Mercado Pago", monto: 400000 },
      { fecha: "2026-08-21", rubro: "Otros Egresos", detalle: "Ibar Avaca", caja: "Mercado Pago", monto: 300000 },
      { fecha: "2026-08-21", rubro: "Agua", detalle: "2 Bidones de agua", caja: "Efectivo", monto: 9000 },
      { fecha: "2026-08-22", rubro: "Otros Egresos", detalle: "Transferencia enviada a Daniela Aguirre", caja: "Banco Galicia Jonathan", monto: 955557 },
      { fecha: "2026-08-22", rubro: "Otros Egresos", detalle: "Estevez Sergio Carlos", caja: "Mercado Pago", monto: 150000 },
      { fecha: "2026-08-26", rubro: "Otros Egresos", detalle: "Estevez Sergio Carlos", caja: "Mercado Pago", monto: 150000 },
      { fecha: "2026-08-27", rubro: "Otros Egresos", detalle: "Aguirre Daniela", caja: "Mercado Pago", monto: 800000 },
      { fecha: "2026-08-31", rubro: "Otros Egresos", detalle: "Maria Graciela Sanchez", caja: "Mercado Pago", monto: 5000 },
      { fecha: "2026-09-03", rubro: "Alquiler", detalle: "Pago de alquiler", caja: "Efectivo", monto: 850000 },
      { fecha: "2026-09-08", rubro: "Otros Egresos", detalle: "Daniela Aguirre", caja: "Mercado Pago", monto: 46436 },
      { fecha: "2026-09-09", rubro: "Otros Egresos", detalle: "Maria Luz Pirani (Profesora )", caja: "Mercado Pago", monto: 180000 },
      { fecha: "2026-09-10", rubro: "Articulos de limpieza", detalle: "Articulos varios", caja: "Mercado Pago", monto: 12350 },
      { fecha: "2026-09-11", rubro: "Sueldos Profesores", detalle: "Sueldo a Mauricio Videla", caja: "Efectivo", monto: 863500 },
      { fecha: "2026-09-12", rubro: "Sueldos Profesores", detalle: "Sueldo Damian Panza", caja: "Efectivo", monto: 200000 },
      { fecha: "2026-09-14", rubro: "Sueldos Profesores", detalle: "Sueldo Profesora Guadalupe Luz Pirani", caja: "Mercado Pago", monto: 114000 },
      { fecha: "2026-09-16", rubro: "Alquiler", detalle: "Alquiler del salon", caja: "Efectivo", monto: 850000 },
      { fecha: "2026-09-18", rubro: "Otros Egresos", detalle: "NO SE SABE", caja: "Mercado Pago", monto: 5500 },
      { fecha: "2026-09-18", rubro: "Otros Egresos", detalle: "NO SE SABE", caja: "Mercado Pago", monto: 160000 },
      { fecha: "2026-09-19", rubro: "Luz", detalle: "Edeste", caja: "Mercado Pago", monto: 39300 },
      { fecha: "2026-09-22", rubro: "Inversiones equipamiento", detalle: "Plan de pago ventilador- Entrega de dinero", caja: "Efectivo", monto: 32000 },
      { fecha: "2026-09-22", rubro: "Otros Egresos", detalle: "NO SE SABE", caja: "Mercado Pago", monto: 123500 },
      { fecha: "2026-09-23", rubro: "Servicios y obras", detalle: "Armado de ventilador y arreglo de cortinas", caja: "Efectivo", monto: 40000 },
      { fecha: "2026-09-23", rubro: "Otros Egresos", detalle: "MOTIVO: NO SE SABE", caja: "Mercado Pago", monto: 160000 },
      { fecha: "2026-10-01", rubro: "Otros Egresos", detalle: "Ibar Brian Avaca", caja: "Mercado Pago", monto: 400000 },
      { fecha: "2026-10-01", rubro: "Otros Egresos", detalle: "Ibar Avaca", caja: "Mercado Pago", monto: 300000 },
      { fecha: "2026-10-05", rubro: "Otros Egresos", detalle: "NO SE SABE", caja: "Mercado Pago", monto: 120000 },
      { fecha: "2026-10-05", rubro: "Otros Egresos", detalle: "Marcos Bonaffini", caja: "Mercado Pago", monto: 5000 },
      { fecha: "2026-10-06", rubro: "Otros Egresos", detalle: "Polea", caja: "Efectivo", monto: 10000 },
      { fecha: "2026-10-07", rubro: "Articulos de limpieza", detalle: "Artículos de limpieza varios", caja: "Efectivo", monto: 21860 },
      { fecha: "2026-10-14", rubro: "Luz", detalle: "Edeste", caja: "Mercado Pago", monto: 226000 },
      { fecha: "2026-10-15", rubro: "Sueldos Profesores", detalle: "Sueldo profesora Guadulupe Pirani", caja: "Mercado Pago", monto: 160500 }
    ],
  }
};
