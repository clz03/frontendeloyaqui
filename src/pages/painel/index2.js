import React, {useState,useEffect} from "react";
import api from '../../services/api';
import SideBar from '../../SideBar';

export default function Painel({ history }) {
    
    const usertype = localStorage.getItem('eloyusertype');
    const [usernome, setUsernome] = useState("");
    const [pedonline, setPedonline] = useState(false);
    const [cardapio, setCardapio] = useState(false);

    const handleSubmit = pagina=> event=> {
        event.preventDefault();
        history.push(pagina)
    }

    function handleLogout(event) {

        event.preventDefault();

        localStorage.removeItem('eloyuseremail');
        localStorage.removeItem('eloyusernome');
        localStorage.removeItem('eloyuserid');
        localStorage.removeItem('eloyusertype');
        localStorage.removeItem('eloyuserestab');
        history.push('/login');
    }

    async function checkButtons() {
        const response = await api.get('/estabelecimentos/' + localStorage.getItem('eloyuserestab'));
        const data = await response.data;
        setPedonline(data[0].pedonline);
        setCardapio(data[0].cardapio);
    }

    useEffect(() => {
        if(usertype == null)
            history.push('/login');
        else
            setUsernome(localStorage.getItem('eloyusernome'));
        checkButtons();
      }, []);


  return (
            <>
            <SideBar/>
            <section id="main-content" className=" ">
                <section className="wrapper main-wrapper">

                    <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                        <div className="page-title">

                            <div className="float-left">
                                <h1 className="title">Blog</h1>                            
                            </div>

                            <div className="float-right d-none">
                                <ol className="breadcrumb">
                                    <li>
                                        <a href="index.html"><i className="fa fa-home"></i>Home</a>
                                    </li>
                                    <li>
                                        <a href="general.html">Multi Purpose</a>
                                    </li>
                                    <li className="active">
                                        <strong>Blog Admin</strong>
                                    </li>
                                </ol>
                            </div>

                        </div>
                    </div>
                    <div className="clearfix"></div>


                    <div className="col-xl-12">
                        <section className="box nobox">
                            <div className="content-body">

                                <div className="row">
                                    <div className="col-lg-3 col-md-6 col-12">
                                        <div className="r4_counter db_box">
                                            <i className='float-left fa fa-thumbs-up icon-md icon-rounded icon-primary'></i>
                                            <div className="stats">
                                                <h4><strong>450K</strong></h4>
                                                <span>Blog Page Views</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-12">
                                        <div className="r4_counter db_box">
                                            <i className='float-left fa fa-user icon-md icon-rounded icon-orange'></i>
                                            <div className="stats">
                                                <h4><strong>6243</strong></h4>
                                                <span>New Visitors</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-12">
                                        <div className="r4_counter db_box">
                                            <i className='float-left fa fa-database icon-md icon-rounded icon-purple'></i>
                                            <div className="stats">
                                                <h4><strong>99.9%</strong></h4>
                                                <span>Server Up</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-12">
                                        <div className="r4_counter db_box">
                                            <i className='float-left fa fa-users icon-md icon-rounded icon-warning'></i>
                                            <div className="stats">
                                                <h4><strong>1433</strong></h4>
                                                <span>New Users</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>  



                                <div className="row">



                                

                                </div>


                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-12">
                                        <div className="wid-vectormap">
                                            <h4>Visitor's Statistics</h4>
                                            <div className="row">
                                                <div className="col-md-9 col-sm-9 col-xs-12">
                                               
                                                </div>
                                                <div className="col-md-3 col-sm-3 col-xs-12 map_progress">
                                                  
                                                </div>
                                            </div>
                                        </div>
                                    </div>		


                                </div>

                                <div className="row">
                                    <div className="col-lg-6 col-md-12 col-12">

                                        <div className="r1_graph1 db_box db_box_large">
                                            <span className='bold'>98.95%</span>
                                            <span className='float-right'><small>SERVER UP</small></span>
                                            <div className="clearfix"></div>
                                            <span className="db_dynamicbar">Loading...</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12 col-12">

                                        <div className="r1_graph2 db_box db_box_large">
                                            <span className='bold'>2332</span>
                                            <span className='float-right'><small>USERS ONLINE</small></span>
                                            <div className="clearfix"></div>
                                            <span className="db_linesparkline">Loading...</span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </section></div>



                </section>
            </section>
            </>
  );
}
