import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <nav className="pb-2 mb-2 border-b border-sky-500">
        <ul className="flex space-x-2">
          <li>
            <a href={`/`}>App</a>
          </li>
          <li>
            <a href={`alert`}>Alert</a>
          </li>
        </ul>
      </nav>
      <div>
        <Outlet />
      </div>
    </>
  );
}