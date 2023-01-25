Ext.define('Ext.Praxis.view.program.ProMasterTicketForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.'+prototype.id+'-filters',
    border: false,
    bodyStyle: 'background-color: #E3EAF9;',
    margin: '2 0 0 0',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            border: true,
            width: prototype.widthContenedor,
            bodyStyle: 'background: transparent',
            layout: 'vbox',
            defaults: {
                anchor: '100%',
                labelAlign: 'right'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id+'-boxSearchFilter',
                    border: false,
                    width: '100%',
                    layout: 'hbox',
                    bodyStyle: 'background: transparent;"',
                    padding: '4',
                    defaults: {
                        anchor: '100%',
                        border: false,
                        bodyStyle: 'background: transparent;"'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Search By: ',
                            padding: '4px 0px 1px 0px'
                        },
                        {xtype: 'tbspacer', width: 15},
                        {
                            xtype:'combo',
                            id: prototype.id+'-cbxSelectBy',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["", "Selected"], ["TKT", "Ticket"], ["PAX", "PAX Name"],
                                    ["PNR", "PNR"], ["CC", "C.Card"], ["ADM","ADM/ACM"]
                                ]
                            }),
                            queryMode: 'local',
                            allowBlank: true,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 130,
                            value: "",
                            typeAhead: true,
                            emptyText: 'Selected',
                            valueField: 'code', displayField: 'name',
                            listConfig: {maxHeight: 111},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners: {
                                collapse: 'cbxSelectBy_closeHandler',
                                keydown: 'onTextKeypress'
                            }
                        },
                        {xtype: 'tbspacer', width: 15},
                        {
                            xtype: 'panel',
                            id: prototype.id+'-boxFilterByTKT',
                            layout: 'hbox',
                            defaults: {
                                labelStyle: 'font-weight:bold;',
                                anchor: '100%',
                                xtype: 'textfield',
                                enableKeyEvents: true,
                                enforceMaxLength: true
                            },
                            items: [
                                {
                                    value: '139',
                                    id: prototype.id+'-txtFilterTicketCia',
                                    fieldStyle: 'text-align:center',
                                    maxLength: 3,
                                    width: 40,
                                    listeners:{
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    text: '99999999999',
                                    id: prototype.id+'-txtFilterTicketFormSer',
                                    fieldStyle: 'text-align:center',
                                    width: 110,
                                    maxLength: 11,
                                    listeners:{
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    text: '',
                                    id: prototype.id+'-txtFilterTicketSeq',
                                    hidden: true,
                                    fieldStyle: 'text-align:center',
                                    width: 40,
                                    maxLength: 2,
                                    listeners:{
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'label',
                                    text: ' *Missing a coupon',
                                    id: prototype.id+'-lblCupon',
                                    hidden: true,
                                    style: 'font-weight:bold;color:red;',
                                    padding: '4px 0px 1px 0px'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id+'-boxFilterByPAX',
                            layout: 'hbox',
                            defaults: {
                                labelStyle: 'font-weight:bold;',
                                anchor: '100%',
                                xtype: 'textfield',
                                enableKeyEvents: true,
                                enforceMaxLength: true
                            },
                            items: [
                                {
                                    text: '',
                                    id: prototype.id+'-txtFilterPassengerName',
                                    fieldStyle: 'text-align:left',
                                    width: 200,
                                    maxLength: 45,
                                    listeners:{
                                        change: 'onUpperValue',
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    id: prototype.id+'-lblPaxResults',
                                    text: 'Pax Results:',
                                    padding: '4px 0px 1px 0px'
                                },
                                {xtype: 'tbspacer', width: 6},
                                {
                                    xtype:'combo',
                                    id: prototype.id+'-cbxFilterPassengerName',
                                    queryMode: 'local',
                                    readOnly: false,
                                    allowBlank: true,
                                    forceSelection: true,
//                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 200,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners:{
//                                        afterrender: function (combo, eOpts) {
//                                            combo.setValue("");
//                                        },
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        },
                                        keydown: 'cbxFilterPassengerName_keyDownHandler',
                                        change: 'cbxFilterPassengerName_changeHandler',
                                    }
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'label',
                                    id: prototype.id+'-lblTicketsFound',
                                    text: 'Tickets found:',
                                    padding: '4px 0px 1px 0px'
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    value: '139',
                                    id: prototype.id+'-txtFilterTicketCia0',
                                    fieldStyle: 'text-align:center',
                                    width: 40,
                                    readOnly: true,
                                    maxLength: 3,
                                    listeners:{
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype:'combo',
                                    id: prototype.id+'-cbxFilterTicket',//dataProvider="{cbxFilterTicketAC}
                                    queryMode: 'local',
                                    readOnly: false,
                                    allowBlank: true,
                                    forceSelection: true,
//                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 110,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners:{
//                                        afterrender: function (combo, eOpts) {
//                                            combo.setValue("");
//                                        },
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        },
                                        keydown: 'cbxFilterTicket_keyDownHandler',
                                        change: 'cbxFilterTicket_changeHandler',
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});