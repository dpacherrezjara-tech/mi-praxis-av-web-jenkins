Ext.define('Ext.Praxis.view.flown.AircraftMasterForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryAircraftMasterForm',
    requires: [
        'Ext.Praxis.controller.flown.AircraftMaster.DataEntryAircraftMasterController'
    ],
    controller: 'DataEntryAircraftMasterController',
    title: 'Aircraft - Data Entry Form',
    header: true,
    height: 700,
    width: 900,
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        aling: 'center'
    },
    modal: true,
    items: [
        {
            region: 'center',
            xtype: 'form',
            id: prototype.id + '-DataEntry-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {xtype: 'tbspacer', height: 4},
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    defaults:{
                        style: 'margin: 3px;',
                        border: false
                    },
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Equipment',
                            style: 'font-weight:bold;color:#000;',
                            width: 90
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            style: 'font-weight:bold;color:red;',
                            width: 20
                        },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtEQUIPO',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maxLength: 8,
                            maskRe: /[a-zA-Z0-9]/,
                            width: 100,
                            listeners:{
                                change: 'onUpperValue'
                            }
                        },
                        { xtype: 'tbspacer', width: 25 },
                        {
                            xtype: 'label',
                            text: 'Number',
                            style: 'font-weight:bold;color:#000;',
                            width: 90
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            style: 'font-weight:bold;color:red;',
                            width: 20
                        },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtNUMERO',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maxLength: 8,
                            maskRe: /[a-zA-Z0-9-]/,
                            width: 100,
                            listeners:{
                                change: 'onUpperValue'
                            }
                        },
                        { xtype: 'tbspacer', width: 25 },
                        {
                            xtype: 'label',
                            text: 'Registration Number',
                            style: 'font-weight:bold;color:#000;',
                            width: 140
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            style: 'font-weight:bold;color:red;',
                            width: 20
                        },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtMATRICULA',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maxLength: 15,
                            maskRe: /[a-zA-Z0-9-]/,
                            width: 100,
                            listeners:{
                                change: 'onUpperValue'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    defaults:{
                        style: 'margin: 3px;',
                        border: false
                    },
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Model',
                            style: 'font-weight:bold;color:#000;',
                            width: 90
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            style: 'font-weight:bold;color:red;',
                            width: 20
                        },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtMODELO',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maxLength: 15,
                            maskRe: /[a-zA-Z0-9-]/,
                            width: 100,
                            listeners:{
                                change: 'onUpperValue'
                            }
                        },
                        { xtype: 'tbspacer', width: 25 },
                        {
                            xtype: 'label',
                            text: 'Carrier',
                            style: 'font-weight:bold;color:#000;',
                            width: 110
                        },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtCARRIER',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maxLength: 2,
                            maskRe: /[A,D,M,a,d,m,5]/,
                            width: 100,
                            listeners:{
                                change: 'onUpperValue'
                            },
                            autoEl: {
                                tag: 'label',
                                'data-qtip': "Only accepted 'AM' or '5D'"
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    width: 850,
                    border: false,
                    margin: '2 0 2 0',
                    defaults:{
                        style: 'margin: 3px;',
                        border: false
                    },
                    bodyStyle:{"background-color":"rgb(229, 236, 239)"},
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Turbine',
                            style: 'font-weight:bold;color:#000;',
                            width: 110
                        },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtTURBINA',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maxLength: 5,
                            maskRe: /[0-5]/,
                            width: 100
                        },
                        { xtype: 'tbspacer', width: 25 },
                        {
                            xtype: 'label',
                            text: 'Type',
                            style: 'font-weight:bold;color:#000;',
                            width: 110
                        },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtTIPO',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maxLength: 8,
                            maskRe: /[a-zA-Z0-9]/,
                            width: 100,
                            listeners:{
                                change: 'onUpperValue'
                            }
                        },
                        { xtype: 'tbspacer', width: 25 },
                        {
                            xtype: 'label',
                            text: 'Time of Flight',
                            style: 'font-weight:bold;color:#000;',
                            width: 130
                        },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtHORAVLO',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maxLength: 15,
                            maskRe: /[0-9.]/,
                            width: 130,
                            listeners:{
                                change: 'onUpperValue'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    width: 850,
                    border: false,
                    margin: '2 0 2 0',
                    defaults:{
                        style: 'margin: 3px;',
                        border: false
                    },
                    bodyStyle:{"background-color":"rgb(229, 236, 239)"},
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Status',
                            style: 'font-weight:bold;color:#000;',
                            width: 110
                        },
                        {
                            xtype:'combo',
                            id: prototype.id + '-cmbESTADO',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["", "INACTIVO"], ["1", "ACTIVO"]
                                ]
                            }),
                            queryMode: 'local',
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 100,
                            value: "",
                            typeAhead: true,
                            emptyText: 'All',
                            valueField: 'code', displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'column',
                    width: 850,
                    margin: '2 0 2 0',
                    border: false,
                    bodyStyle:{"background-color":"rgb(239, 233, 229)"},
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
//                            width: 515,
//                            margin: '1 0 1 0',
//                            border: false,
                            border: false,
                            defaults:{
                                style: 'margin: 3px;',
                                border: false
                            },
                            bodyStyle:{"background-color":"rgb(239, 233, 229)"},
                            items: [
                                {
                                    xtype: 'label',
//                                    padding: '0px 5px 0px 8px',
                                    html: '<strong style="color:#000; text-decoration: underline; ">Total</strong>'
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    bodyStyle:{"background-color":"rgb(239, 233, 229)"},
                                    items:[
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'Total Miles',
                                            style: 'font-weight:bold;color:#000;',
                                            width: 110
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtTOTMILL',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maxLength: 15,
                                            maskRe: /[0-9.]/,
                                            width: 100
                                        },
                                        { xtype: 'tbspacer', width: 25 },
                                        {
                                            xtype: 'label',
                                            text: 'Total Gallons',
                                            style: 'font-weight:bold;color:#000;',
                                            width: 110
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtTOTGALO',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maxLength: 15,
                                            maskRe: /[0-9.]/,
                                            width: 100
                                        },
                                        { xtype: 'tbspacer', width: 25 },
                                        {
                                            xtype: 'label',
                                            text: 'Total Charge',
                                            style: 'font-weight:bold;color:#000;',
                                            width: 110
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtTOTCARG',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maxLength: 15,
                                            maskRe: /[0-9.]/,
                                            width: 100
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'column',
                    width: 850,
                    margin: '2 0 2 0',
                    border: false,
                    bodyStyle:{"background-color":"rgb(219, 226, 229)"},
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
//                            width: 515,
//                            margin: '1 0 1 0',
//                            border: false,
                            border: false,
                            defaults:{
                                style: 'margin: 3px;',
                                border: false
                            },
                            bodyStyle:{"background-color":"rgb(219, 226, 229)"},
                            items: [
                                {
                                    xtype: 'label',
//                                    padding: '0px 5px 0px 8px',
                                    html: '<strong style="color:#000; text-decoration: underline; ">Seats Capacity</strong>'
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    //title: '<u>Seats Capacity</u>',
                                    bodyStyle:{"background-color":"rgb(219, 226, 229)"},
                                    items:[
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'Seats F',
                                            style: 'font-weight:bold;color:#000;',
                                            width: 80
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtPAXF',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maxLength: 5,
                                            maskRe: /[0-9]/,
                                            width: 80
                                        },
                                        { xtype: 'tbspacer', width: 50 },
                                        {
                                            xtype: 'label',
                                            text: 'Seats J',
                                            style: 'font-weight:bold;color:#000;',
                                            width: 80
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtPAXJ',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maxLength: 5,
                                            maskRe: /[0-9]/,
                                            width: 80
                                        },
                                        { xtype: 'tbspacer', width: 50 },
                                        {
                                            xtype: 'label',
                                            text: 'Seats Y',
                                            style: 'font-weight:bold;color:#000;',
                                            width: 80
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtPAXY',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maxLength: 5,
                                            maskRe: /[0-9]/,
                                            width: 80
                                        },
                                        { xtype: 'tbspacer', width: 50 },
                                        {
                                            xtype: 'label',
                                            text: 'Total Seats',
                                            style: 'font-weight:bold;color:#000;',
                                            width: 80
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtPAX',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maxLength: 5,
                                            maskRe: /[0-9]/,
                                            width: 80
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'column',
                    width: 850,
                    margin: '2 0 2 0',
                    border: false,
                    bodyStyle:{"background-color":"rgb(239, 233, 229)"},
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            border: false,
                            defaults:{
                                style: 'margin: 3px;',
                                border: false
                            },
                            bodyStyle:{"background-color":"rgb(239, 233, 229)"},
                            items: [
                                {
                                    xtype: 'label',
//                                    padding: '0px 5px 0px 8px',
                                    html: '<strong style="color:#000; text-decoration: underline; ">Date</strong>'
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    //title: '<u>Date</u>',
                                    bodyStyle:{"background-color":"rgb(239, 233, 229)"},
                                    items:[
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'datefield',
                                            format: 'Ymd',
                                            id:prototype.id+'-txtFECHA',
                                            fieldLabel: '<strong style="color:#000;">Manufacture Date</strong>',
                                            labelWidth:181,
                                            labelAlign:'left',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            width: 278,
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Comisionable'
                                            }
                                        },
                                        { xtype: 'tbspacer', width: 87 },
                                        {
                                            xtype: 'datefield',
                                            format: 'Ymd',
                                            id:prototype.id+'-txtFECHAOP',
                                            fieldLabel: '<strong style="color:#000;">Operation Start Date</strong>',
                                            labelWidth:173,
                                            labelAlign:'left',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            width: 270,
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Comisionable'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    bodyStyle:{"background-color":"rgb(239, 233, 229)"},
                                    items:[
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'datefield',
                                            format: 'Ymd',
                                            id:prototype.id+'-txtFECINICO',
                                            fieldLabel: '<strong style="color:#000;">Contract Start Date</strong>',
                                            labelWidth:181,
                                            labelAlign:'left',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            width: 278,
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Comisionable'
                                            }
                                        },
                                        { xtype: 'tbspacer', width: 88 },
                                        {
                                            xtype: 'datefield',
                                            format: 'Ymd',
                                            id:prototype.id+'-txtFECFINCO',
                                            fieldLabel: '<strong style="color:#000;">Contract End Date</strong>',
                                            labelWidth:172,
                                            labelAlign:'left',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            width: 269,
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Comisionable'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'column',
                    width: 850,
                    margin: '2 0 2 0',
                    border: false,
                    bodyStyle:{"background-color":"rgb(239, 233, 229)"},
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
//                            width: 515,
//                            margin: '1 0 1 0',
//                            border: false,
                            border: false,
                            defaults:{
                                style: 'margin: 3px;',
                                border: false
                            },
                            bodyStyle:{"background-color":"rgb(239, 233, 229)"},
                            items: [
                                {
                                    xtype: 'label',
//                                    padding: '0px 5px 0px 8px',
                                    html: '<strong style="color:#000; text-decoration: underline; ">Direct Costs - Operational</strong>'
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    bodyStyle:{"background-color":"rgb(239, 233, 229)"},
                                    items:[
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtCOSCOMB',
                                            fieldLabel: '<strong style="color:#000;">Gas Costs</strong>',
                                            labelWidth:100,
                                            labelAlign:'left',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maxLength: 15,
                                            maskRe: /^\d{0,5}$/,
                                            width: 200
                                        },
                                        { xtype: 'tbspacer', width: 15 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtCOSCARGO',
                                            fieldLabel: '<strong style="color:#000;">Charge Cost</strong>',
                                            labelWidth:100,
                                            labelAlign:'left',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maxLength: 15,
                                            maskRe: /^\d{0,5}$/,
                                            width: 200
                                        },
                                        { xtype: 'tbspacer', width: 15 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtCOSNAV',
                                            fieldLabel: '<strong style="color:#000;">Navigation Cost</strong>',
                                            labelWidth:100,
                                            labelAlign:'left',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maxLength: 15,
                                            maskRe: /^\d{0,5}$/,
                                            width: 200
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    bodyStyle:{"background-color":"rgb(239, 233, 229)"},
                                    items:[
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtCOSATERR',
                                            fieldLabel: '<strong style="color:#000;">Cost Land</strong>',
                                            labelWidth:100,
                                            labelAlign:'left',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maxLength: 15,
                                            maskRe: /^\d{0,5}$/,
                                            width: 200
                                        },
                                        { xtype: 'tbspacer', width: 15 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtCOSESTAC',
                                            fieldLabel: '<strong style="color:#000;">Cost Station</strong>',
                                            labelWidth:100,
                                            labelAlign:'left',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maxLength: 15,
                                            maskRe: /^\d{0,5}$/,
                                            width: 200
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'column',
                    width: 850,
                    margin: '2 0',
                    border: false,
                    bodyStyle:{"background-color":"rgb(239, 233, 229)"},
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
//                            width: 515,
//                            margin: '1 0 1 0',
//                            border: false,
                            border: false,
                            defaults:{
                                style: 'margin: 3px;',
                                border: false
                            },
                            bodyStyle:{"background-color":"rgb(239, 233, 229)"},
                            items: [
                                {
                                    xtype: 'label',
//                                    padding: '0px 5px 0px 8px',
                                    html: '<strong style="color:#000; text-decoration: underline; ">Indirect Costs - Administrative</strong>'
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    bodyStyle:{"background-color":"rgb(239, 233, 229)"},
                                    items:[
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtCOSTRIPU',
                                            fieldLabel: '<strong style="color:#000;">Crew Cost</strong>',
                                            labelWidth:100,
                                            labelAlign:'left',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maxLength: 15,
                                            maskRe: /^\d{0,5}$/,
                                            width: 200
                                        },
                                        { xtype: 'tbspacer', width: 15 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtCOSOTROS',
                                            fieldLabel: '<strong style="color:#000;">Other Cost</strong>',
                                            labelWidth:130,
                                            labelAlign:'left',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maxLength: 15,
                                            maskRe: /^\d{0,5}$/,
                                            width: 230
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'column',
                    width: 850,
                    margin: '2 0 2 0',
                    border: false,
                    bodyStyle:{"background-color":"rgb(239, 233, 229)"},
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
//                            width: 515,
//                            margin: '1 0 1 0',
//                            border: false,
                            border: false,
                            defaults:{
                                style: 'margin: 3px;',
                                border: false
                            },
                            bodyStyle:{"background-color":"rgb(239, 233, 229)"},
                            items: [
                                {
                                    xtype: 'label',
//                                    padding: '0px 5px 0px 8px',
                                    html: '<strong style="color:#000; text-decoration: underline; ">Weight</strong>'
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    bodyStyle:{"background-color":"rgb(239, 233, 229)"},
                                    items:[
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtPESO',
                                            fieldLabel: '<strong style="color:#000;">Weight</strong>',
                                            labelWidth:100,
                                            labelAlign:'left',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maxLength: 15,
                                            maskRe: /^\d{0,5}$/,
                                            width: 200
                                        },
                                        { xtype: 'tbspacer', width: 15 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtPESOMAX',
                                            fieldLabel: '<strong style="color:#000;">Maximum Weight</strong>',
                                            labelWidth:130,
                                            labelAlign:'left',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maxLength: 15,
                                            maskRe: /^\d{0,5}$/,
                                            width: 230
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                //<editor-fold defaultstate="collapsed" desc="ControlData">
                {
                    xtype: 'fieldset',
                    id: prototype.id+'-ControlData',
                    title: 'Control Data',
                    margin: '15 0 8 0',
                    border: true,
                    defaults:{
                        style: 'margin: 3px;',
                        border: false
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 10 0',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items:[
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Creator User',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtUSCR',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 70 },
                                {
                                    xtype: 'label',
                                    text: 'Creation Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtFECR',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 70 },
                                {
                                    xtype: 'label',
                                    text: 'Creation Time',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtHOCR',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 10 0',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items:[
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'User Update',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtUSUP',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 70 },
                                {
                                    xtype: 'label',
                                    text: 'Update Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtFEUP',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 70 },
                                {
                                    xtype: 'label',
                                    text: 'Update Time',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtHOUP',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        }
                    ]
                }
                //</editor-fold>
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '0 0 15 0',
            layout:{
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults:{
                scale: 'medium'
            },
            items: [
                {
                    text: 'Save',
                    id: prototype.id + '-btnSave',
                    iconCls: 'prx-icon-save',
                    hidden: true,
                    listeners: {
                        click: 'btnSave_clickHandler'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id + '-btnUpdate',
                    iconCls: 'prx-icon-update',
                    hidden: true,
                    listeners: {
                        click: 'btnUpdate_clickHandler'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id + '-btnDelete',
                    iconCls: 'prx-icon-delete',
                    hidden: true,
                    listeners: {
                        click: 'btnDelete_clickHandler'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.id + '-btnCancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'btnCancel_clickHandler'
                    }
                },
                { xtype: 'tbspacer', width: 30 },
                {
                    xtype: 'label',
                    text: '(*) Required Fields',
                    style: 'font-weight:bold;color:red;',
                    width: 120
                }
            ]
        }
    ]
});