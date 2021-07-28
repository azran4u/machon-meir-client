import React, { useEffect } from "react";
import { Spinner, Table } from "react-bootstrap";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchUsersAsync, selectUsers } from "./usersSlice";
import * as _ from "lodash";

import styles from "./users.module.css";

export const UsersTable: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  const { users, loading, error } = useAppSelector(selectUsers);

  return (
    <div>
      {error && <div>{error}</div>}
      {loading && (
        <div className={styles.table_container}>
          <Spinner animation="border" role="status" className={styles.table}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      <div className={styles.table_container}>
        {!_.isEmpty(users) && _.isArray(users) && (
          <Table className={styles.table} striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};
