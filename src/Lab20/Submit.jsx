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
}
export default function Submit(){
    return(
        
        <form action={handleSubmit}>
            <input type="text" placeholder="Enter you name:"/>
            <Submitbutton/>
        </form>
    )
}