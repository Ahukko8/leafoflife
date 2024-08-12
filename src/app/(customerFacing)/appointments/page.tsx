import "@/src/app/(customerFacing)/appointments/globals.css";
import PatientForm from "@/src/components/forms/PatientForm";
import Image from "next/image";
import Link from "next/link";

export default function AppointmentHome() {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar flex-1 overflow-y-auto px-[5%] my-auto">
        <div className="mx-auto flex size-full flex-col py-1 max-w-[496px]">
          <PatientForm />
          <div className="text-14-regular mt-5 flex justify-between">
            <p className="justify-items-end text-black xl:text-left">
              © 2024 Leaf Of Life Clinic
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
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
  );
}
