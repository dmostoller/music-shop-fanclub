import React from "react";
import { Link } from "react-router-dom";

export default function AboutPage () {

return (
    <div className="ui middle aligned center aligned grid" style={{minHeight:"100vh", marginTop: "40px"}}>
    <div style={{width: "90%", margin: "auto", marginTop:"20px", marginBottom:"20px"}} className="ui inverted card">
        <div className="image">
            <img className="ui large image" 
            src="https://res.cloudinary.com/ddp2xfpyb/image/upload/v1711600118/superluminal/DSC03154-JK_asmosr.jpg" 
            alt="Superluminal - Sangoma Records"/>
        </div>
        <div className="content">
            <div className="header">
                Superluminal
            </div>
            <div className="meta">
                <span className="category">Philadelphia, PA</span>
            </div>
            <div className="description">
                <p>	Superluminal is the project of Kabayun and his partner, muse, and wife Yasmin. Those who know them together are aware of how much of a symbiosis they are in various ways. She doing art to his music and vice versa - constantly inspiring each other. Now they have taken the next level by making music together!             
                <br></br>Superluminal is the next logical step and the result of both their energies and their love for each other as well as for psychedelic culture. With pumping basslines and twisted soundscapes, it’s the perfect sound to kick up some dust and shake your chakras!</p>
            </div>
            <div className="ui fluid container">
                <div className="ui centered grid">
                    <Link to="https://www.facebook.com/superluminalpsy" target="blank"  className="ui circular facebook icon button" style={{marginTop: "25px", marginRight: "5px"}}>
                        <i className="facebook icon"></i>
                    </Link>
                    <Link to="https://www.youtube.com/channel/UCGePscP8I_b2ta5Vuj1j-bQ" target="blank"  className="ui circular youtube icon button" style={{marginTop: "25px", marginRight: "5px"}}>
                        <i className="youtube icon"></i>
                    </Link>
                    <Link to="https://www.instagram.com/superluminal_psy" target="blank"  className="ui circular icon purple button" style={{marginTop: "25px", marginRight: "5px"}}>
                        <i className="instagram icon"></i>
                    </Link>
                    <Link to="https://www.patreon.com/superluminal_kabayun_yasmin" target="blank"  className="ui circular icon grey button" style={{marginTop: "25px", marginRight: "5px"}}>
                        <i className="patreon icon"></i>
                    </Link>
                    <Link to="https://soundcloud.com/superluminal-sangoma" target="blank"  className="ui circular icon button orange" style={{marginTop: "25px", marginRight: "5px"}}>
                        <i className="soundcloud icon"></i>
                    </Link>
                    <Link to="https://open.spotify.com/artist/7IHjVGAMreozL1Jk2BBj6h" target="blank" className="ui circular icon button green" style={{marginTop: "25px", marginRight: "5px"}}>
                        <i className="spotify icon"></i>
                    </Link>

                </div>
                <div className="ui centered grid" style={{padding: "20px"}}> 
                    <Link to="/contact" className="ui circular secondary fluid button small">Contact Us</Link>
                </div>
            </div>

        </div>
</div>
</div>


)
}