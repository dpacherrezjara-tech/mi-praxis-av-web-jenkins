// <editor-fold defaultstate="collapsed" desc="prototype">
prototype.id = 'EstimationReverseProcessForm';
prototype.url = CONTEXTPATH+'/EstimationReverseProcessSales';
prototype.widthContenedor = 1410;
prototype.widthGrid = 1380;
// </editor-fold>

Ext.define('Ext.Praxis.view.sales.EstimationReverseProcessForm.EstimationReverseProcessForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.EstimationReverseProcessForm',
    requires: [
        'Ext.Praxis.controller.sales.EstimationReverseProcess.EstimationReverseProcessController',
        'Ext.Praxis.view.sales.EstimationReverseProcessForm.Options',
        'Ext.Praxis.view.sales.EstimationReverseProcessForm.Filters',
        'Ext.Praxis.view.sales.EstimationReverseProcessForm.Info'
    ],
    controller: 'EstimationReverseProcessController',
    layout: {
        type: 'fit'
    },
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            id: prototype.id + '-xpanel',
            autoScroll: false,
            layout: 'fit',
            items: [
                {
                    id: prototype.id + '-form',
                    border: false,
                    bodyCls: 'colorFondo',
                    layout: 'fit',
                    defaults: {
                        border: false,
                        autoScroll: true
                    },
                    items: [
                        {
                            xtype: 'panel',
                            region: 'center',
                            layout: 'border',
                            bodyCls: 'colorFondo',
                            items: [
                                {
                                    region: 'center',
                                    id: prototype.id + '-centerC',
                                    bodyCls: 'colorFondo',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    border: true,
                                    defaults: {
                                        width: prototype.widthContenedor + 8
                                    },
                                    items: [
                                        {xtype: 'tbspacer', height: 25},
                                        {
                                            xtype: 'tabpanel',
                                            height: 803,
                                            defaults: {
                                                height: 803,
                                                border: true
                                            },
                                            activeTab: 0,
                                            enableKeyEvents: true,
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    title: "Processing",
                                                    width: prototype.widthContenedor,
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'center'
                                                    },
                                                    defaults: {
                                                        width: prototype.widthContenedor,
                                                        align: 'center'
                                                    },
                                                    items: [
                                                        {xtype: 'tbspacer', height: 7},
                                                        {
                                                            xtype: prototype.id + '-options'
                                                        }
                                                        ,
                                                        {
                                                            xtype: prototype.id + '-filters',
                                                            id: prototype.id + '-contentFilter'
                                                        }
                                                        ,
                                                        {
                                                            xtype: 'panel',
                                                            height: 580,
                                                            layout: 'fit',
                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: 'border',
                                                                    align: 'center',
                                                                    border: true,
                                                                    defaults: {
                                                                        border: true
                                                                    },
                                                                    items: [
                                                                        {
                                                                            region: 'center',
                                                                            xtype: prototype.id + '-info',
                                                                            id: prototype.id + '-contentInfo'
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id+'-boxMainResultado',
                                                    title: "Result Processing",
                                                    bodyStyle: 'background-color: #E3EAEF;',
                                                    width: prototype.widthContenedor,
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'center'
                                                    },
                                                    defaults: {
                                                        width: prototype.widthContenedor,
                                                        align: 'center'
                                                    },
                                                    items: [
                                                        {xtype: 'tbspacer', height: 17},
                                                        {
                                                            xtype: 'panel',
                                                            id: prototype.id + '-boxDownloadFiles',
                                                            width: prototype.widthContenedor,
                                                            layout: {
                                                                type: 'hbox',
                                                                pack: 'end'
                                                            },
                                                            border: false,
                                                            hidden: false,
                                                            bodyStyle: 'background-color: transparent;',
                                                            defaults: {
                                                                anchor: '100%'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.id + '-btnDownloadFiles',
                                                                    html: '<strong>Download Files</strong>',
                                                                    border: true,
                                                                    scale: 'small',
                                                                    width: 117,
                                                                    listeners: {
                                                                        click: 'btnDownloadFiles_click'
                                                                    }
                                                                },
                                                                {xtype: 'tbspacer', width: 12}
                                                            ]
                                                        },
                                                        {xtype: 'tbspacer', height: 12},
                                                        // <editor-fold defaultstate="collapsed" desc="gridResult">
                                                        {
                                                            xtype: 'grid',
                                                            id: prototype.id + '-gridResult',
                                                            width: 800,
                                                            height: 560,
                                                            border: true,
                                                            columnLines: true,
                                                            columns: {
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                items: [
                                                                    {
                                                                        text: 'Nbr', dataIndex: 'RN', width: 60
                                                                    },
                                                                    {
                                                                        text: 'Accounting Date', dataIndex: 'FCONT', flex: 1//width: 120
                                                                    },
                                                                    {
                                                                        text: 'Processing Date', dataIndex: '', flex: 1
                                                                    },
                                                                    {
                                                                        text: 'Source', dataIndex: '', flex: 1
                                                                    },
                                                                    {
                                                                        text: 'Country', dataIndex: '', flex: 1
                                                                    },
                                                                    {
                                                                        text: 'D. Channel', dataIndex: '', flex: 1
                                                                    },
                                                                    {
                                                                        text: 'Cia', dataIndex: '', flex: 1
                                                                    },
                                                                    {
                                                                        xtype: 'checkcolumn',
                                                                        text: '', dataIndex: 'DESCARGA', width: 70,
                                                                        defaults: {
                                                                            align: 'center'
                                                                        },
                                                                        items: [
                                                                            {
                                                                                xtype: 'checkboxfield',
                                                                                id: prototype.id+'-chkAll',
                                                                                boxLabel: '',
                                                                                checked: false,
                                                                                width: 16,
                                                                                listeners: {
                                                                                    change: 'checkAll_clickHandler'
                                                                                }
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                        // </editor-fold>
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});