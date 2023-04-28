import React from "react";
import { IAction } from "../interfaces/IAction";

const ActionTile = (props: { action: IAction }) => {
  return (
    <li key={props.action.id}>
      <h6>{props.action.title}</h6>
      <div>{/* truc à cocher */}</div>
    </li>
  );
};

export default ActionTile;
