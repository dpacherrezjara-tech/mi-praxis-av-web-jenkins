
Ext.define('Ext.Praxis.view.widgets.prorrate', {
    extend: 'Ext.container.Container',
    alias: 'widget.prorrate',
    requires: [
        'Ext.Praxis.view.widgets.facsimil',
        'Ext.Praxis.view.widgets.previewProrate',
        'Ext.Praxis.view.widgets.previewDelivery',
        'Ext.Praxis.view.widgets.previewGridColumns'
    ],
    //controller: 'prorrateController',
    bean: {},
    beanP: {},
    beanAccess: {},
    //beanProrate: {},
    lstA713: new Array(),
    meParentP: '',
    intVez: 0,
    strProcessBrowDet: '0',
    strTAjuste: '0',
    SumTarifLoc: 0.0,
    AjtTarifLoc: 0.0,
    NumTktAnt: '',
    strTktNumPrev: '',
    strTCAPAG: '',
    strTVenta: '',
    bMalItinerario: false,
    bRutaValida: false,

    constructor: function (config) {
        var me = this;
        me.config_ = config;
        me.id = config.id;

        me.functions = {
            showPreviewProrate: function (lstProrate) {

                var win = new Ext.Praxis.view.widgets.previewProrate({
                    id: me.id + '-preview',
                    data: lstProrate
                });

                win.show();
            }
        };

        //@asifuentes
        me.events = {
            onBtnProrateTicketClick: function (ev) {
                var lstProrate = [];

                //Método de prorrateo
                //lstProrate = me.getPreviewRfndData();

                //Data de prueba
                lstProrate.push({
                    CPNPR: 1,
                    A720RUTAO: "MEX",
                    A720RUTAD: "IAH",
                    A720CONEX: "X",
                    A720CARRA: "AM",
                    A720NVLO: "0001",
                    A720FVLO: "20190101",
                    A720BOOKI: "",
                    A720CLASE: "Y",
                    A720FBUSO: "*",
                    A720TBASE: "S",
                    A720STBAS: "*",
                    A720TDESC: "*",
                    A720PORDS: 8.34,
                    A720FARE: 45.31,
                    A720TFARE: "D",
                    A720SS: 6.23,
                    A720VLSRP: 3.52,
                    A720VLMPA: 3.63,
                    A720ACUEO: 5.02,
                    A720ACUCD: "A",
                    A720ISC: 7.08,
                    A720VALOR: 4.34,
                    A720AJUST: 6.77,
                    A720Q: 0.43,
                    A720FACT: "A",
                    A720PPRO: "B",
                    A720PROV: "C",
                    A720PRRCM: "D",
                    A720PRSCM: 0.00, //default
                    A720YQ: 0.00, //default
                    A720INDPR: "F",
                    A720VIA: "G",
                    A720DIFL: 9.23,
                    A720INDIF: "N",
                    A720TRFM: 3.65,
                    A720MNTFM: "H",
                    A720ACUE: 1.67,
                    A720QIN: 6.21,
                    A720TAJUST: 4.42,
                    A720YANQ: 2.54,
                    LO_TXTLOG: "I",
                    LK_ESTADO: "J",
                    LK_CODERROR: "K",
                    LK_MSJERROR: "L"
                });

                lstProrate.push({
                    CPNPR: 2,
                    A720RUTAO: "IAH",
                    A720RUTAD: "LIM",
                    A720CONEX: "X",
                    A720CARRA: "AM",
                    A720NVLO: "0002",
                    A720FVLO: "20190105",
                    A720BOOKI: "H",
                    A720CLASE: "Y",
                    A720FBUSO: "T",
                    A720TBASE: "S",
                    A720STBAS: "E",
                    A720TDESC: "J",
                    A720PORDS: 8.34,
                    A720FARE: 45.31,
                    A720TFARE: "M",
                    A720SS: 6.23,
                    A720VLSRP: 3.52,
                    A720VLMPA: 3.63,
                    A720ACUEO: 5.02,
                    A720ACUCD: "N",
                    A720ISC: 7.08,
                    A720VALOR: 4.34,
                    A720AJUST: 6.77,
                    A720Q: 0.43,
                    A720FACT: "O",
                    A720PPRO: "P",
                    A720PROV: "Q",
                    A720PRRCM: "R",
                    A720PRSCM: 0.00, //default
                    A720YQ: 0.00, //default
                    A720INDPR: "S",
                    A720VIA: "T",
                    A720DIFL: 9.23,
                    A720INDIF: "U",
                    A720TRFM: 3.65,
                    A720MNTFM: "V",
                    A720ACUE: 1.67,
                    A720QIN: 6.21,
                    A720TAJUST: 4.42,
                    A720YANQ: 2.54,
                    LO_TXTLOG: "W",
                    LK_ESTADO: "X",
                    LK_CODERROR: "Y",
                    LK_MSJERROR: "Z"
                });

                me.functions.showPreviewProrate(lstProrate);
            }
            //otros botones
        };

        me.items = [
            {
                xtype: 'form',
                id: me.id + '-form',
                defaults: {
                    border: false,
                    bodyStyle: 'background: #E6EFF5;'
                },
                border: true,
                items: [
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        defaults: {
                            border: false,
                            bodyStyle: 'background: #E6EFF5;'
                        },
                        items: [
                            {
                                xtype: 'panel',
                                height: 400,
                                width: 790,
                                items: [
                                    {
                                        xtype: 'facsimil',
                                        id: me.id + 'Facsimil'
                                    },
                                    {
                                        xtype: 'panel',
                                        layout: 'hbox',
                                        border: false,
                                        bodyStyle: 'background: #E6EFF5;',
                                        defaults: {
                                            xtype: 'textfield',
                                            labelStyle: 'font-weight: bold; font-size: 11px;',
                                            style: 'margin: 1px',
                                            readOnly: true
                                        },
                                        items: [
                                            {
                                                xtype: 'label',
                                                text: 'Header',
                                                style: 'font-weight: bold; font-size: 11px; margin-top: 4px',
                                                width: 45
                                            },
                                            {
                                                fieldLabel: 'Crt By:',
                                                id: me.id + '-lblUCreaH',
                                                labelWidth: 40,
                                                flex: 1
                                            },
                                            {
                                                hideLabel: false,
                                                id: me.id + '-lblFCreaH',
                                                width: 70
                                            },
                                            {
                                                fieldLabel: 'Upd by',
                                                id: me.id + '-lblUModiH',
                                                labelWidth: 50,
                                                flex: 1
                                            },
                                            {
                                                fieldLabel: 'Prorate:',
                                                id: me.id + '-lblUCreaD',
                                                labelWidth: 50,
                                                flex: 1
                                            },
                                            {
                                                hideLabel: false,
                                                id: me.id + '-lblFCreaD',
                                                width: 70
                                            },
                                            {
                                                fieldLabel: 'Upd by',
                                                id: me.id + '-lblUModiD',
                                                labelWidth: 50,
                                                flex: 1
                                            },
                                            {
                                                hideLabel: false,
                                                id: me.id + '-lblFModiD',
                                                width: 70
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'panel',
                                border: false,
                                defaults: {
                                    bodyStyle: 'background: #E6EFF5;',
                                    border: false
                                },
                                items: [
                                    {
                                        xtype: 'panel',
                                        layout: 'hbox',
                                        defaults: {
                                            style: 'margin: 5px 5px 1px 5px;',
                                            xtype: 'button',
                                            cls: 'x-btn-sent',
                                            overCls: 'x-btn-sent-over'
                                        },
                                        items: [
                                            {
                                                text: '<span style="color: white; font-weight: bold;">Delivery</span>',
                                                id: me.id + '-btnDelivery',
                                                listeners: {
                                                    click: me.onBtnDeliveryClick
                                                }
                                            },
                                            {
                                                text: '<span style="color: white; font-weight: bold;">Grid Columns</span>',
                                                id: me.id + '-btnColumns',
                                                listeners: {
                                                    click: me.onBtnColumnsClick
                                                }
                                            },
                                            {
                                                text: '<span style="color: white; font-weight: bold;">Prorate Ticket</span>',
                                                id: me.id + '-btnProrate',
                                                hidden: true,
                                                listeners: {
                                                    //click: me.events.onBtnProrateTicketClick
                                                    click: me.onBtnProrateTicketClick
                                                }
                                            },
                                            {
                                                xtype: 'panel',
                                                layout: 'hbox',
                                                border: false,
                                                bodyStyle: 'background: #E6EFF5;',
                                                items: [
                                                    {
                                                        xtype: 'button',
                                                        id: me.id + '-picSave',
                                                        iconCls: 'images save',
                                                        hidden: true,
                                                        tooltip: '',
                                                        listeners: {
                                                            click: me.onBtnSaveClick
                                                        }
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        id: me.id + '-picBack',
                                                        iconCls: 'images prev',
                                                        tooltip: '',
                                                        style: 'margin-left: 5px;',
                                                        listeners: {
                                                            click: ''
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'panel',
                                        layout: 'hbox',
                                        defaults: {
                                            style: 'margin: 5px 5px 1px 5px;',
                                            xtype: 'button',
                                            cls: 'x-btn-sent',
                                            overCls: 'x-btn-sent-over'
                                        },
                                        items: [
                                            {
                                                text: '<span style="color: white; font-weight: bold;">Save</span>',
                                                id: me.id + '-btnSave',
                                                hidden: true,
                                                listeners: {
                                                    click: 'onTicketBtnClick'
                                                }
                                            },
                                            {
                                                text: '<span style="color: white; font-weight: bold;">Clear Record</span>',
                                                id: me.id + '-btnClear',
                                                hidden: true,
                                                listeners: {
                                                    click: 'onTicketBtnClick'
                                                }
                                            },
                                            {
                                                text: '<span style="color: white; font-weight: bold;">Debit Memo</span>',
                                                id: me.id + '-btnADM',
                                                hidden: true,
                                                listeners: {
                                                    click: me.events.onBtnProrateTicketClick
                                                }
                                            },
                                            {
                                                text: '<span style="color: white; font-weight: bold;">Add ticket</span>',
                                                id: me.id + '-btnAddTkt',
                                                hidden: true,
                                                listeners: {
                                                    click: me.events.onBtnProrateTicketClick
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'panel',
                                        width: 485,
                                        defaults: {
                                            bodyStyle: 'background: #E6EFF5;',
                                            border: false,
                                            style: 'margin: 2px'
                                        },
                                        items: [
                                            {
                                                xtype: 'panel',
                                                layout: 'hbox',
                                                items: [
                                                    {
                                                        xtype: 'textfield',
                                                        fieldLabel: 'Status',
                                                        id: me.id + '-lblStatus',
                                                        labelWidth: 40,
                                                        width: 150,
                                                        readOnly: true
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'panel',
                                                id: me.id + '-panelDynamic',
                                                hidden: true,
                                                layout: 'vbox',
                                                width: 485,
                                                defaults: {
                                                    bodyStyle: 'background: #E6EFF5;',
                                                    border: false,
                                                    style: 'margin: 2px'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'panel',
                                                        layout: 'hbox',
                                                        defaults: {
                                                            style: 'margin: 5px 5px 1px 5px;',
                                                            xtype: 'button',
                                                            cls: 'x-btn-sent',
                                                            overCls: 'x-btn-sent-over'
                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'panel',
                                                                border: false,
                                                                width: 200
                                                            },
                                                            {
                                                                text: '<span style="color: white; font-weight: bold;">Update Grid</span>',
                                                                id: me.id + '-btnSaveGrid',
                                                                listeners: {
                                                                    click: 'onTicketBtnClick'
                                                                }
                                                            },
                                                            {
                                                                text: '<span style="color: white; font-weight: bold;">Send and Prorate</span>',
                                                                id: me.id + '-btnEnviaValues',
                                                                listeners: {
                                                                    click: 'onTicketBtnClick'
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'panel',
                                                        layout: 'hbox',
                                                        width: 485,
                                                        items: [
                                                            {
                                                                xtype: 'grid',
                                                                height: 120,
                                                                flex: 1,
                                                                columns: {
                                                                    items: [
                                                                        {text: '<span style="font-size: 10px;">Air</span>', dataIndex: 'Air', width: 30},
                                                                        {text: '<span style="font-size: 10px;">Document</span>', dataIndex: 'Document', flex: 1},
                                                                        {text: '<span style="font-size: 10px;">Coupons</span>', dataIndex: 'Coupons', flex: 1},
                                                                        {text: '<span style="font-size: 10px;">CNJ</span>', dataIndex: 'CNJ', width: 35},
                                                                        {text: '<span style="font-size: 10px;">Curr</span>', dataIndex: 'Curr', width: 35},
                                                                        {text: '<span style="font-size: 10px;">Total Values</span>', dataIndex: 'Total', flex: 1},
                                                                        {text: '<span style="font-size: 10px;">Comm</span>', dataIndex: 'Comm', width: 45},
                                                                        {text: '<span style="font-size: 10px;">Over</br>Comm</span>', dataIndex: 'Over', width: 45},
                                                                        {text: '<span style="font-size: 10px;">Edit</span>', dataIndex: '', width: 35}
                                                                    ],
                                                                    defaults: {
                                                                        menuDisabled: true,
                                                                        align: 'center'
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'panel',
                                                        layout: {
                                                            type: 'table',
                                                            columns: 9
                                                        },
                                                        defaults: {
                                                            style: 'font-size: 11px; font-weight: bold; color: #0B333C; margin: 1px;',
                                                            xtype: 'textfield',
                                                            hideLabel: true,
                                                            width: 70,
                                                            readOnly: true
                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'box',
                                                                html: 'ADC:',
                                                                width: 30
                                                            },
                                                            {
                                                                id: me.id + '-txtCurTarifLANEx',
                                                                width: 35
                                                            },
                                                            {
                                                                id: me.id + '-txtTarifLANEx'
                                                            },
                                                            {
                                                                xtype: 'box',
                                                                html: 'Totals:',
                                                                width: 40
                                                            },
                                                            {
                                                                id: me.id + '-txtTotCurEx',
                                                                width: 35
                                                            },
                                                            {
                                                                id: me.id + '-txtTotValEx'
                                                            },
                                                            {
                                                                xtype: 'box',
                                                                html: 'Final Value:',
                                                                width: 70
                                                            },
                                                            {
                                                                id: me.id + '-txtCurFinalValue',
                                                                width: 35
                                                            },
                                                            {
                                                                id: me.id + '-txtFinalValue'
                                                            },

                                                            // -------------------

                                                            {
                                                                xtype: 'box',
                                                                html: '',
                                                                width: 30
                                                            },
                                                            {
                                                                id: me.id + '-txtCurTarifLANExConv',
                                                                width: 35
                                                            },
                                                            {
                                                                id: me.id + '-txtTarifLANExConv'
                                                            },
                                                            {
                                                                xtype: 'box',
                                                                html: '',
                                                                width: 40
                                                            },
                                                            {
                                                                id: me.id + '-txtTotCurExConv',
                                                                width: 35
                                                            },
                                                            {
                                                                id: me.id + '-txtTotValExConv'
                                                            },
                                                            {
                                                                xtype: 'box',
                                                                html: '',
                                                                width: 70
                                                            },
                                                            {
                                                                id: me.id + '-txtCurFinalValueExConv',
                                                                width: 35
                                                            },
                                                            {
                                                                id: me.id + '-txtFinalValueExConv'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'panel',
                                                        layout: {
                                                            type: 'table',
                                                            columns: 8
                                                        },
                                                        defaults: {
                                                            style: 'font-size: 11px; font-weight: bold; color: #0B333C; margin: 1px;',
                                                            xtype: 'textfield',
                                                            hideLabel: true,
                                                            width: 70,
                                                            readOnly: true
                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'box',
                                                                colspan: 2,
                                                                html: 'Comm:',
                                                                width: 118
                                                            },
                                                            {
                                                                xtype: 'box',
                                                                colspan: 2,
                                                                html: 'Over Comm:',
                                                                width: 118
                                                            },
                                                            {
                                                                xtype: 'box',
                                                                colspan: 2,
                                                                html: 'YQ:',
                                                                width: 118
                                                            },
                                                            {
                                                                xtype: 'box',
                                                                colspan: 2,
                                                                html: 'IVA:',
                                                                width: 118
                                                            },

                                                            // -------------

                                                            {
                                                                id: me.id + '-txtTotCurOriComRv',
                                                                width: 35
                                                            },
                                                            {
                                                                id: me.id + '-txtTotValOriComRv',
                                                                flex: 1
                                                            },
                                                            {
                                                                id: me.id + '-txtTotCurOriScmRv',
                                                                width: 35
                                                            },
                                                            {
                                                                id: me.id + '-txtTotValOriScmRv',
                                                                flex: 1
                                                            },
                                                            {
                                                                id: me.id + '-txtTotCurOriYQRv',
                                                                width: 35
                                                            },
                                                            {
                                                                id: me.id + '-txtTotValOriYQRv',
                                                                flex: 1
                                                            },
                                                            {
                                                                id: me.id + '-txtTotCurOriIVARv',
                                                                width: 35
                                                            },
                                                            {
                                                                id: me.id + '-txtTotValOriIVARv',
                                                                flex: 1
                                                            },

                                                            // -------------

                                                            {
                                                                id: me.id + '-txtTotCurOriCom',
                                                                width: 35
                                                            },
                                                            {
                                                                id: me.id + '-txtTotValOriCom',
                                                                flex: 1
                                                            },
                                                            {
                                                                id: me.id + '-txtTotCurOriScm',
                                                                width: 35
                                                            },
                                                            {
                                                                id: me.id + '-txtTotValOriScm',
                                                                flex: 1
                                                            },
                                                            {
                                                                id: me.id + '-txtTotCurOriYQ',
                                                                width: 35
                                                            },
                                                            {
                                                                id: me.id + '-txtTotValOriYQ',
                                                                flex: 1
                                                            },
                                                            {
                                                                id: me.id + '-txtTotCurOriIVA',
                                                                width: 35
                                                            },
                                                            {
                                                                id: me.id + '-txtTotValOriIVA',
                                                                flex: 1
                                                            }

                                                        ]
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        defaults: {
                            bodyStyle: 'background: #E6EFF5;',
                            border: false,
                            style: 'margin: 1px;'
                        },
                        items: [
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'label',
                                        text: 'SALE TICKET'
                                    }
                                ]
                            },
                            {
                                xtype: 'panel',
                                layout: {
                                    type: 'table',
                                    columns: 8 //7
                                },
                                defaults: {
                                    bodyStyle: 'background: #E6EFF5;',
                                    border: false
                                },
                                items: [
                                    {
                                        xtype: 'panel',
                                        layout: {
                                            type: 'table',
                                            columns: 4
                                        },
                                        defaults: {
                                            style: 'font-weight: bold; font-size: 11px;',
                                            xtype: 'textfield',
                                            width: 35,
                                            hideLabel: true,
                                            readOnly: true
                                        },
                                        items: [
                                            {
                                                xtype: 'box',
                                                html: 'Group:',
                                                width: 60
                                            },
                                            {
                                                id: me.id + '-txtGrupo',
                                                width: 70,
                                                colspan: 3
                                            },

                                            // -------------

                                            {
                                                xtype: 'box',
                                                html: 'FARE:',
                                                width: 60
                                            },
                                            {
                                                id: me.id + '-txtTarifa',
                                                width: 70
                                            },
                                            {
                                                id: me.id + '-txtCurTarifa',
                                                width: 35
                                            },
                                            {
                                                xtype: 'box',
                                                html: ''
                                            },

                                            // // -------------

                                            {
                                                xtype: 'box',
                                                html: 'EQV Fare:',
                                                width: 60
                                            },
                                            {
                                                id: me.id + '-txtTarifEqv',
                                                width: 70
                                            },
                                            {
                                                id: me.id + '-txtCurTarifEqv',
                                                width: 35
                                            },
                                            {
                                                xtype: 'box',
                                                html: ''
                                            },

                                            // // -------------

                                            {
                                                xtype: 'box',
                                                html: 'Comm:',
                                                width: 60
                                            },
                                            {
                                                id: me.id + '-txtCommission',
                                                width: 105,
                                                colspan: 2
                                            },
                                            {
                                                id: me.id + '-txtCurComm',
                                                width: 35
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'panel',
                                        layout: {
                                            type: 'table',
                                            columns: 5
                                        },
                                        defaults: {
                                            style: 'font-weight: bold; font-size: 11px; margin: 1px',
                                            xtype: 'textfield',
                                            width: 35,
                                            hideLabel: true,
                                            readOnly: true
                                        },
                                        items: [
                                            {
                                                xtype: 'box',
                                                html: 'Ticket:',
                                                width: 70
                                            },
                                            {
                                                id: me.id + '-txtCia',
                                                width: 35
                                            },
                                            {
                                                id: me.id + '-txtForma',
                                                width: 35
                                            },
                                            {
                                                id: me.id + '-txtSerie',
                                                width: 55
                                            },
                                            {
                                                xtype: 'box',
                                                html: '',
                                                width: 10
                                            },

                                            // -------

                                            {
                                                xtype: 'box',
                                                html: 'NUC:',
                                                width: 70
                                            },
                                            {
                                                id: me.id + '-txtTotalNUC',
                                                width: 70,
                                                colspan: 2
                                            },
                                            {
                                                xtype: 'box',
                                                html: ''
                                            },
                                            {
                                                xtype: 'box',
                                                html: '',
                                                width: 10
                                            },

                                            // -------

                                            {
                                                xtype: 'box',
                                                html: 'ROE:',
                                                width: 70
                                            },
                                            {
                                                id: me.id + '-txtRoe',
                                                width: 95,
                                                colspan: 3
                                            },
                                            {
                                                xtype: 'box',
                                                html: '',
                                                width: 10
                                            },

                                            // -------

                                            {
                                                xtype: 'box',
                                                html: 'Dsc Comm:',
                                                width: 70
                                            },
                                            {
                                                id: me.id + '-txtDsctoComis',
                                                width: 50,
                                                colspan: 2
                                            },
                                            {
                                                xtype: 'box',
                                                html: ''
                                            },
                                            {
                                                xtype: 'box',
                                                html: '',
                                                width: 10
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'panel',
                                        layout: {
                                            type: 'table',
                                            columns: 4
                                        },
                                        defaults: {
                                            style: 'font-weight: bold; font-size: 11px; margin: 1px',
                                            xtype: 'textfield',
                                            width: 35,
                                            hideLabel: true,
                                            readOnly: true
                                        },
                                        items: [
                                            {
                                                xtype: 'box',
                                                html: 'Cnj:',
                                                width: 90
                                            },
                                            {
                                                id: me.id + '-txtCnj',
                                                width: 35
                                            },
                                            {
                                                xtype: 'box',
                                                html: ''
                                            },
                                            {
                                                xtype: 'box',
                                                html: ''
                                            },

                                            // --------------

                                            {
                                                xtype: 'box',
                                                html: 'Fare:',
                                                width: 90
                                            },
                                            {
                                                id: me.id + '-txtTarifUSD',
                                                width: 70,
                                                colspan: 2
                                            },
                                            {
                                                id: me.id + '-txtTarifCurr',
                                                width: 35
                                            },

                                            // --------------

                                            {
                                                xtype: 'box',
                                                html: 'Sale Exch Rate:',
                                                width: 90
                                            },
                                            {
                                                id: me.id + '-txtBSR',
                                                width: 90,
                                                colspan: 3
                                            },

                                            // --------------

                                            {
                                                xtype: 'box',
                                                html: 'Adjust:',
                                                width: 90
                                            },
                                            {
                                                id: me.id + '-txtTAjust',
                                                width: 70,
                                                colspan: 2
                                            },
                                            {
                                                xtype: 'box',
                                                html: ''
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'panel',
                                        layout: {
                                            type: 'table',
                                            columns: 3
                                        },
                                        defaults: {
                                            style: 'font-weight: bold; font-size: 11px;margin: 1px',
                                            xtype: 'textfield',
                                            width: 35,
                                            hideLabel: true,
                                            readOnly: true
                                        },
                                        items: [
                                            {
                                                xtype: 'box',
                                                html: '',
                                                colspan: 3,
                                                height: 20
                                            },

                                            // // -------------

                                            {
                                                xtype: 'box',
                                                html: 'Fare COBL:',
                                                width: 75
                                            },
                                            {
                                                id: me.id + '-txtCurTarifLAN',
                                                width: 35
                                            },
                                            {
                                                id: me.id + '-txtTarifLAN',
                                                width: 70
                                            },

                                            // // -------------

                                            {
                                                xtype: 'box',
                                                html: 'Base Fare:',
                                                width: 75
                                            },
                                            {
                                                id: me.id + '-txtCurEqvPag',
                                                width: 35
                                            },
                                            {
                                                id: me.id + '-txtEqvPag',
                                                width: 70
                                            },

                                            // // -------------

                                            {
                                                xtype: 'box',
                                                html: 'AdjustQ:',
                                                width: 75
                                            },
                                            {
                                                id: me.id + '-txtTAjustQ',
                                                width: 105,
                                                colspan: 2
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'panel',
                                        layout: {
                                            type: 'table',
                                            columns: 3
                                        },
                                        defaults: {
                                            style: 'font-weight: bold; font-size: 11px; margin: 1px',
                                            xtype: 'textfield',
                                            width: 35,
                                            hideLabel: true,
                                            readOnly: true
                                        },
                                        items: [
                                            {
                                                xtype: 'box',
                                                html: 'Sale Date:',
                                                width: 60
                                            },
                                            {
                                                id: me.id + '-txtFecVta',
                                                width: 70,
                                                colspan: 2
                                            },

                                            // // -------------

                                            {
                                                xtype: 'box',
                                                html: 'Sale City:',
                                                width: 60
                                            },
                                            {
                                                id: me.id + '-txtCityVta',
                                                width: 35
                                            },
                                            {
                                                id: me.id + '-txtCtryVta',
                                                width: 35
                                            },

                                            // // -------------

                                            {
                                                xtype: 'box',
                                                html: 'Cur.Reg:',
                                                width: 60
                                            },
                                            {
                                                id: me.id + '-txtMonReg',
                                                width: 35
                                            },
                                            {
                                                xtype: 'box',
                                                html: ''
                                            },

                                            // // -------------

                                            {
                                                xtype: 'box',
                                                html: 'Plus:',
                                                width: 60
                                            },
                                            {
                                                id: me.id + '-txtPlus',
                                                width: 35
                                            },
                                            {
                                                xtype: 'box',
                                                html: ''
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'panel',
                                        layout: {
                                            type: 'table',
                                            columns: 4
                                        },
                                        defaults: {
                                            style: 'font-weight: bold; font-size: 11px; margin: 1px;',
                                            xtype: 'textfield',
                                            width: 35,
                                            hideLabel: true,
                                            readOnly: true
                                        },
                                        items: [
                                            {
                                                xtype: 'box',
                                                html: 'Method:',
                                                width: 50
                                            },
                                            {
                                                id: me.id + '-txtMetodo',
                                                width: 35
                                            },
                                            {
                                                id: me.id + '-txtTipoMetodo',
                                                width: 35
                                            },
                                            {
                                                xtype: 'box',
                                                html: ''
                                            },

                                            // // -------------

                                            {
                                                xtype: 'box',
                                                html: 'Issue:',
                                                width: 50
                                            },
                                            {
                                                id: me.id + '-txtCityEmision',
                                                width: 35
                                            },
                                            {
                                                id: me.id + '-txtCtryEmision',
                                                width: 35
                                            },
                                            {
                                                xtype: 'box',
                                                html: ''
                                            },

                                            // // -------------

                                            {
                                                xtype: 'box',
                                                html: 'Cur.Sys:',
                                                width: 50
                                            },
                                            {
                                                id: me.id + '-txtMonSys',
                                                width: 35
                                            },
                                            {
                                                xtype: 'box',
                                                html: ''
                                            },
                                            {
                                                xtype: 'box',
                                                html: ''
                                            },

                                            // // -------------

                                            {
                                                xtype: 'box',
                                                html: 'S.Over:',
                                                width: 50
                                            },
                                            {
                                                id: me.id + '-txtStOver',
                                                width: 70,
                                                colspan: 2
                                            },
                                            {
                                                id: me.id + '-txtCantStOver',
                                                width: 35
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'panel',
                                        layout: {
                                            type: 'table',
                                            columns: 1
                                        },
                                        defaults: {
                                            bodyStyle: 'background: #E6EFF5;',
                                            border: false
                                        },
                                        items: [
                                            {
                                                xtype: 'panel',
                                                layout: {
                                                    type: 'table',
                                                    columns: 2
                                                },
                                                defaults: {
                                                    style: 'font-weight: bold; font-size: 11px; margin: 1px;',
                                                    xtype: 'textfield',
                                                    width: 35,
                                                    hideLabel: true,
                                                    readOnly: true
                                                },
                                                items: [
                                                    {
                                                        xtype: 'box',
                                                        id: me.id + '-lblCodAgente',
                                                        html: 'Agent:',
                                                        width: 40
                                                    },
                                                    {
                                                        id: me.id + '-txtCodAgente',
                                                        width: 60
                                                    },
                                                    {
                                                        xtype: 'box',
                                                        html: 'Link:',
                                                        width: 40
                                                    },
                                                    {
                                                        id: me.id + '-txtLink',
                                                        width: 60
                                                    },
                                                    {
                                                        xtype: 'box',
                                                        html: 'Initial Trip:',
                                                        width: 70
                                                    },
                                                    {
                                                        id: me.id + '-txtIniTrip',
                                                        width: 40
                                                    },
                                                    {
                                                        xtype: 'box',
                                                        html: 'IT:',
                                                        width: 70
                                                    },
                                                    {
                                                        id: me.id + '-txtIT',
                                                        width: 90,
                                                        colspan: 3
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'panel',
                                        layout: {
                                            type: 'table',
                                            columns: 1
                                        },
                                        defaults: {
                                            bodyStyle: 'background: #E6EFF5;',
                                            border: false
                                        },
                                        items: [
                                            {
                                                xtype: 'panel',
                                                layout: {
                                                    type: 'table',
                                                    columns: 2
                                                },
                                                defaults: {
                                                    style: 'font-weight: bold; font-size: 11px; margin: 1px;',
                                                    xtype: 'textfield',
                                                    width: 35,
                                                    hideLabel: true,
                                                    readOnly: true
                                                },
                                                items: [
                                                    {
                                                        xtype: 'box',
                                                        id: me.id + '-lblSRC',
                                                        html: 'SRC:',
                                                        width: 40
                                                    },
                                                    {
                                                        id: me.id + '-txtOriVta',
                                                        width: 50
                                                    },
                                                    {
                                                        xtype: 'box',
                                                        id: me.id + '-lblAjtORF',
                                                        html: 'AjtFare:',
                                                        width: 70
                                                    },
                                                    {
                                                        id: me.id + '-txtAjtORF',
                                                        width: 50
                                                    },
                                                    {
                                                        xtype: 'box',
                                                        id: me.id + '-lblInvol',
                                                        html: 'Involuntary:',
                                                        width: 70
                                                    },
                                                    {
                                                        id: me.id + '-txtInvol',
                                                        width: 50
                                                    },
                                                    {
                                                        xtype: 'box',
                                                        html: '',
                                                        height: 22
                                                    },
                                                    {
                                                        xtype: 'box',
                                                        html: '',
                                                        height: 22
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                    /*{
                                     xtype: 'panel',
                                     layout: {
                                     type: 'table',
                                     columns: 5
                                     },
                                     defaults: {
                                     style: 'font-weight: bold; font-size: 11px; margin: 1px;',
                                     xtype: 'textfield',
                                     width: 35,
                                     hideLabel: true,
                                     readOnly: true
                                     },
                                     items: [
                                     {
                                     xtype: 'box',
                                     html: 'Agent:',
                                     width: 40
                                     },
                                     {
                                     id: me.id + '-txtCodAgente',
                                     width: 50
                                     },
                                     {
                                     xtype: 'box',
                                     id: me.id + '-lblSRC',
                                     html: 'SRC:',
                                     width: 70
                                     },
                                     {
                                     id: me.id + '-txtOriVta',
                                     width: 50,
                                     colspan: 2
                                     },
                                     
                                     // ------
                                     
                                     {
                                     xtype: 'box',
                                     html: 'Link:',
                                     width: 40
                                     },
                                     {
                                     id: me.id + '-txtLink',
                                     width: 50
                                     },
                                     {
                                     xtype: 'box',
                                     html: 'AjtFare:',
                                     width: 70
                                     },
                                     {
                                     id: me.id + '-txtAjtORF',
                                     width: 50,
                                     colspan: 2
                                     },
                                     
                                     // ------
                                     
                                     {
                                     xtype: 'box',
                                     html: 'Initial Trip:',
                                     width: 70
                                     },
                                     {
                                     id: me.id + '-txtIniTrip',
                                     width: 40
                                     },
                                     {
                                     xtype: 'box',
                                     html: 'Involuntary:',
                                     width: 70
                                     },
                                     {
                                     id: me.id + '-txtInvol',
                                     width: 50,
                                     colspan: 2
                                     },
                                     
                                     // ------
                                     
                                     {
                                     xtype: 'box',
                                     html: 'IT:',
                                     width: 70
                                     },
                                     {
                                     id: me.id + '-txtIT',
                                     width: 90,
                                     colspan: 3
                                     }
                                     ]
                                     }*/
                                ]
                            },
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                width: '100%',
                                bodyStyle: 'background:#69899b;',
                                height: 5
                            },
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'label',
                                        id: me.id + '-lblError',
                                        style: 'background:orange;font-weight: bold; font-size: 11px;margin-top:4px;;margin-bottom:4px;',
                                        text: '',
                                        height: 16
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'grid',
                                id: me.id + '-DgView',
                                height: 130,
                                flex: 1,
                                plugins: {
                                    cellediting: {
                                        clicksToEdit: 1
                                    }
                                },
                                columns: {
                                    items: [
                                        {text: '<span style="font-size: 10px;">Ticket</span>', dataIndex: 'TICKET', width: 100},
                                        {text: '<span style="font-size: 10px;">Cpn</span>', dataIndex: 'A713CUPON', flex: 1},
                                        {text: '<span style="font-size: 10px;">O</span>', dataIndex: 'A713CONEX1', flex: 1, editor: {
                                                completeOnEnter: false,
                                                field: {
                                                    xtype: 'textfield',
                                                    maxLength: 1, enforceMaxLength: 1,
                                                    maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                                    listeners: {
                                                        change: me.onchange
                                                    }
                                                }
                                            }},
                                        {text: '<span style="font-size: 10px;">From</span>', dataIndex: 'A713RUTA0', flex: 1, editor: {
                                                completeOnEnter: false,
                                                field: {
                                                    xtype: 'textfield',
                                                    maxLength: 3, enforceMaxLength: 3,
                                                    maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                                    listeners: {
                                                        change: me.onchange
                                                    }
                                                }
                                            }},
                                        {text: '<span style="font-size: 10px;">To</span>', dataIndex: 'A713RUTA1', flex: 1, editor: {
                                                completeOnEnter: false,
                                                field: {
                                                    xtype: 'textfield',
                                                    maxLength: 3, enforceMaxLength: 3,
                                                    maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                                    listeners: {
                                                        change: me.onchange
                                                    }
                                                }
                                            }},
                                        {text: '<span style="font-size: 10px;">Cr</span>', dataIndex: 'A713CARRA1', flex: 1, editor: {
                                                completeOnEnter: false,
                                                field: {
                                                    xtype: 'textfield',
                                                    maxLength: 2, enforceMaxLength: 2,
                                                    maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                                    listeners: {
                                                        change: me.onchange
                                                    }
                                                }
                                            }},
                                        {text: '<span style="font-size: 10px;">Flt</span>', dataIndex: 'A713NVLO1', flex: 1, editor: {
                                                completeOnEnter: false,
                                                field: {
                                                    xtype: 'textfield',
                                                    maxLength: 5, enforceMaxLength: 5,
                                                    maskRe: /[0-9]/,
                                                    listeners: {
                                                        change: me.onchange
                                                    }
                                                }
                                            }},
                                        {text: '<span style="font-size: 10px;">Date</span>', dataIndex: 'A713FVLO1', width: 80, editor: {
                                                completeOnEnter: false,
                                                field: {
                                                    xtype: 'textfield',
                                                    maxLength: 8, enforceMaxLength: 8,
                                                    maskRe: /[0-9]/, format: 'Ymd',
                                                    listeners: {
                                                        change: me.onchange
                                                    }
                                                }
                                            }},
                                        {text: '<span style="font-size: 10px;">RBD</span>', dataIndex: 'A713BOOKI1', flex: 1, editor: {
                                                completeOnEnter: false,
                                                field: {
                                                    xtype: 'textfield',
                                                    maxLength: 1, enforceMaxLength: 1,
                                                    maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                                    listeners: {
                                                        change: me.onchange
                                                    }
                                                }
                                            }},
                                        {text: '<span style="font-size: 10px;">Cabin</span>', dataIndex: 'A713CLASE1', width: 50, editor: {
                                                completeOnEnter: false,
                                                field: {
                                                    xtype: 'textfield',
                                                    maxLength: 1, enforceMaxLength: 1,
                                                    maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                                    listeners: {
                                                        change: me.onchange
                                                    }
                                                }
                                            }},
                                        {text: '<span style="font-size: 10px;">F.Basis</span>', dataIndex: 'A713FBUSO1', width: 80, editor: {
                                                completeOnEnter: false,
                                                field: {
                                                    xtype: 'textfield',
                                                    maxLength: 15, enforceMaxLength: 15,
                                                    maskRe: /[A-Z,a-z,Ñ,ñ,0-9]/,
                                                    listeners: {
                                                        change: me.onchange
                                                    }
                                                }
                                            }},
                                        {text: '<span style="font-size: 10px;">LH</span>', dataIndex: 'A713LOHO1', flex: 1, editor: {
                                                completeOnEnter: false,
                                                field: {
                                                    xtype: 'textfield',
                                                    maxLength: 1, enforceMaxLength: 1,
                                                    maskRe: /[A-Z,a-z,Ñ,ñ,0-9]/,
                                                    listeners: {
                                                        change: me.onchange
                                                    }
                                                }
                                            }},
                                        {text: '<span style="font-size: 10px;">Cb</span>', dataIndex: 'A713CB', flex: 1, editor: {
                                                completeOnEnter: false,
                                                field: {
                                                    xtype: 'textfield',
                                                    maxLength: 1, enforceMaxLength: 1,
                                                    maskRe: /[A-Z,a-z,Ñ,ñ,0-9]/,
                                                    listeners: {
                                                        change: me.onchange
                                                    }
                                                }
                                            }},
                                        {text: '<span style="font-size: 10px;">T</span>', dataIndex: 'A713TBASE1', flex: 1, editor: {
                                                completeOnEnter: false,
                                                field: {
                                                    xtype: 'textfield',
                                                    maxLength: 1, enforceMaxLength: 1,
                                                    maskRe: /[A-Z,a-z,Ñ,ñ,0-9]/,
                                                    listeners: {
                                                        change: me.onchange
                                                    }
                                                }
                                            }},
                                        {text: '<span style="font-size: 10px;">St FB</span>', dataIndex: 'A713STBAS1', flex: 1, editor: {
                                                completeOnEnter: false,
                                                field: {
                                                    xtype: 'textfield',
                                                    maxLength: 2, enforceMaxLength: 2,
                                                    maskRe: /[A-Z,a-z,Ñ,ñ,0-9]/,
                                                    listeners: {
                                                        change: me.onchange
                                                    }
                                                }
                                            }},
                                        {text: '<span style="font-size: 10px;">Vt</span>', dataIndex: 'A713VT', flex: 1, editor: {
                                                completeOnEnter: false,
                                                field: {
                                                    xtype: 'textfield',
                                                    maxLength: 1, enforceMaxLength: 1,
                                                    maskRe: /[A-Z,a-z,Ñ,ñ,0-9]/,
                                                    listeners: {
                                                        change: me.onchange
                                                    }
                                                }
                                            }},
                                        {text: '<span style="font-size: 10px;">Code</span>', dataIndex: 'A713TDESC1', flex: 1, editor: {
                                                completeOnEnter: false,
                                                field: {
                                                    xtype: 'textfield',
                                                    maxLength: 2, enforceMaxLength: 2,
                                                    maskRe: /[A-Z,a-z,Ñ,ñ,0-9]/,
                                                    listeners: {
                                                        change: me.onchange
                                                    }
                                                }
                                            }},
                                        {text: '<span style="font-size: 10px;">Dsct</span>', dataIndex: 'A713PORDS1', width: 60, editor: {
                                                completeOnEnter: false,
                                                field: {
                                                    xtype: 'textfield',
                                                    maxLength: 6, enforceMaxLength: 6,
                                                    maskRe: /[0-9]/,
                                                    listeners: {
                                                        change: me.onchange
                                                    }
                                                }
                                            }},
                                        {text: '<span style="font-size: 10px;">GI</span>', dataIndex: 'A713VIA1', flex: 1, editor: {
                                                completeOnEnter: false,
                                                field: {
                                                    xtype: 'textfield',
                                                    maxLength: 2, enforceMaxLength: 2,
                                                    maskRe: /[A-Z,a-z,Ñ,ñ,0-9]/,
                                                    listeners: {
                                                        change: me.onchange
                                                    }
                                                }
                                            }},
                                        {text: '<span style="font-size: 10px;">Fare</span>', dataIndex: 'A713FARE1', width: 50,
                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                /*var data = record.data;
                                                 var color = data.esSector === 'todo' ? '#2BC224' : '#244066';
                                                 metaData.style = "text-align:right;color:"+color+";";*/
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }, editor: {
                                                completeOnEnter: false,
                                                field: {
                                                    xtype: 'textfield',
                                                    maxLength: 9, enforceMaxLength: 9,
                                                    maskRe: /[0-9]/,
                                                    listeners: {
                                                        change: me.onchange
                                                    }
                                                }
                                            }
                                        },
                                        {text: '<span style="font-size: 10px;">ST</span>', dataIndex: 'A713TFARE1', flex: 1, editor: {
                                                completeOnEnter: false,
                                                field: {
                                                    xtype: 'textfield',
                                                    maxLength: 1, enforceMaxLength: 1,
                                                    maskRe: /[A-Z,a-z,Ñ,ñ,0-9]/,
                                                    listeners: {
                                                        change: me.onchange
                                                    }
                                                }
                                            }},
                                        {text: '<span style="font-size: 10px;">Q</span>', dataIndex: 'A713SS1', width: 50,
                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }, editor: {
                                                completeOnEnter: false,
                                                field: {
                                                    xtype: 'textfield',
                                                    maxLength: 6, enforceMaxLength: 6,
                                                    maskRe: /[0-9]/,
                                                    listeners: {
                                                        change: me.onchange
                                                    }
                                                }
                                            }
                                        },
                                        {text: '<span style="font-size: 10px;">Diferencial</span>', dataIndex: 'A713DIFER1', width: 80, editor: {
                                                completeOnEnter: false,
                                                field: {
                                                    xtype: 'textfield',
                                                    maxLength: 9, enforceMaxLength: 9,
                                                    maskRe: /[0-9]/,
                                                    listeners: {
                                                        change: me.onchange
                                                    }
                                                }
                                            }},
                                        {text: '<span style="font-size: 10px;">Flag Difer</span>', dataIndex: 'A713FDIFE1', width: 80, editor: {
                                                completeOnEnter: false,
                                                field: {
                                                    xtype: 'textfield',
                                                    maxLength: 1, enforceMaxLength: 1,
                                                    maskRe: /[A-Z,a-z,Ñ,ñ,0-9]/,
                                                    listeners: {
                                                        change: me.onchange
                                                    }
                                                }
                                            }},
                                        {text: '<span style="font-size: 10px;">Comp Fare</span>', dataIndex: 'A713CFARE1', width: 80, editor: {
                                                completeOnEnter: false,
                                                field: {
                                                    xtype: 'textfield',
                                                    maxLength: 1, enforceMaxLength: 1,
                                                    maskRe: /[A-Z,a-z,Ñ,ñ,0-9]/,
                                                    listeners: {
                                                        change: me.onchange
                                                    }
                                                }
                                            }},
                                        {text: '<span style="font-size: 10px;">Curr Tarif</span>', dataIndex: 'A713MNTFM1', width: 80, editor: {
                                                completeOnEnter: false,
                                                field: {
                                                    xtype: 'textfield',
                                                    maxLength: 3, enforceMaxLength: 3,
                                                    maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                                    listeners: {
                                                        change: me.onchange
                                                    }
                                                }
                                            }},
                                        {text: '<span style="font-size: 10px;">SRP</span>', dataIndex: 'A713VLSRP1', width: 50,
                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }, editor: {
                                                completeOnEnter: false,
                                                field: {
                                                    xtype: 'textfield',
                                                    maxLength: 10, enforceMaxLength: 10,
                                                    maskRe: /[0-9]/,
                                                    listeners: {
                                                        change: me.onchange
                                                    }
                                                }
                                            }
                                        },
                                        {text: '<span style="font-size: 10px;">MPA</span>', dataIndex: 'A713VLMPA1', width: 50,
                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }, editor: {
                                                completeOnEnter: false,
                                                field: {
                                                    xtype: 'textfield',
                                                    maxLength: 10, enforceMaxLength: 10,
                                                    maskRe: /[0-9]/,
                                                    listeners: {
                                                        change: me.onchange
                                                    }
                                                }
                                            }
                                        },
                                        {text: '<span style="font-size: 10px;">SPA</span>', dataIndex: 'A713ACUE1', width: 50,
                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }, editor: {
                                                completeOnEnter: false,
                                                field: {
                                                    xtype: 'textfield',
                                                    maxLength: 10, enforceMaxLength: 10,
                                                    maskRe: /[0-9]/,
                                                    listeners: {
                                                        change: me.onchange
                                                    }
                                                }
                                            }
                                        },
                                        {text: '<span style="font-size: 10px;">ISC</span>', dataIndex: 'A713ISC1', width: 50,
                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }, editor: {
                                                completeOnEnter: false,
                                                field: {
                                                    xtype: 'textfield',
                                                    maxLength: 2, enforceMaxLength: 2,
                                                    maskRe: /[0-9]/,
                                                    listeners: {
                                                        change: me.onchange
                                                    }
                                                }
                                            }
                                        },
                                        {text: '<span style="font-size: 10px;">Applied Value</span>', dataIndex: 'A713VALOR1', width: 80,
                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }
                                        },
                                        {text: '<span style="font-size: 10px;">Adjust</span>', dataIndex: 'A713AJUST1', width: 50,
                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }
                                        },
                                        {text: '<span style="font-size: 10px;">SPA Force</span>', dataIndex: 'A713ACUEO1', width: 80},
                                        {text: '<span style="font-size: 10px;">Q Surcharge</span>', dataIndex: 'A713QIN1', width: 80,
                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }, editor: {
                                                completeOnEnter: false,
                                                field: {
                                                    xtype: 'textfield',
                                                    maxLength: 10, enforceMaxLength: 10,
                                                    maskRe: /[0-9]/,
                                                    listeners: {
                                                        change: me.onchange
                                                    }
                                                }
                                            }
                                        },
                                        {text: '<span style="font-size: 10px;">Q Final</span>', dataIndex: 'A713Q1', width: 60,
                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }
                                        },
                                        {text: '<span style="font-size: 10px;">Factor</span>', dataIndex: 'A713FACT1', width: 60,
                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }
                                        },
                                        {text: '<span style="font-size: 10px;">% Proviso</span>', dataIndex: 'A713PPRO1', width: 80,
                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }
                                        },
                                        {text: '<span style="font-size: 10px;">Base Amount</span>', dataIndex: 'A713PROV1', width: 80,
                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }
                                        },
                                        {text: '<span style="font-size: 10px;">Loc Comm.</span>', dataIndex: 'A713LRRCM1', width: 80,
                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }
                                        },
                                        {text: '<span style="font-size: 10px;">Commission</span>', dataIndex: 'A713PRRCM1', width: 80,
                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }
                                        },
                                        {text: '<span style="font-size: 10px;">Loc Over Comm</span>', dataIndex: 'A713LRSCM1', width: 95,
                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }
                                        },
                                        {text: '<span style="font-size: 10px;">Over Comm</span>', dataIndex: 'A713PRSCM1', width: 80,
                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }
                                        },
                                        {text: '<span style="font-size: 10px;">Local Curr</span>', dataIndex: 'A713VALOL1', width: 80,
                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }
                                        },
                                        {text: '<span style="font-size: 10px;">Loc YQ</span>', dataIndex: 'A713LYQ1', width: 50,
                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }
                                        },
                                        {text: '<span style="font-size: 10px;">YQ</span>', dataIndex: 'A713YQ1', width: 50,
                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }
                                        },
                                        {text: '<span style="font-size: 10px;">Loc IVA</span>', dataIndex: 'A713LIV1', width: 50,
                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }
                                        },
                                        {text: '<span style="font-size: 10px;">IVA</span>', dataIndex: 'A713IV1', width: 50,
                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }
                                        },
                                        {text: '<span style="font-size: 10px;">% Commission</span>', dataIndex: 'A713COMPR', width: 90,
                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }
                                        },
                                        {text: '<span style="font-size: 10px;">Commission Value</span>', dataIndex: 'A713COM', width: 110,
                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }
                                        },
                                        {text: '<span style="font-size: 10px;">Proration Type</span>', dataIndex: 'A713INDPR1', width: 90},
                                        {text: '<span style="font-size: 10px;">Cr Ope</span>', dataIndex: 'A713COPE', width: 50},
                                        {text: '<span style="font-size: 10px;">Flt Ope</span>', dataIndex: 'A713FOPE', width: 50},
                                        {text: '<span style="font-size: 10px;">Hor Flt</span>', dataIndex: 'A713HVLO1', width: 50}
                                    ],
                                    defaults: {
                                        menuDisabled: true,
                                        align: 'center'
                                    }
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        border: false,
                        defaults: {
                            xtype: 'textfield',
                            labelStyle: 'font-weight: bold; font-size: 11px;',
                            readOnly: true,
                            style: 'margin: 1px'
                        },
                        items: [
                            {
                                xtype: 'label',
                                id: me.id + '-lblTitMiaErr',
                                style: 'font-weight: bold; font-size: 11px;',
                                text: 'ERROR:',
                                anchor: '100%',
                                hidden: true
                            },
                            {
                                xtype: 'label',
                                id: me.id + '-lblMiaErr',
                                style: 'color:#4D2B04;font-weight: bold; font-size: 11px;',
                                text: '',
                                anchor: '100%'
                            },
                            ,
                                    {
                                        xtype: 'label',
                                        id: me.id + '-lblDescMiaErr',
                                        style: 'background:orange;font-weight: bold; font-size: 11px;',
                                        text: '',
                                        anchor: '100%',
                                        width: 200
                                    },
                            {
                                xtype: 'box',
                                width: 200
                            },
                            {
                                fieldLabel: 'Total SRP',
                                id: me.id + '-txtTotSRP',
                                labelWidth: 80,
                                width: 170
                            },
                            {
                                fieldLabel: 'Total MPA',
                                id: me.id + '-txtTotMPA',
                                labelWidth: 80,
                                width: 170
                            },
                            {
                                fieldLabel: 'Total Valor',
                                id: me.id + '-txtTotValor',
                                labelWidth: 80,
                                width: 170
                            },
                            {
                                fieldLabel: 'Total QFinal',
                                id: me.id + '-txtTotQFinal',
                                labelWidth: 80,
                                width: 170
                            }
                        ]
                    }
                ]
            }
        ];

        me.listeners = {
            afterRender: function (obj, e) {
            }
        };

        me.callParent();
    },
    setParam: function (params) {
        var me = this;
        var NPROG = '';
        //console.log(params);
        switch (params.IN_TRX) {
            case 'RFND':
                NPROG = 'BX00000004';
                break;
        }

        me.setStoresGrids();
        me.validateProgram(NPROG);

        meParentP = this;

        Ext.getCmp(me.id + 'Facsimil').setParam(params);

        //console.log(params.IN_TIPOCAP);
        //console.log(params.IN_AIRLIN);
        //console.log(params.IN_GRUPO);
        //console.log(params.IN_CIA);
        //console.log(params.IN_FORMA);
        //console.log(params.IN_SERIE);
        //console.log(params.IN_SEQ);
        //console.log(params.IN_FTE);
        //console.log(params.IN_TRX);
        //console.log(params.IN_EDITABLE);  
        //console.log(params.IN_TCAMB);  
        //console.log(params.IN_REVENUE);  

        var beanParam = {
            VP_GRUPO: params.IN_GRUPO,
            VP_CIA: params.IN_CIA,
            VP_FORMA: params.IN_FORMA,
            VP_SERIE: params.IN_SERIE,
            VP_SEQ: params.IN_SEQ,
            IN_FTE: params.IN_FTE,
            IN_TRX: params.IN_TRX,
            IN_EDITABLE: params.IN_EDITABLE,
            IN_TCAMB: params.IN_TCAMB,
            IN_STATUS: params.IN_STATUS,
            IN_ERROR: params.IN_ERROR,
            IN_TDOC: params.IN_TDOC,
            IN_ISSUEDATE: params.IN_ISSUEDATE,
            IN_CUPON1: params.IN_CUPON1,
            IN_CUPON2: params.IN_CUPON2,
            IN_CUPON3: params.IN_CUPON3,
            IN_CUPON4: params.IN_CUPON4
        };

        me.beanP = beanParam;

        if (params.IN_TRX === 'RFND') {
            Ext.Ajax.request({
                url: CONTEXTPATH + '/Prorate/searchData',
                method: 'POST',
                timeout: 60000000,
                params: {beanString: JSON.stringify(beanParam)},
                beforerequest: Ext.getCmp(me.id + '-form').mask('Loading...'),
                success: function (response, opts) {
                    var res = Ext.JSON.decode(response.responseText);
                    if (res.success) {
                        if (res.beanProrate !== undefined) {
                            bean = res.beanProrate;
                            lstA713 = res.lstA713;
                            me.mostrarData(params.IN_TCAMB, params.IN_REVENUE);
                            me.setVisibleDefault(params.IN_TRX, params.IN_EDITABLE);
                            me.setEditable(params.IN_TRX, params.IN_EDITABLE);
                            Ext.getCmp(me.id + '-form').unmask('Loading...', '');
                        } else {
                            global.Msg({msg: 'Data not Found.'});
                        }
                    } else
                        global.Msg({msg: res.sesion});
                },
                failure: function (response, opts) {
                    Ext.getBody().unmask();
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        } else {
            Ext.Ajax.request({
                url: CONTEXTPATH + '/Prorate/searchDataVenta',
                method: 'POST',
                timeout: 60000000,
                params: {beanString: JSON.stringify(beanParam)},
                beforerequest: Ext.getCmp(me.id + '-form').mask('Loading...'),
                success: function (response, opts) {
                    var res = Ext.JSON.decode(response.responseText);
                    if (res.success) {
                        if (res.beanProrate !== undefined) {
                            bean = res.beanProrate;
                            lstA713 = res.lstA713;
                            me.mostrarData(params.IN_TCAMB, params.IN_REVENUE);
                            //me.setVisibleDefault(params.IN_TRX,params.IN_EDITABLE);
                            //me.setEditable(params.IN_TRX,params.IN_EDITABLE);
                            Ext.getCmp(me.id + '-form').unmask('Loading...', '');
                        } else {
                            global.Msg({msg: 'Data not Found.'});
                        }
                    } else
                        global.Msg({msg: res.sesion});
                },
                failure: function (response, opts) {
                    Ext.getBody().unmask();
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        }
    },
    mostrarData: function (TCamb, CurrRevenue) {
        var me = this;

        Ext.getCmp(me.id + '-btnDelivery').setText('<span style="color: white; font-weight: bold;">' + me.beanP.IN_FTE + ' Delivery</span>');

        Ext.getCmp(me.id + '-txtCia').setValue(bean.A713CIA);
        Ext.getCmp(me.id + '-txtForma').setValue(bean.A713FORMA);
        Ext.getCmp(me.id + '-txtSerie').setValue(bean.A713SERIE);
        Ext.getCmp(me.id + '-txtGrupo').setValue(bean.A713GRUPO);

        Ext.getCmp(me.id + '-txtOriVta').setValue(bean.A713ORIG);
        Ext.getCmp(me.id + '-txtCnj').setValue(bean.A713FLAG + ' & ' + bean.A713CTKTC);
        Ext.getCmp(me.id + '-txtMetodo').setValue('');
        //Ext.getCmp(me.id + '-txtTipoMetodo').setValue(bean.A713BASE);
        if (bean.A713BASE === '') {
            Ext.getCmp(me.id + '-txtTipoMetodo').setValue('F');
        } else {
            Ext.getCmp(me.id + '-txtTipoMetodo').setValue(bean.A713BASE);
        }
        Ext.getCmp(me.id + '-txtMonReg').setValue(bean.A713MONREG);
        Ext.getCmp(me.id + '-txtMonSys').setValue('USD');
        Ext.getCmp(me.id + '-txtFecVta').setValue(bean.A713FECVTA);
        Ext.getCmp(me.id + '-txtIT').setValue(bean.A713CODIT);
        Ext.getCmp(me.id + '-txtCityVta').setValue(bean.A713CIUVTA);
        Ext.getCmp(me.id + '-txtCtryVta').setValue(bean.A713PAIVTA);
        Ext.getCmp(me.id + '-txtCityEmision').setValue(bean.A713CIUEMI);
        Ext.getCmp(me.id + '-txtCtryEmision').setValue(bean.A713PAIEMI);
        Ext.getCmp(me.id + '-txtLink').setValue('');
        Ext.getCmp(me.id + '-txtTarifa').setValue(Ext.util.Format.number(bean.A713TARIFA, '0,000.00'));
        Ext.getCmp(me.id + '-txtCurTarifa').setValue(bean.A713MONEDA);
        Ext.getCmp(me.id + '-txtTarifEqv').setValue(Ext.util.Format.number(bean.A713TRFPAG, '0,000.00'));
        Ext.getCmp(me.id + '-txtCurTarifEqv').setValue(bean.A713MDAPAG);
        Ext.getCmp(me.id + '-txtIniTrip').setValue(bean.A713INITRA);
        Ext.getCmp(me.id + '-txtTotalNUC').setValue(Ext.util.Format.number(bean.A713TRFNUC, '0,000.00'));
        Ext.getCmp(me.id + '-txtRoe').setValue(Ext.util.Format.number(bean.A713ROE, '0,000.00'));
        Ext.getCmp(me.id + '-txtCodAgente').setValue(bean.A713AGENTE);
        Ext.getCmp(me.id + '-txtTarifLAN').setValue(bean.A713FARERV);
        Ext.getCmp(me.id + '-txtCurTarifLAN').setValue(bean.A713MDARV);
        Ext.getCmp(me.id + '-txtEqvPag').setValue(bean.A713FARE);
        Ext.getCmp(me.id + '-txtCurEqvPag').setValue(bean.A713MDAFA);
        //Ext.getCmp(me.id + '-strTktRef').setValue(bean.A713SUBPA1);
        Ext.getCmp(me.id + '-lblUCreaH').setValue(bean.A713REGIST);
        Ext.getCmp(me.id + '-lblFCreaH').setValue(bean.A713FREGIS);
        Ext.getCmp(me.id + '-lblUModiH').setValue(bean.A713REVISA);
        Ext.getCmp(me.id + '-txtTAjust').setValue(Ext.util.Format.number(bean.A713TAJUST, '0,000.00'));
        Ext.getCmp(me.id + '-txtStOver').setValue(Ext.util.Format.number(bean.A713CSOVER, '0,000.00'));
        Ext.getCmp(me.id + '-txtCantStOver').setValue(Ext.util.Format.number(bean.A713QSOVER, '0,000.00'));
        Ext.getCmp(me.id + '-txtPlus').setValue(Ext.util.Format.number(bean.A713CPLUSS, '0,000.00'));
        Ext.getCmp(me.id + '-txtTAjustQ').setValue(Ext.util.Format.number(bean.A713TAJUSQ, '0,000.00'));
        Ext.getCmp(me.id + '-txtCommission').setValue(Ext.util.Format.number(bean.A713COMMIS, '0,000.00'));
        Ext.getCmp(me.id + '-txtCurComm').setValue(bean.A713MDACOM);
        Ext.getCmp(me.id + '-txtDsctoComis').setValue(Ext.util.Format.number(bean.A713PORCOM, '0,000.00'));
        strTVenta = bean.A713TVENTA;
        strTCAPAG = bean.A713TCAPAG;
        Ext.getCmp(me.id + '-lblUCreaD').setValue(bean.A713REGIST);
        Ext.getCmp(me.id + '-lblFCreaD').setValue(bean.A713FREGIS);
        Ext.getCmp(me.id + '-lblUModiD').setValue(bean.A713REVISA);
        Ext.getCmp(me.id + '-lblFModiD').setValue(bean.A713FREVIS);
        //strRPDABrowDet = drDB2.Item("A713RPDA").ToString
        //strNStock = drDB2.Item("A713NSTOCK").ToString
        if (me.beanP.IN_ERROR !== '') {
            Ext.getCmp(me.id + '-lblTitMiaErr').setVisible(true);
            var lstError = me.beanP.IN_ERROR.split('-');
            Ext.getCmp(me.id + '-lblMiaErr').setText(lstError[0]);
            if (lstError.length > 1) {
                Ext.getCmp(me.id + '-lblDescMiaErr').setText(lstError[1]);
            }
        } else {
            Ext.getCmp(me.id + '-lblTitMiaErr').setVisible(false);
        }

        Ext.getCmp(me.id + '-DgView').getStore().removeAll();
        Ext.getCmp(me.id + '-DgView').getStore().loadData(lstA713);

        me.calculateFare(TCamb, CurrRevenue);
        me.calculateTotals(lstA713);
    },
    calculateFare: function (TCamb, CurrRevenue) {
        var me = this;
        var CurTarifEqv = Ext.getCmp(me.id + '-txtCurTarifEqv').getValue();
        var TarifEqv = Ext.getCmp(me.id + '-txtTarifEqv').getValue().replace(',', '');
        var CurTarifa = Ext.getCmp(me.id + '-txtCurTarifa').getValue();
        var Tarifa = Ext.getCmp(me.id + '-txtTarifa').getValue().replace(',', '');
        var txtBSR = 0.0;

        if (TCamb !== null && TCamb !== '' && TCamb !== '0' && TCamb !== '0.000000') {
            Ext.getCmp(me.id + '-txtBSR').setValue(TCamb);
        }

        if (CurTarifEqv === CurrRevenue) {
            if (TCamb === null && TCamb === '' && TCamb === '0' && TCamb === '0.000000') {
                Ext.getCmp(me.id + '-txtBSR').setValue('1.00');
            }
            Ext.getCmp(me.id + '-txtTarifUSD').setValue(TarifEqv);
            Ext.getCmp(me.id + '-txtTarifCurr').setValue(CurrRevenue);
        } else if (CurTarifEqv !== CurrRevenue && CurTarifEqv !== '') {
            if (TCamb === null && TCamb === '' && TCamb === '0' && TCamb === '0.000000') {
                me.getA1526(CurTarifEqv, CurrRevenue, '');
            }
            txtBSR = Ext.getCmp(me.id + '-txtBSR').getValue();
            if (txtBSR !== '') {
                Ext.getCmp(me.id + '-txtTarifUSD').setValue(Ext.util.Format.number(parseFloat(TarifEqv) * parseFloat(txtBSR), '00000000.00'));
                Ext.getCmp(me.id + '-txtTarifCurr').setValue(CurrRevenue);
            }
        }
        if (CurTarifEqv === '') {
            if (CurTarifa === CurrRevenue) {
                if (TCamb === null && TCamb === '' && TCamb === '0' && TCamb === '0.000000') {
                    Ext.getCmp(me.id + '-txtBSR').setValue('1.00');
                }
                Ext.getCmp(me.id + '-txtTarifUSD').setValue(Tarifa);
                Ext.getCmp(me.id + '-txtTarifCurr').setValue(CurrRevenue);
            } else if (CurTarifa !== CurrRevenue && CurTarifa !== '') {
                if (TCamb === null && TCamb === '' && TCamb === '0' && TCamb === '0.000000') {
                    me.getA1526(CurTarifa, CurrRevenue, '');
                }
                txtBSR = Ext.getCmp(me.id + '-txtBSR').getValue();

                if (txtBSR !== '') {
                    Ext.getCmp(me.id + '-txtTarifUSD').setValue(Ext.util.Format.number(parseFloat(Tarifa) * parseFloat(txtBSR), '00000000.00'));
                    Ext.getCmp(me.id + '-txtTarifCurr').setValue(CurrRevenue);
                }
            }
        }
    },
    calculateTotals: function (lstA713) {
        var me = this;
        var strTotSRP = 0;
        var strTotMPA = 0;
        var strTotValor = 0;
        var strTotQFinal = 0;

        for (var i = 0; i < lstA713.length; i++) {
            strTotSRP = strTotSRP + lstA713[i].A713VLSRP1;
            strTotMPA = strTotMPA + lstA713[i].A713VLMPA1;
            strTotValor = strTotValor + lstA713[i].A713VALOR1;
            strTotQFinal = strTotQFinal + lstA713[i].A713Q1;
        }

        Ext.getCmp(me.id + '-txtTotSRP').setValue(Ext.util.Format.number(strTotSRP, '0,000.00'));
        Ext.getCmp(me.id + '-txtTotMPA').setValue(Ext.util.Format.number(strTotMPA, '0,000.00'));
        Ext.getCmp(me.id + '-txtTotValor').setValue(Ext.util.Format.number(strTotValor, '0,000.00'));
        Ext.getCmp(me.id + '-txtTotQFinal').setValue(Ext.util.Format.number(strTotQFinal, '0,000.00'));
    },
    getA1526: function (curr1, curr2, date) {
        var me = this;

        var param = {
            IN_CURR_FROM: curr1,
            IN_CURR_TO: curr2,
            IN_DATE: date
        };

        Ext.Ajax.request({
            url: CONTEXTPATH + '/Prorate//searchA1526',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(param)},
            //beforerequest: Ext.getCmp(me.id).mask('Loading...', ''),
            success: function (response, opts) {
                //Ext.getBody().unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    if (res.beanA1526 !== undefined) {
                        beanA1526 = res.beanA1526;
                        Ext.getCmp(me.id + '-txtBSR').setValue(res.beanA1526.A1526RATE);
                        //Ext.getCmp(me.id).unmask('Loading...', '');
                    } else {
                        global.Msg({msg: 'There is no sale ex rate for ' + curr1});
                    }
                } else
                    global.Msg({msg: res.sesion});
            },
            failure: function (response, opts) {
                //Ext.getCmp(me.id).unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    validateProgram: function (nprog) {
        var me = this;

        Ext.Ajax.request({
            url: prototype.urlMaster + '/validateUserProgramAccess',
            method: 'POST',
            timeout: 60000000,
            params: {nprog: nprog || ''},
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    me.beanAccess = res.matrix;
                } else
                    global.Msg({msg: res.sesion});
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    setStoresGrids: function () {
        var me = this;
        var grid01 = Ext.getCmp(me.id + '-DgView');

        var store01 = Ext.create('Ext.data.Store', {
            storeId: me.id + '-store-grid01'
        });

        grid01.setStore(store01);
    },
    setVisibleDefault: function (IN_TRX, IN_EDITABLE) {
        var me = this;
        var grid = Ext.getCmp(me.id + '-DgView');
        switch (IN_TRX) {
            case 'RFND':
                //Botton
                Ext.getCmp(me.id + '-picSave').setVisible(IN_EDITABLE);
                Ext.getCmp(me.id + '-btnProrate').setVisible(IN_EDITABLE);

                //Textbox
                Ext.getCmp(me.id + '-lblSRC').setVisible(false);
                Ext.getCmp(me.id + '-txtOriVta').setVisible(false);
                Ext.getCmp(me.id + '-lblAjtORF').setVisible(false);
                Ext.getCmp(me.id + '-txtAjtORF').setVisible(false);
                Ext.getCmp(me.id + '-lblInvol').setVisible(false);
                Ext.getCmp(me.id + '-txtInvol').setVisible(false);

                //Grid
                grid.columns[11].setVisible(false);//LH          
                grid.columns[12].setVisible(false);//Cb
                grid.columns[13].setVisible(false);//T
                grid.columns[14].setVisible(false);//St FB
                grid.columns[15].setVisible(false);//Vt
                grid.columns[16].setVisible(false);//Code          
                grid.columns[17].setVisible(false);//Dsct
                grid.columns[18].setVisible(false);//GI
                grid.columns[19].setVisible(false);//Fare
                //grid.columns[20].setVisible(false);//ST
                //grid.columns[21].setVisible(false);//Q          
                grid.columns[22].setVisible(false);//Diferencial
                grid.columns[23].setVisible(false);//Flag Difer
                //grid.columns[24].setVisible(false);//Comp Fare
                grid.columns[25].setVisible(false);//Curr Tarif
                //grid.columns[26].setVisible(false);//SRP
                //grid.columns[27].setVisible(false);//MPA
                //grid.columns[28].setVisible(false);//SPA
                //grid.columns[29].setVisible(false);//ISC
                //grid.columns[30].setVisible(false);//Applied Value
                //grid.columns[31].setVisible(false);//Adjust          
                grid.columns[32].setVisible(false);//SPA Force
                //grid.columns[33].setVisible(false);//Q Surcharge
                //grid.columns[34].setVisible(false);//Q Final
                //grid.columns[35].setVisible(false);//Factor
                //grid.columns[36].setVisible(false);//% Proviso
                //grid.columns[37].setVisible(false);//Base Amount
                //grid.columns[38].setVisible(false);//Commission
                //grid.columns[39].setVisible(false);//Over Comm
                //grid.columns[40].setVisible(false);//YQ
                //grid.columns[41].setVisible(false);//IVA
                grid.columns[42].setVisible(false);//% Commission
                grid.columns[43].setVisible(false);//Commission Value
                grid.columns[44].setVisible(false);//Proration Type
                grid.columns[45].setVisible(false);//Cr Ope
                grid.columns[46].setVisible(false);//Flt Ope
                grid.columns[47].setVisible(false);//Hor Flt
                break;
        }
    },
    setEditable: function (IN_TRX, IN_EDITABLE) {
        var me = this;

        switch (IN_TRX) {
            case 'RFND':
                if (IN_EDITABLE === true) {
                    Ext.getCmp(me.id + '-txtTarifa').setReadOnly(false);
                    Ext.getCmp(me.id + '-txtCurTarifa').setReadOnly(false);
                    Ext.getCmp(me.id + '-txtTarifEqv').setReadOnly(false);
                    Ext.getCmp(me.id + '-txtCurTarifEqv').setReadOnly(false);
                    Ext.getCmp(me.id + '-txtCommission').setReadOnly(false);
                    Ext.getCmp(me.id + '-txtCurComm').setReadOnly(false);
                    Ext.getCmp(me.id + '-txtTotalNUC').setReadOnly(false);
                    Ext.getCmp(me.id + '-txtRoe').setReadOnly(false);
                    Ext.getCmp(me.id + '-txtDsctoComis').setReadOnly(false);
                    Ext.getCmp(me.id + '-txtFecVta').setReadOnly(false);
                    Ext.getCmp(me.id + '-txtCityVta').setReadOnly(false);
                    Ext.getCmp(me.id + '-txtCtryVta').setReadOnly(false);
                    Ext.getCmp(me.id + '-txtMonReg').setReadOnly(false);
                    Ext.getCmp(me.id + '-txtPlus').setReadOnly(false);
                    Ext.getCmp(me.id + '-txtMetodo').setReadOnly(false);
                    Ext.getCmp(me.id + '-txtTipoMetodo').setReadOnly(false);
                    Ext.getCmp(me.id + '-txtCityEmision').setReadOnly(false);
                    Ext.getCmp(me.id + '-txtCtryEmision').setReadOnly(false);
                    Ext.getCmp(me.id + '-txtMonSys').setReadOnly(false);
                    Ext.getCmp(me.id + '-txtStOver').setReadOnly(false);
                    Ext.getCmp(me.id + '-txtCantStOver').setReadOnly(false);
                    Ext.getCmp(me.id + '-txtCodAgente').setReadOnly(false);
                    Ext.getCmp(me.id + '-txtLink').setReadOnly(false);
                    Ext.getCmp(me.id + '-txtIniTrip').setReadOnly(false);
                    Ext.getCmp(me.id + '-txtIT').setReadOnly(false);
                }
                break;
        }
    },
    onchange: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    showPreviewDelivery: function (paramD) {
        var me = this;
        var win = new Ext.Praxis.view.widgets.previewDelivery({
            id: me.id + '-preview',
            data: paramD
        });

        win.show();
    },
    showPreviewColumns: function (paramD) {
        var me = this;
        var win = new Ext.Praxis.view.widgets.previewGridColumns({
            id: me.id + '-previewGC',
            data: paramD
        });

        win.show();
    },
    showPreviewProrate: function (paramD) {
        var me = this;
        var win = new Ext.Praxis.view.widgets.previewProrate({
            id: me.id + '-preview',
            data: paramD
        });

        win.show();
    },
    getDataItemGrid: function (data) {
        var bpadre = '0';
        var bprev = '1';
        var beanParam = {};
        //var strProcessBrowDet = '0';
        //var strTAjuste = '0';

        if (meParentP.beanP.IN_TDOC === 'VOU') {
            meParentP.strProcessBrowDet = '1';
        }

        if (meParentP.intVez === 0) {
            meParentP.strProcessBrowDet = "1";
            meParentP.intVez++;
        }

        if (data.TICKET === meParentP.beanP.VP_CIA + meParentP.beanP.VP_FORMA + meParentP.beanP.VP_SERIE) {
            bpadre = '1';
        }

        beanParam = {
            A713CIA: data.TICKET.substring(1, 3),
            A713FORMA: data.TICKET.substring(4, 4),
            A713SERIE: data.TICKET.substring(8, 6),
            A713CIAI: meParentP.beanP.VP_CIA,
            A713FORMAI: meParentP.beanP.VP_FORMA,
            A713SERIEI: meParentP.beanP.VP_SERIE,
            A713CUPON: data.A713CUPON,
            A713SEQ: meParentP.beanP.VP_SEQ,
            A713FLAG: 'I',
            A713NSEQ: '1',
            A713GRUPO: meParentP.beanP.VP_GRUPO,
            A713FECVTA: Ext.getCmp(meParentP.id + '-txtFecVta').getValue(),
            A713CODIT: Ext.getCmp(meParentP.id + '-txtIT').getValue(),
            A713CIUVTA: Ext.getCmp(meParentP.id + '-txtCityVta').getValue(),
            A713PAIVTA: Ext.getCmp(meParentP.id + '-txtCtryVta').getValue(),
            A713CIUEMI: Ext.getCmp(meParentP.id + '-txtCityEmision').getValue(),
            A713PAIEMI: Ext.getCmp(meParentP.id + '-txtCtryEmision').getValue(),
            A713TAJUST: meParentP.strTAjuste, //FrmPreviewData
            A713STAT: meParentP.strProcessBrowDet,
            A713BASE: Ext.getCmp(meParentP.id + '-txtTipoMetodo').getValue(),
            A713MONREG: Ext.getCmp(meParentP.id + '-txtMonReg').getValue(),
            A713MONSYS: Ext.getCmp(meParentP.id + '-txtMonSys').getValue(),
            A713INITRA: Ext.getCmp(meParentP.id + '-txtIniTrip').getValue(),
            A713INDMOD: '', //FrmDERfnd.chkForce.Checked
            A713TARIFA: Ext.getCmp(meParentP.id + '-txtTarifa').getValue(),
            A713MONEDA: Ext.getCmp(meParentP.id + '-txtCurTarifa').getValue(),
            A713TRFPAG: Ext.getCmp(meParentP.id + '-txtTarifEqv').getValue(),
            A713MDAPAG: Ext.getCmp(meParentP.id + '-txtCurTarifEqv').getValue(),
            A713TRFNUC: Ext.getCmp(meParentP.id + '-txtTotalNUC').getValue(),
            A713MDAFA: Ext.getCmp(meParentP.id + '-txtCurEqvPag').getValue(),
            A713FARE: Ext.getCmp(meParentP.id + '-txtEqvPag').getValue(),
            A713MDARV: Ext.getCmp(meParentP.id + '-txtCurTarifLAN').getValue(),
            A713FARERV: Ext.getCmp(meParentP.id + '-txtTarifLAN').getValue(),
            A713ROE: Ext.util.Format.number(Ext.getCmp(meParentP.id + '-txtRoe').getValue(), '00000000.000000'),
            A713CSOVER: Ext.getCmp(meParentP.id + '-txtStOver').getValue(),
            A713QSOVER: Ext.getCmp(meParentP.id + '-txtCantStOver').getValue(),
            A713CPLUSS: Ext.getCmp(meParentP.id + '-txtPlus').getValue(),
            A713TAJUSQ: Ext.getCmp(meParentP.id + '-txtTAjustQ').getValue(),
            A713COMMIS: Ext.getCmp(meParentP.id + '-txtCommission').getValue(),
            A713MDACOM: Ext.getCmp(meParentP.id + '-txtCurComm').getValue(),
            A713PORCOM: Ext.getCmp(meParentP.id + '-txtDsctoComis').getValue(),
            BPADRE: bpadre,
            BPREV: bprev,
            A713CONEX1: data.A713CONEX1,
            A713RUTA0: data.A713RUTA0,
            A713RUTA1: data.A713RUTA1,
            A713CARRA1: data.A713CARRA1,
            A713NVLO1: data.A713NVLO1,
            A713FVLO1: data.A713FVLO1,
            A713BOOKI1: data.A713BOOKI1,
            A713CLASE1: data.A713CLASE1,
            A713FBUSO1: data.A713FBUSO1,
            A713FBORI1: data.A713FBUSO1,
            A713LOHO1: data.A713LOHO1,
            A713CB: data.A713CB, //undefined
            A713TBASE1: data.A713TBASE1,
            A713STBAS1: data.A713STBAS1,
            A713VT: data.A713VT, //undefined
            A713TDESC1: data.A713TDESC1,
            A713PORDS1: data.A713PORDS1,
            A713VIA1: data.A713VIA1,
            A713FARE1: data.A713FARE1,
            A713TFARE1: data.A713TFARE1,
            A713SS1: data.A713SS1,
            A713DIFER1: data.A713DIFER1,
            A713FDIFE1: data.A713FDIFE1,
            A713CFARE1: data.A713CFARE1,
            A713MNTFM1: data.A713MNTFM1,
            A713VLSRP1: data.A713VLSRP1,
            A713VLMPA1: data.A713VLMPA1,
            A713ACUE1: data.A713ACUE1,
            A713ISC1: data.A713ISC1,
            A713VALOR1: data.A713VALOR1,
            A713VALOL1: parseFloat(data.A713VALOR1) * parseFloat(meParentP.beanP.IN_TCAMB),
            A713AJUST1: data.A713AJUST1,
            A713ACUEO1: data.A713ACUEO1, //undefined
            A713QIN1: data.A713QIN1,
            A713Q1: data.A713Q1,
            A713FACT1: data.A713FACT1,
            A713PPRO1: data.A713PPRO1,
            A713PROV1: data.A713PROV1,
            A713PRRCM1: data.A713PRRCM1,
            A713PRSCM1: data.A713PRSCM1,
            A713YQ1: data.A713YQ1,
            A713IV1: data.A713IV1,
            A713COMPR: data.A713COMPR, //undefined
            A713COM: data.A713COM, //undefined
            A713INDPR1: data.A713INDPR1,
            A713COPE: data.A713COPE, //undefined
            A713FOPE: data.A713FOPE, //undefined
            A713HVLO1: data.A713HVLO1
        };
        //meParentP.SumTarifLoc = meParentP.SumTarifLoc + beanParam.A713VALOL1;
        //meParentP.AjtTarifLoc = beanParam.A713FARE - meParentP.SumTarifLoc;

        return beanParam;
    },
    getDataProrate: function () {
        var beanProrate = {};
        var valorNum = '';
        var ultValor = '';
        var txtTARIFA = Ext.getCmp(meParentP.id + '-txtTarifa').getValue();
        var txtTRFPAG = Ext.getCmp(meParentP.id + '-txtTarifEqv').getValue();
        var txtTAJUSQ = Ext.getCmp(meParentP.id + '-txtTAjustQ').getValue();
        var txtCOMMIS = Ext.getCmp(meParentP.id + '-txtCommission').getValue();
        var store = Ext.getCmp(meParentP.id + '-DgView').getStore().data.items;

        beanProrate.LK_METODO = Ext.getCmp(meParentP.id + '-txtMetodo').getValue();
        beanProrate.LK_BASE_DOM = Ext.getCmp(meParentP.id + '-txtTipoMetodo').getValue();
        beanProrate.LK_BASE_INT = '';
        beanProrate.LK_TIPO_AJUSTE = '0';
        beanProrate.LK_CIA = meParentP.beanP.VP_CIA;
        beanProrate.LK_FORMA = meParentP.beanP.VP_FORMA;
        beanProrate.LK_SERIE = meParentP.beanP.VP_SERIE;
        beanProrate.LK_CUPON = '0';
        beanProrate.LK_REGI_MDA = Ext.getCmp(meParentP.id + '-txtMonReg').getValue();
        beanProrate.LK_TUSO = 'VT';
        beanProrate.LK_FUSO = Ext.getCmp(meParentP.id + '-txtFecVta').getValue();//meParentP.beanP.IN_ISSUEDATE;
        beanProrate.LK_FVIAJE = '';
        beanProrate.LK_FVENTA = Ext.getCmp(meParentP.id + '-txtFecVta').getValue();//meParentP.beanP.IN_ISSUEDATE;
        beanProrate.LK_TVENTA = strTVenta;
        beanProrate.LK_FFACTU = Ext.getCmp(meParentP.id + '-txtFecVta').getValue();//meParentP.beanP.IN_ISSUEDATE;
        beanProrate.LK_FARE_MDA = Ext.getCmp(meParentP.id + '-txtCurTarifa').getValue();

        if ((txtTARIFA).indexOf('-', 0) !== -1) {
            valorNum = txtTARIFA.replace('.', '');
            valorNum = valorNum.replace('-', '');
            ultValor = valorNum.substring(valorNum.length - 1, 1);
            ultValor = meParentP.equivalenteNegativo(ultValor);
            beanProrate.LK_FARE = meParentP.fillZeros(13, valorNum.substring(0, valorNum.length - 1) + ultValor);
        } else {
            beanProrate.LK_FARE = meParentP.fillZeros(13, txtTARIFA.replace('.', ''));
        }

        beanProrate.LK_EQV_MDA = Ext.getCmp(meParentP.id + '-txtCurTarifEqv').getValue();

        valorNum = '';
        ultValor = '';
        if (txtTRFPAG.indexOf('-', 0) !== -1) {
            valorNum = txtTRFPAG.replace('.', '');
            valorNum = valorNum.replace('-', '');
            ultValor = valorNum.substring(valorNum.length - 1, 1);
            ultValor = meParentP.equivalenteNegativo(ultValor);
            beanProrate.LK_EQV_FARE = meParentP.fillZeros(13, valorNum.substr(0, valorNum.length - 1) + ultValor);
        } else {
            beanProrate.LK_EQV_FARE = meParentP.fillZeros(13, txtTRFPAG.replace('.', ''));
        }

        beanProrate.LK_EQV_TC = meParentP.fillZeros(13, strTCAPAG.toString().replace('.', ''));
        beanProrate.LK_SAMPLIG = 'S';
        beanProrate.LK_NUC = meParentP.fillZeros(13, Ext.getCmp(meParentP.id + '-txtTotalNUC').getValue().replace('.', ''));
        beanProrate.LK_NUC_MDA = '';
        beanProrate.LK_ROE = meParentP.fillZeros(13, Ext.getCmp(meParentP.id + '-txtRoe').getValue().replace('.', ''));
        beanProrate.LK_IPLUS = '';
        beanProrate.LK_TPLUS = meParentP.fillZeros(13, Ext.getCmp(meParentP.id + '-txtPlus').getValue().replace('.', ''));
        beanProrate.LK_QSTOPOVER = meParentP.fillZeros(2, Ext.getCmp(meParentP.id + '-txtStOver').getValue().replace('.', ''));
        beanProrate.LK_TSTOPOVER = meParentP.fillZeros(13, Ext.getCmp(meParentP.id + '-txtCantStOver').getValue().replace('.', ''));
        beanProrate.LK_EXCHANGE = 'N';
        beanProrate.LK_CAMBIO_RUT = '';
        beanProrate.LK_ORIGEN = '';
        beanProrate.LO_SL = '00000000';
        beanProrate.LO_XO = '';
        beanProrate.LO_M = '';
        beanProrate.LO_AFTER = '';
        beanProrate.LO_BEFOR = '';
        beanProrate.LO_RUTING = '';
        beanProrate.LO_AIRLONG = '';
        beanProrate.LO_TRANSP = '';
        beanProrate.LO_VIA = '';
        beanProrate.LO_BASE = '';
        beanProrate.LO_TBASE = '';
        beanProrate.LO_SBTBASE = '';
        beanProrate.LO_CLASE = '';
        beanProrate.LO_RBD = '';
        beanProrate.LO_TEMPOR = '';
        beanProrate.LO_NVLO = '';
        beanProrate.LO_FVLO = '';
        beanProrate.LO_TDESC = '';
        beanProrate.LO_PDESC = '';
        beanProrate.LO_BREAK = '';
        beanProrate.LO_INDST = '';
        beanProrate.LO_PLUS = '0000000000';
        beanProrate.LO_Q = '';
        beanProrate.LO_DIFL = '';
        beanProrate.LO_INDIF = '';
        beanProrate.LO_ACU_MDA = '';
        beanProrate.LO_ACU_I = '';
        beanProrate.LO_TFM_MDA = '';
        beanProrate.LO_TFM_I = '';
        beanProrate.LO_RUT_V = '';
        beanProrate.LO_TRN_V = '';
        beanProrate.LO_BAS_V = '';
        beanProrate.LO_RBD_V = '';
        beanProrate.LO_VLO_V = '';
        beanProrate.LO_FVL_V = '';
        beanProrate.LK_REGI_TC = '0000000000000';
        beanProrate.LK_SYST_MDA = Ext.getCmp(meParentP.id + '-txtMonSys').getValue();
        beanProrate.LK_SYST_TC = '0000000000000';
        beanProrate.LO_FACTOR = '0000000000';
        beanProrate.LO_PROVIS = '0000000000';
        beanProrate.LO_PPROVI = '00000';
        beanProrate.LO_SUBPAR = '';
        beanProrate.LO_TARIFA = '0000000000';
        beanProrate.LO_YANQUI = '0000000000';
        beanProrate.LO_ACU_O = '0000000000';
        beanProrate.LO_ACU_CD = '';
        beanProrate.LO_ACU_AUTO = '';
        beanProrate.LO_ACU_APLICA = '';
        beanProrate.LO_ACU_ERROR = '';
        beanProrate.LO_INDISC = '';
        beanProrate.LO_ISC = '00000';
        beanProrate.LK_INDSRP = '';
        beanProrate.LO_SRP = '0000000000';
        beanProrate.LO_MPA = '0000000000';
        beanProrate.LO_SOVER = '0000000000';
        beanProrate.LO_FARE_ATBP = '0000000000';
        beanProrate.LO_FARE_SYST = '0000000000';
        beanProrate.LO_COEF = '000000';
        beanProrate.LK_TVALOR_SYST = '0000000000000';
        beanProrate.LO_VALOR_SYST = '0000000000';
        beanProrate.LK_TAJUSTE_SYST = '0000000000000';
        beanProrate.LO_AJUSTE_SYST = '0000000000';
        beanProrate.LK_TVALOR = '0000000000000';
        beanProrate.LO_VALOR = '0000000000';
        beanProrate.LO_INDPR = '';
        beanProrate.LK_TAJUSTE = '0000000000000';
        beanProrate.LO_AJUSTE = '0000000000';
        beanProrate.LK_ESTADO = '';
        beanProrate.LK_CODERROR = '';
        beanProrate.LK_MSJERROR = '';
        beanProrate.LO_CODLOG = '';
        beanProrate.LO_TXTLOG = '';
        beanProrate.LK_AIRFACT = meParentP.beanP.VP_CIA;
        beanProrate.LK_AIRFACTLT = '';
        beanProrate.LK_AIRENDO = '';
        beanProrate.LK_AIRENDOLT = '';
        beanProrate.LK_MDA_ATBP = '';
        beanProrate.LO_SUBPAR_CD = '';
        beanProrate.LO_ACH = '0000000000';
        beanProrate.LO_TRF = '0000000000';
        beanProrate.LO_COEF_SRP = '000000';
        beanProrate.LO_COEF_MPA = '000000';
        beanProrate.LO_COEF_ACH = '000000';
        beanProrate.LO_COEF_TRF = '000000';
        beanProrate.LK_SECTOR_ORG = '';
        beanProrate.LK_SECTOR_DST = '';
        beanProrate.LO_ACU_BASE = '';
        beanProrate.LK_ATBP_TC = meParentP.fillZeros(13, meParentP.beanP.IN_TCAMB.replace('.', ''));
        beanProrate.LO_Q_ATBP = '0000000000';
        beanProrate.LO_Q_SYST = '0000000000';
        beanProrate.LK_IT = Ext.getCmp(meParentP.id + '-txtIT').getValue();
        beanProrate.LK_CTYVTA = Ext.getCmp(meParentP.id + '-txtCityVta').getValue();
        beanProrate.LK_COUVTA = Ext.getCmp(meParentP.id + '-txtCtryVta').getValue();
        beanProrate.LK_CTYEMI = Ext.getCmp(meParentP.id + '-txtCityEmision').getValue();
        beanProrate.LK_COUEMI = Ext.getCmp(meParentP.id + '-txtCtryEmision').getValue();
        beanProrate.LK_FRMTYP = Ext.getCmp(meParentP.id + '-txtIniTrip').getValue();
        beanProrate.LK_TKTTYP = '';
        beanProrate.LO_FBTYP = '';
        beanProrate.LO_FBUSE = '';
        beanProrate.LO_SCMM = '00000';
        beanProrate.LO_PRVPB = '0000000000';
        beanProrate.LO_PRVPB_CUR = '';
        beanProrate.LO_PRVPB_TC = '000000000000';
        beanProrate.LO_ACUPB = '0000000000';
        beanProrate.LO_ACUPB_CUR = '';
        beanProrate.LO_ACUDSC = '00000';
        beanProrate.LO_ACUFIM = '';
        beanProrate.LO_BRKF_R006 = '';
        beanProrate.LO_BRKQ_R006 = '';
        beanProrate.LO_IGSA_R006 = '';
        beanProrate.LO_GSA_R006 = '00000';
        beanProrate.LO_ICARG_R006 = '';
        beanProrate.LO_VCARG_R006 = '0000000000';
        beanProrate.LO_MCARG_R006 = '';
        beanProrate.LO_PCARG_R006 = '00000';
        beanProrate.LO_CCARG_R006 = '';
        beanProrate.LK_TIPO_PROC = '';
        beanProrate.LO_BOLETO = '';
        beanProrate.LO_CODPRT = '';
        beanProrate.LK_Q_IN = '';
        beanProrate.LK_Q_OUT = '0000000000';
        beanProrate.LK_Q_MTH = '';//user;
        beanProrate.LK_Q_AJUS = '0000000000';
        valorNum = '';
        ultValor = '';
        if (txtTAJUSQ.indexOf('-', 0) !== -1) {
            valorNum = txtTAJUSQ.replace('.', '');
            valorNum = valorNum.replace('-', '');
            ultValor = valorNum.substr(valorNum.length - 1, 1);
            ultValor = meParentP.equivalenteNegativo(ultValor);
            beanProrate.LK_TAJUST_Q = meParentP.fillZeros(13, valorNum.substr(0, valorNum.length - 1) + ultValor);
        } else {
            beanProrate.LK_TAJUST_Q = meParentP.fillZeros(13, txtTAJUSQ.replace('.', ''));
        }
        valorNum = '';
        ultValor = '';
        if (txtCOMMIS.indexOf('-', 0) !== -1) {
            valorNum = txtCOMMIS.replace('.', '');
            valorNum = valorNum.replace('-', '');
            ultValor = valorNum.substr(valorNum.length - 1, 1);
            ultValor = meParentP.equivalenteNegativo(ultValor);
            beanProrate.LK_COMMIS = meParentP.fillZeros(13, valorNum.substr(0, valorNum.length - 1) + ultValor);
        } else {
            beanProrate.LK_COMMIS = meParentP.fillZeros(13, txtCOMMIS.replace('.', ''));
        }
        beanProrate.LK_MDACOMM = Ext.getCmp(meParentP.id + '-txtCurComm').getValue();
        beanProrate.LK_PRRCOMM = '';
        var totalBreak = 0.00;
        var i = 0;
        store.forEach(function callback(currentValue, index, array) {
            var lstGrilla = currentValue.data;

            if (i === 0) {
                beanProrate.LK_ORIGEN = lstGrilla.A713RUTA0;
                beanProrate.LO_RUTING = lstGrilla.A713RUTA0 + lstGrilla.A713RUTA1;
            } else {
                beanProrate.LO_RUTING = beanProrate.LO_RUTING + lstGrilla.A713RUTA1;
            }

            beanProrate.LO_XO = beanProrate.LO_XO + meParentP.fillString(lstGrilla.A713CONEX1, 1);
            beanProrate.LO_AIRLONG = beanProrate.LO_AIRLONG + meParentP.fillString(lstGrilla.A713LOHO1, 3);
            beanProrate.LO_TRANSP = beanProrate.LO_TRANSP + meParentP.fillString(lstGrilla.A713CARRA1, 2);
            beanProrate.LO_VIA = beanProrate.LO_VIA + meParentP.fillString(lstGrilla.A713VIA1, 2);
            beanProrate.LO_BASE = beanProrate.LO_BASE + meParentP.fillString(lstGrilla.A713FBUSO1, 15);
            beanProrate.LO_TBASE = beanProrate.LO_TBASE + meParentP.fillString(lstGrilla.A713TBASE1, 1);
            beanProrate.LO_SBTBASE = beanProrate.LO_SBTBASE + meParentP.fillString(lstGrilla.A713STBAS1, 1);
            beanProrate.LO_CLASE = beanProrate.LO_CLASE + meParentP.fillString(lstGrilla.A713CLASE1, 1);
            beanProrate.LO_RBD = beanProrate.LO_RBD + meParentP.fillString(lstGrilla.A713BOOKI1, 1);
            beanProrate.LO_NVLO = beanProrate.LO_NVLO + meParentP.fillString(lstGrilla.A713NVLO1, 5);
            beanProrate.LO_FVLO = beanProrate.LO_FVLO + meParentP.fillString(lstGrilla.A713FVLO1, 8);
            beanProrate.LO_TDESC = beanProrate.LO_TDESC + meParentP.fillString(lstGrilla.A713TDESC1, 2);
            valorNum = '';
            ultValor = '';
            valorNum = parseFloat(lstGrilla.A713PORDS1).toString();
            if (valorNum.indexOf('-', 0) !== -1) {
                valorNum = valorNum.replace('.', '');
                valorNum = valorNum.replace('-', '');
                ultValor = valorNum.substr(valorNum.length - 1, 1);
                ultValor = meParentP.equivalenteNegativo(ultValor);
                beanProrate.LO_PDESC = beanProrate.LO_PDESC + meParentP.fillZeros(5, valorNum.substr(0, valorNum.length - 1) + ultValor);
            } else {
                beanProrate.LO_PDESC = beanProrate.LO_PDESC + meParentP.fillZeros(5, parseFloat(lstGrilla.A713PORDS1).toString().replace('.', ''));
            }
            valorNum = '';
            ultValor = '';
            valorNum = parseFloat(lstGrilla.A713FARE1).toString();
            totalBreak = totalBreak + lstGrilla.A713FARE1;
            if (i === store.length - 1 && totalBreak === 0 && beanProrate.LK_NUC === '0000000000000' && beanProrate.LK_ROE === '0000000000000') {
                beanProrate.LO_BREAK = beanProrate.LO_BREAK + beanProrate.LK_FARE.substr(3, 10);
            } else {
                if (valorNum.indexOf('-', 0) !== -1) {
                    valorNum = valorNum.replace('.', '');
                    valorNum = valorNum.replace('-', '');
                    ultValor = valorNum.substr(valorNum.length - 1, 1);
                    ultValor = meParentP.equivalenteNegativo(ultValor);
                    beanProrate.LO_BREAK = beanProrate.LO_BREAK + meParentP.fillZeros(10, valorNum.substr(0, valorNum.length - 1) + ultValor);
                } else {
                    beanProrate.LO_BREAK = beanProrate.LO_BREAK + meParentP.fillZeros(10, parseFloat(lstGrilla.A713FARE1).toString().replace('.', ''));
                }
            }
            beanProrate.LO_INDST = beanProrate.LO_INDST + meParentP.fillString(lstGrilla.A713TFARE1, 1);
            valorNum = '';
            ultValor = '';
            valorNum = parseFloat(lstGrilla.A713SS1).toString();
            if (valorNum.indexOf('-', 0) !== -1) {
                valorNum = valorNum.replace('.', '');
                valorNum = valorNum.replace('-', '');
                ultValor = valorNum.substr(valorNum.length - 1, 1);
                ultValor = meParentP.equivalenteNegativo(ultValor);
                beanProrate.LO_Q = beanProrate.LO_Q + meParentP.fillZeros(10, valorNum.substr(0, valorNum.length - 1) + ultValor);
            } else {
                beanProrate.LO_Q = beanProrate.LO_Q + meParentP.fillZeros(10, parseFloat(lstGrilla.A713SS1).toString().replace('.', ''));
            }
            valorNum = '';
            ultValor = '';
            valorNum = parseFloat(lstGrilla.A713DIFER1).toString();
            if (valorNum.indexOf('-', 0) !== -1) {
                valorNum = valorNum.replace('.', '');
                valorNum = valorNum.replace('-', '');
                ultValor = valorNum.substr(valorNum.length - 1, 1);
                ultValor = meParentP.equivalenteNegativo(ultValor);
                beanProrate.LO_DIFL = beanProrate.LO_DIFL + meParentP.fillZeros(10, valorNum.substr(0, valorNum.length - 1) + ultValor);
            } else {
                beanProrate.LO_DIFL = beanProrate.LO_DIFL + meParentP.fillZeros(10, parseFloat(lstGrilla.A713DIFER1).toString().replace('.', ''));
            }
            beanProrate.LO_INDIF = beanProrate.LO_INDIF + meParentP.fillString(lstGrilla.A713FDIFE1, 1);
            valorNum = '';
            ultValor = '';
            valorNum = parseFloat(lstGrilla.A713ACUEO1).toString();
            if (valorNum.indexOf('-', 0) !== -1) {
                valorNum = valorNum.replace('.', '');
                valorNum = valorNum.replace('-', '');
                ultValor = valorNum.substr(valorNum.length - 1, 1);
                ultValor = meParentP.equivalenteNegativo(ultValor);
                beanProrate.LO_ACU_I = beanProrate.LO_ACU_I + meParentP.fillZeros(10, valorNum.substr(0, valorNum.length - 1) + ultValor);
            } else {
                beanProrate.LO_ACU_I = beanProrate.LO_ACU_I + meParentP.fillZeros(10, parseFloat(lstGrilla.A713ACUEO1).toString().replace('.', ''));
            }
            beanProrate.LO_TFM_MDA = beanProrate.LO_TFM_MDA + meParentP.fillString(lstGrilla.A713MNTFM1, 3);
            valorNum = '';
            ultValor = '';
            valorNum = parseFloat(lstGrilla.A713TRFM1).toString();
            if (valorNum.indexOf('-', 0) !== -1) {
                valorNum = valorNum.replace('.', '');
                valorNum = valorNum.replace('-', '');
                ultValor = valorNum.substr(valorNum.length - 1, 1);
                ultValor = meParentP.equivalenteNegativo(ultValor);
                beanProrate.LO_TFM_I = beanProrate.LO_TFM_I + meParentP.fillZeros(10, valorNum.substr(0, valorNum.length - 1) + ultValor);
            } else {
                beanProrate.LO_TFM_I = beanProrate.LO_TFM_I + meParentP.fillZeros(10, parseFloat(lstGrilla.A713MNTFM1).toString().replace('.', ''));
            }
            beanProrate.LO_BOLETO = beanProrate.LO_BOLETO + lstGrilla.TICKET + lstGrilla.A713CUPON;
            valorNum = '';
            ultValor = '';
            valorNum = parseFloat(lstGrilla.A713QIN1).toString();
            if (valorNum.indexOf('-', 0) !== -1) {
                valorNum = valorNum.replace('.', '');
                valorNum = valorNum.replace('-', '');
                ultValor = valorNum.substr(valorNum.length - 1, 1);
                ultValor = meParentP.equivalenteNegativo(ultValor);
                beanProrate.LK_Q_IN = beanProrate.LK_Q_IN + meParentP.fillZeros(10, valorNum.substr(0, valorNum.length - 1) + ultValor);
            } else {
                beanProrate.LK_Q_IN = beanProrate.LK_Q_IN + meParentP.fillZeros(10, parseFloat(lstGrilla.A713QIN1).toString().replace('.', ''));
            }
            valorNum = '';
            ultValor = '';
            valorNum = parseFloat(lstGrilla.A713PRRCM1).toString();
            if (valorNum.indexOf('-', 0) !== -1) {
                valorNum = valorNum.replace('.', '');
                valorNum = valorNum.replace('-', '');
                ultValor = valorNum.substr(valorNum.length - 1, 1);
                ultValor = meParentP.equivalenteNegativo(ultValor);
                beanProrate.LK_PRRCOMM = beanProrate.LK_PRRCOMM + meParentP.fillZeros(10, valorNum.substr(0, valorNum.length - 1) + ultValor);
            } else {
                beanProrate.LK_PRRCOMM = beanProrate.LK_PRRCOMM + meParentP.fillZeros(10, parseFloat(lstGrilla.A713PRRCM1).toString().replace('.', ''));
            }
            beanProrate.FARERV = parseFloat(Ext.getCmp(meParentP.id + '-txtTarifLAN').getValue());
            beanProrate.CURR = Ext.getCmp(meParentP.id + '-txtCurTarifLAN').getValue();
            beanProrate.BASEFARE = parseFloat(Ext.getCmp(meParentP.id + '-txtEqvPag').getValue());
            beanProrate.MDABFARE = Ext.getCmp(meParentP.id + '-txtCurEqvPag').getValue();
            beanProrate.PORCOM = parseFloat(Ext.getCmp(meParentP.id + '-txtDsctoComis').getValue());
            beanProrate.CIAI = meParentP.beanP.VP_CIA;
            beanProrate.FORMAI = meParentP.beanP.VP_FORMA;
            beanProrate.SERIEI = meParentP.beanP.VP_SERIE;
            beanProrate.CUPON1 = meParentP.beanP.IN_CUPON1;
            beanProrate.CUPON2 = meParentP.beanP.IN_CUPON2;
            beanProrate.CUPON3 = meParentP.beanP.IN_CUPON3;
            beanProrate.CUPON4 = meParentP.beanP.IN_CUPON4;

            i++;
        });

        return beanProrate;
    },
    equivalenteNegativo: function (data) {
        var strReturn = '';
        switch (data) {
            case '-0':
                strReturn = '}';
                break;
            case '-1':
                strReturn = 'J';
                break;
            case '-2':
                strReturn = 'K';
                break;
            case '-3':
                strReturn = 'L';
                break;
            case '-4':
                strReturn = 'M';
                break;
            case '-5':
                strReturn = 'N';
                break;
            case '-6':
                strReturn = 'O';
                break;
            case '-7':
                strReturn = 'P';
                break;
            case '-8':
                strReturn = 'Q';
                break;
            case '-9':
                strReturn = 'R';
                break;
        }

        return strReturn;
    },
    fillZeros: function (size, value) {
        for (var i = value.length; i < size; i++) {
            value = '0' + value;
        }
        return value;
    },
    fillString: function (field, len) {
        if (field === null || field === undefined) {
            field = '';
        }

        for (var i = field.length; i < len; i++) {
            field = field + ' ';
        }

        return field;
    },
    ValidaFecha: function (fecha) {
        var bFecha = false;

        /*if(isNaN(fecha) === false){
         if(fecha.substring(4, 2) > 12 || fecha.Substring(6, 2) > 31){
         bFecha = true;
         }else{
         bFecha = false;
         }
         }else{
         bFecha = true;
         }*/

        var anio = fecha.substring(0, 4);
        var mes = fecha.substring(4, 6);
        var dia = fecha.substring(6, 8);

        if (dia < 1 || dia > 31) {
            bFecha = true;
        }
        if (mes < 1 || mes > 12) {
            bFecha = true;
        }
        if ((mes === 4 || mes === 6 || mes === 9 || mes === 11) && dia === 31) {
            bFecha = true;
        }
        if (mes === 2) { // bisiesto
            var bisiesto = (anio % 4 === 0 && (anio % 100 !== 0 || anio % 400 === 0));
            if (dia > 29 || (dia === 29 && !bisiesto)) {
                bFecha = true;
            }
        }

        return bFecha;
    },
    ValidaNumFecVlo: function () {
        var store = Ext.getCmp(meParentP.id + '-DgView').getStore().data.items;

        store.forEach(function callback(currentValue, index, array) {
            var data = currentValue.data;
            //Número de Vuelo Mkt
            if (data.A713NVLO1.indexOf('@') !== -1) {
                meParentP.bMalItinerario = true;
                return;
            } else if (data.A713NVLO1 === 'OPEN' || data.A713NVLO1 === 'CLOSE' || data.A713NVLO1 === 'VOID') {

            } else if (isNaN(data.A713NVLO1) === true) {
                meParentP.bMalItinerario = true;
                return;
            }

            //Fecha de Vuelo
            if (data.A713FVLO1.indexOf('@') !== -1) {
                meParentP.bMalItinerario = true;
                return;
            } else if (data.A713FVLO1 === 'OPEN' || data.A713FVLO1 === 'CLOSE' || data.A713FVLO1 === 'VOID') {

            } else {
                if (data.A713FVLO1.length === 8) {
                    meParentP.bMalItinerario = meParentP.ValidaFecha(data.A713FVLO1);
                    return;
                } else {
                    meParentP.bMalItinerario = true;
                    return;
                }
            }
        });
    },
    ValidaCityCarrierInfo: function () {

    },
    saveRefund: function (params) {
        var me = this;

        Ext.Ajax.request({
            url: CONTEXTPATH + '/Prorate//manRefundCoupon',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(params)},
            //beforerequest: Ext.getCmp(me.id).mask('Loading...', ''),
            success: function (response, opts) {
                //Ext.getBody().unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    if (res.strResult !== undefined) {
                        console.log(res.strResult);

                        //Ext.getCmp(me.id).unmask('Loading...', '');                    
                        global.Msg({msg: 'Ticket has been saved'});
                    } else {
                        global.Msg({msg: 'Error'});
                    }
                } else
                    global.Msg({msg: res.sesion});
            },
            failure: function (response, opts) {
                //Ext.getCmp(me.id).unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    saveProrate: function () {
        var store = Ext.getCmp(meParentP.id + '-DgView').getStore().data.items;
        var objGrid = {};

        if (meParentP.beanP.IN_TDOC === 'VOU') {
            var data = store[0].data;
            data.A713CONEX1 = '';
            data.A713RUTA0 = '';
            data.A713RUTA1 = '';
            data.A713CARRA1 = '';
            data.A713NVLO1 = '';
            data.A713FVLO1 = '';
            data.A713FBUSO1 = '';
            objGrid = meParentP.getDataItemGrid(data);
            console.log(objGrid);
            //meParentP.saveRefund(objGrid);
        } else {
            store.forEach(function callback(currentValue, index, array) {
                var data = currentValue.data;
                objGrid = meParentP.getDataItemGrid(data);

                console.log(objGrid);
                if (objGrid.A713RUTA0 !== '') {
                    //meParentP.saveRefund(objGrid);
                }
            });
        }
    },
    executeProrate: function (param) {
        Ext.Ajax.request({
            url: CONTEXTPATH + '/Prorate//prorateTicket',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(param)},
            //beforerequest: Ext.getCmp(me.id).mask('Loading...', ''),
            success: function (response, opts) {
                //Ext.getBody().unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    if (res.strResult !== undefined) {
                        if (res.strResult.length > 0) {
                            meParentP.showPreviewProrate(res.strResult);
                        }
                        //Ext.getCmp(me.id).unmask('Loading...', '');
                    } else {
                        //global.Msg({msg: 'There is no sale ex rate for '});
                    }
                } else
                    global.Msg({msg: res.sesion});
            },
            failure: function (response, opts) {
                //Ext.getCmp(me.id).unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    onBtnDeliveryClick: function () {
      var me= this;      
//      
//      var param = {
//          FUENTE : meParentP.beanP.IN_FTE,
//          TDNR : meParentP.beanP.VP_CIA + meParentP.beanP.VP_FORMA + meParentP.beanP.VP_SERIE,
//          SEQTKT : meParentP.beanP.VP_SEQ,
//          IDFILE : ''
//      };
//      
//      meParentP.showPreviewDelivery(param);   
        var bean = {};
        bean.TDNR = meParentP.beanP.VP_CIA + meParentP.beanP.VP_FORMA + meParentP.beanP.VP_SERIE;
        bean.FUENTE = meParentP.beanP.IN_FTE;//Ext.getCmp(prototype.idSale + '-det-lblSource').getValue().trim().substr(0, 3);
        if (bean.TDNR !== '' && bean.FUENTE !== '') {
            bean.A720TKVOID = '';//this.gloA720TKVOID;
            Ext.Ajax.request({
            //url: prototype.ProrrateoNew.url + '/searchDelivery',
            url: CONTEXTPATH + '/ScrProrrateoNew/searchDelivery',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var texto = res.strTextoBSP;
                    if (texto !== '') {
                        Ext.create('Ext.Praxis.view.screens.CtrlDeliveryOrigForm', {
                            id: 'CtrlDeliveryOrigForm',
                            params: {
                                strTexto: texto,
                                strVoid: ''//me1.gloA720TKVOID
                            }
                        }).show();
                    }
                } else
                    global.Msg({msg: res.sesion});
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
        }
    },
    
    onBtnSaveClick: function () {
        var me1 = this;

        if (meParentP.beanP.IN_EDITABLE) {
            if ((meParentP.beanAccess.PERMC === 'Y' || meParentP.beanAccess.PERMM === 'Y') && meParentP.beanP.IN_STATUS !== 'CLOSED') {
                meParentP.saveProrate();
            } else {
                global.Msg({msg: 'Ticket readonly.'});
            }
        } else {
            global.Msg({msg: 'Ticket readonly.'});
        }
    },
    onBtnColumnsClick: function () {
        var me = this;
        var data = Ext.getCmp(meParentP.id + '-DgView');

        meParentP.showPreviewColumns(data);
    },
    onBtnProrateTicketClick: function () {
        var me1 = this;

        if (meParentP.beanP.IN_EDITABLE) {
            if ((meParentP.beanAccess.PERMC === 'Y' || meParentP.beanAccess.PERMM === 'Y') && meParentP.beanP.IN_STATUS !== 'CLOSED') {
                var beanProrate = meParentP.getDataProrate();
                console.log(beanProrate);
                meParentP.ValidaNumFecVlo();
                meParentP.ValidaCityCarrierInfo();

                if (meParentP.bMalItinerario) {
                    global.Msg({msg: 'Invalid flight number or flight date in itinerary.'});
                } else {
                    //meParentP.executeProrate(beanProrate); 
                    var lstProrate = [];

                    //Data de prueba
                    lstProrate.push({
                        CPNPR: 1,
                        A720RUTAO: "MEX",
                        A720RUTAD: "IAH",
                        A720CONEX: "X",
                        A720CARRA: "AM",
                        A720NVLO: "0001",
                        A720FVLO: "20190101",
                        A720BOOKI: "",
                        A720CLASE: "Y",
                        A720FBUSO: "*",
                        A720TBASE: "S",
                        A720STBAS: "*",
                        A720TDESC: "*",
                        A720PORDS: 8.34,
                        A720FARE: 45.31,
                        A720TFARE: "D",
                        A720SS: 6.23,
                        A720VLSRP: 3.52,
                        A720VLMPA: 3.63,
                        A720ACUEO: 5.02,
                        A720ACUCD: "A",
                        A720ISC: 7.08,
                        A720VALOR: 4.34,
                        A720AJUST: 6.77,
                        A720Q: 0.43,
                        A720FACT: "A",
                        A720PPRO: "B",
                        A720PROV: "C",
                        A720PRRCM: "D",
                        A720PRSCM: 0.00, //default
                        A720YQ: 0.00, //default
                        A720INDPR: "F",
                        A720VIA: "G",
                        A720DIFL: 9.23,
                        A720INDIF: "N",
                        A720TRFM: 3.65,
                        A720MNTFM: "H",
                        A720ACUE: 1.67,
                        A720QIN: 6.21,
                        A720TAJUST: 4.42,
                        A720YANQ: 2.54,
                        LO_TXTLOG: "I",
                        LK_ESTADO: "J",
                        LK_CODERROR: "K",
                        LK_MSJERROR: "L"
                    });

                    lstProrate.push({
                        CPNPR: 2,
                        A720RUTAO: "IAH",
                        A720RUTAD: "LIM",
                        A720CONEX: "X",
                        A720CARRA: "AM",
                        A720NVLO: "0002",
                        A720FVLO: "20190105",
                        A720BOOKI: "H",
                        A720CLASE: "Y",
                        A720FBUSO: "T",
                        A720TBASE: "S",
                        A720STBAS: "E",
                        A720TDESC: "J",
                        A720PORDS: 8.34,
                        A720FARE: 45.31,
                        A720TFARE: "M",
                        A720SS: 6.23,
                        A720VLSRP: 3.52,
                        A720VLMPA: 3.63,
                        A720ACUEO: 5.02,
                        A720ACUCD: "N",
                        A720ISC: 7.08,
                        A720VALOR: 4.34,
                        A720AJUST: 6.77,
                        A720Q: 0.43,
                        A720FACT: "O",
                        A720PPRO: "P",
                        A720PROV: "Q",
                        A720PRRCM: "R",
                        A720PRSCM: 0.00, //default
                        A720YQ: 0.00, //default
                        A720INDPR: "S",
                        A720VIA: "T",
                        A720DIFL: 9.23,
                        A720INDIF: "U",
                        A720TRFM: 3.65,
                        A720MNTFM: "V",
                        A720ACUE: 1.67,
                        A720QIN: 6.21,
                        A720TAJUST: 4.42,
                        A720YANQ: 2.54,
                        LO_TXTLOG: "W",
                        LK_ESTADO: "X",
                        LK_CODERROR: "Y",
                        LK_MSJERROR: "Z"
                    });
                    meParentP.showPreviewProrate(lstProrate);
                }
            } else {
                global.Msg({msg: 'Ticket readonly.'});
            }
        } else {
            global.Msg({msg: 'Ticket readonly.'});
        }
    }
});
