export class SemesterManager {
  #getSemester(): string {
    try {
      const websiteURL = new URL(location.href);
      const urlPath = websiteURL.pathname.split("/").filter(Boolean).pop(); // splitting url segments and get last element

      if (urlPath == undefined) throw new Error("unable to process URL");

      const firstSegment = urlPath.split(".").at(0); // split into . to remove extension and get first element
      const semester = firstSegment?.split("-").at(0); // split the section segment to get specific word by splitting using "-"

      if (semester == undefined) throw new Error("unable to process semester");

      return semester;
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.cause);
      }
      return "";
    }
  }

  async loadSemesterData() {
    try {
      const semester = this.#getSemester();

      if (semester == "") {
        throw new Error("unable to get semester");
      }

      const semesterFile = await import(`../datas/${semester}.js`).then(
        (data) => data.default
      );

      console.log(semesterFile);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(`Error during exectuion: ${error.message}`);
      }
    }
  }
}
