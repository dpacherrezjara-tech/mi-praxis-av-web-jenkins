Ext.define('Ext.Praxis.view.payments.LastConciliationForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            id: prototype.id + '-contFilter',
            border: false,
            bodyStyle: 'background: transparent',
            padding: '2px 5px 1px 5px',
            layout: 'column',
            defaults: {
//                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                padding: '5px 1px 5px 1px',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                hidden: false,
            },
            items: [
                /*{
                    xtype: 'label',
                    html: '<strong style="color:#000;">Sales Date</strong>',
                    align: 'left',
                    fieldStyle: 'text-align: left;',
                    padding: '8px 30px 0px 10px',
                    hidden: false
                },*/
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbFecFiltro',
                    queryMode: 'local',
                    allowBlank: false,
                    forceSelection: true,
                    selectOnFocus: true,
                    caseSensitive: false,
                    autoSelect: true,
                    editable: true,
                    width: 100,
//                            value: "ADATE",
                    typeAhead: true,
                    valueField: 'code',
                    displayField: 'name',
                    listConfig: {minWidth: 130},
                    enableKeyEvents: true,
                    triggerAction: 'all',
                    listeners: {
                    }
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
                    hidden: false,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    labelWidth: 50,
                    width: 140,
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
                    hidden: false,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    width: 70,
                    anchor: '100%'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateFromDay',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: false,
                    autoSelect: true,
                    enableKeyEvents: true,
                    forceSelection: true,
                    caseSensitive: false,
                    valueField: 'code', displayField: 'name',
                    emptyText: 'All',
                    width: 60,
                    typeAhead: true,
                    listeners: {
                        change: 'onFromDayChange',
                        keypress: 'onTextKeypress'
                    }
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateToYear',
                    fieldLabel: 'To',
                    labelAlign: 'right',
                    queryMode: 'local',
                    editable: false,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    hidden: false,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    labelWidth: 50,
                    width: 140,
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
                    hidden: false,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    width: 70,
                    anchor: '100%'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateToDay',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: false,
                    autoSelect: true,
                    enableKeyEvents: true,
                    forceSelection: true,
                    caseSensitive: false,
                    valueField: 'code', displayField: 'name',
                    emptyText: 'All',
                    width: 60,
                    typeAhead: true,
                    listeners: {
                        change: 'onToDayChange',
                        keypress: 'onTextKeypress'
                    }
                },
                {xtype: 'tbspacer', width: 30},
                {
                    xtype: 'label',
                    text: 'Card Number:',
                    padding: '8px 0px 0px 00px',
                    width: 102,
                    autoEl: {
                        tag: 'label',
                        'data-qtip': 'Credit Card Number'
                    }
                },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtCard1',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true,
                    maskRe: /[0-9]/,
                    maxLength: 6,
                    width: 85,
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'tarjeta_keyDownHandler',
                    }
                },
                {xtype: 'tbspacer', width: 5},
                {
                    xtype: 'label',
                    text: '*****(*)',
                    padding: '8px 0px 0px 0px',
                    width: 65,
                    autoEl: {
                        tag: 'label',
                        'data-qtip': '5 encrypted characters for AMEX and 6 characters for the rest.'
                    }
                },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtCard2',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true,
                    maskRe: /[0-9]/,
                    maxLength: 4,
                    width: 65,
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'buscarCard_keyDownHandler'
                    }
                },
                {xtype: 'tbspacer', width: 58},
                {
                    xtype: 'label',
                    text: 'Card Type:',
                    padding: '8px 0px 0px 0px',
                    width: 66,
//                            autoEl: {
//                                tag: 'label',
//                                'data-qtip': 'Credit Card Type'
//                            }
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbCardType',
                    queryMode: 'local',
                    allowBlank: false,
                    forceSelection: true,
                    selectOnFocus: true,
                    caseSensitive: false,
                    autoSelect: true,
                    editable: true,
                    listConfig: {maxHeight: 111},
                    width: 150,
                    typeAhead: true,
                    valueField: 'CODE',
                    displayField: 'NAME',
                    enableKeyEvents: true,
                    triggerAction: 'all',
                },
                {xtype: 'tbspacer', width: 30},
            ]
        },
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            padding: '2px 5px 1px 5px',
            layout: 'column',
            defaults: {
//                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                padding: '5px 1px 5px 1px',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                hidden: false,
            },
            items: [
                {
                    xtype: 'label',
                    text: 'Agent Code:',
                    padding: '8px 30px 0px 10px',
                    width: 120,
//                            autoEl: {
//                                tag: 'label',
//                                'data-qtip': 'Authorization Number'
//                            }
                },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtSAGENT',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true,
                    maskRe: /[0-9]/,
                    maxLength: 8,
                    width: 120,
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'txtFilterValue_keyDownHandler'
                    }
                },
                {xtype: 'tbspacer', width: 160},
                {
                    xtype: 'label',
                    text: 'PNR:',
                    padding: '8px 30px 0px 10px',
                    width: 40
                },
                {xtype: 'tbspacer', width: 10},
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtPNR',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true,
                    maskRe: /[0-9a-zA-Z]/,
                    maxLength: 6,
                    width: 70,
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'BuscarPNR_keyDownHandler'
                    }
                },
                {xtype: 'tbspacer', width: 165},
                {
                    xtype: 'label',
                    text: 'Diference Sign:',
                    padding: '8px 00px 0px 00px',
                    width: 100,
//                            autoEl: {
//                                tag: 'label',
//                                'data-qtip': 'Credit Card Type'
//                            }
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbSVFOPSG',
                    queryMode: 'local',
                    allowBlank: false,
                    forceSelection: true,
                    selectOnFocus: true,
                    caseSensitive: false,
                    autoSelect: true,
                    editable: true,
                    listConfig: {maxHeight: 111},
                    width: 60,
                    typeAhead: true,
                    valueField: 'code',
                    displayField: 'name',
                    enableKeyEvents: true,
                    triggerAction: 'all',
                },
                {xtype: 'tbspacer', width: 220},
                {
                    xtype: 'label',
                    text: 'Notice Status:',
                    padding: '8px 00px 0px 00px',
                    width: 100,
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbSTAAVIS',
                    queryMode: 'local',
                    allowBlank: false,
                    forceSelection: true,
                    selectOnFocus: true,
                    caseSensitive: false,
                    autoSelect: true,
                    editable: true,
                    listConfig: {maxHeight: 111},
                    width: 90,
                    typeAhead: true,
                    valueField: 'code',
                    displayField: 'name',
                    enableKeyEvents: true,
                    triggerAction: 'all',
                },
            ]
        },
    ]
});
