import store from "./MainStore"
import { applySnapshot, onSnapshot } from "mobx-state-tree"

var states = [
    {
        "0": {
            boxes: []
        }
    }
]
var currentFrame = 0

onSnapshot(store, snapshot => {
    if (currentFrame === states.length - 1) {
        currentFrame++
        states.push(snapshot)
    }
})

export function previousState() {
    if (currentFrame === 0) return
    currentFrame--
    applySnapshot(store, states[currentFrame])
}

export function nextState() {
    if (currentFrame === states.length - 1) return
    currentFrame++
    applySnapshot(store, states[currentFrame])
}
