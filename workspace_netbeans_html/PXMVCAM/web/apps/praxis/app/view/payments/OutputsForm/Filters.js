Ext.define('Ext.Praxis.view.payments.OutputsForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '3 0',
    layout: 'column',
    items: [
        {
            xtype: 'panel',
            id: prototype.id + '-boxSearchFilter',
            margin: '0 7',
            border: false,
            width: 1600,
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
                    bodyStyle: 'background: transparent;"',
                    defaults: {
                        margin: '10 0 10 0'
                    },
                    items: [
                        {xtype: 'tbspacer', width: 50},
                        {
                            xtype: 'label',
                            text: 'Search By:',
                            padding: '3 0',
                            width: 65
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbFecFiltro',
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 120,
//                            value: "ADATE",
                            typeAhead: true,
                            valueField: 'code',
                            displayField: 'name',
                            listConfig: {minWidth: 130},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners: {
                            }
                        },
                        {xtype: 'tbspacer', width: 15},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromYear',
                            fieldLabel: 'Date',
                            labelAlign: 'right',
                            queryMode: 'local',
                            editable: false,
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            hidden: false,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 60,
                            width: 150,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromMonth',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            hidden: false,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            width: 70,
                            anchor: '100%'
                        },
                        {xtype: 'tbspacer', width: 15},
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnTxtLIQUI',
                            icon: 'resources/img/botones/txt.png',
                            tooltip: 'Export to Txt Liquidacion',
                            padding: '3 0',
                        },
                        {xtype: 'tbspacer', width: 15},
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnTxtSALE',
                            icon: 'resources/img/botones/txt.png',
                            tooltip: 'Export to Txt Sale',
                            padding: '3 0',
                        },
                    ]
                },
            ]
        }
    ]
});



