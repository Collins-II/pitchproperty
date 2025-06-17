import Image from "next/image";
import { redirect } from "next/navigation";

import RegisterForm from "@/components/forms/RegisterForm";
import { getUserById } from "@/app/actions/getUser";
import { IUser } from "@/lib/database/models/user.model";

interface SearchParamProps {
  params: {
    userId: string;
  };
}

const Register = async ({params}: {params: Promise<{ userId: string }>}) => {
  const {userId } = await params;
  const user = await getUserById(userId);

  return (
    <div className="flex h-auto w-full flex-col items-center justify-center bg-white dark:bg-gray-900">
      <section className="custom-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          <RegisterForm user={user as IUser} />

          <p className="copyright py-12">© 2024 CarePluse</p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;
