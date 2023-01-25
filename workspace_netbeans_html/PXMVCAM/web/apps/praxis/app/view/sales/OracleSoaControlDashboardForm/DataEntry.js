prototype.Dashboard = {
    id: 'DataEntry'
};
Ext.define('Ext.Praxis.view.sales.OracleSoaControlDashboardForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryOracleSoaControlDashboardForm',
    requires: [
        'Ext.Praxis.controller.sales.OracleSoaControlDashboard.DataEntryController'
    ],
    controller: 'DataEntryController',
    title: 'Maintenance - Data Entry Form',
    header: true,
    width: 630,
    height: 250,
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        align: 'center'
    },
    modal: true,
    items: [
        {
            xtype: 'panel',
            border: true,
            autoScroll: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    id: prototype.id + '-panelStatus',
                    border: false,
                    layout: 'column',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '8px 4px 8px 4px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA3701MODUL',
                            required: true,
                            editable: false,
                            fieldLabel: 'Module',
                            width: 135,
                            labelWidth: 45,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtFLAG',
                            required: true,
                            editable: false,
                            fieldLabel: 'Status',
                            width: 150,
                            labelWidth: 45,
                            maskRe: /[]/,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'right'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    id: prototype.id + '-panelObservation',
                    border: false,
                    layout: 'column',
                    height: 70,
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: left;',
                        padding: '8px 4px 8px 4px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'textarea',
                            id: prototype.id + '-txtA3702OBSER',
                            required: true,
                            editable: true,
                            fieldLabel: 'Observation (*)',
                            width: 595,
                            height: 50,
                            labelWidth: 100,
                            fieldStyle: 'text-align: left;',
                            labelAlign: 'left'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    id: prototype.id + '-panelShedule',
                    border: false,
                    layout: 'column',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '8px 4px 8px 4px',
                        anchor: '100%'
                    },
                    items: [                        
                        {
                            xtype: 'datefield',
                            id: prototype.id + '-txtA3701FCINI',
                            fieldLabel: 'Start',
                            format: 'Y/m/d',
                            labelWidth: 40,
                            minValue : Ext.Date.format(new Date(),'Y/m/d'),
                            value: new Date(),
                            labelAlign: 'right',
                            width: 135,
                            listeners: {
                                specialkey: 'onSearchkey'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA3701HRINI',
                            required: true,
                            editable: true,
                            fieldLabel: 'Hrs',
                            width: 150,
                            labelWidth: 80,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'right'
                        },                        
                        {
                            xtype: 'datefield',
                            id: prototype.id + '-txtA3701FCFIN',
                            fieldLabel: 'End',
                            format: 'Y/m/d',
                            labelWidth: 40,
                            minValue : Ext.Date.format(new Date(),'Y/m/d'),
                            value: new Date(),
                            labelAlign: 'right',
                            width: 135,
                            listeners: {
                                specialkey: 'onSearchkey'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA3701HRFIN',
                            required: true,
                            editable: true,
                            fieldLabel: 'Hrs',
                            width: 150,
                            labelWidth: 80,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'right'
                        }
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
            margin: '5 100 10 50',
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
            items: [
                {
                    text: 'Update',
                    id: prototype.id + '-btn-update',
                    iconCls: 'prx-icon-update',
                    //hidden: true,
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
                }
            ]
        }
    ]
});