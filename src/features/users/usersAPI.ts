import { User } from "./usersSlice";

// A mock function to mimic making an async request for data
export function fetchUsers() {
  return new Promise<User[]>((resolve, reject) =>
    setTimeout(
      () =>
        resolve([
          {
            id: "id1",
            name: "eyal",
            age: 10,
          },
        ]),
      500
    )
  );
}
