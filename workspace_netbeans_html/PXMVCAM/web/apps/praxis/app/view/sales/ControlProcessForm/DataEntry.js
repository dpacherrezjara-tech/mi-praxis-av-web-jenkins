/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.ControlProcessForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.sales.ControlProcess.DataEntryControlProcessController'
    ],
    title: 'Sales Report: Control Process Detail',
    header: true,
    width: 880,
    height: 700,
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        align: 'center'
    },
    modal: true,
    items: [
        {
            region: 'center',
            xtype: 'form',
            id: prototype.id + '-DataEntry-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    width: 860,
                    margin: '5 5 5 5',
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="PanelFilters">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-de-panelOptions',
                            border: false,
                            width: 860,
                            layout: {
                                type: 'hbox',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 100,
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'toolbar',
                                            cls: 'x-toolbar-pag',
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id + '-de-btn-pag-first',
                                                    iconCls: 'prx-icon-pagination-first',
                                                    tooltip: 'First Page',
                                                    listeners: {
                                                        click: 'pagFirst'
                                                    }

                                                },
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id + '-de-btn-pag-previous',
                                                    iconCls: 'prx-icon-pagination-previous',
                                                    tooltip: 'Previous Page',
                                                    listeners: {
                                                        click: 'pagPrevious'
                                                    }

                                                },
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id + '-de-btn-pag-next',
                                                    iconCls: 'prx-icon-pagination-next',
                                                    tooltip: 'Next Page',
                                                    listeners: {
                                                        click: 'pagNext'
                                                    }

                                                },
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id + '-de-btn-pag-last',
                                                    iconCls: 'prx-icon-pagination-last',
                                                    tooltip: 'Last Page',
                                                    listeners: {
                                                        click: 'pagLast'
                                                    }

                                                }
                                                , {
                                                    xtype: 'pagingtoolbar',
                                                    id: prototype.id + '-de-paggin',
                                                    pageSize: 10,
                                                    border: false,
                                                    displayInfo: false,
                                                    hidden: true
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'toolbar',
                                    items: [
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-de-btnSearch',
                                            iconCls: 'prx-icon-search',
                                            tooltip: 'Search',
                                            listeners: {
                                                click: 'onBtnSearch'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-de-btnClear',
                                            iconCls: 'prx-icon-clear',
                                            tooltip: 'Clear Options',
                                            listeners: {
                                                click: 'onBtnClear'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-de-btnExcel',
                                            iconCls: 'prx-icon-excel',
                                            tooltip: 'Export to Excel',
                                            listeners: {
                                                click: 'onBtnExcel'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-de-btnClear',
                                            iconCls: 'prx-icon-clear',
                                            tooltip: 'Clear Options',
                                            listeners: {
                                               // click: 'onBtnClear'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-de-btnBack',
                                            iconCls: 'prx-icon-back',
                                            tooltip: 'Back',
                                            listeners: {
                                                click: 'onBtnBack'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }, // </editor-fold>


                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            margin: '5 0 1 0',
                            border: true,
                            align: 'center',
                            width: 860,
                            height: 570,
                            bodyStyle: 'background: #E5ECEF',
                            defaults: {
                                bodyStyle: 'background: #E5ECEF',
                                width: 860
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="GridData">
                                {
                                    xtype: 'panel',
                                    layout: 'vbox',
                                    align: 'center',
                                    margin: '1 0 1 5',
                                    border: false,
                                    defaults: {
                                        bodyStyle: 'background: #E5ECEF'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            padding: '20 0 0 0',
                                            id: prototype.id + '-de-gridData',
                                            height: 520,
                                            width: 842,
                                            columnLines: true,
                                            resizable: false,
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    resizable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {text: 'Group', width: 60, dataIndex: 'A1530GRUPO'},
                                                    {text: 'Source', width: 60, dataIndex: 'A1530FUENT'},
                                                    {text: 'Channel', width: 60, dataIndex: 'A1530SFUEN'},
                                                    {text: 'Bank', width: 60, dataIndex: 'A1530CIUVT'},
                                                    {text: 'IATA', width: 60, dataIndex: 'A1530AGENT'},
                                                    {text: 'Currency', width: 60, dataIndex: 'A1530MDA'},
                                                    {text: 'F/Ending', width: 60, dataIndex: 'A1530FHAST'},
                                                    {text: 'F/Proc.', width: 60, dataIndex: 'A1530FPROC'},
                                                    {text: 'F/Cont', width: 60, dataIndex: 'A1530FCONT'},
                                                    {text: 'Id Cont.', width: 60, dataIndex: 'A1530IDCON'},
                                                    {text: 'GL', width: 60, dataIndex: 'A1530POLGL'},
                                                    {text: 'AR', width: 60, dataIndex: 'A1530POLAR'},
                                                    {text: 'AP', width: 60, dataIndex: 'A1530POLAP'},
                                                    {text: 'Status', width: 60, dataIndex: 'A1530STPRO_00'}
                                                ]
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-de-pie',
                                    //hidden: true,
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
                                            width: 840,
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
                                                    id: prototype.id + '-de-lbl-currentPage',
                                                    text: '1',
                                                    width: 50
                                                },
                                                {
                                                    text: 'Of',
                                                    width: 50
                                                },
                                                {
                                                    id: prototype.id + '-de-lbl-pageCount',
                                                    text: '0',
                                                    width: 50
                                                },
                                                {xtype: 'tbspacer', width: 100},
                                                {
                                                    text: 'Total found',
                                                    width: 80
                                                },
                                                {
                                                    id: prototype.id + '-de-lbl-total',
                                                    text: '0',
                                                    width: 50
                                                }
                                            ]
                                        }
                                    ]
                                }




                                // </editor-fold>


                            ]
                        }
                    ]
                }

            ]
        }
    ]
});