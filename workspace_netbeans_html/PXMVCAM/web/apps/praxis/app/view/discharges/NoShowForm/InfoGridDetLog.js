
Ext.define('Ext.Praxis.view.discharges.NoShowForm.InfoGridDetLog', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id06 + '-infoGridDetLog',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id06 + '-boxPrincipal',
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
                    id: prototype.id06 + '-boxMainData',
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
                            id: prototype.id06 + '-gridData',
                            columnLines: true,
                            width: '100%',
                            height: 480,
                            autoScroll: true,
                            padding: '0px 5px 1px 5px',
                            columns: {
                                items: [
                                    {
                                        text: 'Ticket', dataIndex: 'TICKET_NUMBER', align: 'left', width: 110, locked: true,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return record.get('A3980CCIA') + record.get('A3980FORMA') + record.get('A3980SERIE');
                                        }
                                    },
                                    {text: 'Cpn', dataIndex: 'A3980CUPON', align: 'center', width: 38},
                                    {text: 'EMD Related<br> Ticket document', dataIndex: 'A3980TICKA', align: 'left', width: 110},
                                    {text: 'Aplica', dataIndex: 'A3980APLIC', align: 'center', width: 50},
                                    {text: 'Text', dataIndex: 'A3980TEXT', align: 'left', flex: 1}                                    
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
                            id: prototype.id06 + '-pie',
                            width: '99%',
                            align: 'center',
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
                                    id: prototype.id06 + '-boxPaginacion',
                                    width: '99%',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'toolbar',
                                            cls: 'x-toolbar-pag',
                                            items: [
                                                {
                                                    xtype: 'pagingtoolbar',
                                                    id: prototype.id06 + '-paggin',
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
