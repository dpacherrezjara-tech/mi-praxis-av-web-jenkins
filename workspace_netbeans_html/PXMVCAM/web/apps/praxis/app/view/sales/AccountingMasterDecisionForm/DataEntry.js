/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.AccountingMasterDecisionForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.sales.AccountingMasterDecision.DataEntryAccountingMasterDecisionController'
    ],
    title: 'TKT Decision Data Entry ',
    header: true,
    width: 750,
    height: 570,
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        align: 'center'
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
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    width: 750,
                    margin: '5 20 5 2',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            margin: '5 0 1 0',
                            border: false,
                            // bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    // bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 110,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Payment Form</strong>'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 40,
                                            padding: '2px 5px 2px 3px',
                                            html: '<strong style="color:red;font-size:13px;">(*)</strong>'

                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-de-cbxFP',
                                            fieldLabel: '',
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            editable: false,
                                            triggerAction: 'all',
                                            valueField: 'code',
                                            displayField: 'name',
                                            labelWidth: 0,
                                            width: 100

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 80,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Source</strong>'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 30,
                                            padding: '2px 5px 2px 3px',
                                            html: '<strong style="color:red;font-size:13px;">(*)</strong>'

                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-de-cbxSource',
                                            fieldLabel: '',
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            editable: false,
                                            triggerAction: 'all',
                                            valueField: 'code',
                                            displayField: 'name',
                                            labelWidth: 0,
                                            width: 80

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 80,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;">Channel</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtA1834SUBFU',
                                            maxLength: 3,
                                            enforceMaxLength: true,
                                            fieldLabel: '',
                                            width: 50,
                                            fieldStyle: 'text-align: left;',
                                            labelWidth: 0,
                                            value: '',
                                            labelAlign: 'left',
                                            padding: '2px 5px 2px 3px'

                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    // bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 110,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Card Type</strong>'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 40,
                                            padding: '2px 5px 2px 3px',
                                            html: '<strong style="color:red;font-size:13px;">(*)</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtA1834TTARJ',
                                            maxLength: 4,
                                            enforceMaxLength: true,
                                            fieldLabel: '',
                                            width: 50,
                                            fieldStyle: 'text-align: left;',
                                            labelWidth: 0,
                                            value: '',
                                            labelAlign: 'left',
                                            padding: '2px 5px 2px 3px'
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 110,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Card Sub-Type</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtA1834STTAR',
                                            maxLength: 4,
                                            enforceMaxLength: true,
                                            fieldLabel: '',
                                            width: 50,
                                            fieldStyle: 'text-align: left;',
                                            labelWidth: 0,
                                            value: '',
                                            labelAlign: 'left',
                                            padding: '2px 5px 2px 3px'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 110,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">CIA Operator</strong>'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 30,
                                            padding: '2px 5px 2px 3px',
                                            html: '<strong style="color:red;font-size:13px;">(*)</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtA1834CIAOP',
                                            maxLength: 1,
                                            enforceMaxLength: true,
                                            fieldLabel: '',
                                            width: 50,
                                            maskRe: /[0-9]/,
                                            fieldStyle: 'text-align: left;',
                                            labelWidth: 0,
                                            value: '',
                                            labelAlign: 'left',
                                            padding: '2px 5px 2px 3px'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    // bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 150,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;">Description</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtA1834DESFP',
                                            maxLength: 35,
                                            enforceMaxLength: true,
                                            fieldLabel: '',
                                            width: 350,
                                            fieldStyle: 'text-align: left;',
                                            labelWidth: 0,
                                            value: '',
                                            labelAlign: 'left',
                                            padding: '2px 5px 2px 3px'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    // bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 150,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;">Code Combination</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtA1834COMBI',
                                            maxLength: 4,
                                            enforceMaxLength: true,
                                            fieldLabel: '',
                                            width: 50,
                                            fieldStyle: 'text-align: left;',
                                            labelWidth: 0,
                                            maskRe: /[0-9]/,
                                            labelAlign: 'left',
                                            padding: '2px 5px 2px 3px'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 100,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Working Visa</strong>'

                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-de-cbxA1834TVISA',
                                            fieldLabel: '',
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            editable: false,
                                            triggerAction: 'all',
                                            valueField: 'code',
                                            displayField: 'name',
                                            labelWidth: 0,
                                            width: 80

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 150,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Working Mastercard</strong>'

                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-de-cbxA1834TMCAR',
                                            fieldLabel: '',
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            editable: false,
                                            triggerAction: 'all',
                                            valueField: 'code',
                                            displayField: 'name',
                                            labelWidth: 0,
                                            width: 100
                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    // bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 150,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;">Working Others</strong>'

                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-de-cbxA1834OTROS',
                                            fieldLabel: '',
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            editable: false,
                                            triggerAction: 'all',
                                            valueField: 'code',
                                            displayField: 'name',
                                            labelWidth: 0,
                                            width: 110

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 100,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Policy Type</strong>'

                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-de-cbxA1834TPOLI',
                                            fieldLabel: '',
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            editable: false,
                                            triggerAction: 'all',
                                            valueField: 'code',
                                            displayField: 'name',
                                            labelWidth: 0,
                                            width: 90
                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    // bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 140,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Date</strong>'

                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-de-txtA1834FINI',
                                            fieldStyle: 'text-align:center',
                                            format: 'Y/m/d',
                                            editable: true,
                                            maskRe: /[0-9/]/,
                                            width: 80,
                                            fieldLabel: '',
                                            labelWidth: 0,
                                            padding: '2px 30px 2px 10px'
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-de-txtA1834FFIN',
                                            fieldStyle: 'text-align:center',
                                            format: 'Y/m/d',
                                            editable: true,
                                            maskRe: /[0-9/]/,
                                            width: 80,
                                            fieldLabel: '',
                                            labelWidth: 0,
                                            padding: '2px 5px 2px 10px'
                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    width: 720,
                                    border: true,
                                    bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            margin: '1 0 1 0',
                                            border: false,
                                            bodyStyle: 'background: #E5ECEF',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'column',
                                                    margin: '1 0 1 0',
                                                    border: false,
                                                    bodyStyle: 'background: #E5ECEF',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            labelAlign: 'left',
                                                            width: 140,
                                                            padding: '2px 5px 2px 10px',
                                                            html: '<strong style="color:#000; text-decoration:underline ">Cod Alphanumeric</strong>'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'column',
                                                    margin: '1 0 1 0',
                                                    border: false,
                                                    bodyStyle: 'background: #E5ECEF',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            labelAlign: 'left',
                                                            width: 70,
                                                            padding: '2px 5px 2px 10px',
                                                            html: '<strong style="color:#000;">Alp. 01</strong>'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-de-txtA1834ALF01',
                                                            maxLength: 3,
                                                            enforceMaxLength: true,
                                                            fieldLabel: '',
                                                            width: 50,
                                                            fieldStyle: 'text-align: left;',
                                                            labelWidth: 0,
                                                            labelAlign: 'left',
                                                            padding: '2px 5px 2px 3px'

                                                        },
                                                        {
                                                            xtype: 'label',
                                                            labelAlign: 'left',
                                                            width: 70,
                                                            padding: '2px 5px 2px 1px',
                                                            html: '<strong style="color:#000;">Alp. 02</strong>'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-de-txtA1834ALF02',
                                                            maxLength: 3,
                                                            enforceMaxLength: true,
                                                            fieldLabel: '',
                                                            width: 50,
                                                            fieldStyle: 'text-align: left;',
                                                            labelWidth: 0,
                                                            labelAlign: 'left',
                                                            padding: '2px 5px 2px 3px'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'column',
                                                    margin: '1 0 1 0',
                                                    border: false,
                                                    bodyStyle: 'background: #E5ECEF',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            labelAlign: 'left',
                                                            width: 70,
                                                            padding: '2px 5px 2px 10px',
                                                            html: '<strong style="color:#000;">Alp. 03</strong>'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-de-txtA1834ALF03',
                                                            maxLength: 3,
                                                            enforceMaxLength: true,
                                                            fieldLabel: '',
                                                            width: 50,
                                                            fieldStyle: 'text-align: left;',
                                                            labelWidth: 0,
                                                            labelAlign: 'left',
                                                            padding: '2px 5px 2px 3px'

                                                        },
                                                        {
                                                            xtype: 'label',
                                                            labelAlign: 'left',
                                                            width: 70,
                                                            padding: '2px 5px 2px 1px',
                                                            html: '<strong style="color:#000;">Alp. 04</strong>'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-de-txtA1834ALF04',
                                                            maxLength: 3,
                                                            enforceMaxLength: true,
                                                            fieldLabel: '',
                                                            width: 50,
                                                            fieldStyle: 'text-align: left;',
                                                            labelWidth: 0,
                                                            labelAlign: 'left',
                                                            padding: '2px 5px 2px 3px'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'column',
                                                    margin: '1 0 1 0',
                                                    border: false,
                                                    bodyStyle: 'background: #E5ECEF',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            labelAlign: 'left',
                                                            width: 70,
                                                            padding: '2px 5px 2px 10px',
                                                            html: '<strong style="color:#000;">Alp. 05</strong>'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-de-txtA1834ALF05',
                                                            maxLength: 3,
                                                            enforceMaxLength: true,
                                                            fieldLabel: '',
                                                            width: 50,
                                                            fieldStyle: 'text-align: left;',
                                                            labelWidth: 0,
                                                            labelAlign: 'left',
                                                            padding: '2px 5px 2px 3px'

                                                        },
                                                        {
                                                            xtype: 'label',
                                                            labelAlign: 'left',
                                                            width: 70,
                                                            padding: '2px 5px 2px 1px',
                                                            html: '<strong style="color:#000;">Alp. 06</strong>'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-de-txtA1834ALF06',
                                                            maxLength: 3,
                                                            enforceMaxLength: true,
                                                            fieldLabel: '',
                                                            width: 50,
                                                            fieldStyle: 'text-align: left;',
                                                            labelWidth: 0,
                                                            labelAlign: 'left',
                                                            padding: '2px 5px 2px 3px'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'column',
                                                    margin: '1 0 1 0',
                                                    border: false,
                                                    bodyStyle: 'background: #E5ECEF',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            labelAlign: 'left',
                                                            width: 70,
                                                            padding: '2px 5px 2px 10px',
                                                            html: '<strong style="color:#000;">Alp. 07</strong>'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-de-txtA1834ALF07',
                                                            maxLength: 3,
                                                            enforceMaxLength: true,
                                                            fieldLabel: '',
                                                            width: 50,
                                                            fieldStyle: 'text-align: left;',
                                                            labelWidth: 0,
                                                            labelAlign: 'left',
                                                            padding: '2px 5px 2px 3px'

                                                        },
                                                        {
                                                            xtype: 'label',
                                                            labelAlign: 'left',
                                                            width: 70,
                                                            padding: '2px 5px 2px 1px',
                                                            html: '<strong style="color:#000;">Alp. 08</strong>'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-de-txtA1834ALF08',
                                                            maxLength: 3,
                                                            enforceMaxLength: true,
                                                            fieldLabel: '',
                                                            width: 50,
                                                            fieldStyle: 'text-align: left;',
                                                            labelWidth: 0,
                                                            labelAlign: 'left',
                                                            padding: '2px 5px 2px 3px'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'column',
                                                    margin: '1 0 1 0',
                                                    border: false,
                                                    bodyStyle: 'background: #E5ECEF',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            labelAlign: 'left',
                                                            width: 70,
                                                            padding: '2px 5px 2px 10px',
                                                            html: '<strong style="color:#000;">Alp. 09</strong>'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-de-txtA1834ALF09',
                                                            maxLength: 3,
                                                            enforceMaxLength: true,
                                                            fieldLabel: '',
                                                            width: 50,
                                                            fieldStyle: 'text-align: left;',
                                                            labelWidth: 0,
                                                            labelAlign: 'left',
                                                            padding: '2px 5px 2px 3px'

                                                        },
                                                        {
                                                            xtype: 'label',
                                                            labelAlign: 'left',
                                                            width: 70,
                                                            padding: '2px 5px 2px 1px',
                                                            html: '<strong style="color:#000;">Alp. 10</strong>'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-de-txtA1834ALF10',
                                                            maxLength: 3,
                                                            enforceMaxLength: true,
                                                            fieldLabel: '',
                                                            width: 50,
                                                            fieldStyle: 'text-align: left;',
                                                            labelWidth: 0,
                                                            labelAlign: 'left',
                                                            padding: '2px 5px 2px 3px'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'column',
                                                    margin: '1 0 1 0',
                                                    border: false,
                                                    bodyStyle: 'background: #E5ECEF',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            labelAlign: 'left',
                                                            width: 70,
                                                            padding: '2px 5px 2px 10px',
                                                            html: '<strong style="color:#000;">Alp. 11</strong>'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-de-txtA1834ALF11',
                                                            maxLength: 3,
                                                            enforceMaxLength: true,
                                                            fieldLabel: '',
                                                            width: 50,
                                                            fieldStyle: 'text-align: left;',
                                                            labelWidth: 0,
                                                            labelAlign: 'left',
                                                            padding: '2px 5px 2px 3px'

                                                        },
                                                        {
                                                            xtype: 'label',
                                                            labelAlign: 'left',
                                                            width: 70,
                                                            padding: '2px 5px 2px 1px',
                                                            html: '<strong style="color:#000;">Alp. 12</strong>'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-de-txtA1834ALF12',
                                                            maxLength: 3,
                                                            enforceMaxLength: true,
                                                            fieldLabel: '',
                                                            width: 50,
                                                            fieldStyle: 'text-align: left;',
                                                            labelWidth: 0,
                                                            labelAlign: 'left',
                                                            padding: '2px 5px 2px 3px'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }, {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            margin: '1 0 1 50',
                                            border: false,
                                            bodyStyle: 'background: #E5ECEF',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'column',
                                                    margin: '1 0 1 0',
                                                    border: false,
                                                    bodyStyle: 'background: #E5ECEF',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            labelAlign: 'left',
                                                            width: 140,
                                                            padding: '2px 5px 2px 10px',
                                                            html: '<strong style="color:#000; text-decoration:underline ">Cod Numeric</strong>'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'column',
                                                    margin: '1 0 1 0',
                                                    border: false,
                                                    bodyStyle: 'background: #E5ECEF',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            labelAlign: 'left',
                                                            width: 70,
                                                            padding: '2px 5px 2px 10px',
                                                            html: '<strong style="color:#000;">Num. 01</strong>'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-de-txtA1834NUM01',
                                                            maxLength: 3,
                                                            maskRe: /[0-9]/,
                                                            enforceMaxLength: true,
                                                            fieldLabel: '',
                                                            width: 50,
                                                            fieldStyle: 'text-align: left;',
                                                            labelWidth: 0,
                                                            labelAlign: 'left',
                                                            padding: '2px 5px 2px 3px'

                                                        },
                                                        {
                                                            xtype: 'label',
                                                            labelAlign: 'left',
                                                            width: 70,
                                                            padding: '2px 5px 2px 1px',
                                                            html: '<strong style="color:#000;">Num. 02</strong>'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-de-txtA1834NUM02',
                                                            maxLength: 3,
                                                            enforceMaxLength: true,
                                                            maskRe: /[0-9]/,
                                                            fieldLabel: '',
                                                            width: 50,
                                                            fieldStyle: 'text-align: left;',
                                                            labelWidth: 0,
                                                            labelAlign: 'left',
                                                            padding: '2px 5px 2px 3px'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'column',
                                                    margin: '1 0 1 0',
                                                    border: false,
                                                    bodyStyle: 'background: #E5ECEF',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            labelAlign: 'left',
                                                            width: 70,
                                                            padding: '2px 5px 2px 10px',
                                                            html: '<strong style="color:#000;">Num. 03</strong>'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-de-txtA1834NUM03',
                                                            maxLength: 3,
                                                            maskRe: /[0-9]/,
                                                            enforceMaxLength: true,
                                                            fieldLabel: '',
                                                            width: 50,
                                                            fieldStyle: 'text-align: left;',
                                                            labelWidth: 0,
                                                            labelAlign: 'left',
                                                            padding: '2px 5px 2px 3px'

                                                        },
                                                        {
                                                            xtype: 'label',
                                                            labelAlign: 'left',
                                                            width: 70,
                                                            padding: '2px 5px 2px 1px',
                                                            html: '<strong style="color:#000;">Num. 04</strong>'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-de-txtA1834NUM04',
                                                            maxLength: 3,
                                                            maskRe: /[0-9]/,
                                                            enforceMaxLength: true,
                                                            fieldLabel: '',
                                                            width: 50,
                                                            fieldStyle: 'text-align: left;',
                                                            labelWidth: 0,
                                                            labelAlign: 'left',
                                                            padding: '2px 5px 2px 3px'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'column',
                                                    margin: '1 0 1 0',
                                                    border: false,
                                                    bodyStyle: 'background: #E5ECEF',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            labelAlign: 'left',
                                                            width: 70,
                                                            padding: '2px 5px 2px 10px',
                                                            html: '<strong style="color:#000;">Num. 05</strong>'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-de-txtA1834NUM05',
                                                            maxLength: 3,
                                                            maskRe: /[0-9]/,
                                                            enforceMaxLength: true,
                                                            fieldLabel: '',
                                                            width: 50,
                                                            fieldStyle: 'text-align: left;',
                                                            labelWidth: 0,
                                                            labelAlign: 'left',
                                                            padding: '2px 5px 2px 3px'

                                                        },
                                                        {
                                                            xtype: 'label',
                                                            labelAlign: 'left',
                                                            width: 70,
                                                            padding: '2px 5px 2px 1px',
                                                            html: '<strong style="color:#000;">Num. 06</strong>'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-de-txtA1834NUM06',
                                                            maxLength: 3,
                                                            maskRe: /[0-9]/,
                                                            enforceMaxLength: true,
                                                            fieldLabel: '',
                                                            width: 50,
                                                            fieldStyle: 'text-align: left;',
                                                            labelWidth: 0,
                                                            labelAlign: 'left',
                                                            padding: '2px 5px 2px 3px'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'column',
                                                    margin: '1 0 1 0',
                                                    border: false,
                                                    bodyStyle: 'background: #E5ECEF',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            labelAlign: 'left',
                                                            width: 70,
                                                            padding: '2px 5px 2px 10px',
                                                            html: '<strong style="color:#000;">Num. 07</strong>'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-de-txtA1834NUM07',
                                                            maskRe: /[0-9]/,
                                                            maxLength: 3,
                                                            enforceMaxLength: true,
                                                            fieldLabel: '',
                                                            width: 50,
                                                            fieldStyle: 'text-align: left;',
                                                            labelWidth: 0,
                                                            labelAlign: 'left',
                                                            padding: '2px 5px 2px 3px'

                                                        },
                                                        {
                                                            xtype: 'label',
                                                            labelAlign: 'left',
                                                            width: 70,
                                                            padding: '2px 5px 2px 1px',
                                                            html: '<strong style="color:#000;">Num. 08</strong>'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-de-txtA1834NUM08',
                                                            maxLength: 3,
                                                            maskRe: /[0-9]/,
                                                            enforceMaxLength: true,
                                                            fieldLabel: '',
                                                            width: 50,
                                                            fieldStyle: 'text-align: left;',
                                                            labelWidth: 0,
                                                            labelAlign: 'left',
                                                            padding: '2px 5px 2px 3px'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'column',
                                                    margin: '1 0 1 0',
                                                    border: false,
                                                    bodyStyle: 'background: #E5ECEF',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            labelAlign: 'left',
                                                            width: 70,
                                                            padding: '2px 5px 2px 10px',
                                                            html: '<strong style="color:#000;">Num. 09</strong>'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-de-txtA1834NUM09',
                                                            maxLength: 3,
                                                            maskRe: /[0-9]/,
                                                            enforceMaxLength: true,
                                                            fieldLabel: '',
                                                            width: 50,
                                                            fieldStyle: 'text-align: left;',
                                                            labelWidth: 0,
                                                            labelAlign: 'left',
                                                            padding: '2px 5px 2px 3px'

                                                        },
                                                        {
                                                            xtype: 'label',
                                                            labelAlign: 'left',
                                                            width: 70,
                                                            padding: '2px 5px 2px 1px',
                                                            html: '<strong style="color:#000;">Num. 10</strong>'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-de-txtA1834NUM10',
                                                            maxLength: 3,
                                                            maskRe: /[0-9]/,
                                                            enforceMaxLength: true,
                                                            fieldLabel: '',
                                                            width: 50,
                                                            fieldStyle: 'text-align: left;',
                                                            labelWidth: 0,
                                                            labelAlign: 'left',
                                                            padding: '2px 5px 2px 3px'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'column',
                                                    margin: '1 0 1 0',
                                                    border: false,
                                                    bodyStyle: 'background: #E5ECEF',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            labelAlign: 'left',
                                                            width: 70,
                                                            padding: '2px 5px 2px 10px',
                                                            html: '<strong style="color:#000;">Num. 11</strong>'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-de-txtA1834NUM11',
                                                            maxLength: 3,
                                                            maskRe: /[0-9]/,
                                                            enforceMaxLength: true,
                                                            fieldLabel: '',
                                                            width: 50,
                                                            fieldStyle: 'text-align: left;',
                                                            labelWidth: 0,
                                                            labelAlign: 'left',
                                                            padding: '2px 5px 2px 3px'

                                                        },
                                                        {
                                                            xtype: 'label',
                                                            labelAlign: 'left',
                                                            width: 70,
                                                            padding: '2px 5px 2px 1px',
                                                            html: '<strong style="color:#000;">Num. 12</strong>'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-de-txtA1834NUM12',
                                                            maxLength: 3,
                                                            maskRe: /[0-9]/,
                                                            enforceMaxLength: true,
                                                            fieldLabel: '',
                                                            width: 50,
                                                            fieldStyle: 'text-align: left;',
                                                            labelWidth: 0,
                                                            labelAlign: 'left',
                                                            padding: '2px 5px 2px 3px'
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

                ,
                {
                    xtype: 'fieldset',
                    id: prototype.id + '-ControlData',
                    title: 'Control Data',
                    width: 710,
                    margin: '10 10 0 10',
                    defaults: {
                        border: false
                    },
                    border: true,
                    hidden: false,
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 5 0',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtUSCR',
                                    fieldLabel: '<strong style="color:#000;">User of Creation</strong>',
                                    labelWidth: 120,
                                    margin: '0 10 0 0',
                                    readOnly: true,
                                    width: 220
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtFECR',
                                    fieldLabel: '<strong style="color:#000;"> Creation Date</strong>',
                                    labelWidth: 120,
                                    margin: '0 10 0 0',
                                    readOnly: true,
                                    width: 220
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtHOCR',
                                    fieldLabel: '<strong style="color:#000;"> Creation Time</strong>',
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
                                    id: prototype.id + '-de-txtUSUP',
                                    fieldLabel: '<strong style="color:#000;">User Update</strong>',
                                    labelWidth: 120,
                                    readOnly: true,
                                    margin: '0 10 0 0',
                                    width: 220
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtFEUP',
                                    fieldLabel: '<strong style="color:#000;">Update Date </strong>',
                                    labelWidth: 120,
                                    readOnly: true,
                                    margin: '0 10 0 0',
                                    width: 220
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtHOUP',
                                    fieldLabel: '<strong style="color:#000;"> Update Time</strong>',
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
            margin: '5 100 10 50',
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
            items: [
                {
                    text: 'Save',
                    id: prototype.id + '-btn-save',
                    iconCls: 'prx-icon-save',
                    //hidden: true,
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id + '-btn-update',
                    iconCls: 'prx-icon-update',
                    //hidden: true,
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    //hidden: true,
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
});