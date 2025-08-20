import './CreatorInfo.css'
import { useNavigate } from 'react-router-dom';


const CreatorInfo = ({ name, mainURL, secondaryURL, twitterURL, description, imageURL }) => {
    const navigate= useNavigate();
    
    return (
        <div className="creator-card"
        style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.75)), url(${imageURL})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                padding: "16px",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-end", 
                position: "relative",
            }}>
            <div className="cardActions">
                <button onClick={() => navigate(`/viewCreator/${name}`)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#f6f6f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                </button>
                <button onClick={() => window.location.href = `/editCreator/${name}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="32" viewBox="0 0 24 24" fill="none" stroke="#f6f6f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
                </button>
            </div>
            <div className="creator-content">
                <h2 className="creator-name">{name}</h2>
                <div className="creator-links">

                    <>
                        {mainURL && <a
                            href={mainURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ cursor: "pointer" }}

                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Twitch--Streamline-Svg-Logos" height="35" width="35">
                                <desc>
                                    Twitch Streamline Icon: https://streamlinehq.com
                                </desc>
                                <path fill="#9462e0ff" d="M2.295775 0.25 0.7631825 4.33705V20.68325H6.380075V23.75h3.0666l3.063525 -3.06675h4.5966l6.13005 -6.12785V0.25H2.295775Zm2.041825 2.0422275h16.85655V13.531575L17.617775 17.1082h-5.61775L8.93735 20.170725V17.1082h-4.59975V2.2922275ZM9.95675 12.511175H12V6.38145h-2.04325v6.129725Zm5.61815 0h2.04285V6.38145h-2.04285v6.129725Z" stroke-width="0.25"></path>
                            </svg>
                        </a>}
                    </>

                    <>
                        {secondaryURL && <a
                            href={secondaryURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ cursor: "pointer" }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#d43636ff"><path d="M12.04 3.5c.59 0 7.54.02 9.34.5a3.02 3.02 0 0 1 2.12 2.15C24 8.05 24 12 24 12v.04c0 .43-.03 4.03-.5 5.8A3.02 3.02 0 0 1 21.38 20c-1.76.48-8.45.5-9.3.51h-.17c-.85 0-7.54-.03-9.29-.5A3.02 3.02 0 0 1 .5 17.84c-.42-1.61-.49-4.7-.5-5.6v-.5c.01-.9.08-3.99.5-5.6a3.02 3.02 0 0 1 2.12-2.14c1.8-.49 8.75-.51 9.34-.51zM9.54 8.4v7.18L15.82 12 9.54 8.41z" /></svg>
                        </a>}
                    </>

                    <>
                        {twitterURL && <a
                            href={twitterURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ cursor: "pointer" }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#437de9ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                        </a>}
                    </>

                </div>
                <p className="creator-description">{description}</p>

            </div>
        </div>
    );
};

export default CreatorInfo;
