import React, { useEffect } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchUsersAsync, selectUsers } from "./usersSlice";

import "./users.css";

export const UsersComponent: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  const { users, loading, error } = useAppSelector(selectUsers);

  const refreshData = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    console.log(`Refresh Data clicked`);
    dispatch(fetchUsersAsync());
  };

  return (
    <div>
      {error && <div>{error}</div>}
      {loading && (
        <div className="container_horizontal">
          <Spinner
            animation="border"
            role="status"
            className="spinner item_horizontal"
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {users && (
        <div>
          <div className="buttons_container">
            <Button
              variant="outline-primary"
              className="button"
              onClick={refreshData}
            >
              Refresh Data
            </Button>
            <Button variant="outline-primary" className="button">
              Auto Refresh
            </Button>
          </div>
          <div className="table_container">
            <Table striped bordered hover responsive className="table">
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
          </div>
        </div>
      )}
    </div>
  );
};
