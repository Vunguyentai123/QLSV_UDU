import { useState } from "react";
const counter2 = ()=>{
    const [count,setCount] = useState(0);
    const HandleClickMe =()=>{
        setCount(count+1);
    }
    return(
        <div>
            <p>you clicked {count} times</p>
            <button onClick={HandleClickMe}></button>
            
        </div>
    )
}
export default counter2