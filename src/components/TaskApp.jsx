import React, { useState } from "react";
import AddTask from "./AddTask/AddTask";
import Tasks from "./Tasks/Tasks";
import styles from "./taskApp.module.css";
import TaskHeader from "./TaskHeader/TaskHeader";
import taskData from "../data/tasks.json";
import { v4 } from "uuid";

const TaskApp = () => {
  const [tasks, setTasks] = useState(taskData);

  const addTask = (newTask) => {
    let isTaskPresent = tasks.some((task) => task.text === newTask);
    if (newTask && !isTaskPresent) {
      const newTaskObj = {
        id: v4(),
        text: newTask,
        done: false,
        count: 1,
      };
      setTasks([...tasks, newTaskObj]);
    }
  };

  const handleUpdateTask = (updatedTask) => {
    let newTasks = tasks.reduce((acc, curr) => {
      if (curr.id === updatedTask.id) {
        acc.push(updatedTask);
      } else {
        acc.push(curr);
      }
      return acc;
    }, []);
    setTasks([...newTasks])
  };
  
  const handleRemoveTask = (taskId) => {
    let newTasks = tasks.filter((task)=> task.id !== taskId)
    setTasks(newTasks)
  }

  return (
    <div className={styles.main}>
      <div data-cy="task-app" className={styles.taskApp}>
        <TaskHeader tasks={tasks} />
        <AddTask addTask={addTask} />
        <Tasks tasks={tasks} handleUpdateTask={handleUpdateTask} handleRemoveTask={handleRemoveTask} />
      </div>
    </div>
  );
};

export default TaskApp;
