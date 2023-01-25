/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.AccountingMasterTNUForm.Info', {
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
                width: 1010,
                height: 500,
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
                            {text: 'Nbr.', width: 50, dataIndex: 'RN'},
                            {text: 'Doc Type', width: 120, dataIndex: 'A1833TDOC'},                           
                            {text: 'Concept', width: 120, dataIndex: 'A1833CONC',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {

                                    metaData.style = 'text-align :left ; margin-left : 3px ';
                                    return value;
                                }},
                            {text: 'IVA Code', width: 110, dataIndex: 'A1833CODIV'},
                            {text: 'Rate Level', width: 100, dataIndex: 'A1833SUBTI',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align :center ; margin-left : 3px ';
                                    return Ext.util.Format.number(value, '0,000.00');
                                   
                                }},
                            {text: 'Begin Rate', width: 80, dataIndex: 'A1833TASIN',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align :center ; margin-left : 3px ';
                                     return Ext.util.Format.number(value, '0,000.00');
                                }},
                            {text: 'End Rate', width: 80, dataIndex: 'A1833TASFI',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align :center ; margin-left : 3px ';
                                     return Ext.util.Format.number(value, '0,000.00');
                                }},
                          
                            {text: 'Description', width: 280, dataIndex: 'A1833DESCR',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align :left ; margin-left : 3px ';
                                     return value;
                                }},
                          
                                
                           
                            {
                                sortable: false,
                                xtype: 'actioncolumn',
                                text: 'Edit',
                                width: 70,
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
                        padding: '0px 1px 0px 1px'
                    },
                    padding: '1px 1px 1px 1px',
                    items: [
                        {
                            xtype: 'panel',
                            width: 1010,
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

