const about = () => {
    return (
        <>
            <section className="about_wrap">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-5">
                            <div className="about_l">
                                <img src={"/img/about.png"} alt="" />
                            </div>
                        </div>
                        <div className="col-sm-7">
                            <div className="about_r">
                                <h2>About The Artling</h2>
                                <p>Portenta haec esse dicit, neque ea ratione ullo modo posse vivi; Cum sciret confestim esse moriendum eamque mortem ardentiore studio peteret, quam Epicurus voluptatem petendam putat. Eorum enim est haec querela, qui sibi cari sunt seseque diligunt. At iam decimum annum inttamen simplicia, vestra versuta. Graecum enim hunc versum nostis omnes-: Suavis laborum est praeteritorum memoria..<br /><br />

                                    Vitiosum est enim in dividendo partem in genere numerare. Atque ab his initiis profecti omnium virtutum et originem et progressionem persecuti sunt. Sed ille, ut dixi, vitiose. Quae cum dixisset paulumque institisset, Quid est? Quis istud, quaeso, nesciebat? Fortasse id optimum, sedubillud: Plus semper voluptatis? Sed ego in hoc resisto; Hos contra singulos dici est melius.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="about_wrap1">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="about_l1">
                                <img src={"/img/about1.png"} alt="" />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="about_r1" style={{ backgroundImage: `url(/img/about-bg.jpg)` }} >
                                <h2>Mission & Vision</h2>
                                <p>Portenta haec esse dicit, neque ea ratione ullo modo posse vivi; Cum sciret confestim esse moriendum eamque mortem ardentiore studio peteret, quam Epicurus voluptatem petendam putat. Eorum enim est haec querela, qui sibi cari sunt seseque diligunt. At iam decimum annum inttamen simplicia, vestra versuta. Graecum enim hunc versum nostis omnes-: Suavis laborum est praeteritorum memoria..</p>
                                <img src={"/img/art-thumb01.jpg"} alt="" />
                                <img src={"/img/art-thumb02.jpg"} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
about.ignorePath = true

export default about