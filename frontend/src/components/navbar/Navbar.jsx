import {Link} from "react-router-dom";

export default function Navbar(){
    return (
        <div className="navbar">
            <ul className="navbar__list">
                <li className="nav__item">
                    <Link to="/home">Home</Link>
                </li>
                <li className="nav__item">
                    <Link to="/expenses">Expenses</Link>
                </li>
                <li className="nav__item">
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav__item">
                    <Link to="/about">About</Link>
                </li>
            </ul>

        </div>
    )
}