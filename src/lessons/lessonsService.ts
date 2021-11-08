import { Lesson } from "./lessonsSlice";
import { data } from "../data/lessons";

export async function fetchLessons(): Promise<Lesson[]> {
  return data.lessons as any as Lesson[];
}
