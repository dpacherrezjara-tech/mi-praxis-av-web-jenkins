/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.SSIMComplementaryFilesForm.Info', {
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
                width: 1300,
                height: 510,
                align: 'center'
            },
            items: [
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridData',
                    width: 835,
                    height: 529,
                    hidden: false,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'

                        },
                        items: [
                            {text: 'Nbr.', dataIndex: 'RN', width: 50},
                            {text: 'Seq.', dataIndex: 'NSEQ', width: 50},
                            {text: 'Flight',
                                columns: [
                                    {text: 'Number', dataIndex: 'NFLIGHT', width: 80, align: 'center', menuDisabled: true,
                                        defaults: {
                                            editable: false
                                        }
                                    }
                                ]
                            },
                            {text: 'Airport',
                                columns: [
                                    {text: 'Departure', dataIndex: 'CDEPART', width: 80, align: 'center', menuDisabled: true},
                                    {text: 'Arrival', dataIndex: 'CARRIVA', width: 80, align: 'center', menuDisabled: true}
                                ]
                            },
                            {text: 'LEG',  dataIndex: 'LEG', width: 50},
                            {text: 'Operation',
                                columns: [
                                    {text: 'Type', dataIndex: 'TOPER', width: 100, align: 'center', menuDisabled: true}
                                ]
                            },
                            {text: 'Flag',
                                columns: [
                                    {text: 'SSIM', dataIndex: 'FSSIM', width: 50, align: 'center', menuDisabled: true}
                                ]
                            },
                            {text: 'Daily',
                                columns: [
                                    {text: 'Rate', dataIndex: 'FREQ', width: 60, align: 'center', menuDisabled: true}
                                ]
                            },
                            {text: 'Carrier', dataIndex: 'CARRIER', width: 60, align: 'center'},
                            {text: 'Hard-Block', menuDisabled: true,
                                columns: [
                                    {text: 'Flight', menuDisabled: true,
                                        columns: [
                                            {text: 'Number', dataIndex: 'NFLIGHTH', width: 80, align: 'center', menuDisabled: true}
                                        ]
                                    },
                                    {text: 'Carrier', dataIndex: 'CARRIERH', width: 60, align: 'center', menuDisabled: true}
                                ]
                            },
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
}
);

