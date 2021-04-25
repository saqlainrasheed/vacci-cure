import React, {useState} from 'react';
function Login(){
	const [signInEmail, setEmail] = useState('')
	const [signInPassword, setPassword] = useState('')

	const onEmailChange = (e: ITarget) => setEmail(e.target.value);
	const onPasswordChange = (e: ITarget) => setPassword(e.target.value);
	return(
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-light-yellow">
	        <main className="pa4 black-80">
	          <div className="measure">
	            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
	              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
	              <div className="mt3">
	                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
	                <input
	                  className="pa2 input-reset ba bg-transparent hover-bg-black  w-100"
	                  type="email"
	                  name="email-address"
	                  id="email-address"
	                  //onChange={this.onEmailChange}
	                />
	              </div>
	              <div className="mv3">
	                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
	                <input
	                  className="b pa2 input-reset ba bg-transparent hover-bg-black  w-100"
	                  type="password"
	                  name="password"
	                  id="password"
	                  //onChange={this.onPasswordChange}
	                />
	              </div>
	            </fieldset>
	            <div className="center ">
	              <input
	                //onClick={this.onSubmitSignIn}
	                className="ma2 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
	                type="submit"
	                value="Sign in"
	              />
	              <input
	                //onClick={this.onSubmitSignIn}
	                className=" b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
	                type="submit"
	                value="Not have an account ? Register"
	              />
	            </div>
	          </div>
	        </main>
	    </article>
	)
}
export default Login;