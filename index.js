const fs = require("fs");
const { recognize } = require("node-tesseract-ocr");

const config = {
  lang: "eng",
  oem: 1,
  psm: 3,
};

const index = [];
const processes = [];
fs.readdirSync(`${__dirname}/input`).forEach((file) => {
  if (file === "README.md") return; // Skip README.md
  console.log(`Processing file: ${file}`);

  processes.push(
    recognize(`${__dirname}/input/${file}`, config)
      .then((text) => {
        index.push({
          file,
          text,
        });
      })
      .catch((error) => {
        console.log(error.message);
      })
  );
});

Promise.all(processes).then(() => {
  console.log(JSON.stringify(index, null, 2));
});
