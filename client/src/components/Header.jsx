import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/donation">Donation</Link>
        </header>
    );
}