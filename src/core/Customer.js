import React from "react";
import {getPosition} from "./spriteUtils";
import "./Customer.css";

export const Customers = ({positions}) => {
    if (!positions) return "";
    return positions.map((customer, index) => <div key={`customer-${index}`} 
        className="sprite customer" 
        style={getPosition(customer)}>{customer[2]}</div>);
}