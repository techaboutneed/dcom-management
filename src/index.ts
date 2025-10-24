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
