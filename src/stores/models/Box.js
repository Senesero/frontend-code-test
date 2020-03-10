import { types } from "mobx-state-tree";

const BoxModel = types
    .model("Box", {
        id: types.identifier,
        width: 200,
        height: 100,
        color: "#FFF000",
        left: 200,
        top: 100,
        selected: false
    })
    .actions(self => ({}))
    .views(self => ({}))

export default BoxModel;