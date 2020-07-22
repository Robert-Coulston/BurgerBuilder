import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";

const NavigationItems = (props) => {

  const authLink = !props.isAuthenticated ? <NavigationItem link={"/auth"}>Login</NavigationItem> : <NavigationItem link={"/logout"}>Logout</NavigationItem>
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link={"/"}>
        Burger Builder
      </NavigationItem>
      { props.isAuthenticated && <NavigationItem link={"/orders"}>Orders</NavigationItem>}
      {authLink}
    </ul>
  );
};

export default NavigationItems;
