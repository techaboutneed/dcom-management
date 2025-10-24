async function loadSemesterData() {
  try {
    const semester = getSemester();

    if (semester == undefined) throw new Error("unable to get semester");

    const semesterFile = await import(`./datas/${semester}.js`).then(
      (data) => data.default
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`Error during exectuion: ${error.message}`);
    }
  }
}

loadSemesterData();

function getSemester() {
  const websiteURL = new URL(location.href);
  const urlPath = websiteURL.pathname.split("/").filter(Boolean).pop(); // splitting url segments

  if (urlPath == undefined) throw new Error("unable to process URL");

  const firstSegment = urlPath.split(".").at(0); // split into . to remove extension and get first element
  const semester = firstSegment?.split("-").at(0); // split the section segment to get specific word by splitting using "-"

  return semester;
}
