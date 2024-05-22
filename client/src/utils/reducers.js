import {
    ADD_ITEM,
    REMOVE_ITEM,
    UPDATE_ITEM,
    BUY_ITEM
} from "./actions";

export default function reducers(state, action) {
    switch (action.type) {
        case ADD_ITEM:
            return {
                
            };
        case REMOVE_ITEM:
            return {
                
            };
        case UPDATE_ITEM:
            return {
                
            };
        case BUY_ITEM:
            return {

            };
        default:
            return state;
    }
}