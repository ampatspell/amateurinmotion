export const format = (json: string) => {
  const date = Temporal.PlainDate.from(json);
  return date.toLocaleString('lv-lv');
};
