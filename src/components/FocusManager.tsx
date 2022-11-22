import { useFocusManager, FocusScope } from "react-aria";

function Toolbar(props) {
  return (
    <div role="toolbar">
      <FocusScope>{props.children}</FocusScope>
    </div>
  );
}

function ToolbarButton(props) {
  let focusManager = useFocusManager();
  let onKeyDown = (e) => {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        focusManager.focusNext({ wrap: true });
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        focusManager.focusPrevious({ wrap: true });
        break;
    }
  };

  return <button onKeyDown={onKeyDown}>{props.children}</button>;
}

function Root() {
  return (
    <>
      <h2>Aria focus library example</h2>
      <Toolbar>
        <ToolbarButton>Cut</ToolbarButton>
        <ToolbarButton>Copy</ToolbarButton>
        <ToolbarButton>Paste</ToolbarButton>
      </Toolbar>
    </>
  );
}
export default Root;
