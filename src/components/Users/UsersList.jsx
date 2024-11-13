import React from 'react';
import styles from './UsersList.module.css';

const UsersList = ({ data }) => {
    if (!data || data.length === 0) return <div>No users found!</div>;
    console.log("all users: ", data)

    return (
        <div className={styles.tableContainer}>
            <table className={styles.usersTable}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Avatar</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Created at</th>
                        <th>Updated at</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>
                                <img src={user.avatar} alt={`${user.username}'s avatar`} width={50} height={50} />
                            </td>
                            <td>{user.email}</td>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                            <td>{user.created_at}</td>
                            <td>{user.updated_at}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersList;
