
Ext.define('Ext.Praxis.view.widgets.facsimil', {
    extend: 'Ext.container.Container',
    alias: 'widget.facsimil',
    /*requires: [    
     'Ext.Praxis.controller.widgets.facsimilController'
     ],
     controller: 'facsimilController',*/
    bean: {},
    beanGrid: {},
    lista: new Array(),
    IndexCnj: 0,
    listaCnj: new Array(),
    meParent: '',
    //modal: true,
    constructor: function (config) {
        var me = this;
        me.config_ = config;
        me.id = config.id;

        me.items = [
            {
                xtype: 'form',
                id: me.id + '-form',
                defaults: {
                    border: false,
                    bodyStyle: 'background: #E6EFF5;',
                },
                border: false,
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
                                width: 380,
                                defaults: {
                                    border: false,
                                    style: 'margin: 2px;',
                                    bodyStyle: 'background: #E6EFF5;'
                                },
                                items: [
                                    {
                                        xtype: 'panel',
                                        layout: 'hbox',
                                        defaults: {
                                            xtype: 'textfield',
                                            labelStyle: 'font-weight: bold; font-size: 11px;',
                                            readOnly: true
                                        },
                                        items: [
                                            {
                                                fieldLabel: 'Issued By',
                                                id: me.id + '-txtIssuedBy',
                                                labelWidth: 100,
                                                flex: 1
                                            },
                                            {
                                                fieldLabel: 'SRC',
                                                id: me.id + '-txtRPSI',
                                                labelWidth: 35,
                                                width: 80,
                                                labelAlign: 'right'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'panel',
                                        layout: 'hbox',
                                        defaults: {
                                            xtype: 'label',
                                            style: 'font-weight: bold; font-size: 11px;'
                                        },
                                        items: [
                                            {
                                                text: 'Endorsements/Restrictions',
                                                width: 200
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'panel',
                                        layout: 'hbox',
                                        defaults: {
                                            labelStyle: 'font-weight: bold; font-size: 11px;',
                                            readOnly: true
                                        },
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                id: me.id + '-txtEndRes',
                                                hideLabel: true,
                                                flex: 1
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'panel',
                                        layout: 'hbox',
                                        defaults: {
                                            xtype: 'textfield',
                                            labelStyle: 'font-weight: bold; font-size: 11px;',
                                            readOnly: true
                                        },
                                        items: [
                                            {
                                                fieldLabel: 'Name of Passenger',
                                                id: me.id + '-txtPassenger',
                                                labelWidth: 120,
                                                flex: 1
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'panel',
                                        layout: 'hbox',
                                        defaults: {
                                            xtype: 'textfield',
                                            labelStyle: 'font-weight: bold; font-size: 11px;',
                                            readOnly: true
                                        },
                                        items: [
                                            {
                                                fieldLabel: 'Original Issue',
                                                id: me.id + '-lnkOriIssue',
                                                labelWidth: 120,
                                                flex: 1
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'panel',
                                width: 150,
                                defaults: {
                                    border: false,
                                    style: 'margin: 3px',
                                    bodyStyle: 'background: #E6EFF5;'
                                },
                                items: [
                                    {
                                        xtype: 'panel',
                                        layout: 'hbox',
                                        defaults: {
                                            xtype: 'textfield',
                                            labelStyle: 'font-weight: bold; font-size: 11px;',
                                            readOnly: true
                                        },
                                        items: [
                                            {
                                                fieldLabel: 'Passenger Ticket - Baggage Check',
                                                id: me.id + '-txtPassBagg',
                                                labelWidth: 100,
                                                flex: 1
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'panel',
                                        layout: 'hbox',
                                        defaults: {
                                            xtype: 'textfield',
                                            labelStyle: 'font-weight: bold; font-size: 11px;',
                                            readOnly: true
                                        },
                                        items: [
                                            {
                                                fieldLabel: 'Tour Code',
                                                id: me.id + '-txtTourCode',
                                                labelWidth: 100,
                                                flex: 1
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'panel',
                                        layout: 'hbox',
                                        defaults: {
                                            xtype: 'textfield',
                                            labelCls: 'cls-facsimil-label-top',
                                            readOnly: true
                                        },
                                        items: [
                                            {
                                                fieldLabel: 'Conjuntion Tickets',
                                                id: me.id + '-txtConjTkts',
                                                labelAlign: 'top',
                                                flex: 1
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'panel',
                                flex: 1,
                                defaults: {
                                    border: false,
                                    style: 'margin: 1px',
                                    bodyStyle: 'background: #E6EFF5;'
                                },
                                items: [
                                    {
                                        xtype: 'panel',
                                        layout: 'hbox',
                                        defaults: {
                                            border: false,
                                            style: 'margin: 2px',
                                            bodyStyle: 'background: #E6EFF5;'
                                        },
                                        items: [
                                            {
                                                xtype: 'panel',
                                                flex: 1,
                                                defaults: {
                                                    border: false,
                                                    bodyStyle: 'background: #E6EFF5;',
                                                    style: 'margin: 1px'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'panel',
                                                        layout: 'hbox',
                                                        defaults: {
                                                            xtype: 'textfield',
                                                            labelCls: 'cls-facsimil-label-top-special',
                                                            readOnly: true
                                                        },
                                                        items: [
                                                            {
                                                                fieldLabel: 'Origin/Destination',
                                                                id: me.id + '-txtOriDes',
                                                                labelAlign: 'top',
                                                                flex: 1
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'panel',
                                                        layout: 'hbox',
                                                        defaults: {
                                                            xtype: 'textfield',
                                                            labelCls: 'cls-facsimil-label-top-special',
                                                            readOnly: true
                                                        },
                                                        items: [
                                                            {
                                                                fieldLabel: 'Booking',
                                                                id: me.id + '-txtBookingRef',
                                                                labelWidth: 50,
                                                                flex: 1
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'panel',
                                                flex: 1,
                                                defaults: {
                                                    border: false,
                                                    bodyStyle: 'background: #E6EFF5;',
                                                    style: 'margin: 1px'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'panel',
                                                        layout: 'hbox',
                                                        defaults: {
                                                            xtype: 'textfield',
                                                            labelCls: 'cls-facsimil-label-top-special',
                                                            readOnly: true
                                                        },
                                                        items: [
                                                            {
                                                                fieldLabel: 'Date/Place of Issue',
                                                                id: me.id + '-txtDatePlaceIssue',
                                                                labelAlign: 'top',
                                                                flex: 1
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'panel',
                                                        layout: 'hbox',
                                                        defaults: {
                                                            xtype: 'textfield',
                                                            labelCls: 'cls-facsimil-label-top-special',
                                                            readOnly: true
                                                        },
                                                        items: [
                                                            {
                                                                id: me.id + '-txtAgentNum',
                                                                hideLabel: true,
                                                                flex: 1
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'panel',
                                        layout: 'hbox',
                                        defaults: {
                                            xtype: 'textfield',
                                            labelCls: 'cls-facsimil-label-top-special',
                                            readOnly: true
                                        },
                                        items: [
                                            {
                                                fieldLabel: 'Issued in Exchange',
                                                id: me.id + '-lnkIssuedEx',
                                                labelAlign: 'top',
                                                flex: 1
                                            }
                                        ]
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
                                height: 100,
                                flex: 1,
                                columns: {
                                    items: [
                                        {text: '<span style="font-size: 10px;">CPN</span>', dataIndex: 'CPN', width: 35},
                                        {text: '<span style="font-size: 10px;">X/O</span>', dataIndex: 'STPO', width: 35},
                                        {text: '<span style="font-size: 10px;">FROM</span>', dataIndex: 'ORAC', width: 70},
                                        {text: '<span style="font-size: 10px;">TO</span>', dataIndex: 'DSTC', width: 70},
                                        {text: '<span style="font-size: 10px;">CR</span>', dataIndex: 'CARR', width: 35},
                                        {text: '<span style="font-size: 10px;">FLIGHT</span>', dataIndex: 'FTNR', width: 55},
                                        {text: '<span style="font-size: 10px;">CLASS</span>', dataIndex: 'RBKD', width: 55},
                                        {text: '<span style="font-size: 10px;">DATE</span>', dataIndex: 'FTDA', width: 50},
                                        {text: '<span style="font-size: 10px;">TIME</span>', dataIndex: 'FTDT', width: 50},
                                        {text: '<span style="font-size: 10px;">FARE BASIS</span>', dataIndex: 'FBTD', flex: 1},
                                        {text: '<span style="font-size: 10px;">NVB</span>', dataIndex: 'NBDA', width: 55},
                                        {text: '<span style="font-size: 10px;">NVA</span>', dataIndex: 'NADA', width: 55},
                                        {text: '<span style="font-size: 10px;">USED</span>', dataIndex: 'strUso', width: 45}
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
                        defaults: {
                            border: false,
                            style: 'margin: 2px',
                            bodyStyle: 'background: #E6EFF5;'
                        },
                        items: [
                            {
                                xtype: 'panel',
                                width: 200,
                                defaults: {
                                    border: false,
                                    style: 'margin: 2px',
                                    bodyStyle: 'background: #E6EFF5;'
                                },
                                items: [
                                    {
                                        xtype: 'panel',
                                        layout: 'hbox',
                                        defaults: {
                                            xtype: 'textfield',
                                            labelCls: 'cls-facsimil-label',
                                            readOnly: true
                                        },
                                        items: [
                                            {
                                                fieldLabel: 'Fare',
                                                id: me.id + '-txtFare',
                                                labelWidth: 50,
                                                flex: 1
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'panel',
                                        layout: 'hbox',
                                        defaults: {
                                            xtype: 'textfield',
                                            labelCls: 'cls-facsimil-label',
                                            readOnly: true
                                        },
                                        items: [
                                            {
                                                fieldLabel: 'Eqv.Fare',
                                                id: me.id + '-txtEqvFare',
                                                labelWidth: 50,
                                                flex: 1
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'panel',
                                        layout: 'hbox',
                                        defaults: {
                                            xtype: 'textfield',
                                            labelCls: 'cls-facsimil-label',
                                            readOnly: true
                                        },
                                        items: [
                                            {
                                                fieldLabel: 'Tax',
                                                id: me.id + '-txtTax1',
                                                labelWidth: 50,
                                                flex: 1
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'panel',
                                        layout: 'hbox',
                                        defaults: {
                                            xtype: 'textfield',
                                            labelCls: 'cls-facsimil-label',
                                            readOnly: true
                                        },
                                        items: [
                                            {
                                                fieldLabel: 'Tax',
                                                id: me.id + '-txtTax2',
                                                labelWidth: 50,
                                                flex: 1
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'panel',
                                        layout: 'hbox',
                                        defaults: {
                                            xtype: 'textfield',
                                            labelCls: 'cls-facsimil-label',
                                            readOnly: true
                                        },
                                        items: [
                                            {
                                                fieldLabel: 'Tax',
                                                id: me.id + '-txtTax3',
                                                labelWidth: 50,
                                                flex: 1
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'panel',
                                        layout: 'hbox',
                                        defaults: {
                                            xtype: 'textfield',
                                            labelCls: 'cls-facsimil-label',
                                            readOnly: true
                                        },
                                        items: [
                                            {
                                                fieldLabel: 'Total',
                                                id: me.id + '-txtTotal',
                                                labelWidth: 50,
                                                flex: 1
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'panel',
                                flex: 1,
                                defaults: {
                                    border: false,
                                    bodyStyle: 'background: #E6EFF5;'
                                },
                                items: [
                                    {
                                        xtype: 'panel',
                                        defaults: {
                                            border: false,
                                            bodyStyle: 'background: #E6EFF5;',
                                            style: 'margin-top: 1px;'
                                        },
                                        items: [
                                            {
                                                xtype: 'panel',
                                                layout: 'hbox',
                                                defaults: {
                                                    labelCls: 'cls-facsimil-label-top',
                                                    readOnly: true
                                                },
                                                items: [
                                                    {
                                                        xtype: 'textarea',
                                                        id: me.id + '-rtxtFareCalc',
                                                        fieldLabel: 'FARE CALC',
                                                        labelWidth: 75,
                                                        labelAlign: 'top',
                                                        flex: 1,
                                                        grow: true,
                                                        height: 50
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'panel',
                                                layout: 'hbox',
                                                defaults: {
                                                    readOnly: true
                                                },
                                                items: [
                                                    {
                                                        xtype: 'textarea',
                                                        id: me.id + '-rtxtTax',
                                                        hideLabel: true,
                                                        flex: 1,
                                                        grow: true,
                                                        height: 40
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'panel',
                                        defaults: {
                                            border: false,
                                            style: 'margin-top: 1px;',
                                            bodyStyle: 'background: #E6EFF5;'
                                        },
                                        items: [
                                            {
                                                xtype: 'panel',
                                                layout: 'hbox',
                                                defaults: {
                                                    labelStyle: 'font-weight: bold; font-size: 11px;',
                                                    style: 'font-weight: bold; font-size: 18px;',
                                                    readOnly: true
                                                },
                                                items: [
                                                    {
                                                        xtype: 'textfield',
                                                        fieldLabel: 'Form of Payment',
                                                        id: me.id + '-txtFormPay',
                                                        labelWidth: 120,
                                                        width: 550
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'panel',
                                                layout: 'hbox',
                                                defaults: {
                                                    labelStyle: 'font-weight: bold; font-size: 11px;',
                                                    style: 'font-weight: bold; font-size: 18px;',
                                                    readOnly: true,
                                                    border: false
                                                },
                                                items: [
                                                    {
                                                        xtype: 'panel',
                                                        width: 200
                                                    },
                                                    {
                                                        xtype: 'label',
                                                        id: me.id + '-txtNumTkt',
                                                        text: '139-9489383806',
                                                        width: 200
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        id: me.id + '-picPrevious',
                                                        iconCls: 'images prev',
                                                        tooltip: '',
                                                        listeners: {
                                                            click: me.onPrevClick
                                                        }
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        id: me.id + '-picNext',
                                                        iconCls: 'images next',
                                                        tooltip: '',
                                                        style: 'margin-left: 4px;',
                                                        listeners: {
                                                            click: me.onNextClick
                                                        }
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        id: me.id + '-picTktOri',
                                                        iconCls: 'images Change',
                                                        tooltip: '',
                                                        style: 'margin-left: 10px;',
                                                        listeners: {
                                                            click: me.onChangeCick
                                                        }
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
        meParent = this;

        me.setStoresGrids();
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

        var bean104 = {};
        bean104.FUENTE = params.IN_FTE;
        bean104.TDNR = params.IN_CIA + params.IN_FORMA + params.IN_SERIE;
        bean104.TRNC = params.IN_TRX;
        bean104.IDFILE = params.IN_IDFIL;

        me.beanGrid = bean104;

        me.loadDataFacsimil(bean104, 'L');
    },
    mostrarData: function () {
        var me = this;

        var tickets = bean.strConjuncion.trim().split(' - ');
        var ticket = '';
        for (var k = 0; k < tickets.length; k++) {
            if (k === 0) {
                ticket = tickets[k].substring(0, 9);
                me.listaCnj.push(tickets[k]);
            } else {
                me.listaCnj.push(ticket + tickets[k]);
            }
        }

        //para el delivery
        var strRestrict = '';
        for (var i = 0; i < bean.lstReg46Restrict.length; i++) {
            strRestrict += Ext.String.trim(String(bean.lstReg46Restrict[i]));
        }

        var strOrigIssue = '';
        for (var e = 0; e < bean.lstReg46OrigIssue.length; e++) {
            strOrigIssue += Ext.String.trim(String(bean.lstReg46OrigIssue[e]));
        }

        Ext.getCmp(me.id + '-txtIssuedBy').setValue('AEROMEXICO');
        Ext.getCmp(me.id + '-txtRPSI').setValue(bean.FUENTE);
        Ext.getCmp(me.id + '-txtEndRes').setValue(Ext.String.trim(strRestrict));
        Ext.getCmp(me.id + '-txtPassenger').setValue(bean.PXNM);
        Ext.getCmp(me.id + '-lnkOriIssue').setValue(strOrigIssue);
        //Ext.getCmp(me.id + '-txtPassBagg').setValue('TKTT');
        Ext.getCmp(me.id + '-txtTourCode').setValue(bean.TOUR);
        Ext.getCmp(me.id + '-txtConjTkts').setValue(bean.strConjuncion);
        Ext.getCmp(me.id + '-txtOriDes').setValue(bean.TODC.substring(0, 3) + ' / ' + bean.TODC.substring(3));
        //Ext.getCmp(me.id + '-txtBookingRef').setValue('Z3KJLZ/1AAA');
        Ext.getCmp(me.id + '-txtDatePlaceIssue').setValue(bean.DAIS);
        Ext.getCmp(me.id + '-txtAgentNum').setValue(bean.AGTN);

        if (bean.strIssExc !== '') {
            Ext.getCmp(me.id + '-lnkIssuedEx').setValue(Ext.String.trim(bean.strIssExc.substring(2, 16)));
        } else {
            Ext.getCmp(me.id + '-lnkIssuedEx').setValue("");
        }

        Ext.getCmp(me.id + '-txtFare').setValue(Ext.String.trim(bean.CUTP1) + "" + Ext.util.Format.number(bean.FARE, '0,000.00'));

        if (bean.EQFR.substring(3) > 0) {
            if (Ext.String.trim(bean.EQFR.substring(0, 3)).length > 0) {
                Ext.getCmp(me.id + '-txtEqvFare').setValue(Ext.String.trim(bean.EQFR.substring(0, 3)) + '' + Ext.util.Format.number(bean.EQFR.substring(3), '0,000.00'));
            } else {
                Ext.getCmp(me.id + '-txtEqvFare').setValue(Ext.String.trim(bean.CUTP1) + '' + Ext.util.Format.number(bean.EQFR.substring(3), '0,000.00'));
            }
        } else {
            Ext.getCmp(me.id + '-txtEqvFare').setValue('');
        }

        if (bean.lstTaxes.length > 0) {
            Ext.getCmp(me.id + '-txtTax1').setValue(bean.lstTaxes[0]);
        }

        if (bean.lstTaxes.length > 1) {
            Ext.getCmp(me.id + '-txtTax2').setValue(bean.lstTaxes[1]);
        }

        if (bean.lstTaxes.length > 2) {
            Ext.getCmp(me.id + '-txtTax3').setValue(bean.lstTaxes[2]);
        }

        var total = 0;
        if (this.tiene_numeros(bean.TOTL.substring(0, 3)) === 1) {
            total = bean.TOTL;
        } else {
            total = bean.TOTL.substring(3, bean.TOTL.length - 1);
        }
        if (Ext.String.trim(Ext.getCmp(me.id + '-txtEqvFare').getValue().substring(0, 3)).length > 0 > 0) {
            Ext.getCmp(me.id + '-txtTotal').setValue(Ext.String.trim(Ext.getCmp(me.id + '-txtEqvFare').getValue().substring(0, 3)) + '' + Ext.util.Format.number(total, '0,000.00'));
        } else {
            Ext.getCmp(me.id + '-txtTotal').setValue(Ext.String.trim(bean.CUTP1) + '' + Ext.util.Format.number(total, '0,000.00'));
        }

        var strFC = '';
        for (var a = 0; a < bean.lstFC.length; a++) {
            strFC += Ext.String.trim(String(bean.lstFC[a]));
        }
        Ext.getCmp(me.id + '-rtxtFareCalc').setValue(Ext.String.trim(strFC));
        //Ext.getCmp(me.id + '-rtxtTax').setValue('');

        var strFOP = '';
        for (var iFop = 0; iFop < bean.lstFOP.length; iFop++) {
            strFOP += Ext.String.trim(String(bean.lstFOP[iFop])) + '\n';
        }
        Ext.getCmp(me.id + '-txtFormPay').setValue(strFOP);

        me.loadDataGrid(bean.lstReg63);
    },
    tiene_numeros: function (texto) {
        var numeros = "0123456789";
        for (i = 0; i < texto.length; i++) {
            if (numeros.indexOf(texto.charAt(i), 0) === -1) {
                return 0;
            }
        }
        return 1;
    },
    setStoresGrids: function () {
        var me = this;
        var grid01 = Ext.getCmp(me.id + '-DgView');
        var store01 = Ext.create('Ext.data.Store', {
            storeId: me.id + '-store-grid01'
        });

        grid01.setStore(store01);
    },
    loadDataFacsimil: function (param, call) {
        var me = this;
        Ext.getCmp(me.id + '-txtNumTkt').setText(param.TDNR.substring(0, 3) + ' - ' + param.TDNR.substring(3));
        //console.log(Ext.getCmp(meParent.id).mask());
        Ext.Ajax.request({
            url: CONTEXTPATH + '/Facsimil/searchFacsimil',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(param)},
            //beforerequest: Ext.getCmp(me.id).mask('Loading...', ''),
            success: function (response, opts) {
                //Ext.getBody().unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    if (res.lstFaximil !== undefined) {
                        if (call === 'L') {
                            bean = res.lstFaximil;
                            //Ext.getCmp(prototype.id+'-lblTicket').setText(me.bean.TDNR.substring(0, 3)+'  '+me.bean.TDNR.substring(3)+'  '+me.bean.CDGT);                        
                            me.mostrarData();
                        } else {
                            me.loadDataGrid(res.lstFaximil.lstReg63);
                        }
                        //Ext.getCmp(me.id).unmask('Loading...', '');
                    } else {
                        global.Msg({msg: 'Data not Found.'});
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
    loadDataGrid: function (listaGrid) {
        var me = this;
        var lstReg63 = new Array();
        var dais = '';
        var contador = 1;

        for (var j = 0; j < listaGrid.length; j++) {
            dais = listaGrid[j]["DAIS"];
            if (dais !== '000000') {
                var beanNew = {
                    CPN: contador,
                    STPO: listaGrid[j]["STPO"],
                    ORAC: listaGrid[j]["ORAC"],
                    DSTC: listaGrid[j]["DSTC"],
                    CARR: listaGrid[j]["CARR"],
                    FTNR: listaGrid[j]["FTNR"],
                    RBKD: listaGrid[j]["RBKD"],
                    FTDA: listaGrid[j]["FTDA"],
                    FTDT: listaGrid[j]["FTDT"],
                    FBTD: listaGrid[j]["FBTD"],
                    NBDA: listaGrid[j]["NBDA"],
                    NADA: listaGrid[j]["NADA"],
                    strUso: listaGrid[j]["strUso"]
                };
                lstReg63.push(beanNew);
            }
            contador++;
        }

        Ext.getCmp(me.id + '-DgView').getStore().removeAll();
        Ext.getCmp(me.id + '-DgView').getStore().loadData(lstReg63);
    },
    onNextClick: function () {
        var me = this;

        if (meParent.listaCnj.length > 0) {
            if (meParent.IndexCnj >= 0 && meParent.IndexCnj < meParent.listaCnj.length - 1) {
                var Numticket = meParent.listaCnj[meParent.IndexCnj + 1];
                meParent.beanGrid.TDNR = Numticket;
                meParent.loadDataFacsimil(meParent.beanGrid, 'P');
                meParent.IndexCnj++;
            }
        }
    },
    onPrevClick: function () {
        var me = this;

        if (meParent.listaCnj.length > 0) {
            if (meParent.IndexCnj > 0 && meParent.IndexCnj <= meParent.listaCnj.length - 1) {
                var Numticket = meParent.listaCnj[meParent.IndexCnj - 1];
                meParent.beanGrid.TDNR = Numticket;
                meParent.loadDataFacsimil(meParent.beanGrid, 'P');
                meParent.IndexCnj--;
            }
        }
    },
    onChangeCick: function () {
        var me = this;

        switch (meParent.beanGrid.IN_TRX) {
            case 'RFND':
                break;
        }
    }
});