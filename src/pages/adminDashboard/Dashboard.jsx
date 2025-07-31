import { useEffect, useState } from "react";
import { Table } from "../../components";
import api from "../../api/api";
import Loading from "../../components/Loading";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return loading ? <Loading /> : <Table users={users} />;
};

export default Dashboard;
