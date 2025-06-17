export function formatNumberWithCommas(value: number | string): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export function formatNumber(value: number, locale: string = "en-US"): string {
    return new Intl.NumberFormat(locale).format(value);
};
  
  