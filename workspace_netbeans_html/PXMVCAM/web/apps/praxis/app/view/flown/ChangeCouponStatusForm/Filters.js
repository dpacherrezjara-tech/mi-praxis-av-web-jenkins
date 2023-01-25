/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.ChangeCouponStatusForm.Filters', {
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
                            html: '<strong style="color:#AC4546;">(*) </strong><strong style="color:#000;">  Flight Date</strong>',
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
                            width: 70,
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
                        {xtype: 'tbspacer', width: 55},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromDay',
                            labelAlign: 'right',
                            fieldLabel: 'Day From ',
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
                            width: 150,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateToDay',
                            labelAlign: 'right',
                            fieldLabel: 'Day To',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
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
                            xtype: 'textfield',
                            id: prototype.id + '-txtFlight',
                            required: true,
                            fieldLabel: '<strong style="color:#AC4546;">(*) </strong><strong style="color:#000;">Flight Number</strong>',
                            width: 190,
                            labelWidth: 140,
                            enableKeyEvents: true,
                            labelAlign: 'right',
                            enforceMaxLength: true,
                            maxLength: 4,
                            maskRe: /[0-9]/
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-filter-cmbSTVAL',
                            labelAlign: 'right',
                            fieldLabel: 'Status',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: true,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: false,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 80,
                            width: 220,
                            anchor: '100%'
                        }


                    ]
                },
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    id: prototype.id + '-panelTicket',
                    border: false,
                    layout: 'column',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '8px 7px 8px 10px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbCDEPART',
                            labelAlign: 'left',
                            fieldLabel: 'Departure City',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: true,
                            caseSensitive: false,
                            valueField: 'A1007CTATO',
                            displayField: 'A1007NOMBR',
                            emptyText: 'All',
                            labelWidth: 120,
                            width: 300,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbCARRIVA',
                            labelAlign: 'right',
                            fieldLabel: 'Arrival City',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: true,
                            caseSensitive: false,
                            valueField: 'A1007CTATO',
                            displayField: 'A1007NOMBR',
                            emptyText: 'All',
                            labelWidth: 80,
                            width: 280,
                            anchor: '100%'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtTKT',
                            required: true,
                            readOnly: false,
                            fieldLabel: 'Ticket',
                            width: 240,
                            labelWidth: 70,
                            enforceMaxLength: true,
                            maxLength: 14,
                            maskRe: /[0-9]/,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'right'
                        },
                        {
                            xtype: 'checkboxfield',
                            id: prototype.id + '-chkLog',
                            margin: '0 0 0 30',
                            width: 150,
                            boxLabel: 'Search Log',
                            inputValue: '1'
                        }
                    ]
                }
            ]
        }
    ]
});

