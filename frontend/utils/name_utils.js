export const submitName = (name) => {

  let corrected = name.toLowerCase();
  corrected = corrected.split(" ");
  corrected = corrected.map((n) => n[0].toUpperCase() + n.slice(1));
  corrected = corrected.join(" ");

  return $.ajax({
    method: "GET",
    url: `https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&origin=*&titles=${corrected}`,
    success: validateName
  });
};

const validateName = (data) => {

  let info = data.query.pages;

  info = info[Object.keys(info)[0]];
  info = info.revisions[0]["*"];
  info = info.split("'''");
  info = info.slice(1).join("");
  info = info.split("\n");
  info = info[0];

  let i = 0;
  while (i < info.length) {
    if (info[i] === "<") {
      let j = i + 1;
      let secondClose = false;
      while (j < info.length) {
        if (info[j] === ">") {
          if (secondClose || info[j - 1] === "/") {
            info = info.slice(0, i) + info.slice(j + 1, info.length);
            j = info.length + 1;
            i = 0;
          } else {
            secondClose = true;
          }
        }
        j ++;
      }
    }
    i ++;
  }

  info = info.split("[[");
  info = info.map(
    (phrase) => {
      if (phrase.includes("|")) {
        let couplet = phrase.split("|");
        couplet = couplet[1];
        couplet = couplet.split("]]");
        return couplet.join("");
      } else {
        return phrase.split("]]").join("");
      }

    }
  );
  info = info.join("");
  
  console.log(info);
};
