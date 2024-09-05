prototype.idDE = prototype.id + '-ProcessDataEntry';
Ext.define('Ext.Praxis.view.payments.ProcessLoggerForm.DataEntrys.ProcessDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.ProcessDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.ProcessLogger.ProcessDataEntryController'
    ],
    controller: 'ProcessDataEntryController',
    title: 'Process - Form',
    header: true,
    width: 900,
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
            margin: 3,
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            anchor: '100%',
            items: [
                //<editor-fold defaultstate="collapsed" desc="Filtros">
                {
                    xtype: 'form',
                    layout: 'hbox',
                    id: prototype.idDE + '-formFilters',
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
                            name: 'VP_CCUST',
                            store: Ext.create('Ext.data.SimpleStore', {
                                fields: ['code', 'name'],
                                data: [
                                    ['134', 'AV - AVIANCA'],
                                    ['202', 'TA - TACA'],
                                    ['547', '2K - AEROGAL'],
                                    ['133', 'LR - LATSA']
                                ]
                            }),
                            labelWidth: 80,
                            width: 210,
                            displayField: 'name',
                            valueField: 'code',
                            queryMode: 'local',
                            editable: false,
                            value: '134'
                        },
                        {
                            xtype: 'datefield',
                            name: 'VP_PRDA',
                            fieldLabel: 'Processing Date',
                            format: 'Ymd',
                            editable: true, // Deshabilita la edición del campo
                            labelWidth: 100,
                            width: 200,
                            value: ''
                        },
                        {
                            xtype: 'combo',
                            id: prototype.idDE + '-cmbCODPRO',
                            name: 'VP_CODPRO',
                            labelWidth: 70,
                            width: 250,
                            valueField: 'CODETB',
                            displayField: 'DESCRE1',
                            fieldLabel: 'Processor',
                            queryMode: 'local',
                            editable: false,
                            allowBlank: true,
                            caseSensitive: false,
                            autoSelect: true,
                            labelAlign: 'right',
                            typeAhead: true,
                            enableKeyEvents: true,
                            triggerAction: 'all'
                        },
                        {
                            name: 'VP_CCUSTPRO',
                            value: '00',
                            hidden: true
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Reprocess',
                            name: 'VP_REPROCESAR',
                            store: Ext.create('Ext.data.SimpleStore', {
                                fields: ['code', 'name'],
                                data: [
                                    ['', 'No'],
                                    ['S', 'Yes']
                                ]
                            }),
                            labelWidth: 80,
                            width: 160,
                            displayField: 'name',
                            valueField: 'code',
                            queryMode: 'local',
                            editable: false,
                            value: ''
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