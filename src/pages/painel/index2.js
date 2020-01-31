import React, { useEffect, useState } from "react";
import Header from "../../Header";
import SideMenu from "../../SideMenu";
import Footer from "../../Footer";

export default function Painel({ history }) {
  const [usernome, setUsernome] = useState("");

  useEffect(() => {
    document.body.className = "hold-transition skin-blue sidebar-mini";
    setUsernome(localStorage.getItem("eloyusernome"));
  }, []);

  return (
    <>
      <Header />
      <SideMenu />

      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <h1>
            Painel Administração
            <small>&nbsp;&nbsp;Seja bem vindo(a), {usernome}</small>
          </h1>
      
        </section>
        {/* Main content */}
        <section className="content">
          <div className="row">

            <div className="col-lg-3 col-xs-6">
              {/* small box */}
              <div className="small-box bg-aqua">
                <div className="inner">
                  <h3>150</h3>
                  <p>Pedidos Delivery</p>
                </div>
                <div className="icon">
                  <i className="ion ion-bag" />
                </div>
                <a href="#" className="small-box-footer">
                  Ir para Pedidos <i className="fa fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-3 col-xs-6">
              {/* small box */}
              <div className="small-box bg-green">
                <div className="inner">
                  <h3>
                    543<sup style={{ fontSize: 20 }}></sup>
                  </h3>
                  <p>Visitas</p>
                </div>
                <div className="icon">
                  <i className="ion ion-person-add" />
                </div>
                <a href="#" className="small-box-footer">
                  Ir para visitas <i className="fa fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-3 col-xs-6">
              {/* small box */}
              <div className="small-box bg-yellow">
                <div className="inner">
                  <h3>2</h3>
                  <p>Destaques Cadastrados</p>
                </div>
                <div className="icon">
                  <i className="ion ion-podium" />
                </div>
                <a href="#" className="small-box-footer">
                  Ir para destaques <i className="fa fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-3 col-xs-6">
              {/* small box */}
              <div className="small-box bg-red">
                <div className="inner">
                  <h3>2</h3>
                  <p>Cupons cadastrados</p>
                </div>
                <div className="icon">
                  <i className="ion ion-pricetags" />
                </div>
                <a href="#" className="small-box-footer">
                  Ir para cupons <i className="fa fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            {/* ./col */}
          </div>

          <div className="row">
          <div className="col-md-3">
  {/* DIRECT CHAT WARNING */}
  <div className="box box-warning direct-chat direct-chat-warning">
    <div className="box-header with-border">
      <h3 className="box-title">Direct Chat</h3>
      <div className="box-tools pull-right">
        <span data-toggle="tooltip" title className="badge bg-yellow" data-original-title="3 New Messages">3</span>
        <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus" />
        </button>
        <button type="button" className="btn btn-box-tool" data-toggle="tooltip" title data-widget="chat-pane-toggle" data-original-title="Contacts">
          <i className="fa fa-comments" /></button>
        <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times" /></button>
      </div>
    </div>
    {/* /.box-header */}
    <div className="box-body">
      {/* Conversations are loaded here */}
      <div className="direct-chat-messages">
        {/* Message. Default to the left */}
        <div className="direct-chat-msg">
          <div className="direct-chat-info clearfix">
            <span className="direct-chat-name pull-left">Alexander Pierce</span>
            <span className="direct-chat-timestamp pull-right">23 Jan 2:00 pm</span>
          </div>
          {/* /.direct-chat-info */}
          <img className="direct-chat-img" src="../dist/img/user1-128x128.jpg" alt="Message User Image" />{/* /.direct-chat-img */}
          <div className="direct-chat-text">
            Is this template really for free? That's unbelievable!
          </div>
          {/* /.direct-chat-text */}
        </div>
        {/* /.direct-chat-msg */}
        {/* Message to the right */}
        <div className="direct-chat-msg right">
          <div className="direct-chat-info clearfix">
            <span className="direct-chat-name pull-right">Sarah Bullock</span>
            <span className="direct-chat-timestamp pull-left">23 Jan 2:05 pm</span>
          </div>
          {/* /.direct-chat-info */}
          <img className="direct-chat-img" src="../dist/img/user3-128x128.jpg" alt="Message User Image" />{/* /.direct-chat-img */}
          <div className="direct-chat-text">
            You better believe it!
          </div>
          {/* /.direct-chat-text */}
        </div>
        {/* /.direct-chat-msg */}
      </div>
      {/*/.direct-chat-messages*/}
      {/* Contacts are loaded here */}
      <div className="direct-chat-contacts">
        <ul className="contacts-list">
          <li>
            <a href="#">
              <img className="contacts-list-img" src="../dist/img/user1-128x128.jpg" alt="User Image" />
              <div className="contacts-list-info">
                <span className="contacts-list-name">
                  Count Dracula
                  <small className="contacts-list-date pull-right">2/28/2015</small>
                </span>
                <span className="contacts-list-msg">How have you been? I was...</span>
              </div>
              {/* /.contacts-list-info */}
            </a>
          </li>
          {/* End Contact Item */}
        </ul>
        {/* /.contatcts-list */}
      </div>
      {/* /.direct-chat-pane */}
    </div>
    {/* /.box-body */}
    <div className="box-footer">
      <form action="#" method="post">
        <div className="input-group">
          <input type="text" name="message" placeholder="Type Message ..." className="form-control" />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-warning btn-flat">Send</button>
          </span>
        </div>
      </form>
    </div>
    {/* /.box-footer*/}
  </div>
  {/*/.direct-chat */}
</div>

          </div>


        </section>
        {/* /.content */}
      </div>

      <Footer />
    </>
  );
}
