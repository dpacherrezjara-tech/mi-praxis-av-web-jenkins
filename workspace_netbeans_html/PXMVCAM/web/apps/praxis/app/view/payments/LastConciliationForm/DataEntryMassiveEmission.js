Ext.define('Ext.Praxis.view.payments.LastConciliationForm.DataEntryMassiveEmission', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryLastConciliationForm',
    requires: [
        'Ext.Praxis.controller.payments.LastConciliation.DataEntryMassiveEmissionLastConciliationController'
    ],
    controller: 'DataEntryMassiveEmissionLastConciliationController',
    title: 'Massive Emission',
    header: true,
    height: 150,
    width: 600,
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
                    width: 600,
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
                                width: 600
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                /*{
                                    xtype: 'label',
                                    html: '<strong style="color:#000;">Emission Date</strong>',
                                    align: 'left',
                                    fieldStyle: 'text-align: left;',
                                    //padding: '8px 30px 0px 10px',
                                    hidden: false
                                },*/
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-de-cmbDateFromYear',
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
                                    id: prototype.id + '-de-cmbDateFromMonth',
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
                                    id: prototype.id + '-de-cmbDateFromDay',
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
                                    id: prototype.id + '-de-cmbDateToYear',
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
                                    id: prototype.id + '-de-cmbDateToMonth',
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
                                    id: prototype.id + '-de-cmbDateToDay',
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
                                {xtype: 'tbspacer', width: 50},
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
                {xtype: 'tbspacer', width: 215},
                {
                    text: 'Emit',
                    id: prototype.id + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.id + '-btn-cancel',
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