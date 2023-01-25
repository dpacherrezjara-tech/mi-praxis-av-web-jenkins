

/* global Ext */


Ext.define('Ext.Praxis.view.flown.ZoneMasterFileForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.flown-zone-master-file-info',
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
                width: 950,
                height: 510,
                align: 'center'
            },
            items: [
                {
                    xtype: 'grid',
                    id: 'ZoneMasterFile-gridDataAirport',
                    height: 510,
                    width: 652,
                    hidden: false,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'

                        },
                        items: [
                            {text: 'Airport',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    border: true
                                },
                                columns: [
                                    {text: 'Code', dataIndex: 'ATOS', width: 150},
                                    {text: 'Airpot Name', dataIndex: 'strAeropuerto', width: 150, align: 'left'}
                                ]
                            },
                            {text: 'Zone',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Code', dataIndex: 'ZONA', width: 150},
                                    {text: 'Zone Name', dataIndex: 'strZONA', width: 150, align: 'left'}
                                ]
                            },
                            {
                                sortable: false,
                                xtype: 'actioncolumn',
                                width: 50,
                                text: 'Edit',
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
                    xtype: 'grid',
                    id: 'ZoneMasterFile-gridDataCityPair',
                    hidden: true,
                    height: 510,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'Origin City',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    border: true
                                },
                                columns: [
                                    {text: 'City',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center',
                                            border: true
                                        },
                                        columns: [
                                            {text: 'Code', dataIndex: 'ciudaOri', width: 60},
                                            {text: 'Name', dataIndex: 'strCiudadOri', width: 125, align: 'left'}
                                        ]
                                    },
                                    {text: 'Zone',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center',
                                            border: true
                                        },
                                        columns: [
                                            {text: 'Zone', dataIndex: 'zonaCiudadOri', width: 60, align: 'left'},
                                            {text: 'Zone Name', dataIndex: 'strzonaCiudadOri', width: 125, align: 'left'}
                                        ]
                                    }
                                ]
                            },
                            {text: 'Destination City',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    border: true
                                },
                                columns: [
                                    {text: 'City',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center',
                                            border: true
                                        },
                                        columns: [
                                            {text: 'Code', dataIndex: 'ciudaDes', width: 60},
                                            {text: 'City Name', dataIndex: 'strCiudaDes', width: 125, align: 'left'},
                                        ]
                                    },
                                    {text: 'Zone',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center',
                                            border: true
                                        },
                                        columns: [
                                            {text: 'Zone', dataIndex: 'zonaCiudaDes', width: 60, align: 'left'},
                                            {text: 'Zone Name', dataIndex: 'strzonaCiudaDes', width: 125, align: 'left'}
                                        ]
                                    }
                                ]
                            },
                            {text: 'Zone Result',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    border: true
                                },
                                columns: [
                                    {text: 'Pair Zone', dataIndex: 'zonaRe', width: 100},
                                    {text: 'Zona', dataIndex: 'strzonaRe', width: 110}
                                ]
                            }
                        ]
                    }
                },
                {
                    xtype: 'grid',
                    id: 'ZoneMasterFile-gridDataZone',
                    width: 350,
                    height: 510,
                    hidden: true,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'

                        },
                        items: [
                            {text: 'Zone Pair', dataIndex: 'ATOS', width: 100,
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    var tool = record.data['strzonaCiudadOri'].trim() + ' - ' + record.data['strzonaCiudaDes'].trim();
                                    if (tool.length > 0) {
                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                    }
                                    return  value;
                                }
                            },
                            {text: 'Zone Result',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Code', dataIndex: 'ZONA', width: 100},
                                    {text: 'Zone Name', dataIndex: 'strZONA', width: 150, align: 'left'}
                                ]
                            }
                        ]
                    }
                },
                {
                    xtype: 'panel',
                    id: 'ZoneMasterFile-pie',
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
                            width: 950,
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
                                    id: 'vZoneMasterFile-lbl-currentPage',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: 'vZoneMasterFile-lbl-pageCount',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: 'vZoneMasterFile-lbl-total',
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
