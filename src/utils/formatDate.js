const formatDate = (date) => {
  const parsedDate = new Date(date);

  if (isNaN(parsedDate)) {
    throw new Error("Invalid date value");
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
};

export default formatDate;