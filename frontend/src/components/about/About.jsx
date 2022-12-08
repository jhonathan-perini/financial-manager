import monster from '../../assets/about/monster.svg'
import letter from '../../assets/about/letter.svg'

export default function About(){
    return (
        <div className="about__container">
            <img src={monster} alt="pink monster showing your tongue with three eyes" className="about__image"/>
            <p>Hey</p>
            <p>Thank you for supporting our application.</p>
            <p>Its purpose is to be a seasonal themed app adapting in response for some holiday</p>
            <p>We hope you enjoy</p>
            <p>If you have something to say please feel free to let us know using the form below</p>
            <div className="about-form__container">
                <div style={{display: 'flex'}}>
                <img src={letter} alt="letter with skull" className="about-form__icon"/>
                <form style={{marginRight: '80px'}}>
                    <input className="general-input"/>
                    <input className="general-input"/>
                    <textarea className="general-input" ></textarea>
                </form>
                </div>
                <button style={{margin: '40px'}}>sudhushdhushdushd</button>
            </div>

        </div>
    )
}