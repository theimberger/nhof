export const passNameToDatabase = (name, description) => {
  return fetch('/api/names', {
    method: "POST",
    body: JSON.stringify({ name: name, bio: description }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
