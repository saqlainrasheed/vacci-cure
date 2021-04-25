import React, {useState} from 'react';
function Hos_Registration(){
    const [Name , setName] = useState('')
	const [Email , setEmail] = useState('')
    const [Phone_Num , setPhone_Num] = useState('')
    const [Address , setAddress] = useState('')
    const [Registration , setRegistration] = useState('')
    const [Password , setPassword] = useState('')
    const [Confirm_Password ,setConfirm_Password] = useState('')


	const onEmailChange = (e: ITarget) => setEmail(e.target.value);
	const onPasswordChange = (e: ITarget) => setPassword(e.target.value);
	return(
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-light-">
	        <main className="pa4 black-80">
		        <div className="measure">
		            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
		              <legend className="f1 fw6 ph0 mh0">Register As Hospital</legend>
		              <div className="mt3">
		                <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
		                <input
		                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
		                  type="name"
		                  name="name"
		                  id="name"
		                />
		              </div>
		              <div className="mt3">
		                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
		                <input
		                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
		                  type="email"
		                  name="email-address"
		                  id="email-address"
		                  //onChange={this.onEmailChange}
		                />
		              </div>
		              <div className="mt3">
		                <label className="db fw6 lh-copy f6" htmlFor="email-address">Phone_Num</label>
		                <input
		                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
		                  type="PhoneNumber"
		                  name="Phone_Num"
		                  id="Phone_Num"
		                  //onChange={this.onEmailChange}
		                />
		              </div>
		              <div className="mt3">
		                <label className="db fw6 lh-copy f6" htmlFor="email-address">Address</label>
		                <input
		                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
		                  type="Address"
		                  name="Address"
		                  id="Address"
		                  //onChange={this.onEmailChange}
		                />
		              </div>
		              <div className="mt3">
		                <label className="db fw6 lh-copy f6" htmlFor="email-address">Govt or Private</label>
		                <select  className="b pa2 ba w-100" >
	                      <option>Select from the list</option>
	                      <option>Govt</option>
	                      <option>Private</option>
	                      <option>Semi_Govt</option>
		                </select>
		              </div>
		              <div className="mv3">
		                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
		                <input
		                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
		                  type="password"
		                  name="password"
		                  id="password"
		                  //onChange={this.onPasswordChange}
		                />
		              </div>
		              <div className="mv3">
		                <label className="db fw6 lh-copy f6" htmlFor="password">Confirm_Password</label>
		                <input
		                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
		                  type="Confirm_Password"
		                  name="Confirm_Password"
		                  id="Confirm_Password"
		                  //onChange={this.onPasswordChange}
		                />
		              </div>
		            </fieldset>
		            <div className="center">
		              <input
		                //onClick={this.onSubmitSignIn}
		                className="center b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
		                type="submit"
		                value="Register"
		              />
		            </div>
		        </div>
	        </main>
	    </article>
	);
}

export default Hos_Registration;
