import { FaEdit } from "react-icons/fa";

const Table = ({ users }) => {
  const getHeaders = () => {
    if (!users || users.length === 0) return [];
    const excludedKeys = [
      "password",
      "__v",
      "otp",
      "refreshToken",
      "phoneOtp",
      "phoneVerified",
      "emailVerified",
    ];
    const allKeys = Object.keys(users[0]);
    return allKeys.filter((key) => !excludedKeys.includes(key));
  };

  const headers = getHeaders();

  const renderCell = (key, value) => {
    if (typeof value === "boolean") {
      return value.toString();
    }
    return <span className="truncate block max-w-[160px]">{value}</span>;
  };

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-[#6a11cb] to-[#2575fc] px-2 sm:px-4 py-6">
      <div className="overflow-x-auto w-full max-w-6xl mx-auto bg-white/10 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl scrollbar-hide">
        <table className="min-w-full text-sm text-white">
          <thead className="bg-white/10 text-white/90 uppercase text-[11px] sm:text-xs tracking-wide">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="px-3 py-3 text-left">
                  {header}
                </th>
              ))}
              <th className="px-3 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="bg-white/5 hover:bg-white/10 transition-all border-b border-white/10"
              >
                {headers.map((key, index) => (
                  <td key={index} className="px-3 py-2">
                    {renderCell(key, user[key])}
                  </td>
                ))}
                <td className="px-3 py-2">
                  <button className="flex items-center gap-1 text-sm text-blue-100 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-300 px-3 py-1.5 rounded-full">
                    <FaEdit className="text-blue-300 text-sm" />
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
