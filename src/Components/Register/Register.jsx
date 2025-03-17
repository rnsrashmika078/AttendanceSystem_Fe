import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useAppContext } from '../AppContext/AppContext';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../Common/InputField";
import DropDown from "../Common/DropDown";
import ProfileImage from "../Common/ProfileImage";
import UploadImage from "../Common/UploadImage";
const Register = ({lec_code}) => {
  const navigate = useNavigate();
  const { accountType } = useAppContext();
  const [error, setError] = useState('');
  const [warning,setWarning] = useState('');
  // temp
  const [login,setLogin] = useState(false)

  const AccountType = [
    "Student",
    "Lecturer",
  ]
  const Departments = [
    "Department Of Information and Communication Technology",
    "Deparment Of Bio System Technology",
    
  ]
  const Year = [
      "1st Year",
      "2nd Year",
      "3rd Year",
      "4th Year"
  ]
  const Batch = [
    "2019/2020",
    "2020/2021",
    "2021/2022",
    "2022/2023",
  ]
  const ICT_Specialization = [
    "Software Technologies",
    "Network Technologies",
    "Multimedia Technologies"
  ]
  const BST_Specialization = [
    "Food",
    "Crop",
    "Animal"
  ]
  
  const [registerDetails,setRegisterDetails] = useState({
    account_type : '',
    dp : '' ,
    init_name: '',
    email: '',
    password: '',
    confirm:'',
    registration_no:'',
    department:'',
    batch:'',
    year:'',
    specialization:'',
    destrict:'',
  })

  const handleOnChange = (e) =>{
    const { name , value ,type ,files} = e.target;
    setError('')
    setRegisterDetails((prev)=>({
      ...prev,[name]: type  === 'file'? files[0]?.name : value
    }))
    // setRegisterDetails({...registerDetails,[name] : type === 'file' ? files[0]?.name : value})    
   }
  
   const handleSignIn = (e) =>{
    e.preventDefault();
    if(accountType === ""){
        setError("Please select the account type")
        return
    }

        if(!registerDetails.init_name){
            setError("Name with the Initial Field is Required!")
            return
        }
        if(!registerDetails.email){
            if(registerDetails.email.includes("@gmail.com")){
                setError("Email must Include @gmail.com!")
                return
            }
            else{
                setError("Email field is Required!")
                return
            }
        }
        if(!registerDetails.password){
            setError("Password field is Required!")
            return
        }
        if(!registerDetails.confirm){
            setError("Confirm Password field is Required!")
            return
        }
        if(!(registerDetails.password === registerDetails.confirm)){
            setError("Password and Confirm password should matched!")
            return
        }
        if(!registerDetails.department){
          setError("Please Choose the Department!")
              return
      }
      if(registerDetails.account_type === 'Student'){
        if(!registerDetails.registration_no){
          setError("Registration Number is Required!")
              return
      }
   
      if(!registerDetails.batch){
          setError("Please Choose the Batch!")
              return
      }
      if(!registerDetails.year){
          setError("Please Choose the Year!")
              return
      }
      if(!registerDetails.specialization){
          setError("Please Choose the Specialize Area!")
              return
      }
      else if(registerDetails.account_type === 'Lecturer'){
        if(!(registerDetails.lecturer_code === lec_code)){
          setError("Lecture Code is Wrong!")
          return
        }
        if(!registerDetails.lecturer_code){
          setError("Please enter Lecturer Code!")
          return
        }
      }
    }
        fetch('http://localhost:8000/api/student_register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerDetails),
          })
            .then(response => response.json())
            .then(data => {
              setError(data.message);
              setTimeout(()=>{
                navigate('/login')
              },1000)
            })
            .catch(error => {
              alert('Error: ' + error.message);
            });
  }
  useEffect(()=>{
    console.log(JSON.stringify(registerDetails) )
  },[registerDetails])
  return (
    <div className="w-auto mx-5">
      <br></br>
      <form className="">
        {/* text-base/7 */}
        <div className="space-y-0 border border-gray-300 rounded-lg p-1">
          <div className=" flex  min-h-full flex-1 flex-col justify-center px-12 py-4 lg:px-8">
            <div className="border-b border-gray-900/10 pb-12">
              <h1 className="text-center  text-3xl font-bold text-gray-900">
                Welocome Back
              </h1>
              <p className="text-center mt-1 text-sm/6 text-gray-600">
                Please Register to Continue to use the Services
              </p>
              {/* First Row */}
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                <DropDown span={2}htmlFor={'account_type'} label={"Account Type"} autoComplete={"account_type"} id={"account_type"}  name={"account_type"} options={AccountType} handleOnChange={handleOnChange}/>
                <InputField span={2} htmlFor='namewithinitial' label='Name with Initials'  placeholder={'Ex: M.W.R.N.Perera'} type="text" name={"init_name"} id="init_name" value={registerDetails.init_name} handleOnChange={handleOnChange}/>
              </div>

              {/* Second Row */}
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                  <UploadImage span={1} label="Display Picture" id="dp" name="dp" handleOnChange={handleOnChange}/> 
              </div>

              {/* Third Row */}
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
                <InputField span={2} htmlFor='Email' label='Email' placeholder={'Ex: abc@gmail.com'} type="email" name={"email"} id="email" value={registerDetails.email} handleOnChange={handleOnChange}/>
                <InputField span={2} htmlFor='password' label='Password'  placeholder='Ex: abc123' type="password" name={"password"} id="password" value={registerDetails.password} handleOnChange={handleOnChange}/>
                <InputField span={2} htmlFor='confirmpassword' label='Confirm Password'  placeholder='Ex: abc123' type="password" name={"confirm"} id="confirmpassword" value={registerDetails.confirm} handleOnChange={handleOnChange}/>
                </div>

                {/* Fourth Row */}
                {registerDetails.account_type === 'Student' ?
                <>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                <InputField span={3} htmlFor='register_no' label='Registration Number'  placeholder={'Ex: SEU/IS/20/ICT/001'} type="text" name={"register_no"} id="register_no" value={registerDetails.registration_no} handleOnChange={handleOnChange}/>
                <DropDown span={3} htmlFor='department' label='Department' autoComplete={"department"} id="department" name="department" handleOnChange={handleOnChange} options={Departments}/>
                </div>

                
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
                <DropDown span={2} htmlFor='year' label='Year' autoComplete={"year"} id="year" name="year" handleOnChange={handleOnChange} options={Year}/>
                <DropDown span={2} htmlFor='batch' label='Batch' autoComplete={"batch"} id="batch" name="batch" handleOnChange={handleOnChange} options={Batch}/>
                <DropDown span={2} htmlFor='specialization' label='Specialization' autoComplete={"specialization"}  name="specialization" id="specialization" handleOnChange={handleOnChange} options={registerDetails.department ===   "Department Of Information and Communication Technology" ? ICT_Specialization:BST_Specialization }/>
                </div>
                </>
                :
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                  <DropDown span={3} htmlFor='department' label='Department' autoComplete={"department"} id="department" name="department" handleOnChange={handleOnChange} options={Departments}/>
                <InputField span={2} htmlFor='lecturerCode' label='Lecturer Code'  placeholder='Lecturer code is only belong to Lecturer' type="text" name={"lecturer_code"} id="lecturer_code" value={registerDetails.lecturer_code} handleOnChange={handleOnChange}/>
                </div> 
                }
            </div>
            {/* <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base/7 font-semibold text-gray-900">
                Personal Information
              </h2>
              <p className="mt-1 text-sm/6 text-gray-600">
                Use a permanent address where you can receive mail.
              </p> 
            </div> */}
          </div>
          <div className="px-15 py-0 mt-0 flex items-center justify-center gap-x-6">
           
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {login ? "Save" : "Register"}
            </button>
          </div> 
          <div className="px-15 py-0 mt-0 flex items-center justify-center gap-x-6">
           
           <p className="mt-5 text-center text-sm/6 text-gray-500">
            Already have an account ?{" "}
            <Link to="/login"><a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Click here to Login
            </a>
            </Link>
          </p>         
           
         </div> 

         
          <br></br>
        </div>
        <br></br>
      </form>
    </div>
  );
};
export default Register;
