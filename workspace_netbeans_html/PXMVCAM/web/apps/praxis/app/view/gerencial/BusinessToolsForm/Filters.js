/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



Ext.define('Ext.Praxis.view.gerencial.BusinessToolsForm.Filters', {
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
                    style: 'border-bottom: 2px #ffffff solid;border-left: 0px;',
                    layout: 'column',
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
                                change: function(field, newValue) {
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
                        }
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
                    style: 'border-bottom: 2px #ffffff solid;border-left: 0px;',
                    layout: 'hbox',
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
                            style: 'border-bottom: 2px #ffffff solid;border-left: 0px;',
                            layout: 'vbox',
                            width: 1000,
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
                        }
                        ,
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxFunctions',
                            hidden: true,
                            bodyStyle: 'background: transparent',
                            border: false,
                            align: 'center',
//                            style: 'border-bottom: 2px #ffffff solid;border-left: 0px;',
                            layout: 'vbox',
                            width: 250,
                            defaults: {
                                labelStyle: 'font-weight:bold;',
//                                fieldStyle: 'text-align: center;',
                                padding: '8px 5px 8px 5px',
                                // anchor: '100%'
                            },
                            items: [
                                 {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbFunctions',
                                    fieldLabel: 'Functions ',
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
                                    width: 160,
                                    anchor: '100%',
                                    listeners: {
                                        change: function(field, newValue) {
        //                                    field.setValue(newValue.toUpperCase());
//                                            Ext.getCmp(prototype.id + '-cmbDateToDay').setValue(newValue);
                                            me.changeFunction();
                                        }
                                    }
                                },
                                {
                                    xtype: 'checkboxfield',
                                    id: prototype.id + '-chkManifiesto',
                                    width: 130,
//                                    fieldLabel: 'No valida Manifiesto',
                                    boxLabel: 'No valida Manifiesto'
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btnFunct',
                                    disabled: true,
                                    text: '<b>Process</b>',
                                    tooltip: 'Process',
                                    width: 80,
                                    height: 25,
                                    margin: '8px 5px 5px 5px',
                                    padding: '4 5 5 2',
                                    listeners: {
                                         click: 'procesar_function'
                                    }

                                }
                            ]
                        }



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
                    width: 1000,
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
                        }

                    ]
                }
                // </editor-fold>
            ]
        }
    ]
});

