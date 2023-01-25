Ext.define('Ext.Praxis.view.sales.InputSchemeUpfrontForm.DataEntryRegisterLabel',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryRegisterLabelInputSchemeUpfrontForm',
    requires:[
        'Ext.Praxis.controller.sales.InputSchemeUpfront.DataEntryRegisterLabelInputSchemeUpfrontController'
    ],
    controller: 'DataEntryRegisterLabelInputSchemeUpfrontController',
    title:'Maintenance',
    header:true,
    height:260,
    width:605,
    resizable:false,
    layout:'fit',
    modal:true,
    border: false,
    defaults: {
        border: false
    },
    items:[
        {
            xtype: 'form',
            defaults:{
                style: 'margin: 3px;',
                border: false
            },
            items:[
                {
                    xtype: 'panel',
                    id: prototype.id+'-PANEL_CONTENT',
                    border: true,
                    layout: 'hbox',
                    height: 200,
                    bodyStyle: 'border-style:solid;border-color:#A6A6A6;border-bottom-width:4px;',
                    items: [
                        {
                            xtype: 'panel',
                            border: false,
                            layout: 'vbox',
                            items: [
                                { xtype: 'tbspacer', height: 33 },
                                {
                                    xtype: 'panel',
                                    border: false,
                                    layout: 'hbox',
                                    items: [
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'EFFEC.DATE:',
                                            padding: '4 0 0 0',
                                            width: 89
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'datefield',
                                            id:prototype.id+'-EFFEC_DATE',
                                            fieldStyle: 'text-align:center',
                                            format: 'Y/m/d',
                                            formatText: '',
                                            invalidText: 'Type the date in the format: YYYY/MM/DD',
//                                            value: new Date(),
                                            minValue: new Date(1990, 00, 01),
                                            maskRe: /[0-9/]/,
                                            editable: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            width: 120,
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Format valid YYYY/MM/DD'
                                            }
                                        },
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'TERM.DATE:',
                                            padding: '4 0 0 0',
                                            width: 89
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'datefield',
                                            id:prototype.id+'-TERM_DATE',
                                            fieldStyle: 'text-align:center',
                                            format: 'Y/m/d',
                                            formatText: '',
                                            invalidText: 'Type the date in the format: YYYY/MM/DD',
//                                            value: new Date(),
                                            minValue: new Date(1990, 00, 01),
                                            maskRe: /[0-9/]/,
                                            editable: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            width: 114,
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Format valid YYYY/MM/DD'
                                            }
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 11 },
                                {
                                    xtype: 'panel',
                                    border: false,
                                    layout: 'hbox',
                                    items: [
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'NAME LABEL:',
                                            padding: '4 0 0 0',
                                            width: 89
                                        },
                                        { xtype: 'tbspacer', width: 4 },
						{
                                            xtype: 'textfield',
                                            id:prototype.id+'-TXT_LABEL',
                                            fieldStyle: 'text-align:left;',
                                            width: 218
                                        },
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'PERCENT.%:',
                                            padding: '4 0 0 0',
                                            width: 89
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-TXT_PERCENT_LABEL',
                                            fieldStyle: 'text-align:left;',
                                            maskRe: /[0-9./]/,
                                            width: 60
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-TXT_LABEL_UDT',
                                            fieldStyle: 'text-align:left;',
                                            hidden: true,
                                            width: 0
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 11 },
                                {
                                    xtype: 'panel',
                                    border: false,
                                    layout: 'hbox',
                                    items: [
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'DESCRIPT:',
                                            padding: '4 0 0 0',
                                            width: 89
                                        },
                                        { xtype: 'tbspacer', width: 4 },
						{
                                            xtype: 'textfield',
                                            id:prototype.id+'-TXT_DESCRIPTION',
                                            fieldStyle: 'text-align:left;',
                                            width: 218
                                        },
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'ELIGIBLE:',
                                            padding: '4 0 0 0',
                                            width: 89
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype:'combo',
                                            id: prototype.id + '-CMBELEGIBLE',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["C", "YES"], ["N", "NO"]
                                                ]
                                            }),
                                            queryMode: 'local',
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            width: 63,
                                            typeAhead: true,
                                            valueField: 'code', displayField: 'name',
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            listeners:{
                                                focus: function(combo) {
                                                    combo.expand();
                                                }
                                            }
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 11 },
                                {
                                    xtype: 'panel',
                                    border: false,
                                    layout: 'hbox',
                                    items: [
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'CRYTERY:',
                                            padding: '4 0 0 0',
                                            width: 89
                                        },
                                        { xtype: 'tbspacer', width: 4 },
						{
                                            xtype: 'textfield',
                                            id:prototype.id+'-TXT_CRIERY',
                                            fieldStyle: 'text-align:left;',
                                            width: 374
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 33 }
                            ]
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'panel',
                            border: false,
                            layout: 'vbox',
                            items: [
                                { xtype: 'tbspacer', height: 33 },
                                {
                                    xtype: 'button',
                                    id:prototype.id+'-btnx2',
                                    html: '<strong>New</strong>',
                                    border: true,
                                    scale: 'small',
                                    width: 80,
                                    listeners:{
                                        click: 'setClearCmp'
                                    }
                                },
                                { xtype: 'tbspacer', height: 11 },
                                {
                                    xtype: 'button',
                                    id:prototype.id+'-btnx4',
                                    html: '<strong>Save</strong>',
                                    border: true,
                                    scale: 'small',
                                    width: 80,
                                    listeners:{
                                        click: 'setSaveLabel'
                                    }
                                },
                                { xtype: 'tbspacer', height: 11 },
                                {
                                    xtype: 'button',
                                    id:prototype.id+'-btnx3',
                                    html: '<strong>Delete</strong>',
                                    border: true,
                                    scale: 'small',
                                    width: 80,
                                    listeners:{
                                        click: 'setSaveLabel'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems:[
    ]
});