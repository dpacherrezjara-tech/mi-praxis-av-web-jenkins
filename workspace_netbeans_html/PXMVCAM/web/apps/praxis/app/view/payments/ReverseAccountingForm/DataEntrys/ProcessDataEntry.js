prototype.idEntry = prototype.id + '-DataEntryReport';
Ext.define('Ext.Praxis.view.payments.ReverseAccountingForm.DataEntrys.ProcessDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.ProcessDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.ReverseAccounting.ProcessDataEntryController'
    ],
    controller: 'ProcessDataEntryController',
    title: 'Process - Form',
    header: true,
    width: 500,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    scrollable: true,
    items: [
        {
            xtype: 'panel',
            width: '100%',
            border: false,
            layout: {
                type: 'vbox',
                pack: 'center'
            },
            defaults: {
                margin: '3 3 3 3',
            },
            items: [
               
                {
                    xtype: 'form',
                    layout: 'hbox',
                    width: '100%',
                    id: prototype.idProcess + '-formDB',
                    bodyStyle: 'background-color:#efe5e5',
                    hidden: true,
                    border: true,
                    defaults: {
                        xtype: 'textfield',
                        fieldStyle: 'text-align: center;',
                        padding: '5 1 5 1',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        hidden: false
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Client',
                            name: 'IN_CCUST',
                            store: Ext.create('Ext.data.SimpleStore', {
                                fields: ['code', 'name'],
                                data: [
                                    ['134', 'AV - AVIANCA'],
                                    ['202', 'TA - TACA'],
                                    ['547', '2K - AEROGAL'],
                                    ['133', 'LR - LACSA']
                                ]
                            }),
                            labelWidth: 80,
                            width: 210,
                            displayField: 'name',
                            valueField: 'code',
                            queryMode: 'local',
                            editable: false,
                            value: '134'
                        }
                    ]
                },
                {
                    xtype: 'form',
                    layout: 'vbox',
                    width: '100%',
                    id: prototype.idProcess + '-formPRO',
                    bodyStyle: 'background-color:#efe5e5',
                    hidden: true,
                    border: true,
                    defaults: {
                        xtype: 'textfield',
                        fieldStyle: 'text-align: center;',
                        padding: '5 1 5 1',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        hidden: false,
                        margin: '3 3 3 3'
                    },
                    items: [
                        {
                            xtype: 'filefield',
                            id: prototype.idProcess + '-fileProvision',
                            name: 'file',
                            width: '90%',
                            labelWidth: 50,
                            fieldLabel: 'File',
                            buttonText: 'Select File...',
                            allowBlank: false
                        },
                        {
                            xtype: 'label',
                            width: '100%',
                            html: '<b style="color:#c82d2d;font-size:9px;text-align:right;display:block">Required Layout (*): HEADER,REFER,COMMENT</b>'
                        }
                    ]
                }
                //</editor-fold>
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            border: false,
            margin: '3 5 3 5',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Process',
                    iconCls: 'prx-icon-image-process',
                    listeners: {
                        click: 'onProcessClick'
                    }
                },
                {
                    text: 'Close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onClose'
                    }
                }
            ]
        }
    ]
});