export const passNameToDatabase = (name, description) => {

  let nameData = {
    name: name,
    bio: description
  };

  return fetch({
    method: "POST",
    url: "/names",
    data: nameData
  });
};
