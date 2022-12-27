import { useEffect } from "react";

const addScript = (resourceUrl, className = "") => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = resourceUrl;
        script.className = className;
        script.async = true;
        document.head.appendChild(script);
   
    })
    
};


const addStyle = (resourceUrl, className = "") => {
    const link = document.createElement('link');
    link.href = resourceUrl;
    link.className = className;
    link.async = true;
    document.head.appendChild(link);
};

const remove = (className) => {
    console.log(className);
    // const script = "";
    // document.head.appendChild(script);
};



export { addStyle, addScript, remove };
