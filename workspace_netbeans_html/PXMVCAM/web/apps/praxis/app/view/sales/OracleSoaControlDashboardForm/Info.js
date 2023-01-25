/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.OracleSoaControlDashboardForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    style: 'margin: 1px;',
    items: [
        {
            region: 'center',
            id: prototype.id + '-regionCenterGrid01',
            //width: 950,
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: white;',
                border: false,
                align: 'center'
            },
            items: [
                {
                    xtype: 'grid',
                    padding: '20 0 0 0',
                    id: prototype.id + '-gridData',
                    height: 510,
                    width: 920,
                    border:true,
                    columnLines: true,
                    resizable: false,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            resizable: true,
                            align: 'center'
                        },
                        items: [
                            { text: "Module", dataIndex: "A3701MODUL", flex: 1,
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = ' color:#008FE3;text-align:center; margin-right:0px ; background:#d5f4d5; ';
                                    return ('<a href="#">' + value + '</a>');
                                },
                                listeners: {
                                    click: 'lnkModule_clickHandler'
                                }
                            },
                            { text: "Status", dataIndex: "FLAG", width: 60 },
                            { text: "SCHEDULE", dataIndex: "SCHEDULE", width: 60,hidden:true },
                            { 
                                text: "Last modification", 
                                columns: [
                                    { text: "Date", dataIndex: "FECAC", width: 85 },
                                    { text: "Time", dataIndex: "HORAC", width: 85 },
                                    { text: "User", dataIndex: "A3701USRAC", width: 85 }
                                ]
                            },
                            { 
                                text: "Scheduled maintenance", 
                                columns: [
                                    { text: "Start Date", dataIndex: "FPROGINI", width: 85 },
                                    { text: "Start Time", dataIndex: "HPROGINI", width: 85 },
                                    { text: "End Date", dataIndex: "FPROGFIN", width: 85 },
                                    { text: "End Time", dataIndex: "HPROGFIN", width: 85 },
                                    { text: "User", dataIndex: "A3701USRPR", width: 85 }
                                ]
                            },
                            { text: "Switch", dataIndex: "FLAG", width: 70,
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                metaData.style = ' color:#008FE3;text-align:center; margin-right:0px ; background:#d5f4d5; ';
                                return ('<a href="#">' + value + '</a>');
                            },
                            listeners: {
                                click: 'lnkSwitch_clickHandler'
                            }}
                        ]
                    }
                }
            ]
        },
        {
            region: 'south',
            layout: 'border',
            height: 0,
            defaults: {
                style: 'margin: 2px;',
                bodyStyle: 'background: transparent;',
                border: false
            },
            items: [
            ]
        }
    ]
}
);

