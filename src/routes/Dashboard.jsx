import SidebarRight from "../components/Layout/SidebarRight";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, login, logout } = useAuth();

  return (


    <>
    <div className="flex justify-between">


         <div >
      <h1>Dashboard</h1>
     {user ? (
  <>
    <p>Welcome, <b>{user.email}</b> ({user.role})</p>
    <button onClick={logout}>Logout</button>
  </>
) : (
  <p>You are not logged in.</p>
)}
    </div>
    <SidebarRight/>
    </div>
   </>
    
  );
}
