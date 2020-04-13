import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';

import './Registration.css'


function Registration(props) {
    const [user, setUser]
        = useState({
            _id: '',
            usertype: '',
            password: '',
            firstname: '',
            lastname: '',
            username: '',
            address: '',
            city: '',
            postalCode: '',
            phoneNumber: '',
            email: '',
        });

    const [valid, setValidation]
        = useState({
            ispasswordValid: false,
            isfirstnameVaild: false,
            islastnameVaild: false,
            isusernameValid:false,
            isaddressValid: false,
            iscityVaild: false,
            ispostalCodeValid: false,
            isphoneNumberVaild: false,
            isEmailValid: false
        });
    const [showLoading, setShowLoading] = useState(false);
    const apiUrl = "http://localhost:3000/";

    const saveUser = (e) => {
        setShowLoading(true);
        e.preventDefault();
        const data = {
            usertype: user.usertype,
            firstname: user.firstname,
            lastname: user.lastname,
            username:user.username,
            email: user.email,
            password: user.password,
            phoneNumber: user.phoneNumber,
            address: user.address,
            city: user.city,
            postalCode: user.postalCode

        };

        axios.post(apiUrl, data)
            .then((result) => {
                setShowLoading(false);
                props.history.push('/' + result.data._id)
            }).catch((error) => setShowLoading(false));
    };


    const onChange = (e) => {
        // e.persist();
        if (e.target.name === 'firstname') {
            if (e.target.value.length > 1) {
                setValidation({ isfirstnameVaild: true })
                setUser({ firstname: e.target.valid })
               
            }
            else {
                setValidation({ isfirstnameVaild: false })
            }
        } console.log(e.target.value)
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const validateLastname = (e) => {
        if (e.target.value.length > 1) {
            setValidation({ islastnameVaild: true })
        } else {
            setValidation({ islastnameVaild: false })
        }
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const validateEmail = (e) => {
        const emailRegExp = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
      
        if (e.target.value.match(emailRegExp)) {
            setValidation({ isEmailValid: true })
        } else {
            setValidation({ isEmailValid: false })
        }setUser({ ...user, [e.target.name]: e.target.value });
      };

      const validatePhoneNumber = (e) => {
        const phoneNumberRegExp = /^\d{3}-\d{3}-\d{4}$/;
      
        if (e.target.value.match(phoneNumberRegExp)) {
            setValidation({ isphoneNumberVaild: true })
        } else {
            setValidation({ isphoneNumberVaild: false })
        }setUser({ ...user, [e.target.name]: e.target.value });
      };
      const validatePassword = (e) => {
        if (e.target.value.length > 3) {
            setValidation({ ispasswordValid: true })
        } else {
            setValidation({ ispasswordValid: false })
        }
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const validateUsername = (e) => {
        if (e.target.value.length > 3) {
            setValidation({ isusernameVaild: true })
        } else {
            setValidation({ isusernameVaild: false })
        }
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const validateAddress = (e) => {
        if (e.target.value.length > 7) {
            setValidation({ isaddressValid: true })
        } else {
            setValidation({ isaddressValid: false })
        }
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const validateCity = (e) => {
        if (e.target.value.length > 1) {
            setValidation({ iscityVaild: true })
        } else {
            setValidation({ iscityVaild: false })
        }
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const validatePostalCode = (e) => {
        if (e.target.value.length > 5) {
            setValidation({ ispostalCodeValid: true })
        } else {
            setValidation({ ispostalCodeValid: false })
        }
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const isEnteredFirstNameValid = () => {if (user.firstname) return valid.isfirstnameVaild;};
    const isEnteredLastNameValid = () => {if (user.lastname) return valid.islastnameVaild;};
    
    const isEnteredUserNameValid = () => {if (user.username) return valid.isusernameVaild;};
    const isEnteredEmailValid = () => {if (user.email) return valid.isEmailValid;};
    const isEnteredPasswordValid = () => {if (user.password) return valid.ispasswordValid;};
    const isEnteredPhoneValid = () => {if (user.phoneNumber) return valid.isphoneNumberVaild;};
    const isEnteredAddressValid = () => {if (user.address) return valid.isaddressValid;};
    const isEnteredCityValid = () => {if (user.city) return valid.iscityVaild; };
    const isEnteredPostalValid = () => {if (user.postalCode) return valid.ispostalCodeValid;};

    const inputClassNameHelper = boolean => {
        switch (boolean) {
            case true:
                return 'is-valid';
            case false:
                return 'is-invalid';
            default:
                return '';
        }
    };

    return (
        <div>
            {showLoading &&
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            }

            <div className="App">
                <br></br>
                <h2> Create a New Account  </h2>
                <h4> Come join our Hero health! Let's set up your account.</h4>

                <form className="signUpForm" onSubmit={saveUser}>
                <div><label className="form-group" htmlFor="">User Type</label> </div>
                    <div className="form-control">
                        <div className=" col-sm-2 form-check form-check-inline">
                            <input className="form-check-input" name="usertype" type="radio" id="inlineCheckbox1" value="nurse" onChange={onChange} />
                            <label className="form-check-label" for="inlineCheckbox1">Nurse</label>
                        </div>
                        <div className="col-sm-2 form-check form-check-inline">
                            <input className="form-check-input" name="usertype" type="radio" id="inlineCheckbox1" value="patient" onChange={onChange} />
                            <label className="form-check-label" for="inlineCheckbox1">Patient</label>
                        </div> 
                    </div><br></br>
                    <div className="form-group row">
                        <label htmlFor="name">First Name</label>
                        <input
                            type="text"
                            className={`form-control ${inputClassNameHelper(isEnteredFirstNameValid())}`}
                            id="firstname"
                            name="firstname"
                            value={user.firstname}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="name">Last Name</label>
                        <input
                            type="text"
                            className={`form-control ${inputClassNameHelper(isEnteredLastNameValid())}`}
                            id="lastname"
                            name="lastname"
                            value={user.lastname}
                            onChange={validateLastname}
                        />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="name">Username</label>
                        <input
                            type="text"
                            className={`form-control ${inputClassNameHelper(isEnteredUserNameValid())}`}
                            id="username"
                            name="username"
                            value={user.username}
                            placeholder="Username for signin"
                            onChange={validateUsername}
                        />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="emailInput">Email</label>
                        <input
                            type="email"
                            className={`form-control ${inputClassNameHelper(isEnteredEmailValid())}`}
                            id="emailInput"
                            aria-describedby="emailHelp"
                            placeholder="abc@gmail.com"
                            name="email"
                            value={user.email}
                            onChange={validateEmail}

                        />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="">Password</label>
                        <input
                            type="password"
                            className={`form-control ${inputClassNameHelper(isEnteredPasswordValid())}`}
                            id="passwordInput"
                            placeholder="Please use strong password"
                            name="password"
                            value={user.password}
                            onChange={validatePassword}

                        />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="phoneNumberInput">Phone Number</label>
                        <input
                            type="text"
                            className={`form-control ${inputClassNameHelper(isEnteredPhoneValid())}`}
                            id="phoneNumberInput"
                            placeholder="ex)416-1234-1234"
                            name="phoneNumber"
                            value={user.phoneNumber}
                            onChange={validatePhoneNumber}

                        />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="">Address</label>
                        <input
                            type="text"
                            className={`form-control ${inputClassNameHelper(isEnteredAddressValid())}`}

                            id="passwordInput"
                            placeholder="ex)941 Progree Ave"
                            name="address"
                            value={user.address}
                            onChange={validateAddress}
                        />
                    </div>
                    <div className="form-group row">
                        <label className="col-md-2" htmlFor="">City</label>
                        <input
                            type="text"
                            className={`form-control col-md-5 ${inputClassNameHelper(isEnteredCityValid())}`}

                            id="cityInput"
                            placeholder="ex)Scarborough"
                            name="city"
                            value={user.city}
                            onChange={validateCity}
                        />

                        <label className="col-md-2" htmlFor="">Postal Code</label>
                        <input
                            type="text"
                            className={`form-control col-md-3  ${inputClassNameHelper(isEnteredPostalValid())}`}

                            id="postalCodeInput"
                            placeholder=" M1G 3T8"
                            name="postalCode"
                            value={user.postalCode}
                            onChange={validatePostalCode}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                        Submit
                     </button>
                </form>
            </div>
        </div>
    );
}

export default withRouter(Registration);
