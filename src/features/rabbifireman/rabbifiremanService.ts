import { Lesson } from "./rabbifiremanSlice";
import { data } from "./lessons";

export async function fetchLessons(): Promise<Lesson[]> {
  return data.lessons as any as Lesson[];
}
