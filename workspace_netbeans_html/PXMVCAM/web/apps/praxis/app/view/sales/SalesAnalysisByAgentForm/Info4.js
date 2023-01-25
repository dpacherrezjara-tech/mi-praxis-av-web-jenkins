
Ext.define('Ext.Praxis.view.sales.SalesAnalysisByAgentForm.Info4', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info4',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id + '-boxPrincipal',
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
                    id: prototype.id + '-boxMainData',
                    border: false,
                    width: prototype.widthContenedor,
                    hidden: false,
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
                        // <editor-fold defaultstate="collapsed" desc="gridData">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData04',
                            width: prototype.widthGrid,                            
                            height: 545,
                            columnLines: true,
                            autoScroll:true,
                            columns: {
                                items: [                                    
                                    {text: '', dataIndex: 'RN', width: 40,  locked: true, align: 'right',renderer: 'onStringRenderer03'},
                                    {text: 'Code', dataIndex: 'IATA', width: 65, locked: true,  renderer: 'onStringRenderer03'},
                                    {text: 'Agent', dataIndex: 'AGENTE', width: 150, locked: true,  align: 'left', renderer: 'onStringRenderer03'},
                                    {text: 'Type', dataIndex: 'FUENTE', width: 50,  renderer: 'onStringRenderer03'},
                                    {text: 'Sub<br>Type', dataIndex: 'SUBFUENTE', width: 50,  renderer: 'onStringRenderer03'},
                                    {text: 'Ctr', dataIndex: 'PAIS', width: 40, renderer: 'onStringRenderer03'},
                                    {text: 'St', dataIndex: 'ESTADO', width: 40,  renderer: 'onStringRenderer03'},
                                    {text: 'Sale', dataIndex: 'VENTAS', width: 90,  renderer: 'onAmountRenderer03', align: 'right'}, // green
                                    {text: 'Exch', dataIndex: 'CANJES', width: 90, renderer: 'onAmountRenderer03', align: 'right'}, //green
                                    {text: 'Total', dataIndex: 'TOTALVENT', width: 90, renderer: 'onAmountRenderer03_suma', align: 'right'},
                                    {text: 'Cpn', dataIndex: 'CANTCPN', width: 90, renderer: 'onCantRenderer03', align: 'right'},
                                    {text: 'Comm', dataIndex: 'COMISION', width: 90, renderer: 'onAmountRenderer03_resta', align: 'right'}, //red
                                    {text: 'Interline<br>Payable', dataIndex: 'INTERLINE', width: 90, renderer: 'onAmountRenderer03_resta', align: 'right'}, //red
                                    {text: 'Comm<br>Interline', dataIndex: 'COMMINTER', width: 90, renderer: 'onAmountRenderer03_suma', align: 'right'}, //green
                                    {text: 'Refund', dataIndex: 'REEMBOLSO', width: 90, renderer: 'onAmountRenderer03_resta', align: 'right'}, //red
                                    {text: 'Exch<br>Orig', dataIndex: 'REVISADOS', width: 90, renderer: 'onAmountRenderer03_resta', align: 'right'}, //red
                                    {text: 'Gds', dataIndex: 'GDS', width: 90, renderer: 'onAmountRenderer03_resta', align: 'right'}, //red
                                    {text: 'Net', dataIndex: 'NETO', width: 90, renderer: 'onAmountRenderer03', align: 'right'}, //green
                                    {text: '%<br>Net', dataIndex: 'PORVTANET', width: 40, renderer: 'onAmountPorRenderer03', align: 'center'}// ( NETO/TOTALVENT ) * 100  green
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            viewConfig: {
                                trackOver: true,
                                stripeRows: true,
                                enableTextSelection: true,
                                markDirty: false,
                                getRowClass: function(record, rowIndex, rowParams, store) {
                                    if (rowIndex % 2 === 0)
                                        return 'rowA';
                                }
                            },
                            trackMouseOver: true
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="pie">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie',
                            width: prototype.widthGrid,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            height: 25,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            defaults: {
                                border: true
                            },
                            padding: '1px 1px 1px 1px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: prototype.widthGrid,
                                    height: 25,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label',
                                        margin: '3px 0px 0px 5px'
                                    },
                                    items: [
                                        {
                                            text: 'Page',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id + '-lbl-currentPage',
                                            text: '1',
                                            width: 50
                                        },
                                        {
                                            text: 'Of',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id + '-lbl-pageCount',
                                            text: '0',
                                            width: 50
                                        },
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            text: 'Total Records',
                                            width: 80
                                        },
                                        {
                                            id: prototype.id + '-lbl-total',
                                            text: '0',
                                            width: 50
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