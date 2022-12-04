import nun from '../../../assets/login/nun.svg'
import padlock from '../../../assets/login/padlock.svg'
import manPumpkin from '../../../assets/login/man-pumpkin.svg'
import {Link} from "react-router-dom";

export default function LoginForm(){
    return (
        <div className="login__form--container">
            <img src={manPumpkin} className="form-icon--main" alt="man with a pumpkin over his head"/>
            <h1 className="login__form--header">Hey freak</h1>
            <form>
                <div className="input-container">
                    <input type="text" className="general-input form__input" placeholder="Email"/>
                    <img src={nun} alt="nun icon" className="form-icon "/>
                 </div>
                <div className="input-container">
                    <input type="password" className="general-input form__input" placeholder="Senha"/>
                    <img src={padlock} alt="padlock icon" className="form-icon "/>
                 </div>
                <Link className="login__button" to={"/home"}>Login</Link>
                <h1 className="login__form--footer">Wanna join?</h1>
                <h3 className="login__form--footer-text">Just fill in your information above and click in the button below</h3>
                <button className="login__button-footer">Join</button>
            </form>
        </div>
    )
}