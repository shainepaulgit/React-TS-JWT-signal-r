import { useAuth } from "../../providers/authentication/auth-context";

const DashboardPage = () => {
    const {logout, user} = useAuth();
    return(
        <div>
            <h5>Dashboard Page lang ito bossing ano kana hahaha <button className="btn btn-danger" onClick={logout}>Logout</button></h5>
            <h6>Email: {user?.email}, Name: {user?.name}</h6>
        </div>
        
    );
}
export default DashboardPage