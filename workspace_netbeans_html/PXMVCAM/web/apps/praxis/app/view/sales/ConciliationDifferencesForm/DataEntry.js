/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.ConciliationDifferencesForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-dataEntryController',
    requires: [
//        'Ext.Praxis.controller.sales.ConciliationBSP.DataEntryConciliationBSPController'
          'Ext.Praxis.controller.sales.ConciliationDifferences.DataEntryConciliationDifferencesController',
    ],
    title: 'Conciliation BSP',
    header: true,
    width: 600,
    height: 510,
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
                    width: 550,
                    margin: '1 1 1 1',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            margin: '5 0 1 0',
                            border: false,
                            defaults: {
                                width: 560
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 5',
                                    border: false,
                                    defaults: {
                                        //bodyStyle: 'background: #E5ECEF',
                                        padding: '0px 3px 0px 3px',
                                        labelStyle: 'font-weight:bold;'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            width: 120,
                                            text: 'Ending Date',
                                            style: 'font-weight:bold;text-align:left;',
                                            padding: '1px 5px 5px 8px'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtA1698FFILE',
                                            width: 130,
                                            labelWidth: 0,
                                            readOnly: true,
                                            text: 'Ending Date',
                                            style: 'font-weight:bold;text-align:left;',
                                            padding: '1px 5px 5px 8px',
                                            maxLength: 8

                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 5',
                                    border: false,
                                    defaults: {
                                        //bodyStyle: 'background: #E5ECEF',
                                        padding: '0px 3px 0px 3px',
                                        labelStyle: 'font-weight:bold;'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            width: 120,
                                            text: 'Processing Date',
                                            style: 'font-weight:bold;text-align:left;',
                                            padding: '1px 5px 5px 8px'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtA1698FPRDA',
                                            width: 130,
                                            labelWidth: 0,
                                            readOnly: true,
                                            style: 'font-weight:bold;text-align:left;',
                                            padding: '1px 5px 5px 8px',
                                            maxLength: 8
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 5',
                                    border: false,
                                    defaults: {
                                        //bodyStyle: 'background: #E5ECEF',
                                        padding: '0px 3px 0px 3px',
                                        labelStyle: 'font-weight:bold;'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            width: 120,
                                            text: 'Currency',
                                            style: 'font-weight:bold;text-align:left;',
                                            padding: '1px 5px 5px 8px'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtA1698CURR',
                                            width: 90,
                                            labelWidth: 0,
                                            readOnly: true,
                                            style: 'font-weight:bold;text-align:left;',
                                            padding: '1px 5px 5px 8px'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 5',
                                    border: false,
                                    defaults: {
                                        //bodyStyle: 'background: #E5ECEF',
                                        padding: '0px 3px 0px 3px',
                                        labelStyle: 'font-weight:bold;'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 120},
                                        {
                                            xtype: 'label',
                                            width: 130,
                                            text: 'BSP',
                                            style: 'font-weight:bold;text-align:left;',
                                            margin: '1px 5px 5px 8px'

                                        },
                                        {
                                            xtype: 'label',
                                            width: 130,
                                            text: 'PRAXIS',
                                            style: 'font-weight:bold;text-align:left;',
                                            margin: '1px 5px 5px 8px'

                                        },
                                        {
                                            xtype: 'label',
                                            width: 130,
                                            text: 'DIFFERENCE',
                                            style: 'font-weight:bold;text-align:left;',
                                            margin: '1px 5px 5px 8px'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 5',
                                    border: false,
                                    defaults: {
                                        //bodyStyle: 'background: #E5ECEF',
                                        padding: '1px 5px 1px 8px',
                                        labelStyle: 'font-weight:bold;',
                                        fieldStyle: 'text-align:right'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            width: 120,
                                            text: 'Gross',
                                            style: 'font-weight:bold;text-align:left;',
                                            padding: '1px 5px 5px 8px',
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtA1698GROS',
                                            width: 130,
                                            labelWidth: 0,
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtA1698GROSP',
                                            width: 130,
                                            labelWidth: 0,
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtA1698GROSD',
                                            width: 130,
                                            labelWidth: 0,
                                            readOnly: true
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 5',
                                    border: false,
                                    defaults: {
                                        //bodyStyle: 'background: #E5ECEF',
                                        padding: '1px 5px 1px 8px',
                                        labelStyle: 'font-weight:bold;',
                                        fieldStyle: 'text-align:right'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            width: 120,
                                            text: 'Remittance',
                                            style: 'font-weight:bold;text-align:left;',
                                            padding: '1px 5px 1px 8px'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtA1698REMM',
                                            width: 130,
                                            labelWidth: 0,
                                            readOnly: true

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtA1698REMMP',
                                            width: 130,
                                            labelWidth: 0,
                                            readOnly: true

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtA1698REMMD',
                                            width: 130,
                                            labelWidth: 0,
                                            readOnly: true

                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 5',
                                    border: false,
                                    defaults: {
                                        //bodyStyle: 'background: #E5ECEF',
                                        padding: '1px 5px 1px 8px',
                                        labelStyle: 'font-weight:bold;',
                                        fieldStyle: 'text-align:right'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            width: 120,
                                            text: 'Tax',
                                            style: 'font-weight:bold;text-align:left;',
                                            padding: '1px 5px 5px 8px'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtA1698TAX',
                                            width: 130,
                                            labelWidth: 0,
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtA1698TAXP',
                                            width: 130,
                                            labelWidth: 0,
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtA1698TAXD',
                                            width: 130,
                                            labelWidth: 0,
                                            readOnly: true
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 5',
                                    border: false,
                                    defaults: {
                                        //bodyStyle: 'background: #E5ECEF',
                                        padding: '1px 5px 1px 8px',
                                        labelStyle: 'font-weight:bold;',
                                        fieldStyle: 'text-align:right'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            width: 120,
                                            text: 'Commission',
                                            style: 'font-weight:bold;text-align:left;',
                                            padding: '1px 5px 5px 8px'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtA1698COMM',
                                            width: 130,
                                            labelWidth: 0,
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtA1698COMMP',
                                            width: 130,
                                            labelWidth: 0,
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtA1698COMMD',
                                            width: 130,
                                            labelWidth: 0,
                                            readOnly: true
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 5',
                                    border: false,
                                    defaults: {
                                        //bodyStyle: 'background: #E5ECEF',
                                        padding: '1px 5px 1px 8px',
                                        labelStyle: 'font-weight:bold;',
                                        fieldStyle: 'text-align:right'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            width: 120,
                                            text: 'Cash',
                                            style: 'font-weight:bold;text-align:left;',
                                            padding: '1px 5px 5px 8px'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtCASH',
                                            width: 130,
                                            labelWidth: 0,
                                            readOnly: true

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtCASHP',
                                            width: 130,
                                            labelWidth: 0,
                                            readOnly: true

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtCASHD',
                                            width: 130,
                                            labelWidth: 0,
                                            readOnly: true
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 5',
                                    border: false,
                                    defaults: {
                                        //bodyStyle: 'background: #E5ECEF',
                                        padding: '1px 5px 1px 8px',
                                        labelStyle: 'font-weight:bold;',
                                        fieldStyle: 'text-align:right'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            width: 120,
                                            text: 'Credit',
                                            style: 'font-weight:bold;text-align:left;',
                                            padding: '1px 5px 5px 8px'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtCREDIT',
                                            width: 130,
                                            labelWidth: 0,
                                            readOnly: true

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtCREDITP',
                                            width: 130,
                                            labelWidth: 0,
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtCREDITD',
                                            width: 130,
                                            labelWidth: 0,
                                            readOnly: true
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 5',
                                    border: false,
                                    defaults: {
                                        //bodyStyle: 'background: #E5ECEF',
                                        padding: '1px 5px 1px 8px',
                                        labelStyle: 'font-weight:bold;',
                                        fieldStyle: 'text-align:right'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            width: 120,
                                            text: 'Indicator',
                                            style: 'font-weight:bold;text-align:left;'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtA1698STCON',
                                            width: 100,
                                            labelWidth: 0,
                                            readOnly: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 1,
                                            maskRe: /[A/M/D/a/m/d]/,
                                            listeners: {
                                                change: 'onUpperValue',                                                
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-de-txtA1698COMEN').focus();
                                                    }
                                                }
                                            }

                                        },
                                        {
                                            xtype: 'label',
                                            width: 200,
                                            text: 'A=Macht M=Manual D=Difference',
                                            style: 'font-weight:normal;text-align:left;'

                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 5',
                                    border: false,
                                    defaults: {
                                        //bodyStyle: 'background: #E5ECEF',
                                        padding: '1px 5px 1px 5px',
                                        labelStyle: 'font-weight:bold;'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            width: 120,
                                            text: 'Comment',
                                            style: 'font-weight:bold;text-align:left;',
                                            padding: '1px 5px 5px 8px'

                                        },
                                        {
                                            xtype: 'textareafield',
                                            width: 420,
                                            height: 60,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 80,
                                            id: prototype.id + '-de-txtA1698COMEN',
                                            fieldStyle: 'color: #0B333C; font-size: 11px;'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    width: 540,
                                    id: prototype.id + '-de-controlData',
                                    title: 'Control Data',
                                    margin: '1 5 1 5',
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
                                                    id: prototype.id + '-de-txtA1698UCONC',
                                                    fieldLabel: '<strong style="color:#000;">User Audit</strong>',
                                                    labelWidth: 75,
                                                    margin: '0 0 0 0',
                                                    readOnly: true,
                                                    width: 165
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtA1698FCONC',
                                                    fieldLabel: '<strong style="color:#000;">Date</strong>',
                                                    labelWidth: 45,
                                                    margin: '0 2 0 5',
                                                    readOnly: true,
                                                    width: 130
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-HOCR',
                                                    fieldLabel: '<strong style="color:#000;">Creation Time</strong>',
                                                    labelWidth: 90,
                                                    margin: '0 0 5 5',
                                                    readOnly: true,
                                                    width: 180
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
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '5 100 10 10',
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
            bodyStyle: 'background: #E5ECEF',
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
                    //hidden: true,
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
                    text: 'Close',
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

/////* 
// * To change this license header, choose License Headers in Project Properties.
// * To change this template file, choose Tools | Templates
// * and open the template in the editor.
// */
//
//Ext.define('Ext.Praxis.view.sales.ConciliationDifferencesForm.DataEntry', {
//    extend: 'Ext.window.Window',
//    alias: 'widget.' + prototype.id + '-dataEntry',
//    controller: prototype.id + '-dataEntryController',
//    requires: [
//        'Ext.Praxis.controller.sales.ConciliationDifferences.DataEntryConciliationDifferencesController',
//        'Ext.Praxis.view.sales.ConciliationDifferencesForm.Info01'
//    ],
//
//    title: 'Detail Difference',
//    header: true,
//    width: 800,
//    height: 510,
//    border: false,
//    resizable: false,
//    layout: {
//        type: 'border',
//        align: 'center'
//    },
//    modal: true,
//    items: [
//        {
//            region: 'center',
//            xtype: 'form',
//            id: prototype.id + '-DataEntry-center',
//            border: false,
//            layout: {
//                type: 'vbox'
//            },
//            items: [
//                {
//                    xtype: 'panel',
//                    layout: 'vbox',
//                    width: '100%',
//                    margin: '1 1 1 1',
//                    items: [
//                        {
//                            xtype: 'panel',
//                            layout: 'vbox',
//                            margin: '5 0 1 0',
//                            border: false,
//                            items: [
//                                {
//                                    xtype: 'panel',
//                                    layout: 'hbox',
//                                    margin: '1 0 1 5',
//                                    border: false,
//                                    defaults: {
//                                        //bodyStyle: 'background: #E5ECEF',
//                                        padding: '0px 3px 0px 3px',
//                                        labelStyle: 'font-weight:bold;'
//                                    },
//                                    items: [
//                                        {
//                                            xtype: 'label',
//                                            width: 120,
//                                            text: 'Ending Date',
//                                            style: 'font-weight:bold;text-align:left;',
//                                            padding: '1px 5px 5px 8px'
//
//                                        },
//                                        {
//                                            xtype: 'textfield',
//                                            id: prototype.id + '-de-txtA1698FFILE',
//                                            width: 130,
//                                            labelWidth: 0,
//                                            readOnly: true,
//                                            text: 'Ending Date',
//                                            style: 'font-weight:bold;text-align:left;',
//                                            padding: '1px 5px 5px 8px',
//                                            maxLength: 8
//
//                                        }
//                                    ]
//                                },
//                                {
//                                    xtype: 'panel',
//                                    layout: 'hbox',
//                                    margin: '1 0 1 5',
//                                    border: false,
//                                    defaults: {
//                                        //bodyStyle: 'background: #E5ECEF',
//                                        padding: '0px 3px 0px 3px',
//                                        labelStyle: 'font-weight:bold;'
//                                    },
//                                    items: [
//                                        {
//                                            xtype: 'label',
//                                            width: 120,
//                                            text: 'Processing Date',
//                                            style: 'font-weight:bold;text-align:left;',
//                                            padding: '1px 5px 5px 8px'
//
//                                        },
//                                        {
//                                            xtype: 'textfield',
//                                            id: prototype.id + '-de-txtA1698FPRDA',
//                                            width: 130,
//                                            labelWidth: 0,
//                                            readOnly: true,
//                                            style: 'font-weight:bold;text-align:left;',
//                                            padding: '1px 5px 5px 8px',
//                                            maxLength: 8
//                                        }
//                                    ]
//                                },
////                                {
////                                    xtype: 'panel',
////                                    layout: 'hbox',
////                                    margin: '1 0 1 5',
////                                    border: false,
////                                    defaults: {
////                                        //bodyStyle: 'background: #E5ECEF',
////                                        padding: '0px 3px 0px 3px',
////                                        labelStyle: 'font-weight:bold;'
////                                    },
////                                    items: [
////                                        {
////                                            xtype: 'label',
////                                            width: 120,
////                                            text: 'Currency',
////                                            style: 'font-weight:bold;text-align:left;',
////                                            padding: '1px 5px 5px 8px'
////
////                                        },
////                                        {
////                                            xtype: 'textfield',
////                                            id: prototype.id + '-de-txtA1698CURR',
////                                            width: 90,
////                                            labelWidth: 0,
////                                            readOnly: true,
////                                            style: 'font-weight:bold;text-align:left;',
////                                            padding: '1px 5px 5px 8px'
////                                        }
////                                    ]
////                                },
//                                {
//                                    xtype: 'panel',
//                                    layout: 'hbox',
//                                    margin: '1 0 1 5',
//                                    border: false,
//                                    width: 780,
//                                    defaults: {
//                                        padding: '0px 3px 0px 3px',
//                                        labelStyle: 'font-weight:bold;'
//                                    },
//                                    items: [
//                                        {
//                                            xtype: prototype.id01 + '-info',
//                                            id: prototype.id01 + '-contentInfo'
//                                        }
//                                    ]
//                                }
//                            ]
//                        }
//                    ]
//                }
//
//            ]
//        }
//    ],
//    dockedItems: [
//        {
//            xtype: 'toolbar',
//            dock: 'bottom',
//            ui: 'footer',
//            margin: '5 100 10 10',
//            defaults: {
//                scale: 'medium'
//            },
//            style: 'aling:center padding: 5px;',
//            bodyStyle: 'background: #E5ECEF',
//            items: [
//                {
//                    text: 'Save',
//                    id: prototype.id + '-btn-save',
//                    iconCls: 'prx-icon-save',
//                    hidden: true,
//                    listeners: {
//                        click: 'onSaveClick'
//                    }
//                },
//                {
//                    text: 'Update',
//                    id: prototype.id + '-btn-update',
//                    iconCls: 'prx-icon-update',
//                    hidden: true,
//                    listeners: {
//                        click: 'onUpdateClick'
//                    }
//                },
//                {
//                    text: 'Delete',
//                    id: prototype.id + '-btn-delete',
//                    iconCls: 'prx-icon-delete',
//                    hidden: true,
//                    listeners: {
//                        click: 'onDeleteClick'
//                    }
//                },
//                {
//                    text: 'Close',
//                    id: prototype.id + '-btn-cancel',
//                    iconCls: 'prx-icon-cancel',
//                    listeners: {
//                        click: 'onCancelClick'
//                    }
//                }
//            ]
//        }
//    ]
//});