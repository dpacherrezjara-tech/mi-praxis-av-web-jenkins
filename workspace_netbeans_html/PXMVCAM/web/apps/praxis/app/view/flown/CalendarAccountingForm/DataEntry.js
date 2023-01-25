/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.CalendarAccountingForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-dataEntryController',
    requires: [
         'Ext.Praxis.controller.flown.CalendarAccounting.DataEntryCalendarAccountingController'
    ],
    title: 'Calendar of Accounting - Data Entry',
    header: true,
    width: 630,
    height: 480,
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
                    margin: '15 0 5 10',
                    border: false,
                    //bodyStyle: 'background: #E5ECEF',
                    items: [
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">Calendar Date :</strong>',
                            align: 'center',
                            width: 130
                            
                        },
                        {
                            xtype: 'label',
                            html: '<strong style="color:red;">(*)</strong>',
                            align: 'center'
                           
                        },
                        {
                            xtype: 'datefield',
                            id: prototype.id + '-txtA1980FECMX',
                            fieldLabel: '',
                            maxLength: 10,
                            format: 'Y/m/d',
                            width: 100,
                            hideTrigger: false
                        },
                        {
                            xtype: 'label',
                            html: '<strong style="color:black;">(Mexico)</strong>',
                            align: 'center',
                            fieldStyle: 'text-align: center;'
                        },
                        {xtype: 'tbspacer', width: 20},
                        ,
                                {
                                    xtype: 'datefield',
                                    id: prototype.id + '-txtA1980FECPR',
                                    fieldLabel: '',
                                    maxLength: 10,
                                    format: 'Y/m/d',
                                    width: 100,
                                    hideTrigger: false
                                },
                        {
                            xtype: 'label',
                            html: '<strong style="color:black;">(Praxis Local)</strong>',
                            align: 'center'
                            
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '1 0 5 10',
                    border: false,
                    //bodyStyle: 'background: #E5ECEF',
                    items: [
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">Accounting Date :</strong>',
                            align: 'center',
                            width: 130


                        },
                        {
                            xtype: 'label',
                            html: '<strong style="color:red;">(*)</strong>',
                            align: 'center'

                        },
                        {
                            xtype: 'datefield',
                            id: prototype.id + '-txtA1980FECCO',
                            fieldLabel: '',
                            maxLength: 10,
                            format: 'Y/m/d',
                            width: 100,
                            hideTrigger: false
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '5 0 5 5',
                    border: false,
                    //bodyStyle: 'background: #E5ECEF',
                    items: [
                        {xtype: 'tbspacer', width: 120},
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">Status </strong>',
                            align: 'center',
                            width: 100


                        },
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">Time of Mexico </strong>',
                            align: 'center',
                            width: 115

                        },
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">Time of Praxis Local </strong>',
                            align: 'center',
                            width: 130

                        }

                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '5 0 5 5',
                    border: false,
                    //bodyStyle: 'background: #E5ECEF',
                    items: [
                        {xtype: 'tbspacer', width: 95},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-txtA1980GL',
                            fieldLabel: 'GL',
                            labelAlign: 'right',
                            queryMode: 'local',
                            editable: false,
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'OPEN',                           
                            labelWidth: 20,
                            width: 100,
                            anchor: '100%'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1980HMXGL',
                            margin: '0 0 0 20',
                            labelWidth: 110,
                            width: 110,
                            maxLength: 8,
                            enforceMaxLength: true,
                            maskRe: /[0-9:]/
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1980HPRGL',
                            margin: '0 0 0 10',
                            labelWidth: 110,
                            width: 110,
                            maxLength: 8,
                            enforceMaxLength: true,
                            maskRe: /[0-9:]/
                        },
                        {
                            xtype: 'label',
                            html: '<strong style="color:red;">(HH:mm:ss)</strong>',
                            align: 'center',
                            margin: '0 0 0 8'

                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '1 0 5 5',
                    border: false,
                    //bodyStyle: 'background: #E5ECEF',
                    items: [
                        {xtype: 'tbspacer', width: 95},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-txtA1980AR',
                            fieldLabel: 'AR',
                            labelAlign: 'right',
                            queryMode: 'local',
                            editable: false,
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name',
                            //emptyText: 'All',
                            labelWidth: 20,
                            width: 100,
                            anchor: '100%'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1980HMXAR',
                            margin: '0 0 0 20',
                            labelWidth: 110,
                            width: 110,
                            maxLength: 8,
                            enforceMaxLength: true,
                            maskRe: /[0-9:]/
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1980HPRAR',
                            margin: '0 0 0 10',
                            labelWidth: 110,
                            width: 110,
                            maxLength: 8,
                            enforceMaxLength: true,
                            maskRe: /[0-9:]/
                        },
                        {
                            xtype: 'label',
                            html: '<strong style="color:red;">(HH:mm:ss)</strong>',
                            align: 'center',
                            margin: '0 0 0 8'

                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '1 0 5 5',
                    border: false,
                    //bodyStyle: 'background: #E5ECEF',
                    items: [
                        {xtype: 'tbspacer', width: 95},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-txtA1980AP',
                            fieldLabel: 'AP',
                            labelAlign: 'right',
                            queryMode: 'local',
                            editable: false,
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name',
                            //emptyText: 'All',
                            labelWidth: 20,
                            width: 100,
                            anchor: '100%'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1980HMXAP',
                            margin: '0 0 0 20',
                            labelWidth: 110,
                            width: 110,
                            maxLength: 8,
                            enforceMaxLength: true,
                            maskRe: /[0-9:]/
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1980HPRAP',
                            margin: '0 0 0 10',
                            labelWidth: 110,
                            width: 110,
                            maxLength: 8,
                            enforceMaxLength: true,
                            maskRe: /[0-9:]/
                        },
                        {
                            xtype: 'label',
                            html: '<strong style="color:red;">(HH:mm:ss)</strong>',
                            align: 'center',
                            margin: '0 0 0 8'

                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '1 0 5 10',
                    border: false,
                    //bodyStyle: 'background: #E5ECEF',
                    items: [
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">Pending Date :</strong>',
                            align: 'center',
                            width: 130,
                            fieldStyle: 'text-align: center;'
                        },
                        {
                            xtype: 'datefield',
                            id: prototype.id + '-txtA1980FECIN',
                            fieldLabel: '<strong style="color:black;">From</strong>',
                            maxLength: 10,
                            labelWidth: 40,
                            format: 'Y/m/d',
                            width: 120,
                            hideTrigger: false
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'datefield',
                            id: prototype.id + '-txtA1980FECFN',
                            fieldLabel: '<strong style="color:black;">To</strong>',
                            maxLength: 10,
                            format: 'Y/m/d',
                            labelWidth: 20,
                            width: 100,
                            hideTrigger: false
                        },
                        {
                            xtype: 'label',
                            html: '**',
                            align: 'center'

                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    margin: '5 0 5 10',
                    border: false,
                    //bodyStyle: 'background: #E5ECEF',
                    items: [
                        {
                            xtype: 'label',
                            html: '<strong style="color:red;">(*) Required Fields </strong>'
                        },
                        {
                            xtype: 'label',
                            margin: '10 0 0 0',
                            html: '<strong style="color:black;">' + "* When TIME Field is empty, the status takes 'ALL DAY'." + '</strong>'
                        },
                        {
                            xtype: 'label',
                            margin: '10 0 0 0',
                            html: '<strong style="color:black;">' + "** Field 'Pending Date' will be filled when the 3 status will be 'OPEN CALENDAR'." + '</strong>'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    id: prototype.id + '-ControlData',
                    title: 'Control Data',
                    width: 600,
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
                                    labelWidth: 90,
                                    margin: '0 10 0 0',
                                    readOnly: true,
                                    width: 180
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-FECR',
                                    fieldLabel: '<strong style="color:#000;">Creation Date</strong>',
                                    labelWidth: 90,
                                    margin: '0 10 0 0',
                                    readOnly: true,
                                    width: 180
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-HOCR',
                                    fieldLabel: '<strong style="color:#000;">Creation Time</strong>',
                                    labelWidth: 90,
                                    margin: '0 10 0 0',
                                    readOnly: true,
                                    width: 180
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
                                    labelWidth: 90,
                                    readOnly: true,
                                    margin: '0 10 0 0',
                                    width: 180
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-FEUP',
                                    fieldLabel: '<strong style="color:#000;">Update Date</strong>',
                                    labelWidth: 90,
                                    readOnly: true,
                                    margin: '0 10 0 0',
                                    width: 180
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-HOUP',
                                    fieldLabel: '<strong style="color:#000;">Update Time</strong>',
                                    labelWidth: 90,
                                    readOnly: true,
                                    margin: '0 10 0 0',
                                    width: 180
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
            margin: '5 100 10 150',
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