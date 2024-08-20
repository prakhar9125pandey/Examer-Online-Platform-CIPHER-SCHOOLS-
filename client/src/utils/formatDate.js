const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

export default formatDate;
