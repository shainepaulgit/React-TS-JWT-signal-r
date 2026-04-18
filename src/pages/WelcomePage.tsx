import { Link } from "react-router-dom";
import { useAuth } from "../providers/authentication/auth-context";
import { useThemeContext } from "../providers/theme/theme-context";

const WelcomePage = () => {
    const { user } = useAuth();
    const { toggleMode, accentMap, changeAccent } = useThemeContext();
    return (

        <div>
            <h5>Welcome Page ito Bossing Bossing <Link to="/dashboard">Navigate to the dashboard</Link></h5>
            <h6>Email: {user?.email}</h6>

            <button onClick={toggleMode} className="btn btn-primary">Toggle Theme Mode</button>
            <ul className="list-unstyled">
                {Object.entries(accentMap).map(([key, c]) => (
                    <li className="my-4 bg-body-secondary" key={key} >
                        <button className="btn btn-sm" onClick={() => {
                            changeAccent(key)
                        }}>{c.name}</button>
                        <span className="p-5 rounded-circle" style={{ color: c.value }}></span>
                    </li>
                ))}
            </ul>
        </div>

    );
}
export default WelcomePage;