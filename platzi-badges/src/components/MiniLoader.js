import React from "react";

import "./styles/Loader.css";

class MiniLoader extends React.Component{
    render(){
        return (
            <div className="lds-grid">
              <div />
              <div />
              <div />
            </div>
          );
    };
}

export default MiniLoader;