Ext.define('Ext.Praxis.view.payments.ChargebackForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryChargebackForm',
    requires: [
        'Ext.Praxis.controller.payments.Chargeback.DataEntryChargebackController'
    ],
    controller: 'DataEntryChargebackController',
    title: 'Chargeback - Data Entry Form',
    header: true,
//    height:920,
    width: 850,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            defaults: {
                style: 'margin: 3px;',
                textDecoration: 'underline',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent;"',
                    layout: 'vbox',
                    width: 830,
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'label',
                            html: '<strong style="color:#121E31; text-decoration: underline; ">Bank Information</strong>',
                            style: 'font-weight:bold;color:#0B333C;',
                            bodyStyle: 'background:#e5efe7',
                            fontSize: '11',
                            width: 234,
                            height: 20,
                            margin: '8 2 0 10'
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            hidden: false,
                            border: false,
                            bodyStyle: 'background:#efe5e5;',
                            margin: '0 2 1 20',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Credit Card',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 80,
                                    padding: '3 0'
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    padding: '3px 2px 3px 5px',
                                    html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                    width: 30,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Required field'
                                     }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCARDNBR',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9-*]/,
                                    maxLength: 16,
//                                    readOnly: true,
                                    padding: '3 0',
                                    width: 130
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Authorization Cod.',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 115,
                                    padding: '3 0'
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    padding: '3px 2px 3px 5px',
                                    html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                    width: 30,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Required field'
                                     }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtAUTHNBR',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 6,
//                                    readOnly: true,
                                    padding: '3 0',
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 35},
                                {
                                    xtype: 'label',
                                    text: 'Credit Card Type',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 105,
                                    padding: '3 0'
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtSCARCOD',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maskRe: /[aA-zZ]/,
                                    maxLength: 3,
//                                    readOnly: true,
                                    padding: '3 0',
                                    width: 60,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 60}
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#efe5e5;',
                            margin: '0 2 1 20',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Merchant Nbr.',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 90,
                                    padding: '3 0'
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    padding: '3px 2px 3px 5px',
                                    html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                    width: 30,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Required field'
                                     }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtMERCHNREC',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 10,
//                                    readOnly: true,
                                    padding: '3 0',
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 60},
                                {
                                    xtype: 'label',
                                    text: 'Merchant Name',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 100,
                                    padding: '3 0'
                                },
                                {xtype: 'tbspacer', width: 45},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtMERCHNAM',
                                    fieldStyle: 'text-align:left',
                                    maxLength: 40,
                                    maskRe: /[a-zA-Z0-9\ s]/,
//                                    readOnly: true,
                                    padding: '3 0',
                                    width: 355,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 10}
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#efe5e5;',
                            margin: '0 2 1 20',
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Auth. Currency',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 100,
                                    padding: '3 0'
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCURRAUTH',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maskRe: /[a-zA-Z]/,
                                    maxLength: 3,
//                                    readOnly: true,
                                    padding: '3 0',
                                    width: 50,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 110},
                                {
                                    xtype: 'label',
                                    text: 'Authorization Amount',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 140,
                                    padding: '3 0'
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtAUTAMOUNT',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9-.]/,
                                    value: '0.00',
                                    maxLength: 13,
//                                    readOnly: true,
                                    padding: '3 0',
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 35},
                                {
                                    xtype: 'label',
                                    text: 'Status',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 50,
                                    padding: '3 0'
                                },
                                {xtype: 'tbspacer', width: 60},
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-de-cmbSTATT',
                                    fieldStyle: 'text-align:left',
                                    valueField: 'code',
                                    displayField: 'name',
//                                    maxLength: 100,
//                                    readOnly: true,
                                    padding: '3 0',
                                    width: 110
                                },
                                {xtype: 'tbspacer', width: 10}
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#efe5e5;',
                            margin: '0 2 10 20',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Concept',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 60,
                                    padding: '3 0',
                                },
                                {xtype: 'tbspacer', width: 60},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCONCEPT',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 40,
//                                    maskRe: /[0-9a-zA-Z]/,
                                    maskRe: /[a-zA-Z- ]/,
//                                    readOnly: true,
                                    padding: '3 0',
                                    width: 405,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 35},
                                {
                                    xtype: 'label',
                                    text: 'Nature',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 60,
                                    padding: '3 0'
                                },
                                {xtype: 'tbspacer', width: 50},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtNATURE',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maskRe: /[a-zA-Z]/,
//                                    maxLength: 4,
//                                    readOnly: true,
                                    padding: '3 0',
                                    width: 110,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
                            ]
                        },
                                
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            hidden: false,
                            border: false,
                            bodyStyle: 'background:#e5efe7',
                            margin: '0 2 1 20',
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Source Code',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 80,
                                    padding: '3 0'
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-de-cmbFTEA',
                                    fieldStyle: 'text-align:left',
                                    maxLength: 100,
                                    valueField: 'code',
                                    displayField: 'name',
                                    editable: false,
