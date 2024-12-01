Ext.define('Ext.Praxis.view.payments.BalanceAnalysisByAgeForm.Filters_2', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters3',
//    border: true,
    bodyStyle: 'background-color: #ffffff;',
    padding: '2px 0px 1px 0px',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            id: prototype.id + '-contFilter3',
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
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxSearchFilter3',
                    margin: '0 40',
                    border: false,
                    width: 1210,
                    bodyStyle: 'background: transparent',
                    layout: 'vbox',
                    defaults: {
                        border: false
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            margin: '0 0 2 0',
                            bodyStyle: 'background: transparent;"',
                            defaults: {
                                margin: '4 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Search Date',
                                    padding: '3 0',
                                    width: 70,
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
                                    width: 125,
//                                    hidden: true,
                                    typeAhead: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    listConfig: {maxHeight: 111, minWidth: 70},
                                    enableKeyEvents: true,
                                    triggerAction: 'all'
                                },
                                {xtype: 'tbspacer', width: 20},
//                                {
//                                    xtype: 'label',
//                                    text: 'Show by:',
//                                    style: 'font-weight:bold;',
//                                    padding: '3 0',
//                                    width: 80
//                                },
//                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'radiogroup',
                                    id: prototype.id + '-rbgFlag',
                                    fieldLabel: '',
                                    horizontal: true,
                                    items: [
                                        {boxLabel: '<strong >Month</strong>', name: 'rb', inputValue: 'MONTH', width: 100,checked: true},
                                        {boxLabel: '<strong >Card Type</strong>', name: 'rb', inputValue: 'SCARCOD', width: 100 },
                                        {boxLabel: '<strong >Bank</strong>', name: 'rb', inputValue: 'CODEBANK', width: 100},
                                    ],
                                    listeners: {
                                        change: 'btnSearch_click'
                                    }
                                },
//                                {
//                                    xtype: 'radiogroup',
//                                    id: prototype.id + '-rbgFlag',
//                                    items: [
//                                        {boxLabel: '<b style="color:#046AAA;">Month</b>', inputValue: 'MONTH', name: 'rbgFlag', checked: true},
//                                        {xtype: 'tbspacer', width: 20},
//                                        {boxLabel: '<b style="color:#046AAA;">Card Type</b>', inputValue: 'SCARCOD', name: 'rbgFlag', width: 80},
//                                        {xtype: 'tbspacer', width: 20},
//                                        {boxLabel: '<b style="color:#046AAA;">Bank</b>', inputValue: 'CODEBANK', name: 'rbgFlag'}
//                                    ],
//                                    listeners: {
//                                        change: 'btnSearch_click'
//                                    }
//                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'checkboxfield',
                                    id: prototype.id + '-chkTOT',
//                            margin: '0 20 0 30',
                                    width: 80,
                                    boxLabel: '<b>Detail</b>',
                                    inputValue: '1',
                                    listeners: {
                                        change: 'ChangeCheckTotal'
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
