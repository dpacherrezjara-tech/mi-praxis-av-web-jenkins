


Ext.define('Ext.Praxis.view.flown.OwnerlessCouponForm.DataEntry2', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry2',
    controller: prototype.id + '-dataEntryController2',
    requires: [
        'Ext.Praxis.controller.flown.OwnerlessCoupon.DataEntryOwnerlessCouponController2'
    ],
    title: 'Flight Manifest - Data Entry Form',
    header: true,
//    bodyStyle: 'background: transparent',
    height: 630,
    width: 870,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,
//    padding: '30px',

    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            id: prototype.id2 + '-form',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '20 5 5 0',
                    items: [
                        {xtype: 'tbspacer', width: 7},
                        {
                            xtype: 'label',
                            text: 'Flight Date',
                            style: 'font-weight:bold;color:#000;',
                            width: 110,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'YYYYMMDD'
                            }
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            style: 'font-weight:bold;color:red;',
                            width: 20
                        },
                        {xtype: 'tbspacer', width: 13},
                        {
                            xtype: 'textfield',
                            id: prototype.id2 + '-txtDFLIGHT',
                            readOnly: true,
                            enforceMaxLength: true,
                            maxLength: 8,
                            width: 100
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Flight Number',
                            style: 'font-weight:bold;color:#000;',
                            width: 100
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            style: 'font-weight:bold;color:red;',
                            width: 20
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'textfield',
                            id: prototype.id2 + '-txtNFLIGHT',
                            readOnly: true,
                            enforceMaxLength: true,
                            maxLength: 5,
                            width: 100
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Status',
                            style: 'font-weight:bold;color:#000;',
                            width: 100
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            style: 'font-weight:bold;color:red;',
                            width: 20
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'combobox',
                            id: prototype.id2 + '-cmbSTVAL',
                            // store: Ext.create('Ext.Praxis.store.flown.SSIMDuplicated.ComboBoxStatus'),
                            queryMode: 'local',
                            triggerAction: 'all',
                            forceSelection: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            value: '2',
                            emptyText: '[select]',
                            width: 100
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {xtype: 'tbspacer', width: 7},
                        {
                            xtype: 'label',
                            text: 'Departure',
                            style: 'font-weight:bold;color:#000;',
                            width: 110,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Departure City'
                            }
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            style: 'font-weight:bold;color:red;',
                            width: 20
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'textfield',
                            id: prototype.id2 + '-txtCDEPART',
                            readOnly: true,
                            enforceMaxLength: true,
                            maxLength: 3,
                            width: 100
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Arrival',
                            style: 'font-weight:bold;color:#000;',
                            width: 100,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Arrival City'
                            }
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            style: 'font-weight:bold;color:red;',
                            width: 20
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'textfield',
                            id: prototype.id2 + '-txtCARRIVA',
                            readOnly: true,
                            enforceMaxLength: true,
                            maxLength: 3,
                            width: 100
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Zone',
                            style: 'font-weight:bold;color:#000;',
                            width: 120
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'textfield',
                            id: prototype.id2 + '-txtZONE',
                            readOnly: true,
                            enforceMaxLength: true,
                            maxLength: 3,
                            width: 100
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {xtype: 'tbspacer', width: 7},
                        {
                            xtype: 'label',
                            text: 'Carrier Operator',
                            style: 'font-weight:bold;color:#000;',
                            width: 110
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            style: 'font-weight:bold;color:red;',
                            width: 20
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'textfield',
                            id: prototype.id2 + '-txtCARRI',
                            enforceMaxLength: true,
                            maxLength: 2,
                            width: 100
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Leg Sequence',
                            style: 'font-weight:bold;color:#000;',
                            width: 120
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'textfield',
                            id: prototype.id2 + '-txtLEGSEQ',
                            enforceMaxLength: true,
                            maxLength: 2,
                            width: 100
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    border: false,
                    bodyStyle: 'background: #E5ECEF',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '5 0 10 5',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    html: '<strong style="color:#000; text-decoration: underline; ">SSIM File Information</strong>'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            margin: '1 0 5 5',
                            layout: 'column',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Received Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'YYYYMMDD'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id2 + '-txtFSENDSS',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    text: 'Flag SSIM',
                                    margin: '0 0 0 20',
                                    style: 'font-weight:bold;color:#000;text-align:left;',
                                    width: 110
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id2 + '-cmbFSTASS',
                                    //store: Ext.create('Ext.Praxis.store.flown.SSIMDuplicated.ComboBoxFlagSSIM'),
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    forceSelection: true,
                                    caseSensitive: true,
                                    disabled: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    value: '',
                                    emptyText: '[select]',
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    text: 'Flag Flown',
                                    style: 'font-weight:bold;color:#000;text-align:center;',
                                    width: 120
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id2 + '-cmbFFLOW',
                                    //store: Ext.create('Ext.Praxis.store.flown.SSIMDuplicated.ComboBoxFlagFlow'),
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    forceSelection: true,
                                    caseSensitive: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    value: '',
                                    emptyText: '[select]',
                                    width: 100
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            border: false,
                            margin: '1 0 5 5',
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Plane Nbr',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id2 + '-txtNPLANE',
                                    enforceMaxLength: true,
                                    maxLength: 10,
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    margin: '0 0 0 20',
                                    text: 'Type Operator',
                                    style: 'font-weight:bold;color:#000;text-align: left',
                                    width: 110
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id2 + '-cmbTOPER',
                                    //store: Ext.create('Ext.Praxis.store.flown.SSIMDuplicated.ComboBoxTOper'),
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    disabled: true,
                                    forceSelection: true,
                                    caseSensitive: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    value: '',
                                    emptyText: '[select]',
                                    width: 100
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            border: false,
                            margin: '1 0 5 0',
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'vbox',
                                    border: false,
                                    bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'column',
                                            border: false,
                                            margin: '1 0 5 25',
                                            bodyStyle: 'background: #E5ECEF',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Scheduled time of Passenger',
                                                    margin: '0 0 0 20',
                                                    style: 'font-weight:bold;color:#000;text-align:center; text-decoration: underline;',
                                                    width: 300
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            margin: '1 0 5 5',
                                            bodyStyle: 'background: #E5ECEF',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Departure',
                                                    style: 'font-weight:bold;color:#000;',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id2 + '-txtLOCDEP',
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/,
                                                    maxLength: 4,
                                                    fieldStyle: 'text-align:right',
                                                    width: 60
                                                }, {xtype: 'tbspacer', width: 15},
                                                {
                                                    xtype: 'label',
                                                    text: 'Arrival',
                                                    style: 'font-weight:bold;color:#000;',
                                                    width: 80
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id2 + '-txtLOCARR',
                                                    enforceMaxLength: true,
                                                    fieldStyle: 'text-align:right',
                                                    maxLength: 4,
                                                    maskRe: /[0-9]/,
                                                    width: 60
                                                }

                                            ]
                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'vbox',
                                    margin: '0 0 0 20',
                                    border: false,
                                    bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'column',
                                            border: false,
                                            margin: '1 0 5 25',
                                            bodyStyle: 'background: #E5ECEF',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'UTC/Local Time Variation',
                                                    margin: '0 0 0 20',
                                                    style: 'font-weight:bold;color:#000;text-align:center; text-decoration: underline;',
                                                    width: 300
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            margin: '1 0 5 5',
                                            bodyStyle: 'background: #E5ECEF',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Departure',
                                                    style: 'font-weight:bold;color:#000;',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id2 + '-txtUTCDEP',
                                                    enforceMaxLength: true,
                                                    fieldStyle: 'text-align:right',
                                                    maskRe: /[0-9-]/,
                                                    maxLength: 5,
                                                    width: 60
                                                }, {xtype: 'tbspacer', width: 15},
                                                {
                                                    xtype: 'label',
                                                    text: 'Arrival',
                                                    style: 'font-weight:bold;color:#000;',
                                                    width: 80
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id2 + '-txtUTCARR',
                                                    enforceMaxLength: true,
                                                    fieldStyle: 'text-align:right',
                                                    maxLength: 5,
                                                    maskRe: /[0-9-]/,
                                                    width: 60
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
                    layout: 'column',
                    border: false,
                    bodyStyle: 'background: #EFE9E5',
                    items: [
                        {
                            xtype: 'panel',
                            margin: '5 0 5 5',
                            layout: 'column',
                            border: false,
                            bodyStyle: 'background: #EFE9E5',
                            items: [
                                {
                                    xtype: 'label',
                                    padding: '0px 80px 0px 0px',
                                    html: '<strong style="color:#000; text-decoration: underline; ">ODS File Information</strong>'
                                },
                                {xtype: 'tbspacer', width: 300},
                                {
                                    xtype: 'label',
                                    margin: '0 0 0 25',
                                    id: prototype.id2 + '-txtA1691-DESCRIP-label',
                                    html: '<strong style="color:red;">(*)</strong>',
                                    hidden: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id2 + '-txtDESCRIP',
                                    enforceMaxLength: true,
                                    maxLength: 50,
                                    inputAttrTpl: "data-qtip='Enter an observation if is needed'",
                                    width: 400,
                                    hidden: true
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            margin: '1 0 2 5',
                            layout: 'column',
                            border: false,
                            bodyStyle: 'background: #EFE9E5',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Received Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'YYYYMMDD'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id2 + '-txtFSENDOD',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    width: 100
                                },
                                {
                                    xtype: 'button',
                                    margin: '1 5 1 15',
                                    text: 'Qty Coupons',
                                    tooltip: 'Qty ODS Coupons',
                                    listeners: {
                                        click: 'onQtyCouponsClick'
                                    },
                                    width: 130
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id2 + '-txtQCPNOD',
                                    readOnly: false,
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    text: 'Flag ODS',
                                    style: 'font-weight:bold;color:#000;text-align:center;',
                                    width: 120
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id2 + '-cmbFSTAOD',
                                    //  store: Ext.create('Ext.Praxis.store.flown.SSIMDuplicated.ComboBoxFlagODS'),
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    forceSelection: true,
                                    caseSensitive: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    value: '',
                                    emptyText: 'Stand By',
                                    width: 100
                                }
                            ]

                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '1 0 5 5',
                            border: false,
                            bodyStyle: 'background: #EFE9E5',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Zulu Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'YYYYMMDD'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id2 + '-txtFOPERZUL',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    margin: '1 1 1 25',
                                    text: 'Qty in Transit',
                                    style: 'font-weight:bold;color:#000;text-align:left;',
                                    width: 125
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id2 + '-txtQCPTRA',
                                    value: '0',
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    width: 100
                                }
                            ]
                        }
                    ]

                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    bodyStyle: {"background-color": "rgb(229, 236, 239)"},
                    items: [
                        {xtype: 'tbspacer', width: 7},
                        {
                            xtype: 'label',
                            text: 'VCR File Information',
                            style: 'font-weight:bold;color:#000;text-decoration: underline;',
                            width: 145
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Received Date',
                            style: 'font-weight:bold;color:#000;',
                            width: 100,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'YYYYMMDD'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id2 + '-txtFSENDVC',
                            readOnly: true,
                            enforceMaxLength: true,
                            maxLength: 8,
                            width: 90
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Qty Coupons',
                            style: 'font-weight:bold;color:#000;',
                            width: 100
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id2 + '-txtQCPNVC',
                            readOnly: true,
                            fieldStyle: 'text-align:right',
                            enforceMaxLength: true,
                            maxLength: 5,
                            width: 90
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Flag',
                            style: 'font-weight:bold;color:#000;',
                            width: 60
                        },
                        {
                            xtype: 'combobox',
                            id: prototype.id2 + '-cmbFSTAVC',
                            //store: Ext.create('Ext.Praxis.store.flown.SSIMDuplicated.ComboBoxFlag'),
                            queryMode: 'local',
                            triggerAction: 'all',
                            forceSelection: true,
                            caseSensitive: true,
                            valueField: 'code',
                            disabled: true,
                            displayField: 'name',
                            value: '',
//                            emptyText: '[select]',
                            width: 110
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    bodyStyle: {"background-color": "rgb(239, 233, 229)"},
                    items: [
                        {xtype: 'tbspacer', width: 7},
                        {
                            xtype: 'label',
                            text: 'Other Information',
                            style: 'font-weight:bold;color:#000;text-decoration: underline;',
                            width: 145
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Qty OCR',
                            style: 'font-weight:bold;color:#000;',
                            width: 100
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id2 + '-txtQCPNOCR',
                            readOnly: true,
                            fieldStyle: 'text-align:right',
                            enforceMaxLength: true,
                            maxLength: 3,
                            width: 90
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Qty Manual',
                            style: 'font-weight:bold;color:#000;',
                            width: 100
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id2 + '-txtQCPNMA',
                            readOnly: true,
                            fieldStyle: 'text-align:right',
                            enforceMaxLength: true,
                            maxLength: 3,
                            width: 90
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Total',
                            style: 'font-weight:bold;color:#000;',
                            width: 60
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id2 + '-txtQCPNTOT',
                            readOnly: true,
                            fieldStyle: 'text-align:right',
                            enforceMaxLength: true,
                            maxLength: 3,
                            width: 110
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    bodyStyle: {"background-color": "rgb(229, 236, 239)"},
                    items: [
                        {xtype: 'tbspacer', width: 7},
                        {
                            xtype: 'label',
                            text: 'Accounting Information',
                            style: 'font-weight:bold;color:#000;text-decoration: underline;',
                            width: 145
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Policy Date',
                            style: 'font-weight:bold;color:#000;',
                            width: 100,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'YYYYMMDD'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id2 + '-txtFCLOSE',
                            readOnly: true,
                            enforceMaxLength: true,
                            maxLength: 8,
                            width: 90
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Qty Coupons',
                            style: 'font-weight:bold;color:#000;',
                            width: 100
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id2 + '-txtQCPNVAL',
                            readOnly: true,
                            fieldStyle: 'text-align:right',
                            enforceMaxLength: true,
                            maxLength: 5,
                            width: 90
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Flag',
                            style: 'font-weight:bold;color:#000;',
                            width: 60
                        },
                        {
                            xtype: 'combobox',
                            id: prototype.id2 + '-cmbFSTAPO',
                            //  store: Ext.create('Ext.Praxis.store.flown.SSIMDuplicated.ComboBoxFlag2'),
                            queryMode: 'local',
                            triggerAction: 'all',
                            forceSelection: true,
                            caseSensitive: true,
                            disabled: true,
                            valueField: 'code',
                            displayField: 'name',
                            value: '',
                            emptyText: '[select]',
                            width: 110
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    bodyStyle: {"background-color": "rgb(239, 233, 229)"},
                    items: [
                        {xtype: 'tbspacer', width: 7},
                        {
                            xtype: 'label',
                            text: 'Physical Flight Manifest',
                            style: 'font-weight:bold;color:#000;text-decoration: underline;',
                            width: 145
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Received Date',
                            style: 'font-weight:bold;color:#000;',
                            width: 100,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'YYYYMMDD'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id2 + '-txtFSENDFI',
                            enforceMaxLength: true,
                            maxLength: 8,
                            width: 90
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Qty Coupons',
                            style: 'font-weight:bold;color:#000;',
                            width: 100
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id2 + '-txtQCPNFI',
                            fieldStyle: 'text-align:right',
                            enforceMaxLength: true,
                            maxLength: 5,
                            width: 90
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'label',
                            text: 'Flag',
                            style: 'font-weight:bold;color:#000;',
                            width: 60
                        },
                        {
                            xtype: 'combobox',
                            id: prototype.id2 + '-cmbFSTAFI',
                            //  store: Ext.create('Ext.Praxis.store.flown.SSIMDuplicated.ComboBoxFlightMF'),
                            queryMode: 'local',
                            triggerAction: 'all',
                            forceSelection: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            value: '',
                            emptyText: '[select]',
                            width: 110
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    id: prototype.id2 + '-ControlData',
                    title: 'Control Data',
                    margin: '15 0 8 0',
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
                                    id: prototype.id2 + '-txt-USCR',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 70},
                                {
                                    xtype: 'label',
                                    text: 'Creation Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id2 + '-txt-FECR',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 70},
                                {
                                    xtype: 'label',
                                    text: 'Creation Time',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id2 + '-txt-HOCR',
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
                                    id: prototype.id2 + '-txt-USUP',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 70},
                                {
                                    xtype: 'label',
                                    text: 'Update Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id2 + '-txt-FEUP',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 70},
                                {
                                    xtype: 'label',
                                    text: 'Update Time',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id2 + '-txt-HOUP',
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
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            margin: '1 0 0 0',
            dock: 'bottom',
            ui: 'footer',
            layout: {
                pack: 'center'
            },
            //fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
//            style: 'background-color: #E3EAF9; padding: 5px;',
            items: [
                {
                    text: 'Save',
                    id: prototype.id2 + '-btn-save',
                    iconCls: 'prx-icon-save',
                    hidden: true,
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id2 + '-btn-update',
                    iconCls: 'prx-icon-update',
                    hidden: true,
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id2 + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    hidden: true,
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.id2 + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                },
                {xtype: 'tbspacer', width: 10},
                {
                    xtype: 'label',
                    text: '(*) Required Fields',
                    style: 'font-weight:bold;color:red;',
                    width: 120
                },
                {xtype: 'tbspacer', width: 10},
                {
                    xtype: 'button',
                    id: prototype.id2 + '-btn-prev',
                    icon: 'resources/img/botones/prev.png',
                    tooltip: 'View Previous Flight Manifest',
                    border: false,
                    listeners: {
                        click: 'onPrevClick'
                    }
                },
                {
                    xtype: 'button',
                    id: prototype.id2 + '-btn-next',
                    icon: 'resources/img/botones/next2.png',
                    tooltip: 'View Next Flight Manifest',
                    border: false,
                    listeners: {
                        click: 'onNextClick'
                    }
                }
            ]
        }
    ]

});