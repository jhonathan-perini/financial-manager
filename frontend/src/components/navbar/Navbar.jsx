import {Link} from "react-router-dom";
import Dialog from "../dialog/Dialog";
import {useState} from "react";
import skin from '../../assets/skin.svg'
export default function Navbar(){
    const [dialog,setDialog] = useState(false)
    return (
        <div className="nav__content">
            {dialog && <div className="overlay"/>}
            <Dialog dialogState={{dialog, setDialog}} confirmAction={() => setDialog(false)}  >
                <div className="skin__dialog dialog__content">
                    <img src={skin} alt="skins available" className="skin__image"/>
                    <div className="skin__text">
                        <h1>Want a new style? </h1>
                        <p>We're to announce our new skin feature.</p>
                        <p>For only <b>$2.99</b> you would enjoy a new thematic layout!</p>
                        <p>Coming soon</p>
                    </div>

                </div>
            </Dialog>
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
                    <a onClick={() => setDialog(true)}>Skins</a>
                </li>
                <li className="nav__item">
                    <Link to="/about">About</Link>
                </li>

            </ul>

        </div>
        </div>
    )
}