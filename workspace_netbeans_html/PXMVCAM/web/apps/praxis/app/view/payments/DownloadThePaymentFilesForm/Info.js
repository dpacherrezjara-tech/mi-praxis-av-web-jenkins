valor = '0';
Ext.define('Ext.Praxis.view.payments.DownloadThePaymentFilesForm.Info', {
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
                width: 1200,
                height: 'auto',
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataMain',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            border: true,
                            height: 560,
                            width: 1040,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataMain',
                                    height: 520,
                                    width: 850,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items:
                                                [
                                                    {text: 'System </br>date', dataIndex: 'A4719FECIN', width: 75},
                                                    {text: 'Start </br>date', dataIndex: 'A4719FCARG', width: 75},
                                                    {text: 'End </br>date', dataIndex: 'A4719FFIN', width: 75},
                                                    //{text: 'Execution </br>date', dataIndex: 'A4719FCARG', width: 75},
                                                    {text: 'Processor </br> type', dataIndex: 'A4719TYPEDES', width: 200},
                                                    {text: 'Status', dataIndex: 'A4719ESTATDES', width: 200, sortable: false, align: 'right'},
                                                    {text: 'Report </br> code', dataIndex: 'A4719CODEF', width: 80},
                                                    {text: '', dataIndex: '', width: 60, renderer: 'onRendererColumnOnStatus'},
                                                    {
                                                        sortable: false,
                                                        xtype: 'actioncolumn',
                                                        text: 'Edit',
                                                        width: 50,
                                                        align: 'center',
                                                        items: [
                                                            {
                                                                iconCls: 'prx-icon-1400209639_24',
                                                                tooltip: 'Download',
                                                                handler: 'viewDataEntry_clickHandler',

                                                                getClass: function (v, meta, record) {
                                                                    if (Ext.String.trim(record.get('A4719TYPE')) === 'PACI') {
                                                                        return 'x-hidden'; // oculta el ícono
                                                                    }
                                                                    return 'prx-icon-1400209639_24';
                                                                }
                                                            }
                                                        ]
                                                    }


                                                ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pagginator-legend',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                                border: false,
                                padding: '0px 5px 0px 5px'
                            },
                            padding: '1px 5px 1px 5px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: prototype.widthContenedor,
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
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            text: 'Total ADMs',
                                            width: 80
                                        },
                                        {
                                            id: prototype.id + '-lblRowsTotalADM',
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
                        style: 'margin: 1px;',
                        bodyStyle: 'background: transparent;',
                        border: false
                    }
                }
            ]
        }
    ]
}
);


