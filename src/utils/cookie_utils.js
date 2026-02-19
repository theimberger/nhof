export const setVoteCookie = (voteObject) => {
  document.cookie = `votes=${JSON.stringify(voteObject)}; expires=Thu, 31 Dec 2099 23:59:59 GMT`;
};

export const getVoteCookie = () => {
  if (!document.cookie) {
    return null;
  }

  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('votes'))
    .split('=')[1];

  if (cookieValue) {
    return JSON.parse(cookieValue);
  }

  return null;
};
