import "./Navbar.css";
import {assets} from "../../assets/admin_assets/assets";

const Navbar = () => {
  return (
    <div>
      <div className="navbar">
            <img className="logo" src={assets.logo} alt="" />
            <img className="profile" src={assets.profile_image} alt="" />
            
        </div>
        <hr/>
    </div>
  )
}

export default Navbar