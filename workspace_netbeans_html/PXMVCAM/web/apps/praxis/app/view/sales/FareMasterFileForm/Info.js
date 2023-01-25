/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.FareMasterFileForm.Info', {
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
                width: 1750,
                height: 550,
                align: 'center'
            },
            items: [
                {
                    xtype: 'grid',
                    padding: '20 0 0 0',
                    id: prototype.id + '-gridData',
                    height: 520,
                    hidden: false,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'

                        },
                        items: [
                            {text: 'Nbr', width: 0, dataIndex: 'NR', hidden: true},
                            {text: 'Id Subscription', width: 120, dataIndex: 'SUBSCRIP'},
                            {text: 'Product <br>Code', width: 80, dataIndex: 'PRODUCT'},
                            {text: 'Transmission <br> Type', width: 100, dataIndex: 'XMTTYPE'},                           
                            {text: 'Date of File', width: 100, dataIndex: 'DATEFILE'},
                            {text: 'Time of File', width: 90, dataIndex: 'TIMEFILE'},
                            {text: 'Total Records', width: 100, dataIndex: 'TOTREC'},
                            {text: 'Original Data', width: 130, dataIndex: 'DATAFILE'},
                            {text: 'Sequence', width: 90, dataIndex: 'SEQ'},
                            {text: 'Tariff', width: 70, dataIndex: 'TARNO'},
                            {text: 'Carrier', width: 70, dataIndex: 'CXRCD'},
                            {text: 'Ori City', width: 70, dataIndex: 'ORIGCITY'},
                            {text: 'Ori Ctry', width: 70, dataIndex: 'ORIGCTRY'},
                            {text: 'Dest City', width: 70, dataIndex: 'DESTCITY'},
                            {text: 'Dest Ctry', width: 70, dataIndex: 'DESTCTRY'},
                            {text: 'Fare Class', width: 90, dataIndex: 'FARECLCD'},
                            {text: 'Effective Date', width: 100, dataIndex: 'DATESEFF'},
                            {text: 'Last Date', width: 80, dataIndex: 'DATESDIS'},
                            {text: 'Rule', width: 80, dataIndex: 'RULENO'},
                            {text: 'Routing Number', width: 120, dataIndex: 'RTGNO'}
//                            {text: 'SubParagraph', width: 150, dataIndex: 'A823SUBPAR',
//                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                    metaData.style = "text-align :left ; margin-left : 3px ";
//                                    return value;
//                                }}

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
                            width: 1750,
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

