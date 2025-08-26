Ext.define('Ext.Praxis.view.payments.PaymentScheduleForm.Info', {
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
                width: 1380,
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
                            width: 1307,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridPaySchedule',
                                    width: 1264,
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
                                            
                                            {text: 'AGENT', dataIndex: 'SAGENT', width: 95, hidden: false, align: 'center',},

                                            {text: 'AGENT NAME', dataIndex: 'NAMEAG', width: 305, align: 'left',style: { textAlign: 'center' }},

                                            {text: 'PAYMENT PERIODS', dataIndex: 'DFREQPAY', width: 500, align: 'left',style: { textAlign: 'center' }},
                                            
                                            {text: 'COUNTRY', dataIndex: 'SCOUNTRY', width: 85, align: 'center'},

                                            {text: 'GROUP', dataIndex: 'AGROUPD', width: 105, align: 'center'},

                                            {text: 'PAYMENT TYPE', dataIndex: 'TVENTA', width: 120, align: 'center'},
                                            
                                            
                                           
                                            
                                            
                                            
                                            
                                            
                                                
                                            
                                    
 

                                           
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                width: 42,
                                                text: 'Edit',
                                                align: 'center',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-edit',
                                                        tooltip: 'Edit',
                                                        handler: 'onEditClick'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                
                                { xtype: 'tbspacer', height: 20 },
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


