
Ext.define('Ext.Praxis.view.discharges.NoShowForm.InfoGridDetErr', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id05 + '-infoGridDetErr',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id05 + '-boxPrincipal',
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
                    id: prototype.id05 + '-boxMainData',
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
                            id: prototype.id05 + '-gridData',
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
                                            return record.get('A3934CIA')+record.get('A3934FORMA')+record.get('A3934SERIE');
                                        }
                                    },
                                    {text: 'Cpn', dataIndex: 'A3934CUPON', align: 'center', width: 40, locked: true},
                                    {text: 'Corrl.', dataIndex: 'A3934CORRL', align: 'center', width: 55,locked: true},
                                    {text: 'Archivo', dataIndex: 'A3934ARCH', align: 'center', width: 60},
                                    {text: 'Cod. Err.', dataIndex: 'A3934CODER', align: 'center', width: 60},    
                                    {text: 'Descrip. Err.', dataIndex: 'A3934DATA', align: 'center', width: 180},        
                                    {text: 'Estado', dataIndex: 'A3934STSER', align: 'center', width: 60},        
                                    {
                                        text: 'Registro',
                                        columns: [
                                            {text: 'Usuario', dataIndex: 'A3934USRIN', width: 70, align: 'center'},
                                            {text: 'Fecha', dataIndex: 'A3934FECIN', width:70, align: 'left'},
                                            {text: 'Hora', dataIndex: 'A3934HORIN', width:45, align: 'left'}
                                        ]
                                    },
                                    {
                                        text: 'Actualización',
                                        columns: [
                                            {text: 'Usuario', dataIndex: 'A3934USRAC', width: 70, align: 'center'},
                                            {text: 'Fecha', dataIndex: 'A3934FECAC', width:70, align: 'left'},
                                            {text: 'Hora', dataIndex: 'A3934HORAC', width:45, align: 'left'}
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
                            id: prototype.id05 + '-pie',
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
                                    id: prototype.id05 + '-boxPaginacion',
                                    width: '99%',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'toolbar',
                                            cls: 'x-toolbar-pag',
                                            items: [
                                                {
                                                    xtype: 'pagingtoolbar',
                                                    id: prototype.id05 + '-paggin',
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
