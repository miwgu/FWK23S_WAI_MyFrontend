import React from 'react'

const User = () => {
    return (
        <div style={styles.container}>
          <div style={styles.text}>User main page</div>
        </div>
      );
    };
    
    const styles = {
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
    };

export default User