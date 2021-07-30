// import Module files
import dataManage from "../modules/Method.js";

// variable init
let urlText;

// Get the page name
const urlpath = location.href;

// Split the url in /
let urlsegments = urlpath.split("/");

// Loop the array of urlsegments
urlsegments.forEach((urlParts) => {
  // check the urls which include .html
  if (urlParts.includes(".html")) {
    // Split and Get the before part of .html
    urlParts = urlParts.split(".html")[0];

    // split the final text if - have in word then Get first Element
    urlText = urlParts.split("-")[0];
  }
});

// Get JSON Data Function
function getJSONData(urlText) {
  // Generate full url path
  let urlLocation = `https://cdn.jsdelivr.net/gh/techaboutneed/dcom-management@latest/json/${urlText}.json`;
  // Using fetch api get the JSON Data
  fetch(urlLocation)
    // resolve the response and return the response json
    .then((response) => {
      return response.json();
    })
    // get the json from previous resolve function
    .then((data) => {
      // iterate the object
      for (let tableKey in data) {
        // calling the commonClass with data of array and tableName
        dataManage(data[tableKey], tableKey);
      }
    })
    // handle the failure occur or reject
    .catch(() => {
      // Declare the static table Names
      const tableNames = ["syllabus", "note", "paper"];

      // iterate the object
      tableNames.forEach((tableName) =>
        // calling the commonClass with error message and tableName
        dataManage(
          "Check your connection properly and contact admin (techaboutneed@gmail.com)",
          tableName
        )
      );
    });
}

// calling getJSONData
getJSONData(urlText);
