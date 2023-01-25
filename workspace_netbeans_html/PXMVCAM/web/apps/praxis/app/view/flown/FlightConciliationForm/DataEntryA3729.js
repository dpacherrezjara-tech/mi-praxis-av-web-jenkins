Ext.define('Ext.Praxis.view.flown.FlightConciliationForm.DataEntryA3729', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryA3729FlightConciliationForm',
    requires: [
        'Ext.Praxis.controller.flown.FlightConciliation.DataEntryA3729Controller'
    ],
    controller: 'DataEntryA3729Controller',
    title: 'Flight Manifest - Data Entry Form',
    header: true,
    height: 480,
    width: 790,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            id: prototype.id + '-formDataEntryA3729',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                //<editor-fold defaultstate="collapsed" desc="Fila 1">
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '10 0 0 2',
                    items: [
                        {xtype: 'tbspacer', width: 7},
                        {
                            xtype: 'label',
                            text: 'Ticket Number',
                            style: 'font-weight:bold;color:#000;',
                            width: 110,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'CCIA(3) + FORMA(4) + SERIE(6) + CUPON (1)'
                            }
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            style: 'font-weight:bold;color:red;',
                            width: 20,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Mandatory Field'
                            }
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtTICKET',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            allowBlank: false,
                            maskRe: /[0-9]/,
                            maxLength: 13,
                            readOnly: true,
                            width: 100,
                            enableKeyEvents: true
                        },
                        {xtype: 'tbspacer', width: 41},
                        {
                            xtype: 'label',
                            text: 'Coupon',
                            style: 'font-weight:bold;color:#000;',
                            width: 90
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            style: 'font-weight:bold;color:red;',
                            width: 20,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Mandatory Field'
                            }
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCUPON',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            allowBlank: false,
                            readOnly: true,
                            maskRe: /[0-9]/,
                            maxLength: 1,
                            width: 35
                        },
                        /*
                        {xtype: 'tbspacer', width: 65},
                        {
                            xtype: 'label',
                            text: 'Sequence',
                            style: 'font-weight:bold;color:#000;',
                            width: 90
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            style: 'font-weight:bold;color:red;',
                            width: 20,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Mandatory Field'
                            }
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtSEQ',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            readOnly: true,
                            maxLength: 2,
                            width: 50
                        }
                        */
                    ]
                },
                //<editor-fold defaultstate="collapsed" desc="Fila 2">
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '10 0 0 2',
                    items: [
                        {xtype: 'tbspacer', width: 7},
                        {
                            xtype: 'label',
                            text: 'New Ticket',
                            style: 'font-weight:bold;color:#000;',
                            width: 110,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'CCIA(3) + FORMA(4) + SERIE(6) + CUPON (1)'
                            }
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtTICKET_2',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
//                            allowBlank: false,
                            maskRe: /[0-9]/,
                            maxLength: 13,
//                            readOnly: true,
                            width: 100,
                            enableKeyEvents: true
                        },
                        {xtype: 'tbspacer', width: 41},
                        {
                            xtype: 'label',
                            text: 'New Coupon',
                            style: 'font-weight:bold;color:#000;',
                            width: 90
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCUPON_2',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
//                            allowBlank: false,
//                            readOnly: true,
                            maskRe: /[0-9]/,
                            maxLength: 1,
                            width: 35
                        },
                        /*
                        {xtype: 'tbspacer', width: 65},
                        {
                            xtype: 'label',
                            text: 'Sequence',
                            style: 'font-weight:bold;color:#000;',
                            width: 90
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            style: 'font-weight:bold;color:red;',
                            width: 20,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Mandatory Field'
                            }
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtSEQ',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            readOnly: true,
                            maxLength: 2,
                            width: 50
                        }
                        */
                    ]
                },
                //</editor-fold>
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Flight Information">
                {
                    xtype: 'panel',
                    layout: 'column',
                    border: false,
                    bodyStyle: 'background: #E5ECEF',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '10 0 10 7',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    padding: '0px 80px 0px 0px',
                                    html: '<strong style="color:#000; text-decoration: underline; ">Flight Information</strong>'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '0 0 5 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Flight Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 110,
                                    margin: '0 0 0 7',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'YYYYMMDD'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:red;',
                                    width: 20,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtDFLIGHT',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    allowBlank: false,
                                    readOnly: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 8,
                                    width: 100,
                                    margin: '0 0 0 10'
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    text: 'Flight Number',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 110,
                                    margin: '0 0 0 30'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtNFLIGHT',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    allowBlank: false,
                                    maskRe: /[0-9]/,
                                    maxLength: 4,
                                    width: 60,
                                    margin: '0 0 0 10'
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Pax Type',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 90
                                },
                                {
                                    xtype: 'combo',
                                    id:prototype.id+'-cmbTPAX',
                                    fieldStyle: 'text-align:left;',
                                    valueField: 'code',
                                    displayField: 'name',
                                    allowBlank: true,
                                    width: 80,
                                    editable: false
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '0 0 5 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Departure',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 100,
                                    margin: '0 0 0 7',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Departure City'
                                    }
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCDEPART',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    minLength: 3,
                                    maxLength: 3,
                                    maskRe: /[a-zA-Z]/,
                                    width: 60,
                                    margin: '0 0 0 10',
                                    listeners:{
                                        change: 'onUpperValue',
                                    }
                                },
                                {xtype: 'tbspacer', width: 51},
                                {
                                    xtype: 'label',
                                    text: 'Arrival',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 90,
                                    margin: '0 0 0 30',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Arrival City'
                                    }
                                },
                                {xtype: 'tbspacer', width: 19},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCARRIVA',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    minLength: 3,
                                    maxLength: 3,
                                    maskRe: /[a-zA-Z]/,
                                    width: 60,
                                    margin: '0 0 0 10',
                                    listeners:{
                                        change: 'onUpperValue',
                                    }
                                },
                                {xtype: 'tbspacer', width: 11},
                                {
                                    xtype: 'label',
                                    text: 'Seat',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 89,
                                    margin: '0 0 0 30'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCHAIR',
                                    fieldStyle: 'text-align:center',
                                    readOnly: true,
//                                    enforceMaxLength: true,
//                                    maxLength: 3,
                                    width: 30,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '0 0 5 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Last Name',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120,
                                    margin: '0 0 0 7'
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtLNAME',
                                    fieldStyle: 'text-align:left',
//                                    readOnly: true,
//                                    enforceMaxLength: true,
//                                    maxLength: 10,
                                    width: 110,
                                    margin: '0 0 0 10'
                                },
                                 {
                                    xtype: 'label',
                                    text: 'First Name',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 110,
                                    margin: '0 0 0 30'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFNAME',
                                    fieldStyle: 'text-align:left',
//                                    readOnly: true,
//                                    enforceMaxLength: true,
//                                    maxLength: 10,
                                    width: 110,
                                    margin: '0 0 0 10'
                                }
                                
                                
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Information">
                {
                    xtype: 'panel',
                    layout: 'column',
                    border: false,
                    bodyStyle: 'background: #EFE9E5',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '10 0 10 7',
                            border: false,
                            bodyStyle: 'background: #EFE9E5',
                            items: [
                                {
                                    xtype: 'label',
                                    padding: '0px 80px 0px 0px',
                                    html: '<strong style="color:#000; text-decoration: underline; ">Information</strong>'
                                },
                                { xtype: 'tbspacer', width: 500 }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '0 0 5 0',
                            border: false,
                            bodyStyle: 'background: #EFE9E5',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Status',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 130,
                                    margin: '0 0 0 18'
                                },
                                {
                                    xtype: 'combo',
                                    id:prototype.id+'-cmbSTVAL',
                                    fieldStyle: 'text-align:left;',
                                    valueField: 'code',
                                    displayField: 'name',
                                    width: 100,
                                    editable: false
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'VCR vs Manifest',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'combo',
                                    id:prototype.id+'-cmbSTVCR',
                                    fieldStyle: 'text-align:left;',
                                    valueField: 'code',
                                    displayField: 'name',
                                    width: 60,
                                    editable: false
                                },
                                {xtype: 'tbspacer', width: 41},
                                {
                                    xtype: 'label',
                                    text: 'Sales-Praxis',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 80
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'combo',
                                    id:prototype.id+'-cmbFSALES',
                                    fieldStyle: 'text-align:left;',
                                    valueField: 'code',
                                    displayField: 'name',
                                    width: 80,
                                    editable: false
                                }
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Process Sabre">
                {
                    xtype: 'panel',
                    layout: 'column',
                    border: false,
                    bodyStyle: 'background: #EFE9E5',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '2 0 10 7',
                            border: false,
                            bodyStyle: 'background: #EFE9E5',
                            items: [
                                {
                                    xtype: 'label',
                                    padding: '0px 80px 0px 0px',
                                    html: '<strong style="color:#000; text-decoration: underline; ">Process Sabre</strong>'
                                },
                                { xtype: 'tbspacer', width: 500 }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '0 0 5 0',
                            border: false,
    
                            bodyStyle: 'background: #EFE9E5',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Scan',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 130,
                                    margin: '0 0 0 18'
                                },
                                {
                                    xtype: 'combo',
                                    id:prototype.id+'-cmbFSABRE',
                                    fieldStyle: 'text-align:left;',
                                    valueField: 'code',
                                    displayField: 'name',
                                    width: 100,
                                    editable: false
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Status',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                 {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtSTASABR',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 5,
                                    width: 60,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="ControlData">
                {
                    xtype: 'fieldset',
                    id: prototype.id + '-ControlData',
                    title: '<strong style="color:#000; text-decoration: underline; ">Control Data</strong>',
                    width: 760,
                    border: true,
                    defaults: {
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
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Creator User',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtUSCR',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 60},
                                {
                                    xtype: 'label',
                                    text: 'Creation Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFECR',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 60},
                                {
                                    xtype: 'label',
                                    text: 'Creation Time',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtHOCR',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners: {
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
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'User Update',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtUSUP',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 60},
                                {
                                    xtype: 'label',
                                    text: 'Update Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFEUP',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 60},
                                {
                                    xtype: 'label',
                                    text: 'Update Time',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtHOUP',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners: {
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
            margin: '10 0 10 0',
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
                    hidden: true,
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id + '-btn-update',
                    iconCls: 'prx-icon-update',
                    hidden: true,
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    hidden: true,
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
                },
                {xtype: 'tbspacer', width: 30},
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