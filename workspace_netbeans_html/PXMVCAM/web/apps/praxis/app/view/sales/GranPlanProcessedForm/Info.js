Ext.define('Ext.Praxis.view.sales.GranPlanProcessedForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
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
            id: prototype.id + '-boxConsultas',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                height: 647,
                align: 'center'
            },
            items: [
                // <editor-fold defaultstate="collapsed" desc="boxMainData">
                {
                    region: 'center',
                    id: prototype.id + '-boxMainData',
                    hidden: false,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        height: 510,
                        align: 'center'
                    },
                    items: [
                        {
                            xtype:'panel',
                            id:prototype.id + '-group-a',
                            border:false,
                            items:[
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-grid-iata',
                                    width: prototype.widthGrid,
                                    height: 520,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'IATA', dataIndex: 'A1796IATA', width: 70, sortable: false,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Agency Name', dataIndex: 'A003KEY3', width: 180
                                            },
                                            {
                                                text: 'IATA Payment', dataIndex: 'A1796HIATA', width: 90
                                            },
                                            {
                                                text: 'Curr', dataIndex: 'A1796MDA', width: 60
                                            },
                                            {
                                                text: 'Comm.(%)', dataIndex: 'A1796TCAMB', width: 100,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Fare', dataIndex: 'A1796FARE', width: 90
                                            },
                                            {
                                                text: 'Base Commissionable', dataIndex: 'A1796BCOM', width: 90
                                            },
                                            {
                                                text: 'Comm. Taken', dataIndex: 'A1796TCOM', width: 90
                                            },
                                            {
                                                text: 'Comm. Given', dataIndex: 'A1796TCAL', width: 90
                                            },
                                            {
                                                text: 'Difference', dataIndex: 'A1796TDIF', width: 90
                                            },
                                            {
                                                text: 'Comm. Rounded Diff.', dataIndex: 'A1796TDFR', width: 90
                                            },
                                            {
                                                text: 'Rounded IVA', dataIndex: 'A1796TIVAR', width: 90
                                            },
                                            {
                                                text: 'Total Paid', dataIndex: 'A1796TPAGO', width: 90
                                            },
                                            {
                                                text: 'Apply ADM', dataIndex: 'A1796ADM', width: 90
                                            },
                                            {
                                                text: 'ID Lote', dataIndex: 'A1796LOTE', width: 90
                                            },
                                            {
                                                text: 'Status', dataIndex: 'A1796STAT', width: 160,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
                                                    metaData.style = "padding: 0px; margin: 0px";
                                                    var dat = "";
                                                    if(value=="P")dat ="Pending";
                                                    if(value=="D")dat ="IATA Disabled";
                                                    if(value=="C")dat ="Not Client Register";
                                                    if(value=="Y")dat ="processed "+record.get('A1796TRNCO');
                                                    return dat;
                                                }
                                            },
                                            {
                                                text: 'Assign ADM/ACM',
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                width: 39,
                                                align: 'center',
                                                items: [
                                                    {
                                                        id: prototype.id+'-assing',
                                                        iconCls: 'prx-icon-processing',
                                                        tooltip: 'Processing',
                                                        handler: 'onEditClick'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="pie">
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-pie',
                                    width: prototype.widthGrid-2,
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
                                    padding: '1px 0px 1px 0px',
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
                                                    text: 'Total found',
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
                            ]
                        },
                        {
                            xtype:'panel',
                            id:prototype.id + '-group-b',
                            //hidden:true,
                            border:false,
                            items:[
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-grid-tkt',
                                    width: prototype.widthGrid,
                                    height: 520,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'IATA', dataIndex: 'A1802IATA', width: 70, sortable: false,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Ticked Number', dataIndex: 'VP_TICKET', width: 110
                                            },
                                            {
                                                text: 'Issue Date', dataIndex: 'A1802FECEM', width: 110
                                            },
                                            {
                                                text: 'Curr', dataIndex: 'A1802MDA', width: 60
                                            },
                                            {
                                                text: 'Source', dataIndex: 'A1802MDA', width: 60
                                            },
                                            {
                                                text: 'PNR', dataIndex: 'A1802PNR', width: 90
                                            },
                                            {
                                                text: 'Fare', dataIndex: 'A1802GRUPO', width: 80
                                            },
                                            {
                                                text: 'Base Commissionable', dataIndex: 'A1802GRUPO', width: 105
                                            },
                                            {
                                                text: 'Comm. Taken', dataIndex: 'A1802GRUPO', width: 90
                                            },
                                            {
                                                text: 'Comm. Given', dataIndex: 'A1802GRUPO', width: 90
                                            },
                                            {
                                                text: 'Difference', dataIndex: 'A1802GRUPO', width: 90
                                            },
                                            {
                                                text: 'Rounded Diff.', dataIndex: 'A1802GRUPO', width: 90
                                            },
                                            {
                                                text: 'Id Lote', dataIndex: 'A1802GRUPO', width: 100
                                            },
                                            {
                                                text: 'Group', dataIndex: 'A1802GRUPO', width: 80
                                            }
                                        ]
                                    }
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="pie">
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-pie2',
                                    width: prototype.widthGrid-2,
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
                                    padding: '1px 0px 1px 0px',
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
                                                    id: prototype.id + '-lbl-currentPage2',
                                                    text: '1',
                                                    width: 50
                                                },
                                                {
                                                    text: 'Of',
                                                    width: 50
                                                },
                                                {
                                                    id: prototype.id + '-lbl-pageCount2',
                                                    text: '0',
                                                    width: 50
                                                },
                                                {xtype: 'tbspacer', width: 100},
                                                {
                                                    text: 'Total found',
                                                    width: 80
                                                },
                                                {
                                                    id: prototype.id + '-lbl-total2',
                                                    text: '0',
                                                    width: 50
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
                // </editor-fold>
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
});