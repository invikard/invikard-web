import * as getUrls from 'get-urls';
import * as moment from 'moment'

export const validateAll = (data) => {
    let { nodes, profile } = data;
    const requiredHastags = ['#invikardvideo', '#invikarddate', '#invikardplace',
        '#invikardbride', '#invikardgroom', '#invikardbanner', '#invikardgallery', "#invikardstory", "#invikardcomments"];

    // validate all components
    let valids = {
        is_video: false,
        is_date: false,
        is_place: false,
        is_banner: false,
        is_map_url: false,
        is_video_url: false,
        is_bride: false,
        is_groom: false,
        is_config: false,
        is_comment: false,
        gallery: [],
        stories: []
    };

    nodes.map(node => {
        let strs = node.caption.split(" ");
        let ht = "none";
        strs.map(s => {
            if (s.includes("#")) {
                ht = s.toLowerCase();
            }
        });

        const urlRegex = /(https?:\/\/[^ ]*)/;
        switch (ht) {
            case requiredHastags[0]:
                valids.is_video = true;
                let videoUrl = node.caption.match(urlRegex)[1];
                node.video_url = videoUrl;
                node.video_id = videoUrl.split("/");
                node.video_id = node.video_id[node.video_id.length-1];
                valids.video = node;
                if (videoUrl) {
                    valids.is_video_url = true;
                }
                break;
            case requiredHastags[1]:
                node.caption = node.caption.toLowerCase();
                node.caption = node.caption.replace(ht, "").trim();
                const date = moment(node.caption, 'DD-MM-YYYY', true);
                if(date !== null) {
                    let startTime = date.add(2, 'h');
                    startTime = startTime.format('YYYYMMDDTHHmmss')+'Z';
                    let endTime = date.add(14, 'h');
                    endTime = endTime.format('YYYYMMDDTHHmmss')+'Z';
                    node.start = startTime;
                    node.end = endTime;
                    valids.is_date = true;
                    node.date = date;
                }

                valids.date = node;
                break;
            case requiredHastags[2]:
                let placeUrl = node.caption.match(urlRegex)[1];
                node.map_url = placeUrl;
                if (placeUrl) {
                    node.caption = node.caption.replace(placeUrl, "");
                    valids.is_map_url = true;
                    valids.is_place = true;
                }
                valids.place = node;
                break;
            case requiredHastags[3]:
                valids.is_bride = true;
                valids.bride = node;
                if ((node.tagged_user && node.tagged_user.edges && node.tagged_user.edges.length) > 0) valids.is_bride = true;
                break;
            case requiredHastags[4]:
                valids.is_groom = true;
                valids.groom = node;
                if ((node.tagged_user && node.tagged_user.edges && node.tagged_user.edges.length) > 0) valids.is_groom = true;
                break;
            case requiredHastags[5]:
                valids.is_banner = true;
                node.caption = node.caption.substr(node.caption.indexOf(" ") + 1);
                valids.banner = node;
                break;
            case requiredHastags[6]:
                valids.gallery.push(node);
                break;
            case requiredHastags[8]:
                valids.is_comment = true;
                valids.comments = node;
                break;
            default:
                let num = ht.match(/\d+/g);
                ht = ht.replace(num, "");
                num = parseInt(num);
                if(Number.isInteger(num) && (ht === requiredHastags[7])){
                    node.title = node.caption.split(" ")[0];
                    valids.stories[num] = node;
                }
                break;
        }
    });
    valids.stories = valids.stories.filter(item => item !== null);

    // validate theme
    let _configs = profile.biography.split(" ");
    let htconfigs = [];
    _configs.map(c => {
        if (c.includes('#')) htconfigs.push(c);
    });

    let configs = {};

    htconfigs.map(ht => {
        if (ht === '#invikard') {
            configs.key = ht;
            profile.biography = profile.biography.replace(ht, "").trim();
        }
        if (ht === '#wedding') {
            configs.type = ht;
            profile.biography = profile.biography.replace(ht, "").trim();
        }
        if (ht === '#1') {
            configs.theme = ht;
            profile.biography = profile.biography.replace(ht, "").trim();
        }

        // check groom & bride name in biography
        if(profile.biography.split("&").length >= 2){
            const members = profile.biography.split("&");
            valids.groom.name = members[0].trimStart().trimEnd();
            valids.bride.name = members[1].trimStart().trimEnd();
        }else {
            // invalidate groom & bride
            valids.is_groom = false;
            valids.is_bride = false;
        }

    });

    if (configs.key && configs.type && configs.theme)
        valids.is_config = true;

    // check date uri

    if(profile.biography && valids.date && valids.place && valids.banner){
        valids.date.date_url = `
        https://www.google.com/calendar/render?action=TEMPLATE&text=${profile.biography}&details=${valids.banner.caption}&location=${valids.place.map_url}&dates=${valids.date.start}/${valids.date.end}
        `.trimLeft().trimRight();
        valids.date.date_url = valids.date.date_url.replace(/\n/g, " ")
    }



    return Object.assign(configs, profile, valids);
};
