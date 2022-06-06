import AppContext from "../context/context";
import React from "react";
export const useCart = () => {
    const {sneakersInCart,setSneakersInCart} = React.useContext(AppContext);
    const sum = sneakersInCart.reduce((sum,obj)=> obj.price+sum,0);

    return { sum,sneakersInCart,setSneakersInCart};
}

