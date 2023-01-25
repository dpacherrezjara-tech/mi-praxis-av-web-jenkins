/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.OwnerlessCouponForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.flown.OwnerlessCoupon.DataEntryOwnerlessCouponController'
    ],
    title: 'Flight Manifest - Data Entry',
    header: true,
    width: 800,
    height: 460,
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
                    layout: 'hbox',
                    margin: '10 10 5 10',
                    border: false,
                    width: 770,
                    bodyStyle: 'background: #EFE9E5',
                    defaults: {
                        padding: '2 5 2 5'
                    },
                    items: [
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">Transacction Date :</strong>',
                            align: 'left',
                            width: 130

                        },
                        {
                            xtype: 'label',
                            html: '<strong style="color:red;">(*)</strong>',
                            align: 'center'

                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1413DATE',
                            fieldLabel: '',
                            maxLength: 8,
                            width: 100,
                            readOnly: true

                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">Ticket:</strong>',
                            align: 'left',
                            width: 120

                        },
                        {
                            xtype: 'label',
                            html: '<strong style="color:red;">(*)</strong>',
                            align: 'center'

                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtStrTicket',
                            fieldLabel: '',
                            width: 120,
                            readOnly: true
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '0 10 0 10',
                    border: false,
                    width: 770,
                    bodyStyle: 'background: #E5ECEF',
                    defaults: {
                        padding: '2 5 2 5'
                    },
                    items: [
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">Flight Date Reg B :</strong>',
                            align: 'left',
                            width: 160

                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1413FVLOB',
                            fieldLabel: '',
                            maxLength: 8,
                            minLength: 8,
                            maskRe: /[0-9]/,
                            enforceMaxLength: true,
                            width: 100

                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">Flight Number Reg B:</strong>',
                            align: 'left',
                            width: 150

                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1413NVLOB',
                            fieldLabel: '',
                            minLength: 1,
                            maxLength: 4,
                            maskRe: /[0-9]/,
                            enforceMaxLength: true,                            
                            width: 80
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '3 10 0 10',
                    border: false,
                    width: 770,
                    bodyStyle: 'background: #E5ECEF',
                    defaults: {
                        padding: '2 5 2 5'
                    },
                    items: [
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">City From :</strong>',
                            align: 'left',
                            width: 160

                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1413FROM',
                            fieldLabel: '',
                            maxLength: 3,
                            minLength: 3,
                            enforceMaxLength: true,
                            width: 100,
                            listeners: {
                                change: 'onUpperValue'
                            }

                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">City To :</strong>',
                            align: 'left',
                            width: 150

                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1413TO',
                            fieldLabel: '',
                            maxLength: 3,
                            minLength: 3,
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
                    margin: '3 10 0 10',
                    border: false,
                    width: 770,
                    //bodyStyle: 'background: #E5ECEF',
                    defaults: {
                        padding: '2 5 2 5'
                    },
                    items: [
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">Join Date :</strong>',
                            align: 'left',
                            width: 160

                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1413FREGI',
                            fieldLabel: '',
                            maxLength: 8,
                            width: 100,
                            readOnly: true

                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">Status Match</strong>',
                            align: 'left',
                            width: 150

                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbA1413STCRU',
                            fieldLabel: '',
                            queryMode: 'local',
                            editable: false,
                            readOnly: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'Pendiente',
                            width: 100,
                            anchor: '100%'

                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">Reg Type : </strong>',
                            align: 'left',
                            width: 90

                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbA1413TYPE',
                            fieldLabel: '',
                            queryMode: 'local',
                            editable: false,
                            readOnly: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: '',
                            width: 100,
                            anchor: '100%'

                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '3 10 0 10',
                    border: false,
                    width: 770,
                    //bodyStyle: 'background: #E5ECEF',
                    defaults: {
                        padding: '2 5 2 5'
                    },
                    items: [
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">Sequence:</strong>',
                            align: 'left',
                            width: 160

                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1413SEC',
                            fieldLabel: '',
                            width: 100,
                            readOnly: true

                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">PNR Original</strong>',
                            align: 'left',
                            width: 150

                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1413PNROR',
                            fieldLabel: '',
                            width: 100,
                            readOnly: true

                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">PNR Code : </strong>',
                            align: 'left',
                            width: 90

                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1413PNR',
                            fieldLabel: '',
                            width: 100,
                            readOnly: true

                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '3 10 0 10',
                    border: false,
                    width: 770,
                    //bodyStyle: 'background: #E5ECEF',
                    defaults: {
                        padding: '2 5 2 5'
                    },
                    items: [
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">Data VCR:</strong>',
                            align: 'left',
                            width: 160

                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1413DATA',
                            fieldLabel: '',
                            width: 590,
                            readOnly: true
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '3 10 0 10',
                    border: false,
                    width: 770,
                    //bodyStyle: 'background: #E5ECEF',
                    defaults: {
                        padding: '2 5 2 5'
                    },
                    items: [
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">Flight Date:</strong>',
                            align: 'left',
                            width: 160

                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1413FVLO',
                            fieldLabel: '',
                            width: 100,
                            maskRe: /[0-9]/,
                            readOnly: true

                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">Origin City</strong>',
                            align: 'left',
                            width: 150

                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1413CITYB',
                            fieldLabel: '',
                            width: 100,
                            readOnly: true

                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">Status : </strong>',
                            align: 'left',
                            width: 90

                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1413STATU',
                            fieldLabel: '',
                            width: 100,
                            readOnly: true

                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '3 10 0 10',
                    border: false,
                    width: 770,
                    //bodyStyle: 'background: #E5ECEF',
                    defaults: {
                        padding: '2 5 2 5'
                    },
                    items: [
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">Pax Name : </strong>',
                            align: 'left',
                            width: 160

                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1413NPAX',
                            fieldLabel: '',
                            width: 100,
                            readOnly: true

                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">Account Date : </strong>',
                            align: 'left',
                            width: 150

                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1413FCONT',
                            fieldLabel: '',
                            width: 100,
                            readOnly: true

                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">Sale Date : </strong>',
                            align: 'left',
                            width: 90

                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1413FVTA',
                            fieldLabel: '',
                            width: 100,
                            readOnly: true

                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '3 10 0 10',
                    border: false,
                    width: 770,
                    //bodyStyle: 'background: #E5ECEF',
                    defaults: {
                        padding: '2 5 2 5'
                    },
                    items: [
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">FF Code : </strong>',
                            align: 'left',
                            width: 160

                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1413FFCOD',
                            fieldLabel: '',
                            width: 100,
                            readOnly: true

                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">FF Cia : </strong>',
                            align: 'left',
                            width: 150

                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1413FFCIA',
                            fieldLabel: '',
                            width: 100,
                            readOnly: true

                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">Sale Source : </strong>',
                            align: 'left',
                            width: 90

                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbA1413SOURC',
                            fieldLabel: '',
                            queryMode: 'local',
                            editable: false,
                            readOnly: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: '',
                            width: 100,
                            anchor: '100%'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    id: prototype.id + '-ControlData',
                    title: 'Control Data',
                    width: 770,
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
                            margin: '5 0 10 0',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-USCR',
                                    fieldLabel: '<strong style="color:#000;">Creator User</strong>',
                                    labelWidth: 150,
                                    margin: '0 10 0 0',
                                    readOnly: true,
                                    width: 250
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-FECR',
                                    fieldLabel: '<strong style="color:#000;">Creation Date</strong>',
                                    labelWidth: 150,
                                    margin: '0 10 0 0',
                                    readOnly: true,
                                    width: 250
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-HOCR',
                                    fieldLabel: '<strong style="color:#000;">Creation Time</strong>',
                                    labelWidth: 100,
                                    margin: '0 10 0 0',
                                    readOnly: true,
                                    width: 250
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
                                    labelWidth: 150,
                                    readOnly: true,
                                    margin: '0 10 0 0',
                                    width: 250
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-FEUP',
                                    fieldLabel: '<strong style="color:#000;">Update Date</strong>',
                                    labelWidth: 150,
                                    readOnly: true,
                                    margin: '0 10 0 0',
                                    width: 250
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-HOUP',
                                    fieldLabel: '<strong style="color:#000;">Update Time</strong>',
                                    labelWidth: 100,
                                    readOnly: true,
                                    margin: '0 10 0 0',
                                    width: 250
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
            margin: '5 100 10 20',
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
                    html: '<strong style="color:red;">(*)Requerid Fields</strong>',
                    align: 'center'

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
                }
            ]
        }
    ]
});