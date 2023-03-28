import React, {useState} from "react";

export const Login = () =>{
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) =>{
        email.preventDefault();
        console.log(email);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor ="email">email</label>
                <input value = {email} type="email"placeholder="youremail@email.com" id="email" name="email"/>
                <label for ="password">password</label>
                <input value ={pass} type="password"placeholder="*******" id="password" name="password"/>
                <button>Log In</button>
            </form>
            <button onClick={()=> props.onFormSwitch('login')}>New Users Register Here.</button>
        </>    
    )
}