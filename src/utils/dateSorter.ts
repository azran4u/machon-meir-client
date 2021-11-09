import { Lesson } from "../lessons/lessonModel";


export const dateSorter = (rowA: Lesson, rowB: Lesson) => {
  const a = new Date(rowA.date).getTime();
  const b = new Date(rowB.date).getTime();

  if (a > b) {
    return 1;
  }

  if (b > a) {
    return -1;
  }

  return 0;
};
