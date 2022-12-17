import { useMemo, useState } from "react";
import Todos from "./Todos";

const Test = () => {
    const data = Todos("Welcome");

    //   const [count, setCount] = useState(0);
    //   const [todos, setTodos] = useState([]);

    //   const increment = () => {
    //     setCount((c) => c + 1);
    //   };

    //   const addTodo = () => {
    //     setTodos((t) => [...t, "New Todo"]);
    //   };

    //   const addTodo = useCallback(() => {
    //     setTodos((t) => [...t, "New Todo"]);
    //   }, [todos]);


    return (
        <>
            {data}
        </>
    );
};







export default Test;
