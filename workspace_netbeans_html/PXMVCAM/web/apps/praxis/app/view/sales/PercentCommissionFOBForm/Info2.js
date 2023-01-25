/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.PercentCommissionFOBForm.Info2', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info2',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    style: 'margin: 1px;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },    
    items: [
        {
            region: 'center',
            id: prototype.id + '-regionCenterGrid02',            
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
                    xtype: 'grid',
                    padding: '1 0 0 0',
                    id: prototype.id + '-gridData2',
                    //height: 550,
                    height: 525,
                    width: '100%',                    
                    columnLines: true,
                    resizable: false,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            resizable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'IATA', width: 70, locked: true, dataIndex: 'A1874IATA'},
                            {text: 'IATA Name', width: 140, locked: true, dataIndex: 'A003KEY3'},
                            {text: 'Cod.<br>Agre', width: 40, locked: true, dataIndex: 'A1874CODEA'},
                            {text: 'Description', width: 160, locked: true, dataIndex: 'A1874DESCR',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:left; margin-left:4px;';
                                    return value;
                                }
                            },
                            {text: '%<br>Comm.', width: 50, dataIndex: 'A1874COMM',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right; margin-right:4px;';
                                    return Ext.util.Format.number(value, '0,000.0000');
                                }
                            },
//                            {text: 'Document<br>Type', width: 60, dataIndex: 'A1874TDOC'},
                            {
                                text: 'Applicable',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Document<br>Type', dataIndex: 'A1874TDOC', width: 60},
                                    {text: 'Emission<br>Form', dataIndex: 'A1874FORMA', width: 60},
                                    {text: 'Transaction<br>Code', dataIndex: 'A1874TRNCU', width: 60},
                                    {text: 'Marketing', dataIndex: 'A1874MCARR', width: 60},
                                    {text: 'Type<br>Pax.', dataIndex: 'A1874TPASS', width: 40},
                                    {text: 'Tour <br> Code', dataIndex: 'A1874TOUR', width: 60},
                                    {text: 'Fare<br> Designator', dataIndex: 'A1874TDESI', width: 80},
                                    {text: 'Farebasis', dataIndex: 'A1874FBASI', width: 80},
                                    {text: 'Origin Destiny <br> per Coupon', dataIndex: 'A1874ODPCP', width: 50},
                                    {text: 'Class', dataIndex: 'A1874CLASS', width: 40},
                                    {text: 'Code', dataIndex: 'A1874CODE', width: 40},
                                    {text: 'Sub<br>Code', dataIndex: 'A1874SCODE', width: 60},
                                    {text: 'Method Of <br> Payment', dataIndex: 'A1874MOPAY', width: 50},
                                    {text: 'Ancilliaries', dataIndex: 'A1874ANCIL', width: 80}
                                ]
                            },
                            {
                                text: 'Exclude',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Class', dataIndex: 'A1874CLASX', width: 50},
                                    {text: 'Code', dataIndex: 'A1874CODEX', width: 50},
                                    {text: 'Sub<br> Code', dataIndex: 'A1874SCODX', width: 50},
                                    {text: 'FareBasis', dataIndex: 'A1874FBASX', width: 70},
                                    {text: 'IATA', dataIndex: 'A1874IATAX', width: 50}
                                ]
                            },
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
                },
                /** PAGINATION LABELS
                 * */
                {
                    xtype: 'panel',
                    id: prototype.id + '-pie2',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
                    //height: 25,
                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                    defaults: {
                        border: true,
                        padding: '0px 1px 0px 1px'
                    },
                    padding: '1px 1px 1px 1px',
                    items: [
                        {
                            xtype: 'panel',
                            //width: 1850,
                            width: '100%',
                            //height: 25,
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
                                    id: prototype.id + '-lbl-currentPage2',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: prototype.id + '-lbl-pageCount2',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.id + '-lbl-total2',
                                    text: '0',
                                    width: 50
                                }
                            ]
                        }
                    ]
                }
            ]
        }
//        ,
//        {
//            region: 'south',
//            layout: 'border',
//            height: 0,
//            defaults: {
//                style: 'margin: 2px;',
//                bodyStyle: 'background: transparent;',
//                border: false
//            },
//            items: [
//            ]
//        }
    ]
}
);

