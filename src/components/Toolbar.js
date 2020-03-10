import React, { Component } from "react";
import store from "../stores/MainStore";
import { observer } from "mobx-react";
import uuid from "uuid";
import getRandomColor from "../utils/getRandomColor";
import { getRandomCoordinate } from "../utils/getRandomCoordinatey";

const BOXES = 'boxes'

class Toolbar extends Component {
  addBox() {
    const box = {
      id: uuid(),
      color: getRandomColor(),
      left: getRandomCoordinate(1000),
      top: getRandomCoordinate(575),
    }
    store.addBox(box)
  }
  
  addBoxWithSelectedColor() {
    const color = document.getElementById('colorPicker')
    const box = {
      id: uuid(),
      color: color.value,
      left: getRandomCoordinate(1000),
      top: getRandomCoordinate(575),
    }
    store.addBox(box)
  }

  saveInSessionStorage() {
    sessionStorage.setItem(BOXES, JSON.stringify(store.boxes))
  }

  getFromSessionStorage() {
    const boxes = JSON.parse(sessionStorage.getItem(BOXES))
    store.restartBoxes(boxes)
  }

  render() {
    return (
      <div className="toolbar">
        <div className="block">
          <button onClick={() => this.addBox()}>Add Box</button>
          <button onClick={() => store.deleteBox()}>Remove Box</button>
        </div>
        <div className="block">
          <input type="color" id="colorPicker" />
          <button onClick={() => this.addBoxWithSelectedColor()}>Add Box With Selected Color</button>
          <button onClick={() => store.changeColorBox()}>Change Color Box</button>
        </div>
        <div className="block">
          <span>{store.getSelectedBoxes()}</span>
        </div>
        <div className="block">
          <button onClick={() => this.saveInSessionStorage()}>Save</button>
          <button onClick={() => this.getFromSessionStorage()}>Load</button>
        </div>
      </div>
    );
  }
}

export default observer(Toolbar);
