/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
            
Ext.define('Ext.Praxis.view.payments.BankReconciliationForm.FiltersBT', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filtersBT',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    items: [
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            padding: '2px 5px 1px 350px',
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
                    id: prototype.id + '-panelFilters',
                    border: false,
                    style: 'border-bottom: 2px #ffffff solid;border-left: 0px;',
                    layout: 'column',
                    width: '100%',
                    pack : 'center',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '2px 1px 2px 1px'
                    },
                    items: [
                        {xtype: 'tbspacer', width: 50},
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
                            width: 70,
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
                            width: 80,
                            anchor: '100%'
                        },
//                        {
//                            xtype: 'combo',
//                            id: prototype.id + '-cmbDateFromDayTW',
//                            fieldLabel: 'Day From',
//                            labelAlign: 'right',
//                            queryMode: 'local',
//                            triggerAction: 'all',
//                            editable: false,
//                            autoSelect: false,
//                            enableKeyEvents: true,
//                            caseSensitive: true,
//                            valueField: 'code',
//                            displayField: 'name',
//                            emptyText: 'All',
//                            labelWidth: 70,
//                            width: 140,
//                            anchor: '100%'
//                        },
//                        {
//                            xtype: 'combo',
//                            id: prototype.id + '-cmbDateToDayTW',
//                            fieldLabel: 'Day To',
//                            labelAlign: 'right',
//                            queryMode: 'local',
//                            triggerAction: 'all',
//                            editable: false,
//                            autoSelect: false,
//                            enableKeyEvents: true,
//                            caseSensitive: true,
//                            valueField: 'code',
//                            displayField: 'name',
//                            emptyText: 'All',
//                            labelWidth: 60,
//                            width: 140,
//                            anchor: '100%'
//                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            id: prototype.id + '-panelAsignar',
                            hidden: true,
                            align: 'center',
                            layout: 'hbox',
                            items: [
                                    {xtype: 'tbspacer', width: 100},
                                    {
                                        xtype: 'label',
                                        html: '<strong style="color:#000;">User Asign: </strong>',
            //                            hidden: true,
                                        align: 'center',
                                        width: 100,
                                        margin : '4 5 0 0',
                                        fieldStyle: 'text-align: center;'                           
                                    },
                                    {
                                        xtype: 'combo',
                                        id: prototype.id + '-cmbUser',
            //                            hidden: true,
                                        padding: '1px px 10px 0',
                                        fieldLabel: '',
                                        fieldStyle: 'text-align: left;',
                                        queryMode: 'local',
                                        editable: true,
                                        triggerAction: 'all',
                                        enableKeyEvents: true,
                                        caseSensitive: true,
                                        valueField: 'UASIG',
                                        displayField: 'UASIG',
                                        emptyText: 'All',
                                        labelWidth: 0,
                                        width: 180,
                                        anchor: '100%',
                                        listeners: {
                                            change: 'changeSelector'
                                        }
                                    },
                                    {xtype: 'tbspacer', width: 10},
                                    {
                                        xtype: 'button',
                                        id: prototype.id + '-btnAsignar',
            //                            text: '<strong style="color:blue;text-align:left">Assign</strong>',
                                        text: 'Assign',
                                        width: 85,
                                        height: 23,
            //                            margin: '0 5 12 865',
            //                            cls: 'x-btn-sent',
            //                            overCls: 'x-btn-sent-over',
                                        listeners: {
                                            click: 'btnAsignar_click',
                                        }
                                    }
                            ]
                        }
                       
