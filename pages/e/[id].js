import Layout from '../../components/MyLayout';
import fetch from 'isomorphic-unfetch';
import Theme1 from '../../components/theme1/Theme1'
import dummy from './dummy';
//import Error from 'next/error'
import Error from '../../components/error/error'
import ReactHtmlParser from 'react-html-parser';
import React from "react";
import { validateProfile } from "../../utils/Profile";


const getError = (data) => {
    let errorView = ``;
    if (data.success === false) {
        errorView += `${data.message}`
    } else {
        try {
            if (data.is_private)
                errorView += `<br/>🤔 Akun Private`;
        } catch (error) {
            errorView += `${error.message}`
        }
    }
    return errorView;
};

export default function Post(props) {


    const errorView = getError(props.data);

    if (errorView === '') {
        return <Theme1
            data={props.data}
        />;
    } else {

        let _append = `Tidak dapat menampilkan halaman, karena:`;
        _append = _append + errorView;

        return <div style={{ paddingLeft: '10px', paddingRight: '10px' }}>
            <Error
                statusCode={"🙏"}
                message={ReactHtmlParser(_append)} />
        </div>
    }
}

Post.getInitialProps = async function ({ query: { id } }) {
    /*const res = await fetch(`https://invikard-api.hynra.now.sh/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'dnJmoDbvaicr'
        }
    });
    const status = res.status;
    const data = await res.json();


    if (id === 'invikard.demo') {
    }

    if (status === 200) data.success = true;
    else data.success = false;
    return {
        data: data
    };*/
    try {
        const profile = await validateProfile(id);
        profile.success = true;
        return {
            data: profile
        };
    }catch (e) {
        return {
            data: {
                success: false,
                message: e.message
            }
        }
    }
};
