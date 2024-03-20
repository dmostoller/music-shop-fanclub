
export default function Forum() {


    return (
        <div className="ui grid" style={{width:"90%", margin:"auto", minHeight:"100vh", marginTop:"40px"}}>
            <div className="four wide column">
                <table className="ui selectable inverted table">
                    <thead>
                        <tr>
                        <th>Channels</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><i className="comments icon"></i> | general-chat</td>
                        </tr>
                        <tr>
                            <td><i className="comments icon"></i> | music-production</td>
                        </tr>
                        <tr>
                            <td><i class="comments icon"></i> | upcoming-events</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="ten wide column">
                <div className="ui resizable scrolling inverted segment" >
                    <div className="ui inverted comments">
                        <div className="comment" style={{padding:"5px"}}>
                            <div className="avatar">
                                <img src="https://res.cloudinary.com/ddp2xfpyb/image/upload/v1710881589/avatars/IMG_4160_lszktg.png"></img>
                            </div>
                            <div className="content">
                                <div className="author">author
                                    <div className="metadata"> 
                                        <span className="date"><span class="ui red text">date</span></span>
                                    </div>
                                </div>
                                <div className="text"><span className="ui white text">dlksaphjdklsajhdklp;ajhdkl;pjhklja</span>
                                </div>
                                <div className="actions">
                                    <a className="delete">Delete</a>
                                </div>
                            </div>
                        </div>
                        <div className="comment">
                            <div className="avatar">
                                <img src="https://res.cloudinary.com/ddp2xfpyb/image/upload/v1710881589/avatars/IMG_4160_lszktg.png"></img>
                            </div>
                            <div className="content">
                                <div className="author">author
                                    <div className="metadata">
                                        <span className="date">date</span>
                                    </div>
                                </div>
                                <div className="text">dlksaphjdklsajhdklp;ajhdkl;pjhkljashKJLHJASJIKODHAsijdhgijoaHDJIOASHA
                                </div>
                                <div className="actions">
                                    <a className="delete">Delete</a>
                                </div>
                            </div>
                        </div>
                        
                    </div>

                </div>
                <div className="ui bottom attached inverted segment" >
                            <div className="ui fluid text container" >
                                <form className="ui form"  id="comment">  
                                    <div className="field">
                                        <div className="ui transparent inverted icon input" >
                                            <button className="circular ui icon grey button">
                                                <i className="icon plus"></i>
                                            </button>
                                            <input type="text" id="comment" className="prompt" placeholder="Message..."></input>
                                        </div>             
                                    </div>
                                </form>
                            </div>
                        </div>
                   </div> 
            </div>
    )
}