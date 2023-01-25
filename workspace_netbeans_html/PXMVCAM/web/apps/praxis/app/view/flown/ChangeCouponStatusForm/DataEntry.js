/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.ChangeCouponStatusForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.flown.ChangeCouponStatus.DataEntryChangeCouponStatusController'
    ],
    title: 'Change Coupon Status - Data Entry',
    width: 810,
    height: 520,
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
            id: prototype.id + '-DataEntry-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    width: 750,
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
                                            id: prototype.id + '-txtTicket',
                                            required: true,
                                            readOnly: true,
                                            fieldLabel: '<strong style="color:#000;">Ticket Number</strong>',
                                            width: 200,
                                            labelWidth: 100,
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
                                            id: prototype.id + '-txtDCHEQ',
                                            required: true,
                                            readOnly: true,
                                            fieldLabel: '<strong style="color:#000;">Check Digit </strong>&nbsp&nbsp<strong style="color:#AC4546;font-size:13px;"> (*)</strong>',
                                            width: 140,
                                            labelWidth: 110,
                                            labelAlign: 'left',
                                            padding: '1px 5px 0px 5',
                                            enforceMaxLength: true,
                                            fieldStyle: 'text-align: center;',
                                            maxLength: 1,
                                            maskRe: /[0-9]/
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtSEQ',
                                            required: true,
                                            readOnly: true,
                                            fieldLabel: '<strong style="color:#000;">Secuence</strong>&nbsp&nbsp<strong style="color:#AC4546;font-size:13px;"> (*)</strong>',
                                            width: 150,
                                            labelWidth: 100,
                                            labelAlign: 'left',
                                            padding: '1px 5px 0px 5',
                                            enforceMaxLength: true,
                                            fieldStyle: 'text-align: center;',
                                            maxLength: 2,
                                            maskRe: /[0-9]/
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtFCONT',
                                            required: true,
                                            readOnly: true,
                                            fieldLabel: '<strong style="color:#000;">Accounting Date </strong>&nbsp&nbsp<strong style="color:#AC4546;font-size:13px;"> (*)</strong>',
                                            width: 230,
                                            labelWidth: 140,
                                            labelAlign: 'left',
                                            padding: '1px 5px 0px 5',
                                            enforceMaxLength: true,
                                            fieldStyle: 'text-align: center;',
                                            //maxLength: 6,
                                            maskRe: /[0-9]/,
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip-width': 400,
                                                'data-qtip': 'Accounting Date (YYYYMM)'
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
                    layout: 'vbox',
                    width: 750,
                    margin: '1 20 5 20',
                    border: false,
                    bodyStyle: 'background: #E5ECEF',
                    items: [
                        {
                            xtype: 'label',
                            labelAlign: 'center',
                            padding: '1px 5px 0px 10px',
                            html: '<strong style="color:#000; text-decoration: underline; ">Flight Information</strong>'

                        },
                        {
                            layout: 'hbox',
                            width: 750,
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
                                    id: prototype.id + '-txtCDEPART',
                                    required: true,
                                    readOnly: true,
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
                                    id: prototype.id + '-txtCARRIVA',
                                    required: true,
                                    readOnly: true,
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
                                    id: prototype.id + '-txtZONE',
                                    required: true,
                                    readOnly: true,
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
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtDFLIGHT',
                                    required: true,
                                    readOnly: true,
                                    fieldLabel: '',
                                    width: 90,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    maskRe: /[0-9]/,
                                    fieldStyle: 'text-align: left;'
                                },
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
                                    id: prototype.id + '-txtNFLIGHT',
                                    required: true,
                                    readOnly: true,
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
                                    html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                    width: 30
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtNPLANE',
                                    required: true,
                                    readOnly: true,
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
                                {xtype: 'tbspacer', width: 224},
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
                                    html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                    width: 30
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtLEGSEQ',
                                    required: true,
                                    readOnly: true,
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
                                    id: prototype.id + '-cmbFTE',
                                    required: true,
                                    disabled: true,
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
                                    id: prototype.id + '-cmbSTORG',
                                    required: true,
                                    disabled: true,
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
                                    html: '<strong style="color:#000;">Status</strong>',
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
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbSTVAL',
                                    required: true,
                                    disabled: true,
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
                                    html: '<strong style="color:#000;">Acc. Status</strong>',
                                    width: 90,
                                    padding: '1px 5px 0px 10px',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip-width': 400,
                                        'data-qtip': 'Accounting Status'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    // html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                    width: 20
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbSTCON',
                                    required: true,
                                    disabled: true,
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
                    width: 750,
                    margin: '1 20 1 20',
                    border: false,
                    bodyStyle: 'background: #EFE9E5',
                    items: [
                        {
                            xtype: 'label',
                            labelAlign: 'center',
                            padding: '1px 5px 0px 10px',
                            html: '<strong style="color:#000; text-decoration: underline; ">Sales Information</strong>'
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
                                    id: prototype.id + '-txtCDOC',
                                    required: true,
                                    readOnly: true,
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
                                    id: prototype.id + '-cmbTDOC',
                                    required: true,
                                    disabled: true,
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
                                    id: prototype.id + '-txtPSVVTA',
                                    readOnly: true,
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
                                    id: prototype.id + '-txtAGTIA',
                                    readOnly: true,
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
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFVTA',
                                    readOnly: true,
                                    required: true,
                                    fieldLabel: '',
                                    width: 90,
                                    labelWidth: 0
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
                                    id: prototype.id + '-cmbTVTA',
                                    required: true,
                                    disabled: true,
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
                                    id: prototype.id + '-cmbTPAX',
                                    required: true,
                                    disabled: true,
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
                    width: 750,
                    margin: '1 20 1 20',
                    border: false,
                    bodyStyle: 'background: #E5ECEF',
                    items: [
                        {
                            xtype: 'label',
                            labelAlign: 'center',
                            padding: '1px 5px 0px 10px',
                            html: '<strong style="color:#000; text-decoration: underline; ">Coupon Information</strong>'
                        },
                        {
                            layout: 'hbox',
                            width: 750,
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
                                    id: prototype.id + '-cmbTOPUS',
                                    required: true,
                                    disabled: true,
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
                                    id: prototype.id + '-txtCARR',
                                    required: true,
                                    readOnly:true,
                                    fieldLabel: '',
                                    width: 60,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    enforceMaxLength: true,
                                    maxLength: 2,
                                    fieldStyle: 'text-align: left;',
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    html: '<strong style="color:#000;">Cabin</strong>',
                                    width: 70,
                                    padding: '1px 5px 0px 10px',
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                    width: 30
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCABI',
                                    required: true,
                                    readOnly:true,
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
                                    padding: '1px 5px 0px 10px',
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                    width: 30
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCLAS',
                                    required: true,
                                    readOnly:true,
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
                                    id: prototype.id + '-txtFBASE',
                                    required: true,
                                    readOnly:true,
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
                                    html: '<strong style="color:#000;">Flyer Code</strong>',
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
                                    id: prototype.id + '-txtCFF',
                                    required: true,
                                    readOnly:true,
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
                                    width: 80,
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
                                    id: prototype.id + '-txtVCPN',
                                    required: true,
                                    readOnly:true,
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
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtMDACP',
                                    required: true,
                                    readOnly:true,
                                    fieldLabel: '',
                                    width: 45,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    minLength: 3,
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
                                    id: prototype.id + '-txtCOMISI',
                                    required: true,
                                    readOnly:true,
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
                                    id: prototype.id + '-txtVTAX',
                                    required: true,
                                    readOnly:true,
                                    fieldLabel: '',
                                    width: 90,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    enforceMaxLength: true,
                                    maxLength: 15,
                                    fieldStyle: 'text-align: left;',
                                    maskRe: /[0-9.]/
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    html: '<strong style="color:#000;">Status</strong>',
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
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbFVAL',
                                    required: true,
                                    disabled: true,
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




                ,
                {
                    xtype: 'fieldset',
                    id: prototype.id + '-ControlData',
                    title: 'Control Data',
                    width: 750,
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
                                    id: prototype.id + '-USCR',
                                    fieldLabel: '<strong style="color:#000;">Creator User</strong>',
                                    labelWidth: 100,
                                    margin: '0 40 0 0',
                                    readOnly: true,
                                    width: 200
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-FECR',
                                    fieldLabel: '<strong style="color:#000;">Creation Date</strong>',
                                    labelWidth: 100,
                                    margin: '0 40 0 0',
                                    readOnly: true,
                                    width: 200
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-HOCR',
                                    fieldLabel: '<strong style="color:#000;">Creation Time</strong>',
                                    labelWidth: 100,
                                    margin: '0 10 0 0',
                                    readOnly: true,
                                    width: 200
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
                                    id: prototype.id + '-USUP',
                                    fieldLabel: '<strong style="color:#000;">user Update</strong>',
                                    labelWidth: 100,
                                    readOnly: true,
                                    margin: '0 40 0 0',
                                    width: 200
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-FEUP',
                                    fieldLabel: '<strong style="color:#000;">Update Date</strong>',
                                    labelWidth: 100,
                                    readOnly: true,
                                    margin: '0 40 0 0',
                                    width: 200
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-HOUP',
                                    fieldLabel: '<strong style="color:#000;">Update Time</strong>',
                                    labelWidth: 100,
                                    readOnly: true,
                                    margin: '0 10 0 0',
                                    width: 200
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
//                    hidden: true,
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
                {xtype: 'tbspacer', width: 15},
                {
                    xtype: 'label',
                    labelAlign: 'center',
                    padding: '1px 5px 0px 10px',
                    html: '<strong style="color:#AC4546;font-size:11px;">(*)Required Fields</strong>'

                },
                {xtype: 'tbspacer', width: 15},
                {
                    text: '<strong style="color:black;font-size:13px;">Facsimil</strong>',
                    id: prototype.id + '-btn-facsimil',
                    widht: 80,
                    scale: 'small',
                    //iconCls: 'prx-icon-update',
                    //hidden: true,
                    listeners: {
                        click: 'onFacsimilClick'
                    }
                },
                {xtype: 'tbspacer', width: 15},
                {
                    text: '',
                    id: prototype.id + '-btn-de-back',
                    icon: 'resources/img/botones/prev.png',
                    border: false,
                    listeners: {
                        click: 'onBackClickDataEntry'
                    }
                },
                {
                    text: '',
                    id: prototype.id + '-btn-de-next',
                    icon: 'resources/img/botones/next2.png',
                    border: false,
                    listeners: {
                        click: 'onNextClickDataEntry'
                    }
                },
                {xtype: 'tbspacer', width: 15},
                {
                    text: '<strong style="color:black;font-size:13px;">Log</strong>',
                    id: prototype.id + '-btn-log',
                    widht: 80,
                    scale: 'small',
                    //iconCls: 'prx-icon-update',
                    //hidden: true,
                    listeners: {
                        click: 'onLogClick'
                    }
                },
                {xtype: 'tbspacer', width: 15}
            ]
        }
    ]
});