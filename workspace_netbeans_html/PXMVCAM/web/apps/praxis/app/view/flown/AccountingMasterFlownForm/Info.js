/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.AccountingMasterFlownForm.Info', {
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
                width: 1510,
                height: 510,
                align: 'center'
            },
            items: [
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridData',
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
                            {text: 'Type',  width: 50, dataIndex: 'A1740TITRA'},
                            {text: 'AccountType', width: 35, dataIndex: 'A1740TIPO', hidden: true,
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;";
                                    return value;
                                }
                            },
                            {text: 'Cta Type',  width: 100, dataIndex: 'A1740TIPODESC'},
                            {text: 'Sub Type', width: 70, dataIndex: 'A1740SUBTI'},
                            {text: 'Category', width: 70, dataIndex: 'A1740CATEG'},
                            {text: 'Company', width: 70, dataIndex: 'A1740CIA'},
                            {text: 'Unit', width: 60, dataIndex: 'A1740UNIDA'},
                            {text: 'C Cost', width: 70, dataIndex: 'A1740CECOS'},
                            {text: 'Ubi', width: 70, dataIndex: 'A1740UBICA'},
                            {text: 'Account', width: 60, dataIndex: 'A1740CTA'},
                            {text: 'Sub Account', width: 90, dataIndex: 'A1740SCTA'},
                            {text: 'Equipment', width: 80, dataIndex: 'A1740EQUI'},
                            {text: 'Inter Company', width: 100, dataIndex: 'A1740ICIA'},
                            {text: 'Country Location', width: 120, dataIndex: 'A1740INTNU'},
                            {text: 'Client', width: 270, dataIndex: 'A1740CLIE'},
                            {text: 'Effective', width: 80, dataIndex: 'A1740FINI'},
                            {
                                sortable: false,
                                xtype: 'actioncolumn',
                                text: 'Edit',
                                width: 50,
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
                        padding: '0px 5px 0px 5px'
                    },
                    padding: '1px 5px 1px 5px',
                    items: [
                        {
                            xtype: 'panel',
                            width: 1300,
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

