import { v4 as uuidv4 } from "uuid";
import { GET_ITEMS, DELETE_ITEM, ADD_ITEM } from "../actions/types";

const initialState = {
  items: [
    { id: uuidv4(), name: "Tomatoes" },
    { id: uuidv4(), name: "Tuna" },
    { id: uuidv4(), name: "Chicken" },
    { id: uuidv4(), name: "Eggs" }
  ]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return { ...state };

    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };

    case ADD_ITEM:
      return {
        items: [action.payload, ...state.items]
      }

    default:
      return state;
  }
}
