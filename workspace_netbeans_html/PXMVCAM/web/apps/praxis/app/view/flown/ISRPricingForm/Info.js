Ext.define('Ext.Praxis.view.flown.ISRPricingForm.Info', {
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
            id: prototype.id + '-vskMain',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                height: 615,
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
                        height: 615,
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
                                        text: 'Sale Date', dataIndex: 'strFormatDate', width: 100
                                    },
                                    {
                                        text: 'Ticketss', dataIndex: 'A728NRODOC', width: 130,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var sData = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[rowIndex].data;
                                            value = sData.A728CIA+' '+sData.A728NRODOC+' '+sData.A728CUPON;
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'MDA-TRF', dataIndex: 'A728MONEDA', width: 80
                                    },
                                    {
                                        text: 'Tarifa', dataIndex: 'A728TARIFA', width: 80
                                    },
                                    {
                                        text: 'Carrier Alf', dataIndex: 'A728CARRA1', width: 80
                                    },
                                    {
                                        text: 'From', dataIndex: 'A728RUTAO', width: 80,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.tdAttr = 'data-qtip="' + data.strDescORIG+'"';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'To', dataIndex: 'A728RUTAD', width: 80,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.tdAttr = 'data-qtip="' + data.strDescDEST+'"';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Flight Nbr', dataIndex: 'A728NVLO1', width: 100
                                    },
                                    {
                                        text: 'Booking Cod', dataIndex: 'A728BOOKI1', width: 100
                                    },
                                    {
                                        text: 'Class', dataIndex: 'A728CLASE1', width: 80
                                    },
                                    {
                                        text: 'Fare Basis', dataIndex: 'A728FBASE1', width: 100,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Currency', dataIndex: 'A728MONREG', width: 80
                                    },
                                    {
                                        text: 'Value', dataIndex: 'A728VALOR1', width: 100,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
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