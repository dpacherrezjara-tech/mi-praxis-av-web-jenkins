Ext.define('Ext.Praxis.view.flown.CanceledFlightsForm.Info', {
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
            id: prototype.id + '-boxContenGrid',
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
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        width: prototype.widthGrid,
                        height: 647,
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridData">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData',
                            width: prototype.widthGrid,
                            height: 520,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Flight Date', dataIndex: 'DFLIGHT', width: 100,
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescORIG+'"';
                                                    return value;
                                                }
                                    },
                                    {
                                        text: 'Number Flight', dataIndex: 'NFLIGHT', width: 100,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescORIG+'"';
                                                    return value;
                                                }
                                    },
                                    {
                                        text: 'Status', dataIndex: 'STVAL', width: 80,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescORIG+'"';
                                                    return value;
                                                }
                                    },
                                    {
                                        text: 'Departure Airport', dataIndex: 'CDEPART', width: 100,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescORIG+'"';
                                                    return value;
                                                }
                                    },
                                    {
                                        text: 'Arrival Airport', dataIndex: 'CARRIVA', width: 100,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescORIG+'"';
                                                    return value;
                                                }
                                    },
                                    {
                                        text: 'Time Local <br> Depart', dataIndex: 'LOCDEP', width: 100,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                   
                                                    return value;
                                                }
                                    },
                                    {
                                        text: 'UTC Local <br> Arrival', dataIndex: 'LOCARR', width: 100,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    
                                                    return value;
                                                }
                                    },
                                    {
                                        text: 'UTC Local <br> Depart', dataIndex: 'UTCDEP', width: 100,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    
                                                    return value;
                                                }
                                    },
                                    {
                                        text: 'UTC Local <br> Arrival', dataIndex: 'UTCARR', width: 100,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    
                                                    return value;
                                                }
                                    },
                                    {
                                        text: 'User create', dataIndex: 'USCR', width: 100,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    
                                                    return value;
                                                }
                                    },
                                    {
                                        text: 'Date Create', dataIndex: 'FECR', width: 100,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescORIG+'"';
                                                    return value;
                                                }
                                    },
                                    {
                                        text: 'Hour Create', dataIndex: 'HOCR', width: 100,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescORIG+'"';
                                                    return value;
                                                }
                                    }
                                ]
                            }
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="pie">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie',
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
                        // </editor-fold>
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