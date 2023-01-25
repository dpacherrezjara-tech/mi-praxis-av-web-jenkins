/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.CouponsEstimatedValueForm.Filters', {
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
                width: 1560
            },
            items: [
                /**
                 *  PANEL DATE
                 * 
                 * */
                
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    id: prototype.id + '-panelDateFilters',
                    border: false,
                    //style: 'border-bottom: 3px #ffffff solid;border-left: 0px;',
                    layout: 'column',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '9px 2px 9px 2px',
                        anchor: '100%'
                    },
                    items: [                       
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbFecha',
                            fieldLabel: '',                           
                            queryMode: 'local',
                            editable: true,
                            triggerAction: 'all',
                            autoSelect: false,
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
                            id: prototype.id + '-cmbDateFromYear',
                            fieldLabel: 'From',
                            labelAlign: 'right',
                            queryMode: 'local',
                            editable: true,
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 50,
                            width: 120,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromMonth',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: true,
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
                        {xtype: 'tbspacer', width: 15},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateToYear',
                            fieldLabel: 'To',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: true,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 20,
                            width: 90,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateToMonth',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: true,
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
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbCARR',
                            fieldLabel: 'Carrier',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: true,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 60,
                            width: 130,
                            anchor: '100%'
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbZONAC',
                            fieldLabel: 'Zone',
//                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: true,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 35,
                            width: 150,
                            anchor: '100%'
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbSTOCKAC',
                            fieldLabel: 'Stock',
//                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: true,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 40,
                            width: 120,
                            anchor: '100%'
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbTypeAC',
                            fieldLabel: 'Type',
//                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: true,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 35,
                            width: 120,
                            anchor: '100%'
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbFvalAC',
                            fieldLabel: 'Sales Flag',
//                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: true,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 70,
                            width: 160,
                            anchor: '100%'
                        }
                    ]
                },
                
                /*
                 *  VERSION ANTERIOR
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    id: prototype.id + '-panelDateFilters',
                    border: false,
                    style: 'border-bottom: 3px #ffffff solid;border-left: 0px;',
                    layout: 'column',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '8px 5px 8px 5px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">Flight Date </strong>',
                            align: 'left',
                            fieldStyle: 'text-align: left;',
                            padding: '11px 7px 8px 10px'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromYear',
                            fieldLabel: '',
                            labelAlign: 'right',
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
                            width: 100,
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
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 0,
                            width: 70,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromDay',
                            fieldLabel: 'From',
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
                            width: 130,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateToDay',
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
                            labelWidth: 0,
                            width: 70,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cbxSTCON',
                            fieldLabel: 'Status',
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
                            labelWidth: 80,
                            width: 160,
                            anchor: '100%'
                        }

                    ]
                }, 
                */
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    id: prototype.id + '-panelTicket',
                    border: false,
                    layout: 'column',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '9px 7px 8px 6px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtTKT',
                            required: true,
                            readOnly: false,
                            fieldLabel: 'Ticket',
                            width: 200,
                            labelWidth: 70,
                            enforceMaxLength: true,
                            maxLength: 14,
                            maskRe: /[0-9]/,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left',
                            enableKeyEvents: true,
                            listeners:{
                                keypress: 'eventKey'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtSEQ',
//                            required: true,
                            readOnly: false,
                            hidden: true,
                            fieldLabel: 'Seq',
                            width: 70,
                            labelWidth: 30,
                            enforceMaxLength: true,
                            maxLength: 2,
                            maskRe: /[0-9]/,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left',
                            enableKeyEvents: true,
//                            listeners:{
//                                keypress: 'eventKey'
//                            }
                        }
//                        {
//                            xtype: 'button',
//                            id: prototype.id + '-btnReverse',
//                            margin: '5 5 3 930',
//                            style: 'background:#02507a;color:white;',
//                            width: 80,
//                            height: 30,
//                            html: '<b style="color:white;"> Reverse</b>',
//                            listeners: {
//                                click: 'onBtnReverse'
//                            }
//                        }
                    ]
                }
            ]
        }
    ]
});

