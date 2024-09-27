function priceFormatter(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
}

function imageSource(image) {
  return new URL(`../assets/${image}`, import.meta.url).href;
}

function getCurrentTimeFormatted() {
  const date = new Date();

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert 24-hour format to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 hour) case

  // Add leading zero to minutes if necessary
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  return `${hours < 10 ? `0${hours}` : hours}:${formattedMinutes} ${ampm}`;
}

function getCurrentDateFormatted() {
  const date = new Date();

  // Array of month names
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = monthNames[date.getMonth()]; // Get month as a short string
  const day = date.getDate(); // Get the day of the month
  const year = date.getFullYear(); // Get the full year

  return `${month} ${day}, ${year}`;
}

function generateRandomNumber() {
  let result = "";
  for (let i = 0; i < 12; i++) {
    result += Math.floor(Math.random() * 10);
  }
  return result;
}

function extractFirstAndLastName(fullName) {
  // Split the name by spaces
  const nameParts = fullName.trim().split(" ");

  // Determine the first and last names
  const firstName = nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

  return { firstName, lastName };
}

export {
  priceFormatter,
  imageSource,
  getCurrentTimeFormatted,
  getCurrentDateFormatted,
  generateRandomNumber,
  extractFirstAndLastName,
};
