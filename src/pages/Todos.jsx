import { useState, useEffect } from "react";

const Todos = (dep) => {
    const [first, setFirst] = useState();

    useEffect(() => {
        setFirst(dep);

    });

    return first;
};

export default Todos;
