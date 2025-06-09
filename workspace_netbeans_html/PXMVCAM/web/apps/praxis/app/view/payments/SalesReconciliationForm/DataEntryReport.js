Ext.define('Ext.Praxis.view.payments.SalesReconciliationForm.DataEntryReport', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryReportSalesReconciliationForm',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliation.DataEntryReportSalesReconciliationController'
    ],
    controller: 'DataEntryReportSalesReconciliationController',
    title: 'Ticket Report - Data Entry Report Form',
    header: true,
    height: 200,
    width: 1350,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            height: 200,
            width: 1350,
            scrollable: true,
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent;"',
                    layout: 'vbox',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            border: false,
                            bodyStyle: 'background:white;',
                            margin: '0 20 3 10',
                            width: 1350,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:white;',
                                    margin: '40 0 0 0',
                                    width: 1350,
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        //<editor-fold defaultstate="collapsed" desc="cmbDate">
//                                        {xtype: 'tbspacer', width: 50},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateFromYearReport',
                                            fieldStyle: 'text-align: left;',
                                            disabled: false,
                                            editable: false,
                                            fieldLabel: 'From',
                                            width: 120,
                                            labelWidth: 45,
                                            labelAlign: 'right',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            valueField: 'code', displayField: 'name',
                                            listConfig: {maxHeight: 111, minWidth: 70},
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
                                            id: prototype.id + '-cmbDateFromMonthReport',
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
                                            id: prototype.id + '-cmbDateFromDayReport',
                                            fieldStyle: 'text-align: left;',
                                            labelAlign: 'right',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            editable: false,
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            caseSensitive: true,
                                            valueField: 'code', displayField: 'name',
                                            emptyText: 'All',
                                            labelWidth: 0,
                                            width: 60,
                                            anchor: '100%',
                                            listConfig: {maxHeight: 111, minWidth: 60},
                                            listeners: {
                                                change: 'cbxDateFromDay_changeHandler'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateToYearReport',
                                            fieldStyle: 'text-align: left;',
                                            disabled: false,
                                            editable: false,
                                            fieldLabel: 'To',
                                            width: 106,
                                            hidden: true,
                                            labelWidth: 31,
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            valueField: 'code', displayField: 'name',
                                            listConfig: {maxHeight: 111, minWidth: 70},
                                            maxLength: 4,
                                            enforceMaxLength: true,
                                            maskRe: /[0-9]/,
                                            listeners: {
                                                change: 'cbxDateToYear_changeHandler'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateToMonthReport',
                                            fieldStyle: 'text-align: left;',
                                            disabled: false,
                                            editable: false,
                                            fieldLabel: '',
                                            width: 65,
                                            hidden: true,
                                            labelAlign: 'right',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            valueField: 'code', displayField: 'name',
                                            listConfig: {minWidth: 60},
                                            maxLength: 3,
                                            enforceMaxLength: true,
                                            listeners: {
                                                change: 'cbxDateToMonth_changeHandler'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            text: '-',
                                            padding: '3 0 0 0',
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateToDayReport',
                                            fieldStyle: 'text-align: left;',
                                            labelAlign: 'right',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            editable: false,
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            caseSensitive: true,
                                            valueField: 'code', displayField: 'name',
                                            emptyText: 'All',
                                            labelWidth: 0,
                                            width: 60,
                                            anchor: '100%',
                                            listConfig: {maxHeight: 111, minWidth: 60}
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbTDOCRe',
                                            fieldLabel: 'Doc Type',
                                            labelAlign: 'right',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            editable: false,
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            caseSensitive: true,
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: 'All',
                                            labelWidth: 60,
                                            width: 160,
                                            anchor: '100%'
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbSTREP',
                                            fieldLabel: 'Status',
                                            labelAlign: 'right',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            editable: false,
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            caseSensitive: true,
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: 'All',
                                            labelWidth: 60,
                                            width: 160,
                                            anchor: '100%'
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbSCURRENCY',
                                            fieldLabel: 'Currency',
                                            queryMode: 'local',
                                            allowBlank: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            labelWidth: 60,
                                            width: 200,
                                            typeAhead: true,
                                            valueField: 'A005KEY',
                                            displayField: 'A005KEY2',
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            listeners: {
                                                blur: function (combo) {
                                                    if (!combo.getValue()) {
                                                        combo.setValue('');
                                                    }
                                                },
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbSCOUNTRY',
                                            fieldLabel: 'Country',
                                            
                                            queryMode: 'local',
                                            allowBlank: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            labelWidth: 60,
                                            width: 250,
                                            typeAhead: true,
                                            
                                            valueField: 'A006PAIS',
                                            displayField: 'A006NOMBRE',
                                            listConfig: {maxHeight: 200},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            listeners: {
                                                blur: function (combo) {
                                                    if (!combo.getValue()) {
                                                        combo.setValue('');
                                                    }
                                                },
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'checkboxfield',
                                            id: prototype.id + '-chkTPS',
                                            boxLabel: '<b>TP</b>',
                                            checked: true,
                                            hidden: false,
                                            width: 50,
                                        },
                                    ]
                                },
                            ]
                        },
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    ui: 'footer',
                    margin: '10 0 10 0',
                    layout: {
                        pack: 'center'
                    },
                    fieldStyle: 'text-align:center',
                    defaults: {
                        scale: 'medium'
                    },
                    items: [
                        {
                            text: 'Export',
                            id: prototype.id + '-btn-excel',
                            iconCls: 'prx-icon-excel',
                            listeners: {
                                click: 'imgExcel'
                            }
                        },
                        {
                            text: 'Cancel',
                            id: prototype.id + '-btn-cancel',
                            iconCls: 'prx-icon-cancel',
                            listeners: {
                                click: 'onCancelClick'
                            }
                        }
                    ]
                }
            ]
        }
    ]
}
);