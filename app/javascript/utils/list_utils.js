export const getNames = () => {
  return fetch('/names');
};

export const sendVoteToBackend = (id, vote) => {
  const token = document.querySelector('meta[name="csrf-token"]').content;

  return fetch(`/names/${id}`, {
    method: "PUT",
    body: JSON.stringify({ vote }),
    headers: {
      "X-CSRF-Token": token,
      "Content-Type": "application/json",
    },
  });
};

export const formatDate = (date) => {
  const MONTHS = [
    "January ",
    "Febuary ",
    "March ",
    "April ",
    "May ",
    "June ",
    "July ",
    "August ",
    "September ",
    "October ",
    "Novemeber ",
    "December "
  ];

  let month = MONTHS[parseInt(date.slice(5, 7)) - 1],
      day = date.slice(8, 10),
      year = date.slice(0, 4);

  if (day[0] === "0") { day = day.slice(1); }

  return month + day + ", " + year;
};
