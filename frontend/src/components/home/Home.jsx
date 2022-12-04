import spider from '../../assets/home/spider.svg'
import doll from '../../assets/home/voodoo-doll.svg'
import pumpkin from '../../assets/home/pumpkin.svg'
import eye from '../../assets/home/eye.svg'
import {Link} from "react-router-dom";
import NotFound from "../NotFound";
export default function Home(){
    return (
        <div className="home__container">
            <div className="home__header">
                <img src={spider} className="home__spider"  alt="spider"/>
                <h1>Hey, John</h1>
            </div>
            <h3 className="intro-header">Let’s check your last interactions…</h3>
            <img src={doll} className="home__doll"  alt="doll with needles "/>
            <div className="home__card-container">
                <NotFound />
            </div>


                <div style={{display:'flex', position: 'relative'}} className="button__container">
                    <Link to={'/expenses'} className="login__button">
                        <span>see</span>
                        <img src={eye} className="home__eye"  alt="eye"/>
                       <span>more</span>
                    </Link>

                </div>





        </div>
    )
}