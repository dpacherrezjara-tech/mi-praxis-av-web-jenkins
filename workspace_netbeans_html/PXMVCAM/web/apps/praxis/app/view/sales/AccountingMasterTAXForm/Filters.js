Ext.define('Ext.Praxis.view.sales.AccountingMasterTAXForm.Filters', {
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
                    html: '<strong style="color:#000;">Search By: </strong>',
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 0px'
                },
                { xtype: 'tbspacer', width: 8 },
                {
                    xtype: 'label',
                    id: prototype.id+'-lblCountry',
                    html: 'Country',
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 0px'
                },
                { xtype: 'tbspacer', width: 4 },
                {
                    xtype:'combo',
                    id: prototype.id + '-cmbCountry',
                    queryMode: 'local',
                    triggerAction: 'all',
                    autoSelect: true,
                    forceSelection: true,
                    caseSensitive: false,
                    editable: true,
                    hiddenLabel: false,
                    width: 140,
                    typeAhead: true,
                    emptyText: 'All',
                    valueField: 'code',
                    displayField: 'name',
                    listConfig: {maxHeight: 111},
                    enableKeyEvents: true,
                    listeners:{
                        focus: function(combo) {
                            combo.expand();
                        }
                    }
                },
                { xtype: 'tbspacer', width: 8 },
                {
                    xtype: 'label',
                    id: prototype.id+'-lblTAX',
                    html: 'Tax',
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 0px'
                },
                {
                    xtype:'combo',
                    id: prototype.id + '-cmbTAX',
                    queryMode: 'local',
                    triggerAction: 'all',
                    autoSelect: true,
                    forceSelection: true,
                    caseSensitive: false,
                    editable: true,
                    hiddenLabel: false,
                    width: 120,
                    typeAhead: true,
                    emptyText: 'All',
                    valueField: 'code',
                    displayField: 'name',
                    listConfig: {maxHeight: 111},
                    enableKeyEvents: true,
                    listeners:{
                        focus: function(combo) {
                            combo.expand();
                        }
                    }
                },
                { xtype: 'tbspacer', width: 8 },
                {
                    xtype: 'label',
                    id: prototype.id+'-lblCurrency',
                    html: 'Currency',
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 0px'
                },
                {
                    xtype:'combo',
                    id: prototype.id + '-cmbCurrency',
                    queryMode: 'local',
                    triggerAction: 'all',
                    autoSelect: true,
                    enableKeyEvents: true,
                    forceSelection: true,
                    caseSensitive: false,
                    editable: true,
                    hiddenLabel: false,
                    width: 120,
                    typeAhead: true,
                    emptyText: 'All',
                    valueField: 'code',
                    displayField: 'name',
                    listConfig: {maxHeight: 111},
                    listeners:{
                        focus: function(combo) {
                            combo.expand();
                        }
                    }
                },
                { xtype: 'tbspacer', width: 8 },
                {
                    xtype: 'label',
                    html: 'Type',
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 0px'
                },
                {
                    xtype:'combo',
                    id: prototype.id + '-Brw_cmbA1741TIPO',
                    store: new Ext.data.SimpleStore({
                        fields: ['code', 'name'],
                        data: [
                            ["", "All"],
                            ["M", "Multicurrency"],
                            ["O", "Origin"],
                            ["C", "Expired"],
                            ["R", "RAC"],
                            ["N", "No Show"]
                        ]
                    }),
                    queryMode: 'local',
                    triggerAction: 'all',
                    forceSelection: true,
                    hiddenLabel: false,
                    caseSensitive: false,
                    autoSelect: true,
                    editable: true,
                    width: 120,
                    typeAhead: true,
                    emptyText: 'All',
                    valueField: 'code',
                    displayField: 'name',
                    listConfig: {maxHeight: 111},
                    enableKeyEvents: true,
                    listeners:{
                        focus: function(combo) {
                            combo.expand();
                        }
                    }
                },
                { xtype: 'tbspacer', width: 8 },
                {
                    xtype: 'label',
                    id: prototype.id+'-lblCta',
                    html: 'Account',
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 0px'
                },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtCta',
                    fieldStyle: 'text-align:right',
                    enforceMaxLength: true,
                    maxLength: 4,
                    width: 60,
                    listeners:{
                        change: 'onUpperValue'
                    }
                },
                { xtype: 'tbspacer', width: 8 },
                {
                    xtype: 'label',
                    id: prototype.id+'-lblSubCta',
                    html: 'Sub Account',
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 0px'
                },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtSubCta',
                    fieldStyle: 'text-align:right',
                    enforceMaxLength: true,
                    maxLength: 5,
                    width: 60,
                    listeners:{
                        change: 'onUpperValue'
                    }
                },
                { xtype: 'tbspacer', width: 8 },
                {
                    xtype: 'label',
                    html: 'Controlled',
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 0px'
                },
                {
                    xtype:'combo',
                    id: prototype.id + '-cboControlled',
                    store: new Ext.data.SimpleStore({
                        fields: ['code', 'name'],
                        data: [
                            ["", "All"],
                            ["Y", "Yes"],
                            ["N", "No"]
                        ]
                    }),
                    queryMode: 'local',
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    forceSelection: true,
                    caseSensitive: true,
                    editable: false,
                    valueField: 'code',
                    displayField: 'name',
                    width: 120,
                    hiddenLabel: false
                }
            ]
        }
    ]
});

