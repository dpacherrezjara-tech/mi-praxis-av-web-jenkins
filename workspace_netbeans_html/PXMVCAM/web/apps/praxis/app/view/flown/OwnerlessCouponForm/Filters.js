/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.OwnerlessCouponForm.Filters', {
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
            padding: '2px 5px 1px 5px',
            layout: 'column',
            defaults: {
                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                padding: '5px 1px 5px 1px',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                xtype: 'textfield',
                hidden: false,
                selectOnFocus: true,
                enableKeyEvents: true,
                enforceMaxLength: true
            },
            items: [
                {
                    xtype: 'label',
                    html: '<strong style="color:#000;">Flight Date</strong>',
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 10px'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateFromYear',
                    fieldLabel: 'From',
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
                    id: prototype.id + '-cmbDateToYear',
                    fieldLabel: 'To',
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
                    width: 150,
                    anchor: '100%'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateToMonth',
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
                    xtype: 'textfield',
                    id: prototype.id + '-txtNVLO',
                    fieldLabel: '<strong style="color:#000;">Flight Number</strong>',
                    labelAlign: 'right',
                    labelWidth: 130,
                    width: 190,
                    maxLength: 4,
                    enforceMaxLength: true,
                    maskRe: /[0-9]/
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbStatus',
                    required: true,
                    fieldLabel: 'Status',
                    width: 160,
                    labelWidth: 70,
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'code',
                    displayField: 'name'

                },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-textTicket',
                    fieldLabel: '<strong style="color:#000;">Ticket</strong>',
                    labelAlign: 'right',
                    labelWidth: 100,
                    width: 240,
                    //maxLength: 13,
                    //enforceMaxLength: true,
                    maskRe: /[0-9]/
                },
                {
                    xtype: 'checkboxfield',
                    id: prototype.id + '-differentCarrier',
                    margin: '0 0 0 15',
                    width: 120,
                    boxLabel: 'Different Carrier',
                    inputValue: '1'
                },
                {
                    xtype: 'checkboxfield',
                    id: prototype.id + '-canceledFlight',
                    margin: '0 0 0 15',
                    width: 120,
                    boxLabel: 'Cancelled Flight',
                    inputValue: '1'
                },
                
                
                {
                    xtype: 'panel',
                    width: '100%',
                    layout: 'hbox',
                    hidden: true,
                    id: prototype.id+'-boxProcess',
                    border: false,
                    bodyStyle: 'background: transparent;"',
                    defaults: {
                        margin: '4 0'
                    },
                    items: [
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'label',
                            text: 'Flight Date:',
                            padding: '3 0',
                            width: 80
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'textfield',
                            id: prototype.id+'-txtA1413FVLOB',     
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,     
                            maskRe: /[0-9]/,      
                            maxLength: 8,
                            width: 80,
                            enableKeyEvents: true,
//                            listeners:{
//                                keypress: 'BuscarPNR_keyDownHandler'
//                            }
                        },
                        {xtype: 'tbspacer', width: 50},
                        {
                            xtype: 'label',
                            text: 'Flight Number:',
                            padding: '3 0',
                            width: 80
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'textfield',
                            id: prototype.id+'-txtA1413NVLOB',     
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,     
                            maskRe: /[0-9]/,      
                            maxLength: 4,
                            width: 70,
                            enableKeyEvents: true,
//                            listeners:{
//                                keypress: 'BuscarPNR_keyDownHandler'
//                            }
                        },
                        {xtype: 'tbspacer', width: 50},
                        {
                            xtype: 'label',
                            text: 'Departure:',
                            padding: '3 0',
                            width: 40
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'textfield',
                            id: prototype.id+'-txtA1413FROM',     
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,     
                            maskRe: /[a-zA-Z]/,
                            maxLength: 3,
                            width: 60,
                            enableKeyEvents: true,
                            listeners:{
                                change: function(field, newValue){
                                    field.setValue(newValue.toUpperCase());
                                 } 
                            }
                        },
                        {xtype: 'tbspacer', width: 50},
                        {
                            xtype: 'label',
                            text: 'Arrival:',
                            padding: '3 0',
                            width: 40
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'textfield',
                            id: prototype.id+'-txtA1413TO',     
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,     
                            maskRe: /[a-zA-Z]/,      
                            maxLength: 3,
                            width: 60,
                            enableKeyEvents: true,
                            listeners:{
                                change: function(field, newValue){
                                    field.setValue(newValue.toUpperCase());
                                 } 
                            }
                        },
                        {xtype: 'tbspacer', width: 60},
                        {
                            xtype: 'button',
                            id:prototype.id+'-btn-load',
                            margin: '4 0 0 0',
                            width: 60,
                            html: '<strong style="color:white;">LOAD</strong>',
                            style: 'background:#24678D;color:white;font-weight:bold;',
                            border: false,
                            listeners:{
                                click: 'onLoadA1413',
                                args: ['1']
                            }
                        }
                    ]
                }
                
            ]
        }
    ]
});

