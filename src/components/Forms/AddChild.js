import React, {useState} from 'react';
function AddChild(){
    const [Name , setName] = useState('')
	const [Father_Name , setFather_Name] = useState('')
    const [DateOfBirth , setDateOfBirth] = useState('')
    const [PlaceOfBirth , setPlaceOfBirth] = useState('')
    const [Father_PhoneNum , setFather_PhoneNum] = useState('')
    const [Address , setAddress] = useState('')


	//const onEmailChange = (e: ITarget) => setEmail(e.target.value);
	//const onPasswordChange = (e: ITarget) => setPassword(e.target.value);
	return(
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-light-green">
	        <main className="pa4 black-80">
		        <div className="measure">
		            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
		              <legend className="f1 fw6 ph0 mh0">Register As Child</legend>
		              <div className="mt3">
		                <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
		                <input
		                  className="pa2 input-reset ba bg-transparent hover-bg-black  w-100"
		                  type="name"
		                  name="name"
		                  id="name"
		                />
		              </div>
		              <div className="mt3">
		                <label className="db fw6 lh-copy f6" htmlFor="email-address">Father_Name</label>
		                <input
		                  className="pa2 input-reset ba bg-transparent hover-bg-black  w-100"
		                  type="name"
		                  name="Father_Name"
		                  id="Father_Name"
		                  //onChange={this.onEmailChange}
		                />
		              </div>
		              <div className="mt3">
		                <label className="db fw6 lh-copy f6" htmlFor="email-address">DateOfBirth</label>
		                <input
		                  className="pa2 input-reset ba bg-transparent hover-bg-black  w-100"
		                  type="date"
		                  name="DateOfBirth"
		                  id="DateOfBirth"
		                  //onChange={this.onEmailChange}
		                />
		              </div>
		              <div className="mv3">
		                <label className="db fw6 lh-copy f6" htmlFor="password">PlaceOfBirth</label>
		                <input
		                  className="b pa2 input-reset ba bg-transparent hover-bg-black  w-100"
		                  type="text"
		                  name="PlaceOfBirth"
		                  id="PlaceOfBirth"
		                  //onChange={this.onPasswordChange}
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
		              <div className="mv3">
		                <label className="db fw6 lh-copy f6" htmlFor="password">Father_PhoneNum</label>
		                <input
		                  className="b pa2 input-reset ba bg-transparent hover-bg-black  w-100"
		                  type="phonenumber"
		                  name="Father_PhoneNum"
		                  id="Father_PhoneNum"
		                  //onChange={this.onPasswordChange}
		                />
		              </div>
		            </fieldset>
		            <div className="center ">
		            
		              <input
		                //onClick={this.onSubmitSignIn}
		                className=" b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
		                type="submit"
		                value="Register"
		              />
		            </div>
		        </div>
	        </main>
	    </article>
	);
} 

export default AddChild;
