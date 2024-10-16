import React from 'react';
class Couter extends React.Component{
    constructor(props){
        super(props);
        this.state = {count :0};
    }
    render(){
        return(
            <div>
                <p>you clicked {this.state.count} times</p>
                <button onClick={() => this.setState(this.state.count+1)}>click me</button>
            </div>
        )
    }
}
export default Couter;