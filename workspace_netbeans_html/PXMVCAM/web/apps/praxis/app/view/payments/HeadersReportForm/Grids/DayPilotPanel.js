Ext.define('Ext.Praxis.view.payments.HeadersReportForm.Grids.DayPilotPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'daypilotpanel',

    title: 'Headers Calendar',

    layout: 'fit', // Para que el calendario ocupe todo el panel
    request: axios.create({
        baseURL: CONTEXTPATH + '/HeadersReport',
        timeout: 0
    }),
    initComponent: function () {
        var me = this;

        me.tbar = [
            {
                xtype: 'panel',
                border: false,
                width: '20%',
                bodyStyle: 'background-color: #E3EAF9;',
                padding: '0 5 0 5',
                layout: {
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'combobox',
                        labelStyle: 'font-weight:bold;',
                        fieldLabel: 'Type',
                        id: prototype.id + '-cmbTipoconWk',
                        store: Ext.create('Ext.data.SimpleStore', {
                            fields: ['code', 'name'],
                            data: [
                                ['REG', 'Regular'],
                                ['DEB', 'Debit'],
                                ['ADJ', 'Adjustment'],
                                ['ADM', 'ADM']
                            ]
                        }),
                        labelWidth: 60,
                        width: 190,
                        displayField: 'name',
                        valueField: 'code',
                        queryMode: 'local',
                        editable: false,
                        value: 'REG',
                        listeners: {
                            change: function(){
                                me.calendar.startDate = new DayPilot.Date();
                                me.getData();
                            }
                        }
                    }
                ]
            },
            {
                xtype: 'panel',
                border: false,
                bodyStyle: 'background-color: #E3EAF9;',
                width: '80%',
                layout: {
                    type: 'hbox',
                    pack: 'end' // Centra horizontalmente los botones
                },
                defaults: {
                    xtype: 'button',
                    margin: 2,
                    border: false
                },
                items: [
                    {
                        iconCls: 'prx-icon-pagination-previous',
                        tooltip: 'Previous',
                        handler: function () {
                            me.moveWeek(-7);
                        }
                    },
                    {
                        iconCls: 'prx-icon-reload',
                        tooltip: 'Current',
                        handler: function () {
                            me.resetWeek();
                        }
                    },
                    {
                        iconCls: 'prx-icon-pagination-next',
                        tooltip: 'Next',
                        handler: function () {
                            me.moveWeek(7);
                        }
                    }
                ]}
        ];

        me.html = '<div id="daypilot-container" style="width: 100%; height: 100%;"></div>';

        me.callParent(arguments);
    },

    listeners: {
        afterRender: async function () {
            var me = this;

            // Crear y configurar el calendario
            me.calendar = new DayPilot.Calendar("daypilot-container");
            me.calendar.viewType = "Week";
            me.calendar.startDate = new DayPilot.Date();
            me.calendar.headerDateFormat = "dddd d, MMMM";
            me.calendar.onEventClick = this.onClickEvent;
            me.calendar.view = me;
            me.calendar.init();

            await me.getData();

            me.calendar.update();

        }

    },

    // Función para moverse entre semanas
    moveWeek: async function (days) {
        var newDate = this.calendar.startDate.addDays(days);
        this.calendar.startDate = newDate;
        await this.getData();
        //this.calendar.update();
    },

    // Función para volver a la semana actual
    resetWeek: async function () {
        this.calendar.startDate = new DayPilot.Date();
        await this.getData();
        //this.calendar.update();
    },

    getWeekRange: function () {
        var startDate = this.calendar.startDate;

        var startOfWeek = startDate.addDays(-1); // Mueve al lunes
        var endOfWeek = startOfWeek.addDays(5); // Agrega 6 días para llegar al domingo

        return {
            start: startOfWeek.toString("yyMMdd"),
            end: endOfWeek.toString("yyMMdd")
        };
    },
    getData: async function () {
        const me = this;
        me.setLoading(true);
        let tipocon = Ext.getCmp(prototype.id + '-cmbTipoconWk').value;
        const {start, end} = me.getWeekRange();
        try {
            const res = await me.request.get('loadWeekHeaders', {
                params: {
                    IN_TIPOCON: tipocon,
                    IN_PRDAF: start,
                    IN_PRDAT: end
                }
            });
            const {response} = res.data;
            me.weekData = me.convertToEvents(me.groupByHourAndCCUST(response));
            me.calendar.events.list = me.weekData;
            me.calendar.update();
            console.log('Week Data', me.weekData);
        } catch (e) {
            console.error(e);
            global.Msg({msg: 'Error on Load'});
        } finally {
            me.setLoading(false);
        }
    },
    convertToEvents: function (groupedData) {
        let events = [];
        let tipocon = Ext.getCmp(prototype.id + '-cmbTipoconWk').value;
        console.log(groupedData);
        Object.values(groupedData).forEach((item, index) => {
            let dateStr = "20" + item.FSEND.trim(); // Convierte FSEND a formato Año-Mes-Día (Ej: "250217" → "2025-02-17")
            let formattedDate = dateStr.substring(0, 4) + "-" + dateStr.substring(4, 6) + "-" + dateStr.substring(6, 8);
            let startTime = formattedDate + "T" + item.HSEND.padStart(2, "0") + ":00:00"; // HSEND → Hora
            let endTime = formattedDate + "T" + (parseInt(item.HSEND) + 1).toString().padStart(2, "0") + ":00:00"; // +1 hora

            let cliente = {
                '134': 'AVIANCA',
                '547': 'AEROGAL',
                '133': 'LACSA',
                '202': 'TACA'
            };
            //Cliente


            events.push({
                id: item.HSEND + "-" + item.CCUST,
                text: `${cliente[item.CCUST] || ''} \n Processors: ${item.QTYPROCS}`,
                start: startTime,
                end: endTime,
                backColor: "#96e77a", // Rojo
                textColor: "#373b35",
                item: item,
                searchParams: {
                    IN_CCUST: item.CCUST,
                    IN_TIPOCON: tipocon,
                    IN_FSEND: item.FSEND,
                    IN_HSEND: item.HSEND
                }
            });
        });
        return events;
    },
    groupByHourAndCCUST: function (data) {
        return data.reduce((acc, item) => {
            let key = `${item.CCUST}-${item.FSEND}-${item.HSEND}`;
            if (!acc[key]) {
                acc[key] = {CCUST: item.CCUST, FSEND: item.FSEND, HSEND: item.HSEND, QTYPROCS: 0};
            }
            acc[key].QTYPROCS += item.QTYPROCS;
            return acc;
        }, {});
    },
    onClickEvent: async function (args) {
        const me = this.view;
        me.setLoading(true);
        let event = args.e.data;
        try {
            const res = await me.request.get('loadWeekHeaderDetail', {
                params: event.searchParams
            });
            const {response} = res.data;
            let store = new Ext.data.Store({
                data: response
            });
            Ext.create('Ext.window.Window', {
                title: 'Interfaces',
                modal: true,
                width: 1000,
                minHeight: 250,
                resizable: false,
                layout: 'fit',
                items: [{
                        xtype: 'panel',
                        border: false,
                        items: [
                            {
                                xtype: 'grid',
                                width: '100%',
                                border: false,
                                store: store,
                                id: prototype.id + '-intefacesFsend-1',
                                minHeight: 200,
                                viewConfig: {
                                    stripeRows: false,
                                    enableTextSelection: true,
                                    markDirty: false
                                },
                                columnLines: true,
                                columns: {
                                    defaults: {
                                        align: 'center',
                                        menuDisabled: true,
                                        sortable: true
                                    },
                                    items: [
                                        //<editor-fold defaultstate="collapsed" desc="Detail Cols">
                                        {
                                            text: 'RN',
                                            locked: true,
                                            xtype: 'rownumberer', // Columna de número de fila
                                            width: 40 // Ancho de la columna de número de fila (ajusta según tus necesidades)
                                        },
                                        {text: 'Processor', dataIndex: 'DESC_PRO', width: 140},
                                        {text: 'Header ID', dataIndex: 'CORRLAV', flex: 1},
                                        {text: 'File Name', dataIndex: 'FILENAM', width: 350},
                                        {text: 'Date', dataIndex: 'FSEND', width: 70},
                                        {text: 'Time', dataIndex: 'HSEND', width: 60},
                                        {text: 'User Send', dataIndex: 'USENV', width: 100}
                                        //</editor-fold>
                                    ]
                                },
                                bbar: {
                                    xtype: 'container',
                                    border: false,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'end' // Centra horizontalmente los botones
                                    },
                                    defaults: {
                                        xtype: 'textfield',
                                        editable: false,
                                        labelStyle: 'text-align:left;font-weight: bolder;',
                                        fieldStyle: 'text-align:center;font-weight: bolder;'
                                    },
                                    items: [
                                        {
                                            fieldLabel: 'Total Files',
                                            labelWidth: 90,
                                            width: 200,
                                            margin: 3,
                                            value: response.length
                                        }
                                    ]
                                }
                            }
                        ]
                    }],
                bbar: {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        pack: 'center' // Centra horizontalmente los botones
                    },
                    items: [
                        {
                            xtype: 'button',
                            text: 'Close',
                            scale: 'medium',
                            margin: 5,
                            iconCls: 'prx-icon-cancel',
                            handler: function (btn) {
                                btn.up('window').close();
                            }
                        }
                    ]
                }
            }).show();
        } catch (e) {
            console.error(e);
            global.Msg({msg: 'Error on Load'});
        } finally {
            me.setLoading(false);
        }



    }
});