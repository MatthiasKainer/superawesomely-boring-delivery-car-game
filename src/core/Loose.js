import React from 'react';

const Loose = ({reason}) => {
    return <div>
        <h2>You lost!</h2>
        <p>{reason}</p>
        <button onClick={() => window.location.reload()}>Try Again?</button>
    </div>
}
  
  export default Loose;