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
            <form onSubmit={handleSubmit}>
                <label htmlFor ="email">email</label>
                <input
                 value = {email} 
                 type="email"
                 placeholder="youremail@email.com" 
                 id="email" name="email" 
                 onChange={handleEmailChange}/>
                <label htmlFor="password">password</label>
                <input 
                value ={pass} 
                type="password"
                placeholder="*******" 
                id="password" 
                name="password" 
                onChange={handlePasswordChange}/>
                <button>Log In</button>
            </form>
            <button onClick={()=> props.onFormSwitch('login')}>Register Here.</button>
        </>    
    )
}