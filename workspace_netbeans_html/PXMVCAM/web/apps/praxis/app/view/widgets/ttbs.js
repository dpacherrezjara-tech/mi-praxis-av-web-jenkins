
Ext.define('Ext.Praxis.view.widgets.ttbs', {
    extend: 'Ext.container.Container',
    alias: 'widget.ttbs',
    requires: [
        //'Ext.Praxis.controller.widgets.ttbsController'
    ],
    //controller: 'ttbsController',
    searchParams: {},
    searchParamsCity: {},
    lstTax: {},
    lstAirport: {},
    VP_DATE: '',
    VP_COUNTRY: '',
    idTax: '',
    meParentP: '',
    fecha: new Date(),
    page: 0,
    airportrecord: null,
    airportindex: -1,
    modo: '',
    constructor: function(config) {
        var me = this;
        me.config_ = config;
        me.id = config.id;

        //@jmeiggs
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
                                //height: 95,
                                width: 1300,
                                items: [
                                    {
                                        //xtype: 'fieldset',
                                        xtype: 'panel',
                                        title: '<b style="font-size:12px">TTBS<b/>',
                                        bodyStyle: 'background: #E5ECEF',
                                        margin: '1 5 0 0',
                                        defaults: {
                                            border: false
                                        },
                                        items: [
                                            {
                                                xtype: 'tbspacer',
                                                height: 5
                                            },
                                            {
                                                xtype: 'panel',
                                                bodyStyle: 'background: transparent',
                                                id: me.id + '-panelFilters',
                                                border: false,
                                                layout: 'column',
                                                defaults: {
                                                    fieldStyle: 'text-align: center;',
                                                    padding: '8px 5px 8px 5px',
                                                    anchor: '100%'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'label',
                                                        text: 'Invoice Date:',
                                                        style: 'font-weight:bold;',
                                                        padding: '10 5 5 5'
                                                    },
                                                    , {xtype: 'tbspacer', width: 5},
                                                    {
                                                        xtype: 'combo',
                                                        id: me.id + '-cmbDateYear',
                                                        fieldStyle: 'text-align: left;',
                                                        required: true,
                                                        disabled: false,
                                                        fieldLabel: '',
                                                        width: 70,
                                                        labelWidth: 0,
                                                        labelAlign: 'left',
                                                        queryMode: 'local',
                                                        triggerAction: 'all',
                                                        valueField: 'code',
                                                        displayField: 'name'
                                                    },
                                                    {
                                                        xtype: 'combo',
                                                        id: me.id + '-cmbDateMonth',
                                                        fieldStyle: 'text-align: left;',
                                                        required: true,
                                                        disabled: false,
                                                        fieldLabel: '',
                                                        width: 55,
                                                        labelWidth: 0,
                                                        labelAlign: 'left',
                                                        queryMode: 'local',
                                                        triggerAction: 'all',
                                                        valueField: 'code',
                                                        displayField: 'name'
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        text: 'Search',
                                                        id: me.id + '-btnSearch',
                                                        iconCls: 'prx-icon-search',
                                                        tooltip: 'Search',
                                                        listeners: {
                                                            click: me.onBtnSearchClick
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        //xtype: 'fieldset',
                                        xtype: 'panel',
                                        title: '<b style="font-size:12px">TAXES<b/>',
                                        bodyStyle: 'background: #E5ECEF',
                                        margin: '1 5 0 0',
                                        defaults: {
                                            border: false
                                        },
                                        layout: {
                                            type: 'table',
                                            columns: 3
                                        },
                                        items: [
                                            {
                                                xtype: 'panel',
                                                layout: {
                                                    type: 'table',
                                                    columns: 7
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
                                                        xtype: 'tbspacer',
                                                        height: 5,
                                                        colspan: 7
                                                    },
                                                    {
                                                        xtype: 'box',
                                                        html: 'Tax Name:',
                                                        width: 70
                                                    },
                                                    {
                                                        id: me.id + '-txtTaxName',
                                                        width: 280,
                                                        colspan: 3
                                                    },
                                                    {
                                                        xtype: 'box',
                                                        html: '',
                                                        width: 100
                                                    },
                                                    {
                                                        xtype: 'box',
                                                        html: 'Search Country:',
                                                        width: 100
                                                    },
                                                    {
                                                        xtype: 'combo',
                                                        id: me.id + '-cmbPais',
                                                        queryMode: 'local',
                                                        triggerAction: 'all',
                                                        autoSelect: false,
                                                        forceSelection: true,
                                                        caseSensitive: false,
                                                        editable: false,
                                                        emptyText: 'All',
                                                        valueField: 'code', displayField: 'name',
                                                        width: 160,
                                                        listConfig: {maxHeight: 111},
                                                        enableKeyEvents: true,
                                                        readOnly: false,
                                                        listeners: {
                                                            keyup: function(combo, e) {
                                                                var key = String.fromCharCode(e.getKey());
                                                                var filter = /^[a-zA-Z0-9]+$/;
                                                                var test_bool = filter.test(key);
                                                                if (test_bool) {
                                                                    combo.doQuery(key);
                                                                }
                                                            },
                                                            change: me.onBtnSearchClick
                                                        }
                                                    },
                                                    {
                                                        xtype: 'box',
                                                        html: 'Country:',
                                                        width: 70
                                                    },
                                                    {
                                                        id: me.id + '-txtCountry'
                                                    },
                                                    {
                                                        xtype: 'tbspacer',
                                                        width: 5
                                                    },
                                                    {
                                                        id: me.id + '-txtCountryName',
                                                        width: 240
                                                    },
                                                    {
                                                        xtype: 'box',
                                                        html: '',
                                                        width: 100
                                                    },
                                                    {
                                                        xtype: 'box',
                                                        html: 'Tax Code:',
                                                        width: 100
                                                    },
                                                    {
                                                        id: me.id + '-txtTaxCode'
                                                    },
                                                    {
                                                        xtype: 'box',
                                                        html: 'Airport:',
                                                        width: 70
                                                    },
                                                    {
                                                        id: me.id + '-txtAirport'
                                                    },
                                                    {
                                                        xtype: 'tbspacer',
                                                        width: 5
                                                    },
                                                    {
                                                        id: me.id + '-txtAirportName',
                                                        width: 240,
                                                        colspan: 4
                                                    },
                                                    {
                                                        xtype: 'box',
                                                        html: 'Tax Definition:',
                                                        width: 70
                                                    },
                                                    {
                                                        xtype: 'textarea',
                                                        id: me.id + '-txtTaxDefinition',
                                                        width: 900,
                                                        colspan: 6
                                                    },
                                                    {
                                                        xtype: 'box',
                                                        html: 'Application Description:',
                                                        width: 70
                                                    },
                                                    {
                                                        xtype: 'textarea',
                                                        id: me.id + '-txtApplication',
                                                        width: 900,
                                                        colspan: 6
                                                    },
                                                    {
                                                        xtype: 'box',
                                                        html: 'Rates:',
                                                        width: 70
                                                    },
                                                    {
                                                        xtype: 'grid',
                                                        id: me.id + '-gridRates',
                                                        height: 100,
                                                        width: 900,
                                                        columnLines: true,
                                                        colspan: 6,
                                                        columns: {
                                                            items: [
                                                                {text: '<span style="font-size: 10px;">EFFECTIVE</span>', dataIndex: 'A1224EFD', width: 80},
                                                                {text: '<span style="font-size: 10px;">EXPIRY</span>', dataIndex: 'A1224EXD', width: 80},
                                                                {text: '<span style="font-size: 10px;">RATE</span>', dataIndex: 'A1224LRT', width: 50,
                                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                        metaData.style = 'text-align :right;';
                                                                        return Ext.util.Format.number(value, '0,000.00');
                                                                    }
                                                                },
                                                                {text: '<span style="font-size: 10px;">AMT</span>', dataIndex: 'A1224LAM', width: 70,
                                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                        metaData.style = 'text-align :right;';
                                                                        return Ext.util.Format.number(value, '0,000.00');
                                                                    }
                                                                },
                                                                {text: '<span style="font-size: 10px;">CURR</span>', dataIndex: 'A1224LCU', width: 45},
                                                                {text: '<span style="font-size: 10px;">CODE</span>', dataIndex: 'A1224CODE', width: 55},
                                                                {
                                                                    text: '<span style="font-size: 10px;">DETAIL</span>', dataIndex: 'A1224EAM', flex: 1,
                                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                        var data = record.data;
                                                                        metaData.style = "text-align:left;";
                                                                        metaData.tdAttr = 'data-qtip="' + data.A1224EAM + '"';
                                                                        return value;
                                                                    }
                                                                },
                                                                {text: '<span style="font-size: 10px;">SALE</span>', dataIndex: 'A1224DAS', width: 80},
                                                                {text: '<span style="font-size: 10px;">TRAVEL</span>', dataIndex: 'A1224DAT', width: 80}
                                                            ],
                                                            defaults: {
                                                                menuDisabled: true,
                                                                align: 'center'
                                                            }
                                                        }
                                                    },
                                                    {
                                                        xtype: 'tbspacer',
                                                        height: 5,
                                                        colspan: 7
                                                    },
                                                    {
                                                        xtype: 'box',
                                                        html: 'Exemptions:',
                                                        width: 70
                                                    },
                                                    {
                                                        xtype: 'grid',
                                                        id: me.id + '-gridExemptions',
                                                        height: 100,
                                                        width: 900,
                                                        columnLines: true,
                                                        colspan: 6,
                                                        columns: {
                                                            items: [
                                                                {text: '<span style="font-size: 10px;">CODE</span>', dataIndex: 'A1232CEXEM', width: 80, align: 'left'},
                                                                {
                                                                    text: '<span style="font-size: 10px;">DETAIL</span>', dataIndex: 'A1218DETA1', flex: 1,
                                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                        var data = record.data;
                                                                        metaData.style = "text-align:left;";
                                                                        metaData.tdAttr = 'data-qtip="' + data.A1218DETA1 + '"';
                                                                        return value;
                                                                    }
                                                                },
                                                                {text: '<span style="font-size: 10px;">EFFECTIVE</span>', dataIndex: 'A1232EFD', width: 80},
                                                                {text: '<span style="font-size: 10px;">EXPIRY</span>', dataIndex: 'A1232EXD', width: 80}
                                                            ],
                                                            defaults: {
                                                                menuDisabled: true,
                                                                align: 'center'
                                                            }
                                                        }
                                                    },
                                                    {
                                                        xtype: 'tbspacer',
                                                        height: 5,
                                                        colspan: 7
                                                    },
                                                    {
                                                        xtype: 'box',
                                                        html: 'Collection Description:',
                                                        width: 70
                                                    },
                                                    {
                                                        xtype: 'textarea',
                                                        id: me.id + '-txtCollection',
                                                        width: 900,
                                                        colspan: 6
                                                    },
                                                    {
                                                        xtype: 'box',
                                                        html: 'Collection at point of:',
                                                        width: 70
                                                    },
                                                    {
                                                        xtype: 'fieldset',
                                                        bodyStyle: 'background: #E5ECEF',
                                                        margin: '1 5 0 0',
                                                        width: 180,
                                                        colspan: 3,
                                                        defaults: {
                                                            xtype: 'label',
                                                            border: false,
                                                            readOnly: true
                                                        },
                                                        layout: {
                                                            type: 'table',
                                                            columns: 3
                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'tbspacer',
                                                                height: 5,
                                                                colspan: 3
                                                            },
                                                            {
                                                                text: 'Sale',
                                                                style: 'font-weight:bold;',
                                                                padding: '10 5 5 5'
                                                            },
                                                            {
                                                                text: 'Departure',
                                                                style: 'font-weight:bold;',
                                                                padding: '10 5 5 5'
                                                            },
                                                            {
                                                                text: 'Arrival',
                                                                style: 'font-weight:bold;',
                                                                padding: '10 5 5 5'
                                                            },
                                                            {
                                                                xtype: 'checkboxfield',
                                                                id: me.id + '-chkSale',
                                                                checked: false,
                                                                padding: '10 5 5 5'
                                                            },
                                                            {
                                                                xtype: 'checkboxfield',
                                                                id: me.id + '-chkDeparture',
                                                                checked: false,
                                                                padding: '10 5 5 5'
                                                            },
                                                            {
                                                                xtype: 'checkboxfield',
                                                                id: me.id + '-chkArrival',
                                                                checked: false,
                                                                padding: '10 5 5 5'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'box',
                                                        html: '',
                                                        width: 5
                                                    },
                                                    {
                                                        xtype: 'box',
                                                        html: 'Applicable to:',
                                                        width: 80
                                                    },
                                                    {
                                                        id: me.id + '-txtApplicableTo',
                                                        width: 420
                                                    },
                                                    {
                                                        xtype: 'box',
                                                        html: 'Basis of remittance:',
                                                        width: 70
                                                    },
                                                    {
                                                        xtype: 'fieldset',
                                                        bodyStyle: 'background: #E5ECEF',
                                                        margin: '1 5 0 0',
                                                        width: 180,
                                                        colspan: 3,
                                                        defaults: {
                                                            xtype: 'label',
                                                            border: false,
                                                            readOnly: true
                                                        },
                                                        layout: {
                                                            type: 'table',
                                                            columns: 3
                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'tbspacer',
                                                                height: 5,
                                                                colspan: 3
                                                            },
                                                            {
                                                                text: 'Selling',
                                                                style: 'font-weight:bold;',
                                                                padding: '10 5 5 5'
                                                            },
                                                            {
                                                                text: 'Lifting',
                                                                style: 'font-weight:bold;',
                                                                padding: '10 5 5 5'
                                                            },
                                                            {
                                                                text: 'Others',
                                                                style: 'font-weight:bold;',
                                                                padding: '10 5 5 5'
                                                            },
                                                            {
                                                                xtype: 'checkboxfield',
                                                                id: me.id + '-chkSelling',
                                                                checked: false,
                                                                padding: '10 5 5 5'
                                                            },
                                                            {
                                                                xtype: 'checkboxfield',
                                                                id: me.id + '-chkLifting',
                                                                checked: false,
                                                                padding: '10 5 5 5'
                                                            },
                                                            {
                                                                xtype: 'checkboxfield',
                                                                id: me.id + '-chkOthers',
                                                                checked: false,
                                                                padding: '10 5 5 5'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'box',
                                                        html: ''
                                                    },
                                                    {
                                                        xtype: 'box',
                                                        html: 'Comments:',
                                                        width: 80
                                                    },
                                                    {
                                                        xtype: 'textarea',
                                                        id: me.id + '-txtComments',
                                                        width: 420
                                                    },
                                                    {
                                                        xtype: 'tbspacer',
                                                        height: 5,
                                                        colspan: 7
                                                    },
                                                    {
                                                        xtype: 'box',
                                                        html: 'Interlineable:',
                                                        width: 80
                                                    },
                                                    {
                                                        id: me.id + '-txtInterlineable'
                                                    },
                                                    {
                                                        xtype: 'box',
                                                        html: '',
                                                        colspan: 3
                                                    },
                                                    {
                                                        xtype: 'panel',
                                                        bodyStyle: 'background: #E5ECEF',
                                                        margin: '1 5 0 0',
                                                        width: 180,
                                                        border: false,
                                                        colspan: 3,
                                                        defaults: {
                                                            border: false
                                                        },
                                                        layout: {
                                                            type: 'table',
                                                            columns: 3
                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'tbspacer',
                                                                height: 5,
                                                                colspan: 3
                                                            },
                                                            {
                                                                xtype: 'button',
                                                                id: me.id + '-btn-pag-previous',
                                                                iconCls: 'prx-icon-pagination-previous',
                                                                tooltip: 'Previous Page',
                                                                listeners: {
                                                                    click: me.onBtnPreviousClick
                                                                }
                                                            },
                                                            {
                                                                xtype: 'button',
                                                                id: me.id + '-btn-pag-next',
                                                                iconCls: 'prx-icon-pagination-next',
                                                                tooltip: 'Next Page',
                                                                listeners: {
                                                                    click: me.onBtnNextClick
                                                                }
                                                            },
                                                            {
                                                                xtype: 'label',
                                                                text: 'Registry...',
                                                                style: 'font-weight:bold;',
                                                                id: me.id + '-lblRegistry',
                                                                padding: '10 5 5 5'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'panel',
                                                width: 10
                                            },
                                            {
                                                xtype: 'panel',
                                                defaults: {
                                                    style: 'font-weight: bold; font-size: 11px;',
                                                    hideLabel: true,
                                                    readOnly: true
                                                },
                                                items: [
                                                    {
                                                        xtype: 'tbspacer',
                                                        height: 5
                                                    },
                                                    {
                                                        xtype: 'grid',
                                                        id: me.id + '-gridCity',
                                                        height: 550,
                                                        width: 300,
                                                        columnLines: true,
                                                        columns: {
                                                            items: [
                                                                {text: '<span style="font-size: 10px;">CODE</span>', dataIndex: 'A1224ORG', width: 80},
                                                                {text: '<span style="font-size: 10px;">NAME</span>', dataIndex: 'A1007NOMBR', flex: 1}
                                                            ],
                                                            defaults: {
                                                                menuDisabled: true,
                                                                align: 'center'
                                                            }
                                                        },
                                                        listeners: {
                                                            itemclick: me.onTaxCity
                                                        }
                                                    },
                                                    {
                                                        xtype: 'fieldset',
                                                        bodyStyle: 'background: #E5ECEF',
                                                        margin: '1 5 0 0',
                                                        defaults: {
                                                            xtype: 'label',
                                                            border: false,
                                                            style: 'font-weight: bold; font-size: 11px;',
                                                            hideLabel: true,
                                                            readOnly: true
                                                        },
                                                        layout: {
                                                            type: 'table',
                                                            columns: 3
                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'tbspacer',
                                                                height: 5,
                                                                colspan: 3
                                                            },
                                                            {
                                                                xtype: 'tbspacer'
                                                            },
                                                            {
                                                                text: 'Specific',
                                                                style: 'font-weight:bold;text-align: center;',
                                                                padding: '10 5 5 5',
                                                                colspan: 3
                                                            },
                                                            {
                                                                text: 'Applied on:',
                                                                style: 'font-weight:bold;',
                                                                padding: '10 5 5 5'
                                                            },
                                                            {
                                                                xtype: 'checkboxfield',
                                                                boxLabel: 'Dep',
                                                                id: me.id + '-chkDep',
                                                                checked: false,
                                                                padding: '10 5 5 5'
                                                            },
                                                            {
                                                                xtype: 'checkboxfield',
                                                                boxLabel: 'Arr',
                                                                id: me.id + '-chkArr',
                                                                checked: false,
                                                                padding: '10 5 5 5'
                                                            },
                                                            {
                                                                xtype: 'box',
                                                                html: 'Last Mod Date:'
                                                            },
                                                            {
                                                                xtype: 'textfield',
                                                                id: me.id + '-txtLastModDate',
                                                                width: 80,
                                                                colspan: 2
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
                ]
            }
        ];

        me.listeners = {
            afterRender: function(obj, e) {
                meParentP = this;
                if (meParentP.modo === ''){
                    Ext.getCmp(me.id + '-cmbDateYear').bindStore(win.getStoreYear(false));
                    Ext.getCmp(me.id + '-cmbDateMonth').bindStore(win.getStoreMonth(false));

                    Ext.getCmp(me.id + '-cmbDateYear').setValue(this.fecha.getFullYear());
                    Ext.getCmp(me.id + '-cmbDateMonth').setValue(this.fecha.getMonth());

                    me.getListCountry();
                    Ext.getCmp(me.id + '-cmbPais').setValue('MX');
                    page = 0;
                    airportindex = -1;
                    airportrecord = null;
                }
            }
        };

        me.callParent();

    },
    setParam: function(params) {
        meParentP = this;
        //console.log(params);
        meParentP.getListCountry();
        meParentP.modo = 'W';
        Ext.getCmp(meParentP.id + '-cmbDateYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(meParentP.id + '-cmbDateMonth').bindStore(win.getStoreMonth(false));
        Ext.getCmp(meParentP.id + '-cmbDateYear').setValue(params.p_year);
        Ext.getCmp(meParentP.id + '-cmbDateMonth').setValue(params.p_month);
        meParentP.idTax = params.p_idtax;
        meParentP.VP_COUNTRY = params.p_country;
        meParentP.VP_DATE = params.p_year + '' + params.p_month;
        Ext.getCmp(meParentP.id + '-txtTaxCode').setValue(params.p_taxcode);
        Ext.getCmp(meParentP.id + '-cmbPais').setValue(params.p_country);
        var storeCity = Ext.create('Ext.data.Store', {
            data: lstAirport,
            autoLoad: true
        });
        Ext.getCmp(meParentP.id + '-gridCity').bindStore(storeCity);
        lstAirport.forEach(function callback(currentValue, index, array) {
            if(currentValue.A1224ORG===params.p_airport){
                airportindex = index;
                if (airportindex > -1) {
                    Ext.getCmp(meParentP.id + '-gridCity').getSelectionModel().select(airportindex);
                }
                meParentP.mostrarTaxCity(currentValue.A1224ORG,currentValue.A1007NOMBR,currentValue.A1334PDEP,currentValue.A1334PARR);
            }
        });
    },
    getListCountry: function() {
        var me = this;
        Ext.Ajax.request({
            url: CONTEXTPATH + '/DeterminationOfCommission/getListCountry',
            method: 'POST',
            timeout: 60000000,
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var listaPaises = res.listaPaises;
                    var country = new Array();
                    //country.push(['', 'All']);
                    listaPaises.forEach(function callback(currentValue, index, array) {
                        country.push([currentValue.A051KEY2, currentValue.A051KEY2 + ' - ' + currentValue.A051DESCR1]);
                    });
                    var store = Ext.create('Ext.data.ArrayStore', {
                        storeId: 'country', autoLoad: true, data: country, fields: ['code', 'name']
                    });
                    Ext.getCmp(me.id + '-cmbPais').bindStore(store);
                    //Ext.getCmp(me.id + '-cmbPais').setValue('MX');
                } else
                    global.Msg({msg: res.sesion});
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    onBtnPreviousClick: function(obj, e) {
        if (page === 0) {
            Ext.Msg.alert('.: PRAXIS :.', 'This is the first tax');
            return;
        }
        if (page > 0 && page <= lstTax.length) {
            page = page - 1;
        }
        meParentP.limpiar();
        meParentP.mostrar(lstTax, lstAirport);
        if (airportindex > -1) {
            Ext.getCmp(meParentP.id + '-gridCity').getSelectionModel().select(airportindex);
            meParentP.mostrarTaxCity(airportrecord.data.A1224ORG,airportrecord.data.A1007NOMBR,airportrecord.data.A1334PDEP,airportrecord.data.A1334PARR);
        }
    },
    onBtnNextClick: function(obj, e) {
        if (page === lstTax.length - 1) {
            Ext.Msg.alert('.: PRAXIS :.', 'This is the last tax');
            return;
        }
        if (page >= 0 && page < lstTax.length) {
            page = page + 1;
        }
        meParentP.limpiar();
        meParentP.mostrar(lstTax, lstAirport);
        if (airportindex > -1) {
            Ext.getCmp(meParentP.id + '-gridCity').getSelectionModel().select(airportindex);
            meParentP.mostrarTaxCity(airportrecord.data.A1224ORG,airportrecord.data.A1007NOMBR,airportrecord.data.A1334PDEP,airportrecord.data.A1334PARR);
        }
    },
    onBtnSearchClick: function(obj, e) {
        win.lblUser_toolTip("Estructura: A2444");
        meParentP.setFormatParameter();
        page = 0;
        airportindex = -1;
        airportrecord = null;
        Ext.Ajax.request({
            url: CONTEXTPATH + '/TaxesByCode/loadDataByCountry',
            method: 'POST',
            timeout: 60000000,
            params: searchParams,
            //beforerequest: Ext.getCmp(meParentP.id + '-form').mask('Loading...', ''),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                lstTax = res.lstData01;
                lstAirport = res.lstData02;
                if (meParentP.modo === ''){
                    meParentP.limpiar();
                }
                meParentP.mostrar(lstTax, lstAirport);
                //Ext.getCmp(meParentP.id + '-form').unmask('Loading...', '');
            }/*,
            failure: function (response) {
                Ext.Msg.alert('Respuesta', response);//response.status
                Ext.getCmp(meParentP.id + '-form').unmask('Loading...', '');
            }*/
            /*
            beforerequest (conn, opts): Fired before any Ajax request is sent.
            requestcomplete (conn, response, opts): Fired after any Ajax request is completed successfully.
            requestexception (conn, response, opts): Fires if an error HTTP status was returned from the server.
            */
        });
        global.clear();
    },
    setFormatParameter: function() {
        var year = Ext.getCmp(meParentP.id + '-cmbDateYear').getValue();
        var month = Ext.getCmp(meParentP.id + '-cmbDateMonth').getValue();
        if (year === null || year === '') {
            Ext.getCmp(meParentP.id + '-cmbDateYear').setValue(meParentP.fecha.getFullYear());
            year = '' + meParentP.fecha.getFullYear();
        }
        if (month === null || month === '') {
            Ext.getCmp(meParentP.id + '-cmbDateYear').setValue(meParentP.fecha.getMonth());
            month = '' + meParentP.fecha.getMonth();
        }
        meParentP.VP_DATE = year + '' + month;
        meParentP.VP_COUNTRY = Ext.getCmp(meParentP.id + '-cmbPais').getValue();

        searchParams = {
            VP_DATE: meParentP.VP_DATE,
            VP_COUNTRY: meParentP.VP_COUNTRY,
            VP_TAXID: meParentP.modo === '' ? '' : meParentP.idTax,
            VP_TAXCODE: meParentP.modo === '' ? '' : Ext.getCmp(meParentP.id + '-txtTaxCode').getValue()
        };
    },
    onTaxCity: function(view, record, item, index, e) {
        airportindex = index;
        airportrecord = record;
        meParentP.mostrarTaxCity(record.data.A1224ORG,record.data.A1007NOMBR,record.data.A1334PDEP,record.data.A1334PARR);
    },
    mostrarTaxCity: function(airport,nombre,pdep,parr) {
        Ext.getCmp(meParentP.id + '-txtAirport').setValue(airport);
        Ext.getCmp(meParentP.id + '-txtAirportName').setValue(nombre);
        Ext.getCmp(meParentP.id + '-chkDep').setValue(pdep === 'S' ? true : false);
        Ext.getCmp(meParentP.id + '-chkArr').setValue(parr === 'S' ? true : false);
        searchParamsCity = {
            VP_DATE: meParentP.VP_DATE,
            VP_TAXCODE: Ext.getCmp(meParentP.id + '-txtTaxCode').getValue(),
            VP_TAXID: meParentP.idTax,
            VP_COUNTRY: meParentP.VP_COUNTRY,
            VP_AIRPORT: airport//record.data.A1224ORG
        };

        Ext.Ajax.request({
            url: CONTEXTPATH + '/TaxesByCode/loadRatesExemptions',
            method: 'POST',
            timeout: 60000000,
            params: searchParamsCity,
            //beforerequest: Ext.getCmp(meParentP.id + '-form').mask('Loading...', ''),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var lstRates = res.lstData01;
                var lstExemptions = res.lstData02;

                var storeRates = Ext.create('Ext.data.Store', {
                    data: lstRates,
                    autoLoad: true
                });
                Ext.getCmp(meParentP.id + '-gridRates').bindStore(storeRates);

                var storeExemptions = Ext.create('Ext.data.Store', {
                    data: lstExemptions,
                    autoLoad: true
                });
                Ext.getCmp(meParentP.id + '-gridExemptions').bindStore(storeExemptions);

                //Ext.getCmp(meParentP.id + '-form').unmask('Loading...', '');
            }
        });
    },
    limpiar: function() {
        meParentP.idTax = '';
        Ext.getCmp(meParentP.id + '-txtTaxName').setValue('');
        Ext.getCmp(meParentP.id + '-txtCountry').setValue('');
        Ext.getCmp(meParentP.id + '-txtCountryName').setValue('');
        Ext.getCmp(meParentP.id + '-txtTaxCode').setValue('');
        Ext.getCmp(meParentP.id + '-txtTaxDefinition').setValue('');
        Ext.getCmp(meParentP.id + '-txtApplication').setValue('');
        Ext.getCmp(meParentP.id + '-txtCollection').setValue('');
        Ext.getCmp(meParentP.id + '-txtApplicableTo').setValue('');
        Ext.getCmp(meParentP.id + '-txtComments').setValue('');
        Ext.getCmp(meParentP.id + '-txtInterlineable').setValue('');
        Ext.getCmp(meParentP.id + '-chkSale').setValue(false);
        Ext.getCmp(meParentP.id + '-chkDeparture').setValue(false);
        Ext.getCmp(meParentP.id + '-chkArrival').setValue(false);
        Ext.getCmp(meParentP.id + '-chkSelling').setValue(false);
        Ext.getCmp(meParentP.id + '-chkLifting').setValue(false);
        Ext.getCmp(meParentP.id + '-chkOthers').setValue(false);
        Ext.getCmp(meParentP.id + '-txtLastModDate').setValue('');
        Ext.getCmp(meParentP.id + '-lblRegistry').setText('Registry...');
        Ext.getCmp(meParentP.id + '-gridCity').getStore().removeAll();

        Ext.getCmp(meParentP.id + '-txtAirport').setValue('');
        Ext.getCmp(meParentP.id + '-txtAirportName').setValue('');
        Ext.getCmp(meParentP.id + '-chkDep').setValue(false);
        Ext.getCmp(meParentP.id + '-chkArr').setValue(false);
        Ext.getCmp(meParentP.id + '-gridRates').getStore().removeAll();
        Ext.getCmp(meParentP.id + '-gridExemptions').getStore().removeAll();
    },
    mostrar: function(lstTax, lstAirport) {
        var file = lstTax[page];
        meParentP.idTax = file.IDTAX;
        Ext.getCmp(meParentP.id + '-txtTaxName').setValue(file.TAXNAME);
        Ext.getCmp(meParentP.id + '-txtCountry').setValue(file.CODCOUNTRY);
        Ext.getCmp(meParentP.id + '-txtCountryName').setValue(file.NOMCOUNTRY);
        Ext.getCmp(meParentP.id + '-txtTaxCode').setValue(file.TAXCODE);
        Ext.getCmp(meParentP.id + '-txtTaxDefinition').setValue(file.TAXDEFINITION);
        Ext.getCmp(meParentP.id + '-txtApplication').setValue(file.APPDESCRIPTION);
        Ext.getCmp(meParentP.id + '-txtCollection').setValue(file.COLDESCRIPTION);
        Ext.getCmp(meParentP.id + '-txtApplicableTo').setValue(file.APPICABLETO);
        Ext.getCmp(meParentP.id + '-txtComments').setValue(file.COMMENTS);
        Ext.getCmp(meParentP.id + '-txtInterlineable').setValue(file.INTERLINEABLE === 'S' ? 'YES' : 'NO');
        Ext.getCmp(meParentP.id + '-chkSale').setValue(file.SALE === 'S' ? true : false);
        Ext.getCmp(meParentP.id + '-chkDeparture').setValue(file.DEPARTURE === 'S' ? true : false);//1 0 - S N
        Ext.getCmp(meParentP.id + '-chkArrival').setValue(file.ARRIVAL === 'S' ? true : false);//1 0 - S N
        Ext.getCmp(meParentP.id + '-chkSelling').setValue(file.SELLING === 'S' ? true : false);
        Ext.getCmp(meParentP.id + '-chkLifting').setValue(file.LIFTING === 'S' ? true : false);
        Ext.getCmp(meParentP.id + '-chkOthers').setValue(file.OTHERS === 'S' ? true : false);
        Ext.getCmp(meParentP.id + '-txtLastModDate').setValue(file.LASTDATE);
        Ext.getCmp(meParentP.id + '-lblRegistry').setText('Registry ' + (page + 1) + ' of ' + lstTax.length);

        var storeCity = Ext.create('Ext.data.Store', {
            data: lstAirport,
            autoLoad: true
        });
        Ext.getCmp(meParentP.id + '-gridCity').bindStore(storeCity);
    }
});