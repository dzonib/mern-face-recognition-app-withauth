import React from 'react'

const FaceRecognition = ({imageUrl}) => {
  return <div className="center ma">
    <div className="mt2">
      <img src={imageUrl} alt='que' width='500px' height="auto"/>
    </div>
  </div>
}

export default FaceRecognition;