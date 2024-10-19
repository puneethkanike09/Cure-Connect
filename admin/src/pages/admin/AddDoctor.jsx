import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passowrd, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const [loading, setLoading] = useState(false); 

  const { backendUrl, aToken } = useContext(AdminContext);
  console.log(backendUrl, aToken);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!docImg) {
        return toast.error("Please upload doctor image");
      }
      if (passowrd.length < 8) {
        return toast.error("Please provide strong password");
      }
      

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", passowrd);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({
          line1: address1,
          line2: address2,
        })
      );

      //clg formdata
      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      });
      setLoading(true);
      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } }
      );
      if (data.success) {
        setLoading(false);
        toast.success(data.message);
        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("")
        setFees("");
        setAbout("");
        setDegree("");
        setAddress1("");
        setAddress2("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium'>Add doctor</p>
      <div className='bg-white px-8 py-8 border rounded-lg w-full max-w-7xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500 '>
          <label htmlFor='doc-img'>
            <img
              className='w-16 bg-gray-100 rounded-full cursor-pointer'
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=''
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type='file'
            id='doc-img'
            hidden
          />
          <p>
            Upload doctor <br /> picture
          </p>
        </div>
        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600 '>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className='w-full p-3 rounded-lg bg-[#eaeaea] focus:outline-none focus:ring-2 focus:ring-primary text-base'
                type='text'
                placeholder='Name'
                required
              />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p className='flex-1 flex flex-col gap-1'>Doctor email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className='w-full p-3 rounded-lg bg-[#eaeaea] focus:outline-none focus:ring-2 focus:ring-primary text-base'
                type='email'
                placeholder='Email'
                required
              />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p className='flex-1 flex flex-col gap-1'>Doctor passowrd</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={passowrd}
                className='w-full p-3 rounded-lg bg-[#eaeaea] focus:outline-none focus:ring-2 focus:ring-primary text-base'
                type='text'
                placeholder='Password'
                required
              />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Experience</p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className='w-full p-3 rounded-lg bg-[#eaeaea] focus:outline-none focus:ring-2 focus:ring-primary text-base'
                name=''
                id=''
              >
                <option value='1 Year'>1 Year</option>
                <option value='2 Year'>2 Year</option>
                <option value='3 Year'>3 Year</option>
                <option value='4 Year'>4 Year</option>
                <option value='5 Year'>5 Year</option>
                <option value='6 Year'>6 Year</option>
                <option value='7 Year'>7 Year</option>
                <option value='8 Year'>8 Year</option>
                <option value='9 Year'>9 Year</option>
                <option value='10 Year'>10 Year</option>
              </select>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor fees</p>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                className='w-full p-3 rounded-lg bg-[#eaeaea] focus:outline-none focus:ring-2 focus:ring-primary text-base'
                type='number'
                placeholder='Fee'
                required
              />
            </div>
          </div>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Speciality</p>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className='w-full p-3 rounded-lg bg-[#eaeaea] focus:outline-none focus:ring-2 focus:ring-primary text-base'
                name=''
                id=''
              >
                <option value='General physician'>General physician</option>
                <option value='Gynecologist'>Gynecologist</option>
                <option value='Dermatologist'>Dermatologist</option>
                <option value='Pediatricians'>Pediatricians</option>
                <option value='Neurologist'>Neurologist</option>
                <option value='Gastroenterologist'>Gastroenterologist</option>
              </select>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor education</p>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                className='w-full p-3 rounded-lg bg-[#eaeaea] focus:outline-none focus:ring-2 focus:ring-primary text-base'
                type='text'
                placeholder='Education'
                required
              />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Address</p>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                className='w-full p-3 rounded-lg bg-[#eaeaea] focus:outline-none focus:ring-2 focus:ring-primary text-base'
                type='text'
                placeholder='Address 1'
                required
              />
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                className='w-full p-3 rounded-lg bg-[#eaeaea] focus:outline-none focus:ring-2 focus:ring-primary text-base'
                type='text'
                placeholder='Address 2'
                required
              />
            </div>
          </div>
        </div>
        <div>
          <p className='mt-4 mb-2'>About doctor</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className='w-full p-3 rounded-lg bg-[#eaeaea] focus:outline-none focus:ring-2 focus:ring-primary text-base'
            placeholder='Write about doctor'
            rows={5}
            required
          />
        </div>
        <button
          type="submit"
          className={`bg-primary px-10 py-3 text-white mt-4 rounded-full ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? "Adding doctor..." : "Add doctor"} 
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
