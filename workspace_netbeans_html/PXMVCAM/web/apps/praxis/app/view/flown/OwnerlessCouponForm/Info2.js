

Ext.define('Ext.Praxis.view.flown.OwnerlessCouponForm.Info2', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info2',
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
                width: 1500,
                height: 550,
                align: 'center'
            },
            items: [
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridData2',
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
                                defaults: {
                                    editable: false,
                                    menuDisabled: true
                                },
                                columns: [
                                    {text: 'Fight', align: 'center',
                                        defaults: {
                                            editable: false,
                                            menuDisabled: true
                                        },
                                        columns: [
                                            {text: 'Date', dataIndex: 'strFormatDate', width: 105, align: 'center'},
                                            {text: 'Number', dataIndex: 'NFLIGHT', width: 75, align: 'center'}
                                        ]
                                    },
                                    {text: 'Carrier', dataIndex: 'CARRI', width: 65, align: 'center'},
                                    {text: 'Flown Type', dataIndex: 'strDescFFLOW', width: 85, align: 'center'},
                                    {text: 'Orig', dataIndex: 'CDEPART', width: 70, align: 'center',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var tool = record.data['strDescCDEPART'].trim();
                                            if (tool.length > 0) {
                                                metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                            }
                                            return value;
                                        }},
                                    {text: 'Dest', dataIndex: 'CARRIVA', width: 70, align: 'center',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var tool = record.data['strDescCARRIVA'].trim();
                                            if (tool.length > 0) {
                                                metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                            }
                                            return value;
                                        }},
                                    {text: 'Received', align: 'center',
                                        defaults: {
                                            editable: false,
                                            menuDisabled: true
                                        },
                                        columns: [
                                            {text: 'Date', dataIndex: 'strFormatFSENDSS', width: 105, align: 'center'}
                                        ]
                                    }
                                ]
                            },
                            {text: 'Information PAX ODS',
                                columns: [
                                    {text: 'Senior', dataIndex: 'QCPAD', width: 60, align: 'right', menuDisabled: true, renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background-color:#FFF9E0";
                                            return value;
                                        }},
                                    {text: 'Children', dataIndex: 'QCPCHD', width: 70, align: 'right', menuDisabled: true, renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background-color:#FFF9E0";
                                            return value;
                                        }},
                                    {text: 'Infant', dataIndex: 'QCPINF', width: 60, align: 'right', menuDisabled: true, renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background-color:#FFF9E0";
                                            return value;
                                        }},
                                    {text: 'Transit', dataIndex: 'QCPTRA', width: 60, align: 'right', menuDisabled: true, renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background-color:#FFF9E0";
                                            return value;
                                        }}
                                ]
                            },
                            {text: 'ODS Data',
                                columns: [
                                    {text: 'Received', align: 'center', menuDisabled: true,
                                        columns: [
                                            {text: 'Date', dataIndex: 'strFormatFSENDOD', width: 105, align: 'center', menuDisabled: true}
                                        ]
                                    },
                                    {text: 'Qty', dataIndex: 'QCPNOD', width: 55, align: 'right', menuDisabled: true, renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background-color:#D5F4D5";
                                            return value;
                                        }}
                                ]
                            },
                            {text: 'LEG', dataIndex: 'QCPNLEG', width: 55, align: 'right', menuDisabled: true, renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "background-color:#D5F4D5";
                                    return value;
                                }},
                            {text: 'VCR Data',
                                columns: [
                                    {text: 'Received', align: 'center', menuDisabled: true,
                                        columns: [
                                            {text: 'Date', dataIndex: 'strFormatFSENDVC', width: 105, align: 'center', menuDisabled: true}
                                        ]
                                    },
                                    {text: 'Qty', dataIndex: 'QCPNVC', width: 60, align: 'right', menuDisabled: true}
                                ]
                            },
                            {text: 'OCR',
                                columns: [
                                    {text: 'Qty', dataIndex: 'QCPNOCR', width: 60, align: 'right', menuDisabled: true}
                                ]
                            },
                            {text: 'Manual',
                                columns: [
                                    {text: 'Qty', dataIndex: 'QCPNMA', width: 60, align: 'right', menuDisabled: true}
                                ]
                            },
                            {text: 'Total', dataIndex: 'QCPNTOT', width: 60, align: 'right', menuDisabled: true, renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "background-color:#D5F4D5;td:hover { background-color: #B2E1FF;}";
                                    return value;
                                }},
                            {text: 'Coupons',
                                columns: [
                                    {text: 'Valued', dataIndex: 'QCPNVAL', width: 65, align: 'right', menuDisabled: true}
                                ]
                            },
                            {
                                text: 'Edit',
                                sortable: false,
                                xtype: 'actioncolumn',
                                width: 45,
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
                    id: prototype.id + '-pie2',
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
                            width: 1500,
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
