/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.ADJAccountingForm.Info', 
{
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
            width: 1900,
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
                    height: 550,
                    width: 1890,
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
                            {text: '', width: 20, xtype: 'checkcolumn', dataIndex: 'CHECKED',
                                renderer: function(value, meta, record, row, col) {
                                    /* Permission Check */
                                    var me = this;

                                    if (record.data.A2024ESTADO !== 'IN') {
                                        meta['tdCls'] = 'x-item-disabled';
                                    } else {
                                        meta['tdCls'] = '';
                                    }
                                    return new Ext.ux.CheckColumn().renderer(value);
                                }
                            },
                            {text: 'Ticket', width: 80, dataIndex: 'A2024CODER'},
                            {text: 'Coupon', width: 60, dataIndex: 'A2024CUPON',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {

                                    var coupon = record.data.A2024CUPON;
                                    if (coupon === '0') {
                                        return '';
                                    } else {
                                        return value;
                                    }
                                }
                            },
                            {text: 'ADJ <br>Sec', width: 50, dataIndex: 'SEQ'},
                            {text: 'Transaction', width: 90, dataIndex: 'VP_TTRAX',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    var valor = '';
                                    switch (value) {
                                        case 2:
                                            valor = 'EXCH';
                                            break;
                                        case 13:
                                            valor = 'EMD-Flown';
                                            break;
                                        case 11:
                                            valor = 'IXC Rejections';
                                            break;
                                        case 10:
                                            valor = 'IXC Prime';
                                            break;
                                        case 8:
                                            valor = 'IXC';
                                            break;
                                        case 7:
                                            valor = 'RFCP';
                                            break;
                                        case 4:
                                            valor = 'ADM/ACM';
                                            break;
                                        case 3:
                                            valor = 'RFND';
                                            break;
                                        case 6:
                                            valor = 'EXCP';
                                            break;
                                        case 9:
                                            valor = 'DISC';
                                            break;
                                        case 5:
                                            valor = 'FLWN';
                                            break;
                                        case 1:
                                            valor = 'SALE';
                                            break;
                                        default :
                                            valor = 'Interlineal';

                                    }
                                    return valor;
                                }

                            },
                            {text: 'TRNC <br>Date', width: 60, dataIndex: 'A2024FECPRO'},
                            {text: 'Processed', width: 80, dataIndex: 'A2024ESTADO',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    var valor = '';
                                    switch (value) {
                                        case 'AN':
                                            metaData.style = 'font-weight:bold;background:#FF0000';
                                            valor = 'VOID';
                                            break;
                                        case 'OK':
                                            metaData.style = 'font-weight:normal;background:#99FFCC';
                                            valor = 'OK';
                                            break;
                                        case 'IN':
                                            metaData.style = 'font-weight:normal;background:#0099FF';
                                            valor = 'INITIAL';
                                            break
                                        default :
                                            metaData.style = 'font-weight:normal;background:#CCCC00';
                                            valor = 'PENDING';
                                            break;
                                    }

                                    return valor;
                                }
                            },
                            {text: 'LOCAL AMOUNT',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'DEBIT', dataIndex: 'DEBLOC', width: 65,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'CREDIT', dataIndex: 'CRELOC', width: 65,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'NET', dataIndex: 'SQUARELOC', width: 65,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var SQUARELOC = record.data.SQUARELOC;
                                            if (SQUARELOC === 0) {
                                                metaData.style = 'text-align :right;background:#99FFFF;';
                                            } else {
                                                metaData.style = 'text-align :right;background:#FF99FF;';
                                            }
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    }
                                ]
                            },
                            {text: 'REVENUE AMOUNT',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'DEBIT', dataIndex: 'DEBREV', width: 65,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'CREDIT', dataIndex: 'CREREV', width: 65,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :right;';
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'NET', dataIndex: 'SQUARE', width: 65,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var SQUARE = record.data.SQUARE;
                                            if (SQUARE === 0) {
                                                metaData.style = 'text-align :right;background:#99FFFF;';
                                            } else {
                                                metaData.style = 'text-align :right;background:#FF99FF;';
                                            }
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    }
                                ]
                            },
                            {text: 'Accounting',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'ID', dataIndex: 'A1541IDCON', width: 70,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :left;';
                                            return value;
                                        }
                                    },
                                    {text: 'Date', dataIndex: 'A1541FCONT', width: 70}


                                ]
                            },
                            {text: 'Adj <br>IATA', width: 70, dataIndex: 'A2024IATAUSU'},
                            {text: 'Country', width: 70, dataIndex: 'A2024PSVTA'},
                            {text: 'Source', width: 70, dataIndex: 'A2024FUENT'},
                            {text: 'S. Source', width: 70, dataIndex: 'A2024SFUEN'},
                            {text: 'Grup. <br> TRNC', width: 70, dataIndex: 'GRUPO'},
                            {text: 'Sales <br> Date', width: 70, dataIndex: 'A2024FECVTA'},
                            {text: 'Card <br> Type', width: 70, dataIndex: 'A2024TTARJ'},
                            {text: 'Card <br> Number', width: 70, dataIndex: 'A2024NTARJ'},
                            {text: 'RFIC', width: 70, dataIndex: 'A2024RFIC'},
                            {text: 'RFIS', width: 70, dataIndex: 'A2024RFIS'},
                            {text: 'VRICOC', width: 70, dataIndex: 'A2024VRICOC',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align :right;';
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {text: 'Description', width: 90, dataIndex: 'A2024DESCRIP',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:left; margin-left:0px;';
                                    return value;
                                }
                            },
                            {
                                sortable: false,
                                xtype: 'actioncolumn',
                                text: '',
                                width: 30,
                                align: 'center',
                                items: [
                                    {
                                        iconCls: 'prx-icon-edit',
                                        tooltip: 'Edit',
                                        handler: 'onEditClick'
                                    }
                                ]
                            },
                            {
                                sortable: false,
                                xtype: 'actioncolumn',
                                text: '',
                                width: 30,
                                align: 'center',
                                items: [
                                    {
                                        icon: 'resources/img/botones/restricted_folder_symbol_stop-16.png',
                                        tooltip: 'Delete',
                                        handler: 'onDeleteClick'
                                    }
                                ]
                            }
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
                            width: 1890,
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

