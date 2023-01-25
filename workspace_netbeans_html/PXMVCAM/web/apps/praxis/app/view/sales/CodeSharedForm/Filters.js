Ext.define('Ext.Praxis.view.sales.CodeSharedForm.Filters', {
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
            padding: '2px 5px 1px 0px',
            layout: 'column',
            defaults: {
                labelStyle: 'font-weight:bold;',
//                fieldStyle: 'text-align: center;',
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
                { xtype: 'tbspacer', width: 7 },
                {
                    xtype: 'label',
                    html: '<strong style="color:#000;">Search By</strong>',
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 10px'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cbxSearchBy',
                    store: new Ext.data.SimpleStore({
                        fields: ['code', 'name'],
                        data: [
                            ["", "Select"],
                            ["DEFAULT", "Airline, Begin Flight Range"]
                        ]
                    }),
                    hidden: true,
                    queryMode: 'local',
                    triggerAction: 'all',
                    enableKeyEvents: true,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    width: 70,
                    listConfig: {height: 111},
                    anchor: '100%'
                },
                { xtype: 'tbspacer', width: 10 },
                {
                    xtype: 'label',
                    html: 'Eff.Date:',
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 10px'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateFromYear',
                    queryMode: 'local',
                    triggerAction: 'all',
//                    editable:false,
//                    autoSelect: false,
                    enableKeyEvents: true,
//                    caseSensitive: true,
                    valueField: 'code',
                    displayField: 'name',
                    width: 70,
                    listConfig: {height: 111},
                    anchor: '100%'
                },
                { xtype: 'tbspacer', width: 7 },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateFromMonth',
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
//                    editable:false,
//                    autoSelect: false,
                    enableKeyEvents: true,
//                    caseSensitive: true,
                    valueField: 'code',
                    displayField: 'name',
                    labelWidth: 0,
                    width: 70,
                    listConfig: {height: 111},
                    anchor: '100%'
                },
                { xtype: 'tbspacer', width: 7 },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateFromDay',
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
//                    editable:false,
//                    autoSelect: false,
                    enableKeyEvents: true,
//                    caseSensitive: true,
                    valueField: 'code',
                    displayField: 'name',
                    labelWidth: 0,
                    width: 70,
                    listConfig: {height: 111},
                    anchor: '100%'
                },
                { xtype: 'tbspacer', width: 10 },
                {
                    xtype: 'label',
                    html: 'Disc.Date:',
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 10px'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateToYear',
                    queryMode: 'local',
                    triggerAction: 'all',
//                    editable:false,
//                    autoSelect: false,
                    enableKeyEvents: true,
//                    caseSensitive: true,
                    valueField: 'code',
                    displayField: 'name',
                    width: 70,
                    listConfig: {height: 111},
                    anchor: '100%',
                    listeners:{
                        change: 'onCmbToYearChange'
                    }
                },
                { xtype: 'tbspacer', width: 7 },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateToMonth',
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
//                    editable:false,
//                    autoSelect: false,
                    enableKeyEvents: true,
//                    caseSensitive: true,
                    valueField: 'code',
                    displayField: 'name',
                    labelWidth: 0,
                    width: 70,
                    listConfig: {height: 111},
                    anchor: '100%'
                },
                { xtype: 'tbspacer', width: 7 },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateToDay',
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
//                    editable:false,
//                    autoSelect: false,
                    enableKeyEvents: true,
//                    caseSensitive: true,
                    valueField: 'code',
                    displayField: 'name',
                    labelWidth: 0,
                    width: 70,
                    listConfig: {height: 111},
                    anchor: '100%'
                },
                {
                    
                    xtype: 'panel',
                    layout: 'hbox',
                    hidden: true,
                    bodyStyle: 'background: transparent',
                    border: false,
                    items:[
                        {
                            xtype: 'label',
                            text: 'Airline:'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cbxAirlineCode',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["", "All"]
                                ]
                            }),
        //                    hidden: true,
                            queryMode: 'local',
                            triggerAction: 'all',
                            enableKeyEvents: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            width: 60,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cbxAirlineName',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["", "All"]
                                ]
                            }),
                            queryMode: 'local',
                            triggerAction: 'all',
                            enableKeyEvents: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            width: 150,
                            anchor: '100%'
                        },
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Carrier:'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cbxCarrierCode',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["", "All"]
                                ]
                            }),
                            queryMode: 'local',
                            triggerAction: 'all',
                            enableKeyEvents: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            width: 60,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cbxCarrierName',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["", "All"]
                                ]
                            }),
                            queryMode: 'local',
                            triggerAction: 'all',
                            enableKeyEvents: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            width: 150,
                            anchor: '100%'
                        },
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Begin Flight:'
                        },
                        {
                            xtype: 'textfield',
                            value: 'XXXXX',
                            id:prototype.id+'-txtBeginFlight',
                            enforceMaxLength: true,
                            maxLength: 5
                        },
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'End Flight:'
                        },
                        {
                            xtype: 'textfield',
                            value: 'XXXXX',
                            id:prototype.id+'-txtEndFlight',
                            enforceMaxLength: true,
                            maxLength: 5
                        }
                    ]
                }
            ]
        }
    ]
});