//                        {
//                            xtype: 'label',
//                            text: 'Favorites :',
//                            align: 'left',
//                            width: 90,
//                            height: 25,
//                            padding: '6px 10px 6px 10px',
//                            style: 'font-weight:bold;'
//                        },
//                        {
//                            xtype: 'image',
//                            id: prototype.id + '-btnF5',
//                            region: 'south',
//                            width: 25,
//                            height: 25,
//                            src: 'img/botones/qualityC.png'
//                        },
//                        {
//                            xtype: 'combo',
//                            id: prototype.id + '-cmbFav',
//                            fieldLabel: '',
//                            fieldStyle: 'text-align: left;',
//                            labelAlign: 'right',
//                            queryMode: 'local',
//                            triggerAction: 'all',
//                            editable: false,
//                            enableKeyEvents: true,
//                            caseSensitive: true,
//                            valueField: 'code',
//                            displayField: 'name',
//                            emptyText: 'All',
//                            labelWidth: 0,
//                            width: 150,
//                            anchor: '100%'
//
//                        },
//                        {
//                            xtype: 'button',
//                            id: prototype.id + '-imgBuild',
//                            style: 'background:#E3EAF9',
//                            border: false,
//                            width: 25,
//                            height: 25,
//                            icon: 'img/botones/build.png',
//                            tooltip: 'Show Build'
//                        },
//                        {
//                            xtype: 'button',
//                            id: prototype.id + '-imgInfo',
//                            style: 'background:#E3EAF9',
//                            border: false,
//                            width: 25,
//                            height: 25,
//                            icon: 'resources/img/botones/information.png',
//                            tooltip: 'Show Help'
//                        },
//                        {
//                            xtype: 'button',
//                            id: prototype.id + '-imgSave',
//                            style: 'background:#E3EAF9',
//                            border: false,
//                            width: 25,
//                            height: 25,
//                            icon: 'img/botones/Save.png',
//                            tooltip: 'Save Query'
//                        }
                    ]
                },
                
                 {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    id: prototype.id + '-panelFilters2',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
//                            id: prototype.id + '-panelFilters2',
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
        //                                    fieldStyle:'text-transform:uppercase',
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
                                                                labelSeparator: ':',
                                                                enableKeyEvents: true,
                                                                listeners:{
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
                                                                                labelSeparator: ':',
                                                                                enableKeyEvents: true,
                                                                                listeners:{
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
                                                                                labelSeparator: ':',
                                                                                enableKeyEvents: true,
                                                                                listeners:{
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
                                                                                labelSeparator: ':',
                                                                                enableKeyEvents: true,
                                                                                listeners:{
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
                                                                                labelSeparator: ':',
                                                                                enableKeyEvents: true,
                                                                                listeners:{
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
                                                                                labelSeparator: ':',
                                                                                enableKeyEvents: true,
                                                                                listeners:{
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
                                                                                labelSeparator: ':',
                                                                                enableKeyEvents: true,
                                                                                listeners:{
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
                        },
                        {xtype: 'tbspacer', width: 20},
                         {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            id: prototype.id + '-panelUserIatas',
                            hidden: true,
                            align: 'center',
                            layout: 'hbox',
                            items: [
                                
                                
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelSelectField',
                                    align: 'center',
                //                    margin: '0 0 0 0',
                                    bodyStyle: 'background: transparent',
                                    border: false,
                                    defaults: {
                                        labelStyle: 'font-weight:bold;',
                                        fieldStyle: 'text-align: center;',
                                        padding: '1px 5px 1px 5px'
                                                // anchor: '100%'
                                    },
                                    margin: '0 0 10 0',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center',
                //                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            padding: '10 0 0 0',
                                            id: prototype.id + '-gridDataColumns',
                                            height: 188,
                                            width: 195,
                                            resizable: true,
                                            columnLines: true,
                //                            viewConfig: {
                //                                preserveScrollOnRefresh: true,
                //                                preserveScrollOnReload: true
                //                            },
                //                            bufferedRenderer: true,
                //                            plugins: [
                //                                Ext.create('Ext.grid.plugin.CellEditing', {
                //                                    clicksToEdit: 1,
                //                                    selectOnEdit: true,
                //                                    gridcellediting: true
                //                                })
                //                            ],
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

                                                    {text: 'User', width: 130, dataIndex: 'UASIG',
                                                        renderer: function (value, meta, record, row, col) {
                                                            meta.style = 'text-align:left;';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Pending', width: 60, dataIndex: 'QTYDOC',
                                                        renderer: function (value, meta, record, row, col) {
                                                            meta.style = 'text-align:center;';
                                                            return value;
                                                        }
                                                    },
        //                                            {text: 'Qty', width: 58, dataIndex: 'QTYUASIG', id: prototype.id + '-id_QtyAsign',
        //                                                editor: {
        //                                                    xtype: 'textfield',
        //                                                    editable: true,
        //        //                                            maxLength: 2,
        //        //                                            enforceMaxLength: true,
        //                                                    selectOnFocus: true,
        //                                                    maskRe: /[0-9]/,
        //                                                },
        //                                                renderer: function (value, meta, record, row, col) {
        //                                                    meta.style = 'text-align:center;';
        //                                                    return value;
        //                                                }
        //                                            }
                                                ]
                                            }
                                        }

                                    ]
                                },
                                {xtype: 'tbspacer', width: 20},

                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelIATAS',
                                    align: 'center',
                //                    margin: '0 0 0 0',
                                    bodyStyle: 'background: transparent',
                                    border: false,
                                    defaults: {
                                        labelStyle: 'font-weight:bold;',
                                        fieldStyle: 'text-align: center;',
                                        padding: '1px 5px 1px 5px'
                                                // anchor: '100%'
                                    },
                                    margin: '0 0 10 0',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center',
                //                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            padding: '10 0 0 0',
                                            id: prototype.id + '-gridDataIatas',
                                            height: 190,
                                            width: 174,
                                            resizable: true,
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
                                                    {text: 'Agent', width: 70, dataIndex: 'SAGENT',
                                                        renderer: function (value, metaData, record, row, col) {
                                                            var data = record.data;
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            metaData.style = 'text-align:center;';
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescripcion + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Pending', width: 90, dataIndex: 'QTYDOC',
                                                        renderer: function (value, meta, record, row, col) {
                                                            meta.style = 'text-align:right;';
                                                            return Ext.util.Format.number(value, '0,000');;
                                                        }
                                                    }
                                                ]
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
});

