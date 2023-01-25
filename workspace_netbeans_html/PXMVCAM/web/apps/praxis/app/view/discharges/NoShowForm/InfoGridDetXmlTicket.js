
Ext.define('Ext.Praxis.view.discharges.NoShowForm.InfoGridDetXmlTicket', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id04 + '-infoGridDetXmlTicket',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id04 + '-boxPrincipal',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'center'
            },
            items: [
                {
                    region: 'center',
                    id: prototype.id04 + '-boxMainData',
                    border: false,
                    width: '100%',
                    hidden: false,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        align: 'left'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="grid">
                        {
                            xtype: 'grid',
                            id: prototype.id04 + '-gridData',
                            columnLines: true,                            
                            width: '100%',
                            height: 240,                           
                            padding: '0px 5px 1px 5px',
                            columns: {
                                items: [                                    
                                    {
                                        text: 'Ticket', dataIndex: 'TICKET_NUMBER', align: 'left', width: 110,locked: true,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {                                            
                                            return record.get('A3936CCIA')+record.get('A3936FORMA')+record.get('A3936SERIE');
                                        }
                                    },                                    
                                    {text: 'Cpn', dataIndex: 'A3936CUPON', align: 'center', width: 35,locked: true},
                                    {text: 'Start<br>Location', dataIndex: 'A3936ORIG', align: 'center', width: 65},
                                    {text: 'End<br>Location', dataIndex: 'A3936DEST', align: 'center', width: 65},
                                    {text: 'Marketing<br>Provider', dataIndex: 'A3936CARA', align: 'center', width: 75},
                                    {text: 'Marketing<br>Flight Number', dataIndex: 'A3936NVLO', align: 'center', width: 75},
                                    {text: 'Start<br>Date', dataIndex: 'A3936FVLO', align: 'center', width: 85},                                    
                                    {text: 'Start<br>Time', dataIndex: 'A3936HVLO', align: 'center', width: 65},
                                    {text: 'Class', dataIndex: 'A3936CLAS', align: 'center', width: 55},
                                    {text: 'FareBasis', dataIndex: 'A3936FBUS', align: 'center', width: 90},
                                    {text: 'Ticket<br>Designator', dataIndex: 'A3936TDSG', align: 'center', width: 75},
                                    {text: 'Booking<br>Status', dataIndex: 'A3936BSTA', align: 'center', width: 65},
                                    {text: 'Current<br>Status', dataIndex: 'A3936CSTA', align: 'center', width: 65}                                                                        
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            viewConfig: {
                                stripeRows: true,
                                enableTextSelection: true,
                                markDirty: false,
                                getRowClass: function (record, rowIndex, rowParams, store) {
                                    if (rowIndex % 2 === 0)
                                        return 'rowA';
                                }
                            },
                            trackMouseOver: true,
                            scope: this,
                            listeners: {
                                scope: this,
                                afterrender: function (obj) {

                                }
                            }
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="pie">
                        {
                            xtype: 'panel',
                            id: prototype.id04 + '-pie',
                            width: '99%',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            height: 35,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            defaults: {
                                border: true
                            },
                            padding: '1px 1px 1px 1px',
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id04 + '-boxPaginacion',
                                    width: '99%',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'toolbar',
                                            cls: 'x-toolbar-pag',
                                            items: [
                                                {
                                                    xtype: 'pagingtoolbar',
                                                    id: prototype.id04 + '-paggin',
                                                    pageSize: 18,
                                                    border: false,
                                                    displayInfo: true,
                                                    hidden: false
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                        // </editor-fold>
                    ]
                }
            ]
        }
    ]
});
