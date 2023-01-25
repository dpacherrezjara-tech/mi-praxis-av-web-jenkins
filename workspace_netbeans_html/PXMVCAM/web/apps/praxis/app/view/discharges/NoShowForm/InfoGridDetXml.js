
Ext.define('Ext.Praxis.view.discharges.NoShowForm.InfoGridDetXml', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id02 + '-infoGridDetXml',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id02 + '-boxPrincipal',
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
                    id: prototype.id02 + '-boxMainData',
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
                            id: prototype.id02 + '-gridData',
                            columnLines: true,
                            width: '100%',
                            height: 480,
                            autoScroll: true,
                            padding: '0px 5px 1px 5px',
                            columns: {
                                items: [
                                    {
                                        xtype: 'actioncolumn',                                        
                                        sortable: false,
                                        width: 35,
                                        align: 'center',
                                        locked: false,
                                        items: [
                                            {
                                                iconCls: 'prx-icon-detail',
                                                tooltip: 'Ver detalle boleto',
                                                handler: 'onDetailClick_viewXmlTicket'
                                            }
                                        ]
                                    },
                                    {text: 'Ticket', dataIndex: 'TICKET_NUMBER', align: 'left', width: 110},
                                    {text: 'Sec.', dataIndex: 'SEQ', align: 'center', width: 40},
                                    {
                                        text: 'Result <br>Code', dataIndex: 'OPRESULTCODE', align: 'center', width: 80,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            if(record.get('OPRESULTCODE') === '00')metaData.style = 'font-weight:bold;color:green;';
                                            if(record.get('OPRESULTCODE') !== '00')metaData.style = 'font-weight:bold;color:red;';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Result <br>Description', dataIndex: 'OPRESULTDESCRIPTION', align: 'left', width: 120,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            if(record.get('OPRESULTCODE') === '00')metaData.style = 'font-weight:bold;color:green;';
                                            if(record.get('OPRESULTCODE') !== '00')metaData.style = 'font-weight:bold;color:red;';
                                            return value;
                                        }
                                    },                                    
                                    {
                                        xtype: 'actioncolumn',
                                        text:'XML',
                                        sortable: false,
                                        width: 40,
                                        align: 'center',
                                        locked: false,
                                        items: [
                                            {
                                                iconCls: 'prx-icon-download',
                                                tooltip: 'Ver XML',
                                                handler: 'onDetailClick_viewXml'
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Datos de registro',
                                        columns: [
                                            {text: 'Usuario', dataIndex: 'USRIN', width: 70, align: 'center'},
                                            {text: 'Fecha-hora', dataIndex: 'FECIN', width:120, align: 'left'}
                                        ]
                                    }
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
                            id: prototype.id02 + '-pie',
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
                                    id: prototype.id02 + '-boxPaginacion',
                                    width: '99%',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'toolbar',
                                            cls: 'x-toolbar-pag',
                                            items: [
                                                {
                                                    xtype: 'pagingtoolbar',
                                                    id: prototype.id02 + '-paggin',
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
