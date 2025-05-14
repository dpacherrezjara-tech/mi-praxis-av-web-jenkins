/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var controllerR = {
    select: function (value, row) {
        var grid = Ext.getCmp(prototype.id + '-gridDataColumns_JS');
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


Ext.define('Ext.Praxis.view.gerencial.BiToolsForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'column',

    items: [
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            padding: '0px 5px 1px 0px',
            layout: 'vbox',
            defaults: {
                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                padding: '0px 1px 0px 0px',
                anchor: '100%',
//                width: 1700
            },
            items: [
                /**
                 *  PANEL DATE
                 * 
                 * */
                // <editor-fold defaultstate="collapsed" desc="Filters Date">

                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    id: prototype.id + '-panelFilters',
                    border: false,
//                    style: 'border-bottom: 2px #ffffff solid;border-left: 0px;',
//                    layout: 'column',
                    layout: 'hbox',
                    margin: '0 0 0 200',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '8px 5px 8px 5px'
                                // anchor: '100%'
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
                            width: 150,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateYear',
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
                            width: 70,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateMonth',
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
                            width: 80,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromDay',
                            fieldLabel: 'Day From',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 70,
                            width: 140,
                            anchor: '100%',
                            listeners: {
                                change: function (field, newValue) {
//                                    field.setValue(newValue.toUpperCase());
                                    Ext.getCmp(prototype.id + '-cmbDateToDay').setValue(newValue);
                                }
                            }
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateToDay',
                            fieldLabel: 'Day To',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 60,
                            width: 140,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbTabla',
                            fieldLabel: 'DBA',
                            fieldStyle: 'text-align: left;',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'TABNAME',
                            displayField: 'DESCRIPT',
                            emptyText: 'All',
                            labelWidth: 50,
                            width: 250,
                            anchor: '100%',
                            listeners: {
                                change: 'onChangeCmbTabla',
                                args: ['Primario']
                            },
                            tpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">',
                                    '<tpl if="TABNAME !== \'#\'">' +
                                    '<div class="x-boundlist-item">{DESCRIPT}</div>' +
                                    '<tpl else>' +
                                    '<div style="text-decoration:underline;color:#FFA500;font-weight: bold;" class="x-boundlist-item">{DESCRIPT}  </div>' +
                                    '</tpl></tpl>'
                                    )

                        },
                        {
                            xtype: 'label',
                            text: 'Favorites :',
                            align: 'left',
                            width: 80,
                            style: 'font-weight:bold;',
                            padding: '11px 3px 8px 3px'
                        },
                        {
                            xtype: 'image',
                            id: prototype.id + '-btnF5',
                            region: 'south',
                            width: 25,
                            height: 25,
                            padding: '0 0 0 0',
                            margin: '8 0 0 0',
                            src: 'resources/img/botones/qualityC.png'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbFav',
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
                            width: 150,
                            anchor: '100%'

                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-imgBuild',
                            style: 'background:#E3EAF9',
                            border: false,
                            width: 15,
                            height: 15,
                            padding: '0 0 0 0',
                            margin: '8 5 0 0',
                            icon: 'resources/img/botones/build.png',
                            tooltip: 'Show Build'
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-imgInfo',
                            style: 'background:#E3EAF9',
                            border: false,
                            width: 16,
                            height: 16,
                            padding: '0 0 0 0',
                            margin: '8 5 0 0',
                            icon: 'resources/img/botones/information.png',
                            tooltip: 'Show Help'
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-imgSave',
                            style: 'background:#E3EAF9',
                            border: false,
                            width: 16,
                            height: 16,
                            padding: '0 0 0 0',
                            margin: '8 5 0 0',
                            icon: 'resources/img/botones/Save.png',
                            tooltip: 'Save Query'
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-imgView',
                            style: 'background:#E3EAF9',
                            border: false,
                            hidden: true,
                            width: 16,
                            height: 16,
                            padding: '0 0 0 0',
                            margin: '8 5 0 0',
                            icon: 'resources/img/botones/16x16/eye_icon_16x16.png',
                            tooltip: 'Show funcionality'
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnAdd',
                            style: 'background:#E3EAF9',
                            border: false,
                            hidden: true,
                            width: 16,
                            height: 16,
                            padding: '0 0 0 0',
                            margin: '8 5 0 0',
                            iconCls: 'prx-icon-add',
                            tooltip: 'New'
                        },
                    ]
                },
                // </editor-fold>                
                // <editor-fold defaultstate="collapsed" desc="Filters Query">


                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    id: prototype.id + '-panelFilters2',
                    border: false,
                    hidden: true,
                    align: 'center',
//                    style: 'border-bottom: 2px #ffffff solid;border-left: 0px;',
                    layout: 'hbox',
                    margin: '0 0 0 100',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '1px 5px 1px 5px'
                                // anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            border: false,
//                             hidden: true,
                            align: 'center',
//                            style: 'border-bottom: 2px #ffffff solid;border-left: 0px;',
                            layout: 'vbox',
                            width: 760,
                            defaults: {
                                labelStyle: 'font-weight:bold;',
                                fieldStyle: 'text-align: center;',
                                padding: '1px 5px 1px 5px'
                                        // anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    align: 'center',
                                    margin: '0 0 0 50',
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
                                    margin: '0 0 0 50',
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
                                            width: 190,
                                            layout: 'hbox',
                                            hidden: true,
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: ' AND ',
                                                    width: 60,
                                                    style: 'font-weight:bold;',
                                                    padding: '5px 0px 0px 10px'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtValue1B',
                                                    fieldLabel: '',
                                                    width: 130,
                                                    labelWidth: 0,
                                                    padding: '1px px 0px 0',
                                                    labelSeparator: ':'
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
                                    margin: '0 0 0 50',
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
                                                            width: 190,
                                                            layout: 'hbox',
                                                            hidden: true,
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: ' AND ',
                                                                    width: 60,
                                                                    style: 'font-weight:bold;',
                                                                    padding: '5px 0px 0px 10px'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtValue2B',
                                                                    fieldLabel: '',
                                                                    width: 130,
                                                                    labelWidth: 0,
                                                                    padding: '1px px 0px 0',
                                                                    labelSeparator: ':'
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
                                                            width: 190,
                                                            layout: 'hbox',
                                                            hidden: true,
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: ' AND ',
                                                                    width: 60,
                                                                    style: 'font-weight:bold;',
                                                                    padding: '5px 0px 0px 10px'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtValue3B',
                                                                    fieldLabel: '',
                                                                    width: 130,
                                                                    labelWidth: 0,
                                                                    padding: '1px px 0px 0',
                                                                    labelSeparator: ':'
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
                                                            width: 190,
                                                            layout: 'hbox',
                                                            hidden: true,
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: ' AND ',
                                                                    width: 60,
                                                                    style: 'font-weight:bold;',
                                                                    padding: '5px 0px 0px 10px'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtValue4B',
                                                                    fieldLabel: '',
                                                                    width: 130,
                                                                    labelWidth: 0,
                                                                    padding: '1px px 0px 0',
                                                                    labelSeparator: ':'
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
                                                            width: 190,
                                                            layout: 'hbox',
                                                            hidden: true,
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: ' AND ',
                                                                    width: 60,
                                                                    style: 'font-weight:bold;',
                                                                    padding: '5px 0px 0px 10px'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtValue5B',
                                                                    fieldLabel: '',
                                                                    width: 130,
                                                                    labelWidth: 0,
                                                                    padding: '1px px 0px 0',
                                                                    labelSeparator: ':'
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
                                                            width: 190,
                                                            layout: 'hbox',
                                                            hidden: true,
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: ' AND ',
                                                                    width: 60,
                                                                    style: 'font-weight:bold;',
                                                                    padding: '5px 0px 0px 10px'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtValue6B',
                                                                    fieldLabel: '',
                                                                    width: 130,
                                                                    labelWidth: 0,
                                                                    padding: '1px px 0px 0',
                                                                    labelSeparator: ':'
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
                                                            width: 190,
                                                            layout: 'hbox',
                                                            hidden: true,
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: ' AND ',
                                                                    width: 60,
                                                                    style: 'font-weight:bold;',
                                                                    padding: '5px 0px 0px 10px'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtValue7B',
                                                                    fieldLabel: '',
                                                                    width: 130,
                                                                    labelWidth: 0,
                                                                    padding: '1px px 0px 0',
                                                                    labelSeparator: ':'
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
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxFunctions',
                            hidden: true,
                            bodyStyle: 'background: transparent',
                            border: false,
//                            align: 'center',
//                            style: 'border-bottom: 2px #ffffff solid;border-left: 0px;',
                            layout: 'vbox',
                            width: 1000,
                            defaults: {
                                labelStyle: 'font-weight:bold;',
//                                fieldStyle: 'text-align: center;',
//                                padding: '8px 5px 8px 5px',
                                // anchor: '100%'
                            },
                            items: [
//                                {
//                                    xtype: 'checkboxfield',
//                                    id: prototype.id + '-chkManifiesto',
//                                    width: 130,
////                                    fieldLabel: 'No valida Manifiesto',
//                                    boxLabel: 'No valida Manifiesto'
//                                },
//                                {
//                                    xtype: 'button',
//                                    id: prototype.id + '-btnFunct',
//                                    disabled: true,
//                                    text: '<b>Process</b>',
//                                    tooltip: 'Process',
//                                    width: 80,
//                                    height: 25,
//                                    margin: '8px 5px 5px 5px',
//                                    padding: '4 5 5 2',
//                                    listeners: {
//                                         click: 'procesar_function'
//                                    }
//
//                                },

                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background: transparent',
                                    border: false,
                                    layout: 'hbox',
                                    pack: 'center',
                                    items: [
                                        {
                                            xtype: 'grid',
                                            padding: '10 0 0 10',
                                            id: prototype.id + '-gridDataColumns_JS',
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            height: 160,
                                            width: 604,
                                            resizable: false,
//                                    hidden: true,
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
                                        {xtype: 'tbspacer', width: 15},
                                        {
                                            xtype: 'label',
                                            text: 'Country:',
//                                            padding: '15 0 0 10',
                                            margin: '15 0 0 0',
                                            width: 50
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbCountry',
                                            queryMode: 'local',
                                            margin: '10 0 0 0',
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
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDiffDays',
                                            fieldLabel: 'Day diff',
                                            margin: '10 0 0 0',
                                            labelAlign: 'right',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            editable: false,
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            caseSensitive: true,
                                            valueField: 'value',
                                            displayField: 'description',
                                            emptyText: 'All',
                                            labelWidth: 50,
                                            width: 120,
                                            anchor: '100%',
                                            value: '0',
                                            store: {
                                                fields: ['value', 'description'],
                                                data: [
                                                    {value: '0', description: '0 days'},
                                                    {value: '1', description: '1 day'},
                                                    {value: '2', description: '2 days'},
                                                    {value: '3', description: '3 days'},
                                                    {value: '4', description: '4 days'},
                                                    {value: '5', description: '5 days'},
                                                    {value: '6', description: '6 days'},
                                                    {value: '7', description: '7 days'}
                                                ]
                                            },
                                            listeners: {
                                                change: 'onRefreshToDays'
                                            },
                                        },
                                    ]
                                },

                                {
                                    xtype: 'grid',
                                    padding: '10 0 0 10',
                                    id: prototype.id + '-gridDataColumnsLine_JS',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 160,
                                    width: 604,
                                    hidden: true,
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
//dadadadad




                    ]
                },

                // </editor-fold>
                // <editor-fold defaultstate="collapsed" desc="Filters Summaries">

                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    id: prototype.id + '-panelFilters3',
                    border: false,
                    layout: 'column',
                    width: 1400,
                    margin: '0 0 0 200',
                    defaults: {
                        //labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '8px 5px 8px 5px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'checkboxfield',
                            id: prototype.id + '-chkSelGB',
                            width: 100,
                            boxLabel: '<b">Summaries<b>',
                            checked: false
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnProcess',
                            text: '<b>Process</b>',
                            tooltip: 'Process',
                            width: 80,
                            height: 25,
                            margin: '8px 5px 5px 5px',
                            padding: '4 5 5 2',
                            listeners: {
                                // click: 'onQtyCouponsClick'
                            }

                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbTabla2',
                            fieldLabel: 'DBA',
                            fieldStyle: 'text-align: left;',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'TABNAME',
                            displayField: 'DESCRIPT',
                            emptyText: 'All',
                            labelWidth: 50,
                            width: 250,
                            anchor: '100%',

                            listeners: {
                                change: 'onChangeCmbTabla',
                                args: ['Secundario']
                            },
                            tpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">' +
                                    '<tpl if="TABNAME !== \'#\'">' +
                                    '<div class="x-boundlist-item">{DESCRIPT}</div>' +
                                    '<tpl else>' +
                                    '<div style="text-decoration:underline;color:#FFA500;font-weight: bold;" class="x-boundlist-item">{DESCRIPT}</div>' +
                                    '</tpl></tpl>'
                                    )
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbFunction',
                            hidden: false,
                            fieldLabel: 'Function',
                            fieldStyle: 'text-align: left;',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 70,
                            width: 275,
                            anchor: '100%',
                            margin: '0 0 0 410',
                            listeners: {
                                change: 'ChangeFunction',
                                args: ['Primario']
                            }
//                            tpl: Ext.create('Ext.XTemplate',
//                                    '<tpl for=".">',
//                                    '<tpl if="TABNAME !== \'#\'">' +
//                                    '<div class="x-boundlist-item">{DESCRIPT}</div>' +
//                                    '<tpl else>' +
//                                    '<div style="text-decoration:underline;color:#FFA500;font-weight: bold;" class="x-boundlist-item">{DESCRIPT}  </div>' +
//                                    '</tpl></tpl>'
//                                    )

                        },
                    ]
                }
                // </editor-fold>
            ]
        }
    ]
});

