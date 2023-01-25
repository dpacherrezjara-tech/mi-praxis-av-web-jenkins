/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Ext.Praxis.view.interline.ExchangeForm.Info', {
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
            //width: 1550,
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
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '1',
                    margin: '1',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        // --------------------------   GRID MAIN DATA---------------------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #E3EAF9;',
                            padding: '1',
                            margin: '1',
                            //width: 100,    
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-labelTitle1',
                                    labelAlign: 'center',
                                    labelStyle: 'color:#231223',
                                    align: 'center',
                                    margin: '10 0 0 0',
                                    hide: true
                                },
                                {
                                    xtype: 'grid',
                                    padding: '20 0 0 0',
                                    id: prototype.id + '-gridData',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 560,
                                    width: 1742,
                                    columnLines: true,
                                    resizable: false,
//                                    features: [{
//                                            ftype: 'summary'
//                                        }
//                                    ],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Sale <br>Date', width: 80, dataIndex: 'strFormatDate'},
                                            {text: 'Ticket', width: 110, dataIndex: 'strDescripcion'},
                                            {text: 'Fare',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Curr.', width: 80, dataIndex: 'A720MONEDA'},
                                                    {text: 'Amount', width: 80, dataIndex: 'A720TARIFA', renderer: 'getDouble'}
                                                ]
                                            },
                                            {text: 'New', width: 110, dataIndex: 'strDescripcion5'},
                                            {text: 'Flight 1',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Date', width: 80, dataIndex: 'strFormatDate1', renderer: 'getStringColor1'},
                                                    {text: 'Sector', width: 80, dataIndex: 'strDescripcion1', renderer: 'getStringColor1'},
                                                    {text: 'Carr', width: 80, dataIndex: 'A720CARRA1', renderer: 'getStringColor1'},
                                                    {text: 'Value', width: 80, dataIndex: 'A720VALOR1', renderer: 'getDoubleColor1'}
                                                ]
                                            },
                                            {text: 'Flight 2',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Date', width: 80, dataIndex: 'strFormatDate2', renderer: 'getStringColor2'},
                                                    {text: 'Sector', width: 80, dataIndex: 'strDescripcion2', renderer: 'getStringColor2'},
                                                    {text: 'Carr', width: 80, dataIndex: 'A720CARRA2', renderer: 'getStringColor2'},
                                                    {text: 'Value', width: 80, dataIndex: 'A720VALOR2', renderer: 'getDoubleColor2'}
                                                ]
                                            },
                                            {text: 'Flight 3',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Date', width: 80, dataIndex: 'strFormatDate3', renderer: 'getStringColor1'},
                                                    {text: 'Sector', width: 80, dataIndex: 'strDescripcion3', renderer: 'getStringColor1'},
                                                    {text: 'Carr', width: 80, dataIndex: 'A720CARRA3', renderer: 'getStringColor1'},
                                                    {text: 'Value', width: 80, dataIndex: 'A720VALOR3', renderer: 'getDoubleColor1'}
                                                ]
                                            },
                                            {text: 'Flight 4',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Date', width: 80, dataIndex: 'strFormatDate4', renderer: 'getStringColor2'},
                                                    {text: 'Sector', width: 80, dataIndex: 'strDescripcion4', renderer: 'getStringColor2'},
                                                    {text: 'Carr', width: 80, dataIndex: 'A720CARRA4', renderer: 'getStringColor2'},
                                                    {text: 'Value', width: 80, dataIndex: 'A720VALOR4', renderer: 'getDoubleColor2'}
                                                ]
                                            }

                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                },
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
                            id: prototype.id + '-panelPie',
                            width: 780,
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

