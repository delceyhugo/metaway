import './Home.scss';
import { useState, useEffect, useRef } from "react";

export default function Home() {
    const [version, setVersion] = useState("loading")
    const timer = useRef(null)

    const downloadClick = (e) =>{
        clearTimeout(timer.current)
        e.target.classList.remove("button-b")
        e.target.classList.add("button-c")
        e.target.innerHTML = 'Download Started'
        timer.current = setTimeout(() => {
            e.target.classList.remove("button-c")
            e.target.classList.add("button-b")
            e.target.innerHTML = 'Download Game'
        }, 3000)
    }
    useEffect(() => {
        getGameVersion()
    }, [])
    const getGameVersion = () => {
        fetch(process.env.REACT_APP_APIURL + '/access/getGameVersion', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => res.json())
        .then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                // setData(data)
                console.log(data[0].gameVersion);
                setVersion(data[0].gameVersion)
            }
        })
    }




    return (
        <div className="Home">
            <div className='display'>
                <h1>We are Metaway Studio</h1>
                <p>A team of passionate indie game developers. Aims to create unique and captivating gaming experiences.</p>
            </div>
            <div className='content'>
                <h2>Private Alpha</h2>
                <p>We are thrilled to announce that the private alpha of our game is about to begin! <br />
                 Your participation is crucial in helping us with you feedback before its official launch. <br />
                  We sincerely thank you for joining this important phase of development.</p>
                <h2>How to help us ?</h2>
                <p>Feel free to share your reactions, ideas, and observations on game mechanics, balance, or any other aspects on <a href="https://discord.gg/mKmgta9cM8">Discord</a>. <br />
                 Your feedback will help us fine-tune and optimize the game.
                 </p>
                <h2>Warning</h2>
                <p>Remember, this alpha version is a snapshot of the development journey. <br />
                 As an alpha version, our game is a work in progress, and you might encounter various bugs, temporary user interface, incomplete features, and rough edges.</p>
                <h2>How to play ?</h2>
                <p>Download the game below. <br />
                 You must be connected to steam and have a key.<br /> 
                 You will be asked for your key when launching the game. <br />
                 You don't have any key ? ask us on <a href="https://discord.gg/mKmgta9cM8">Discord</a> or <a href="https://twitter.com/MetawayStudio">Twitter</a>
                 </p>
                <a onClick={(e) => downloadClick(e)} className="button-b" href={`https://www.googleapis.com/drive/v3/files/${process.env.REACT_APP_DOWNLOADID}?alt=media&key=${process.env.REACT_APP_APIGOOGLE}`} download="Metaway_Studio_Game">Download Game</a>
                <p>Version : {version === 'loading' ? 'Loading . . . ' : version}</p>
                <p>*For Windows only</p>
            </div>
        </div>
    );
}


// https://www.googleapis.com/drive/v3/files/10ySskGCnHb_I5xneIsMTfpNzuGfCQQvS?alt=media&key=AIzaSyAXigUsXQqeMuriomMa0Z07bv01dId-Vlo