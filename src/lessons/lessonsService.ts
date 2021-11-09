import { data } from "../data/lessons";
import { Lesson } from "./lessonModel";

export async function fetchLessons(): Promise<Lesson[]> {
  try {
    return data.lessons as any as Lesson[];
  } catch (error) {
    throw new Error(`could not read data ${error}`);
  }
}
