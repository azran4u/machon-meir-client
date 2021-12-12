import { Lesson } from "../model/lesson";

export const dateSorter = (rowA: Lesson, rowB: Lesson) => {
  const a = rowA.date.getTime();
  const b = rowB.date.getTime();

  if (a > b) {
    return 1;
  }

  if (b > a) {
    return -1;
  }

  return 0;
};
