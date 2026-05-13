import { useEffect, useState } from "react";

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [asset, setAsset] = useState("");
  const [employee, setEmployee] = useState("");

  const fetchAssignments = async () => {
    const res = await fetch("https://itam-backend-jgzp.onrender.com//api/assignments");
    const data = await res.json();
    setAssignments(data);
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleAssign = async () => {
    if (!asset || !employee) {
      alert("Fill all fields");
      return;
    }

    await fetch("https://itam-backend-jgzp.onrender.com//api/assignments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ asset, employee }),
    });

    setAsset("");
    setEmployee("");
    fetchAssignments();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Asset Assignment</h1>

      <input
        type="text"
        placeholder="Asset Name"
        value={asset}
        onChange={(e) => setAsset(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Employee Name"
        value={employee}
        onChange={(e) => setEmployee(e.target.value)}
      />
      <br /><br />

      <button onClick={handleAssign}>Assign</button>

      <h3 style={{ marginTop: "20px" }}>Assignments</h3>

      <ul>
        {assignments.map((a) => (
          <li key={a.id}>
            {a.asset} → {a.employee}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Assignments;