//                                    readOnly: true,
                                    padding: '3 0',
                                    width: 110
                                },
                                {xtype: 'tbspacer', width: 50},
                                {
                                    xtype: 'label',
                                    text: 'Application Date',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 110,
                                    padding: '3 0'
                                },
                                {xtype: 'tbspacer', width: 35},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtAPLIDATE',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 8,
//                                    readOnly: true,
                                    padding: '3 0',
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 265}
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#e5efe7',
                            margin: '0 2 1 20',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Case Number',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 110,
                                    padding: '3 0'
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtREMEFOLIO',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 6,
//                                    readOnly: true,
                                    padding: '3 0',
                                    width: 60,
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    xtype: 'label',
                                    text: 'Case Date',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 80,
                                    padding: '3 0'
                                },
                                {xtype: 'tbspacer', width: 35},
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    padding: '3px 2px 3px 5px',
                                    html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                    width: 30,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Required field'
                                     }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtREMEDATE',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 8,
//                                    readOnly: true,
                                    padding: '3 0',
                                    width: 80
                                },
                                {xtype: 'tbspacer', width: 55},
                                {
                                    xtype: 'label',
                                    text: 'Case Type',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 80,
                                    padding: '3 0'
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtREMETIPO',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maskRe: /[a-zA-Z]/,
                                    maxLength: 2,
//                                    readOnly: true,
                                    padding: '3 0',
                                    width: 60,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 60},
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            hidden: false,
                            border: false,
                            bodyStyle: 'background:#e5efe7',
                            margin: '0 2 1 20',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Operation Curr.',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 100,
                                    padding: '3 0'
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCURRAUTH2',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maskRe: /[a-zA-Z]/,
                                    maxLength: 3,
//                                    readOnly: true,
                                    padding: '3 0',
                                    width: 60,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    xtype: 'label',
                                    text: 'Operation Cost',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 100,
                                    padding: '3 0'
                                },
                                {xtype: 'tbspacer', width: 45},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtOPEAMOUNT',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    value: '0.00',
                                    maskRe: /[0-9-.]/,
                                    maxLength: 13,
//                                    readOnly: true,
                                    padding: '3 0',
                                    width: 110
                                },
                                {xtype: 'tbspacer', width: 25},
                                {
                                    xtype: 'label',
                                    text: 'Flag Selection',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 100,
                                    padding: '3 0'
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-de-cmbFSELEC',
                                    fieldStyle: 'text-align:left',
                                    valueField: 'code',
                                    displayField: 'name',
//                                    readOnly: true,
                                    padding: '3 0',
                                    width: 110
                                },
                                {xtype: 'tbspacer', width: 10},
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#e5efe7',
                            margin: '0 2 10 20',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'IVA Curr.',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 80,
                                    padding: '3 0'
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCURRAUTH3',
                                    fieldStyle: 'text-align:left',
//                                    readOnly: true,
                                    enforceMaxLength: true,
                                    maskRe: /[a-zA-Z]/,
                                    maxLength: 3,
                                    padding: '3 0',
                                    width: 60,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    xtype: 'label',
                                    text: 'IVA Amount',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 80,
                                    padding: '3 0'
                                },
                                {xtype: 'tbspacer', width: 65},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtIVA',
                                    fieldStyle: 'text-align:right',
//                                    readOnly: true,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9-.]/,
                                    value: '0.00',
                                    maxLength: 13,
                                    padding: '3 0',
                                    width: 110
                                },
                                {xtype: 'tbspacer', width: 25},
                                {
                                    xtype: 'label',
                                    text: 'Selection Date',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 100,
                                    padding: '3 0'
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-txtFECSELEC',
                                    fieldStyle: 'text-align:left',
//                                    readOnly: true,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 8,
                                    padding: '3 0',
                                    width: 110,
                                },
                                {xtype: 'tbspacer', width: 10},
                            ]
                        },
                    ]
                },
                {
                    xtype: 'label',
                    html: '<strong style="color:#121E31; text-decoration: underline; ">Control Information</strong>',
                    textDecoration: 'underline',
                    height: 100,
                    fontSize: '11',
                    style: 'font-weight:bold;color:#0B333C;',
                    width: 234,
                    margin: '40 2 0 20',

                },
                {
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '5 2 5 30',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Creator User ',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 110,
                                    height: 20
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtUSCR',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 70},
                                {
                                    xtype: 'label',
                                    text: 'Creation Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 110
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFECR',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 70},
                                {
                                    xtype: 'label',
                                    text: 'Creation Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 110
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtHOCR',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            layout: 'hbox',
                            margin: '0 0 10 30',

                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'User Update',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 110
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtUSUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 70},
                                {
                                    xtype: 'label',
                                    text: 'Update Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 110
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFEUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 70},
                                {
                                    xtype: 'label',
                                    text: 'Update Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 110
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtHOUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '0 0 10 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Save',
                    id: prototype.id + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.id + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
}
);