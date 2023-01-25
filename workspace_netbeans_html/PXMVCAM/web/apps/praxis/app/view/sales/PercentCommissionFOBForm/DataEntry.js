/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.PercentCommissionFOBForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.sales.PercentCommissionFOB.DataEntryPercentCommissionFOBController'
    ],
    title: 'Percent Commission (General Rules)',
    header: true,
    width: 800,
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
                    width: 820,
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
                                            width: 120,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Agreement Code</strong>'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 30,
                                            padding: '2px 5px 2px 3px',
                                            html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-TXT_A1742CODEA',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            width: 40,
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px',
                                            maxLength: 4,
                                            // maskRe: /[0-9]/,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 110,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Issuance Form</strong>'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 30,
                                            padding: '2px 5px 2px 3px',
                                            html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-TXT_A1742FORMA',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            width: 50,
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px',
                                            maxLength: 3,
                                            //maskRe: /[0-9]/,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
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
                                            width: 120,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Description</strong>'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 30,
                                            padding: '2px 5px 2px 3px',
                                            html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-TXT_A1742DESCR',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            width: 620,
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px',
                                            maxLength: 100,
                                            //maskRe: /[0-9]/,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
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
                                            width: 130,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000; text-decoration:underline  ">Excluding Values</strong>'

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
                                            html: '<strong style="color:#000;  ">Exclude Class</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-TXT_A1742CLASX',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            width: 620,
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px',
                                            maxLength: 100,
                                            //maskRe: /[0-9]/,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
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
                                            html: '<strong style="color:#000;  ">Exclude Code</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-TXT_A1742CODEX',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            width: 50,
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px',
                                            maxLength: 1,
                                            //maskRe: /[0-9]/,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
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
                                            html: '<strong style="color:#000;  ">Exclude Sub-Code</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-TXT_A1742SCODX',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            width: 620,
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px',
                                            maxLength: 100,
                                            //maskRe: /[0-9]/,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
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
                                            html: '<strong style="color:#000; text-decoration:underline  ">Applying values</strong>'

                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 0',
                                    border: false,
                                    // bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 150,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Marketing Carrier</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-TXT_A1742MCARR',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            width: 50,
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px',
                                            maxLength: 3,
                                            //maskRe: /[0-9]/,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 200},
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 130,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Type of Passenger</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-TXT_A1742TPASS',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            width: 50,
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px',
                                            maxLength: 3,
                                            //maskRe: /[0-9]/,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 0',
                                    border: false,
                                    // bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 150,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Account Code</strong>'

                                        },
                                        {
                                            xtype: 'textareafield',
                                            id: prototype.id + '-TXT_A1742ACODE',
                                            width: 250,
                                            enforceMaxLength: true,
                                            maxLength: 100,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 130,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">IT Tour Code</strong>'

                                        },
                                        {
                                            xtype: 'textareafield',
                                            enforceMaxLength: true,
                                            maxLength: 100,
                                            id: prototype.id + '-TXT_A1742TOUR',
                                            width: 230,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 0',
                                    border: false,
                                    // bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 150,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Farebasis</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-TXT_A1742FBASI',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            width: 100,
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px',
                                            maxLength: 15,
                                            //maskRe: /[0-9]/,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 150}

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 0',
                                    border: false,
                                    // bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 150,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Class</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-TXT_A1742CLASS',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            width: 240,
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px',
                                            maxLength: 100,
                                            //maskRe: /[0-9]/,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 130,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Code</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-TXT_A1742CODE',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            width: 50,
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px',
                                            maxLength: 1,
                                            //maskRe: /[0-9]/,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 0',
                                    border: false,
                                    // bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 150,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Sub Code</strong>'

                                        },
                                        {
                                            xtype: 'textareafield',
                                            id: prototype.id + '-TXT_A1742SCODE',
                                            width: 250,
                                            enforceMaxLength: true,
                                            maxLength: 100,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 130,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Method of payment</strong>'

                                        },
                                        {
                                            xtype: 'textareafield',
                                            // height: 35,
                                            id: prototype.id + '-TXT_A1742MOPAY',
                                            width: 230,
                                            enforceMaxLength: true,
                                            maxLength: 100,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 0',
                                    border: false,
                                    // bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 150,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Ancillaries</strong>'

                                        },
                                        {
                                            xtype: 'textareafield',
                                            id: prototype.id + '-TXT_A1742ANCIL',
                                            enforceMaxLength: true,
                                            maxLength: 100,
                                            width: 250,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 0',
                                    border: false,
                                    // bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 150,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Aplicable Comm.</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-TXT_A1742COMM',
                                            required: true,
                                            disabled: false,
                                            readOnly: false,
                                            value: '0.000',
                                            width: 80,
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px',
                                            fieldStyle: 'text-align:left',
                                            maxLength: 12,
                                            maskRe: /[0-9.]/,
                                            listeners: {
                                                change: 'onUpperValue'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 60,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Validity</strong>'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                            width: 30
                                        },
                                        {
                                            xtype: 'datefield',
                                            format: 'Y/m/d',
                                            id: prototype.id + '-TXT_A1742FINIV',
                                            fieldStyle: 'text-align:center',
                                            maskRe: /[0-9/]/,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px',
                                            maxLength: 10,
                                            width: 100
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 30,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">To</strong>'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                            width: 30
                                        },
                                        {
                                            xtype: 'datefield',
                                            format: 'Y/m/d',
                                            id: prototype.id + '-TXT_A1742FFINV',
                                            fieldStyle: 'text-align:center',
                                            maskRe: /[0-9/]/,
                                            enforceMaxLength: true,
                                            padding: '2px 5px 2px 3px',
                                            maxLength: 10,
                                            width: 100
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
                ,
                {
                    xtype: 'label',
                    labelAlign: 'center',
                    width: 150,
                    padding: '2px 5px 2px 3px',
                    html: '<strong style="color:red;font-size:13px;">(*)Required Fields</strong>'

                }
            ]
        }
    ]
});