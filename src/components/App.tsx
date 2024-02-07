import { useEffect, useRef, useState } from "react";
import "./App.css";

type tasksType = {
   title: string;
   info: string;
};

const App = () => {
   console.log("render");
   const [tasks, setTasks] = useState<tasksType[]>([]);
   const [opened, setOpened] = useState(false);

   const titleRef = useRef<any>();
   const infoRef = useRef<any>();

   function saveTask(tasks: any) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
   }
   const createTask = () => {
      setTasks([
         ...tasks,
         {
            title: titleRef.current.value,
            info: infoRef.current.value,
         },
      ]);

      saveTask([
         ...tasks,
         {
            title: titleRef.current.value,
            info: infoRef.current.value,
         },
      ]);
   };
   function loadTasks() {
      let loadedTasks: any = localStorage.getItem("tasks");

      let tasks = JSON.parse(loadedTasks);

      if (tasks) {
         setTasks(tasks);
      }
   }

   useEffect(() => {
      loadTasks();
   }, []);

   return (
      <div id="app">
         {opened ? (
            <div id="to-do-modal" className="align-center">
               <div className="container">
                  <h1 className="title">Menu</h1>
                  <input
                     placeholder="title"
                     ref={titleRef}
                     type="text"
                     className="input-title"
                  />
                  <textarea placeholder="info" ref={infoRef} className="text-input" />
                  <button
                     onClick={() => {
                        createTask();
                        setOpened(false);
                     }}
                  >
                     Create Task
                  </button>
               </div>
            </div>
         ) : (
            <div id="to-do-list" className="align-center">
               <div className="container">
                  <h1 className="title">List</h1>
                  {tasks.length > 0 ? (
                     tasks.map((task, i: number) => {
                        return (
                           <div key={i} className="task">
                              <h4>
                                 {task.title
                                    ? `Title: ${task.title}`
                                    : "Title was not found."}
                              </h4>
                              <h4>
                                 {task.info
                                    ? `Info: ${task.info}`
                                    : "No summary was provided for this task."}
                              </h4>
                              <button>delete</button>
                           </div>
                        );
                     })
                  ) : (
                     <h1>You don't have any tasks.</h1>
                  )}
                  <button
                     onClick={() => {
                        setOpened(true);
                     }}
                  >
                     New Task
                  </button>
               </div>
            </div>
         )}
      </div>
   );
};

export default App;
