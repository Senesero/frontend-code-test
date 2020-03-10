import { types } from "mobx-state-tree";
import uuid from "uuid/v4";
import BoxModel from "./models/Box";
import getRandomColor from "../utils/getRandomColor";

const MainStore = types
    .model("MainStore", {
        boxes: types.array(BoxModel),
    })
    .actions(self => ({
        addBox(box) {
            self.boxes.push(box);
        },
        deleteBox() {
            const filterBoxes = self.boxes.filter(box => {
                return box.selected === false
              })

            if(filterBoxes.length === self.boxes.length) {
                alert('Selecciona por lo menos una caja para eliminarlas')
                return
            }
            self.boxes = filterBoxes
        },
        onClickBox(id) {
            self.boxes.map(box => {
                if(box.id === id) {
                    box.selected = !box.selected
                }
                return box
            })
        },
        changeColorBox() {
            let changeColor = false
            self.boxes.forEach(box => {
                if(box.selected === true){
                    changeColor = true
                    const color = document.getElementById('colorPicker')
                    box.color = color.value
                }
              })

            if(!changeColor) {
                alert('Selecciona por lo menos una caja para cambiarla de color')
            }
        },
        restartBoxes(boxes) {
            self.boxes = boxes
        }
    }))
    .views(self => ({
        getSelectedBoxes() {
            const selectedBoxes = self.boxes.filter(box => {
                return box.selected === true
            })
            if(selectedBoxes.length === 0) {
                return 'No boxes selected'
            } else if(selectedBoxes.length === 1) {
                return '1 selected box'
            }
            return `${selectedBoxes.length} selected boxes`
        },
    }));

const store = MainStore.create({
    selectedBoxes: 'No boxes selected',
});

const box1 = BoxModel.create({
    id: uuid(),
    color: getRandomColor(),
    left: 0,
    top: 0
});

store.addBox(box1);

export default store;