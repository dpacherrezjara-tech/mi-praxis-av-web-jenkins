/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.FptfAirlineForm.Info', {
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
                width: 810,
                height: 500,
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
                            {text: 'Nbr.', width: 50, dataIndex: 'RN'},
                            {text: 'Form', width: 70, dataIndex: 'A004FORMA',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align :right ; margin-right : 5px ";
                                    return value;
                                }
                            },
                             {text: 'Doc. Type', width: 80, dataIndex: 'A004TIPODO'},
                             {text: 'Coupons', width: 80, dataIndex: 'A004NROCUP'},
                             {text: 'Form T.', width: 70, dataIndex: 'FORMTYPE'},
                             {text: 'Form Use', width: 70, dataIndex: 'FORMUSE'},
                             {text: 'Sales T.', width: 70, dataIndex: 'SALESTYPE'},
                             {text: 'Method', width: 70, dataIndex: 'METHOD'},
                             {text: 'SCN', width: 70, dataIndex: 'SCN'},
                             {text: 'Description', width: 115, dataIndex: 'DESCRIPTIO'},
                            {
                                sortable: false,
                                xtype: 'actioncolumn',
                                text: 'Edit',
                                width: 60,
                                align: 'center',
                                items: [
                                    {
                                        iconCls: 'prx-icon-edit',
                                        tooltip: 'Edit',
                                        handler: 'onEditClick'
                                    }
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
                        padding: '0px 5px 0px 0px'
                    },
                    padding: '1px 5px 1px 0px',
                    items: [
                        {
                            xtype: 'panel',
                            width: 800,
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
                                    width: 30
                                },
                                {
                                    id: prototype.id + '-lbl-currentPage',
                                    text: '1',
                                    width: 30
                                },
                                {
                                    text: 'Of',
                                    width: 30
                                },
                                {
                                    id: prototype.id + '-lbl-pageCount',
                                    text: '0',
                                    width: 40
                                },
                                {xtype: 'tbspacer', width: 20},
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

