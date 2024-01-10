import mainLogo from'../assets/Raw_Transparent_Crop.png';
import React, {useState, useEffect} from 'react';
import './Footer.scss';
import { Link, useNavigate, useLocation } from "react-router-dom";


export default function Footer() {
    return (
      <div className='Footer'>
        <ul>
            <li><a target="_blank" href="https://twitter.com/MetawayStudio"><img width="36" height="36" src="https://img.icons8.com/ios/50/D9E3EA/twitterx.png" alt="twitterx"/></a></li>
            <li><a target="_blank" href="https://discord.gg/mKmgta9cM8"><img width="36" height="36" src="https://img.icons8.com/ios/50/D9E3EA/discord-logo--v1.png" alt="discord-logo--v1"/></a></li>
            <li><a target="_blank" href="https://www.patreon.com/MetawayStudio"><img width="36" height="36" src="https://img.icons8.com/ios/50/D9E3EA/patreon.png" alt="patreon"/></a></li>
            <li><a target="_blank" href="https://steamcommunity.com/groups/metaway"><img width="36" height="36" src="https://img.icons8.com/ios/50/D9E3EA/steam.png" alt="steam"/></a></li>
        </ul>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Services</Link></li>
            <li><Link to="/">About</Link></li>
            <li><Link to="/terms">Terms</Link></li>
            <li><Link to="/privacy_policy">Privacy Policy</Link></li>

        </ul>
        <p>Metaway Studio SAS © 2023</p>
      </div>
    );
  }
  