import React from 'react';

const Loose = ({props}) => {
    return <div>
        <h2>You lost!</h2>
        <button onClick={() => window.location.reload()}>Try Again?</button>
    </div>
}
  
  export default Loose;