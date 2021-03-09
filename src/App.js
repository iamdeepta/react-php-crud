import React from 'react';
import PostTweet from './PostTweet';
import GetTweet from './GetTweet';

const App = () => {

  return (

    <>
    <div className="row app_div">
      <div className="col-md-4">
      <PostTweet/>
      </div>
      <div className="col-md-4 ml-2">
      <GetTweet/>
      </div>
    
    </div>
    </>
  )
}

export default App;
