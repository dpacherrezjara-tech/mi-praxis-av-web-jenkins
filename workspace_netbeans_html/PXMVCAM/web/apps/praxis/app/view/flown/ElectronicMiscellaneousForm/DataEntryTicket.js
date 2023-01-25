/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.ElectronicMiscellaneousForm.DataEntryTicket', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntryTicketController',
    controller: prototype.id + '-dataEntryTicketController',
    requires: [
        'Ext.Praxis.controller.flown.ElectronicMiscellaneous.DataEntryTicketElectronicMiscellaneousController'
    ],
    title: 'Ticket - Data Entry',
    width: 950,
    height: 640,
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        align: 'center'
    },
    //modal: true,
    items: [
        {
            region: 'center',
            xtype: 'form',
            id: prototype.id + '-t' + '-DataEntry-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    // width: 760,
                    margin: '5 20 5 20',
                    border: false,
                    // bodyStyle: 'background: #EFE9E5',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            margin: '1 0 1 0',
                            border: false,
                            //  bodyStyle: 'background: #EFE9E5',
                            items: [
                                {
                                    layout: 'hbox',
                                    margin: '1 0 1 0',
                                    border: false,
                                    //bodyStyle: 'background: #EFE9E5',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-t' + '-txtTicket',
                                            required: true,
                                            // readOnly: true,
                                            fieldLabel: '<strong style="color:#000;">Ticket Number</strong>',
                                            width: 215,
                                            labelWidth: 115,
                                            labelAlign: 'left',
                                            padding: '1px 5px 0px 10',
                                            enforceMaxLength: true,
                                            maxLength: 14,
                                            maskRe: /[0-9]/,
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip-width': 400,
                                                'data-qtip': 'CCIA(3) + FORMA(4) + SERIE(6) + CUPON (1)'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-t' + '-txtCupon',
                                            required: true,
                                            // readOnly: true,
                                            width: 20,
                                            labelAlign: 'left',
                                            padding: '1px 5px 0px 5',
                                            enforceMaxLength: true,
                                            maxLength: 1,
                                            maskRe: /[0-9]/
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-t' + '-txtDCHEQ',
                                            required: true,
                                            //readOnly: true,
                                            fieldLabel: '<strong style="color:#000;">Check Digit</strong>&nbsp&nbsp<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                            width: 135,
                                            labelWidth: 105,
                                            labelAlign: 'left',
                                            padding: '1px 5px 0px 5',
                                            enforceMaxLength: true,
                                            fieldStyle: 'text-align: center;',
                                            //maxLength: 1,
                                            maskRe: /[0-9]/
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-t' + '-txtRoll',
                                            required: true,
                                            // readOnly: true,
                                            fieldLabel: '<strong style="color:#000;">Rolling</strong>',
                                            width: 85,
                                            labelWidth: 50,
                                            labelAlign: 'left',
                                            padding: '1px 5px 0px 5',
                                            enforceMaxLength: true,
                                            fieldStyle: 'text-align: center;',
                                            maxLength: 2,
                                            maskRe: /[0-9]/
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-t' + '-txtSEQ',
                                            required: true,
                                            // readOnly: true,
                                            fieldLabel: '<strong style="color:#000;">Sequence</strong>',
                                            width: 115,
                                            labelWidth: 80,
                                            labelAlign: 'left',
                                            padding: '1px 5px 0px 5',
                                            enforceMaxLength: true,
                                            fieldStyle: 'text-align: center;',
                                            maxLength: 2,
                                            maskRe: /[0-9]/
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-t' + '-txtFCONT',
                                            fieldLabel: '<strong style="color:#000;">Accounting Date </strong>',
                                            width: 220,
                                            labelWidth: 140,
                                            enforceMaxLength: true,
                                            maxLength: 8,
                                            padding: '1px 5px 0px 5',
                                            format: 'Ymd',
                                            maskRe: /[0-9.]/,
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip-width': 400,
                                                'data-qtip': 'Accounting Date (YYYYMM)'
                                            }
                                        }

                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            margin: '1 0 1 0',
                            border: false,
                            //  bodyStyle: 'background: #EFE9E5',
                            items: [
                                {
                                    layout: 'hbox',
                                    margin: '1 0 1 0',
                                    border: false,
                                    //bodyStyle: 'background: #EFE9E5',
                                    items: [
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-t' + '-cmbTEMD',
                                            required: true,
                                            //disabled: true,                                           
                                            fieldLabel: '<strong style="color:#000;">Type EMD</strong>',
                                            width: 215,
                                            labelWidth: 115,
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            valueField: 'code',
                                            displayField: 'name',
                                            margin: '1px 5px 0px 10px'

                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-t' + '-cmbFLOAD',
                                            required: true,
                                            //disabled: true,
                                            fieldLabel: '<strong style="color:#000;">Flag Load</strong>',
                                            width: 200,
                                            labelWidth: 110,
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            valueField: 'code',
                                            displayField: 'name',
                                            margin: '1px 5px 0px 5px'
                                        },
                                        {xtype: 'tbspacer', width: 60},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-t' + '-cmbSTVAL',
                                            required: true,
                                            //disabled: true,
                                            fieldLabel: '<strong style="color:#000;">Status</strong>',
                                            width: 200,
                                            labelWidth: 100,
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            valueField: 'code',
                                            displayField: 'name',
                                            margin: '1px 5px 0px 5px'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            margin: '1 0 1 0',
                            border: false,
                            //  bodyStyle: 'background: #EFE9E5',
                            items: [
                                {
                                    layout: 'hbox',
                                    margin: '1 0 1 0',
                                    border: false,
                                    //bodyStyle: 'background: #EFE9E5',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-t' + '-txtRECODE',
                                            required: true,
                                            //readOnly: true,
                                            fieldLabel: '<strong style="color:#000;">Reason Code</strong>',
                                            width: 215,
                                            labelWidth: 115,
                                            labelAlign: 'left',
                                            padding: '1px 5px 0px 10',
                                            enforceMaxLength: true,
                                            maxLength: 4
                                                    //maskRe: /[0-9]/,                                            
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-t' + '-txtTKTASO',
                                            required: true,
                                            // readOnly: true,
                                            fieldLabel: '<strong style="color:#000;">Associated Ticket </strong>',
                                            width: 220,
                                            labelWidth: 110,
                                            labelSeparator: ' ',
                                            labelAlign: 'left',
                                            padding: '1px 5px 0px 5',
                                            enforceMaxLength: true,
                                            fieldStyle: 'text-align: center;',
                                            maxLength: 14
                                                    // maskRe: /[0-9]/
                                        },
                                        {xtype: 'tbspacer', width: 40},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-t' + '-txtIDCON',
                                            required: true,
                                            // readOnly: true,
                                            fieldLabel: '<strong style="color:#000;">Id Accounting</strong>',
                                            width: 390,
                                            labelWidth: 100,
                                            labelAlign: 'left',
                                            padding: '1px 5px 0px 5',
                                            enforceMaxLength: true,
                                            fieldStyle: 'text-align: center;'
                                            //maxLength: 4
                                                    //maskRe: /[0-9]/
                                        }

                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    width: 900,
                    margin: '1 20 5 20',
                    border: false,
                    bodyStyle: 'background: #E5ECEF',
                    items: [
                        {
                            xtype: 'label',
                            labelAlign: 'center',
                            padding: '1px 5px 0px 10px',
                            margin: '1px px 4px 0px',
                            html: '<strong style="color:#000; text-decoration: underline; ">Flight Information</strong>'

                        },
                        {
                            layout: 'hbox',
                            width: 900,
                            margin: '5 0 2 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            defaults: {
                                padding: '1px 2px 0px 2px'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    html: '<strong style="color:#000;">Departure</strong>',
                                    width: 100,
                                    padding: '1px 5px 0px 10px'

                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                    width: 30
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-t' + '-txtCDEPART',
                                    required: true,
                                    // readOnly: true,
                                    fieldLabel: '',
                                    width: 90,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    maxLength: 3,
                                    fieldStyle: 'text-align: left;',
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    html: '<strong style="color:#000;">Arrival</strong>',
                                    width: 130,
                                    padding: '1px 5px 0px 10px'

                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                    width: 30
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-t' + '-txtCARRIVA',
                                    required: true,
                                    //readOnly: true,
                                    fieldLabel: '',
                                    width: 90,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    fieldStyle: 'text-align: left;',
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    html: '<strong style="color:#000;">Zone</strong>',
                                    width: 80,
                                    padding: '1px 5px 0px 10px'

                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    // html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                    width: 30
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-t' + '-txtZONE',
                                    required: true,
                                    // readOnly: true,
                                    fieldLabel: '',
                                    width: 90,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    fieldStyle: 'text-align: left;',
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                }

                            ]
                        },
                        {
                            layout: 'hbox',
                            width: 750,
                            margin: '1 0 1 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            defaults: {
                                padding: '1px 2px 0px 2px'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    html: '<strong style="color:#000;">Flight Date</strong>',
                                    width: 100,
                                    padding: '1px 5px 0px 10px',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip-width': 300,
                                        'data-qtip': 'YYYYMMDD'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                    width: 30
                                },
                                {
                                    xtype: 'datefield',
                                    id: prototype.id + '-t' + '-txtDFLIGHT',
                                    fieldLabel: '',
                                    width: 90,
                                    labelWidth: 0,
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    format: 'Ymd',
                                    maskRe: /[0-9.]/
                                },
//                                {
//                                    xtype: 'textfield',
//                                    id: prototype.id + '-t' + '-txtDFLIGHT',
//                                    required: true,
//                                    // readOnly: true,
//                                    fieldLabel: '',
//                                    width: 90,
//                                    labelWidth: 0,
//                                    labelAlign: 'left',
//                                    enforceMaxLength: true,
//                                    maxLength: 8,
//                                    maskRe: /[0-9]/,
//                                    fieldStyle: 'text-align: left;'
//                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    html: '<strong style="color:#000;">Flight Number</strong>',
                                    width: 130,
                                    padding: '1px 5px 0px 10px'

                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                    width: 30
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-t' + '-txtNFLIGHT',
                                    required: true,
                                    // readOnly: true,
                                    fieldLabel: '',
                                    width: 90,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    enforceMaxLength: true,
                                    maxLength: 4,
                                    maskRe: /[0-9]/,
                                    fieldStyle: 'text-align: left;'
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    html: '<strong style="color:#000;">Plane Nbr</strong>',
                                    width: 80,
                                    padding: '1px 5px 0px 10px'

                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    //html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                    width: 30
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-t' + '-txtNPLANE',
                                    required: true,
                                    //readOnly: true,
                                    fieldLabel: '',
                                    width: 90,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    enforceMaxLength: true,
                                    maxLength: 10,
                                    fieldStyle: 'text-align: left;',
                                    listeners: {
                                        change: 'onUpperValue'
                                    }

                                }

                            ]
                        },
                        {
                            layout: 'hbox',
                            width: 750,
                            margin: '1 0 1 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            defaults: {
                                padding: '1px 2px 0px 2px'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    html: '<strong style="color:#000;">Itinerary</strong>',
                                    width: 100,
                                    padding: '1px 5px 0px 10px'
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    //html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                    width: 30
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-t' + '-txtITINERA',
                                    required: true,
                                    // readOnly: true,
                                    fieldLabel: '',
                                    width: 90,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    enforceMaxLength: true,
                                    maxLength: 2,
                                    //maskRe: /[0-9]/,
                                    fieldStyle: 'text-align: left;'
                                },
                                //{xtype: 'tbspacer', width: 224},
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    html: '<strong style="color:#000;">Leg Secuence</strong>',
                                    width: 130,
                                    padding: '1px 5px 0px 10px'

                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    //html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                    width: 30
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-t' + '-txtLEGSEQ',
                                    required: true,
                                    // readOnly: true,
                                    fieldLabel: '',
                                    width: 90,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    enforceMaxLength: true,
                                    maxLength: 2,
                                    maskRe: /[0-9]/,
                                    fieldStyle: 'text-align: left;'
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    html: '<strong style="color:#000;">Source</strong>',
                                    width: 80,
                                    padding: '1px 5px 0px 10px'

                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    //html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                    width: 30
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-t' + '-cmbFTE',
                                    required: true,
                                    // disabled: true,
                                    fieldLabel: '',
                                    width: 90,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name'

                                }



                            ]
                        },
                        {
                            layout: 'hbox',
                            width: 750,
                            margin: '1 0 1 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            defaults: {
                                padding: '1px 2px 0px 2px'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    html: '<strong style="color:#000;">Flag Origin</strong>',
                                    width: 100,
                                    padding: '1px 5px 0px 10px',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip-width': 300,
                                        'data-qtip': 'YYYYMMDD'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    //html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                    width: 30
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-t' + '-cmbSTORG',
                                    required: true,
                                    //disabled: true,
                                    fieldLabel: '',
                                    width: 90,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name'

                                }

                            ]
                        }
                    ]
                }, //SALES INFORMATION
                {//----------------------------------------------
                    xtype: 'panel',
                    layout: 'vbox',
                    width: 900,
                    margin: '1 20 1 20',
                    border: false,
                    bodyStyle: 'background: #EFE9E5',
                    items: [
                        {
                            xtype: 'label',
                            labelAlign: 'center',
                            padding: '1px 5px 0px 10px',
                            margin: '1px px 4px 0px',
                            html: '<strong style="color:#000; text-decoration: underline; ">Sales Information</strong>'
                        },
                        {
                            layout: 'hbox',
                            width: 900,
                            margin: '1 0 1 0',
                            border: false,
                            bodyStyle: 'background: #EFE9E5',
                            items: [
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    html: '<strong style="color:#000;">Document Code</strong>',
                                    width: 130,
                                    padding: '1px 5px 0px 10px',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip-width': 300,
                                        'data-qtip': 'Examples: TKTT / TKTM / TKTA'
                                    }
                                },
//                                {
//                                    xtype: 'label',
//                                    labelAlign: 'center',
//                                    //html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
//                                    width: 30
//                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-t' + '-txtCDOC',
                                    required: true,
                                    //readOnly: true,
                                    fieldLabel: '',
                                    width: 90,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip-width': 300,
                                        'data-qtip': 'Examples: TKTT / TKTM / TKTA'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    html: '<strong style="color:#000;">Document Type</strong>',
                                    width: 130,
                                    padding: '1px 5px 0px 10px'

                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    // html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                    width: 30
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-t' + '-cmbTDOC',
                                    required: true,
                                    // disabled: true,
                                    fieldLabel: '',
                                    width: 90,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name'

                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    html: '<strong style="color:#000;">Country</strong>',
                                    width: 90,
                                    padding: '1px 5px 0px 10px'
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    // html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                    width: 20
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-t' + '-txtPSVVTA',
                                    //readOnly: true,
                                    required: true,
                                    fieldLabel: '',
                                    width: 90,
                                    labelWidth: 0,
                                    labelAlign: 'left'

                                }

                            ]
                        },
                        {
                            layout: 'hbox',
                            width: 750,
                            margin: '1 0 1 0',
                            border: false,
                            bodyStyle: 'background: #EFE9E5',
                            items: [
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    html: '<strong style="color:#000;">Agent</strong>',
                                    width: 130,
                                    padding: '1px 5px 0px 10px'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-t' + '-txtAGTIA',
                                    //readOnly: true,
                                    required: true,
                                    fieldLabel: '',
                                    width: 90,
                                    labelWidth: 0,
                                    labelAlign: 'left'
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    html: '<strong style="color:#000;">Sales Date</strong>',
                                    width: 130,
                                    padding: '1px 5px 0px 10px'

                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    // html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                    width: 30
                                },
                                {
                                    xtype: 'datefield',
                                    id: prototype.id + '-t' + '-txtFVTA',
                                    fieldLabel: '',
                                    width: 90,
                                    labelWidth: 0,
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    format: 'Ymd',
                                    maskRe: /[0-9.]/
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    html: '<strong style="color:#000;">Sales Type</strong>',
                                    width: 90,
                                    padding: '1px 5px 0px 10px'
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    // html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                    width: 20
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-t' + '-cmbTVTA',
                                    required: true,
                                    //disabled: true,
                                    fieldLabel: '',
                                    width: 90,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name'

                                }


                            ]
                        },
                        {
                            layout: 'hbox',
                            width: 750,
                            margin: '1 0 1 0',
                            border: false,
                            bodyStyle: 'background: #EFE9E5',
                            items: [
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    html: '<strong style="color:#000;">Pax Type</strong>',
                                    width: 130,
                                    padding: '1px 5px 0px 10px'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-t' + '-cmbTPAX',
                                    required: true,
                                    //disabled: true,
                                    fieldLabel: '',
                                    width: 90,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name'
                                }
                            ]
                        }
                    ]
                }


                , {//----------------------------------------------
                    xtype: 'panel',
                    layout: 'vbox',
                    width: 900,
                    margin: '1 20 1 20',
                    border: false,
                    bodyStyle: 'background: #E5ECEF',
                    items: [
                        {
                            xtype: 'label',
                            labelAlign: 'center',
                            padding: '1px 5px 0px 10px',
                            margin: '1px px 4px 0px',
                            html: '<strong style="color:#000; text-decoration: underline; ">Coupon Information</strong>'
                        },
                        {
                            layout: 'hbox',
                            width: 900,
                            margin: '1 0 1 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    html: '<strong style="color:#000;">Use Type</strong>',
                                    width: 100,
                                    padding: '1px 5px 0px 10px'
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    //html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                    width: 30
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-t' + '-cmbTOPUS',
                                    required: true,
                                    // disabled: true,
                                    fieldLabel: '',
                                    width: 90,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name'

                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    html: '<strong style="color:#000;">Carrier</strong>',
                                    width: 132,
                                    padding: '1px 5px 0px 10px'

                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-t' + '-txtCARR',
                                    required: true,
                                    //readOnly: true,
                                    fieldLabel: '',
                                    width: 70,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    enforceMaxLength: true,
                                    maxLength: 2,
                                    maskRe: /[AMD5]/,
                                    fieldStyle: 'text-align: left;',
                                    listeners: {
                                        change: 'onUpperValue',
                                        focusleave:'onFocusLeaveOpe'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    html: '<strong style="color:#000;">Cabin</strong>',
                                    width: 70,
                                    padding: '1px 5px 0px 10px'
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                    width: 30
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-t' + '-txtCABI',
                                    required: true,
                                    // readOnly: true,
                                    fieldLabel: '',
                                    width: 60,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    enforceMaxLength: true,
                                    maxLength: 1,
                                    fieldStyle: 'text-align: left;',
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    html: '<strong style="color:#000;">Sercive Class</strong>',
                                    width: 100,
                                    padding: '1px 5px 0px 10px'
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                    width: 30
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-t' + '-txtCLAS',
                                    required: true,
                                    // readOnly: true,
                                    fieldLabel: '',
                                    width: 60,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    enforceMaxLength: true,
                                    maxLength: 1,
                                    fieldStyle: 'text-align: left;',
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        {
                            layout: 'hbox',
                            width: 750,
                            margin: '1 0 1 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            defaults: {
                                padding: '1px 2px 0px 2px'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    html: '<strong style="color:#000;">Fare Base</strong>',
                                    width: 100,
                                    padding: '1px 5px 0px 10px'
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                    width: 30
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-t' + '-txtFBASE',
                                    required: true,
                                    // readOnly: true,
                                    fieldLabel: '',
                                    width: 90,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    enforceMaxLength: true,
                                    maxLength: 15,
                                    fieldStyle: 'text-align: left;',
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    html: '<strong style="color:#000;">Ammount</strong>',
                                    width: 125,
                                    padding: '1px 5px 0px 10px'

                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-t' + '-txtVCPN',
                                    required: true,
                                    //readOnly: true,
                                    fieldLabel: '',
                                    width: 90,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    enforceMaxLength: true,
                                    maxLength: 15,
                                    maskRe: /[0-9.]/,
                                    fieldStyle: 'text-align: right;'
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    html: '<strong style="color:#000;">Currency</strong>',
                                    width: 110,
                                    padding: '1px 5px 0px 10px'

                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    // html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                    width: 30
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-t' + '-txtMDACP',
                                    required: true,
                                    //readOnly: true,
                                    fieldLabel: '',
                                    width: 45,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    fieldStyle: 'text-align: left;'

                                }
                            ]
                        },
                        {
                            layout: 'hbox',
                            //width: 750,
                            margin: '1 0 1 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            defaults: {
                                padding: '1px 2px 0px 2px'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    html: '<strong style="color:#000;">Commision</strong>',
                                    width: 100,
                                    padding: '1px 5px 0px 10px'
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    // html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                    width: 30
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-t' + '-txtCOMISI',
                                    required: true,
                                    // readOnly: true,
                                    fieldLabel: '',
                                    width: 90,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    enforceMaxLength: true,
                                    maxLength: 15,
                                    maskRe: /[0-9.]/,
                                    fieldStyle: 'text-align: right;'
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    html: '<strong style="color:#000;">Tax</strong>',
                                    width: 125,
                                    padding: '1px 5px 0px 10px'

                                },
//                                {
//                                    xtype: 'label',
//                                    labelAlign: 'center',
//                                    html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
//                                    width: 30
//                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-t' + '-txtVTAX',
                                    required: true,
                                    // readOnly: true,
                                    fieldLabel: '',
                                    width: 90,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    enforceMaxLength: true,
                                    maxLength: 15,
                                    fieldStyle: 'text-align: right;',
                                    maskRe: /[0-9.]/
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    html: '<strong style="color:#000;">Status Valorations</strong>',
                                    width: 140,
                                    padding: '1px 5px 0px 10px'

                                },
//                                {
//                                    xtype: 'label',
//                                    labelAlign: 'center',
//                                    // html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
//                                    width: 30
//                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-t' + '-txtFVAL',
                                    required: true,
                                    // readOnly: true,
                                    fieldLabel: '',
                                    width: 45,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    enforceMaxLength: true,
                                    maxLength: 1,
                                    fieldStyle: 'text-align: center;'
                                            //maskRe: /[0-9.]/
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    html: '<strong style="color:#000;">Value Date</strong>',
                                    width: 100,
                                    padding: '1px 5px 0px 10px'

                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                    width: 30
                                },
                                {
                                    xtype: 'datefield',
                                    id: prototype.id + '-t' + '-txtFECVAL',
                                    width: 110,
                                    labelWidth: 0,
                                    format: 'Ymd',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    maskRe: /[0-9.]/
                                }
                            ]
                        }
                    ]
                },
                {//----------------------------------------------
                    xtype: 'panel',
                    layout: 'vbox',
                    width: 900,
                    margin: '1 20 1 20',
                    border: false,
                    bodyStyle: 'background: #EFE9E5',
                    items: [
                        {
                            xtype: 'label',
                            labelAlign: 'center',
                            padding: '1px 5px 0px 10px',
                            margin: '1px px 4px 0px',
                            html: '<strong style="color:#000; text-decoration: underline; ">Estimated Value</strong>'
                        },
                        {
                            layout: 'hbox',
                            width: 900,
                            margin: '1 0 1 0',
                            border: false,
                            bodyStyle: 'background: #EFE9E5',
                            items: [
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    html: '<strong style="color:#000;">MXN Amount</strong>',
                                    width: 135,
                                    padding: '1px 5px 0px 10px'
//                                    autoEl: {
//                                        tag: 'label',
//                                        'data-qtip-width': 300,
//                                        'data-qtip': 'Examples: TKTT / TKTM / TKTA'
//                                    }
                                },
//                                {
//                                    xtype: 'label',
//                                    labelAlign: 'center',
//                                    //html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
//                                    width: 30
//                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-t' + '-txtVCPMX',
                                    required: true,
                                    // readOnly: true,
                                    fieldLabel: '',
                                    width: 90,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    fieldStyle: 'text-align: right;',
                                    enforceMaxLength: true,
                                    maxLength: 15,
//                                    autoEl: {
//                                        tag: 'label',
//                                        'data-qtip-width': 300,
//                                        'data-qtip': 'Examples: TKTT / TKTM / TKTA'
//                                    }
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    html: '<strong style="color:#000;">Exchange Rate</strong>',
                                    width: 130,
                                    padding: '1px 5px 0px 10px'

                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    // html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                    width: 30
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-t' + '-txtTCMUS',
                                    required: true,
                                    // readOnly: true,
                                    fieldLabel: '',
                                    width: 90,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    enforceMaxLength: true,
                                    fieldStyle: 'text-align: right;',
                                    maxLength: 15,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip-width': 300,
                                        'data-qtip': 'Exchange Rate from MXN to USD'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    html: '<strong style="color:#000;">USD Amount</strong>',
                                    width: 115,
                                    padding: '1px 5px 0px 10px'
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    // html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                    width: 5
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-t' + '-txtVCPUS',
                                    // readOnly: true,
                                    required: true,
                                    fieldLabel: '',
                                    width: 90,
                                    labelWidth: 0,
                                    fieldStyle: 'text-align: right;',
                                    labelAlign: 'left'

                                }

                            ]
                        }
                    ]
                }




                ,
                {
                    xtype: 'fieldset',
                    id: prototype.id + '-t' + '-ControlData',
                    title: 'Control Data',
                    width: 900,
                    margin: '5 20 0 20',
                    defaults: {
                        border: false
                    },
                    border: true,
                    hidden: false,
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 10 0',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-t' + '-txtUSCR',
                                    fieldLabel: '<strong style="color:#000;">Creator User</strong>',
                                    labelWidth: 120,
                                    margin: '0 10 0 0',
                                    readOnly: true,
                                    width: 210
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-t' + '-txtFECR',
                                    fieldLabel: '<strong style="color:#000;">Creation Date</strong>',
                                    labelWidth: 145,
                                    margin: '0 15 0 0',
                                    readOnly: true,
                                    width: 230
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-t' + '-txtHOCR',
                                    fieldLabel: '<strong style="color:#000;">Creation Time</strong>',
                                    labelWidth: 120,
                                    margin: '0 10 0 0',
                                    readOnly: true,
                                    width: 220
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
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-t' + '-txtUSUP',
                                    fieldLabel: '<strong style="color:#000;">user Update</strong>',
                                    labelWidth: 120,
                                    readOnly: true,
                                    margin: '0 10 0 0',
                                    width: 210
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-t' + '-txtFEUP',
                                    fieldLabel: '<strong style="color:#000;">Update Date</strong>',
                                    labelWidth: 145,
                                    readOnly: true,
                                    margin: '0 15 0 0',
                                    width: 230
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-t' + '-txtHOUP',
                                    fieldLabel: '<strong style="color:#000;">Update Time</strong>',
                                    labelWidth: 120,
                                    readOnly: true,
                                    margin: '0 10 0 0',
                                    width: 220
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
            margin: '5 100 5 20',
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
            items: [
                {
                    text: 'Save',
                    id: prototype.id + '-t' + '-btn-save',
                    iconCls: 'prx-icon-save',
                    hidden: true,
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id + '-t' + '-btn-update',
                    iconCls: 'prx-icon-update',
                    hidden: true,
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id + '-t' + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    hidden: true,
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.id + '-t' + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                },
                {xtype: 'tbspacer', width: 15},
                {
                    xtype: 'label',
                    labelAlign: 'center',
                    padding: '1px 5px 0px 10px',
                    html: '<strong style="color:#AC4546;font-size:11px;">(*)Required Fields</strong>'

                },
                {xtype: 'tbspacer', width: 15}
            ]
        }
    ]
});