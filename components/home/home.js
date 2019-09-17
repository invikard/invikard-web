
import React from 'react';
import Head from 'next/head';

const Home = props => {

    return (
        <div>
            <Head>
                <meta charset="utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Invikard App</title>

                <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css?family=Quicksand" rel="stylesheet" />
                <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.6.0/css/font-awesome.min.css" />


                <link type="text/css" rel="stylesheet" href="/static/css/home.css" />

            </Head>
            <div>
                <header>
                    <h2><a href="#">Invikard App</a></h2>
                    <nav>
                        <li><a href="#hiw">Cara Kerja</a></li>
                        <li><a href="#type">Type</a></li>
                        <li><a href="#faq">FAQ</a></li>
                    </nav>
                </header>


                <section class="hero">
                    <br />
                    <div class="background-image"></div>
                    <img src="/static/images/invikard.png" width="170px" />
                    <h1>A digital Invitation Card</h1>
                    <h3>Simple, easy to create and always free!</h3>
                    <a href="#hiw" class="btn">How it works</a>
                </section>


                <section class="features" id="hiw">
                    <h3 class="title">Cara Kerja</h3>
                    <p><b>Invikard</b> secara otomatis mengubah akun instagram Anda menjadi aplikasi Undangan berbasis web</p>
                    <hr />

                    <ul class="grid">
                        <li>
                            <i class="fa fa-camera-retro"></i>
                            <h4>1. Instagram</h4>
                            <p>Siapkan Akun <b>Instagram</b> Anda, disarankan membuat akun baru yang khusus akan digunakan sebagai sarana <b>event</b>. Detil acara, media dan gallery yang akan digunakan sebagai elemen acara akan disimpan disana.</p>
                        </li>
                        <li>
                            <i class="fa fa-cubes"></i>
                            <h4>2. We built it for you</h4>
                            <p>Ikuti petunjuk yang telah kami sediakan. Konfigurasi yang harus Anda lakukan sangat sederhana, bahkan semudah membuat <b>#hastag</b>, sisanya biarkan kami yang lakukan.</p>
                        </li>
                        <li>
                            <i class="fa fa-newspaper-o"></i>
                            <h4>3. See it live</h4>
                            <p>Jika konfigurasi berhasil, maka aplikasi web undangan Anda sudah dapat digunakan. Bagikan momen berharga Anda dengan cara yang lebih fleksibel.</p>
                        </li>
                    </ul>

                </section>


                <section class="our-work" id="type">
                    <h3 class="title">Tipe Undangan</h3>
                    <p>Saat ini tipe undangan yang dapat Anda gunakan adalah <b>Undangan Pernikahan</b>
                        <br />Demo dibawah ini adalah tampilan berdasarkan akun Instagram <b><a href="https://instagram.com/invikard.demo" target="_blank">@invikard.demo</a></b></p>
                    <hr />
                    <a href="https://invikard.com/e/invikard.demo" class="btn" target="_blank">Lihat Demo</a>
                </section>





                <section class="reviews" id="faq">
                    <h3 class="title">F.A.Q</h3>

                    <p class="quote"><i>Apakah <b>Invikard</b> menyimpan data dari akun Instagram yang ditampilkan?</i></p>
                    <p class="author">Tidak, Kami tidak ingin data Anda. <b>Invikard</b> hanya mentranformasi secara live akun Instagram menjadi sebuah tampilan web tanpa menyimpan data-data Anda di server kami.</p>

                    <p class="quote"><i>Kenapa gratis?</i></p>
                    <p class="author">Membuat akun dan menyimpan foto di Instagram gratis, begitupun layanan ini.</p>


                </section>


                <footer>
                    <ul>
                        <li><a href="https://github.com/invikard"><i class="fa fa-github-square"></i></a></li>
                    </ul>
                    <p>2019 |  <a href="https://invikrad.com" target="_blank">Invikard App</a></p>
                </footer>
            </div>


        </div>
    )
};

export default Home;