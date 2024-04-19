Ext.define('Ext.Praxis.view.payments.ReportsForm.Filters', {
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
                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: left;',
                padding: '5px 1px 5px 1px',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                hidden: false
            },
            items: [
                {xtype: 'tbspacer', width: 25},
                {
                    xtype: 'label',
                    text: 'Search By:',
                    padding: '8 10 0 0',
                    width: 80,
                    style: {
                        fontWeight: 'bold'
                    }
                },
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
                    value: "SDATE",
                    typeAhead: true,
                    valueField: 'code',
                    displayField: 'name',
                    listConfig: {minWidth: 130},
                    enableKeyEvents: true,
                    triggerAction: 'all',
                    listeners: {
                    }
                },
                {xtype: 'tbspacer', width: 10},
                //<editor-fold defaultstate="collapsed" desc="cmbDate">
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateFromYear',
                    fieldStyle: 'text-align: left;',
                    disabled: false,
                    editable: false,
                    fieldLabel: 'From',
                    width: 120,
                    labelWidth: 45,
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'code',
                    displayField: 'name',
//                            listConfig: {maxHeight: 111, minWidth: 70},
                    maxLength: 4,
                    enforceMaxLength: true,
                    maskRe: /[0-9]/,
                    listeners: {
                        change: 'cbxDateFromYear_changeHandler'
                    }
                },
                {xtype: 'tbspacer', width: 10},
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateFromMonth',
                    fieldStyle: 'text-align: left;',
                    disabled: false,
                    editable: false,
                    fieldLabel: '',
                    width: 65,
                    labelWidth: 0,
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'code', displayField: 'name',
                    listConfig: {minWidth: 60},
                    maxLength: 3,
                    enforceMaxLength: true,
                    listeners: {
                        change: 'cbxDateFromMonth_changeHandler'
                    }
                },
                {xtype: 'tbspacer', width: 10},
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateDay',
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: false,
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    hidden: true,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    width: 70,
                    anchor: '100%',
                    listener: {
                        change: 'onDateFromDaySelect',
                        expand: 'eventSelectFromDay'

                    }
                },
                {xtype: 'tbspacer', width: 15},

                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateToYear',
                    fieldStyle: 'text-align: left;',
                    disabled: false,
                    editable: false,
                    fieldLabel: 'To',
                    width: 106,
                    labelWidth: 31,
                    labelAlign: 'left',
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'code', displayField: 'name',
                    listConfig: {maxHeight: 111, minWidth: 70},
                    maxLength: 4,
                    enforceMaxLength: true,
                    maskRe: /[0-9]/
                },
                {xtype: 'tbspacer', width: 10},
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateToMonth',
                    fieldStyle: 'text-align: left;',
                    disabled: false,
                    editable: false,
                    fieldLabel: '',
                    width: 65,
//                            labelWidth: 0,
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'code', displayField: 'name',
                    listConfig: {minWidth: 60},
                    maxLength: 3,
                    enforceMaxLength: true
                },
                {xtype: 'tbspacer', width: 10},
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
                    hidden: true,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    width: 70,
                    anchor: '100%',
                    listener: {
                        change: 'onDateToDaySelect',
                        expand: 'eventSelectToDay'
                    }
                },
                //</editor-fold>
                {
                    xtype: 'label',
                    text: 'Country:',
                    padding: '8 10 0 0',
                    width: 60,
                    style: {
                        fontWeight: 'bold'
                    }
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbCountry',
                    queryMode: 'local',
                    allowBlank: false,
                    forceSelection: true,
                    selectOnFocus: true,
                    caseSensitive: false,
                    autoSelect: true,
                    editable: true,
                    width: 219,
                    typeAhead: true,
                    valueField: 'A006PAIS',
                    displayField: 'A006NOMBRE',
                    listConfig: {maxHeight: 200},
                    enableKeyEvents: true,
                    triggerAction: 'all',
                },
                {xtype: 'tbspacer', width: 20},
                {
                    xtype: 'label',
                    text: 'Card Number:',
                    padding: '8 0 0 0',
                    width: 90,
                    style: {
                        fontWeight: 'bold'
                    },
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
                        keyup: 'tarjeta_keyDownHandler'
                    }
                },
                {xtype: 'tbspacer', width: 8},
                {
                    xtype: 'label',
                    text: '*****(*)',
                    padding: '8 0 0 0',
                    width: 65,
                    style: {
                        fontWeight: 'bold'
                    },
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
                    width: 100,
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'eventKey'
                    }
                },
                {xtype: 'tbspacer', width: 20},
                {
                    xtype: 'label',
                    text: 'Author. Cod : ',
                    padding: '8 0 0 0',
                    width: 80,
                    style: {
                        fontWeight: 'bold'
                    }
                },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtAUTHOC',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true,
                    maskRe: /[0-9a-zA-Z]/,
                    maxLength: 8,
                    width: 100,
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'eventKey'
                    }
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Bank',
                    id: prototype.id + '-cmbBank',
                    queryMode: 'local',
                    editable: true,
                    valueField: 'CODEBANK',
                    displayField: 'IN_CODE_IN_NAME',
                    emptyText: 'All',
                    labelWidth: 60,
                    width: 250
                },
            ]
        }
    ]
});
