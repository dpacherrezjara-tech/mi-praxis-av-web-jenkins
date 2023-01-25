Ext.define('Ext.Praxis.view.flown.FlightConciliationForm.DataEntryDelete', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryDeleteFlightConciliationForm',
    requires: [
        'Ext.Praxis.controller.flown.FlightConciliation.DataEntryDeleteController'
    ],
    controller: 'DataEntryDeleteController',
    title: 'Remove Duplicate Manifests',
    header: true,
    height: 178,
    width: 425,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {xtype: 'tbspacer', height: 10},
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'label',
                            text: 'Flight Date:',
                            style: 'font-size:13px;font-weight:bold;color:#121E31;',
                            padding: '4 0'
                        },
                        {xtype: 'tbspacer', width: 15},
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtFlightDateDel',
                            fieldStyle: 'text-align:center;background:white;color:#2E486C;',
//                            value: '20220831',
                            width: 80,
                            enforceMaxLength: true,
                            maxLength: 8,
                            maskRe: /[0-9]/
                        },
                        {xtype: 'tbspacer', width: 40},
                        {
                            xtype: 'label',
                            text: 'Departure: ',
                            style: 'font-size:13px;font-weight:bold;color:#121E31;',
                            padding: '4 0'
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtCDEPARTDel',
                            fieldStyle: 'text-align:center;background:white;color:#2E486C;',
//                            value: 'MCO',
                            width: 40,
                            enforceMaxLength: true,
                            maxLength: 3,
                            maskRe: /[a-zA-Z]/,
                            enableKeyEvents: true,
                            listeners:{
                                change: function(field, newValue){
                                    field.setValue(newValue.toUpperCase());
                                 } 
                            }
                        }
                        
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'label',
                            text: 'Flight Number:',
                            style: 'font-size:13px;font-weight:bold;color:#121E31;',
                            padding: '4 0'
                        },
                        {xtype: 'tbspacer', width: 23},
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtFlightNumberDel',
                            fieldStyle: 'text-align:center;background:white;color:#2E486C;',
//                            value: '0437',
                            width: 50,
                            enforceMaxLength: true,
                            maxLength: 8,
                            maskRe: /[0-9]/
                        },
                        {xtype: 'tbspacer', width: 40},
                        {
                            xtype: 'label',
                            text: 'Arrival:',
                            style: 'font-size:13px;font-weight:bold;color:#121E31;',
                            padding: '4 0'
                        },
                        {xtype: 'tbspacer', width: 43},
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtCARRIVADel',
                            fieldStyle: 'text-align:center;background:white;color:#2E486C;',
//                            value: 'MEX',
                            width: 40,
                            enforceMaxLength: true,
                            maxLength: 3,
                            maskRe: /[a-zA-Z]/,
                            enableKeyEvents: true,
                            listeners:{
                                change: function(field, newValue){
                                    field.setValue(newValue.toUpperCase());
                                 } 
                            }
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            padding: '0',
            margin: '12 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center;',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    html: '<strong style:"font-weight:bold;color:#000;">Delete</strong>',
                    id:prototype.id+'-btn-delete',
                    iconCls: 'prx-icon-delete',
                    listeners:{
                        click: 'onDeleteDuplicate'
                    }
                },
                {
                    html: '<strong style:"font-weight:bold;color:#000;">Close</strong>',
                    id:prototype.id+'-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners:{
                        click: 'btnCancel_clickHandler'
                    }
                }
            ]
        }
    ]
});