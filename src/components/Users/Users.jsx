import React, { useEffect, useState } from 'react';
import { useDataFetcher } from '../Data/DataFetcherProvider';
import UsersList from "./UsersList";

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
          <div>
              <h2>All Users</h2>
              <UsersList data={users} />
          </div>
      );
    };
    
    /* const styles = {
      container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      },
      text: {
        fontSize: '24px',
        fontWeight: 'bold',
      },
    }; */

export default Users