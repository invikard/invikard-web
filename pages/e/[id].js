import Layout from '../../components/MyLayout';
import fetch from 'isomorphic-unfetch';
import Theme1 from '../../components/theme1/Theme1'
import dummy from './dummy';
//import Error from 'next/error'
import Error from '../../components/error/error'
import ReactHtmlParser from 'react-html-parser';
import React from "react";


const getErrorView = (data) => {
    let errorView = ``;
    if (data.success === false) {
        errorView += `${data.message}`
    } else {
        try {
            if (data.is_private)
                errorView += `<br/>🤔 Akun Private`;
            if (!data.is_config)
                errorView += `<br />🤔 Konfigurasi akun belum sesuai`;
            if (!data.is_banner)
                errorView += `<br />🤔 Detil acara tidak ditemukan/belum sesuai`;
            if (!data.is_date)
                errorView += `<br />🤔 Detil waktu tidak ditemukan/belum sesuai`;
            if (!data.is_place || !data.is_map_url)
                errorView += `<br />🤔 Detil tempat tidak ditemukan/belum sesuai`;
            if (!data.is_bride)
                errorView += `<br />🤔 Detil <code>bride</code> tidak ditemukan/belum sesuai`;
            if (!data.is_groom)
                errorView += `<br />🤔 Detil <code>groom</code> tidak ditemukan/belum sesuai`;
            if (!data.is_comment)
                errorView += `<br />🤔 Detil <code>comment</code> tidak ditemukan/belum sesuai`
        } catch (error) {

        }
    }
    return errorView;
};

export default function Post(props) {


    const errorView = getErrorView(props.data);

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
    const res = await fetch(`https://invikard-api.hynra.now.sh/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'dnJmoDbvaicr'
        }
    });
    const status = res.status;
    const data = await res.json();


    if (id === 'invikard.demo') {
        //data.comments.comments = dummy;
    }

    if (status === 200) data.success = true;
    else data.success = false;
    return {
        data: data
    };
};
