import fetch from 'isomorphic-unfetch';

const instagramUrl = 'https://www.instagram.com/';
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
            console.log("profile is valid ", profile);
        else throw new Error("Account is not valid with Invikard configuration");
        return profile;

    } catch (e) {
        throw new Error(e.message);
    }
};

export const loadAndValidateMedia = async (id) => {
    try {

    }catch (e) {
        throw e;
    }
};
