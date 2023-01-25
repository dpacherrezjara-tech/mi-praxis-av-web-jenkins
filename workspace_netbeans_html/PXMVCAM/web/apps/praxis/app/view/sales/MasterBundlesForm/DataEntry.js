Ext.define('Ext.Praxis.view.sales.MasterBundlesForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryMasterBundlesForm',

    controller: 'DataEntryMasterBundlesController',

    requires:[
        'Ext.Praxis.controller.sales.MasterBundles.DataEntryMasterBundlesController',
        'Ext.Praxis.view.sales.MasterBundlesForm.InfoDataEntry'
    ],

    title:'MASTER BUNDLES',
    header:true,
    height:733,
    width:1100,
    border:false,
    resizable:false,
    layout:'fit',
    modal:true,

    defaults:{
        border: false
    },

    items:[
        {
            xtype: 'form',
            id: prototype.id + '-formDataEntry',
            defaults:{
                style: 'margin: 3px;',
                border: false
            },
            items:[
                { xtype: 'tbspacer', height: 3 },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'EMD Type',
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
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtTipoEmd',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            maxLength: 4,
                            maskRe: /[a-zA-ZñÑ]/,
                            width: 90,
                            listeners:{
                                change: 'onUpperValue'
                            }
                        },
                        { xtype: 'tbspacer', width: 15 },
                        {
                            xtype: 'label',
                            text: 'RFIC',
                            style: 'font-weight:bold;color:#000;',
                            width: 80
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
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtRFICBundle',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            maxLength: 1,
                            maskRe: /[a-zA-ZñÑ]/,
                            width: 90,
                            listeners:{
                                change: 'onUpperValue'
                            }
                        },
                        { xtype: 'tbspacer', width: 15 },
                        {
                            xtype: 'label',
                            text: 'RFIS',
                            style: 'font-weight:bold;color:#000;',
                            width: 80
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
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtRFISBundle',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            maxLength: 3,
                            maskRe: /[a-zA-ZñÑ]/,
                            width: 90,
                            listeners:{
                                change: 'onUpperValue'
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
                            text: 'Description',
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
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtDescription',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            maxLength: 50,
                            width: 305
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
                            text: 'Effectivity:',
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
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'datefield',
                            id:prototype.id+'-txtA2534FIVIG',
                            fieldStyle: 'text-align:center',
//                            maxValue : new Date(),
                            format: 'Y/m/d',
                            maskRe: /[0-9/]/,
                            width: 90/*,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Format valid YYYY/MM/DD'
                            }*/
                        },
                        { xtype: 'tbspacer', width: 15 },
                        {
                            xtype: 'label',
                            text: 'Discontinuity:',
                            style: 'font-weight:bold;color:#000;',
                            width: 100
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'datefield',
                            id:prototype.id+'-txtA2534FFVIG',
                            fieldStyle: 'text-align:center',
//                            maxValue : new Date(),
                            format: 'Y/m/d',
                            maskRe: /[0-9/]/,
                            width: 90/*,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Format valid YYYY/MM/DD'
                            }*/
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
                            text: 'Cost',
                            style: 'font-weight:bold;color:#000;',
                            width: 110
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtCostoBundle',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            maxLength: 8,
                            width: 90,
                            listeners:{
                                change: 'onUpperValue'
                            }
                        },
                        { xtype: 'tbspacer', width: 15 },
                        {
                            xtype: 'label',
                            text: 'Tax (%)',
                            style: 'font-weight:bold;color:#000;',
                            width: 100
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtTaxPorc',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            maxLength: 8,
                            maskRe: /[0-9]*\.?[0-9]/,
                            width: 90,
                            enableKeyEvents: true,
                            listeners:{
                                change: 'onUpperValue',
                                keypress: 'onTaxPorcKeypress'
                            }
                        },
                        { xtype: 'tbspacer', width: 15 },
                        {
                            xtype: 'label',
                            text: 'Tax (Amount)',
                            style: 'font-weight:bold;color:#000;',
                            width: 100
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtTaxAmount',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            maxLength: 8,
                            width: 90,
                            listeners:{
                                change: 'onUpperValue'
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
                            text: 'Net Amount',
                            style: 'font-weight:bold;color:#000;',
                            width: 110
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtNeto',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            maxLength: 8,
                            width: 90,
                            listeners:{
                                change: 'onUpperValue'
                            }
                        }
                    ]
                },
                {
                    xtype: 'tabpanel',
                    layout: 'hbox',
                    fullscreen: true,
//                    bodyStyle: 'background-color: white;',
//                    style : 'background-color:white;',
                    defaults: {
                        styleHtmlContent: true
                    },
                    autoScroll: true,
                    items: [
                        {
                            title: 'Ancillaries',
                            id: prototype.id+'-pnlAncillaries',
                            height: 370,
                            defaults: {
                                border: false
                            },
                            items: [
                                { xtype: 'tbspacer', height: 8 },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    items:[
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'RFIC Anc.',
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
                                        { xtype: 'tbspacer', width: 10 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtRFICAnc',
                                            fieldStyle: 'text-align:left',
                                            enforceMaxLength: true,
                                            maxLength: 1,
                                            maskRe: /[a-zA-ZñÑ,]/,
                                            width: 90,
                                            listeners:{
                                                change: 'onUpperValue'
                                            }
                                        },
                                        { xtype: 'tbspacer', width: 15 },
                                        {
                                            xtype: 'label',
                                            text: 'RFIS Anc.',
                                            style: 'font-weight:bold;color:#000;',
                                            width: 80
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
                                        { xtype: 'tbspacer', width: 10 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtRFISAnc',
                                            fieldStyle: 'text-align:left',
                                            enforceMaxLength: true,
                                            maxLength: 3,
                                            maskRe: /[a-zA-ZñÑ,]/,
                                            width: 90,
                                            listeners:{
                                                change: 'onUpperValue'
                                            }
                                        },
                                        { xtype: 'tbspacer', width: 15 },
                                        {
                                            xtype: 'label',
                                            text: 'Description',
                                            style: 'font-weight:bold;color:#000;',
                                            width: 100
                                        },
                                        { xtype: 'tbspacer', width: 10 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtDescripAnc',
                                            fieldStyle: 'text-align:left',
                                            enforceMaxLength: true,
                                            maxLength: 70,
                                            width: 310
                                        },
                                        { xtype: 'tbspacer', width: 15 },
                                        {
                                            xtype: 'button',
                                            id:prototype.id+'-btnAddAncillarie',
                                            text: '<span style="font-weight:bold;font-size: 13px;">Add Ancillarie</span>',
                                            scale: 'medium',
//                                            hidden: true,
                                            icon: 'resources/img/botones/24x24/1337977947_add1-.png',
                                            width: 150,
                                            listeners:{
                                                click: 'onAddAncillarieClick'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id:prototype.id+'-btnUpdateAncillarie',
                                            text: '<span style="font-weight:bold;font-size: 13px;">Update</span>',
                                            scale: 'medium',
                                            hidden: true,
                                            iconCls: 'prx-icon-update',
                                            width: 90,
                                            listeners:{
                                                click: 'onUpdateAncillarieClick'
                                            }
                                        },
                                        { xtype: 'tbspacer', width: 3 },
                                        {
                                            xtype: 'button',
                                            id:prototype.id+'-btnCancelAncillarie',
                                            text: '<span style="font-weight:bold;font-size: 13px;">Cancel</span>',
                                            scale: 'medium',
                                            hidden: true,
                                            icon: 'resources/img/botones/24x24/1337983423_Cancel__Red.png',
                                            width: 90,
                                            listeners:{
                                                click: 'onCancelAncillarieClick'
                                            }
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 4 },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    items:[
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'Currency',
                                            style: 'font-weight:bold;color:#000;',
                                            width: 110
                                        },
                                        { xtype: 'tbspacer', width: 10 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtMdaAnc',
                                            fieldStyle: 'text-align:left',
                                            enforceMaxLength: true,
                                            maxLength: 3,
                                            width: 90,
                                            listeners:{
                                                change: 'onUpperValue'
                                            }
                                        },
                                        { xtype: 'tbspacer', width: 15 },
                                        {
                                            xtype: 'label',
                                            text: 'Total Anc.:',
                                            style: 'font-weight:bold;color:#000;',
                                            width: 100
                                        },
                                        { xtype: 'tbspacer', width: 10 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtTotAnc',
                                            value: '0.00',
                                            fieldStyle: 'text-align:right',
                                            enforceMaxLength: true,
                                            maxLength: 60,
                                            maskRe: /[0-9.]/,
                                            width: 90,
                                            listeners:{
                                                change: 'onUpperValue'
                                            }
                                        },
                                        { xtype: 'tbspacer', width: 15 },
                                        {
                                            xtype: 'label',
                                            text: 'Tax (%):',
                                            style: 'font-weight:bold;color:#000;',
                                            width: 100
                                        },
                                        { xtype: 'tbspacer', width: 10 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtTaxPorAnc',
                                            value: '0.00',
                                            fieldStyle: 'text-align:right',
                                            enforceMaxLength: true,
                                            maxLength: 60,
                                            maskRe: /[0-9.]/,
                                            width: 90,
                                            enableKeyEvents: true,
                                            listeners:{
                                                change: 'onUpperValue',
                                                keypress: 'onTaxPorAncKeypress'
                                            }
                                        },
                                        { xtype: 'tbspacer', width: 20 },
                                        {
                                            xtype: 'label',
                                            text: 'Tax Amount:',
                                            style: 'font-weight:bold;color:#000;',
                                            width: 100
                                        },
                                        { xtype: 'tbspacer', width: 10 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtTaxAmountAnc',
                                            value: '0.00',
                                            fieldStyle: 'text-align:right',
                                            enforceMaxLength: true,
                                            maxLength: 60,
                                            maskRe: /[0-9.]/,
                                            width: 90,
                                            listeners:{
                                                change: 'onUpperValue'
                                            }
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 10 },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    items:[
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'Net Anc.:',
                                            style: 'font-weight:bold;color:#000;',
                                            width: 110
                                        },
                                        { xtype: 'tbspacer', width: 10 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtNetoAnc',
                                            value: '0.00',
                                            fieldStyle: 'text-align:right',
                                            enforceMaxLength: true,
                                            maxLength: 60,
                                            maskRe: /[0-9.]/,
                                            width: 90,
                                            listeners:{
                                                change: 'onUpperValue'
                                            }
                                        },
                                        { xtype: 'tbspacer', width: 15 },
                                        {
                                            xtype: 'label',
                                            text: 'Fare Perc.(%):',
                                            style: 'font-weight:bold;color:#000;',
                                            width: 100
                                        },
                                        { xtype: 'tbspacer', width: 10 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtFarePor',
                                            value: '0.00',
                                            fieldStyle: 'text-align:right',
                                            enforceMaxLength: true,
                                            maxLength: 60,
                                            maskRe: /[0-9.]/,
                                            width: 90,
                                            listeners:{
                                                change: 'onUpperValue'
                                            }
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 10 },
                                {
                                    xtype: 'panel',
                                    height: 300,
                                    layout: 'fit',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'border',
                                            align: 'center',
                                            border: false,
                                            defaults: {
                                                border: false
                                            },
                                            items: [
                                                {
                                                    region: 'center',
                                                    xtype: prototype.id +'-info2'
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
                    xtype: 'fieldset',
                    id: prototype.id+'-ControlData',
                    title: 'Control Data',
//                    margin: '15 0 8 0',
//                    width: 660,
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
                                    id:prototype.id+'-USCR',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 90 },
                                {
                                    xtype: 'label',
                                    text: 'Creation Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-FECR',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 90 },
                                {
                                    xtype: 'label',
                                    text: 'Creation Time',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-HOCR',
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
                                    id:prototype.id+'-USUP',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 90 },
                                {
                                    xtype: 'label',
                                    text: 'Update Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-FEUP',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 90 },
                                {
                                    xtype: 'label',
                                    text: 'Update Time',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-HOUP',
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
            margin: '10 0 10 0',
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
                    id:prototype.id+'-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners:{
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id:prototype.id+'-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners:{
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id:prototype.id+'-btn-delete',
                    iconCls: 'prx-icon-delete',
                    listeners:{
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Cancel',
                    id:prototype.id+'-btn-cancel',
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
                }
//                ,
//                { xtype: 'tbspacer', width: 30 },
//                {
//                    xtype: 'button',
//                    id:prototype.id+'-btn-prev',
//                    icon: 'resources/img/botones/prev.png',
//                    tooltip: 'View Previous Flight Manifest',
//                    border: false,
//                    listeners:{
//                        click: 'onPrevClick'
//                    }
//                },
//                {
//                    xtype: 'button',
//                    id:prototype.id+'-btn-next',
//                    icon: 'resources/img/botones/next2.png',
//                    tooltip: 'View Next Flight Manifest',
//                    border: false,
//                    listeners:{
//                        click: 'onNextClick'
//                    }
//                }
            ]
        }
    ]

});