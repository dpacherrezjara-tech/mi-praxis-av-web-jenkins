Ext.define('Ext.Praxis.view.sales.AccountingMasterPagaTodoForm.Filters', {
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
                    html: 'Source',
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 0px'
                },
                { xtype: 'tbspacer', width: 4 },
                {
                    xtype:'combo',
                    id: prototype.id + '-cbxSource',
                    store: new Ext.data.SimpleStore({
                        fields: ['code', 'name'],
                        data: [
                            ["1", "FOP Code"],
                            ["2", "PT Card Number"]
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
                    width: 130,
                    hiddenLabel: false,
                    listeners: {
                        change: 'onCmbSourceChange'
                    }
                },
                { xtype: 'tbspacer', width: 8 },
                {
                    xtype:'combo',
                    id: prototype.id + '-cboFOPCode',
                    store: new Ext.data.SimpleStore({
                        fields: ['code', 'name'],
                        data: [
                            ["", "All"],
                            ["CCPT", "CCPT"]
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
                    width: 100,
                    hiddenLabel: false
                },
                { xtype: 'tbspacer', width: 8 },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtPTCardNumber',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true,
                    hidden: true,
                    maxLength: 10,
                    width: 150
                },
                { xtype: 'tbspacer', width: 8 },
                {
                    xtype: 'label',
                    html: 'Account',
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 0px'
                },
                { xtype: 'tbspacer', width: 4 },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtCta',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true,
                    maxLength: 4,
                    width: 60
                },
                { xtype: 'tbspacer', width: 8 },
                {
                    xtype: 'label',
                    html: 'Sub Account',
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 0px'
                },
                { xtype: 'tbspacer', width: 4 },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtSubCta',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true,
                    maxLength: 5,
                    width: 60
                }
            ]
        }
    ]
});

