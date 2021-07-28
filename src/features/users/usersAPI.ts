import { User } from "./usersSlice";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8080/v1/graphql",
  cache: new InMemoryCache(),
});

const query = gql`
  query allusers {
    users {
      id
      name
      age
    }
  }
`;

// A mock function to mimic making an async request for data
export async function fetchUsers(): Promise<User[]> {
  return (
    await client.query<User[]>({
      query,
    })
  ).data;
  // let users: User[] = [];
  // try {
  //   const res = await client.query<User[]>({
  //     query,
  //   });
  //   if (res.error) {
  //     throw new Error(`${res.error}`);
  //   }
  //   users = res.data;
  // } catch (error) {
  //   throw new Error(`${error}`);
  // }
  // return users;
}
