import React, { useEffect, useState } from "react";
import logo from "./assets/logo.png";

export default function Header({ history }) {

  const [usernome, setUsernome] = useState("");

  function handleLogout(event) {

    event.preventDefault();

    localStorage.removeItem('eloyuseremail');
    localStorage.removeItem('eloyusernome');
    localStorage.removeItem('eloyuserid');
    localStorage.removeItem('eloyusertype');
    localStorage.removeItem('eloyuserestab');
    //history.push('/login');
    window.location.href = "/login";
  };

  useEffect(() => {
    const usertype = localStorage.getItem('eloyusertype');

    if(usertype === null)
      window.location.href = "/login";
    else
        setUsernome(localStorage.getItem('eloyusernome'));
  }, []);

  return (
    <div>
      <header className="main-header">
        <a href="/painel" className="logo">
          <span className="logo-mini">
            <b>E A</b>
          </span>
          <span className="logo-lg">
            <img src={logo} width={150}></img>
          </span>
        </a>
        <nav className="navbar navbar-static-top">

          <a
            href="url_f"
            className="sidebar-toggle"
            data-toggle="push-menu"
            role="button"
          >
            <span className="sr-only">Toggle navigation</span>
          </a>

          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">

              

              <li className="dropdown notifications-menu">
                <a
                  href="url_f"
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                >
                  <i className="fa fa-bell-o" />
                  <span className="label label-warning">10</span>
                </a>
                <ul className="dropdown-menu">
                  <li className="header">You have 10 notifications</li>
                  <li>

                    <ul className="menu">
                      <li>
                        <a href="url_f">
                          <i className="fa fa-users text-aqua" /> 5 new members
                          joined today
                        </a>
                      </li>
                      <li>
                        <a href="url_f">
                          <i className="fa fa-warning text-yellow" /> Very long
                          description here that may not fit into the page and
                          may cause design problems
                        </a>
                      </li>
                      <li>
                        <a href="url_f">
                          <i className="fa fa-users text-red" /> 5 new members
                          joined
                        </a>
                      </li>
                      <li>
                        <a href="url_f">
                          <i className="fa fa-shopping-cart text-green" /> 25
                          sales made
                        </a>
                      </li>
                      <li>
                        <a href="url_f">
                          <i className="fa fa-user text-red" /> You changed your
                          username
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="footer">
                    <a href="url_f">View all</a>
                  </li>
                </ul>
              </li>

              

              <li className="dropdown user user-menu">
                <a
                  href="url_f"
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                >
                  <img
                    src="/dist/img/user.png"
                    className="user-image"
                    alt="User"
                  />
                  <span className="hidden-xs">{usernome}</span>
                </a>
                <ul className="dropdown-menu">

                  <li className="user-header">
                    <img
                      src="/dist/img/user2-160x160.jpg"
                      className="img-circle"
                      alt="User"
                    />
                    <p>
                      Alexander Pierce - Web Developer
                      <small>Member since Nov. 2012</small>
                    </p>
                  </li>

                  <li className="user-body">
                    <div className="row">
                      <div className="col-xs-4 text-center">
                        <a href="url_f">Followers</a>
                      </div>
                      <div className="col-xs-4 text-center">
                        <a href="url_f">Sales</a>
                      </div>
                      <div className="col-xs-4 text-center">
                        <a href="url_f">Friends</a>
                      </div>
                    </div>

                  </li>

                  <li className="user-footer">
                    <div className="pull-left">
                      <a href="url_f" className="btn btn-default btn-flat">
                        Profile
                      </a>
                    </div>
                    <div className="pull-right">
                      <button className="btn btn-default btn-flat" onClick={handleLogout}>Sair</button>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
}
