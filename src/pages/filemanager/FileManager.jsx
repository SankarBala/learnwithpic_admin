import React from 'react';
import Iframe from 'react-iframe';
import host from 'src/config';


function FileManager() {
    return (
        <>
            <Iframe url={`${host}/file-manager`}
                width="100%"
                height="600px"
                className=""
                display="block"
                position="relative" />
        </>
    )
}

export default FileManager
