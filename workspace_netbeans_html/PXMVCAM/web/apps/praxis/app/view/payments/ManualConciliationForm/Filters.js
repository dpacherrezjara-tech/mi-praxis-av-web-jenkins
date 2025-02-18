var controllerR = {
    select: function (value, row) {
        var grid = Ext.getCmp(prototype.id + '-gridDataColumns');
        var store = grid.getStore();
        var hasChecked = false;

        if (value) {
            store.each(function (record, index) {
                record.set('select', index === row);
            });
        } else {
            store.each(function (record) {
                if (record.get('select')) {
                    hasChecked = true;
                }
            });

            if (!hasChecked && store.getCount() > 0) {
                store.getAt(0).set('select', true);
                row = 0;
            }
        }

        var rquery = store.getAt(row) ? store.getAt(row).get('RQUERY') : null;

        grid.getView().refresh();
        store.commitChanges();

        me.onRefreshClick(rquery);
    }
};

var storeListR = Ext.create('Ext.data.SimpleStore', {
    id: prototype.id + '-storeListR',
    fields: ['name'],
    data: [
    ]
});

Ext.define('Ext.Praxis.view.payments.ManualConciliationForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    items: [
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            padding: '2px 5px 1px 20px',
            layout: 'vbox',
            defaults: {
                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                anchor: '100%',
                labelAlign: 'right'
            },
            items: [
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    border: false,
                    layout: {
                        type: 'hbox',
                        align: 'top'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            id: prototype.id + '-panelFilters',
                            border: false,
                            layout: 'column',
                            width: '100%',
                            pack: 'center',
                            defaults: {
                                labelStyle: 'font-weight:bold;',
                                fieldStyle: 'text-align: center;',
                                padding: '10px 1px 2px 1px'
                            },
                            items: [
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbTipoFecha',
                                    fieldLabel: '',
                                    fieldStyle: 'text-align: left;',
                                    queryMode: 'local',
                                    editable: false,
                                    triggerAction: 'all',
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    emptyText: 'All',
                                    labelWidth: 0,
                                    width: 100,
                                    anchor: '100%'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateYearTW',
                                    fieldLabel: '',
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    editable: false,
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    emptyText: 'All',
                                    labelWidth: 0,
                                    width: 60,
                                    anchor: '100%'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateMonthTW',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    emptyText: 'All',
                                    labelWidth: 0,
                                    width: 60,
                                    anchor: '100%'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            id: prototype.id + '-panelFilters4',
                            border: false,
                            layout: 'column',
                            width: '100%',
                            pack: 'center',
                            defaults: {
                                labelStyle: 'font-weight:bold;',
                                fieldStyle: 'text-align: center;',
                                padding: '10px 1px 2px 10px'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Country:',
                                    padding: '15 0 0 10',
                                    width: 50
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbCountry',
                                    queryMode: 'local',
                                    allowBlank: false,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 189,
                                    typeAhead: true,
                                    valueField: 'A006PAIS',
                                    displayField: 'A006NOMBRE',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            bodyStyle: 'background: transparent',
                            id: prototype.id + '-panelFilters2',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background: transparent',
                                    border: false,
                                    align: 'center',
                                    layout: 'vbox',
                                    defaults: {
                                        labelStyle: 'font-weight:bold;',
                                        fieldStyle: 'text-align: center;',
                                        padding: '1px 5px 1px 10px'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            align: 'center',
                                            margin: '0 0 0 0',
                                            bodyStyle: 'background: transparent',
                                            border: true,
                                            layout: 'hbox',
                                            defaults: {
                                                labelStyle: 'font-weight:bold;',
                                                fieldStyle: 'text-align: center;',
                                                padding: '1px 5px 1px 5px',
                                                xtype: 'label',
                                                width: 100,
                                                style: 'font-weight:bold;text-align:center'
                                            },
                                            items: [
                                                {
                                                    text: 'And / OR',
                                                    width: 150
                                                },
                                                {
                                                    text: 'Field',
                                                    width: 180
                                                },
                                                {
                                                    text: 'Condition',
                                                    width: 150
                                                },
                                                {
                                                    text: 'Value',
                                                    width: 180
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            align: 'center',
                                            margin: '0 0 0 0',
                                            bodyStyle: 'background: transparent',
                                            border: true,
                                            layout: 'hbox',
                                            defaults: {
                                                fieldStyle: 'text-align: left;',
                                                padding: '1px 5px 1px 5px',
                                                xtype: 'label',
                                                width: 100,
                                                style: 'text-align:center'
                                            },
                                            items: [
                                                {
                                                    text: 'Select ...',
                                                    width: 150
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    hidden: false,
                                                    id: prototype.id + '-txtCampo1',
                                                    fieldLabel: '',
                                                    width: 180,
                                                    labelWidth: 0,
                                                    padding: '1px px 0px 0',
                                                    labelSeparator: ':'
                                                },
                                                {
                                                    xtype: 'combo',
                                                    hidden: true,
                                                    id: prototype.id + '-cmbCampo1',
                                                    padding: '1px px 0px 0',
                                                    fieldLabel: '',
                                                    fieldStyle: 'text-align: left;',
                                                    queryMode: 'local',
                                                    editable: true,
                                                    triggerAction: 'all',
                                                    enableKeyEvents: true,
                                                    caseSensitive: true,
                                                    valueField: 'userfield',
                                                    displayField: 'label',
                                                    emptyText: 'All',
                                                    labelWidth: 0,
                                                    width: 180,
                                                    anchor: '100%',
                                                    listeners: {
                                                        change: 'changecmbCampo',
                                                        args: ['1']
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id + '-imgInfo1',
                                                    region: 'south',
                                                    width: 16,
                                                    height: 16,
                                                    padding: '0 0 0 0',
                                                    margin: '3 5 0 5',
                                                    icon: 'resources/img/botones/information.png',
                                                    listeners: {
                                                        click: 'imgInfo_clickHandler',
                                                        args: ['1']
                                                    }
                                                },
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id + '-cmbOperador1',
                                                    margin: '0 23 0 22',
                                                    fieldLabel: '',
                                                    fieldStyle: 'text-align: left;',
                                                    labelAlign: 'right',
                                                    queryMode: 'local',
                                                    triggerAction: 'all',
                                                    editable: true,
                                                    enableKeyEvents: true,
                                                    caseSensitive: true,
                                                    valueField: 'data',
                                                    displayField: 'label',
                                                    emptyText: 'All',
                                                    labelWidth: 0,
                                                    width: 80,
                                                    anchor: '100%',
                                                    listConfig: {
                                                        tpl: [
                                                            '<table width="100%"><tpl for=".">',
                                                            '<tr data-qtip="{help}">',
                                                            '<td role="option" class="x-boundlist-item" width="70%">{label}</td>',
                                                            '</tr>',
                                                            '</tpl></table>'
                                                        ]
                                                    },
                                                    listeners: {
                                                        change: 'changeOperador',
                                                        args: ['1']
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtValue1',
                                                    fieldLabel: '',
                                                    width: 180,
                                                    labelWidth: 0,
                                                    padding: '1px px 0px 0',
                                                    labelSeparator: ':',
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        keypress: 'Search_keyDownHandler'
                                                    }
                                                },
                                                {
                                                    xtype: 'combo',
                                                    hidden: true,
                                                    id: prototype.id + '-cmbCampo1B',
                                                    padding: '1px px 0px 0',
                                                    fieldLabel: '',
                                                    fieldStyle: 'text-align: left;',
                                                    queryMode: 'local',
                                                    editable: true,
                                                    triggerAction: 'all',
                                                    enableKeyEvents: true,
                                                    caseSensitive: true,
                                                    valueField: 'userfield',
                                                    displayField: 'label',
                                                    emptyText: 'All',
                                                    labelWidth: 0,
                                                    width: 180,
                                                    anchor: '100%',
                                                    listeners: {
                                                        change: 'changecmbCampo',
                                                        args: ['1B']
                                                    }
                                                },
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-hb_Between1',
                                                    margin: '0 0 0 0',
                                                    bodyStyle: 'background: transparent',
                                                    border: true,
                                                    width: 240,
                                                    hidden: true,
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: ' AND ',
                                                            width: 60,
                                                            style: 'font-weight:bold;',
                                                            padding: '5px 0px 0px 15px'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-txtValue1B',
                                                            fieldLabel: '',
                                                            width: 180,
                                                            labelWidth: 0,
                                                            padding: '1px px 0px 0',
                                                            labelSeparator: ':',
                                                            enableKeyEvents: true,
                                                            listeners: {
                                                                keypress: 'Search_keyDownHandler'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id + '-imgClear1',
                                                    region: 'south',
                                                    width: 20,
                                                    height: 20,
                                                    padding: '0 0 0 0',
                                                    margin: '3 0 0 10',
                                                    iconCls: 'prx-icon-clear',
                                                    listeners: {
                                                        click: 'imgClearRow',
                                                        args: ['1']
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            margin: '0 0 0 0',
                                            border: true,
                                            bodyStyle: 'background-color: #E3EAF9;',
                                            layout: {
                                                type: 'accordion',
                                                titleCollapse: false,
                                                animate: true
                                                        // activeOnTop: true
                                            },
                                            items: [
                                                {
                                                    title: '<b>Conditions</b>',
                                                    bodyStyle: 'background-color: #E3EAF9;',
                                                    layout: 'vbox',
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            margin: '1 0 1 0',
                                                            layout: 'hbox',
                                                            border: true,
                                                            bodyStyle: 'background-color: #E3EAF9;',
                                                            defaults: {
                                                                fieldStyle: 'text-align: left;',
                                                                padding: '1px 5px 1px 5px'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbConector2',
                                                                    margin: '0 35 0 35',
                                                                    fieldLabel: '',
                                                                    fieldStyle: 'text-align: left;',
                                                                    labelAlign: 'right',
                                                                    queryMode: 'local',
                                                                    triggerAction: 'all',
                                                                    editable: false,
                                                                    enableKeyEvents: true,
                                                                    caseSensitive: true,
                                                                    valueField: 'code',
                                                                    displayField: 'name',
                                                                    emptyText: 'All',
                                                                    labelWidth: 0,
                                                                    width: 80,
                                                                    anchor: '100%'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtCampo2',
                                                                    fieldLabel: '',
                                                                    width: 180,
                                                                    labelWidth: 0,
                                                                    padding: '1px px 0px 0',
                                                                    labelSeparator: ':'
                                                                },
                                                                {
                                                                    xtype: 'combo',
                                                                    hidden: true,
                                                                    id: prototype.id + '-cmbCampo2',
                                                                    padding: '1px px 0px 0',
                                                                    fieldLabel: '',
                                                                    fieldStyle: 'text-align: left;',
                                                                    queryMode: 'local',
                                                                    editable: true,
                                                                    triggerAction: 'all',
                                                                    enableKeyEvents: true,
                                                                    caseSensitive: true,
                                                                    valueField: 'userfield',
                                                                    displayField: 'label',
                                                                    emptyText: 'All',
                                                                    labelWidth: 0,
                                                                    width: 180,
                                                                    anchor: '100%',
                                                                    listeners: {
                                                                        change: 'changecmbCampo',
                                                                        args: ['2']
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.id + '-imgInfo2',
                                                                    region: 'south',
                                                                    width: 16,
                                                                    height: 16,
                                                                    padding: '0 0 0 0',
                                                                    margin: '3 5 0 5',
                                                                    icon: 'resources/img/botones/information.png',
                                                                    listeners: {
                                                                        click: 'imgInfo_clickHandler',
                                                                        args: ['2']
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbOperador2',
                                                                    margin: '0 23 0 22',
                                                                    fieldLabel: '',
                                                                    fieldStyle: 'text-align: left;',
                                                                    labelAlign: 'right',
                                                                    queryMode: 'local',
                                                                    triggerAction: 'all',
                                                                    editable: true,
                                                                    enableKeyEvents: true,
                                                                    caseSensitive: true,
                                                                    valueField: 'data',
                                                                    displayField: 'label',
                                                                    emptyText: 'All',
                                                                    labelWidth: 0,
                                                                    width: 80,
                                                                    anchor: '100%',
                                                                    listConfig: {
                                                                        tpl: [
                                                                            '<table width="100%"><tpl for=".">',
                                                                            '<tr data-qtip="{help}">',
                                                                            '<td role="option" class="x-boundlist-item" width="70%">{label}</td>',
                                                                            '</tr>',
                                                                            '</tpl></table>'
                                                                        ]
                                                                    },
                                                                    listeners: {
                                                                        change: 'changeOperador',
                                                                        args: ['2']
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtValue2',
                                                                    fieldLabel: '',
                                                                    width: 180,
                                                                    labelWidth: 0,
                                                                    padding: '1px px 0px 0',
                                                                    labelSeparator: ':',
                                                                    enableKeyEvents: true,
                                                                    listeners: {
                                                                        keypress: 'Search_keyDownHandler'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'combo',
                                                                    hidden: true,
                                                                    id: prototype.id + '-cmbCampo2B',
                                                                    padding: '1px px 0px 0',
                                                                    fieldLabel: '',
                                                                    fieldStyle: 'text-align: left;',
                                                                    queryMode: 'local',
                                                                    editable: true,
                                                                    triggerAction: 'all',
                                                                    enableKeyEvents: true,
                                                                    caseSensitive: true,
                                                                    valueField: 'userfield',
                                                                    displayField: 'label',
                                                                    emptyText: 'All',
                                                                    labelWidth: 0,
                                                                    width: 180,
                                                                    anchor: '100%',
                                                                    listeners: {
                                                                        change: 'changecmbCampo',
                                                                        args: ['2B']
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    id: prototype.id + '-hb_Between2',
                                                                    margin: '0 0 0 0',
                                                                    bodyStyle: 'background: transparent',
                                                                    border: true,
                                                                    width: 240,
                                                                    hidden: true,
                                                                    items: [
                                                                        {
                                                                            xtype: 'label',
                                                                            text: ' AND ',
                                                                            width: 60,
                                                                            style: 'font-weight:bold;',
                                                                            padding: '5px 0px 0px 15px'
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.id + '-txtValue2B',
                                                                            fieldLabel: '',
                                                                            width: 180,
                                                                            labelWidth: 0,
                                                                            padding: '1px px 0px 0',
                                                                            labelSeparator: ':',
                                                                            enableKeyEvents: true,
                                                                            listeners: {
                                                                                keypress: 'Search_keyDownHandler'
                                                                            }
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.id + '-imgClear2',
                                                                    region: 'south',
                                                                    width: 20,
                                                                    height: 20,
                                                                    padding: '0 0 0 0',
                                                                    margin: '3 0 0 10',
                                                                    iconCls: 'prx-icon-clear',
                                                                    listeners: {
                                                                        click: 'imgClearRow',
                                                                        args: ['2']
                                                                    }
                                                                }

                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            margin: '1 0 1 0',
                                                            layout: 'hbox',
                                                            border: true,
                                                            bodyStyle: 'background-color: #E3EAF9;',
                                                            defaults: {
                                                                fieldStyle: 'text-align: left;',
                                                                padding: '1px 5px 1px 5px'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbConector3',
                                                                    margin: '0 35 0 35',
                                                                    fieldLabel: '',
                                                                    fieldStyle: 'text-align: left;',
                                                                    labelAlign: 'right',
                                                                    queryMode: 'local',
                                                                    triggerAction: 'all',
                                                                    editable: false,
                                                                    enableKeyEvents: true,
                                                                    caseSensitive: true,
                                                                    valueField: 'code',
                                                                    displayField: 'name',
                                                                    emptyText: 'All',
                                                                    labelWidth: 0,
                                                                    width: 80,
                                                                    anchor: '100%'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtCampo3',
                                                                    fieldLabel: '',
                                                                    width: 180,
                                                                    labelWidth: 0,
                                                                    padding: '1px px 0px 0',
                                                                    labelSeparator: ':'
                                                                },
                                                                {
                                                                    xtype: 'combo',
                                                                    hidden: true,
                                                                    id: prototype.id + '-cmbCampo3',
                                                                    padding: '1px px 0px 0',
                                                                    fieldLabel: '',
                                                                    fieldStyle: 'text-align: left;',
                                                                    queryMode: 'local',
                                                                    editable: true,
                                                                    triggerAction: 'all',
                                                                    enableKeyEvents: true,
                                                                    caseSensitive: true,
                                                                    valueField: 'userfield',
                                                                    displayField: 'label',
                                                                    emptyText: 'All',
                                                                    labelWidth: 0,
                                                                    width: 180,
                                                                    anchor: '100%',
                                                                    listeners: {
                                                                        change: 'changecmbCampo',
                                                                        args: ['3']
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.id + '-imgInfo3',
                                                                    region: 'south',
                                                                    width: 16,
                                                                    height: 16,
                                                                    padding: '0 0 0 0',
                                                                    margin: '3 5 0 5',
                                                                    icon: 'resources/img/botones/information.png',
                                                                    listeners: {
                                                                        click: 'imgInfo_clickHandler',
                                                                        args: ['3']
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbOperador3',
                                                                    margin: '0 23 0 22',
                                                                    fieldLabel: '',
                                                                    fieldStyle: 'text-align: left;',
                                                                    labelAlign: 'right',
                                                                    queryMode: 'local',
                                                                    triggerAction: 'all',
                                                                    editable: true,
                                                                    enableKeyEvents: true,
                                                                    caseSensitive: true,
                                                                    valueField: 'data',
                                                                    displayField: 'label',
                                                                    emptyText: 'All',
                                                                    labelWidth: 0,
                                                                    width: 80,
                                                                    anchor: '100%',
                                                                    listConfig: {
                                                                        tpl: [
                                                                            '<table width="100%"><tpl for=".">',
                                                                            '<tr data-qtip="{help}">',
                                                                            '<td role="option" class="x-boundlist-item" width="70%">{label}</td>',
                                                                            '</tr>',
                                                                            '</tpl></table>'
                                                                        ]
                                                                    },
                                                                    listeners: {
                                                                        change: 'changeOperador',
                                                                        args: ['3']
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtValue3',
                                                                    fieldLabel: '',
                                                                    width: 180,
                                                                    labelWidth: 0,
                                                                    padding: '1px px 0px 0',
                                                                    labelSeparator: ':',
                                                                    enableKeyEvents: true,
                                                                    listeners: {
                                                                        keypress: 'Search_keyDownHandler'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'combo',
                                                                    hidden: true,
                                                                    id: prototype.id + '-cmbCampo3B',
                                                                    padding: '1px px 0px 0',
                                                                    fieldLabel: '',
                                                                    fieldStyle: 'text-align: left;',
                                                                    queryMode: 'local',
                                                                    editable: true,
                                                                    triggerAction: 'all',
                                                                    enableKeyEvents: true,
                                                                    caseSensitive: true,
                                                                    valueField: 'userfield',
                                                                    displayField: 'label',
                                                                    emptyText: 'All',
                                                                    labelWidth: 0,
                                                                    width: 180,
                                                                    anchor: '100%',
                                                                    listeners: {
                                                                        change: 'changecmbCampo',
                                                                        args: ['3B']
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    id: prototype.id + '-hb_Between3',
                                                                    margin: '0 0 0 0',
                                                                    bodyStyle: 'background: transparent',
                                                                    border: true,
                                                                    width: 240,
                                                                    hidden: true,
                                                                    items: [
                                                                        {
                                                                            xtype: 'label',
                                                                            text: ' AND ',
                                                                            width: 60,
                                                                            style: 'font-weight:bold;',
                                                                            padding: '5px 0px 0px 15px'
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.id + '-txtValue3B',
                                                                            fieldLabel: '',
                                                                            width: 180,
                                                                            labelWidth: 0,
                                                                            padding: '1px px 0px 0',
                                                                            labelSeparator: ':',
                                                                            enableKeyEvents: true,
                                                                            listeners: {
                                                                                keypress: 'Search_keyDownHandler'
                                                                            }
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.id + '-imgClear3',
                                                                    region: 'south',
                                                                    width: 20,
                                                                    height: 20,
                                                                    padding: '0 0 0 0',
                                                                    margin: '3 0 0 10',
                                                                    iconCls: 'prx-icon-clear',
                                                                    listeners: {
                                                                        click: 'imgClearRow',
                                                                        args: ['3']
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            margin: '1 0 1 0',
                                                            layout: 'hbox',
                                                            border: true,
                                                            bodyStyle: 'background-color: #E3EAF9;',
                                                            defaults: {
                                                                fieldStyle: 'text-align: left;',
                                                                padding: '1px 5px 1px 5px'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbConector4',
                                                                    margin: '0 35 0 35',
                                                                    fieldLabel: '',
                                                                    fieldStyle: 'text-align: left;',
                                                                    labelAlign: 'right',
                                                                    queryMode: 'local',
                                                                    triggerAction: 'all',
                                                                    editable: false,
                                                                    enableKeyEvents: true,
                                                                    caseSensitive: true,
                                                                    valueField: 'code',
                                                                    displayField: 'name',
                                                                    emptyText: 'All',
                                                                    labelWidth: 0,
                                                                    width: 80,
                                                                    anchor: '100%'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtCampo4',
                                                                    fieldLabel: '',
                                                                    width: 180,
                                                                    labelWidth: 0,
                                                                    padding: '1px px 0px 0',
                                                                    labelSeparator: ':'
                                                                },
                                                                {
                                                                    xtype: 'combo',
                                                                    hidden: true,
                                                                    id: prototype.id + '-cmbCampo4',
                                                                    padding: '1px px 0px 0',
                                                                    fieldLabel: '',
                                                                    fieldStyle: 'text-align: left;',
                                                                    queryMode: 'local',
                                                                    editable: true,
                                                                    triggerAction: 'all',
                                                                    enableKeyEvents: true,
                                                                    caseSensitive: true,
                                                                    valueField: 'userfield',
                                                                    displayField: 'label',
                                                                    emptyText: 'All',
                                                                    labelWidth: 0,
                                                                    width: 180,
                                                                    anchor: '100%',
                                                                    listeners: {
                                                                        change: 'changecmbCampo',
                                                                        args: ['4']
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.id + '-imgInfo4',
                                                                    region: 'south',
                                                                    width: 16,
                                                                    height: 16,
                                                                    padding: '0 0 0 0',
                                                                    margin: '3 5 0 5',
                                                                    icon: 'resources/img/botones/information.png',
                                                                    listeners: {
                                                                        click: 'imgInfo_clickHandler',
                                                                        args: ['4']
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbOperador4',
                                                                    margin: '0 23 0 22',
                                                                    fieldLabel: '',
                                                                    fieldStyle: 'text-align: left;',
                                                                    labelAlign: 'right',
                                                                    queryMode: 'local',
                                                                    triggerAction: 'all',
                                                                    editable: true,
                                                                    enableKeyEvents: true,
                                                                    caseSensitive: true,
                                                                    valueField: 'data',
                                                                    displayField: 'label',
                                                                    emptyText: 'All',
                                                                    labelWidth: 0,
                                                                    width: 80,
                                                                    anchor: '100%',
                                                                    listConfig: {
                                                                        tpl: [
                                                                            '<table width="100%"><tpl for=".">',
                                                                            '<tr data-qtip="{help}">',
                                                                            '<td role="option" class="x-boundlist-item" width="70%">{label}</td>',
                                                                            '</tr>',
                                                                            '</tpl></table>'
                                                                        ]
                                                                    },
                                                                    listeners: {
                                                                        change: 'changeOperador',
                                                                        args: ['4']
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtValue4',
                                                                    fieldLabel: '',
                                                                    width: 180,
                                                                    labelWidth: 0,
                                                                    padding: '1px px 0px 0',
                                                                    labelSeparator: ':',
                                                                    enableKeyEvents: true,
                                                                    listeners: {
                                                                        keypress: 'Search_keyDownHandler'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'combo',
                                                                    hidden: true,
                                                                    id: prototype.id + '-cmbCampo4B',
                                                                    padding: '1px px 0px 0',
                                                                    fieldLabel: '',
                                                                    fieldStyle: 'text-align: left;',
                                                                    queryMode: 'local',
                                                                    editable: true,
                                                                    triggerAction: 'all',
                                                                    enableKeyEvents: true,
                                                                    caseSensitive: true,
                                                                    valueField: 'userfield',
                                                                    displayField: 'label',
                                                                    emptyText: 'All',
                                                                    labelWidth: 0,
                                                                    width: 180,
                                                                    anchor: '100%',
                                                                    listeners: {
                                                                        change: 'changecmbCampo',
                                                                        args: ['4B']
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    id: prototype.id + '-hb_Between4',
                                                                    margin: '0 0 0 0',
                                                                    bodyStyle: 'background: transparent',
                                                                    border: true,
                                                                    width: 240,
                                                                    hidden: true,
                                                                    items: [
                                                                        {
                                                                            xtype: 'label',
                                                                            text: ' AND ',
                                                                            width: 60,
                                                                            style: 'font-weight:bold;',
                                                                            padding: '5px 0px 0px 15px'
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.id + '-txtValue4B',
                                                                            fieldLabel: '',
                                                                            width: 180,
                                                                            labelWidth: 0,
                                                                            padding: '1px px 0px 0',
                                                                            labelSeparator: ':',
                                                                            enableKeyEvents: true,
                                                                            listeners: {
                                                                                keypress: 'Search_keyDownHandler'
                                                                            }
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.id + '-imgClear4',
                                                                    region: 'south',
                                                                    width: 20,
                                                                    height: 20,
                                                                    padding: '0 0 0 0',
                                                                    margin: '3 0 0 10',
                                                                    iconCls: 'prx-icon-clear',
                                                                    listeners: {
                                                                        click: 'imgClearRow',
                                                                        args: ['4']
                                                                    }
                                                                }

                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    title: '<b>More Conditions</b>',
                                                    bodyStyle: 'background-color: #E3EAF9;',
                                                    layout: 'vbox',
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            margin: '1 0 1 0',
                                                            layout: 'hbox',
                                                            border: true,
                                                            bodyStyle: 'background-color: #E3EAF9;',
                                                            defaults: {
                                                                fieldStyle: 'text-align: left;',
                                                                padding: '1px 5px 1px 5px'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbConector5',
                                                                    margin: '0 35 0 35',
                                                                    fieldLabel: '',
                                                                    fieldStyle: 'text-align: left;',
                                                                    labelAlign: 'right',
                                                                    queryMode: 'local',
                                                                    triggerAction: 'all',
                                                                    editable: false,
                                                                    enableKeyEvents: true,
                                                                    caseSensitive: true,
                                                                    valueField: 'code',
                                                                    displayField: 'name',
                                                                    emptyText: 'All',
                                                                    labelWidth: 0,
                                                                    width: 80,
                                                                    anchor: '100%'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtCampo5',
                                                                    fieldLabel: '',
                                                                    width: 180,
                                                                    labelWidth: 0,
                                                                    padding: '1px px 0px 0',
                                                                    labelSeparator: ':'
                                                                },
                                                                {
                                                                    xtype: 'combo',
                                                                    hidden: true,
                                                                    id: prototype.id + '-cmbCampo5',
                                                                    padding: '1px px 0px 0',
                                                                    fieldLabel: '',
                                                                    fieldStyle: 'text-align: left;',
                                                                    queryMode: 'local',
                                                                    editable: true,
                                                                    triggerAction: 'all',
                                                                    enableKeyEvents: true,
                                                                    caseSensitive: true,
                                                                    valueField: 'userfield',
                                                                    displayField: 'label',
                                                                    emptyText: 'All',
                                                                    labelWidth: 0,
                                                                    width: 180,
                                                                    anchor: '100%',
                                                                    listeners: {
                                                                        change: 'changecmbCampo',
                                                                        args: ['5']
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.id + '-imgInfo5',
                                                                    region: 'south',
                                                                    width: 16,
                                                                    height: 16,
                                                                    padding: '0 0 0 0',
                                                                    margin: '3 5 0 5',
                                                                    icon: 'resources/img/botones/information.png',
                                                                    listeners: {
                                                                        click: 'imgInfo_clickHandler',
                                                                        args: ['5']
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbOperador5',
                                                                    margin: '0 23 0 22',
                                                                    fieldLabel: '',
                                                                    fieldStyle: 'text-align: left;',
                                                                    labelAlign: 'right',
                                                                    queryMode: 'local',
                                                                    triggerAction: 'all',
                                                                    editable: true,
                                                                    enableKeyEvents: true,
                                                                    caseSensitive: true,
                                                                    valueField: 'data',
                                                                    displayField: 'label',
                                                                    emptyText: 'All',
                                                                    labelWidth: 0,
                                                                    width: 80,
                                                                    anchor: '100%',
                                                                    listConfig: {
                                                                        tpl: [
                                                                            '<table width="100%"><tpl for=".">',
                                                                            '<tr data-qtip="{help}">',
                                                                            '<td role="option" class="x-boundlist-item" width="70%">{label}</td>',
                                                                            '</tr>',
                                                                            '</tpl></table>'
                                                                        ]
                                                                    },
                                                                    listeners: {
                                                                        change: 'changeOperador',
                                                                        args: ['5']
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtValue5',
                                                                    fieldLabel: '',
                                                                    width: 180,
                                                                    labelWidth: 0,
                                                                    padding: '1px px 0px 0',
                                                                    labelSeparator: ':',
                                                                    enableKeyEvents: true,
                                                                    listeners: {
                                                                        keypress: 'Search_keyDownHandler'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'combo',
                                                                    hidden: true,
                                                                    id: prototype.id + '-cmbCampo5B',
                                                                    padding: '1px px 0px 0',
                                                                    fieldLabel: '',
                                                                    fieldStyle: 'text-align: left;',
                                                                    queryMode: 'local',
                                                                    editable: true,
                                                                    triggerAction: 'all',
                                                                    enableKeyEvents: true,
                                                                    caseSensitive: true,
                                                                    valueField: 'userfield',
                                                                    displayField: 'label',
                                                                    emptyText: 'All',
                                                                    labelWidth: 0,
                                                                    width: 180,
                                                                    anchor: '100%',
                                                                    listeners: {
                                                                        change: 'changecmbCampo',
                                                                        args: ['5B']
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    id: prototype.id + '-hb_Between5',
                                                                    margin: '0 0 0 0',
                                                                    bodyStyle: 'background: transparent',
                                                                    border: true,
                                                                    width: 240,
                                                                    hidden: true,
                                                                    items: [
                                                                        {
                                                                            xtype: 'label',
                                                                            text: ' AND ',
                                                                            width: 60,
                                                                            style: 'font-weight:bold;',
                                                                            padding: '5px 0px 0px 15px'
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.id + '-txtValue5B',
                                                                            fieldLabel: '',
                                                                            width: 180,
                                                                            labelWidth: 0,
                                                                            padding: '1px px 0px 0',
                                                                            labelSeparator: ':',
                                                                            enableKeyEvents: true,
                                                                            listeners: {
                                                                                keypress: 'Search_keyDownHandler'
                                                                            }
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.id + '-imgClear5',
                                                                    region: 'south',
                                                                    width: 20,
                                                                    height: 20,
                                                                    padding: '0 0 0 0',
                                                                    margin: '3 0 0 10',
                                                                    iconCls: 'prx-icon-clear',
                                                                    listeners: {
                                                                        click: 'imgClearRow',
                                                                        args: ['5']
                                                                    }
                                                                }

                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            margin: '1 0 1 0',
                                                            layout: 'hbox',
                                                            border: true,
                                                            bodyStyle: 'background-color: #E3EAF9;',
                                                            defaults: {
                                                                fieldStyle: 'text-align: left;',
                                                                padding: '1px 5px 1px 5px'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbConector6',
                                                                    margin: '0 35 0 35',
                                                                    fieldLabel: '',
                                                                    fieldStyle: 'text-align: left;',
                                                                    labelAlign: 'right',
                                                                    queryMode: 'local',
                                                                    triggerAction: 'all',
                                                                    editable: false,
                                                                    enableKeyEvents: true,
                                                                    caseSensitive: true,
                                                                    valueField: 'code',
                                                                    displayField: 'name',
                                                                    emptyText: 'All',
                                                                    labelWidth: 0,
                                                                    width: 80,
                                                                    anchor: '100%'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtCampo6',
                                                                    fieldLabel: '',
                                                                    width: 180,
                                                                    labelWidth: 0,
                                                                    padding: '1px px 0px 0',
                                                                    labelSeparator: ':'
                                                                },
                                                                {
                                                                    xtype: 'combo',
                                                                    hidden: true,
                                                                    id: prototype.id + '-cmbCampo6',
                                                                    padding: '1px px 0px 0',
                                                                    fieldLabel: '',
                                                                    fieldStyle: 'text-align: left;',
                                                                    queryMode: 'local',
                                                                    editable: true,
                                                                    triggerAction: 'all',
                                                                    enableKeyEvents: true,
                                                                    caseSensitive: true,
                                                                    valueField: 'userfield',
                                                                    displayField: 'label',
                                                                    emptyText: 'All',
                                                                    labelWidth: 0,
                                                                    width: 180,
                                                                    anchor: '100%',
                                                                    listeners: {
                                                                        change: 'changecmbCampo',
                                                                        args: ['6']
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.id + '-imgInfo6',
                                                                    region: 'south',
                                                                    width: 16,
                                                                    height: 16,
                                                                    padding: '0 0 0 0',
                                                                    margin: '3 5 0 5',
                                                                    icon: 'resources/img/botones/information.png',
                                                                    listeners: {
                                                                        click: 'imgInfo_clickHandler',
                                                                        args: ['6']
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbOperador6',
                                                                    margin: '0 23 0 22',
                                                                    fieldLabel: '',
                                                                    fieldStyle: 'text-align: left;',
                                                                    labelAlign: 'right',
                                                                    queryMode: 'local',
                                                                    triggerAction: 'all',
                                                                    editable: true,
                                                                    enableKeyEvents: true,
                                                                    caseSensitive: true,
                                                                    valueField: 'data',
                                                                    displayField: 'label',
                                                                    emptyText: 'All',
                                                                    labelWidth: 0,
                                                                    width: 80,
                                                                    anchor: '100%',
                                                                    listConfig: {
                                                                        tpl: [
                                                                            '<table width="100%"><tpl for=".">',
                                                                            '<tr data-qtip="{help}">',
                                                                            '<td role="option" class="x-boundlist-item" width="70%">{label}</td>',
                                                                            '</tr>',
                                                                            '</tpl></table>'
                                                                        ]
                                                                    },
                                                                    listeners: {
                                                                        change: 'changeOperador',
                                                                        args: ['6']
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtValue6',
                                                                    fieldLabel: '',
                                                                    width: 180,
                                                                    labelWidth: 0,
                                                                    padding: '1px px 0px 0',
                                                                    labelSeparator: ':',
                                                                    enableKeyEvents: true,
                                                                    listeners: {
                                                                        keypress: 'Search_keyDownHandler'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'combo',
                                                                    hidden: true,
                                                                    id: prototype.id + '-cmbCampo6B',
                                                                    padding: '1px px 0px 0',
                                                                    fieldLabel: '',
                                                                    fieldStyle: 'text-align: left;',
                                                                    queryMode: 'local',
                                                                    editable: true,
                                                                    triggerAction: 'all',
                                                                    enableKeyEvents: true,
                                                                    caseSensitive: true,
                                                                    valueField: 'userfield',
                                                                    displayField: 'label',
                                                                    emptyText: 'All',
                                                                    labelWidth: 0,
                                                                    width: 180,
                                                                    anchor: '100%',
                                                                    listeners: {
                                                                        change: 'changecmbCampo',
                                                                        args: ['6B']
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    id: prototype.id + '-hb_Between6',
                                                                    margin: '0 0 0 0',
                                                                    bodyStyle: 'background: transparent',
                                                                    border: true,
                                                                    width: 240,
                                                                    hidden: true,
                                                                    items: [
                                                                        {
                                                                            xtype: 'label',
                                                                            text: ' AND ',
                                                                            width: 60,
                                                                            style: 'font-weight:bold;',
                                                                            padding: '5px 0px 0px 15px'
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.id + '-txtValue6B',
                                                                            fieldLabel: '',
                                                                            width: 180,
                                                                            labelWidth: 0,
                                                                            padding: '1px px 0px 0',
                                                                            labelSeparator: ':',
                                                                            enableKeyEvents: true,
                                                                            listeners: {
                                                                                keypress: 'Search_keyDownHandler'
                                                                            }
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.id + '-imgClear6',
                                                                    region: 'south',
                                                                    width: 20,
                                                                    height: 20,
                                                                    padding: '0 0 0 0',
                                                                    margin: '3 0 0 10',
                                                                    iconCls: 'prx-icon-clear',
                                                                    listeners: {
                                                                        click: 'imgClearRow',
                                                                        args: ['6']
                                                                    }
                                                                }

                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            margin: '1 0 1 0',
                                                            layout: 'hbox',
                                                            border: true,
                                                            bodyStyle: 'background-color: #E3EAF9;',
                                                            defaults: {
                                                                fieldStyle: 'text-align: left;',
                                                                padding: '1px 5px 1px 5px'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbConector7',
                                                                    margin: '0 35 0 35',
                                                                    fieldLabel: '',
                                                                    fieldStyle: 'text-align: left;',
                                                                    labelAlign: 'right',
                                                                    queryMode: 'local',
                                                                    triggerAction: 'all',
                                                                    editable: false,
                                                                    enableKeyEvents: true,
                                                                    caseSensitive: true,
                                                                    valueField: 'code',
                                                                    displayField: 'name',
                                                                    emptyText: 'All',
                                                                    labelWidth: 0,
                                                                    width: 80,
                                                                    anchor: '100%'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtCampo7',
                                                                    fieldLabel: '',
                                                                    width: 180,
                                                                    labelWidth: 0,
                                                                    padding: '1px px 0px 0',
                                                                    labelSeparator: ':'
                                                                },
                                                                {
                                                                    xtype: 'combo',
                                                                    hidden: true,
                                                                    id: prototype.id + '-cmbCampo7',
                                                                    padding: '1px px 0px 0',
                                                                    fieldLabel: '',
                                                                    fieldStyle: 'text-align: left;',
                                                                    queryMode: 'local',
                                                                    editable: true,
                                                                    triggerAction: 'all',
                                                                    enableKeyEvents: true,
                                                                    caseSensitive: true,
                                                                    valueField: 'userfield',
                                                                    displayField: 'label',
                                                                    emptyText: 'All',
                                                                    labelWidth: 0,
                                                                    width: 180,
                                                                    anchor: '100%',
                                                                    listeners: {
                                                                        change: 'changecmbCampo',
                                                                        args: ['7']
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.id + '-imgInfo7',
                                                                    region: 'south',
                                                                    width: 16,
                                                                    height: 16,
                                                                    padding: '0 0 0 0',
                                                                    margin: '3 5 0 5',
                                                                    icon: 'resources/img/botones/information.png',
                                                                    listeners: {
                                                                        click: 'imgInfo_clickHandler',
                                                                        args: ['7']
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'combo',
                                                                    id: prototype.id + '-cmbOperador7',
                                                                    margin: '0 23 0 22',
                                                                    fieldLabel: '',
                                                                    fieldStyle: 'text-align: left;',
                                                                    labelAlign: 'right',
                                                                    queryMode: 'local',
                                                                    triggerAction: 'all',
                                                                    editable: true,
                                                                    enableKeyEvents: true,
                                                                    caseSensitive: true,
                                                                    valueField: 'data',
                                                                    displayField: 'label',
                                                                    emptyText: 'All',
                                                                    labelWidth: 0,
                                                                    width: 80,
                                                                    anchor: '100%',
                                                                    listConfig: {
                                                                        tpl: [
                                                                            '<table width="100%"><tpl for=".">',
                                                                            '<tr data-qtip="{help}">',
                                                                            '<td role="option" class="x-boundlist-item" width="70%">{label}</td>',
                                                                            '</tr>',
                                                                            '</tpl></table>'
                                                                        ]
                                                                    },
                                                                    listeners: {
                                                                        change: 'changeOperador',
                                                                        args: ['7']
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtValue7',
                                                                    fieldLabel: '',
                                                                    width: 180,
                                                                    labelWidth: 0,
                                                                    padding: '1px px 0px 0',
                                                                    labelSeparator: ':',
                                                                    enableKeyEvents: true,
                                                                    listeners: {
                                                                        keypress: 'Search_keyDownHandler'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'combo',
                                                                    hidden: true,
                                                                    id: prototype.id + '-cmbCampo7B',
                                                                    padding: '1px px 0px 0',
                                                                    fieldLabel: '',
                                                                    fieldStyle: 'text-align: left;',
                                                                    queryMode: 'local',
                                                                    editable: true,
                                                                    triggerAction: 'all',
                                                                    enableKeyEvents: true,
                                                                    caseSensitive: true,
                                                                    valueField: 'userfield',
                                                                    displayField: 'label',
                                                                    emptyText: 'All',
                                                                    labelWidth: 0,
                                                                    width: 180,
                                                                    anchor: '100%',
                                                                    listeners: {
                                                                        change: 'changecmbCampo',
                                                                        args: ['7B']
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    id: prototype.id + '-hb_Between7',
                                                                    margin: '0 0 0 0',
                                                                    bodyStyle: 'background: transparent',
                                                                    border: true,
                                                                    width: 240,
                                                                    hidden: true,
                                                                    items: [
                                                                        {
                                                                            xtype: 'label',
                                                                            text: ' AND ',
                                                                            width: 60,
                                                                            style: 'font-weight:bold;',
                                                                            padding: '5px 0px 0px 15px'
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.id + '-txtValue7B',
                                                                            fieldLabel: '',
                                                                            width: 180,
                                                                            labelWidth: 0,
                                                                            padding: '1px px 0px 0',
                                                                            labelSeparator: ':',
                                                                            enableKeyEvents: true,
                                                                            listeners: {
                                                                                keypress: 'Search_keyDownHandler'
                                                                            }
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.id + '-imgClear7',
                                                                    region: 'south',
                                                                    width: 20,
                                                                    height: 20,
                                                                    padding: '0 0 0 0',
                                                                    margin: '3 0 0 10',
                                                                    iconCls: 'prx-icon-clear',
                                                                    listeners: {
                                                                        click: 'imgClearRow',
                                                                        args: ['7']
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            id: prototype.id + '-panelFilters3',
                            border: false,
                            layout: 'column',
                            width: '100%',
                            pack: 'center',
                            defaults: {
                                labelStyle: 'font-weight:bold;',
                                fieldStyle: 'text-align: center;',
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelSelectField',
                                    align: 'center',
                                    bodyStyle: 'background: transparent',
                                    border: false,
                                    defaults: {
                                        labelStyle: 'font-weight:bold;',
                                        fieldStyle: 'text-align: center;',
                                        padding: '0px 0px 0px 0px'
                                    }, 
                                    layout: {
                                        type: 'vbox',
                                        align: 'center',
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            padding: '10 0 0 10',
                                            id: prototype.id + '-gridDataColumns',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            height: 160,
                                            width: 604,
                                            resizable: false,
                                            columnLines: true,
                                            clicksToEdit: 1,
                                            plugins: {
                                                ptype: 'cellediting',
                                                clicksToEdit: 1
                                            },

                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {text: 'Rule', width: 40, dataIndex: 'CODRULE'},
                                                    {text: 'Agroup', width: 350, dataIndex: 'GRORULE',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Rquery', width: 240, dataIndex: 'RQUERY', hidden: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Tquery', width: 240, dataIndex: 'TQUERY', hidden: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Table', width: 100, dataIndex: 'TTABLE'},
                                                    {
                                                        sortable: false,
                                                        xtype: 'actioncolumn',
                                                        width: 40,
                                                        text: 'View',
                                                        align: 'center',
                                                        items: [
                                                            {
                                                                iconCls: 'prx-icon-edit',
                                                                tooltip: 'View',
                                                                handler: 'onEditClickRules'
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Select', width: 50, dataIndex: 'select',
                                                        headerCheckbox: true,
                                                        renderer: function (value, meta, record, row, col) {
                                                            var check = record.data.select;
                                                            return '<input type="checkbox" ' + (check ? 'checked' : '') +
                                                                    ' onclick="controllerR.select(this.checked,' + row + ');" >';
                                                        }
                                                    },
                                                ]
                                            }
                                        },
                                        {
                                            xtype: 'grid',
                                            padding: '10 0 0 10',
                                            id: prototype.id + '-gridDataColumnsLine',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            height: 160,
                                            width: 604,
                                            hidden:true,
                                            resizable: false,
                                            columnLines: true,
                                            clicksToEdit: 1,
                                            plugins: {
                                                ptype: 'cellediting',
                                                clicksToEdit: 1
                                            },

                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {text: 'Rule', width: 40, dataIndex: 'CODRULE'},
                                                    {text: 'Agroup', width: 350, dataIndex: 'GRORULE',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Rquery', width: 240, dataIndex: 'RQUERY', hidden: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Tquery', width: 240, dataIndex: 'TQUERY', hidden: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Table', width: 100, dataIndex: 'TTABLE'},
                                                    {
                                                        sortable: false,
                                                        xtype: 'actioncolumn',
                                                        width: 40,
                                                        text: 'View',
                                                        align: 'center',
                                                        items: [
                                                            {
                                                                iconCls: 'prx-icon-edit',
                                                                tooltip: 'View',
                                                                handler: 'onEditClickRules'
                                                            }
                                                        ]
                                                    },
                                                ]
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background: transparent',
                                            border: false,
                                            layout: 'column',
                                            pack: 'center',
                                            defaults: {
                                                labelStyle: 'font-weight:bold;',
                                                fieldStyle: 'text-align: center;',
                                            },
                                            padding: '3 0 0 450',
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id + '-btnProcesaF2',
                                                    iconCls: 'prx-icon-pagination-next',
                                                    tooltip: 'Search',
                                                    text: 'Process',
                                                    listeners: {
                                                        click: 'getGrillData'
                                                    },
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id + '-btnProcesaAllF2',
                                                    iconCls: 'prx-icon-pagination-last',
                                                    tooltip: 'Search',
                                                    text: 'Process All',
                                                    listeners: {
                                                        click: 'getGrillDataAll'
                                                    },
                                                }
                                            ]
                                        }
                                    ]
                                },
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});

