prototype.idDE2 = prototype.id + '-ProcessConciliationDataEntry';
Ext.define('Ext.Praxis.view.payments.ProcessLoggerForm.DataEntrys.ProcessConciliationDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.ProcessConciliationDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.ProcessLogger.ProcessConciliationDataEntryController'
    ],
    controller: 'ProcessConciliationDataEntryController',
    title: 'Process Conciliation - Form',
    header: true,
    width: 800,
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
                    id: prototype.idDE2 + '-formFilters',
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
                        },
                        {
                            xtype: 'combo',
                            id: prototype.idDE2 + '-cmbCODPRO',
                            name: 'VP_CODPRO',
                            labelWidth: 70,
                            width: 240,
                            valueField: 'CODE',
                            displayField: 'NAME',
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
                            xtype: 'datefield',
                            name: 'VP_SDATE_INI',
                            fieldLabel: 'From',
                            format: 'Ymd',
                            editable: true, // Deshabilita la edición del campo
                            labelWidth: 60,
                            width: 140,
                            value: ''
                        },
                        {
                            xtype: 'datefield',
                            name: 'VP_SDATE_FIN',
                            fieldLabel: 'To',
                            format: 'Ymd',
                            editable: true, // Deshabilita la edición del campo
                            labelWidth: 60,
                            width: 140,
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
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                margin: '3 5 3 5',
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