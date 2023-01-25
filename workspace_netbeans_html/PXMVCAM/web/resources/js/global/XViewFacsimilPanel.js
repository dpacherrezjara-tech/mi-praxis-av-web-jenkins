/**
 * @class Ext.global.plugin.XViewFacsimilPanel
 * @extends Ext.form.Panel
 * @author jbazan
 */
Ext.define('Ext.global.XViewFacsimilPanel', {
    extend: 'Ext.Container',
    xtype: 'XViewFacsimilPanel',
    defaults: {
        border: false,
        bodyStyle: 'background-color: #E6EFF5;'
    },
    config: {
        layout: 'fit',
        autoScroll: false
    },
    config_: {},
    constructor: function(config) {
        var me = this;

        this.store_DetFac = Ext.create('Ext.data.Store', {
            id: me.id + 'Facsimil-store_DetFac',
            fields: [
                {name: 'CCUST', type: 'string'},
                {name: 'NAID', type: 'float'},
                {name: 'PDAI', type: 'string'},
                {name: 'PBAED', type: 'string'},
                {name: 'SMSG', type: 'string'},
                {name: 'SQNR', type: 'float'},
                {name: 'DAIS', type: 'string'},
                {name: 'TRNN', type: 'float'},
                {name: 'TDNR', type: 'string'},
                {name: 'CDGT', type: 'string'},
                {name: 'SEGI', type: 'float'},
                {name: 'STPO', type: 'string'},
                {name: 'NBDA', type: 'string'},
                {name: 'NADA', type: 'string'},
                {name: 'RESD1', type: 'string'},
                {name: 'ORAC', type: 'string'},
                {name: 'DSTC', type: 'string'},
                {name: 'CARR', type: 'string'},
                {name: 'RESD2', type: 'string'},
                {name: 'FTNR', type: 'string'},
                {name: 'RBKD', type: 'string'},
                {name: 'FTDA', type: 'string'},
                {name: 'RESD3', type: 'string'},
                {name: 'FTDT', type: 'string'},
                {name: 'RESD', type: 'string'},
                {name: 'FBST', type: 'string'},
                {name: 'FBAL', type: 'string'},
                {name: 'RESD4', type: 'string'},
                {name: 'FBTD', type: 'string'},
                {name: 'FFRF', type: 'string'},
                {name: 'RESD5', type: 'string'},
                {name: 'strDescFrom', type: 'string'},
                {name: 'strDescTo', type: 'string'},
                {name: 'strVoid', type: 'string'},
                {name: 'strUso', type: 'string'},
                {name: 'strDesUso', type: 'string'},
                {name: 'strFecUso', type: 'string'},
                {name: 'dblMontoUso', type: 'float'},
                {name: 'strLeg', type: 'string'},
                {name: 'ZONA', type: 'string'},
                {name: 'USCR', type: 'string'},
                {name: 'FECR', type: 'string'},
                {name: 'HOCR', type: 'string'},
                {name: 'USUP', type: 'string'},
                {name: 'FEUP', type: 'string'},
                {name: 'HOUP', type: 'string'}
            ]

        });
        this.store_taxes = Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            data: [],
            fields: ['name']
        });

        me.config_ = config;
        me.id = config.id;

        me.items = [
            {
                xtype: 'panel',
                layout: 'border',
                defaults: {
                    border: false,
                    bodyStyle: 'background-color: #E8F9E8;',
                    style: 'margin: 2px;'
                },
                items: [
                    {
                        region: 'north',
                        height: 150,
                        layout: 'border',
                        defaults: {
                            border: false,
                            style: 'margin: 2px',
                            bodyStyle: 'background: transparent;'
                        },
                        items: [
                            {
                                region: 'west',
                                width: 400,
                                defaults: {
                                    style: 'margin: 2px;',
                                    bodyStyle: 'background: transparent;',
                                    labelStyle: 'font-weight: bold; font-size: 11px;',
                                    border: false,
                                    readOnly: true,
                                    width: '99%'
                                },
                                border: true,
                                items: [
                                    {
                                        xtype: 'textfield',
                                        id: me.id + 'Facsimil-lblNomAer',
                                        fieldLabel: 'ISSUED BY',
                                        flex: 1,
                                        labelWidth: 75
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: me.id + 'Facsimil-txtConj',
                                        fieldLabel: 'CONJUNTION TICKETS',
                                        flex: 1,
                                        labelWidth: 130
                                    },
                                    {
                                        xtype: 'panel',
                                        layout: 'hbox',
                                        defaults: {
                                            labelSeparator: '',
                                            style: 'line-height: 20px; font-weight: bold; font-size: 11px;'
                                        },
                                        items: [
                                            {
                                                xtype: 'label',
                                                text: 'ENDORSEMENTS/RESTRICTIONS:',
                                                flex: 1
                                            },
                                            {
                                                xtype: 'label',
                                                id: me.id + 'Facsimil-lblFuente',
                                                text: 'ASR',
                                                flex: 1
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: me.id + 'Facsimil-txtEndors',
                                        hideLabel: true,
                                        flex: 1
                                    },
                                    {
                                        xtype: 'panel',
                                        layout: 'hbox',
                                        defaults: {
                                            labelAlign: 'top',
                                            readOnly: true
                                        },
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                id: me.id + 'Facsimil-txtPassenger',
                                                labelStyle: 'font-weight: bold; font-size: 11px;',
                                                fieldLabel: 'PASSENGER NAME NOT TRANSFERABLE',
                                                width: 250
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: me.id + 'Facsimil-txtDateIssue',
                                                labelStyle: 'font-weight: bold; font-size: 11px; text-align: center;',
                                                fieldStyle: 'text-align: center;',
                                                fieldLabel: 'DATE OF ISSUE',
                                                width: 144
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                region: 'center',
                                layout: 'border',
                                border: true,
                                defaults: {
                                    bodyStyle: 'background: transparent;',
                                    border: false
                                },
                                items: [
                                    {
                                        region: 'west',
                                        width: 260,
                                        defaults: {
                                            border: false,
                                            style: 'text-align: left; margin: 2px; line-height: 23px;',
                                            labelStyle: 'font-weight: bold; font-size: 11px;',
                                            bodyStyle: 'background: transparent;',
                                            readOnly: true,
                                            width: '99%'
                                        },
                                        items: [
                                            {
                                                xtype: 'label',
                                                style: 'text-align: left; margin: 2px; line-height: 23px; font-weight: bold; font-size: 11px;',
                                                text: 'PASSENGER TICKET AND BAGGAGE CHECKED',
                                                labelSeparator: ''
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: me.id + 'Facsimil-txtOrigDest',
                                                fieldLabel: 'ORIGIN/DESTINATION',
                                                labelWidth: 130
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: me.id + 'Facsimil-txtPNR',
                                                fieldLabel: 'PNR',
                                                labelWidth: 100
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: me.id + 'Facsimil-txtTourC',
                                                fieldLabel: 'TOUR CODE',
                                                labelWidth: 100
                                            },
                                            {
                                                xtype: 'label',
                                                style: 'text-align: left; margin: 2px; line-height: 23px; font-weight: bold; font-size: 11px;',
                                                text: 'ISSUE IN EXCHANGE FOR',
                                                labelSeparator: ''
                                            }
                                        ]
                                    },
                                    {
                                        region: 'center',
                                        id: me.id + 'Facsimil-cont-img',
                                        // bodyStyle: 'background-color: white;',
                                         html: '<div align="middle" style="background-color:white;" ><img src="img/botones/marca.png"  width="128" ></div>',
                                       // bodyStyle: 'background-color: white;background-image:url(img/botones/marca.png)',
                                        items: [
                                            {
                                                xtype: 'panel',
                                                layout: 'vbox',
                                                border: false,
                                                items: [
                                                    {
                                                        xtype: 'label',
                                                        id: me.id + 'Facsimil-lblNomAerImg',
                                                        labelSeparator: '',
                                                        style: 'text-align: center;',
                                                        width: 100
                                                    },
                                                    /* {
                                                     xtype: 'label',
                                                     id: me.id + 'Facsimil-lblAgenteImg',
                                                     labelSeparator: '',
                                                     // style: 'text-align: center; font-size: 20px; font-weight: bold; line-height: 40px;',
                                                     width: 100
                                                     },*/
                                                    {
                                                        xtype: 'label',
                                                        id: me.id + 'Facsimil-lblNomAgenteImg',
                                                        labelSeparator: '',
                                                        //style: 'text-align: center; font-size: 20px; font-weight: bold; line-height: 40px;',
                                                        width: 150
                                                    },
                                                    {
                                                        xtype: 'label',
                                                        id: me.id + 'Facsimil-lblDirAgenteImg',
                                                        labelSeparator: '',
                                                        style: 'text-align: center;font-weight: bold;',
                                                        width: 100
                                                    }

                                                ]
                                            }



                                        ]
                                    },
                                    {
                                        region: 'south',
                                        height: 30,
                                        defaults: {
                                            style: 'margin: 2px; line-height: 23px;',
                                            labelStyle: 'font-weight: bold; font-size: 11px;',
                                            readOnly: true,
                                            width: '99%'
                                        },
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                id: me.id + 'Facsimil-txtIssExc',
                                                hideLabel: true
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        region: 'center',
                        layout: 'fit',
                        defaults: {
                            border: false,
                            style: 'margin: 2px',
                            bodyStyle: 'background: transparent;'
                        },
                        items: [
                            {
                                xtype: 'grid',
                                id: me.id + 'Facsimil-gridDetFac',
                                store: me.store_DetFac, //Ext.create('MasterTicketApp.store.ViewTicketForm.ViewFacsimilGridDetFacs'),
                                columnLines: true,
                                enableColumnHide: false,
                                enableColumnMove: false,
                                enableHdMenu: false,
                                columns: {
                                    defaults: {
                                        menuDisabled: true,
                                        sortable: false,
                                        align: 'center',
                                        cls: 'gridTitle'
                                    },
                                    items: [
                                        {
                                            text: 'X/O',
                                            dataIndex: 'STPO',
                                            width: 30
                                        },
                                        {
                                            text: 'FROM',
                                            dataIndex: 'ORAC',
                                            width: 40
                                        },
                                        {
                                            text: 'TO',
                                            dataIndex: 'DSTC',
                                            width: 35
                                        },
                                        {
                                            text: 'CARRIER',
                                            dataIndex: 'CARR',
                                            width: 55
                                        },
                                        {
                                            text: 'FLIGHT',
                                            dataIndex: 'FTNR',
                                            width: 50
                                        },
                                        {
                                            text: 'CL',
                                            dataIndex: 'RBKD',
                                            width: 30
                                        },
                                        {
                                            text: 'DATE',
                                            dataIndex: 'FTDA',
                                            width: 50
                                        },
                                        {
                                            text: 'TIME',
                                            dataIndex: 'FTDT',
                                            width: 50
                                        },
                                        {
                                            text: 'ST',
                                            dataIndex: 'FBST',
                                            width: 30
                                        },
                                        {
                                            text: 'FARE BASIS',
                                            dataIndex: 'FBTD',
                                            width: 80
                                        },
                                        {
                                            text: 'N.VALID B',
                                            dataIndex: 'NBDA',
                                            width: 70
                                        },
                                        {
                                            text: 'N.VALID A',
                                            dataIndex: 'NADA',
                                            width: 70
                                        },
                                        {
                                            text: 'USE',
                                            dataIndex: 'strUso',
                                            width: 30,
                                            renderer: function(value, metadata) {
                                                metadata.tdAttr = 'data-qtip="' + value + '"';
                                                return value;
                                            }
                                        },
                                        {
                                            text: 'DATE',
                                            dataIndex: 'strFecUso',
                                             width: 50,
                                        },
                                        {
                                            text: 'VALUE',
                                            dataIndex: 'dblMontoUso',
                                            width: 60,
                                            align: 'right',
                                            cls: 'column_header_double',
                                            renderer: function(value, metaData, record, rowIndex) {
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }
                                        },
                                        {
                                            text: 'LEG',
                                            dataIndex: 'strLeg',
                                            width: 40
                                        }
                                    ]
                                }
                            }
                        ]
                    },
                    {
                        region: 'south',
                        height: 160,
                        layout: 'border',
                        defaults: {
                            border: true,
                            style: 'margin: 2px;',
                            bodyStyle: 'background: transparent;'
                        },
                        items: [
                            {
                                region: 'west',
                                width: 230,
                                defaults: {
                                    style: 'margin: 2px',
                                    border: false,
                                    labelStyle: 'font-weight: bold; font-size: 11px;',
                                    fieldStyle: 'text-align: right;',
                                    readOnly: true,
                                    width: '99%'
                                },
                                items: [
                                    {
                                        xtype: 'textfield',
                                        id: me.id + 'Facsimil-txtFare',
                                        fieldLabel: 'FARE',
                                        labelWidth: 50
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: me.id + 'Facsimil-txtEquivFa',
                                        fieldLabel: 'EQUIV',
                                        labelWidth: 50
                                    },
                                    {
                                        xtype: 'panel',
                                        layout: 'hbox',
                                        bodyStyle: 'background: transparent;',
                                        defaults: {
                                            style: 'margin: 1px;',
                                            labelStyle: 'font-weight: bold; font-size: 11px;'
                                        },
                                        items: [
                                            {
                                                xtype: 'multiselect',
                                                id: me.id + 'Facsimil-txtTaxes',
                                                fieldLabel: 'Taxes',
                                                style: 'text-align: right;',
                                                labelWidth: 50,
                                                //labelAlign: 'right',
                                                height: 60,
                                                flex: 1,
                                                store: me.store_taxes, //Ext.create('MasterTicketApp.store.ViewTicketForm.ViewFacsimilTaxes'),
                                                valueField: 'name',
                                                displayField: 'name'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: me.id + 'Facsimil-txtTotal',
                                        fieldLabel: 'TOTAL',
                                        labelWidth: 50
                                    }
                                ]
                            },
                            {
                                region: 'center',
                                defaults: {
                                    style: 'margin: 2px',
                                    border: false,
                                    labelStyle: 'font-weight: bold; font-size: 11px;',
                                    fieldStyle: 'text-align: left; font-size: 11px;',
                                    readOnly: true,
                                    width: '99%'
                                },
                                items: [
                                    {
                                        xtype: 'textarea',
                                        id: me.id + 'Facsimil-txtFareCal',
                                        fieldLabel: 'FARE CALC',
                                        labelWidth: 70,
                                        height: 50,
                                        grow: true
                                    },
                                    {
                                        xtype: 'textarea',
                                        id: me.id + 'Facsimil-txtFormPay',
                                        fieldLabel: 'FOP',
                                        labelWidth: 70,
                                        height: 50,
                                        grow: true
                                    },
                                    {
                                        xtype: 'panel',
                                        layout: 'hbox',
                                        bodyStyle: 'background: transparent;',
                                        defaults: {
                                            style: 'margin: 1px;',
                                            labelStyle: 'font-weight: bold; font-size: 11px;',
                                            readOnly: true
                                        },
                                        items: [
                                            {
                                                xtype: 'label',
                                                id: me.id + 'Facsimil-lblTicket',
                                                text: '139 2188593211 3',
                                                labelSeparator: '',
                                                style: 'text-align: center; font-size: 20px; font-weight: bold; line-height: 40px;',
                                                width: 250
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: me.id + 'Facsimil-txtORIN',
                                                fieldLabel: 'ORIGINAL ISSUE',
                                                labelWidth: 110,
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
        ];
        me.callParent();
    },
    salir: function() {
        Ext.getCmp(this.id + '-win').close();
    }
});