
import { useAuth } from "../../providers/authentication/auth-context";
import { useThemeContext } from "../../providers/theme/theme-context";

const DashboardPage = () => {
    const {logout, user} = useAuth();
    const { toggleMode } =  useThemeContext();
    return(
        <div>
            <button onClick={toggleMode} className="btn-primary">Toggle Theme Mode</button>
            <h5>Dashboard Page lang ito bossing ano kana hahaha <button className="btn btn-danger" onClick={logout}>Logout</button></h5>
            <h6>Email: {user?.email}, Name: {user?.name}</h6>
        </div>
        
    );
}
export default DashboardPage