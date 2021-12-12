import { Lesson, LessonSerializable } from "./lesson";
import { RabbiEnum } from "./rabi.enum";

export interface Snapshot {
  rabbi: RabbiEnum;
  date: Date;
  lessons: Lesson[];
}

export interface SnapshotSerializable
  extends Omit<Snapshot, "date" | "lessons"> {
  date: number;
  lessons: LessonSerializable[];
}
