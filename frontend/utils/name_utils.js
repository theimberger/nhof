export const submitName = (name) => {
  return $.ajax({
    method: "GET",
    url: `https://en.wikipedia.org/w/api.php?action=query` +
      `&prop=revisions&rvprop=content&format=json&origin=*&titles=${name}`
  });
};

export const validateName = (data) => {

  let isPerson = false,
      info = data.query.pages;

  // parsing wiki content, first, get content from json
  info = info[Object.keys(info)[0]];

  if (!info.pageid) {
    return "no page found";
  }

  info = info.revisions[0]["*"];

  console.log(info);

  // get first paragraph
  info = info.split("'''");
  info = info.slice(1).join("");
  info = info.split("\n");
  info = info[0];

  // remove <ref> tags
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
  console.log(info);

  // remove internal links, formated as either
  // [[link]] or [[link | linktext]]
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

  // check for either a date born or a month within a set of parens
  let parenCapture = info.match(/\((.*?)\)/g), //selects all text inside parens
      months = [
        "january",
        "febuary",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "novemeber",
        "december"
      ];

  if (parenCapture) {
    parenCapture.forEach((group) => {
      group = group.toLowerCase();
      if (group.includes("born")) {
        isPerson = true;
      } else {
        months.forEach((month) => {
          if (group.includes(month)) {
            isPerson = true;
          }
        });
      }
    });
  }

  // if a date is found - return info

  if (isPerson) {
    return info;
  } else {
    return false;
  }
};
