async function loadSemesterData() {
  try {
    console.log("Working on semester file");
    // Get the page path
    const websiteURL = new URL(location.href);
    const semester: string = websiteURL.pathname
      .split("/") // splitting url segments
      .at(-1) // getting last child
      .split(".")[0] // split into . to remove extension and get first element
      .split("-")[0]; // split the section segment to get specific word by splitting using -

    const filePath = `./datas/${semester}.js`;

    document.body.innerHTML = filePath;

    const semesterFile = await import(`./datas/${semester}.js`).then(
      (data) => data.default
    );

    console.log(semesterFile);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`Error during exectuion: ${error.message}`);
    }
  }
}

loadSemesterData();
// // Get JSON Data Function
// async function getJSONData(urlText) {
//   try {
//     // Generate full url path
//     // let urlLocation = `https://cdn.jsdelivr.net/gh/techaboutneed/dcom-management@master/json/${urlText}.json`

//     // Using fetch api get the JSON Data

//     // const response = await fetch(urlLocation)
//     // const datas = await response.json()

//     const datas = await import(`./datas/${urlText}.js`).then(
//       (data) => data.default
//     );

//     // iterate the object
//     for (let data in datas) {
//       // calling the commonClass with data of array and tableName
//       dataManage(datas[data], data);
//     }
//   } catch (error) {
//     console.log(error.message);

//     // Declare the static table Names
//     const tableNames = ["syllabus", "note", "paper"];

//     // iterate the object
//     tableNames.forEach((tableName) =>
//       // calling the commonClass with error message and tableName
//       dataManage(
//         `Check your connection properly and contact admin (aniloli42@gmail.com)`,
//         tableName
//       )
//     );
//   }
// }

// // calling getJSONData
// getJSONData(urlText);
