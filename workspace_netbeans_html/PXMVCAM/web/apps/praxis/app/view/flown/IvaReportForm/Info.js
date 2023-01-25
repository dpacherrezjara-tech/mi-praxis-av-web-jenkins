Ext.define('Ext.Praxis.view.flown.IvaReportForm.Info', {
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
            id: prototype.id + '-boxMainData',
            hidden: false,
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: prototype.widthGrid,
                height: 510,
                align: 'center'
            },
            items: [
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridData',
                    width: prototype.widthGrid,
                    height: 510,
                    hidden: false,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'Nbr', width: 50, dataIndex: 'RN'},
                            //{text: 'CIA', width: 75, dataIndex: 'CIA'},
                            {text: 'Airline_Code', width: 100, dataIndex: 'AIRCODE'},
                            {text: 'Airline_Name', width: 100, dataIndex: 'AIRNAME'},
                            {text: 'AUDIT',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    columnLines: true
                                },
                                columns: [
                                    {text: 'Ticket Number', width: 150, dataIndex: 'TICKET'},
                                    {text: 'Coupon Number', width: 150, dataIndex: 'CUPON'},
                                    //{text: 'SEQ', width: 75, dataIndex: 'SEQ'},
                                    {text: 'Flown Flight Date', width: 170, dataIndex: 'DFLIGHT'},
                                    {text: 'Flown Flight Period', width: 200, dataIndex: 'PFLIGHT'},
                                    {text: 'Flown Flight Number', width: 200, dataIndex: 'NFLIGHT'},
                                    {text: 'Carrier', width: 100, dataIndex: 'CARR'},
                                    {text: 'Stock', width: 100, dataIndex: 'STOCK'},
                                    {text: 'ORIGEN LEG', width: 100, dataIndex: 'ORI'},
                                    {text: 'DESTINO LEG', width: 100, dataIndex: 'DES'},
                                    {text: 'Amount Revenue', width: 150, dataIndex: 'AMOUREV'},
                                    {text: 'TCAMBIO REV A MXN', width: 170, dataIndex: 'TCREV'},
                                    {text: 'AMOUNT LOC A MXN', width: 170, dataIndex: 'AMOULOC'},
                                    {text: 'Cuenta Contable cat', width: 320, dataIndex: 'CTACONT'},
                                    {text: 'CUENTA', width: 100, dataIndex: 'CTA'},
                                    {text: 'SUBCUENTA', width: 100, dataIndex: 'SUBCTA'},
                                    {text: 'Periodo Contable', width: 200, dataIndex: 'PERIODO'},
                                    {text: 'TITULO CONTABLE', width: 220, dataIndex: 'TITULO'},
                                ]
                            },
                            {text: 'Tipo de Ingreso', width: 200, dataIndex: 'TIPOING'},
                            {text: 'Item', width: 100, dataIndex: 'ITEM'},
                            {text: 'Clasificación de Vuelo', width: 200, dataIndex: 'CLASOD'},
                            {text: 'Tipo Documento', width: 150, dataIndex: 'TIDOCOD'},
                            {text: 'Tipo Transacción', width: 170, dataIndex: 'TITRANOD'},
                            {text: 'VOL/INVOL', width: 100, dataIndex: 'VOLINVOL'},
                            {text: 'Ruta Boleto Completo', width: 200, dataIndex: 'RUTAOD'},
                            //{text: 'Iva Origen Destino', width: 200, dataIndex: 'ORIDES'},
                            {text: 'SEGUN OD',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    columnLines: true
                                },
                                columns: [
                                    {text: 'Base Gravable', width: 150, dataIndex: 'BASEGRAOD'},
                                    {text: 'Tasa IVA', width: 75, dataIndex: 'IVAOD'},
                                    {text: 'OD', width: 200, dataIndex: 'ORIDES'},
                                    {text: 'CONEXIONES IR', width: 150, dataIndex: 'CNXOD'},
                                    {text: 'Tasa s/OD', width: 150, dataIndex: 'TASAOD'}
                                ]
                            },
                            {text: 'SEGUN CALCULO VTA',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    columnLines: true
                                },
                                columns: [
                                    {text: 'Base Gravable', width: 150, dataIndex: 'BASEGRAVT'},
                                    {text: 'Tasa IVA', width: 150, dataIndex: 'TASAIVAVT'},
                                    {text: 'LOCAL CURR', width: 150, dataIndex: 'CURRLOCVT'},
                                    {text: 'Ruta Fare Calc', width: 150, dataIndex: 'RUTFCALVT'},
                                    {text: 'TARIFA BOLETO LOCAL', width: 170, dataIndex: 'TARIFALOC'},
                                    {text: 'YQ LOCAL', width: 75, dataIndex: 'YQLOCVT'},
                                    {text: 'IVA COBRADO LOCAL', width: 200, dataIndex: 'IVALOCVT'},
                                    {text: 'Tasa IVA s/venta', width: 150, dataIndex: 'IVAVTA'}
                                ]
                            },
                            {text: 'Marca IVA', width: 75, dataIndex: 'MARCAIVA'},
                            {text: 'SEGUN OD FARE CALC',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    columnLines: true
                                },
                                columns: [
                                    {text: 'Base Gravable', width: 150, dataIndex: 'BASEGRAOD2'},
                                    {text: 'Tasa IVA', width: 75, dataIndex: 'IVAOD2'},
                                    {text: 'OD Fare Calc', width: 150, dataIndex: 'ODFCALVT'},
                                    {text: 'Ruta Fare Calc', width: 150, dataIndex: 'RUTFCALOD'},
                                    {text: 'CONEXIONES IR', width: 170, dataIndex: 'CNXIR'},
                                    {text: 'Tasa s/OD', width: 75, dataIndex: 'TASAOD2'}
                                ]
                            }
                        ]
                    }
                },
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
