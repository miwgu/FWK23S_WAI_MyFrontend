import React, { useEffect, useState } from 'react';
import { useDataFetcher } from '../Data/DataFetcherProvider';
import UsersList from "./UsersList";
import styles from './Users.module.css';

const Users = () => {
      const { getAllUsers, error } = useDataFetcher();
      const [users, setUsers] = useState([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
          const fetchUsers = async () => {
              const usersData = await getAllUsers();
              if (usersData) setUsers(usersData);
              setLoading(false);
          };
          fetchUsers();
      }, [getAllUsers]);

      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error}</div>;

      return (
          <div className={styles.container} >
              <h2 className={styles.titleContent}>
                All Users
              </h2>
              <div className={styles.content}>
                <UsersList data={users} />
              </div>
          </div>
      );
    };
  

export default Users