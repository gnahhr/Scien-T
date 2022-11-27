import React from 'react';
import { useNavigate } from 'react-router-dom';

//Components
import Card from '../../Components/Card';

//Images
import table from '../../Assets/Images/table.png'
import atom from '../../Assets/Images/atom.png';
import chemical from '../../Assets/Images/chemical.png';

//Data
import mainLinks from '../../Data/MainLinks';


//Design
import './mainPage.css';

const mainPage = () => {
  let nav = useNavigate();

  return (
    <>
        <div className="main-page">
            <div className="main-content">
                <div className="hero-wrapper">
                    <img src={atom} alt="" id="atom-1" className="design"/>
                    <div className="hero">
                        <div className="texts">
                            <h1>Welcome to Scien-T!</h1>
                        </div>
                        <div className="sub-text">
                            <h3>Let's have fun learning by gaming.</h3>
                            <p>A game based learning platform to learn the periodic table in a more interactive and fun way.</p>
                        </div>
                    </div>
                    <div className="lower-design">
                            <div className="left-design">
                                <img src={atom} alt="" id="atom-2" className="design"/>
                            </div>
                            <div className="right-design">
                                <img src={chemical} alt="" id="chemical-1" className="design"/>
                                <img src={chemical} alt="" id="chemical-2" className="design"/>
                            </div>
                        </div>
                </div>

                <h2>Let's learn the Periodic Table and its use!</h2>
                <div className="main-table-wrapper">
                    <div className="main-table">
                        <img src={table} alt="periodic table" />
                    </div>
                    <button className="teal" onClick={() => nav("/periodicTable")}>
                        LEARN NOW!
                    </button>
                </div>
                <div className="games-wrapper">
                    {mainLinks && mainLinks.filter((link) => link.type === "learn").map((data) =>
                    <Card
                        key={data.name}
                        type={data.type}
                        picture={`/images/${data.picture}`}
                        name={data.name}
                        description={data.desc}
                        btnType={data.btnType}
                        path={data.path}/>)}
                </div>
                <h2>Choose any from these games and enjoy.</h2>
                <div className="games-wrapper">
                    {mainLinks && mainLinks.filter((link) => link.type === "game").map((data) =>
                    <Card
                        key={data.name}
                        type={data.type}
                        picture={`/images/${data.picture}`}
                        name={data.name}
                        description={data.desc}
                        btnType={data.btnType}
                        path={data.path}/>)}
                </div>
            </div>
            <footer>
                <div className="contact-us">
                    <h1>Contact Us</h1>
                    <form action="mailto:cs62scient@gmail.com" method="get" enctype="text/plain">
                        <label htmlFor="body">Message</label> <br />
                        <textarea name="body" id="body" cols="56" rows="10"></textarea>
                        <input type="submit" value="Submit" className="button" />
                    </form>
                </div>
                <p>All Rights Reserved. &copy;2022</p>
            </footer>
        </div>
    </>
  )
}

export default mainPage