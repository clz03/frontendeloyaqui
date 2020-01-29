import React from 'react';
// import "./App.css";
import Routes from './routes';
import logo from "./assets/logo.png";
import './assets/plugins/pace/pace-theme-flash.css';
import './assets/plugins/bootstrap/css/bootstrap.min.css';
import './assets/fonts/font-awesome/css/font-awesome.css';
import './assets/css/animate.min.css';
import './assets/plugins/perfect-scrollbar/perfect-scrollbar.css';
import './assets/css/style.css';
import './assets/css/responsive.css';

function App() {

  return (
    <body className=" ">

        <div className="page-container row-fluid">

            <Routes/>

        </div>

        <script src="assets/js/jquery-3.4.1.min.js" type="text/javascript"></script> 
        <script src="assets/js/popper.min.js" type="text/javascript"></script> 
        <script src="assets/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script> 
        <script src="assets/plugins/pace/pace.min.js" type="text/javascript"></script>  

        <script src="assets/plugins/perfect-scrollbar/perfect-scrollbar.min.js" type="text/javascript"></script> 
        <script src="assets/plugins/viewport/viewportchecker.js" type="text/javascript"></script>  

        <script src="assets/plugins/rickshaw-chart/vendor/d3.v3.js" type="text/javascript"></script> 
        <script src="assets/plugins/jquery-ui/smoothness/jquery-ui.min.js" type="text/javascript"></script> 
        <script src="assets/plugins/rickshaw-chart/js/Rickshaw.All.js"></script>
        <script src="assets/plugins/sparkline-chart/jquery.sparkline.min.js" type="text/javascript"></script>
        <script src="assets/plugins/easypiechart/jquery.easypiechart.min.js" type="text/javascript"></script>
        <script src="assets/plugins/morris-chart/js/raphael-min.js" type="text/javascript"></script>
        <script src="assets/plugins/morris-chart/js/morris.min.js" type="text/javascript"></script>
        <script src="assets/plugins/jvectormap/jquery-jvectormap-2.0.1.min.js" type="text/javascript"></script>
        <script src="assets/plugins/jvectormap/jquery-jvectormap-world-mill-en.js" type="text/javascript"></script>
        <script src="assets/plugins/gauge/gauge.min.js" type="text/javascript"></script>
        <script src="assets/plugins/icheck/icheck.min.js" type="text/javascript"></script>
        <script src="assets/js/blo-dashboard.js" type="text/javascript"></script>

        <script src="assets/js/scripts.js" type="text/javascript"></script> 

        <script src="assets/plugins/sparkline-chart/jquery.sparkline.min.js" type="text/javascript"></script>
        <script src="assets/js/chart-sparkline.js" type="text/javascript"></script>

    </body>
  );
}

export default App;
