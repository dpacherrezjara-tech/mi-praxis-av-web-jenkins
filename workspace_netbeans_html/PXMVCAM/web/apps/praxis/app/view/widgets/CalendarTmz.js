Ext.define('Ext.Praxis.view.widgets.CalendarTmz', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.CalendarTmz',
    height: 650,
    width: 1400,
    layout: 'container',
    align: 'center',
    config: {
        ccust: null,
        procesador: null,
        anio: null,
        dataFechas: [],
        diasLaborales: ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'],
        mesesAnual: ['JAN', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        clickCallback: null
    },
    //padding: '10 10 10 10',
    fechas: [],
    initComponent: function () {
        let me = this;
        me.title = `Calendar ${me.anio}`;
        me.actualizarCalendario();
        me.items = [];
        let panel = {
            xtype: 'panel',
            border: false,
            width: 1400,
            id: prototype.id + '-calendarPanel01',
            height: 650,
            layout: 'container',
            items: [
                //<editor-fold defaultstate="collapsed" desc="dias header">
                {
                    xtype: 'panel',
                    id: prototype.id + '-calendarHeader01',
                    layout: {
                        type: 'hbox',
                        pack: 'end'
                    },
                    width: 1400,
                    height: 30,
                    border: false,
                    defaults: {
                        xtype: 'label',
                        //margin: '10 0 0 10', // Margen para separar la etiqueta de otros componentes
                        padding: 5,
                        style: {
                            textAlign: 'center', // Centro el texto horizontalmente
                            fontWeight: 'bold'
                        }
                    },
                    items: [
                        {
                            xtype: 'tbspacer',
                            width: 100
                        },
                        ...me.diasLaborales.map(x => {
                            return{
                                id: prototype.id + '-diaLab-' + x,
                                text: x,
                                flex: 1
                            };
                        }),
                        {
                            xtype: 'tbspacer',
                            width: 10
                        }
                    ]
                },
                //</editor-fold>
                {
                    xtype: 'panel',
                    id: prototype.id + '-calendarBody01',
                    layout: {
                        type: 'hbox'
                    },
                    width: 1400,
                    height: 550,
                    autoScroll: true,
                    border: false,
                    items: [
                        //<editor-fold defaultstate="collapsed" desc="meses header">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-calendarHeader02',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            width: 100,
                            border: true,
                            defaults: {
                                xtype: 'label',
                                style: {
                                    textAlign: 'center', // Centro el texto horizontalmente
                                    'line-height': '115px',
                                    backgroundColor: 'transparent',
                                    fontWeight: 'bold'
                                }
                            },
                            items: me.mesesAnual.map(x => {
                                return {
                                    id: prototype.id + '-mesAnual-' + x,
                                    width: 90,
                                    height: 140,
                                    text: x
                                };
                            })
                        },
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="fechas">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-calendarDates01',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            width: 1285,
                            border: true,
                            defaults: {
                                xtype: 'panel',
                                //bodyStyle: 'background-color: #8f9fa2;',
                                //border:false,
                                layout: {
                                    type: 'hbox',
                                    align: 'center'
                                },
                                style: {
                                    textAlign: 'center' // Centro el texto horizontalmente
                                }
                            },
                            items: me.mesesAnual.map((e, index) => {
                                let fechas = [];
                                let contadorInicio = 0;
                                while (contadorInicio < me.fechas[index][0].index) {
                                    let obj = {};
                                    obj.fecha = '';
                                    obj.index = contadorInicio;
                                    obj.rn = contadorInicio;
                                    obj.status = 'none';
                                    fechas.push(obj);
                                    contadorInicio++;
                                }
                                me.fechas[index].forEach(e => {
                                    let y = fechas.at(-1);
                                    e.rn = (y ? y.rn : 0) + 1;
                                    fechas.push(e);
                                });
                                //console.log('contador fin',fechas.at(-1).index);
                                while (fechas.at(-1).index < 7) {
                                    let obj = {};
                                    obj.fecha = '';
                                    obj.rn = (fechas.at(-1).rn || 0) + 1;
                                    obj.index = fechas.at(-1).index + 1;
                                    obj.status = 'none';
                                    fechas.push(obj);
                                }
                                //console.log('fechas contenedor',fechas);
                                let componentes = [];
                                for (let i = 0; i < 7; i++) {
                                    let componente = {
                                        defaults: {
                                            xtype: 'label',
                                            flex: 1,
                                            width: 90,
                                            height: 18,
                                            margin: 2,
                                            style: {
                                                textAlign: 'center'
                                            }
                                        },
                                        items: []
                                    };
                                    let filtrado = fechas.filter(x => x.index === i);
                                    filtrado.forEach(x => {
                                        //<editor-fold defaultstate="collapsed" desc="boton fecha">
                                        const sts = {
                                            'ok': {
                                                style: {
                                                    backgroundColor: 'transparent',
                                                    color: 'green',
                                                    fontWeight: 'bold',
                                                    cursor: 'pointer'
                                                },
                                                listeners: {
                                                    afterrender: function (label) {
                                                        label.getEl().on('click', function () {
                                                            me.clickCallback(label);
                                                        });
                                                    }
                                                }
                                            },
                                            'incomplete': {
                                                style: {
                                                    backgroundColor: 'transparent',
                                                    color: 'yellow',
                                                    fontWeight: 'bold',
                                                    cursor: 'pointer'
                                                },
                                                listeners: {
                                                    afterrender: function (label) {
                                                        label.getEl().on('click', function () {
                                                            me.clickCallback(label);
                                                        });
                                                    }
                                                }
                                            },
                                            'not found': {
                                                style: {
                                                    backgroundColor: 'transparent',
                                                    color: 'red',
                                                    fontWeight: 'bold',
                                                    cursor: 'pointer'
                                                },
                                                listeners: {
                                                    afterrender: function (label) {
                                                        label.getEl().on('click', function () {
                                                            me.clickCallback(label);
                                                        });
                                                    }
                                                }
                                            }
                                        };
                                        //</editor-fold>
                                        let props = {...sts[x.status]};
                                        componente.items.push({
                                            text: x.fecha, //.substring(6, 8),
                                            id: prototype.id + `-${!x.procesador ? 'none' : x.procesador}-m${e}-d${x}-f${x.rn}`,
                                            fecha:x.fecha,
                                            procesador:!x.procesador ? 'none' : x.procesador,
                                            ccust: x.ccust,
                                            ...props
                                        });
                                    });
                                    componentes.push(componente);

                                }
                                //console.log('componentes', componentes);
                                //console.log('index num',index%2===0);
                                return{
                                    id: prototype.id + `-mes-${e}`,
                                    width: 1200,
                                    height: 140,
                                    bodyStyle: index%2===0?'background-color: #A7B4BD;':'background-color: #B3C0CA;',
                                    defaults: {
                                        xtype: 'panel',
                                        flex: 1,
                                        border: false,
                                        layout: {
                                            type: 'vbox',
                                            align: 'center'
                                        },
                                        bodyStyle: 'background-color: transparent;',
                                        height: 135
                                    },
                                    items: componentes
                                };
                            })
                        }
                                //</editor-fold>
                    ]
                }
            ]
        };
        me.items.push(panel);
        me.callParent(arguments);
    },

    actualizarCalendario: function () {
        let me = this;
        const fechasAnio = me.getFechasCalendario(me.anio);
        const fechasProceso = me.dataFechas;
        const response = [];
        me.mesesAnual.forEach((e, index) => {
            response[index + 1] = [];
        });
        fechasAnio.forEach((element) => {
            //let mes = me.mesesAnual[index-1];
            let mes = parseInt(element.fecha.substring(4, 6));
            let obj = {};
            obj.fecha = element.fecha;
            obj.index = element.index;
            let fechaProceso = fechasProceso.find(y => y.fecha === element.fecha);
            
            fechaProceso ?
                    obj.status = fechaProceso.status : obj.status = 'none';
            obj.ccust = me.ccust;
            //obj.procesador = fechasProceso[0].procesador;
            obj.procesador = me.procesador;
            response[mes].push(obj);

        });
        //console.log(response.filter(x=>x!==undefined));
        me.fechas = response.filter(x => x !== undefined);

    },
    getFechasCalendario: function (anioStr) {
        const anio = parseInt(anioStr);
        const startDate = new Date(anio, 0, 1); // 1 de enero del año
        const endDate = new Date(anio, 11, 31); // 31 de diciembre del año
        const result = [];

        // itera sobre todas las fechas dentro del rango
        for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
            // si el día de la semana no es sábado ni domingo, añade la fecha al resultado
//            if (date.getDay() !== 0 && date.getDay() !== 6) {
//                let fecha = {
//                    fecha: this.convertirFechaStr(new Date(date)),
//                    index: date.getDay()
//                }
//                result.push(fecha);
//            }
            let fecha = {
                fecha: this.convertirFechaStr(new Date(date)),
                index: date.getDay()
            };
            result.push(fecha);
        }
        return result;
    },
    convertirFechaStr: function (fecha) {
        let year = fecha.getFullYear();
        let month = fecha.getMonth() + 1;
        let day = fecha.getDate();

        // Agrega un cero delante del mes y el día si son menores a 10
        month = (month < 10 ? '0' : '') + month;
        day = (day < 10 ? '0' : '') + day;

        // Retorna la fecha en el formato AAAAMMDD
        return '' + year + month + day;
    }
});