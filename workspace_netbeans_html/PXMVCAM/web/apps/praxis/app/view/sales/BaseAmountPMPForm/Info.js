/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.BaseAmountPMPForm.Info', {
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
                width: 1200,
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
                            {text: 'Codes',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    border: true
                                },
                                columns: [
                                    {text: 'From', width: 100, dataIndex: 'A007OACC'},
                                    {text: 'To', width: 100, dataIndex: 'A007DACC'}
                                ]
                            },
                            {text: 'TPM', width: 50, dataIndex: 'A007BASICM',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align :right ; margin-right : 3px ";
                                   return Ext.util.Format.number(value, '0,000');
                            }},
                            {text: 'Factor', width: 80, dataIndex: 'A007PRORAF',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align :right ; margin-right : 3px ";
                                    return Ext.util.Format.number(value, '0,000');

                                }},
                            {text: 'City Names',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    border: true
                                },
                                columns: [
                                    {text: 'From', width: 180, dataIndex: 'A1007NOMBR_ORI',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align :left ; margin-left : 3px ";
                                            return value;
                                        }},
                                    {text: 'To', width: 180, dataIndex: 'A1007NOMBR_DES',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align :left ; margin-left : 3px ";
                                            return value;
                                        }}
                                ]
                            },
                            {text: 'Country Names',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    border: true
                                },
                                columns: [
                                    {text: 'From', width: 180, dataIndex: 'A006PAIS_ORI',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align :left ; margin-left : 3px ";
                                            return value;
                                        }},
                                    {text: 'To', width: 180, dataIndex: 'A006PAIS_DES',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {

                                            metaData.style = "text-align :left ; margin-left : 3px ";
                                            return value;
                                        }}
                                ]
                            },
                            {text: 'Issue Date', width: 120, dataIndex: 'A007EDATEA'}

                        ]
                    }
                },
                {
                    xtype: 'grid',
                    padding: '20 0 0 0',
                    id: prototype.id + '-gridDataAll',
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
                            {text: 'Codes',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    border: true
                                },
                                columns: [
                                    {text: 'From', width: 70, dataIndex: 'A007OACC'},
                                    {text: 'To', width: 70, dataIndex: 'A007DACC'}
                                ]
                            },
                            {text: 'Airline', width: 50, dataIndex: 'A007AIRLIN'},
                            {text: 'Class', width: 50, dataIndex: 'A007CLASSC'},
                            {text: 'TPM', width: 50, dataIndex: 'A007BASICM',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align :right ; margin-right : 3px ";
                                   return Ext.util.Format.number(value, '0,000');
                                }},
                            {text: 'Factor', width: 80, dataIndex: 'A007PRORAF',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align :right ; margin-right : 3px ";
                                    return Ext.util.Format.number(value, '0,000');
                                }},
                            {text: 'Proviso', width: 60, dataIndex: 'PROVISO',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align :right ; margin-right : 3px ";
                                     return Ext.util.Format.number(value, '0,000');
                                }},
                            {text: 'Curr', width: 60, dataIndex: 'A007OACURC'},
                            {text: 'City Names',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    border: true
                                },
                                columns: [
                                    {text: 'From', width: 145, dataIndex: 'A1007NOMBR_ORI',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align :left ; margin-left : 3px ";
                                            return value;
                                        }},
                                    {text: 'To', width: 145, dataIndex: 'A1007NOMBR_DES',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align :left ; margin-left : 3px ";
                                            return value;
                                        }}
                                ]
                            },
                            {text: 'Country Names',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    border: true
                                },
                                columns: [
                                    {text: 'From', width: 145, dataIndex: 'A006PAIS_ORI',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align :left ; margin-left : 3px ";
                                            return value;
                                        }},
                                    {text: 'To', width: 145, dataIndex: 'A006PAIS_DES',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {

                                            metaData.style = "text-align :left ; margin-left : 3px ";
                                            return value;
                                        }}
                                ]
                            },
                            {text: 'Issue Date', width: 120, dataIndex: 'A007EDATEA'}

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
                            width: 1200,
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

