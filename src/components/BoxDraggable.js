import React from "react";
import { observer } from "mobx-react";
import store from "../stores/MainStore";

function BoxDraggable(props) {
  return (
    <div
      id={props.id}
      className={props.selected ? "box box-selected" : "box"}
      style={{
        backgroundColor: props.color,
        width: props.width,
        height: props.height,
        transform: `translate(${props.left}px, ${props.top}px)`
      }}
      onClick={() => store.onClickBox(props.id)}
    >
      {props.children}
    </div>
  );
}

export default observer(BoxDraggable);
