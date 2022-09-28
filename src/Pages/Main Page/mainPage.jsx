import React from 'react';
import logo from '../../Assets/Images/logo.png';
import user from '../../Assets/Images/user.png';
import table from '../../Assets/Images/table.png'
import atom from '../../Assets/Images/atom.png';
import chemical from '../../Assets/Images/chemical.png';
import mixingTable from '../../Assets/Images/mixingTable.png';
import intelliment from '../../Assets/Images/intelliment.png';
import Card from '../../Components/Card';
import './mainPage.css';
import { useNavigate } from 'react-router-dom';

const mainPage = () => {
  let nav = useNavigate();

  return (
    <main>
        <div className="main-page">
            <div className="header">
                <img src={logo} alt="logo" />
                <div className="user-nav">
                    <div className="greeting">
                        Hi, {localStorage.getItem("username")}!
                    </div>
                    <div className="user-pic">
                        <img src={user} alt="user" />
                    </div>
                </div>
            </div>
            <div className="main-content">
                <div className="hero-wrapper">
                    <img src={atom} alt="" id="atom-1" className="design"/>
                    <div className="hero">
                        <div className="texts">
                            <h1>Welcome to Scien-T!</h1>
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

                <h2>Choose any from these games and enjoy.</h2>
                <div className="games-wrapper">
                    <Card picture={intelliment}
                        name={"Intelliment"}
                        description={"Identify the element based on its atomic number, weight and group."}
                        btnType="teal"
                        path="/intelliment"/>
                    <Card picture={mixingTable}
                        name={"Mixing Table"}
                        description={"Mix different elements and discover a new compound."}
                        btnType="red"
                        path="/mix"/>
                    <Card picture={intelliment}
                        name={"Electron Configuration"}
                        description={"Abracadbara"}
                        btnType="teal"
                        path="/electronConfiguration"/>
                </div>
            </div>
            <footer>
                <div className="contact-us">
                    <h1>Contact Us</h1>
                    <form action="">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email"/>
                        <label htmlFor="message">Message</label> <br />
                        <textarea name="message" id="message" cols="56" rows="10"></textarea>
                        <input type="submit" value="Submit" className="button" />
                    </form>
                </div>
                <p>All Rights Reserved. &copy;2022</p>
            </footer>
        </div>
    </main>
  )
}

export default mainPage