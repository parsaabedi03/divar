export const e2p = (s: unknown): string =>
  String(s).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

export const p2e = (s: unknown): string =>
  String(s).replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));

export const sp = (number: number | string): string => {
  const separatedNumber = String(number).match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g);

  if (!separatedNumber) return e2p(number);

  return e2p(separatedNumber.join(","));
};
