Ext.define('Ext.Praxis.view.interline.AccountingMasterInterliForm.Filters', {
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
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'label',
                    html: '<strong style="color:#000;">Search By</strong>',
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 0px 8px 0px'
                },
                { xtype: 'tbspacer', width: 10 },
                {
                    xtype: 'label',
                    id: prototype.id + '-lblDocumentType',
                    html: 'Document Type: ',
                    hidden: true,
                    width: 100,
                    padding: '8px 0px 8px 0px'
                },
                { xtype: 'tbspacer', width: 4 },
                {
                    xtype: 'textfield',
                    id:prototype.id+'-txtDocumentType',
                    fieldStyle: 'text-align:center;',
                    width: 40,
                    hidden: true
                },
                { xtype: 'tbspacer', width: 10 },
                {
                    xtype: 'label',
                    id: prototype.id + '-lblCtaType',
                    html: 'Account Type',
                    width: 100,
                    padding: '8px 0px 8px 0px'
                },
                { xtype: 'tbspacer', width: 4 },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbCtaType',
                    store: new Ext.data.SimpleStore({
                        fields: ['code', 'name'],
                        data: [
                            ["", "ALL"], ["A", "ABONO"], ["C", "CARGO"]
                        ]
                    }),
                    queryMode: 'local',
                    editable:false,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    typeAhead: true,
                    valueField: 'code', displayField: 'name',
                    width: 90,
                    listeners:{
                        afterrender: function (combo, eOpts) {
                            combo.setValue("");
                        }
                    }
                },
                { xtype: 'tbspacer', width: 10 },
                {
                    xtype: 'label',
                    id: prototype.id + '-lblSubType',
                    html: 'Sub Type',
                    padding: '8px 0px 8px 0px'
                },
                { xtype: 'tbspacer', width: 7 },
                {
                    xtype: 'textfield',
                    id:prototype.id+'-txtSubType',
                    fieldStyle: 'text-align:center;',
                    enforceMaxLength: true,
                    maxLength: 4,
                    width: 40
                },
                { xtype: 'tbspacer', width: 10 },
                {
                    xtype: 'label',
                    id: prototype.id + '-lblCategory',
                    html: 'Category',
                    padding: '8px 0px 8px 0px'
                },
                { xtype: 'tbspacer', width: 7 },
                {
                    xtype: 'textfield',
                    id:prototype.id+'-txtCategory',
                    fieldStyle: 'text-align:center;',
                    enforceMaxLength: true,
                    maxLength: 4,
                    width: 60
                },
                { xtype: 'tbspacer', width: 10 },
                {
                    xtype: 'label',
                    id: prototype.id + '-lblCta',
                    html: 'Account',
                    padding: '8px 0px 8px 0px'
                },
                { xtype: 'tbspacer', width: 7 },
                {
                    xtype: 'textfield',
                    id:prototype.id+'-txtCta',
                    fieldStyle: 'text-align:center;',
                    enforceMaxLength: true,
                    maxLength: 4,
                    width: 60
                },
                { xtype: 'tbspacer', width: 10 },
                {
                    xtype: 'label',
                    id: prototype.id + '-lblSubCta',
                    html: 'Sub Account',
                    padding: '8px 0px 8px 0px'
                },
                { xtype: 'tbspacer', width: 7 },
                {
                    xtype: 'textfield',
                    id:prototype.id+'-txtSubCta',
                    fieldStyle: 'text-align:center;',
                    enforceMaxLength: true,
                    maxLength: 5,
                    width: 60
                }
//                ,
//                { xtype: 'tbspacer', width: 10 },
//                {
//                    xtype: 'label',
//                    id: prototype.id + '-lblDate',
//                    html: 'Effective',
//                    hidden: true,
//                    padding: '8px 0px 8px 0px'
//                },
//                { xtype: 'tbspacer', width: 7 },
//                {
//                    xtype: 'datefield',
//                    id:prototype.id+'-txtA1740FINI',
//                    fieldStyle: 'text-align:center',
//                    format: 'Y/m/d',
//                    formatText: '',
//                    hidden: true,
//                    invalidText: 'Type the date in the format: YYYY/MM/DD',
//                    minValue: new Date(1990, 00, 01),
//                    maskRe: /[0-9/]/,
//                    editable: true,
//                    enforceMaxLength: true,
//                    maxLength: 10,
//                    width: 90,
//                    autoEl: {
//                        tag: 'label',
//                        'data-qtip': 'Format valid YYYY/MM/DD'
//                    }
//                },
//                { xtype: 'tbspacer', width: 4 },
//                {
//                    xtype: 'datefield',
//                    id:prototype.id+'-txtA1740FFIN',
//                    fieldStyle: 'text-align:center',
//                    format: 'Y/m/d',
//                    formatText: '',
//                    hidden: true,
//                    invalidText: 'Type the date in the format: YYYY/MM/DD',
//                    minValue: new Date(1990, 00, 01),
//                    maskRe: /[0-9/]/,
//                    editable: true,
//                    enforceMaxLength: true,
//                    maxLength: 10,
//                    width: 90,
//                    autoEl: {
//                        tag: 'label',
//                        'data-qtip': 'Format valid YYYY/MM/DD'
//                    }
//                }
            ]
        }
    ]
});

