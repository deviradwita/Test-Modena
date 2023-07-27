import opening from "../assets/opening.png"
import Form from "../components/Form"

export default function Register(){
    return (
       <section className="flex">
        <div className="bg-white w-full h-screen">
          
            <Form type="register"/>
          
        </div>
        <div className="xl:w-full xl:block hidden bg-white h-screen ">
            <img src={opening} alt="logo" className="w-full h-full object-cover"/>
        </div>
       </section>
    )
   
}