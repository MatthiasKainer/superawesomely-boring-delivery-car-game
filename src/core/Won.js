import React from 'react';

const Won = ({props}) => {
    return <div>
        <h2>You won! That was unexpected...</h2>
        <button onClick={() => window.location.reload()}>Try Again?</button>
    </div>
}
  
  export default Won;