/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.AuditControlForm.Info', {
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
                width: 1190,
                height: 530,
                align: 'center'
            },
            items: [
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridData',
                    height: 520,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'Group', width: 160, dataIndex: 'MODULE',hidden: true},
                            {text: 'Module', width: 200, dataIndex: 'SUB_MODULE'},
                            {text: 'SEQ', width: 100, dataIndex: 'SEQ'},
                            {text: 'Proc. Date', width: 100, dataIndex: 'PROC_DATE'},
                            {text: 'Date Create', width: 160, dataIndex: 'DATE_CREATE', hidden: true},
                            {text: 'StatusCode', width: 100, dataIndex: 'STATUS', hidden: true},
                            {text: 'Status', width: 100, dataIndex: 'STATUS_LABEL',
                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                var data = record.data;
                                    var color = (data.STATUS === '1') ? '#009933' : 
                                                (data.STATUS === '2') ? '#ffff00' :'#cc3300';
                                    metaData.style = "text-align:center;color:"+color+";font-size:11;";
                                    return value;
                                }
                            },
                            {text: 'Total', width: 100, dataIndex: 'TOTAL'},
                            {text: 'Creation Date', width: 160, dataIndex: 'DATE_CREATE'},
                            {text: 'Creation User', width: 100, dataIndex: 'USRIN'},
                            {
                                text: 'Update Date',width: 160,  dataIndex: 'FECAC',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    return (value==='1900-01-01 00:00:00.0' ? '' : value);
                                }
                            },
                            {text: 'Update User', width: 100, dataIndex: 'USRAC'},
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
                        padding: '0px 0px 0px 0px'
                    },
                    padding: '1px 0px 1px 0px',
                    items: [
                        {
                            xtype: 'panel',
                            width: 790,
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

