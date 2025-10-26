export class SemesterFileException extends Error {
  constructor(message: string = "Semester file is not valid. Please check it") {
    super(message);
  }
}
