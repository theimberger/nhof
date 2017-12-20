export const signup = (user) => {
  return $.ajax({
    method: "POST",
    url: "/users",
    data: { user }
  });
};

export const login = (user) => {
  return $.ajax({
    method: "POST",
    url: "/session",
    data: { user }
  });
};

export const signout = () => {
  return $.ajax({
    method: "DELETE",
    url: "api/session"
  });
};
