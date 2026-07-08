import {useState} from 'react'
import { useNavigate } from 'react-router' 
import EditComponent from '../components/EditComponent'



function Products() {
  const [showPopup , setshowPopup] = useState(false)
  const [isLoading , setisLoading] = useState(true)
  const [ids , setids] = useState("")
  const navigate = useNavigate()

  const handleOpenPopUp = (id)=>{
    setshowPopup(true)
    setids(id)
  }
  return (
    <div>
      <h1>product page</h1>

{/* ------------------------------------Quick edit button ------------------------------------------- */}
{/* You must pass the id of product // replace it place */}
      <button className="bg-sky-700 text-white p-2 rounded-3xl" onClick={()=>handleOpenPopUp("6a18bc103b36e3c02703c96c")}>Test Edit Popup</button>
{showPopup &&(
  <div className='  backdrop-blur-sm w-[100%]  h-[91vh]  absolute left-0 top-25'>
    <div className=' w-[85%] h-[98%] m-auto bg-card overflow-y-auto'>

<div className='fixed text-2xl text-white  items-center flex justify-between z-10 w-[85%] rounded-t-2xl  h-10 p-15 bg-gray-800'>
    <h6 >Edit Page</h6>
        <button className='' onClick={()=> {setshowPopup(false)
          setisLoading(true)
        }}>Close</button>
    
</div>

  <EditComponent isLoading={isLoading} setisLoading={setisLoading} ids="6a1b687a8be75452394dc686" popoup={true} setshowPopup={setshowPopup}/>
    </div>
  </div>
)}

{/* ----------------------------------------------------------------------------------- -------------------*/}


<button className="text-white bg-sky-700 p-2 rounded-3xl ml-5" onClick={()=>{
navigate("edit/6a1b687a8be75452394dc686")  // replace this static id with your id variable
}}>Edit Page</button>


    </div>
  )
}

export default Products
