prototype.DashboardDetail = {
    id: 'OracleSoaControlDashboardDetailForm'
};
Ext.define('Ext.Praxis.view.sales.OracleSoaControlDashboardForm.OracleSoaControlDashboardDetailForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.OracleSoaControlDashboardDetailForm',
    requires: [
        'Ext.Praxis.controller.sales.OracleSoaControlDashboard.OracleSoaControlDashboardDetailController'
    ],
    controller: 'OracleSoaControlDashboardDetailController',
    title: 'Dashboard Detail',
    header: true,
    width: 780,
    height: 500,
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
                    id: prototype.DashboardDetail.id+'-boxCpnInfo',
                    hidden: false,
                    width: 750,
                    height: 480,
                    layout: 'fit',
                    autoScroll: true,
                    bodyStyle: 'background:#E8F9E8',
                    items: [
                        //<editor-fold defaultstate="collapsed" desc="gridDashboardDetail">
                        {
                            xtype: 'grid',
                            id: prototype.DashboardDetail.id+'-gridDashboardDetail',
                            margin: '5 0',
                            bodyStyle: 'background:#E6EFF5',
                            height: 170,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    style: 'font-size:9px'
                                },
                                items: [
                                    {
                                        xtype: 'gridcolumn',
                                        width: 60,
                                        dataIndex: 'A3702MODUL',
                                        text: 'Module'
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 50,
                                        dataIndex: 'FLAG',
                                        text: 'Status'
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 400,
                                        dataIndex: 'A3702OBSER',
                                        text: 'Information'
                                    },
                                    { 
                                        text: "Register", 
                                        columns: [
                                            { text: "Date", dataIndex: "FECCR", width: 70 },
                                            { text: "Time", dataIndex: "HORCR", width: 55 },
                                            { text: "User", dataIndex: "A3702USRCR", width: 70 }
                                        ]
                                    }
                                ]
                            }
                        }
                        //</editor-fold>
                    ]
                }
            ]
        }
    ]
});