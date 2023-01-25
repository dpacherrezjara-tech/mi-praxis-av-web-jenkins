/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - AM                                       *          
 * Document   : DataEntry                                         *                
 * Created on : 15/02/2018, 18:25:00                              *          
 * Author     : Gregory Sánchez (gsanchez)                        *          
 *                                                                *
 ******************************************************************
 *                  MIAMI TECHNOLOGY GROUP, INC.                  *
 *                           MIATECH                              *
 *                           OF PERU                              *
 ******************************************************************
 * CODIGO PRG FECHA      CONCEPTO
 * 201601 RMC 20-09-2016 SE CREA PROGRAMA A PEDIDO DE JGG.
 ******************************************************************
 */

Ext.define('Ext.Praxis.view.flown.SSIMComplementaryFilesForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntrySSIMComplementaryFilesForm',
    controller: 'DataEntrySSIMComplementaryFilesController',

    requires:[
        'Ext.Praxis.controller.flown.SSIMComplementaryFiles.DataEntrySSIMComplementaryFilesController'
    ],

    title:'Complement SSIM - Data Entry Form',
    header:true,
    bodyStyle: 'background: transparent',
    height:400,
    width:920,
    border:false,
    resizable:false,
    layout:'fit',
    modal:true,
//    padding: '30px',

    defaults:{
        border: false
    },

    items:[
        {
            xtype: 'form',
            id: prototype.id01 + '-form',
            defaults:{
                style: 'margin: 3px;',
                border: false
            },
            items:[
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    bodyStyle:{"background-color":"rgb(229, 236, 239)"},
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Seq.',
                            style: 'font-weight:bold;color:#000;',
                            width: 120
                        },
                        {
                            xtype: 'textfield',
                            id:prototype.id01+'-txtA1707-NSEQ',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maxLength: 2,
                            maskRe: /[0-9]/,
                            width: 80,
                            allowBlank: false
                        },
                        { xtype: 'tbspacer', width: 70 },
                        {
                            xtype: 'label',
                            text: 'Flight Number',
                            style: 'font-weight:bold;color:#000;',
                            width: 120
                        },
                        {
                            xtype: 'textfield',
                            id:prototype.id01+'-txtA1707-NFLIGHT',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maxLength: 4,
                            maskRe: /[a-zA-Z0-9]/,
                            width: 80,
                            allowBlank: false
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    bodyStyle:{"background-color":"rgb(229, 236, 239)"},
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Departure Airport',
                            style: 'font-weight:bold;color:#000;',
                            width: 120
                        },
                        {
                            xtype: 'textfield',
                            id:prototype.id01+'-txtA1707-CDEPART',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maxLength: 3,
                            maskRe: /[a-zA-Z]/,
                            width: 80,
                            listeners:{
                                change: 'onUpperValue',
                                focusleave: 'onFocusDepartureAirport'
                            },
                            allowBlank: false
                        },
                        { xtype: 'tbspacer', width: 70 },
                        {
                            xtype: 'label',
                            id: prototype.id01+'-CDEPART-NAME',
                            style: 'font-weight:bold;color:#000;',
                            width: 200
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    bodyStyle:{"background-color":"rgb(229, 236, 239)"},
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Arrival Airport',
                            style: 'font-weight:bold;color:#000;',
                            width: 120
                        },
                        {
                            xtype: 'textfield',
                            id:prototype.id01+'-txtA1707-CARRIVA',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maxLength: 3,
                            maskRe: /[a-zA-Z]/,
                            width: 80,
                            listeners:{
                                change: 'onUpperValue',
                                focusleave: 'onFocusArrivalAirport'
                            },
                            allowBlank: false
                        },
                        { xtype: 'tbspacer', width: 70 },
                        {
                            xtype: 'label',
                            id: prototype.id01+'-CARRIVA-NAME',
                            style: 'font-weight:bold;color:#000;',
                            width: 200
                        }
                    ]
                },
                { xtype: 'tbspacer', height: 15 },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Carrier',
                            style: 'font-weight:bold;color:#000;',
                            width: 120
                        },
                        {
                            xtype: 'textfield',
                            id:prototype.id01+'-txtA1707-CARRIER',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maxLength: 2,
                            maskRe: /[a-zA-Z0-9]/,
                            width: 50,
                            listeners:{
                                change: 'onUpperValue',
                                focusleave: 'onFocusCarrier'
                            }
                        },
                        { xtype: 'tbspacer', width: 100 },
                        {
                            xtype: 'label',
                            id: prototype.id01+'-CARRIER-NAME',
                            style: 'font-weight:bold;color:#000;',
                            width: 200
                        },
                        { xtype: 'tbspacer', width: 70 },
                        {
                            xtype: 'label',
                            text: 'Type',
                            style: 'font-weight:bold;color:#000;',
                            width: 70
                        },
                        {
                            xtype: 'textfield',
                            id:prototype.id01+'-txtA1707-TOPER',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[a-zA-Z]/,
                            maxLength: 1,
                            width: 40,
                            listeners:{
                                change: 'onUpperValue',
                                focusleave: 'onFocusToper'
                            }
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'label',
                            id: prototype.id01+'-TOPER-NAME',
                            style: 'font-weight:bold;color:#000;',
                            width: 80
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'LEG',
                            style: 'font-weight:bold;color:#000;',
                            width: 120
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01+'-txtA1707-LEG',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maxLength: 1,
                            maskRe: /[0-9]/,
                            width: 30
                        },
                        { xtype: 'tbspacer', width: 120 },
                        {
                            xtype: 'label',
                            text: 'Flag SSIM',
                            style: 'font-weight:bold;color:#000;',
                            width: 120
                        },
                        {
                            xtype: 'combobox',
                            id: prototype.id01+'-cbxA1707-FSSIM',
                            store: Ext.create('Ext.Praxis.store.flown.SSIMComplementaryFiles.ComboBox'),
                            queryMode: 'local',
                            triggerAction: 'all',
                            forceSelection: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            value: '1', //Inicializa el combo con el elemento que tiene como valor 1 su field
                            emptyText: '[select]',
                            width: 60
                        },
                        { xtype: 'tbspacer', width: 90 },
                        {
                            xtype: 'label',
                            text: 'Daily Rate',
                            style: 'font-weight:bold;color:#000;',
                            width: 70
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id01+'-txtA1707-FREQ',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maxLength: 7,
                            maskRe: /[0-7]/,
                            width: 110,
                            listeners:{
                                focusleave: 'onFocusFREQ'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;"><u>Hard-Block Data</u></strong>',
                            margin: '15 0 8 0'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Flight Number',
                            style: 'font-weight:bold;color:#000;',
                            width: 120
                        },
                        {
                            xtype: 'textfield',
                            id:prototype.id01+'-txtA1707-NFLIGHTH',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maxLength: 4,
                            maskRe: /[0-9]/,
                            width: 80
                        },
                        { xtype: 'tbspacer', width: 70 },
                        {
                            xtype: 'label',
                            text: 'Carrier',
                            style: 'font-weight:bold;color:#000;',
                            width: 120
                        },
                        {
                            xtype: 'textfield',
                            id:prototype.id01+'-txtA1707-CARRIERH',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maxLength: 2,
                            maskRe: /[a-zA-Z0-9]/,
                            width: 50,
                            listeners:{
                                change: 'onUpperValue',
                                focusleave: 'onFocusCarrierH'
                            }
                        },
                        { xtype: 'tbspacer', width: 50 },
                        {
                            xtype: 'label',
                            id: prototype.id01+'-CARRIERH-NAME',
                            style: 'font-weight:bold;color:#000;',
                            width: 200
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    id: prototype.id01+'-ControlData',
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
                                    id:prototype.id01+'-txt-USCR',
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
                                    id:prototype.id01+'-txt-FECR',
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
                                    id:prototype.id01+'-txt-HOCR',
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
                                    id:prototype.id01+'-txt-USUP',
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
                                    id:prototype.id01+'-txt-FEUP',
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
                                    id:prototype.id01+'-txt-HOUP',
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
            ]
        }
    ],
    dockedItems:[
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            layout:{
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults:{
                scale: 'medium'
            },
            items:[
                {
                    text: 'Save',
                    id:prototype.id01+'-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners:{
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id:prototype.id01+'-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners:{
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id:prototype.id01+'-btn-delete',
                    iconCls: 'prx-icon-delete',
                    listeners:{
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Cancel',
                    id:prototype.id01+'-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners:{
                        click: 'onCancelClick'
                    }
                },
                { xtype: 'tbspacer', width: 30 },
                {
                    xtype: 'label',
                    text: '(*) Required Fields',
                    style: 'font-weight:bold;color:red;',
                    width: 120
                },
            ]
        }
    ]

});