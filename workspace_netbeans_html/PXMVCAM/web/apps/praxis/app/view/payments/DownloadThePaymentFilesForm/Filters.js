Ext.define('Ext.Praxis.view.payments.DownloadThePaymentFilesForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '3 0',
    layout: 'column',
    items: [
        {
            xtype: 'panel',
            id: prototype.id + '-contFilter',
            margin: '0 7',
            border: false,
            width: 1200,
            bodyStyle: 'background: transparent',
            layout: 'vbox',
            defaults: {
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    width: '100%',
                    layout: 'hbox',
//                    padding: '0 0 0 300',
                    bodyStyle: 'background: transparent;"',
                    defaults: {
                        margin: '4 0'
                    },
                    items: [
                        {xtype: 'tbspacer', width: 150},

                        {
                            xtype: 'combo',
                            fieldLabel: 'Search By:',
                            labelAlign: 'right',
                            id: prototype.id + '-cmbFecFiltro',
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
//                            width: 150,
                            labelWidth: 65,
                            width: 210,
                            anchor: '100%',
                            value: "CHGDATE",
                            typeAhead: true,
                            valueField: 'code',
                            displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            labelStyle: 'font-weight: bold;',
                            listeners: {
                                change: 'onCmbSearchChange'
                            }
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'datefield',
                            id: prototype.id + '-txtFilterDateFrom',
                            fieldLabel: 'From',
                            format: 'Y/m/d',
                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                            labelWidth: 40,
                            labelAlign: 'right',
                            width: 130
                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'datefield',
                            id: prototype.id + '-txtFilterDateTo',
                            fieldLabel: 'To',
                            format: 'Y/m/d',
                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                            labelWidth: 40,
                            labelAlign: 'right',
                            width: 130
                        },
                        {
                            xtype: 'textfield',
                            labelStyle: 'font-weight: bold;',
                            //fieldLabel: 'User:',
                            hidden: true,
                            id: prototype.id + '-txtUser',
                            fieldStyle: 'text-align:center',
                            labelWidth: 40,
                            width: 185,
                            enableKeyEvents: true,
                            listeners: {
                                change: 'onValidarChange',
                                keypress: 'eventKey'
                            }
                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-CmbTypeprocesa',
                            fieldLabel: 'Processor type',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'code',
                            width: 250,
                            labelWidth: 120,
                            labelAlign: 'right',
                            emptyText: '',
                            listConfig: {
                                minWidth: 300
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
