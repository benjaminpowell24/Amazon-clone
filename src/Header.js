import React from "react";
import './Header.css';
import {Link} from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import {useStateValue} from './StateProvider';
import { auth } from "./firebase";

function Header(){
    const[{basket, user}, dispatch] = useStateValue();
    
    
    const authHandler = () => {
        if(user){
            auth.signOut();
        }
        
    }



    return(
    <nav className="header">
        <Link to="/">
            <img className="header__logo" src="http://pngimg.com/uploads/amazon/amazon_PNG25.png" alt="Amazon-logo"/>
        </Link>
        <div className="header__search">
            <input type="search" className="header__searchInput"/>
            <SearchIcon className="header__searchIcon"/>
        </div>
        <div className="header__nav">
            <div onClick={authHandler}> 
            <Link to={!user && "/login"} className="header__link">
                <div className="header__option"> 
                    <span className="header__optionOne">Hello, {user ? (user?.displayName) : ('Guest')}</span>
                    <span className="header__optionTwo">{user ? ('Sign Out'):('Sign In')}</span>
                </div>
            </Link>
            </div>     
            <Link className="header__link" to="/orders">
                <div className="header__option">
                    <span className="header__optionOne">Returns</span>
                    <span className="header__optionTwo">& Orders</span>
                </div>
            </Link>
            <Link className="header__link" to="/">
                <div className="header__option">
                    <span className="header__optionOne">Your</span>
                    <span className="header__optionTwo">Prime</span>
                </div>
            </Link> 
            <Link to="/checkout" className="header__link" >
                <div className="header__checkout">
                    <ShoppingBasketIcon/>
                    <span className="header__optionTwo header__basketCount">{basket?.length}</span>
                </div>
            </Link>   
        </div>
    </nav>
 );}

export default Header;