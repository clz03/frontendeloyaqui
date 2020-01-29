import React, {useState} from "react";
import api from '../../services/api';
import appstore from "../../assets/app-store.png"
import carregando from "../../assets/loading.gif";
import googlestore from "../../assets/google-play.png"

export default function Login({ history }) {

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [loading, setLoading] = useState("");

    async function handleSubmit(event) {
        
        setLoading(true);
        event.preventDefault();

        const dataobj = { 
            email: email,
            senha: pwd
          };

        await api.post('/admauthenticate', dataobj)
        .then((res) => {
            if(res.data.error != undefined){
                alert(res.data.error);
                setLoading(false);
                return;
            }else{
                localStorage.setItem('eloyuseremail', email);
                localStorage.setItem('eloyusernome', res.data.nome);
                localStorage.setItem('eloyuserid', res.data._id);
                localStorage.setItem('eloyusertype', res.data.tipo);
                localStorage.setItem('eloyuserestab', res.data.idestabelecimento);
                setLoading(false);
                if(res.data.tipo > 0){
                    history.push('/admpainel');
                } else {
                    history.push('/painel');
                }  
            }
        }).catch((error) => {
            alert(error);
            setLoading(false);
            return;
        });    
      }

    return (
        <>
        <head>

        <link href="assets/plugins/pace/pace-theme-flash.css" rel="stylesheet" type="text/css" media="screen"/>
        <link href="assets/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <link href="assets/fonts/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css"/>
        <link href="assets/css/animate.min.css" rel="stylesheet" type="text/css"/>
        <link href="assets/plugins/perfect-scrollbar/perfect-scrollbar.css" rel="stylesheet" type="text/css"/>



        <link href="assets/plugins/icheck/skins/square/orange.css" rel="stylesheet" type="text/css" media="screen"/> 



        <link href="assets/css/style.css" rel="stylesheet" type="text/css"/>


    </head>


    <body className=" login_page">


        <div className="login-wrapper">
            <div id="login" className="login loginpage offset-xl-4 col-xl-4 offset-lg-3 col-lg-6 offset-md-3 col-md-6 col-offset-0 col-12">
                <h1><a href="#" title="Login Page" tabindex="-1">Ultra Admin</a></h1>

                <form name="loginform" id="loginform" action="index.html" method="post">
                    <p>
                        <label for="user_login">Username<br />
                            <input type="text" name="log" id="user_login" className="input" value="demo" size="20" /></label>
                    </p>
                    <p>
                        <label for="user_pass">Password<br />
                            <input type="password" name="pwd" id="user_pass" className="input" value="demo" size="20" /></label>
                    </p>
                    <p className="forgetmenot">
                        <label className="icheck-label form-label" for="rememberme"><input name="rememberme" type="checkbox" id="rememberme" value="forever" className="skin-square-orange" checked /> Remember me</label>
                    </p>



                    <p className="submit">
                        <input type="submit" name="wp-submit" id="wp-submit" className="btn btn-orange btn-block" value="Sign In" />
                    </p>
                </form>

                <p id="nav">
                    <a className="float-left" href="#" title="Password Lost and Found">Forgot password?</a>
                    <a className="float-right" href="ui-register.html" title="Sign Up">Sign Up</a>
                </p>


            </div>
        </div>







        <script src="assets/js/jquery-3.4.1.min.js" type="text/javascript"></script> 
        <script src="assets/js/popper.min.js" type="text/javascript"></script> 
        <script src="assets/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script> 
        <script src="assets/plugins/pace/pace.min.js" type="text/javascript"></script>  

        <script src="assets/plugins/perfect-scrollbar/perfect-scrollbar.min.js" type="text/javascript"></script> 
        <script src="assets/plugins/viewport/viewportchecker.js" type="text/javascript"></script>  



        <script src="assets/plugins/icheck/icheck.min.js" type="text/javascript"></script>



        <script src="assets/js/scripts.js" type="text/javascript"></script> 


        <script src="assets/plugins/sparkline-chart/jquery.sparkline.min.js" type="text/javascript"></script>
        <script src="assets/js/chart-sparkline.js" type="text/javascript"></script>


       
    </body>
    </>
    )
}