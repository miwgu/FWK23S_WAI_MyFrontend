import React from 'react';

const UsersList = ({ data }) => {
    if (!data || data.length === 0) return <div>No users found.</div>;

    return (
        <div>
            <h2>All Users</h2>
            <ul>
                {data.map(user => (
                    <li key={user.id}>
                        <p>Id: {user.id}</p>
                        <img src={user.avatar} alt={`${user.username}'s avatar`} width={50} height={50} />
                        <p>Email: {user.email}</p>
                        <p>Username: {user.username}</p>
                        <p>Role: {user.role}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;
