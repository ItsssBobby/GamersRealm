import React, {useState} from "react";
import { useHistory } from "react-router-dom";

export const Login = () =>{
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const history = useHistory()

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
      };

      const handlePasswordChange = (event) => {
        setPass(event.target.value);
      };

    const handleSubmit = (e) =>{
        email.preventDefault();
        console.log(email);
        history.push("/");
    }

    return (
        <>
            <form className="SearchBar h-10 flex justify-center bg-[#a9afb2]" onSubmit={handleSubmit}>
                <label htmlFor ="email">email</label>
                <input className=" px-5 w-60 bg-[#a9afb2] placeholder-black "
                 value = {email} 
                 type="email"
                 placeholder="youremail@email.com" 
                 id="email" name="email" 
                 onChange={handleEmailChange}/>
                <label htmlFor="password">password</label>
                <input className="bg-[#a9afb2] px-5 placeholder-black"
                value ={pass} 
                type="password"
                placeholder="*******" 
                id="password" 
                name="password" 
                onChange={handlePasswordChange}/>
                <button className="h-10 flex justify-center">Log In</button>
            </form>
            <div className="h-10 flex justify-center bg-[#a9afb2]">
            <button  onClick={()=> props.onFormSwitch('login')}>Register Here.</button>
            </div>
        </>    
    )
}