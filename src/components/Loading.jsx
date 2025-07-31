const Loading = ({ rows = 10 }) => {
  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-[#6a11cb] to-[#2575fc] px-2 sm:px-4 py-6">
      <div className="overflow-x-auto w-full max-w-6xl mx-auto bg-white/10 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl animate-pulse">
        <table className="min-w-full text-sm text-white">
          <thead className="bg-white/10 text-white/90 uppercase text-[11px] sm:text-xs tracking-wide">
            <tr>
              <th className="px-3 py-3 text-left">ID</th>
              <th className="px-3 py-3 text-left">Username</th>
              <th className="px-3 py-3 text-left">Email</th>
              <th className="px-3 py-3 text-left">Role</th>
              <th className="px-3 py-3 text-left">Phone</th>
              <th className="px-3 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(rows)].map((_, i) => (
              <tr
                key={i}
                className="bg-white/5 border-b border-white/10 hover:bg-white/10 transition-all"
              >
                {[...Array(6)].map((__, j) => (
                  <td key={j} className="px-3 py-3">
                    <div className="h-4 bg-white/20 rounded w-3/4"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Loading;
