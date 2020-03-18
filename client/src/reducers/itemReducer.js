import { v4 as uuidv4 } from "uuid";
import GET_ITEMS from "../actions/types";

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
    default:
      return state;
  }
}
