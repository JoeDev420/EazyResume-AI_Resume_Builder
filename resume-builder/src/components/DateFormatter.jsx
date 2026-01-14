const DateFormatter = ({ value }) => {
  if (!value) return "";

  const parts = value.split("-");

  // Only year provided
  if (parts.length === 1) {
    return parts[0];
  }

  const year = parts[0];
  const month = parts[1];

  const date = new Date(year, month - 1);

  return date.toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });
};

export default DateFormatter;
