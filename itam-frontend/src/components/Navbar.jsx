function Navbar() {
  return (
    <div className="bg-white shadow px-8 py-4 flex justify-between items-center rounded-xl mb-6">

      <h2 className="text-2xl font-bold text-gray-700">
        IT Asset Management
      </h2>

      <div className="flex items-center gap-4">

        <div className="text-right">
          <p className="font-semibold">
            Admin
          </p>
          <p className="text-sm text-gray-500">
            IT Department
          </p>
        </div>

        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
          A
        </div>

      </div>

    </div>
  );
}

export default Navbar;