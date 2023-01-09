
import { CButton } from '@coreui/react';
import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Histo() {
    const location = useLocation('http://localhost:8000/api/post?page=3');

    function getPageNumber(url) {
        const params = new URLSearchParams(url);
        // const page = params.get();
        return params;
      }
      

    return (
        <div>
            {console.log(getPageNumber('http://localhost:8000/api/post?page=7'))}
        </div>
    )
}

export default Histo;