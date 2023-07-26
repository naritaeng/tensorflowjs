const fs = require("fs");

const filePath = "./IRIS.csv";

fs.readFile(filePath, "utf-8", (err, data) => {
  if (err) {
    throw new Error("Error reading the CSV file:", err);
  }

  const rows = data.trim().split("\n");
  const headers = rows[0].split(",");

  const dataObjects = [];

  for (let i = 1; i < rows.length; i++) {
    const rowValues = rows[i].split(",");
    const dataObject = {};

    for (let j = 0; j < headers.length; j++) {
      const header = headers[j];
      const value = rowValues[j];
      dataObject[header] = value;
    }

    dataObjects.push(dataObject);
  }
});
