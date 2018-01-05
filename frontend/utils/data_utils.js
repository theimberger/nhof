export const passNameToDatabase = (name, description) => {

  let nameData = {
    name: name,
    bio: description
  };

  return $.ajax({
    method: "POST",
    url: "/names",
    data: nameData
  });

};
