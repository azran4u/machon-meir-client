import { User } from "./usersSlice";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8080/v1/graphql",
  cache: new InMemoryCache({}),
  defaultOptions: {
    query: {
      fetchPolicy: "no-cache",
    },
  },
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
  try {
    const res = await client.query<{ users: User[] }>({
      query,
    });
    return res.data?.users;
  } catch (error) {
    throw new Error(error);
  }
}
