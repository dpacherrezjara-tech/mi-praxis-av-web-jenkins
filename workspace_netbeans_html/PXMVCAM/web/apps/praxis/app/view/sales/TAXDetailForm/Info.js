/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.TAXDetailForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    style: 'margin: 1px;',
    items: [
        {
            region: 'center',
            id: prototype.id + '-regionCenterGrid01',
            width: 1500,
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
//                {
//                    xtype: 'label',
//                    id: prototype.id + '-labelTitle',
//                    labelAlign: 'center',
//                    labelStyle: 'color:#231223',
//                    align: 'center',
//                    margin: '10 0 0 0',
//                    hide:true
//                },
                // --------------------------   GRID MAIN DATA---------------------
                //-----------------------------------------------------------------
                {
                    xtype: 'grid',
                    padding: '20 0 0 0',
                    id: prototype.id + '-gridData',
                    height: 530,
                    width: 1460,
                    columnLines: true,
                    resizable: false,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            //resizable: false,
                            align: 'center'
                        },
                        items: [
                            {text: 'Processing<br> Date', width: 80, dataIndex: 'FECPROC'},
                            {text: 'Sales<br> Date', width: 80, dataIndex: 'FECVTA'},
                            {text: 'Group', width: 80, dataIndex: 'GRUPO'},
                            {text: 'IATA', width: 80, dataIndex: 'IATA'},
                            {text: 'Name', width: 100, dataIndex: 'NOMBRE'},
                            {text: 'Ticket', width: 100, dataIndex: 'NROBOLETO'},
                            {text: 'Flag', width: 40, dataIndex: 'FLAG'},
                            {text: 'Itinerary', width: 150, dataIndex: 'ITINERARIO',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:left; margin-left:0px;';
                                    return value;
                                }
                            },
                            {text: 'Transaction', width: 80, dataIndex: 'TRANSACCION'},
                            {text: 'Country<br>Tax', width: 60, dataIndex: 'COUNTRYTAX'},
                            {text: 'TAX', width: 40, dataIndex: 'Tax'},
                            {text: 'ATO', width: 40, dataIndex: 'ATO'},
                            {text: 'Currency<br>Local', width: 90, dataIndex: 'CODMONEDA'},
                            {text: 'Amount<br>Local', width: 90, dataIndex: 'IMPMDAORI',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:0px;';
                                    return  Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'Amount<br>Revenue', width: 90, dataIndex: 'IMPMDAREV',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:0px;';
                                    return  Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'Accounting<br>Date', width: 120, dataIndex: 'FECCONT'},
                            {text: 'Accounting<br>ID', width: 140, dataIndex: 'ACOUNTID'}
                            //{text: 'Account', width: 140, dataIndex: 'CUENT'}


                        ]
                    }
                }
                ,
                /** PAGINATION LABELS*/
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
                        border: true,
                        padding: '0px 1px 0px 1px'
                    },
                    padding: '1px 1px 1px 1px',
                    items: [
                        {
                            xtype: 'panel',
                            width: 1460,
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
}
);

