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
                            text: 'Download:',
                            padding: '3 0',
                            width: 65
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbFILE',
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
                        {xtype: 'tbspacer', width: 20},
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
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'datefield',
                            id: '-txtDateFrom',
                            fieldLabel: 'From',
                            maxLength: 10,
                            labelWidth: 40,
                            format: 'Y/m/d',
                            width: 140,
                            hideTrigger: false
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnExcel',
                            iconCls: 'prx-icon-excel',
                            hidden:true,
                            tooltip: 'Export to Excel',
                            padding: '3 0',
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnTxt',
                            icon: 'resources/img/botones/txt.png',
                            tooltip: 'Export to Txt',
                            padding: '3 0',
                        },
                    ]
                },
            ]
        }
    ]
});



