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

  if (info.toLowerCase().includes("early life")
      || info.toLowerCase().includes("career")) {
        isPerson = true;
      }

  // get first paragraph

  info = info.split("'''");
  info = info.slice(1).join("");
  info = info.split("\n");
  let i = 0;
  if (info[i]) {
    while (info[i].length < 100) {
      if (i > info.length) {
        return false;
      }
      i ++;
    }
  } else {
    return false;
  }

  info = info[i];

  // remove anything in {{}}
  i = 0;
  while (i < info.length) {
    if (info[i] === "{" && info[i + 1] === "{") {
      let j = i + 2;
      while (j < info.length) {
        if (info[j] === "}" && info[j - 1] === "}") {
          if (info[j + 1] === ";") {
            j += 1;
          }
          info = info.slice(0, i) + info.slice(j + 1, info.length);
          j = info.length;
        }
        j ++;
      }
    }
    i ++;
  }

  // remove <ref> tags
  i = 0;
  while (i < info.length) {
    if (info[i] === "<") {
      let j = i + 1;
      let secondClose = false;
      while (j < info.length) {
        if (info[j] === ">") {
          if (secondClose || info[j - 1] === "/") {

            if (info[i - 1] === "(") {
              j ++;
            }
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

  // remove <!-- comments -->
  i = 0;
  while (i < info.length) {
    if (info[i] === "<" && info[i + 1] === "!") {
      let j = i + 2;
      while (j < info.length) {
        if (info[j] === ">" && info[j - 1] === "-") {
          info = info.slice(0, i) + info.slice(j + 1, info.length);
          j = info.length + 1;
          i = 0;
        }
        j ++;
      }
    }

    i ++;
  }

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
      months = ["january", "febuary", "march", "april", "may", "june",
        "july", "august", "september", "october", "novemeber", "december"
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
  console.log(info);

  if (isPerson) {
    return info;
  } else {
    return false;
  }
};
