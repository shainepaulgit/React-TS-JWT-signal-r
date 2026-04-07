import { Link } from "react-router-dom";
import { useAuth } from "../providers/authentication/auth-context";

const WelcomePage = () => {
    const { user } = useAuth();
    return (
        <div>
            <h5>Welcome Page ito Bossing Bossing <Link to="/dashboard">Navigate to the dashboard</Link></h5>
            <h6>Email: {user?.email}</h6>
        </div>

    );
}
export default WelcomePage;