//Write a program in which A child input exposes a .focus() method to parent using useImperativeHandle.
import { useRef, forwardRef, useImperativeHandle } from "react";
const ChildInput=forwardRef((props,ref)=>{
    const inputRef=useRef();
    useImperativeHandle(ref,()=>{
        return{
            focus:()=>{
                inputRef.current.focus();
            }
        }
    });
    return(
        <input ref={inputRef} type="text" placeholder="Enter your name:"/>
    )
});
export default function FocusImp(){
    const childRef=useRef();
    const handleClick=()=>{
        childRef.current.focus();
    }
    return(
        <div>
            <ChildInput ref={childRef}/>
            <button onClick={handleClick}>Focus Input</button>
        </div>
    )
}
