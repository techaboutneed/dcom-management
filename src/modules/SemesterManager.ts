import z from "zod";
import { SemesterSchema, type TSemester } from "../types/semester.type";
import { SemesterFileException } from "../expections/SemesterFileException";

export class SemesterManager {
  #semesterData: TSemester;

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

      this.#semesterData = this.verifySemesterFile(semesterFile);
    } catch (error: unknown) {
      if (error instanceof SemesterFileException) {
        console.error(`Error: ${error.message}`);
      } else if (error instanceof z.ZodError) {
        console.error(`Parsing error: `, error.issues);
      } else if (error instanceof Error) {
        console.log(`Error during exectuion: ${error.message}`);
      } else {
        console.error("Unable to detect issue");
      }
    }
  }

  verifySemesterFile(semesterFile: unknown): TSemester {
    if (semesterFile == undefined || typeof semesterFile != "object")
      throw new SemesterFileException();

    const parseResult = SemesterSchema.parse(semesterFile);

    return parseResult;
  }
}
