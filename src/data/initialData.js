const customers = [
  "Bank Woori Saudara",
  "KB Bank",
  "IBK Bank Indonesia",
  "Shinhan Bank Indonesia",
  "OK! Bank Indonesia",
  "OK! Asset",
  "Woori Finance Indonesia",
  "KB Valbury Sekuritas",
  "KB Bank Syariah",
  "Mirae Asset Sekuritas",
  "Kreditplus",
  "J Trust Bank",
  "Damai Putra Group",
];

const partners = [
  "MarkAny",
  "NETAND",
  "PIOLINK",
  "Menlo Security",
  "Raon",
  "AhnLab",
  "SECUI",
  "EY",
  "Everyzone",
  "Secure Systems",
  "Blue Global Tech",
  "YoungLimWon Soft Lab",
  "ensof Technology",
  "PT. Inkor Sinergi Mandiri",
  "Snet",
  "INTIKOM",
  "next TI",
  "ENAGE",
  "Fortress Data Services",
  "G.I.S",
  "...plus info",
];

export const CATEGORIES = ["Customer", "Partner"];

export const initialClients = [
  ...customers.map((name, i) => ({ id: `c-${i + 1}`, name, category: "Customer", logoUrl: "" })),
  ...partners.map((name, i) => ({ id: `p-${i + 1}`, name, category: "Partner", logoUrl: "" })),
];
