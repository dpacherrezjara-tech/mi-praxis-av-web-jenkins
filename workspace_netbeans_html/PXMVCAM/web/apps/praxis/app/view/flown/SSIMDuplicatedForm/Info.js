/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - AM                                       *          
 * Document   : Info                                              *                
 * Created on : 19/02/2018, 12:19:00                              *          
 * Author     : Gregory Sánchez (gsanchez)                        *          
 *                                                                *
 ******************************************************************
 *                  MIAMI TECHNOLOGY GROUP, INC.                  *
 *                           MIATECH                              *
 *                           OF PERU                              *
 ******************************************************************
 * CODIGO PRG FECHA      CONCEPTO
 * 201601 RMC 20-09-2016 SE CREA PROGRAMA A PEDIDO DE JGG.
 ******************************************************************
 */
Ext.define('Ext.Praxis.view.flown.SSIMDuplicatedForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
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
                width: prototype.widthGrid,
                height: prototype.heightGrid,
                align: 'center'
            },
            items: [
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridData',
                    hidden: false,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'SSIM Data', 
                                columns: [
                                    {text: 'Fight', align: 'center', menuDisabled: true,
                                        defaults: {
                                            editable: false
                                        },
                                        columns: [
                                            {text: 'Date', dataIndex: 'strFormatDate', width: 90, align: 'center', menuDisabled: true},
                                            {text: 'Number', dataIndex: 'NFLIGHT', width: 60, align: 'center', menuDisabled: true, editable: false},
                                            {text: 'Leg Seq', dataIndex: 'LEGSEQ', width: 60, align: 'center', menuDisabled: true}
                                        ]
                                    },
                                    {text: 'Orig', dataIndex: 'CDEPART', width: 55, align: 'center', menuDisabled: true},
                                    {text: 'Dest', dataIndex: 'CARRIVA', width: 55, align: 'center', menuDisabled: true},
                                    {text: 'Carrier', dataIndex: 'CARRI', width: 60, align: 'center', menuDisabled: true},
                                    {text: 'Received', align: 'center', menuDisabled: true, 
                                        columns: [
                                            {text: 'Date', dataIndex: 'strFormatFSENDSS', width: 90, align: 'center', menuDisabled: true}
                                        ]
                                    }
                                ]
                            },
                            {text: 'Information PAX ODS',
                                columns: [
                                    {text: 'Senior', dataIndex: 'QCPAD', width: 70, align: 'right', menuDisabled: true,renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        metaData.style = "background-color:#FFF9E0";
                                        return value;
                                    }},
                                    {text: 'Children', dataIndex: 'QCPCHD', width: 70, align: 'right', menuDisabled: true,renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        metaData.style = "background-color:#FFF9E0";
                                        return value;
                                    }},
                                    {text: 'Infant', dataIndex: 'QCPINF', width: 70, align: 'right', menuDisabled: true,renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        metaData.style = "background-color:#FFF9E0";
                                        return value;
                                    }},
                                    {text: 'Transit', dataIndex: 'QCPTRA', width: 70, align: 'right', menuDisabled: true,renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        metaData.style = "background-color:#FFF9E0";
                                        return value;
                                    }}
                                ]
                            },
                            {text: 'ODS Data',
                                columns: [
                                    {text: 'Received', align: 'center', menuDisabled: true, 
                                        columns: [
                                            {text: 'Date', dataIndex: 'strFormatFSENDOD', width: 90, align: 'center', menuDisabled: true}
                                        ]
                                    },
                                    {text: 'Qty', dataIndex: 'QCPNOD', width: 53, align: 'right', menuDisabled: true,renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        metaData.style = "background-color:#D5F4D5";
                                        return value;
                                    }}
                                ]
                            },
                            {text: 'LEG', dataIndex: 'QCPNLEG', width: 46, align: 'right', menuDisabled: true,renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                metaData.style = "background-color:#D5F4D5";
                                return value;
                            }},
                            {text: 'VCR Data',
                                columns: [
                                    {text: 'Received', align: 'center', menuDisabled: true, 
                                        columns: [
                                            {text: 'Date', dataIndex: 'strFormatFSENDVC', width: 90, align: 'center', menuDisabled: true}
                                        ]
                                    },
                                    {text: 'Qty', dataIndex: 'QCPNVC', width: 53, align: 'right', menuDisabled: true}
                                ]
                            },
                            {text: 'OCR',
                                columns: [
                                    {text: 'Qty', dataIndex: 'QCPNOCR', width: 53, align: 'right', menuDisabled: true}
                                ]
                            },
                            {text: 'Manual',
                                columns: [
                                    {text: 'Qty', dataIndex: 'QCPNMA', width: 53, align: 'right', menuDisabled: true}
                                ]
                            },
                            {text: 'Total', dataIndex: 'QCPNTOT', width: 55, align: 'right', menuDisabled: true,renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                metaData.style = "background-color:#D5F4D5;td:hover { background-color: #B2E1FF;}";
                                return value;
                            }},
                            {
                                text: 'Edit',
                                sortable: false,
                                xtype: 'actioncolumn',
                                width: 35,
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
                            width: prototype.widthGrid,
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
});
