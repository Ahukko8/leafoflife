import "@/src/app/(customerFacing)/appointments/globals.css";
import PatientForm from "@/src/components/forms/PatientForm";
import Footer from "@/src/components/homePage/Footer";
import NavBar from "@/src/components/Navbar";
import Image from "next/image";

export default function AppointmentHome() {
  return (
   <div>
    <NavBar/>
     <div className="flex">
      <section className="remove-scrollbar flex-1 overflow-y-auto px-[5%] my-auto">
        <div className="mt-20 mx-auto flex size-full flex-col py-1 max-w-[496px]">
          <PatientForm />
        </div>
      </section>
      <Image
        src="/img/hero-secondary.jpg"
        height={1000}
        width={1000}
        alt="pateint"
        className="side-img max-w-[50%]"
      />
    </div>
    <Footer/>
   </div>
  );
}
