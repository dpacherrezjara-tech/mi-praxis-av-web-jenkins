/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.AccountingMasterUATPForm.Info', {
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
                width: 1400,
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
                            {text: 'UATP Card', width: 130, dataIndex: 'A1820TCUAT'},
                            {text: 'Description', width: 405, dataIndex: 'A1820DESCR',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align :left ; margin-left : 5px ';
                                    return value;
                                }},
                            {text: 'Client', width: 60, dataIndex: 'A1820CLIEN'},
                            {text: 'Address', width: 60, dataIndex: 'A1820DIREC'},
                            {text: 'Type', width: 0, dataIndex: 'A1820TIPO'},
                            {text: 'Type Doc', width: 0, dataIndex: 'A1820DOCU'},
                            {text: 'Company', width: 90, dataIndex: 'A1820CIA'},
                           
                            {text: 'Unit', width: 50, dataIndex: 'A1820UNID'},
                            
                            {text: 'C. Cost', width: 60, dataIndex: 'A1820CECO',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {

                                    metaData.style = 'text-align :left ; margin-left : 3px ';
                                    return value;
                                }},                          
                            {text: 'Location', width: 90, dataIndex: 'A1820UBI',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align :left ; margin-left : 3px ';
                                    return value;
                                }},
                            {text: 'Account', width: 80, dataIndex: 'A1820CTA',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align :left ; margin-left : 3px ';
                                    return value;
                                }},
                            {text: 'Sub. <br>Account', width: 80, dataIndex: 'A1820SCTA',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align :left ; margin-left : 3px ';
                                    return value;}},                          
                            {text: 'Equipment', width: 90, dataIndex: 'A1820EQUI'},
                            {text: 'Inter <br>Company', width: 70, dataIndex: 'A1820ICIA'},
                                
                           
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
                            width: 1400,
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

