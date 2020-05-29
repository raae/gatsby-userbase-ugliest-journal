import React, { useState } from "react";
import userbase from "userbase-js";

const TodoItem = ({ itemId, item, setError }) => {
  const [status, setStatus] = useState("idle");
  const formDisabled = status !== "idle";

  const handleCheckedChange = async (event) => {
    const checked = event.target.checked;
    try {
      console.log("Update item", { complete: checked });
      setError(false);
      setStatus(checked ? "checking" : "unchecking");

      await userbase.updateItem({
        databaseName: "todos",
        itemId: itemId,
        item: {
          todo: item.todo,
          complete: checked,
        },
      });

      console.log("Update item succeeded");
      setStatus("idle");
    } catch (error) {
      console.log("Update item failed", error);
      setError(error);
      setStatus("error");
    }
  };

  const handleDeleteTodo = async () => {
    try {
      console.log("Delete item");
      setError(false);
      setStatus("deleting");

      await userbase.deleteItem({
        databaseName: "todos",
        itemId: itemId,
      });

      console.log("Delete item succeeded");
      // When item is deleted successfully
      // this component is unmounted and state should not be updated
      // setStatus("idle");
    } catch (error) {
      console.log("Delete item failed", error);
      setError(error);
      setStatus("error");
    }
  };

  return (
    <form>
      <button
        type="button"
        aria-label="Delete todo"
        disabled={formDisabled}
        onClick={handleDeleteTodo}
      >
        x
      </button>
      <label
        style={{
          textDecoration: item.complete ? "line-through" : "none",
          opacity: status === "deleting" ? 0.3 : 1,
        }}
      >
        <input
          type="checkbox"
          aria-label="Toogle todo"
          disabled={formDisabled}
          checked={item.complete || false}
          onChange={handleCheckedChange}
        />{" "}
        {item.todo}
      </label>
    </form>
  );
};

export default TodoItem;
