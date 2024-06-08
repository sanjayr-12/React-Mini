import React, { useState } from 'react';
import './styles.css'; // Assuming your CSS file is named 'styles.css'

export default function Validate() {
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confrimPass, setconformPass] = useState('');

  const [errorusername, seterrorusername] = useState('');
  const [erroremail, seterroremail] = useState('');
  const [errorpassword, seterrorpassword] = useState('');
  const [errorconfrimPass, seterrorconformPass] = useState('');
  const [userColor, setUserColor] = useState('');
  const [emailColor, setemailColor] = useState('');
  const [passwordColor, setPasswordColor] = useState('');
  const [confirmPassColor, setconfirmPassColor] = useState('');


  
  const validate = (e) => {
    e.preventDefault();
    if (username.length > 5) {
      seterrorusername('');
      setUserColor('green');
    } else {
      seterrorusername('Username must be above 8 characters');
      setUserColor('red');
    }

    if (email.includes('@gmail.com')) {
      seterroremail('');
      setemailColor('green');
    } else {
      setemailColor('red');
      seterroremail('email should have @gmail');
    }
    if (password.length > 8) {
      seterrorpassword('');
      setPasswordColor('green');
    } else {
      setPasswordColor('red');
      seterrorpassword('Password should be 8 letters long');
    }
    if (password!=="" && confrimPass === password) {
      seterrorconformPass('');
      setconfirmPassColor('green');
    } else {
      setconfirmPassColor('red');
      seterrorconformPass('Password Does not match');
    }
  };

  return (
    <div className="container">
      <form className="form-container">
        <div className="input-container">
            <h2>Meta</h2>
          <input
            type="text"
            placeholder="Name"
            style={{ borderColor: userColor }}
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
          <p className="error">{errorusername}</p>
        </div>

        <div className="input-container">
          <input
            type="email"
            placeholder="Email"
            style={{ borderColor: emailColor }}
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <p className="error">{erroremail}</p>
        </div>

        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            style={{ borderColor: passwordColor }}
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <p className="error">{errorpassword}</p>
        </div>

        <div className="input-container">
          <input
            type="password"
            placeholder="Confirm Password"
            style={{ borderColor: confirmPassColor }}
            value={confrimPass}
            onChange={(e) => setconformPass(e.target.value)}
          />
          <p className="error">{errorconfrimPass}</p>
        </div>

        <button onClick={validate}>Submit</button>
      </form>
    </div>
  );
}
