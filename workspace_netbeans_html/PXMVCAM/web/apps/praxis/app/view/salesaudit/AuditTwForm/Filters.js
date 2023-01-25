/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



Ext.define('Ext.Praxis.view.salesaudit.AuditTwForm.Filters', {
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
                            layout: {
                                type: 'hbox',
//                                pack: 'center',
                                align: 'center'
                            },
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
                            listeners:{
                                change: function(field, newValue){
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
                            id: prototype.id + '-cmbFunction',
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
                            width: 260,
                            anchor: '100%',
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
                        {
                            xtype: 'panel',
                            id: prototype.id + '-hbFavoritos',
                            hidden: true,
//                            bodyStyle: 'background: transparent',
                            style: 'border-bottom: 0px #ffffff solid;border-left: 0px;',
                            bodyStyle: {
                                borderWidth: '0 0 0 0px',
                                background: 'transparent'
                            },
                            layout: {
                                type: 'hbox',
//                                pack: 'center',
                                align: 'center'
                            },
                            items: [
                                    {
                                        xtype: 'label',
                                        text: 'Favorites :',
                                        align: 'left',
                                        width: 80,
                                        style: 'font-weight:bold;',
//                                        padding: '11px 3px 8px 3px'
                                    },
                                    {
                                        xtype: 'image',
                                        id: prototype.id + '-btnF5',
                                        region: 'south',
                                        width: 25,
                                        height: 25,
//                                        padding: '0 0 0 0',
//                                        margin: '8 0 0 0',
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
                                        valueField: 'CodQuery',
                                        displayField: 'label',
                                        emptyText: 'All',
                                        labelWidth: 0,
                                        width: 150,
                                        anchor: '100%',
                                        listeners: {
                                            change: 'Load'
                                        },
                                        listConfig: {
                                            minWidth:200, 
            //                                                maxHeight:400, // height of a list with scrollbar
                                        }

                                    }
                            ]
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
                    id: prototype.id + '-panelFilters2',
                    hidden: true,
//                            bodyStyle: 'background: transparent',
                    style: 'border-bottom: 0px #ffffff solid;border-left: 0px;',
                    bodyStyle: {
                        borderWidth: '0 0 0 0px',
                        background: 'transparent'
                    },
                    layout: {
                        type: 'hbox',
//                                pack: 'center',
                        align: 'center'
                    },
                    items: [

                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
        //                    id: prototype.id + '-panelFilters2',
                            border: false,
                            align: 'center',
                            style: 'border-bottom: 2px #ffffff solid;border-left: 0px;',
                            layout: 'vbox',
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
                                            listeners:{
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
                                                            listeners:{
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
                                                            listeners:{
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
                                                            listeners:{
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
                                                            listeners:{
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
                                                            listeners:{
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
                                                            listeners:{
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
                        {xtype: 'tbspacer', width: 15},
                        {
                            xtype: 'panel',
                            id: prototype.id + '-BoxUpFromExcelF31',
                            hidden: true,
                            style: 'border-bottom: 0px #ffffff solid;border-left: 0px;',
                            bodyStyle: {
                                borderWidth: '0 0 0 0px',
                                background: 'transparent'
                            },
                            items: [
                                
                                    {
                                        xtype: 'form',
                                        id: prototype.id + '-form-01',
                                        layout: 'vbox',
                                        items: [
                                            
                                                {
                                                    xtype: 'filefield',
                                                    id: prototype.id + '-btnLoadFile',
                                                    name:'CSVfile',
            //                                        fieldLabel: '<strong style="color:#000;">Update F31 from Excel</strong>',
                                                    tooltip:'format (Ticket,Seq,Cupon,Trans,Valor)',
                                                    labelWidth: 0,
                                                    allowBlank: true,
                                                    accept: '.txt,  .csv',
                                                    margin: '2 4 2 70',
                                                    width: 250,
                                                    listeners:{
                                                        change: 'btnLoadFileF31_click'
                                                    },
                                                    regex: /(.)+((\.txt)|(\.csv)(\w)?)$/i,
                                                    regexText: 'Only CSV and TXT formats are accepted',
                                                    buttonConfig: {
                                                        text : '<strong>Update F31 from Excel</strong>',
                                                        tooltip:'format (Ticket,Seq,Cupon,Trans,Valor)',
                                                        width: 200,
                        //                                cls: 'x-btn-upload x-btn-upload-txt',
                        //                                overCls: 'x-btn-upload-hover x-btn-upload-txt-hover'
                                                    }
                                                }


                                        ]
                                    }
                                
                                
                                
                                  
                            ]

                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-BoxApply',
//                            title:'Update Fields',
                            hidden: true,
        //                            bodyStyle: 'background: transparent',
                            style: 'border-bottom: 0px #ffffff solid;border-left: 0px;',
                            bodyStyle: {
                                borderWidth: '0 0 0 0px',
                                background: 'transparent'
                            },
                            layout: {
                                type: 'vbox',
        //                                pack: 'center',
                                align: 'left'
                            },
                            items: [
                                
                                    {
                                        xtype: 'panel',
                                        id: prototype.id + '-BoxComentario',
                                        hidden: true,
                                        style: 'border-bottom: 0px #ffffff solid;border-left: 0px;',
                                        bodyStyle: {
                                            borderWidth: '0 0 0 0px',
                                            background: 'transparent'
                                        },
                                        layout: {
                                            type: 'vbox',
//                                            pack: 'top'
//                                            align: 'center'
                                        },
                                        items: [
                                                {
                                                    xtype: 'label',
                                                    margin: '5 1 1 1',
//                                                    style: 'text-align:left;',
                                                    text: 'Comment : '
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtComentario',
                                                    fieldLabel: '',
                                                    labelWidth: 0,
                                                    width: 450,
                                                    enforceMaxLength: true,
                                                    maxLength: 300
                                                }
                                        ]

                                    },
                                    {
                                        xtype: 'panel',
                                        id: prototype.id + '-BoxADM',
                                        hidden: true,
                                        style: 'border-bottom: 0px #ffffff solid;border-left: 0px;',
                                        bodyStyle: {
                                            borderWidth: '0 0 0 0px',
                                            background: 'transparent'
                                        },
                                        layout: {
                                            type: 'vbox',
//                                            pack: 'top'
//                                            align: 'center'
                                        },
                                        items: [
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id + '-cmbRelacionCom',
//                                                    fieldLabel: 'Status',
                                                    labelAlign: 'right',
                                                    queryMode: 'local',
                                                    triggerAction: 'all',
                                                    editable: false,
                                                    enableKeyEvents: true,
                                                    caseSensitive: true,
                                                    valueField: 'data',
                                                    displayField: 'label',
                                                    emptyText: 'All',
                                                    labelWidth: 0,
                                                    width: 300,
                                                    anchor: '100%',
                                                    listeners: {
                                                        change: 'ChangeRelaComment'
                                                    },
//                                                    listConfig: {
//                                                        minWidth:260, 
//                                    //                                                maxHeight:400, // height of a list with scrollbar
//                                                    }

                                                },
                                                {
                                                    xtype: 'panel',
                                                    bodyStyle: {
                                                        borderWidth: '0 0 0 0px',
                                                        background: 'transparent'
                                                    },
                                                    layout: {
                                                        type: 'hbox',
                                                    },
                                                    items: [ 
                                                        {
                                                            xtype: 'grid',
                                                            id: prototype.id + '-gridComment',
                                                            width: 245,
                                                            height: 170,
                                                            resizable: true,
                                                            columnLines: true,
                                                            viewConfig: {
                                                                plugins: {
                                                                    ptype: 'gridviewdragdrop',
                                                                    dragText: 'Drag and drop to reorganize'
                                                                },
                                                                preserveScrollOnRefresh: true,
                                                                preserveScrollOnReload: true,
                                                                listeners: {
                                                                   drop: function(node, data, dropRec, dropPosition) {
                                                                      var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('label') : ' on empty view';
                                                                   }
                                                                }
                                                            },
                                                            columns: {
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center'
                                                                },
                                                                items: [
                                                                    {text: 'Comentario', width: 230, dataIndex: 'label',align:'left'}
                                                                ]
                                                            }
                                                        },  
                                                        {xtype: 'tbspacer', width: 5},
                                                        {
                                                            xtype: 'grid',
                                                            id: prototype.id + '-ListaComentariosSave',
                                                            width: 245,
                                                            height: 170,
                                                            resizable: true,
                                                            columnLines: true,
                                                            viewConfig: {
                                                                plugins: {
                                                                    ptype: 'gridviewdragdrop',
                                                                    dragText: 'Drag and drop to reorganize'
                                                                },
                                                                preserveScrollOnRefresh: true,
                                                                preserveScrollOnReload: true,
                                                                listeners: {
                                                                   drop: function(node, data, dropRec, dropPosition) {
                                                                      var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('label') : ' on empty view';
                                                                   }
                                                                }
                                                            },
                                                            columns: {
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center'
                                                                },
                                                                items: [
                                                                    {text: 'Comentario to Save', width: 190, dataIndex: 'label'},
                                                                    {
                                                                        header: 'X',
                                                                        xtype: 'widgetcolumn',
                                                                        align: 'center',
                                                                        width: 40,
                                                                        widget: {
                                                                            xtype: 'button',
                                                                            icon: 'img/botones/16x16/minus.png',
                                                                            tooltip: 'Delete',
//                                                                            listeners: {
//                                                                                // click:'removeTaxes'
//                                                                                click: function(button, e, eOpts) {
//                                                                                    var record = button.getWidgetRecord();
//                                                                                    me.BorrarCelda(record);
//                                                                                }
//                                                                            }
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]

                                                }
                                        ]

                                    },
                                    {
                                        xtype: 'panel',
                                        id: prototype.id + '-BoxXO',
                                        hidden: true,
                                        style: 'border-bottom: 0px #ffffff solid;border-left: 0px;',
                                        bodyStyle: {
                                            borderWidth: '0 0 0 0px',
                                            background: 'transparent'
                                        },
                                        items: [
                                                {
                                                    xtype: 'button',
                                                    text: 'View',
                                                    width: 120,
                                                    listeners: {
                                                        click: function(obj, e) {
                                                            me.Apply('VIEW');
                                                        }
            //                                            click: 'Apply'
                                                    }
                                                }
                                        ]

                                    },
                                    {
                                        xtype: 'panel',
                                        id: prototype.id + '-BoxUK',
                                        hidden: true,
                                        style: 'border-bottom: 0px #ffffff solid;border-left: 0px;',
                                        bodyStyle: {
                                            borderWidth: '0 0 0 0px',
                                            background: 'transparent'
                                        },
                                        layout: {
                                            type: 'hbox',
//                                            pack: 'top'
//                                            align: 'center'
                                        },
                                        defaults:{
                                                padding: '5px 5px 0px 5px',
                                                margin: '5 5 1 1',
                                                pack: 'center',
                                                align: 'center'
                                        },
                                        items: [
//                                                    style: 'text-align:left;',
                                                {xtype: 'label',text: 'Code Tax : '},
                                                {xtype: 'textfield',id: prototype.id + '-txtCDTAX',value:'UK',fieldLabel: '',labelWidth: 0,width: 50,readOnly: true,},
                                                {xtype: 'label',text: 'MDA : '},
                                                {xtype: 'textfield',id: prototype.id + '-txtMONED',value:'MXN',fieldLabel: '',labelWidth: 0,width: 50,readOnly: true,},
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id + '-cmbUK',
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
                                                    width: 100,
                                                    anchor: '100%'
                                                }
                                        ]

                                    },
                                    {xtype: 'tbspacer', height: 20, width: 15},
                                    {
                                        xtype: 'button',
                                        text: 'Update',
                                        width: 120,
                                        listeners: {
                                            click: function(obj, e) {
                                                me.Apply('');
                                            }
//                                            click: 'Apply'
                                        }
                                    },
                                    {
                                        xtype: 'panel',
                                        id: prototype.id + '-BoxUpFromExcel',
                                        hidden: true,
                                        style: 'border-bottom: 0px #ffffff solid;border-left: 0px;',
                                        bodyStyle: {
                                            borderWidth: '0 0 0 0px',
                                            background: 'transparent'
                                        },
                                        items: [

                                                {
                                                    xtype: 'form',
                                                    id: prototype.id + '-form-02',
                                                    layout: 'vbox',
                                                    items: [

                                                            {
                                                                xtype: 'filefield',
                                                                name:'CSVfile',
                        //                                        fieldLabel: '<strong style="color:#000;">Update F31 from Excel</strong>',
                                                                tooltip:'format (EXCH,00,,139,2117,804996,COMMENT)',
                                                                labelWidth: 0,
                                                                allowBlank: true,
                                                                accept: '.txt,  .csv',
                                                                margin: '2 4 2 70',
                                                                width: 250,
                                                                listeners:{
                                                                    change: 'btnLoad_click'
                                                                },
                                                                regex: /(.)+((\.txt)|(\.csv)(\w)?)$/i,
                                                                regexText: 'Only CSV and TXT formats are accepted',
                                                                buttonConfig: {
                                                                    text : '<strong>Update F31 from Excel</strong>',
                                                                    tooltip:'format (Ticket,Seq,Cupon,Trans,Valor)',
                                                                    width: 200,
                                    //                                cls: 'x-btn-upload x-btn-upload-txt',
                                    //                                overCls: 'x-btn-upload-hover x-btn-upload-txt-hover'
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
                // </editor-fold>
                // <editor-fold defaultstate="collapsed" desc="Filters Summaries">

                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    id: prototype.id + '-panelFilters3',
                    border: false,
                    layout: 'column',
                    defaults: {
                        //labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '8px 5px 8px 5px',
                        anchor: '100%'
                    },
                    items: [
//                        {
//                            xtype: 'checkboxfield',
//                            id: prototype.id + '-chkSelGB',
//                            width: 100,
//                            boxLabel: '<b">Summaries<b>',
//                            checked: false
//                        },
//                        {
//                            xtype: 'button',
//                            id: prototype.id + '-btnProcess',
//                            text: '<b>Process</b>',
//                            tooltip: 'Process',
//                            width: 80,
//                            height: 25,
//                            margin: '8px 5px 5px 5px',
//                            padding: '4 5 5 2',
//                            listeners: {
//                                // click: 'onQtyCouponsClick'
//                            }
//
//                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbTabla2',
                            fieldLabel: 'DBA',
                            fieldStyle: 'text-align: left;',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            disabled: true,
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

