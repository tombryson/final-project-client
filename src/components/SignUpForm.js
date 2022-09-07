import React, {useState} from 'react'

function SignUpForm(props) { ///////////////////All Props
    const [first_name, setFirst_name] = useState("")
    const [last_name, setLast_name] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [admin, setAdmin] = useState(false)

    //////////////////////////////////////////////////////////////////////////// 
    const handleFirstNameChange = (evt) => {
        setFirst_name(evt.target.value)
    }
    const handleLastNameChange = (evt) => {
        setLast_name(evt.target.value)
    }
    const handleEmailChange = (evt) => {
        setEmail(evt.target.value)
    }
    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value)
    }

    //////
    const handleSubmit = (evt) => {
        evt.preventDefault()
        fetch(`http://localhost:3000/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                first_name,
                last_name,
                email,
                password,
                admin
                })
        })
        .then(resp => resp.json())
        .then(data => {
            localStorage.setItem("token", data.jwt)
            props.handleLogin(data.user)
        })
        setFirst_name("")
        setLast_name("")
        setEmail("")
        setPassword("")
        setAdmin(false)
    }
    const formDivStyle = {
        margin: "auto",
        padding: "20px",
        width: "80%"
    }
    
    return(
        <div style={formDivStyle}>
            <h1 className='sign-up'>Sign Up</h1>
            <form className="ui form" onSubmit={handleSubmit}>
            <div className="field">
                    <label className='form-info'>First Name</label>
                    <input value={first_name} onChange={handleFirstNameChange} type="text" placeholder="eg. John"/>
                </div>
                <div className="field">
                    <label className='form-info'>Last Name</label>
                    <input value={last_name} onChange={handleLastNameChange} type="text" placeholder="eg. Smith"/>
                </div>
                <div className="field">
                    <label className='form-info'>Email*</label>
                    <input value={email} onChange={handleEmailChange} type="text" placeholder="john.smith@email.com" required/>
                </div>
                <div className="field">
                    <label className='form-info'>Password*</label>
                    <input value={password} onChange={handlePasswordChange} type="password" placeholder="password" required/>
                </div>

                <span className="reminder form-info">*required fields</span>
                
                <button className="ui button" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default SignUpForm