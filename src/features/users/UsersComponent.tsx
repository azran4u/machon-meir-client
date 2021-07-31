import React, { useEffect } from "react";
import { Spinner, Table } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchUsersAsync, selectUsers } from "./usersSlice";

import styles from "./users.module.css";

export const UsersComponent: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  const { users, loading, error } = useAppSelector(selectUsers);

  return (
    <div>
      {error && <div>{error}</div>}
      {loading && (
        <div className={styles.center}>
          <div className="flex-item-left"></div>
          <Spinner animation="border" role="status" className={styles.spinner}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <div className="flex-item-right"></div>
        </div>
      )}
      {users && (
        <div className={styles.center}>
          <div className="flex-item-left"></div>

          <Table striped bordered hover responsive className={styles.table}>
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
          <div className="flex-item-right"></div>
        </div>
      )}
    </div>
  );
};
