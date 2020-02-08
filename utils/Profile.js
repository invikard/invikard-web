import fetch from 'isomorphic-unfetch';
import {validateAll} from "./parse_handler";

const instagramUrl = 'https://www.instagram.com/';
const instagramGraphQL = 'https://www.instagram.com/graphql/query/';

export const validateProfile = async (userName) => {
    try {
        const profileUrl = `${instagramUrl}${userName}/?__a=1`;
        const res = await fetch(profileUrl, {
            method: 'GET',
        });
        const status = res.status;
        if (status !== 200) throw new Error('Something went wrong');
        let profile = await res.json();
        // set profile
        profile = {
            id: profile.graphql.user.id,
            fullname: profile.graphql.user.full_name,
            is_private: profile.graphql.user.is_private,
            avatar: profile.graphql.user.profile_pic_url_hd,
            username: profile.graphql.user.username,
            biography: profile.graphql.user.biography,
            link: profile.graphql.user.external_url,
            is_following: profile.graphql.user.follows_viewer,
            hasNext: profile.graphql.user.edge_owner_to_timeline_media.page_info.has_next_page,
            end_cursor: profile.graphql.user.edge_owner_to_timeline_media.page_info.end_cursor,
        };

        if (profile.is_private) throw new Error("Account is private");

        let _configs = profile.biography.split(" ");
        let htconfigs = [];
        _configs.map(c => {
            if (c.includes('#')) htconfigs.push(c);
        });

        let configs = {};

        htconfigs.map(ht => {
            if (ht === '#invikard') {
                configs.key = ht;
            }
            if (ht === '#wedding') {
                configs.type = ht;
            }
            if (ht === '#1') {
                configs.theme = ht;
            }
        });

        if (configs.key && configs.type && configs.theme)
            console.log("profile is valid ");
        else throw new Error("Account is not valid with Invikard configuration");
        return profile;

    } catch (e) {
        throw new Error(e.message);
    }
};

export const loadAndValidateMedia = async (profile) => {
    try {
        const {id, hasNext, end_cursor} = profile;
        //const fetchUrl = `${instagramGraphQL}?query_hash=472f257a40c653c64c666ce877d59d2b&variables={"id":"${id}","first":100,"after":"${end_cursor}"}`;
        const fetchUrl = `${instagramGraphQL}?query_id=17888483320059182&variables={"id":"17799004321","first":50,"after":null}`;
        const res = await fetch(fetchUrl, {
            method: 'GET',
        });
        const status = res.status;
        if (status !== 200) throw new Error('Something went wrong');
        let media = await res.json();
        media = media.data.user.edge_owner_to_timeline_media.edges;
        console.log("fetch url ", fetchUrl);
        let nodes = [];
        for (let i = 0; i < media.length; i++) {
            let node = {
                image: media[i].node.display_url,
                caption: (media[i].node.edge_media_to_caption.edges.length > 0) ?
                    media[i].node.edge_media_to_caption.edges[0].node.text.replace("\n", " \n") : "No Caption",
                shortcode: media[i].node.shortcode,
                location: media[i].node.location,
                tagged_user: media[i].node.edge_media_to_tagged_user,
                comments: media[i].node.edge_media_to_comment
            };
            nodes.push(node);
        }

        console.log("Total nodes ", nodes.length);
        const payload = validateAll({profile, nodes});
        return payload;

    }catch (e) {
        throw e;
    }
};

export const getErrorView = (data) => {
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
            errorView += `${error.message}`
        }
    }
    return errorView;
};
