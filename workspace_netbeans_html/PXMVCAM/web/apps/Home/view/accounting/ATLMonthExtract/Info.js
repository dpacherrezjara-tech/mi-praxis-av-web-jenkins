/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - RAVN                                     *
 * Document   : Info                                              *
 * Created on : 18-10-2016, 16:49:50                              *
 * Author     : Ronald Mayta (rmayta)                             *
 *                                                                *
 ******************************************************************
 *                  MIAMI TECHNOLOGY GROUP, INC.                  *
 *                           MIATECH                              *
 *                           OF PERU                              *
 ******************************************************************
 * CODIGO PRG FECHA      CONCEPTO
 * 201601 RMC 18-10-2016 SE CREA PROGRAMA A PEDIDO DE JGG.
 ******************************************************************
 */

/* global Ext */

Ext.define('PXMVCAMHome.view.accounting.ATLMonthExtract.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.accounting-atl-month-extract-form-info',
    layout: 'border',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    margin: '1px 0px 0px 0px',
    items: [
        {
            region: 'center',
            layout: 'border',
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false
            },
            items: [
                {
                    xtype: 'grid',
                    id: 'vATLMonthExtract-gridData',
                    columnLines: true,
                    width: 1450,
                    height: 508,
                    anchor: '100%',
                    border: false,
                    features : [
                        {
//                            id: 'group',
                            dock: 'bottom',
                            ftype: 'summary',
                            remoteRoot : 'summaryData'
                        }
                    ],
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        items: [
                            {text: 'GL Account',            dataIndex: 'GLCODE', width: 120},
                            {text: 'Journal Type',          dataIndex: 'FUENT', width: 90},
                            {text: 'FOP',                   dataIndex: 'FOP', width: 40},
                            {text: 'Card Number',           dataIndex: 'NREF', width: 120},
                            {text: 'Amount',                dataIndex: 'AMOUNT', width: 90, align: 'right',
                                renderer: function (value, metadata) {
                                    metadata.style = 'background-color:#D5F4D5;';
                                    return Ext.util.Format.number(value, '0,000.00');
                                },
                                summaryRenderer: Ext.util.Format.numberRenderer('0,000.00')
                            },
                            {text: 'Fare basis code',       dataIndex: 'FBAS', width: 110},
                            {text: 'Accounting Date',       dataIndex: 'FCONT', width: 110},
                            {text: 'Issue Date',            dataIndex: 'FVTA', width: 80},
                            {text: 'Origin-Destination',    dataIndex: 'OD', width: 120},
                            {text: 'Airline',               dataIndex: 'CARR', width: 60},
                            {text: 'Flight Number',         dataIndex: 'NVLO', width: 100},
                            {text: 'Travel Date',           dataIndex: 'FVLO', width: 80},
                            {text: 'Ticket Number',         dataIndex: 'TICKET', width: 110},
                            {text: 'Coupon Number',         dataIndex: 'CUPON', width: 110},
                            {text: 'Exchange Ticket',       dataIndex: 'EXCHTICKET', width: 110}
                        ]
                    }
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
