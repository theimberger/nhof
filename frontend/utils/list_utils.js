export const getNames = () => {
  return $.ajax({
    method: "GET",
    url: "/names"
  });
};
