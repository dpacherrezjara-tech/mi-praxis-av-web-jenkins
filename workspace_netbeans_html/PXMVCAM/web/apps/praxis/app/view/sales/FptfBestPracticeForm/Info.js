/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.FptfBestPracticeForm.Info', {
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
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: 1360,
                height: 550,
                align: 'center'
            },
            items: [
                {
                    xtype: 'grid',
                    padding: '20 0 0 0',
                    id: prototype.id + '-gridData',
                    height: 550,
                    hidden: false,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'

                        },
                        items: [
                            {text: 'Nbr', width: 50, dataIndex: 'pos'},
                            {text: 'Airline', width: 55, dataIndex: 'A722AIRLIN'},
                            {text: 'Form', width: 60, dataIndex: 'A722FORMA',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = ' color:#008FE3;text-align :center ; margin-left : 3px ';
                                    return '<a href="#sales-fptf-best-practice-form" style="color:#008FE3;text-decoration:none;">' + value + '</a>';
                                }
                                ,
                                listeners: {
                                    click: 'getDataEntryBestPractice'
                                }
                            
                            
                            },
                            {text: 'Date',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    border: true
                                },
                                columns: [
                                    {text: 'From', width: 60, dataIndex: 'strFormatDate'},
                                    {text: 'To', width: 60, dataIndex: 'strFormatDate2'}
                                ]
                            },
                            {text: 'Source', width: 60, dataIndex: 'A722FTEVTA'},
                            {text: 'Type F.1', width: 60, dataIndex: 'A722TFORM1'},
                            {text: 'Type F.2', width: 60, dataIndex: 'A722TFORM2'},
                            {text: 'Type F.3', width: 60, dataIndex: 'A722TFORM3'},
                            {text: 'Use Form', width: 80, dataIndex: 'A722UFORMA'},
                            {text: 'Sale Form',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    border: true
                                },
                                columns: [
                                    {text: 'Code', width: 60, dataIndex: 'A722VFORMA'},
                                    {text: 'Name', width: 80, dataIndex: 'strA722VFORMA',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var tool = record.data['strA722VFORMA'].trim();
                                            if (tool.length > 0) {
                                                metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                            }
                                            return value;
                                        }}
                                ]
                            },
                            {text: 'Digit <br> Serial', width: 90, dataIndex: 'A722DIGSER'},
                            {text: 'Check Method',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    border: true
                                },
                                columns: [
                                    {text: 'Code', width: 60, dataIndex: 'A722METODO'},
                                    {text: 'Name', width: 80, dataIndex: 'strA722METODO',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var tool = record.data['strA722METODO'].trim();
                                            if (tool.length > 0) {
                                                metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                            }
                                            return value;
                                        }}
                                ]
                            },
                             {text: 'Coupon <br> Issue', width: 70, dataIndex: 'A722EMTCUP'},
                             {text: 'Total <br> Coupon', width: 80, dataIndex: 'A722TOTCUP'},
                             {text: 'SCN Indicator',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    border: true
                                },
                                columns: [
                                    {text: 'Code', width: 70, dataIndex: 'A722INDSCN'},
                                    {text: 'Name', width: 110, dataIndex: 'strA722INDSCN',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var tool = record.data['strA722INDSCN'].trim();
                                            if (tool.length > 0) {
                                                metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                            }
                                            return value;
                                        }}
                                ]
                            }
                        ]
                    }
                }
                ,
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
                        padding: '0px 5px 0px 5px'
                    },
                    padding: '1px 5px 1px 5px',
                    items: [
                        {
                            xtype: 'panel',
                            width: 1350,
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

