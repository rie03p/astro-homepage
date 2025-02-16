const dateFormat = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export const getFormatDate = (date: Date): string => {
  return dateFormat.format(new Date(date));
};
