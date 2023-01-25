/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 * Migrado por: Luis Remicio
 */
Ext.define('Ext.Praxis.view.salesaudit.EmailcatalogReportForm.DataEntryEmailcatalogReportForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryUserMaintenance',

    controller: 'DataEntryEmailcatalogReportFormController',

    requires: [
        'Ext.Praxis.controller.salesaudit.EmailcatalogReportForm.DataEntryEmailcatalogReportFormController'
    ],
    id: prototype.idEmailcaDataEn + '-win',

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
            id: prototype.idEmailcaDataEn + '-form',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.idEmailcaDataEn + '-txtIATAman',
                            width: 200,
                            labelWidth: 60,
                            enableKeyEvents: true,
                            fieldLabel: 'IATA',
                            afterLabelTextTpl: '<b style="color: #BF6868;"> (*)</b>',
                            maxLength: 8,
                            enforceMaxLength: 8,
                            maskRe: /^-?[0-9]*(\.[0-9]{1,2})?$/
                        },
                        {
                            xtype: 'combo',
                            id: prototype.idEmailcaDataEn + '-CmbStatus',
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
                            xtype: 'textareafield',
                            id: prototype.idEmailcaDataEn + '-txtmailagency',
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
                            id: prototype.idEmailcaDataEn + '-txtmailAirline',
                            grow: true,
                            name: 'mailagency',
                            allowBlank: false,
                            regex: /^((([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z\s?]{2,5}){1,25})*(\s*?;\s*?)*)*$/,
                            regexText: 'This field must contain single or multiple valid email addresses separated by semicolon (;)',
                            blankText: 'Please enter email address(s)',
                            width: 770,
                            value: 'jgil@aeromexico.com;mmoraleso@aeromexico.com;ialvarado@aeromexico.com;pvazquez@aeromexico.com',
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
                                    id: prototype.idEmailcaDataEn + '-txtA3406REGIS',
                                    fieldLabel: 'User Created',
                                    labelWidth: 90,
                                    readOnly: true,
                                    flex: 1
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idEmailcaDataEn + '-txtA3406FREGI',
                                    fieldLabel: 'Date',
                                    labelWidth: 40,
                                    width: 120,
                                    readOnly: true,
                                    labelAlign: 'right'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idEmailcaDataEn + '-txtA3406HREGI',
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
                                    id: prototype.idEmailcaDataEn + '-txtA3406REVIS',
                                    fieldLabel: 'User Modified',
                                    labelWidth: 90,
                                    readOnly: true,
                                    flex: 1
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idEmailcaDataEn + '-txtA3406FREVI',
                                    fieldLabel: 'Date',
                                    labelWidth: 40,
                                    width: 120,
                                    readOnly: true,
                                    labelAlign: 'right'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idEmailcaDataEn + '-txtA3406HREVI',
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
                    id: prototype.idEmailcaDataEn + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.idEmailcaDataEn + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.idEmailcaDataEn + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.idEmailcaDataEn + '-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCloseClick'
                    }
                }
            ]
        }
    ]

});