Ext.define('Ext.Praxis.view.payments.SalesReconciliBoomerForm.DataEntryExportByDate', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryExportByDateSalesReconciliBoomerForm',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliBoomer.DataEntryExportByDateController'
    ],
    controller: 'DataEntryExportByDateController',
    title: 'Export by Date Form',
    header: true,
//    height: 575,
    width: 700,
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
            defaults: {
                style: 'margin: 3px;',
                textDecoration: 'underline',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent;"',
                    layout: 'vbox',
                    width: 700,
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '10 2 2 5',
                            defaults: {
                                anchor: '100%',
                                width: 700
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Settlement Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    padding: '3 0',
                                    width: 120
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-de-cmbDateFromYear',
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
                                        //change: 'cbxDateFromYear_changeHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-de-cmbDateFromMonth',
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
                                        //change: 'cbxDateFromMonth_changeHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-de-cmbDateFromDay',
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
                                    hidden: true,
                                    width: 60,
                                    anchor: '100%',
                                    listConfig: {maxHeight: 111, minWidth: 60},
                                    listeners: {
                                        //change: 'cbxDateFromDay_changeHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-de-cmbDateToYear',
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
                                    id: prototype.id + '-de-cmbDateToMonth',
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
                                    id: prototype.id + '-de-cmbDateToDay',
                                    fieldStyle: 'text-align: left;',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    hidden: true,
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
            margin: '3 0 20 0',
//            layout: {
//                pack: 'center'
//            },
            fieldStyle: 'text-align:left',
            defaults: {
                scale: 'medium'
            },
            items: [
                {xtype: 'tbspacer', width: 250},
                {
                    text: 'Export',
                    id: prototype.id + '-de-btn-export',
                    iconCls: 'prx-icon-excel',
                    listeners: {
                        click: 'onExportByDateClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.id + '-de-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                },
            ]
        }
    ]
}
);