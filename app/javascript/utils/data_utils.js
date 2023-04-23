export const passNameToDatabase = (name, description) => {
  const token = document.querySelector('meta[name="csrf-token"]').content;

  let nameData = {
    name: name,
    bio: description
  };

  return fetch('names', {
    method: "POST",
    body: JSON.stringify(nameData),
    headers: {
      "X-CSRF-Token": token,
      "Content-Type": "application/json",
    },
  });
};
