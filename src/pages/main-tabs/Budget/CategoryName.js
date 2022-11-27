import React from 'react';
import {Input} from "rsuite";

function CategoryName(props) {
    // hook that store if the input should be displayed
    const [showInput, setShowInput] = React.useState(false);

  return (
    <div>
        {(!showInput)?
            <h3  className={"budget-category-name"} style={{cursor: "pointer"}} onClick={()=> setShowInput(true)}>{props.name}</h3>:
            <Input type="text" defaultValue={props.name} size={"lg"} maxLength={32} autoFocus onBlur={(event)=> {
                console.log(event.target.value);
                props.handleNameChange(event.target.value)
                setShowInput(false)}}/>
        }
    </div>
  );
}

export default CategoryName;

