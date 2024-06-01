import axios from "axios";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

export default function Tasks() {
  const [tasksList, setTasksList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const inititalValues = {
    title: "",
    status: "",
  };

  const schema = yup.object({
    title: yup.string().required().min(4).max(12),
    status: yup.string().required(),
  });

  async function addNewTask(values, { resetForm }) {
    try {
      setLoading(true);
      await axios.post("http://localhost:444/tasks", values);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      resetForm();
      await load();
    }
  }

  async function load() {
    try {
      const { data } = await axios.get("http://localhost:444/tasks");
      setTasksList(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteTask(id) {
    try {
      await axios.delete(`http://localhost:444/tasks/${id}`);
      await load();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="flex flex-col gap-12 p-4">
      <h1 className="text-4xl text-center">Tasks</h1>
      <Formik
        initialValues={inititalValues}
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => addNewTask(values, { resetForm })}
      >
        <Form className="flex flex-col gap-4 items-start p-4 border border-red-600 w-1/2 mx-auto">
          <Field
            name="title"
            placeholder="Enter task title"
            className="text-zinc-800 font-semibold p-2"
          />
          <ErrorMessage name="title" />
          <Field
            component="select"
            multiple={false}
            name="status"
            placeholder="select task status"
            className="text-zinc-800 font-semibold p-2"
          >
            <option value="" disabled hidden>
              Select Status
            </option>
            <option value="New">New</option>
            <option value="InProgress">In Progress</option>
            <option value="Hold">Hold</option>
            <option value="Completed">Completed</option>
          </Field>
          <ErrorMessage name="status" />

          <button
            type="submit"
            disabled={isLoading}
            className="bg-red-600 border border-transparent text-white px-4 py-3 rounded-xl hover:bg-transparent hover:border-red-600 disabled:bg-gray-500 disabled:border-gray-700"
          >
            Add Task
          </button>
        </Form>
      </Formik>
      <div className="border border-red-600 rounded-md w-1/2 mx-auto ">
        <div className="grid grid-cols-4 bg-red-600 p-4">
          <h3>ID</h3>
          <h3>TITLE</h3>
          <h3>STATUS</h3>
        </div>
        {tasksList.map((item) => (
          <div className="grid grid-cols-4 p-4" key={item.id}>
            <span className="justify-self-start">{item.id}</span>
            <span className="justify-self-start">{item.title}</span>
            <span className="justify-self-start">{item.status}</span>
            <i
              className="bi bi-trash-fill justify-self-end text-red-600 cursor-pointer"
              onClick={() => deleteTask(item.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
