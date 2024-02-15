import { useState, useEffect } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/users", {
        // may need to add authentication token also
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/admin/users/${userId}`, {
        // may need to add authentication token also
      });
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <div>
              <img
                src={user.url || "placeholder_image_url"}
                alt="User Avatar"
                style={{ width: "100px", height: "100px" }}
              />
            </div>
            First Name: {user.first_name || "No First Name"}
            <br />
            Email: {user.email}
            <br />
            Gender: {user.gender_identity || "Not Specified"}
            <br />
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
