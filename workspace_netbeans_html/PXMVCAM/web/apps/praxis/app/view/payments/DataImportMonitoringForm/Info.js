Ext.define('Ext.Praxis.view.payments.DataImportMonitoringForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    bodyStyle: 'background-color: #E3EAEF;border: none;',

    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            margin: '20px 0 0 0',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: 1420,
                height: 'auto',
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    border: false,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        // --------------------------   GRID MAIN DATA---------------------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            border: false,
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            height: 655,
                            width: 1417,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataImport',
                                    width: 1344,
                                    hidden: false,
                                    columnLines: true,
                                    height: 490,
                                    viewConfig: {
                                        enableTextSelection: true
                                    },
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [

                                            {text: 'ID', dataIndex: 'PROCID', width: 40, hidden: false, align: 'center'},

                                            {text: 'PROCESS NAME', dataIndex: 'PROCNAME', width: 90, align: 'left', style: {textAlign: 'center'}},

                                            {text: 'DESCRIPTION', dataIndex: 'PROCDESC', width: 200, align: 'left', style: {textAlign: 'center'}},

                                            {
                                                text: 'STATUS',
                                                dataIndex: 'PROCSTATUS',
                                                width: 80,
                                                align: 'center',
                                                renderer: function (value) {

                                                    switch (value) {
                                                        case 'I':
                                                            return 'Iniciado';
                                                        case 'F':
                                                            return 'Finalizado';
                                                        case 'E':
                                                            return 'Error';
                                                        default: return value || '';
                                                    }
                                                }
                                            },

                                            {text: 'COUNTRY', dataIndex: 'PROCPAIS', width: 50, align: 'center'},

                                            {text: 'MESSAGE', dataIndex: 'PROCMESSAG', width: 240, align: 'center'},

                                            {text: 'PROGRAM', dataIndex: 'CPROGRAM', width: 80, align: 'center'},

//                                            {text: 'FILE', dataIndex: 'PROCFILE', width: 300, align: 'center'},

                                            {text: 'DATE', dataIndex: 'PROCDATE', width: 80, align: 'center'},

                                            {text: 'BEGIN', dataIndex: 'PROCINI', width: 80, align: 'center'},

                                            {text: 'END', dataIndex: 'PROCFIN', width: 80, align: 'center'}














//                                            {
//                                                sortable: false,
//                                                xtype: 'actioncolumn',
//                                                width: 42,
//                                                text: 'Edit',
//                                                align: 'center',
//                                                items: [
//                                                    {
//                                                        iconCls: 'prx-icon-edit',
//                                                        tooltip: 'Edit',
//                                                        handler: 'onEditClick'
//                                                    }
//                                                ]
//                                            }
                                        ]
                                    }
                                },

                                {xtype: 'tbspacer', height: 20},
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-pie',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    border: false,
                                    width: 800,
                                    height: 25,
                                    bodyStyle: 'background-color: #E1E6EC; border-radius: 5px;',
//                            margin: '15px 0 0px 0px',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            width: 850,
                                            height: 25,
                                            bodyStyle: 'background-color: #6A8BAA; border: 1px solid #81BEF7; border-radius: 5px',
                                            layout: {
                                                type: 'hbox',
                                                pack: 'center'
                                            },
                                            defaults: {
                                                xtype: 'label'
                                            },
                                            items: [
                                                {
                                                    text: 'Page',
                                                    width: 50,
                                                    style: 'margin-top: 3px;color:white;font-weight:bold'
                                                },
                                                {
                                                    id: prototype.id + '-lbl-currentPage',
                                                    text: '1',
                                                    width: 50,
                                                    style: 'margin-top: 3px;color:white;font-weight:bold'
                                                },
                                                {
                                                    text: 'OF',
                                                    width: 50,
                                                    style: 'margin-top: 3px;color:white;font-weight:bold'
                                                },
                                                {
                                                    id: prototype.id + '-lbl-pageCount',
                                                    text: '0',
                                                    width: 50,
                                                    style: 'margin-top: 3px;color:white;font-weight:bold'
                                                },
                                                {xtype: 'tbspacer', width: 50},
                                                {
                                                    text: 'Total Found',
                                                    width: 80,
                                                    style: 'margin-top: 3px;color:white;font-weight:bold'
                                                },
                                                {
                                                    id: prototype.id + '-lbl-total',
                                                    text: '0',
                                                    width: 40,
                                                    style: 'margin-top: 3px;color:white;font-weight:bold'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
);


