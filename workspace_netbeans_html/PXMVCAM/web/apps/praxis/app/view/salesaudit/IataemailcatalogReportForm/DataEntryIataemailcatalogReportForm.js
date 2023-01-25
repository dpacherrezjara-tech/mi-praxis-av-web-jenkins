/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.salesaudit.IataemailcatalogReportForm.DataEntryIataemailcatalogReportForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryIataemailcatalogReportForm',

    controller: 'DataEntryIataemailcatalogReportFormController',

    requires: [
        'Ext.Praxis.controller.salesaudit.IataemailcatalogReportForm.DataEntryIataemailcatalogReportFormController'
    ],
    id: prototype.idEmailcatalog + '-win',

    title: '',
    header: true,
    height: 400,
    width: 800,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,

    defaults: {
        border: false
    },

    items: [
        {
            xtype: 'form',
            id: prototype.idEmailcatalog + '-form',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        /*{
                         xtype: 'textfield',
                         id: prototype.idEmailcatalog + '-txtA3948ZONA',
                         width: 200,
                         labelWidth: 60,
                         enableKeyEvents: true,hidden:'true',
                         fieldLabel: 'Zone',
                         afterLabelTextTpl: '<b style="color: #BF6868;"> (*)</b>',
                         maxLength: 4,
                         enforceMaxLength: 4,
                         listeners: {
                         specialkey: 'onSearchkey',
                         change: 'onUpperValue'
                         }
                         },*/
                        {
                            xtype: 'combo',
                            id: prototype.idEmailcatalog + '-txtA3948PAIS',
                            fieldLabel: 'Country',
                            queryMode: 'local',
                            maskRe: /[A-Z,a-z,Ñ,ñ]/,
                            displayField: 'A051DESCR1',
                            valueField: 'A051KEY2',
                            width: 220,
                            labelWidth: 50,
                            labelAlign: 'right',
                            emptyText: '',
                            listConfig: {
                                minWidth: 200
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idEmailcatalog + '-txtA3948GSA',
                            width: 300,
                            labelWidth: 30,
                            enableKeyEvents: true,
                            fieldLabel: 'GSA',
                            maxLength: 100,
                            enforceMaxLength: 100
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.idEmailcatalog + '-txtA3948RESPO',
                            width: 400,
                            labelWidth: 70,
                            enableKeyEvents: true,
                            fieldLabel: 'Responsable',
                            maxLength: 80,
                            enforceMaxLength: 80
                        },

                        /*{
                         xtype: 'textfield',
                         id: prototype.idEmailcatalog + '-txtIATAman',
                         width: 200,
                         labelWidth: 60,
                         enableKeyEvents: true,
                         fieldLabel: 'IATA',
                         afterLabelTextTpl: '<b style="color: #BF6868;"> (*)</b>',
                         maxLength: 8,
                         enforceMaxLength: 8,
                         maskRe: /^-?[0-9]*(\.[0-9]{1,2})?$/
                         },*/
                        {
                            xtype: 'combo',
                            id: prototype.idEmailcatalog + '-Cmbstatus',
                            fieldLabel: 'Status',
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: '[SELECTED]',
                            labelWidth: 50,
                            labelAlign: 'right',
                            width: 200,
                            queryMode: 'local'
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [

                        {
                            xtype: 'checkboxfield',
                            name: 'BILLING',
                            label: 'BILLING',
                            fieldLabel: 'BILLING',
                            labelWidth: 45,
                             labelSeparator: '',
                            id: prototype.idEmailcatalog + '-checkbox1'
                        },
                        {
                            xtype: 'tbspacer',
                            width: 20
                        },
                        {
                            xtype: 'checkboxfield',
                            name: 'DAILY',
                            label: 'DAILY',
                            fieldLabel: 'DAILY',
                            labelWidth: 35,
                             labelSeparator: '',
                            id: prototype.idEmailcatalog + '-checkbox2'
                        }, 
                        {
                            xtype: 'tbspacer',
                            width: 20
                        }, {
                            xtype: 'checkboxfield',
                            name: 'CCSETTLE',
                            label: 'CCSETTLE',
                            fieldLabel: 'CCSETTLE',
                             labelSeparator: '',
                            labelWidth: 60,
                            id: prototype.idEmailcatalog + '-checkbox3'
                        }, {
                            xtype: 'tbspacer',
                            width: 20
                        }, {
                            xtype: 'checkboxfield',
                            name: 'OPERATIONAL',
                            label: 'OPERATIONAL',
                            fieldLabel: 'OPERATIONAL',
                            labelWidth: 80,
                             labelSeparator: '',
                            id: prototype.idEmailcatalog + '-checkbox4'
                        }, 
                        {
                            xtype: 'tbspacer',
                            width: 20
                        }, {
                            xtype: 'checkboxfield',
                            name: 'AGENCIES',
                            label: 'AGENCIES',
                            fieldLabel: 'AGENCIES',
                             labelSeparator: '',
                            labelWidth: 55,
                            id: prototype.idEmailcatalog + '-checkbox5'
                        },{
                            xtype: 'tbspacer',
                            width: 20
                        }, {
                            xtype: 'checkboxfield',
                            name: ' COMPARATIVE',
                            label: ' COMPARATIVE',
                            fieldLabel: 'COMPARATIVE',
                             labelSeparator: '',
                            labelWidth: 80,
                            id: prototype.idEmailcatalog + '-checkbox6'
                        },{
                            xtype: 'tbspacer',
                            width: 20
                        }, {
                            xtype: 'checkboxfield',
                            name: 'NON COMPARATIVE',
                            label: 'NON COMPARATIVE',
                            fieldLabel: 'NON COMPARATIVE',
                             labelSeparator: '',
                            labelWidth: 115,
                            id: prototype.idEmailcatalog + '-checkbox7'
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [

                        {
                            xtype: 'textareafield',
                            id: prototype.idEmailcatalog + '-txtmailagency',
                            grow: true,
                            name: 'mailagency',
                            width: 770,
                            afterLabelTextTpl: '<b style="color: #BF6868;"> (*)</b>',
                            fieldLabel: 'E-mail agency',
                            allowBlank: false,
                            regex: /^((([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z\s?]{2,5}){1,25})*(\s*?;\s*?)*)*$/,
                            regexText: 'This field must contain single or multiple valid email addresses separated by semicolon (;)',
                            blankText: 'Please enter email address(s)',
                            anchor: '100%'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [

                        {
                            xtype: 'textareafield',
                            id: prototype.idEmailcatalog + '-txtmailAirline',
                            grow: true,
                            name: 'mailagency',
                            allowBlank: false,
                            regex: /^((([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z\s?]{2,5}){1,25})*(\s*?;\s*?)*)*$/,
                            regexText: 'This field must contain single or multiple valid email addresses separated by semicolon (;)',
                            blankText: 'Please enter email address(s)',
                            width: 770,
                            value: 'manaya@aeromexico.com;rcaballero@aeromexico.com',
                            afterLabelTextTpl: '<b style="color: #BF6868;"> (*)</b>',
                            fieldLabel: 'E-mail Airline',
                            anchor: '100%'
                        }
                    ]
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: '<b style="color: #BF6868;">(*) Required Fields</b>',
                    labelWidth: 200,
                    labelSeparator: ''
                },
                {
                    xtype: 'fieldset',
                    title: 'Control data',
                    border: true,
                    defaults: {
                        border: false,
                        margin: 3
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.idEmailcatalog + '-txtA3406REGIS',
                                    fieldLabel: 'User Created',
                                    labelWidth: 90,
                                    readOnly: true,
                                    flex: 1
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idEmailcatalog + '-txtA3406FREGI',
                                    fieldLabel: 'Date',
                                    labelWidth: 40,
                                    width: 120,
                                    readOnly: true,
                                    labelAlign: 'right'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idEmailcatalog + '-txtA3406HREGI',
                                    fieldLabel: 'Time',
                                    labelWidth: 40,
                                    width: 120,
                                    readOnly: true,
                                    labelAlign: 'right'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.idEmailcatalog + '-txtA3406REVIS',
                                    fieldLabel: 'User Modified',
                                    labelWidth: 90,
                                    readOnly: true,
                                    flex: 1
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idEmailcatalog + '-txtA3406FREVI',
                                    fieldLabel: 'Date',
                                    labelWidth: 40,
                                    width: 120,
                                    readOnly: true,
                                    labelAlign: 'right'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idEmailcatalog + '-txtA3406HREVI',
                                    fieldLabel: 'Time',
                                    labelWidth: 40,
                                    width: 120,
                                    readOnly: true,
                                    labelAlign: 'right'
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
            defaults: {
                scale: 'medium'
            },
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            style: 'background-color: #E3EAF9; padding: 5px;',
            items: [
                {
                    text: 'Save',
                    id: prototype.idEmailcatalog + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.idEmailcatalog + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.idEmailcatalog + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.idEmailcatalog + '-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCloseClick'
                    }
                }
            ]
        }
    ]

});