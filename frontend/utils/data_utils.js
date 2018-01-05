export const passNameToDatabase = (name, description) => {

  let nameData = {
    name: name,
    description: description
  };

  return $.ajax({
    method: "POST",
    url: "/",
    data: nameData
  });
  
};
