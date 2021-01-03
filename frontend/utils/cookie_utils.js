export const setVoteCookie = (voteObject) => {
  document.cookie = 'votes=' + JSON.stringify(voteObject);
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
