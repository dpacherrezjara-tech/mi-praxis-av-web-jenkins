/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.CalendarAccountingForm.Info', {
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
                width: 1260,
                height: 530,
                align: 'center'
            },
            items: [
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridData',
                    height: 530,
                    hidden: false,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'

                        },
                        items: [
                            {text: 'Accounting <br> Date', width: 100, dataIndex: 'A1980FECCO'},
                            {text: 'Calendar Date', defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'

                                },
                                columns: [
                                    {text: 'Mexico', width: 80, dataIndex: 'A1980FECMX'},
                                    {text: 'Praxis Local', width: 120, dataIndex: 'A1980FECPR'}
                                ]
                            },
                            {text: 'GL',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'

                                },
                                columns: [
                                    {text: 'Status', width: 60, dataIndex: 'A1980GL'},
                                    {text: 'Time', defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'

                                        },
                                        columns: [
                                            {text: 'Mexico', width: 80, dataIndex: 'A1980HMXGL'},
                                            {text: 'Praxis Local', width: 120, dataIndex: 'A1980HPRGL'},
                                        ]
                                    }

                                ]
                            },
                            {text: 'AR',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'

                                },
                                columns: [
                                    {text: 'Status', width: 60, dataIndex: 'A1980AR'},
                                    {text: 'Time', defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'

                                        },
                                        columns: [
                                            {text: 'Mexico', width: 80, dataIndex: 'A1980HMXAR'},
                                            {text: 'Praxis Local', width: 120, dataIndex: 'A1980HPRAR'},
                                        ]
                                    }

                                ]
                            },
                            {text: 'AP',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'

                                },
                                columns: [
                                    {text: 'Status', width: 60, dataIndex: 'A1980AP'},
                                    {text: 'Time', defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'

                                        },
                                        columns: [
                                            {text: 'Mexico', width: 80, dataIndex: 'A1980HMXAP'},
                                            {text: 'Praxis Local', width: 120, dataIndex: 'A1980HPRAP'},
                                        ]
                                    }

                                ]
                            },
                            {text: "AR's/AP's Pendings",
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'

                                },
                                columns: [
                                    {text: 'From', width: 60, dataIndex: 'A1980FECIN'},
                                    {text: 'To', width: 60, dataIndex: 'A1980FECFN'}

                                ]
                            }
                            ,
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

