Ext.define('Ext.Praxis.view.sales.AccountingMasterSalesForm.Filters', {
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
                    id: prototype.id+'-lblDocumentType',
                    html: 'Document Type',
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 0px'
                },
                { xtype: 'tbspacer', width: 4 },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtDocumentType',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true,
                    maxLength: 4,
                    width: 50,
                    listeners:{
                            change: 'onUpperValue'
                    }
                },
                { xtype: 'tbspacer', width: 8 },
                {
                    xtype: 'label',
                    id: prototype.id+'-lblCtaType',
                    html: 'Account Type',
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 0px'
                },
                { xtype: 'tbspacer', width: 4 },
                {
                    xtype:'combo',
                    id: prototype.id + '-cmbCtaType',
                    store: new Ext.data.SimpleStore({
                        fields: ['code', 'name'],
                        data: [
                            ["", "ALL"],
                            ["A", "ASSOCIATED"],
                            ["C", "COMISSION"],
                            ["O", "CHARGE"],
                            ["T", "FARE"],
                            ["S", "STAND ALONE"],
                            ["F", "AUDIT"],
                            ["R", "REVENUE"]
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
                    hiddenLabel: false,
                    listConfig: {height: 111}
                },
                { xtype: 'tbspacer', width: 8 },
                {
                    xtype: 'label',
                    id: prototype.id+'-lblSubType',
                    html: 'Sub Type',
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 0px'
                },
                { xtype: 'tbspacer', width: 4 },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtSubType',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true,
                    maxLength: 4,
                    width: 40,
                    listeners:{
                            change: 'onUpperValue'
                    }
                },
                { xtype: 'tbspacer', width: 8 },
                {
                    xtype: 'label',
                    id: prototype.id+'-lblCategory',
                    html: 'Category',
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 0px'
                },
                { xtype: 'tbspacer', width: 4 },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtCategory',
                    fieldStyle: 'text-align:center',
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
                    id: prototype.id+'-lblCta',
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
                    id: prototype.id+'-lblSubCta',
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
                },
                { xtype: 'tbspacer', width: 8 },
                {
                    xtype: 'label',
                    id: prototype.id+'-lblDate',
                    html: 'Effective',
                    align: 'center',
                    hidden: true,
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 0px'
                },
                {
                    xtype: 'datefield',
                    id:prototype.id+'-txtA1740FINI',
                    format: 'Y/m/d',
                    fieldStyle: 'text-align:center;',
                    editable: false,
                    hidden: true,
                    maskRe: /[0-9/]/,
                    enforceMaxLength: true,
                    maxLength: 10,
                    width: 90
                },
                {
                    xtype: 'datefield',
                    id:prototype.id+'-txtA1740FFIN',
                    format: 'Y/m/d',
                    fieldStyle: 'text-align:center;',
                    editable: false,
                    hidden: true,
                    maskRe: /[0-9/]/,
                    enforceMaxLength: true,
                    maxLength: 10,
                    width: 90
                }
            ]
        }
    ]
});

