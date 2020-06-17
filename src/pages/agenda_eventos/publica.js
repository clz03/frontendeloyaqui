import React, { useState, useEffect } from "react";
import "../../App.css";
import carregando from "../../assets/loading.gif";
import api from '../../services/api';
import { connect, disconnect, subscribeToNewAgenda } from "../../services/socket";
import Calendar from 'react-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';
import './calendar.css';

export default function AgendaPublica() {

    const [loading, setLoading] = useState('');
    const [value, onChange] = useState(new Date());
    const [blackdates, setBlackdates] = useState([]);  
    const [seldate, setSeldate] = useState();  

    const url_string = window.location.href;
    const param = url_string.split("/");
    const userestab = param[4];

    async function loadCalendar() {
        var dias = ["0","1","2","3","4","5","6"];
        var arrFeriados = [];
        let datesBlacklist = [];
        var i = 0;
        var curDate; 
        var curDay;
        var blackdat;

        const response = await api.get('/feriados');
        const data = await response.data;
        
        for (i = 0; i < data.length; i++) {
          arrFeriados.push(data[i].data.toString().substring(0,10));
        };
       
        // Next 30 days
        for (let i = 0; i <= 30; ++i){
            curDay = moment().add(i,'days').startOf('day').toISOString().substring(0,10);
            curDate = moment().add(i,'days').day();
            
            if(arrFeriados.includes(curDay)){
                blackdat = new Date(curDay+'T10:00:00');
                datesBlacklist.push(blackdat);
            } else if(!dias.includes(curDate.toString())){
                blackdat = new Date(curDay+'T10:00:00');
                datesBlacklist.push(blackdat);
            };
        };

        var todayDate = new Date();
        todayDate.setDate(todayDate.getDate() + 30);

        setBlackdates(datesBlacklist);
        setSeldate(todayDate);

      };


    useEffect(() => {
      setLoading(true);
      loadCalendar();
      setLoading(false);

      //setupWebsocket(userestab);
      //subscribeToNewAgenda(status => loadEvento(1, true));
      
    }, []);

  return (
    <>

    <div>
        <div className="wrapper" style={{backgroundColor:'#ecf0f5'}}>

            <section className="content-header">
                <h1>
                    Agende Aqui<small>( Barbearia do Rody )</small>
                </h1>
            </section>

            <section className="content">
                <div className="row">
                    <div className="col-xs-12 center-block text-center">
                            <Calendar
                                onChange={onChange}
                                value={value}
                                maxDate={seldate}
                                minDate={new Date()}
                                onClickDay={(value) => alert(value) }
                                tileDisabled={({date, view}) =>
                                    (view === 'month') && // Block day tiles only
                                    blackdates.some(disabledDate =>
                                        date.getFullYear() === disabledDate.getFullYear() &&
                                        date.getMonth() === disabledDate.getMonth() &&
                                        date.getDate() === disabledDate.getDate()
                                    )
                                }
                            />

                    </div>
                </div>
            </section>

        </div>
    </div>
    
    </>
)
}



