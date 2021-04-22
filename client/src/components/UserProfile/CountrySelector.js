import React, { useState, useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'

import { useDispatch, useSelector } from 'react-redux';

import { updateProfile } from '../../actions/profile';
import { useEffect } from 'react/cjs/react.development';

const age = [{value: 18, label: 18}];
const height = [{value: 180, label: 180}]
const weight = [{value: 80, label: 80}];

function CountrySelector() {
  const [value, setValue] = useState({})
  const [user, setUser] = useState({});

  const options = useMemo(() => countryList().getData(), []);

  const dispatch = useDispatch();

  const changeHandler = (val, {name}) => {
      console.log(val)
      setValue({...value, [name]: val.label});
  }
  const textHandler = (e) => {
    e.preventDefault();
    setValue({...value, [e.target.name]: e.target.value});
  }

  const formSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(user._id, {...user, ...value}));
    //dispatch(updateProfile(user._id, {...user, ...value, age: value.age.label, height: value.height.label, weight: value.weight.label}));
  }

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('profile')).result;
    setUser(profile);
  }, [])

  console.log('usr', user)
  console.log(value);

  return (
      <div>
        <form className='p-5' onSubmit={formSubmit}>
            <label htmlFor="">Country</label>
            <Select className='mb-1' options={options} value={value.country} onChange={changeHandler} name="country" />
            <label htmlFor="">City</label>
            <input type='text' name='city' onChange={textHandler} className='form-control mb-1' placeholder='Enter your city'></input>
            <label htmlFor="">Age</label>
            <Select className='mb-1' options={age} value={value.age} onChange={changeHandler} name = "age"/>
            <label htmlFor="">Height</label>
            <Select className='mb-1' options={height} value={value.height} onChange={changeHandler} name = "height"/>
            <label htmlFor="">Weight</label>
            <Select className='mb-1' options={weight} value={value.weight} onChange={changeHandler} name = "weight"/>
            <label htmlFor="">Description</label>
            <textarea onChange={textHandler} name='description' style={{resize:'none'}} className="form-control mb-1" id="exampleFormControlTextarea1" rows="3"></textarea>
            <button type='submit' className='btn btn-success'>Submit</button>
        </form>
      </div>
)
}

export default CountrySelector;