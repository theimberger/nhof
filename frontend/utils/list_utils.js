export const getNames = () => {
  return $.ajax({
    method: "GET",
    url: "/names",
  });
};

export const sendVoteToBackend = (id, vote) => {
  return $.ajax({
    method: "PUT",
    url: `/names/${id}`,
    data: { vote },
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
