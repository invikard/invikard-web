import React, { useState, useEffect  } from 'react';
import Head from 'next/head';
import { NextScript, Main } from 'next/document';
import fetch from 'isomorphic-unfetch';

const Theme1 = props => {

    //props.data.banner.caption = props.data.banner.caption.replace(/\n/g, "<br /> ");
    const [comments, setComments] = useState(props.data.comments.comments.edges);
    const [pageInfo, setPageInfo] = useState(props.data.comments.comments.page_info);

    //useEffect( () => { loadMoreComments(comments) }, [ comments ] );

     async function loadMoreComments(params) {

        const shortcode = (params.shortcode) ? `shortcode=${params.shortcode}` : "";
        const first = (params.first) ? `&first=${params.first}` : '&first=30';
        const after = (params.after) ? `&after=${params.after}` : "";

        const res = await fetch(`https://invikard-api.hynra.now.sh/comments?${shortcode}${first}${after}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'dnJmoDbvaicr'
            },
            qs: params
        });
        const status = res.status;
        const data = await res.json();

        if (status !== 200)
            throw new Error("error get data");
        else {

            setPageInfo(data.page_info);
            setComments([...comments, ...data.edges]);
            return comments;
        }
    }

    return (
        <div>
            <Head>
                <title>{props.data.fullname}</title>
                <link href='https://fonts.googleapis.com/css?family=Work+Sans:400,300,600,400italic,700' rel='stylesheet' type='text/css' />
                <link href="https://fonts.googleapis.com/css?family=Sacramento" rel="stylesheet" />
                <link rel="stylesheet" href="/static/css/animate.css" />

                <link rel="stylesheet" href="/static/css/icomoon.css" />

                <link rel="stylesheet" href="/static/css/bootstrap.css" />

                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.8.2/css/lightbox.min.css" />

                <link rel="stylesheet" href="/static/css/magnific-popup.css" />

                <link rel="stylesheet" href="/static/css/owl.carousel.min.css" />
                <link rel="stylesheet" href="/static/css/owl.theme.default.min.css" />


                <link rel="stylesheet" href="/static/css/style.css" />

                <script src="/static/js/modernizr-2.6.2.min.js"></script>

            </Head>
            <div>

                <div className="fh5co-loader"></div>

                <div id="page">
                    <nav className="fh5co-nav" role="navigation">
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-2">
                                    <div id="fh5co-logo"><a href="index.html">Wedding<strong>.</strong></a></div>
                                </div>
                            </div>

                        </div>
                    </nav>

                    <header id="fh5co-header" className="fh5co-cover" role="banner" style={{ backgroundImage: `url("${props.data.banner.image}")`, "dataStellarBackgroundRatio": "0.5" }}>
                        <div className="overlay"></div>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8 col-md-offset-2 text-center">
                                    <div className="display-t">
                                        <div className="display-tc">
                                            <h1>
                                                {props.data.bride.tagged_user.edges[0].node.user.full_name} <br />
                                                & <br />
                                                {props.data.groom.tagged_user.edges[0].node.user.full_name}
                                            </h1>
                                            <h2>We Are Getting Married</h2>
                                            <div className="simply-countdown simply-countdown-one"></div>
                                            <p><a href={props.data.date.date_url} target="_blank" className="btn btn-default btn-sm">Save the date</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div id="fh5co-couple" >
                        <div className="overlay"></div>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8 col-md-offset-2 text-center fh5co-heading">
                                    <h2>Hello!</h2>
                                    <h3>{props.data.biography}</h3>
                                    <p>We invited you to celebrate our wedding</p>
                                </div>
                            </div>
                            <div className="couple-wrap">
                                <div className="couple-half">
                                    <div className="groom">
                                        <img src={props.data.groom.image} alt="groom" className="img-responsive" />
                                    </div>
                                    <div className="desc-groom">
                                        <h3>{props.data.groom.tagged_user.edges[0].node.user.full_name}</h3>
                                        <p>{props.data.groom.caption}</p>
                                    </div>
                                </div>
                                <p className="heart text-center"><i className="icon-heart2"></i></p>
                                <div className="couple-half">
                                    <div className="bride">
                                        <img src={props.data.bride.image} alt="groom" className="img-responsive" />
                                    </div>
                                    <div className="desc-bride">
                                        <h3>{props.data.bride.tagged_user.edges[0].node.user.full_name}</h3>
                                        <p>{props.data.bride.caption}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="fh5co-event" className="fh5co-bg" style={{ "backgroundImage": `url("${props.data.place.image}")` }}>
                        <div className="overlay"></div>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8 col-md-offset-2 text-center fh5co-heading">

                                    <h2>Wedding Event</h2>
                                </div>
                            </div>
                            <div className="row">
                                <div className="display-t">
                                    <div className="display-tc">
                                        <div className="col-md-10 col-md-offset-1">
                                            <div className="col-md-12 col-sm-12 text-center">
                                                <div className="event-wrap">
                                                    <h3>Acara</h3>

                                                    <div className="event-col">
                                                        <i className="icon-calendar"></i>
                                                        <span>{props.data.date.caption}</span>
                                                    </div>
                                                    <div className="fh5co-heading">
                                                        <p style={{ "whiteSpace": "pre-line" }}>{props.data.banner.caption}</p>
                                                    </div>
                                                    <a href={props.data.place.map_url} target="_blank"><button type="submit" className="btn btn-success">Lokasi di Maps</button></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div id="fh5co-couple-story">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8 col-md-offset-2 text-center fh5co-heading">
                                    <span>We Love Each Other</span>
                                    <h2>Our Story</h2>

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 col-md-offset-0">
                                    <ul className="timeline">

                                        {props.data && props.data.stories.map((story, index) =>

                                            (index % 2 === 0) ?

                                                <li className="timeline-inverted" key={index.toString()}>
                                                    <div className="timeline-badge" style={{ "backgroundImage": `url("${story.image}")` }}></div>
                                                    <div className="timeline-panel">
                                                        <div className="timeline-heading">
                                                            <h3 className="timeline-title">{story.title}</h3>

                                                        </div>
                                                        <div className="timeline-body">
                                                            <p>{story.caption}</p>
                                                        </div>
                                                    </div>
                                                </li> :
                                                <li key={story.image}>
                                                    <div className="timeline-badge" style={{ "backgroundImage": `url("${story.image}")` }}></div>
                                                    <div className="timeline-panel">
                                                        <div className="timeline-heading">
                                                            <h3 className="timeline-title">{story.title}</h3>

                                                        </div>
                                                        <div className="timeline-body">
                                                            <p>{story.caption}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                        )}

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="fh5co-gallery" className="fh5co-section-gray">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8 col-md-offset-2 text-center fh5co-heading">
                                    <span>Our Moments</span>
                                    <h2>Gallery</h2>
                                </div>
                            </div>
                            <div className="row row-bottom-padded-md">
                                <div className="col-md-12">
                                    <ul id="fh5co-gallery-list">

                                        {props.data && props.data.gallery.map((gallery) =>
                                            <li key={gallery.image} className="one-third" style={{ "backgroundImage": `url("${gallery.image}")` }}>
                                                <a href={gallery.image} data-lightbox="photos">
                                                    <div className="case-studies-summary">
                                                        <h3 style={{ background: "rgba(255, 255, 255, 0.7", padding: "10px", textAlign: "center" }}>{props.data.bride.tagged_user.edges[0].node.user.full_name} & {props.data.groom.tagged_user.edges[0].node.user.full_name}</h3>
                                                    </div>
                                                </a>
                                            </li>
                                        )}

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {props.data.is_video_url && <div id="fh5co-services" className="fh5co-bg">
                        <div className="overlay"></div>
                        <div style={{width: "100%", paddingLeft: "10px", paddingRight: "10px"}}>

                            <div className="row">
                                <div className="col-md-8 col-md-offset-2 text-center fh5co-heading">
                                    <span>Our Moments</span>
                                    <h2>Video</h2>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <div class="videoWrapper fh5co-video fh5co-bg" style={{ "backgroundImage": `url("/static/images/img_bg_3.jpg")` }}>
                                        <iframe width="560" height="315" src={`https://www.youtube.com/embed/${props.data.video.video_id}`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                    </div>

                                </div>
                            </div>


                        </div>
                    </div>}


                    <div id="fh5co-started" >
                        <div className="container">
                            <div className="row">
                                <div className="row">
                                    <div className="col-md-8 col-md-offset-2 text-center fh5co-heading">
                                        <h2 style={{ color: "#F14E95" }}>Beri ucapan selamat?</h2>
                                        <p style={{ color: "#000000" }}>Follow akun <a href="https://instagram.com/invikardapp" target="_blank"><b>@InvikardApp</b></a>, beri komentar pada post berikut:</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-10 col-md-offset-1">

                                    <div className="col-md-12 col-sm-12 text-center ">
                                        <a href={`https://instagram.com/p/${props.data.comments.shortcode}`}><button type="submit" className="btn btn-default btn-lg">Kirim Ucapan Selamat</button></a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>


                    <div id="fh5co-testimonial">
                        <div className="container">
                            <div className="row">
                                <div className="row">
                                    <div className="col-md-8 col-md-offset-2 text-center fh5co-heading">
                                        <span>Best Wishes</span>
                                        <h2>Ucapan Selamat</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="wrap-testimony">


                                            <div className="row row-bottom-padded-md">
                                                <div className="col-md-16">
                                                    <ul id="fh5co-gallery-list-2">

                                                        {comments && comments.map((comment) =>
                                                            <li key={comment.node.id} className="one-third-2">
                                                                <div className="item">
                                                                    <div className="testimony-slide active text-center">
                                                                        <a href={`https://instagram.com/${comment.node.owner.username}`} target="_blank">
                                                                            <figure>
                                                                                <img src={comment.node.owner.profile_pic_url} alt="user" />
                                                                            </figure>
                                                                            <p>@{comment.node.owner.username}</p>
                                                                            <blockquote>
                                                                                <p>"{comment.node.text}"</p>
                                                                            </blockquote>
                                                                        </a>

                                                                    </div>
                                                                </div>
                                                            </li>
                                                        )}

                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-10 col-md-offset-1">
                                                    <div className="col-md-12 col-sm-12 text-center ">
                                                        {pageInfo.has_next_page && <button
                                                            className="btn btn-default btn-lg"
                                                            style={{ background: "#F14E95", color: "#ffffff" }}
                                                            onClick={() => {
                                                                loadMoreComments({
                                                                    shortcode:  props.data.comments.shortcode, // "B1h04knHAEi",
                                                                    first: 30,
                                                                    after: pageInfo.end_cursor // pageInfo.end_cursor
                                                                });
                                                            }}
                                                        >
                                                            Muat Lebih Banyak Ucapan
                                                            </button>}
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <footer id="fh5co-footer" role="contentinfo">
                        <div className="container">

                            <div className="row copyright">
                                <div className="col-md-12 text-center">
                                    <div>
                                        <small className="block">&copy; 2019 Invikard App. All Rights Reserved.</small>
                                        {props.data.username === 'invikard.demo' && <small>
                                            Demo images by <a href="https://unsplash.com" target="_blank">Unsplash</a>
                                        </small>}
                                        <small className="block">Designed by <a href="http://freehtml5.co/" target="_blank">FREEHTML5.co</a></small>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </footer>
                </div>

                <div className="gototop js-top">
                    <a href="#" className="js-gotop"><i className="icon-arrow-up"></i></a>
                </div>


                <script src="/static/js/jquery.min.js"></script>

                <script src="/static/js/jquery.easing.1.3.js"></script>

                <script src="/static/js/bootstrap.min.js"></script>

                <script src="/static/js/jquery.waypoints.min.js"></script>

                <script src="/static/js/owl.carousel.min.js"></script>

                <script src="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.8.2/js/lightbox.min.js"></script>

                <script src="/static/js/jquery.countTo.js"></script>

                <script src="/static/js/jquery.stellar.min.js"></script>
                <script src="/static/js/jquery.magnific-popup.min.js"></script>
                <script src="/static/js/magnific-popup-options.js"></script>

                <script src="/static/js/simplyCountdown.js"></script>
                <script src="/static/js/main.js"></script>
                <script src="/static/js/theme1.js"></script>

            </div>
        </div>
    )
};

export default Theme1;
