const initialState: number = 0;

interface IAction {
  type: "increment" | "decrement";
}

function countReducer(count: typeof initialState, action: IAction): typeof initialState {
  switch (action.type) {
    case "increment": {
      return count + 1;
    }
    case "decrement": {
      return count - 1;
    }
    default: {
      throw new Error("Invalid action");
    }
  }
}

export { countReducer, initialState };
