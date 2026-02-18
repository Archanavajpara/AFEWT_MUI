//Write a program which display success message from server after form submission.
import { useFormStatus } from "react-dom";

function Submitbutton(){
    const{pending}=useFormStatus();

    return(
        <button disabled={pending}>
            {pending ? "Submitting..." : "Submit"}
        </button>
    )
}
async function handleSubmit(){
    await new Promise((resolve)=>setTimeout(resolve,2000));
    alert("Form submitted!");
}
export default function SubmitAlert(){
    return(
        
        <form action={handleSubmit}>
            <input type="text" placeholder="Enter you name:"/>
            <Submitbutton/>
        </form>
    )
}