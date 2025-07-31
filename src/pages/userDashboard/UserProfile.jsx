import { UserCard, UserForm } from "../../components";

const UserProfile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6a11cb] to-[#2575fc] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden mt-12 md:mt-0">
        <div className="w-full md:w-[35%] flex justify-center items-center p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/20">
          <div className="w-full h-full">
            <UserCard />
          </div>
        </div>
        <div className="w-full md:w-[65%] flex justify-center items-center p-6 md:p-8">
          <div className="w-full h-full">
            <UserForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
