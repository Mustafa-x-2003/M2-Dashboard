import { useParams } from "react-router";
import { Link } from "react-router";
import QuickEditGallery from "./QuickEdit/QuickEditGallery";
import QuickEditDetails from "./QuickEdit/QuickEditDetails";
import QuickEditStatus from "./QuickEdit/QuickEditStatus";
import useQuickEdit from "../hooks/useQuickEdit";



export default function EditComponent({ ids, popoup, setshowPopup, refresh }) {
  const params = useParams() 
  const id = ids ? ids : params.id
  

 
  const {
    register,
    handleSubmit,

    product,
    status,

    featured,
    active,

    setFeatured,
    setActive,

    handleImageUpload,
    handleMarkedImagetoDelete,

    handleFormKeyDown,
    onsubmit,
  } = useQuickEdit({
    id,
    refresh,
    setshowPopup,
  });
  

  return (
    <div className={popoup ? "flex flex-col xl:flex-row" : "xl:flex mt-8"}>
     
        <div
        className={
          popoup
            ? "w-full xl:w-1/2 p-10 text-[var(--text)]"
            : "w-full 2xl:w-3/5 left-sec bg-card p-10 text-[var(--text)]"
        }
      >
        <QuickEditGallery
          product={product}
          handleImageUpload={handleImageUpload}
          handleMarkedImagetoDelete={handleMarkedImagetoDelete}
        />
      
          

      
         
       
      </div>
      <div
        className={
          popoup
            ? "w-full xl:w-1/2 p-10 text-[var(--text)]"
            : "right-sec w-full 2xl:w-3/5 p-10 2xl:ml-15 text-zinc-50 "
        }
      >
      
          <form className="flex flex-col gap-5"
          onSubmit={handleSubmit(onsubmit)}
          onKeyDown={handleFormKeyDown}
        >
          
          <QuickEditDetails
            register={register}
            
          />
         
          

          
  
          <QuickEditStatus
            featured={featured}
            active={active}
            setFeatured={setFeatured}
            setActive={setActive}
          />
          
          <hr className="bg-gray-100/10 mt-4" />

          <div className="flex gap-4 mt-6">
            <button
              type="button"
              className="px-6 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
            >
              <Link to={0}>Cancel</Link>
            </button>
            <input
              type="submit"
              disabled={status}
              value={status ? "Saving..." : "Save Changes"}
              className="px-6 py-3 rounded-xl bg-cyan-500 text-white hover:bg-cyan-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
            />
            </div>
        
        </form>
      </div>
    </div>
  )
}
