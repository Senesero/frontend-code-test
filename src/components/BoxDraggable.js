import React from "react";
import { observer } from "mobx-react";
import store from "../stores/MainStore";
import interact from 'interactjs'

function BoxDraggable(props) {
  interact('.draggable')
    .draggable({
      // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ],
    // enable autoScroll
    autoScroll: true,

      listeners: {
        move: dragMoveListener,
      }
    })

  function dragMoveListener (event) {
    var target = event.target
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || props.left) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || props.top) + event.dy

    // translate the element
    target.style.webkitTransform =
      target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)'

    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
  }

  return (
    <div
      id={props.id}
      className={props.selected ? "box box-selected draggable" : "box draggable"}
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
