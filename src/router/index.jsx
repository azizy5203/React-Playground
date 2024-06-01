import Tasks from "../views/Tasks";
import Home from "../views/Home";

const routes = [
  {
    path: "/",
    name: "Home",
    element: <Home />,
  },
  {
    path: "/tasks",
    name: "Tasks",
    element: <Tasks />,
  },
];

export default routes;
