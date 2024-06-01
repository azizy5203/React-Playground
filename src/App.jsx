import { BrowserRouter, useRoutes, NavLink } from "react-router-dom";
import routes from "./router";

const RouterView = () => useRoutes(routes);
const App = () => {
  return (
    <BrowserRouter>
      <div className="grid grid-cols-main-layout h-screen bg-[#121516] text-white">
        <div className="bg-red-700">
          <ul className="p-4 flex flex-col gap-4 text-xl">
            {routes.map((item) => {
              return (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `p-1 rounded-md ${isActive && "border-2 border-zinc-800"}`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
        <RouterView />
      </div>
    </BrowserRouter>
  );
};

export default App;
