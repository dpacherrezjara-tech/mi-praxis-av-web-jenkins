prototype.MasterIndex = {
    id: 'SrcMasterIndexForm'
};
Ext.define('Ext.Praxis.view.screens.SrcMasterIndexForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.SrcMasterIndexForm',
    requires: [
        'Ext.Praxis.controller.screens.SrcMasterIndexController'
    ],
    controller: 'SrcMasterIndexController',
    title: 'Master Index',
    header: true,
    width: 1103,
    height: 615,
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
            border: false,
            autoScroll: true,
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                width: 1036
            },
            items: [
                {xtype: 'tbspacer', height: 7},
                {
                    xtype: 'panel',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    border: false,
                    bodyStyle: 'background-color: transparent;',
                    items: [
                        {
                            xtype: 'label',
                            text: 'Master Index ',
                            style: 'font-weight:bold;text-align:center;font-size:18px;background-color:#3D61AA;color:#FFFFFF;',
                            width: '100%',
                            padding: '4 0'
                        }
                    ]
                },
                //<editor-fold defaultstate="collapsed" desc="BoxCupon1">
                {
                    xtype: 'panel',
                    id: prototype.MasterIndex.id+'-BoxCupon1',
                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    border: false,
                    bodyStyle: 'background-color: transparent;',
                    defaults: {
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background-color: #E3EAEF;',
                            defaults: {
                                padding: '4 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: '1%'},
                                {
                                    xtype: 'label',
                                    id: prototype.MasterIndex.id+'-lblTicket1',
                                    html: '&nbsp',
                                    style: 'font-weight:bold;',
                                    width: '49%',
                                    padding: '4 0'
                                },
                                {
                                    xtype: 'label',
                                    id: prototype.MasterIndex.id+'-lblAirline1',
                                    html: '&nbsp',
                                    style: 'font-weight:bold;text-align:right;',
                                    width: '49%',
                                    padding: '4 0'
                                },
                                {xtype: 'tbspacer', width: '1%'}
                            ]
                        },
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: false,
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 510,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                        flex: 1,
                                        border: false
                                    },
                                    items: [
                                        //<editor-fold defaultstate="collapsed" desc="Prorate Number">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Prorate Number',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020KEY',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 9,
                                                    readOnly: true,
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Sector',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020RUTAP',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:#FFE8DD;',
                                                    enforceMaxLength: true,
                                                    maxLength: 6,
                                                    readOnly: true,
                                                    width: 65
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Fare Basis',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020BASE',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 7,
                                                    readOnly: true,
                                                    width: 70
                                                },
                                                {xtype: 'tbspacer', width: 5}
                                            ]
                                        },
                                        //</editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        //<editor-fold defaultstate="collapsed" desc="Group">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Group',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020GRUPOstrTUSO',
                                                    fieldStyle: 'text-align:center;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 13,
                                                    readOnly: true,
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Sales Date',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020FVENTA',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    readOnly: true,
                                                    width: 65
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Flight Date',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020FVLO',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    readOnly: true,
                                                    width: 70
                                                },
                                                {xtype: 'tbspacer', width: 5}
                                            ]
                                        },
                                        //</editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        //<editor-fold defaultstate="collapsed" desc="Invoice Date">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Invoice Date',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020SUFECH',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    readOnly: true,
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Source ',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020TUSO',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 2,
                                                    readOnly: true,
                                                    width: 65
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Currency',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020MNRCD',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 3,
                                                    readOnly: true,
                                                    width: 70
                                                },
                                                {xtype: 'tbspacer', width: 5}
                                            ]
                                        },
                                        //</editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        //<editor-fold defaultstate="collapsed" desc="RM">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'RM',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020RMANT',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    readOnly: true,
                                                    width: 80
                                                }
                                            ]
                                        }
                                        //</editor-fold>
                                    ]
                                },
                                //<editor-fold defaultstate="collapsed" desc="1era Columna">
                                {
                                    xtype: 'panel',
                                    width: 80,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                        flex: 1,
                                        border: false
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #98989F;',
                                            items: [
                                                {xtype: 'tbspacer', width: 3},
                                                {
                                                    xtype: 'label',
                                                    html: '&nbsp;',
                                                    style: 'font-weight:bold;color:#FFFFFF;font-size:10px;text-align:center;',
                                                    width: 78,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: 22,
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'INVOICE',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 78,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {xtype: 'tbspacer', height: 2},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: 22,
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'ACCEPT',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 78,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {xtype: 'tbspacer', height: 2},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: 23,
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'REDEBIT',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 78,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="Gross">
                                {
                                    xtype: 'panel',
                                    width: 82,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #98989F;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'Gross',
                                                    style: 'font-weight:bold;color:#FFFFFF;font-size:10px;text-align:center;',
                                                    width: 80,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020SUDEBI',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020ACEPTA',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020REDEBI',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="Rate">
                                {
                                    xtype: 'panel',
                                    width: 82,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #98989F;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'Rate',
                                                    style: 'font-weight:bold;color:#FFFFFF;font-size:10px;text-align:center;',
                                                    width: 80,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020ANALIZ',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020COMISP',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-none',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="ISC">
                                {
                                    xtype: 'panel',
                                    width: 82,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #98989F;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'ISC',
                                                    style: 'font-weight:bold;color:#FFFFFF;font-size:10px;text-align:center;',
                                                    width: 80,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020IMPNAC',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020IMPINT',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020COMISI',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="Tax">
                                {
                                    xtype: 'panel',
                                    width: 82,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #98989F;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'Tax',
                                                    style: 'font-weight:bold;color:#FFFFFF;font-size:10px;text-align:center;',
                                                    width: 80,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020TOTDEB',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020TOTHAB',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020TAX',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="Net">
                                {
                                    xtype: 'panel',
                                    width: 82,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #98989F;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'Net',
                                                    style: 'font-weight:bold;color:#FFFFFF;font-size:10px;text-align:center;',
                                                    width: 80,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtneto1',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtneto2',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020NETO',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:#1E55D1;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="RM">
                                {
                                    xtype: 'panel',
                                    width: 30,
                                    layout: 'vbox',
                                    border: true,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 21,
                                            bodyStyle: 'background-color: #98989F;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'RM',
                                                    style: 'font-weight:bold;color:#FFFFFF;font-size:10px;text-align:center;',
                                                    width: 30,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 48},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020RMSN',
                                            fieldStyle: 'text-align:center;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 30,
                                            padding: '0',
                                            margin: '0'
                                        }
                                    ]
                                }
                                //</editor-fold>
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="BoxCupon2">
                {
                    xtype: 'panel',
                    id: prototype.MasterIndex.id+'-BoxCupon2',
                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    border: false,
                    bodyStyle: 'background-color: transparent;',
                    defaults: {
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background-color: #E3EAEF;',
                            defaults: {
                                padding: '4 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: '1%'},
                                {
                                    xtype: 'label',
                                    id: prototype.MasterIndex.id+'-lblTicket2',
                                    html: '&nbsp',
                                    style: 'font-weight:bold;',
                                    width: '49%',
                                    padding: '4 0'
                                },
                                {
                                    xtype: 'label',
                                    id: prototype.MasterIndex.id+'-lblAirline2',
                                    html: '&nbsp',
                                    style: 'font-weight:bold;text-align:right;',
                                    width: '49%',
                                    padding: '4 0'
                                },
                                {xtype: 'tbspacer', width: '1%'}
                            ]
                        },
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: false,
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 510,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                        flex: 1,
                                        border: false
                                    },
                                    items: [
                                        //<editor-fold defaultstate="collapsed" desc="Prorate Number">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Prorate Number',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020KEY1',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 9,
                                                    readOnly: true,
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Sector',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020RUTAP1',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:#FFE8DD;',
                                                    enforceMaxLength: true,
                                                    maxLength: 6,
                                                    readOnly: true,
                                                    width: 65
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Fare Basis',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020BASE1',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 7,
                                                    readOnly: true,
                                                    width: 70
                                                },
                                                {xtype: 'tbspacer', width: 5}
                                            ]
                                        },
                                        //</editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        //<editor-fold defaultstate="collapsed" desc="Group">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Group',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020GRUPOstrTUSO1',
                                                    fieldStyle: 'text-align:center;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 10,
                                                    readOnly: true,
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Sales Date',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020FVENTA1',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    readOnly: true,
                                                    width: 65
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Flight Date',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020FVLO1',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    readOnly: true,
                                                    width: 70
                                                },
                                                {xtype: 'tbspacer', width: 5}
                                            ]
                                        },
                                        //</editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        //<editor-fold defaultstate="collapsed" desc="Invoice Date">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Invoice Date',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020SUFECH1',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    readOnly: true,
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Source ',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020TUSO1',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 2,
                                                    readOnly: true,
                                                    width: 65
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Currency',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020MNRCD1',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 3,
                                                    readOnly: true,
                                                    width: 70
                                                },
                                                {xtype: 'tbspacer', width: 5}
                                            ]
                                        },
                                        //</editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        //<editor-fold defaultstate="collapsed" desc="RM">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'RM',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020RMANT1',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    readOnly: true,
                                                    width: 80
                                                }
                                            ]
                                        }
                                        //</editor-fold>
                                    ]
                                },
                                //<editor-fold defaultstate="collapsed" desc="1era Columna">
                                {
                                    xtype: 'panel',
                                    width: 80,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                        flex: 1,
                                        border: false
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #E0EEF3;',
                                            items: [
                                                {xtype: 'tbspacer', width: 3},
                                                {
                                                    xtype: 'label',
                                                    html: '&nbsp;',
                                                    style: 'font-weight:bold;color:#FFFFFF;font-size:10px;text-align:center;',
                                                    width: 78,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: 22,
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'INVOICE',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 78,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {xtype: 'tbspacer', height: 2},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: 22,
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'ACCEPT',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 78,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {xtype: 'tbspacer', height: 2},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: 23,
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'REDEBIT',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 78,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="Gross">
                                {
                                    xtype: 'panel',
                                    width: 82,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #E0EEF3;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'Gross',
                                                    style: 'font-weight:bold;color:#000000;font-size:10px;text-align:center;',
                                                    width: 80,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020SUDEBI1',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020ACEPTA1',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020REDEBI1',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="Rate">
                                {
                                    xtype: 'panel',
                                    width: 82,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #E0EEF3;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'Rate',
                                                    style: 'font-weight:bold;color:#000000;font-size:10px;text-align:center;',
                                                    width: 80,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020ANALIZ1',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020COMISP1',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-none1',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="ISC">
                                {
                                    xtype: 'panel',
                                    width: 82,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #E0EEF3;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'ISC',
                                                    style: 'font-weight:bold;color:#000000;font-size:10px;text-align:center;',
                                                    width: 80,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020IMPNAC1',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020IMPINT1',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020COMISI1',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="Tax">
                                {
                                    xtype: 'panel',
                                    width: 82,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #E0EEF3;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'Tax',
                                                    style: 'font-weight:bold;color:#000000;font-size:10px;text-align:center;',
                                                    width: 80,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020TOTDEB1',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020TOTHAB1',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020TAX1',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="Net">
                                {
                                    xtype: 'panel',
                                    width: 82,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #E0EEF3;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'Net',
                                                    style: 'font-weight:bold;color:#000000;font-size:10px;text-align:center;',
                                                    width: 80,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtneto11',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtneto21',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020NETO1',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:#1E55D1;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="RM">
                                {
                                    xtype: 'panel',
                                    width: 30,
                                    layout: 'vbox',
                                    border: true,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 21,
                                            bodyStyle: 'background-color: #E0EEF3;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'RM',
                                                    style: 'font-weight:bold;color:#000000;font-size:10px;text-align:center;',
                                                    width: 30,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 48},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020RMSN1',
                                            fieldStyle: 'text-align:center;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 30,
                                            padding: '0',
                                            margin: '0'
                                        }
                                    ]
                                }
                                //</editor-fold>
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="BoxCupon3">
                {
                    xtype: 'panel',
                    id: prototype.MasterIndex.id+'-BoxCupon3',
                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    border: false,
                    bodyStyle: 'background-color: transparent;',
                    defaults: {
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background-color: #E3EAEF;',
                            defaults: {
                                padding: '4 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: '1%'},
                                {
                                    xtype: 'label',
                                    id: prototype.MasterIndex.id+'-lblTicket3',
                                    html: '&nbsp',
                                    style: 'font-weight:bold;',
                                    width: '49%',
                                    padding: '4 0'
                                },
                                {
                                    xtype: 'label',
                                    id: prototype.MasterIndex.id+'-lblAirline3',
                                    html: '&nbsp',
                                    style: 'font-weight:bold;text-align:right;',
                                    width: '49%',
                                    padding: '4 0'
                                },
                                {xtype: 'tbspacer', width: '1%'}
                            ]
                        },
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: false,
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 510,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                        flex: 1,
                                        border: false
                                    },
                                    items: [
                                        //<editor-fold defaultstate="collapsed" desc="Prorate Number">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Prorate Number',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020KEY2',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 9,
                                                    readOnly: true,
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Sector',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020RUTAP2',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:#FFE8DD;',
                                                    enforceMaxLength: true,
                                                    maxLength: 6,
                                                    readOnly: true,
                                                    width: 65
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Fare Basis',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020BASE2',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 7,
                                                    readOnly: true,
                                                    width: 70
                                                },
                                                {xtype: 'tbspacer', width: 5}
                                            ]
                                        },
                                        //</editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        //<editor-fold defaultstate="collapsed" desc="Group">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Group',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020GRUPOstrTUSO2',
                                                    fieldStyle: 'text-align:center;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 13,
                                                    readOnly: true,
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Sales Date',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020FVENTA2',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    readOnly: true,
                                                    width: 65
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Flight Date',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020FVLO2',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    readOnly: true,
                                                    width: 70
                                                },
                                                {xtype: 'tbspacer', width: 5}
                                            ]
                                        },
                                        //</editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        //<editor-fold defaultstate="collapsed" desc="Invoice Date">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Invoice Date',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020SUFECH2',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    readOnly: true,
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Source ',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020TUSO2',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 2,
                                                    readOnly: true,
                                                    width: 65
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Currency',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020MNRCD2',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 3,
                                                    readOnly: true,
                                                    width: 70
                                                },
                                                {xtype: 'tbspacer', width: 5}
                                            ]
                                        },
                                        //</editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        //<editor-fold defaultstate="collapsed" desc="RM">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'RM',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020RMANT2',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    readOnly: true,
                                                    width: 80
                                                }
                                            ]
                                        }
                                        //</editor-fold>
                                    ]
                                },
                                //<editor-fold defaultstate="collapsed" desc="1era Columna">
                                {
                                    xtype: 'panel',
                                    width: 80,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                        flex: 1,
                                        border: false
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #98989F;',
                                            items: [
                                                {xtype: 'tbspacer', width: 3},
                                                {
                                                    xtype: 'label',
                                                    html: '&nbsp;',
                                                    style: 'font-weight:bold;color:#FFFFFF;font-size:10px;text-align:center;',
                                                    width: 78,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: 22,
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'INVOICE',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 78,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {xtype: 'tbspacer', height: 2},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: 22,
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'ACCEPT',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 78,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {xtype: 'tbspacer', height: 2},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: 23,
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'REDEBIT',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 78,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="Gross">
                                {
                                    xtype: 'panel',
                                    width: 82,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #98989F;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'Gross',
                                                    style: 'font-weight:bold;color:#FFFFFF;font-size:10px;text-align:center;',
                                                    width: 80,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020SUDEBI2',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020ACEPTA2',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020REDEBI2',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="Rate">
                                {
                                    xtype: 'panel',
                                    width: 82,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #98989F;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'Rate',
                                                    style: 'font-weight:bold;color:#FFFFFF;font-size:10px;text-align:center;',
                                                    width: 80,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020ANALIZ2',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020COMISP2',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-none2',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="ISC">
                                {
                                    xtype: 'panel',
                                    width: 82,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #98989F;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'ISC',
                                                    style: 'font-weight:bold;color:#FFFFFF;font-size:10px;text-align:center;',
                                                    width: 80,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020IMPNAC2',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020IMPINT2',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020COMISI2',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="Tax">
                                {
                                    xtype: 'panel',
                                    width: 82,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #98989F;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'Tax',
                                                    style: 'font-weight:bold;color:#FFFFFF;font-size:10px;text-align:center;',
                                                    width: 80,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020TOTDEB2',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020TOTHAB2',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020TAX2',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="Net">
                                {
                                    xtype: 'panel',
                                    width: 82,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #98989F;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'Net',
                                                    style: 'font-weight:bold;color:#FFFFFF;font-size:10px;text-align:center;',
                                                    width: 80,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtneto12',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtneto22',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020NETO2',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:#1E55D1;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="RM">
                                {
                                    xtype: 'panel',
                                    width: 30,
                                    layout: 'vbox',
                                    border: true,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 21,
                                            bodyStyle: 'background-color: #98989F;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'RM',
                                                    style: 'font-weight:bold;color:#FFFFFF;font-size:10px;text-align:center;',
                                                    width: 30,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 48},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020RMSN2',
                                            fieldStyle: 'text-align:center;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 30,
                                            padding: '0',
                                            margin: '0'
                                        }
                                    ]
                                }
                                //</editor-fold>
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="BoxCupon4">
                {
                    xtype: 'panel',
                    id: prototype.MasterIndex.id+'-BoxCupon4',
                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    border: false,
                    bodyStyle: 'background-color: transparent;',
                    defaults: {
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background-color: #E3EAEF;',
                            defaults: {
                                padding: '4 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: '1%'},
                                {
                                    xtype: 'label',
                                    id: prototype.MasterIndex.id+'-lblTicket4',
                                    html: '&nbsp',
                                    style: 'font-weight:bold;',
                                    width: '49%',
                                    padding: '4 0'
                                },
                                {
                                    xtype: 'label',
                                    id: prototype.MasterIndex.id+'-lblAirline4',
                                    html: '&nbsp',
                                    style: 'font-weight:bold;text-align:right;',
                                    width: '49%',
                                    padding: '4 0'
                                },
                                {xtype: 'tbspacer', width: '1%'}
                            ]
                        },
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: false,
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 510,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                        flex: 1,
                                        border: false
                                    },
                                    items: [
                                        //<editor-fold defaultstate="collapsed" desc="Prorate Number">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Prorate Number',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020KEY3',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 9,
                                                    readOnly: true,
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Sector',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020RUTAP3',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:#FFE8DD;',
                                                    enforceMaxLength: true,
                                                    maxLength: 6,
                                                    readOnly: true,
                                                    width: 65
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Fare Basis',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020BASE3',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 7,
                                                    readOnly: true,
                                                    width: 70
                                                },
                                                {xtype: 'tbspacer', width: 5}
                                            ]
                                        },
                                        //</editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        //<editor-fold defaultstate="collapsed" desc="Group">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Group',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020GRUPOstrTUSO3',
                                                    fieldStyle: 'text-align:center;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 10,
                                                    readOnly: true,
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Sales Date',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020FVENTA3',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    readOnly: true,
                                                    width: 65
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Flight Date',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020FVLO3',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    readOnly: true,
                                                    width: 70
                                                },
                                                {xtype: 'tbspacer', width: 5}
                                            ]
                                        },
                                        //</editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        //<editor-fold defaultstate="collapsed" desc="Invoice Date">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Invoice Date',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020SUFECH3',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    readOnly: true,
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Source ',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020TUSO3',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 2,
                                                    readOnly: true,
                                                    width: 65
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Currency',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020MNRCD3',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 3,
                                                    readOnly: true,
                                                    width: 70
                                                },
                                                {xtype: 'tbspacer', width: 5}
                                            ]
                                        },
                                        //</editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        //<editor-fold defaultstate="collapsed" desc="RM">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'RM',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020RMANT3',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    readOnly: true,
                                                    width: 80
                                                }
                                            ]
                                        }
                                        //</editor-fold>
                                    ]
                                },
                                //<editor-fold defaultstate="collapsed" desc="1era Columna">
                                {
                                    xtype: 'panel',
                                    width: 80,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                        flex: 1,
                                        border: false
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #E0EEF3;',
                                            items: [
                                                {xtype: 'tbspacer', width: 3},
                                                {
                                                    xtype: 'label',
                                                    html: '&nbsp;',
                                                    style: 'font-weight:bold;color:#FFFFFF;font-size:10px;text-align:center;',
                                                    width: 78,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: 22,
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'INVOICE',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 78,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {xtype: 'tbspacer', height: 2},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: 22,
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'ACCEPT',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 78,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {xtype: 'tbspacer', height: 2},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: 23,
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'REDEBIT',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 78,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="Gross">
                                {
                                    xtype: 'panel',
                                    width: 82,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #E0EEF3;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'Gross',
                                                    style: 'font-weight:bold;color:#000000;font-size:10px;text-align:center;',
                                                    width: 80,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020SUDEBI3',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020ACEPTA3',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020REDEBI3',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="Rate">
                                {
                                    xtype: 'panel',
                                    width: 82,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #E0EEF3;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'Rate',
                                                    style: 'font-weight:bold;color:#000000;font-size:10px;text-align:center;',
                                                    width: 80,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020ANALIZ3',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020COMISP3',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-none3',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="ISC">
                                {
                                    xtype: 'panel',
                                    width: 82,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #E0EEF3;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'ISC',
                                                    style: 'font-weight:bold;color:#000000;font-size:10px;text-align:center;',
                                                    width: 80,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020IMPNAC3',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020IMPINT3',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020COMISI3',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="Tax">
                                {
                                    xtype: 'panel',
                                    width: 82,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #E0EEF3;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'Tax',
                                                    style: 'font-weight:bold;color:#000000;font-size:10px;text-align:center;',
                                                    width: 80,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020TOTDEB3',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020TOTHAB3',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020TAX3',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="Net">
                                {
                                    xtype: 'panel',
                                    width: 82,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #E0EEF3;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'Net',
                                                    style: 'font-weight:bold;color:#000000;font-size:10px;text-align:center;',
                                                    width: 80,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtneto13',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtneto23',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020NETO3',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:#1E55D1;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="RM">
                                {
                                    xtype: 'panel',
                                    width: 30,
                                    layout: 'vbox',
                                    border: true,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 21,
                                            bodyStyle: 'background-color: #E0EEF3;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'RM',
                                                    style: 'font-weight:bold;color:#000000;font-size:10px;text-align:center;',
                                                    width: 30,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 48},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020RMSN3',
                                            fieldStyle: 'text-align:center;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 30,
                                            padding: '0',
                                            margin: '0'
                                        }
                                    ]
                                }
                                //</editor-fold>
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="BoxCupon5">
                {
                    xtype: 'panel',
                    id: prototype.MasterIndex.id+'-BoxCupon5',
                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    border: false,
                    bodyStyle: 'background-color: transparent;',
                    defaults: {
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background-color: #E3EAEF;',
                            defaults: {
                                padding: '4 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: '1%'},
                                {
                                    xtype: 'label',
                                    id: prototype.MasterIndex.id+'-lblTicket5',
                                    html: '&nbsp',
                                    style: 'font-weight:bold;',
                                    width: '49%',
                                    padding: '4 0'
                                },
                                {
                                    xtype: 'label',
                                    id: prototype.MasterIndex.id+'-lblAirline5',
                                    html: '&nbsp',
                                    style: 'font-weight:bold;text-align:right;',
                                    width: '49%',
                                    padding: '4 0'
                                },
                                {xtype: 'tbspacer', width: '1%'}
                            ]
                        },
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: false,
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 510,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                        flex: 1,
                                        border: false
                                    },
                                    items: [
                                        //<editor-fold defaultstate="collapsed" desc="Prorate Number">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Prorate Number',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020KEY4',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 9,
                                                    readOnly: true,
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Sector',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020RUTAP4',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:#FFE8DD;',
                                                    enforceMaxLength: true,
                                                    maxLength: 6,
                                                    readOnly: true,
                                                    width: 65
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Fare Basis',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020BASE4',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 7,
                                                    readOnly: true,
                                                    width: 70
                                                },
                                                {xtype: 'tbspacer', width: 5}
                                            ]
                                        },
                                        //</editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        //<editor-fold defaultstate="collapsed" desc="Group">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Group',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020GRUPOstrTUSO4',
                                                    fieldStyle: 'text-align:center;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 13,
                                                    readOnly: true,
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Sales Date',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020FVENTA4',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    readOnly: true,
                                                    width: 65
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Flight Date',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020FVLO4',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    readOnly: true,
                                                    width: 70
                                                },
                                                {xtype: 'tbspacer', width: 5}
                                            ]
                                        },
                                        //</editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        //<editor-fold defaultstate="collapsed" desc="Invoice Date">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Invoice Date',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020SUFECH4',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    readOnly: true,
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Source ',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020TUSO4',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 2,
                                                    readOnly: true,
                                                    width: 65
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Currency',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020MNRCD4',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 3,
                                                    readOnly: true,
                                                    width: 70
                                                },
                                                {xtype: 'tbspacer', width: 5}
                                            ]
                                        },
                                        //</editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        //<editor-fold defaultstate="collapsed" desc="RM">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'RM',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020RMANT4',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    readOnly: true,
                                                    width: 80
                                                }
                                            ]
                                        }
                                        //</editor-fold>
                                    ]
                                },
                                //<editor-fold defaultstate="collapsed" desc="1era Columna">
                                {
                                    xtype: 'panel',
                                    width: 80,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                        flex: 1,
                                        border: false
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #98989F;',
                                            items: [
                                                {xtype: 'tbspacer', width: 3},
                                                {
                                                    xtype: 'label',
                                                    html: '&nbsp;',
                                                    style: 'font-weight:bold;color:#FFFFFF;font-size:10px;text-align:center;',
                                                    width: 78,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: 22,
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'INVOICE',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 78,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {xtype: 'tbspacer', height: 2},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: 22,
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'ACCEPT',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 78,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {xtype: 'tbspacer', height: 2},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: 23,
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'REDEBIT',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 78,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="Gross">
                                {
                                    xtype: 'panel',
                                    width: 82,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #98989F;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'Gross',
                                                    style: 'font-weight:bold;color:#FFFFFF;font-size:10px;text-align:center;',
                                                    width: 80,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020SUDEBI4',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020ACEPTA4',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020REDEBI4',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="Rate">
                                {
                                    xtype: 'panel',
                                    width: 82,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #98989F;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'Rate',
                                                    style: 'font-weight:bold;color:#FFFFFF;font-size:10px;text-align:center;',
                                                    width: 80,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020ANALIZ4',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020COMISP4',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-none4',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="ISC">
                                {
                                    xtype: 'panel',
                                    width: 82,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #98989F;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'ISC',
                                                    style: 'font-weight:bold;color:#FFFFFF;font-size:10px;text-align:center;',
                                                    width: 80,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020IMPNAC4',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020IMPINT4',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020COMISI4',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="Tax">
                                {
                                    xtype: 'panel',
                                    width: 82,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #98989F;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'Tax',
                                                    style: 'font-weight:bold;color:#FFFFFF;font-size:10px;text-align:center;',
                                                    width: 80,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020TOTDEB4',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020TOTHAB4',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020TAX4',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="Net">
                                {
                                    xtype: 'panel',
                                    width: 82,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #98989F;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'Net',
                                                    style: 'font-weight:bold;color:#FFFFFF;font-size:10px;text-align:center;',
                                                    width: 80,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtneto14',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtneto24',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020NETO4',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:#1E55D1;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="RM">
                                {
                                    xtype: 'panel',
                                    width: 30,
                                    layout: 'vbox',
                                    border: true,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 21,
                                            bodyStyle: 'background-color: #98989F;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'RM',
                                                    style: 'font-weight:bold;color:#FFFFFF;font-size:10px;text-align:center;',
                                                    width: 30,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 48},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020RMSN4',
                                            fieldStyle: 'text-align:center;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 30,
                                            padding: '0',
                                            margin: '0'
                                        }
                                    ]
                                }
                                //</editor-fold>
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="BoxCupon6">
                {
                    xtype: 'panel',
                    id: prototype.MasterIndex.id+'-BoxCupon6',
                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    border: false,
                    bodyStyle: 'background-color: transparent;',
                    defaults: {
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background-color: #E3EAEF;',
                            defaults: {
                                padding: '4 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: '1%'},
                                {
                                    xtype: 'label',
                                    id: prototype.MasterIndex.id+'-lblTicket6',
                                    html: '&nbsp',
                                    style: 'font-weight:bold;',
                                    width: '49%',
                                    padding: '4 0'
                                },
                                {
                                    xtype: 'label',
                                    id: prototype.MasterIndex.id+'-lblAirline6',
                                    html: '&nbsp',
                                    style: 'font-weight:bold;text-align:right;',
                                    width: '49%',
                                    padding: '4 0'
                                },
                                {xtype: 'tbspacer', width: '1%'}
                            ]
                        },
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: false,
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 510,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                        flex: 1,
                                        border: false
                                    },
                                    items: [
                                        //<editor-fold defaultstate="collapsed" desc="Prorate Number">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Prorate Number',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020KEY5',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 9,
                                                    readOnly: true,
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Sector',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020RUTAP5',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:#FFE8DD;',
                                                    enforceMaxLength: true,
                                                    maxLength: 6,
                                                    readOnly: true,
                                                    width: 65
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Fare Basis',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020BASE5',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 7,
                                                    readOnly: true,
                                                    width: 70
                                                },
                                                {xtype: 'tbspacer', width: 5}
                                            ]
                                        },
                                        //</editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        //<editor-fold defaultstate="collapsed" desc="Group">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Group',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020GRUPOstrTUSO5',
                                                    fieldStyle: 'text-align:center;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 10,
                                                    readOnly: true,
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Sales Date',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020FVENTA5',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    readOnly: true,
                                                    width: 65
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Flight Date',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020FVLO5',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    readOnly: true,
                                                    width: 70
                                                },
                                                {xtype: 'tbspacer', width: 5}
                                            ]
                                        },
                                        //</editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        //<editor-fold defaultstate="collapsed" desc="Invoice Date">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Invoice Date',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020SUFECH5',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    readOnly: true,
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Source ',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020TUSO5',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 2,
                                                    readOnly: true,
                                                    width: 65
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Currency',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020MNRCD5',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 3,
                                                    readOnly: true,
                                                    width: 70
                                                },
                                                {xtype: 'tbspacer', width: 5}
                                            ]
                                        },
                                        //</editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        //<editor-fold defaultstate="collapsed" desc="RM">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'RM',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020RMANT5',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    readOnly: true,
                                                    width: 80
                                                }
                                            ]
                                        }
                                        //</editor-fold>
                                    ]
                                },
                                //<editor-fold defaultstate="collapsed" desc="1era Columna">
                                {
                                    xtype: 'panel',
                                    width: 80,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                        flex: 1,
                                        border: false
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #E0EEF3;',
                                            items: [
                                                {xtype: 'tbspacer', width: 3},
                                                {
                                                    xtype: 'label',
                                                    html: '&nbsp;',
                                                    style: 'font-weight:bold;color:#FFFFFF;font-size:10px;text-align:center;',
                                                    width: 78,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: 22,
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'INVOICE',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 78,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {xtype: 'tbspacer', height: 2},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: 22,
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'ACCEPT',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 78,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {xtype: 'tbspacer', height: 2},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: 23,
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'REDEBIT',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 78,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="Gross">
                                {
                                    xtype: 'panel',
                                    width: 82,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #E0EEF3;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'Gross',
                                                    style: 'font-weight:bold;color:#000000;font-size:10px;text-align:center;',
                                                    width: 80,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020SUDEBI5',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020ACEPTA5',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020REDEBI5',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="Rate">
                                {
                                    xtype: 'panel',
                                    width: 82,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #E0EEF3;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'Rate',
                                                    style: 'font-weight:bold;color:#000000;font-size:10px;text-align:center;',
                                                    width: 80,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020ANALIZ5',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020COMISP5',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-none5',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="ISC">
                                {
                                    xtype: 'panel',
                                    width: 82,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #E0EEF3;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'ISC',
                                                    style: 'font-weight:bold;color:#000000;font-size:10px;text-align:center;',
                                                    width: 80,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020IMPNAC5',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020IMPINT5',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020COMISI5',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="Tax">
                                {
                                    xtype: 'panel',
                                    width: 82,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #E0EEF3;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'Tax',
                                                    style: 'font-weight:bold;color:#000000;font-size:10px;text-align:center;',
                                                    width: 80,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020TOTDEB5',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020TOTHAB5',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020TAX5',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="Net">
                                {
                                    xtype: 'panel',
                                    width: 82,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #E0EEF3;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'Net',
                                                    style: 'font-weight:bold;color:#000000;font-size:10px;text-align:center;',
                                                    width: 80,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtneto15',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtneto25',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020NETO5',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:#1E55D1;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="RM">
                                {
                                    xtype: 'panel',
                                    width: 30,
                                    layout: 'vbox',
                                    border: true,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 21,
                                            bodyStyle: 'background-color: #E0EEF3;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'RM',
                                                    style: 'font-weight:bold;color:#000000;font-size:10px;text-align:center;',
                                                    width: 30,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 48},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020RMSN5',
                                            fieldStyle: 'text-align:center;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 30,
                                            padding: '0',
                                            margin: '0'
                                        }
                                    ]
                                }
                                //</editor-fold>
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="BoxCupon7">
                {
                    xtype: 'panel',
                    id: prototype.MasterIndex.id+'-BoxCupon7',
                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    border: false,
                    bodyStyle: 'background-color: transparent;',
                    defaults: {
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background-color: #E3EAEF;',
                            defaults: {
                                padding: '4 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: '1%'},
                                {
                                    xtype: 'label',
                                    id: prototype.MasterIndex.id+'-lblTicket7',
                                    html: '&nbsp',
                                    style: 'font-weight:bold;',
                                    width: '49%',
                                    padding: '4 0'
                                },
                                {
                                    xtype: 'label',
                                    id: prototype.MasterIndex.id+'-lblAirline7',
                                    html: '&nbsp',
                                    style: 'font-weight:bold;text-align:right;',
                                    width: '49%',
                                    padding: '4 0'
                                },
                                {xtype: 'tbspacer', width: '1%'}
                            ]
                        },
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: false,
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 510,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                        flex: 1,
                                        border: false
                                    },
                                    items: [
                                        //<editor-fold defaultstate="collapsed" desc="Prorate Number">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Prorate Number',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020KEY6',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 9,
                                                    readOnly: true,
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Sector',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020RUTAP6',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:#FFE8DD;',
                                                    enforceMaxLength: true,
                                                    maxLength: 6,
                                                    readOnly: true,
                                                    width: 65
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Fare Basis',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020BASE6',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 7,
                                                    readOnly: true,
                                                    width: 70
                                                },
                                                {xtype: 'tbspacer', width: 5}
                                            ]
                                        },
                                        //</editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        //<editor-fold defaultstate="collapsed" desc="Group">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Group',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020GRUPOstrTUSO6',
                                                    fieldStyle: 'text-align:center;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 13,
                                                    readOnly: true,
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Sales Date',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020FVENTA6',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    readOnly: true,
                                                    width: 65
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Flight Date',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020FVLO6',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    readOnly: true,
                                                    width: 70
                                                },
                                                {xtype: 'tbspacer', width: 5}
                                            ]
                                        },
                                        //</editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        //<editor-fold defaultstate="collapsed" desc="Invoice Date">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Invoice Date',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020SUFECH6',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    readOnly: true,
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Source ',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020TUSO6',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 2,
                                                    readOnly: true,
                                                    width: 65
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Currency',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020MNRCD6',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 3,
                                                    readOnly: true,
                                                    width: 70
                                                },
                                                {xtype: 'tbspacer', width: 5}
                                            ]
                                        },
                                        //</editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        //<editor-fold defaultstate="collapsed" desc="RM">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'RM',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020RMANT6',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    readOnly: true,
                                                    width: 80
                                                }
                                            ]
                                        }
                                        //</editor-fold>
                                    ]
                                },
                                //<editor-fold defaultstate="collapsed" desc="1era Columna">
                                {
                                    xtype: 'panel',
                                    width: 80,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                        flex: 1,
                                        border: false
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #98989F;',
                                            items: [
                                                {xtype: 'tbspacer', width: 3},
                                                {
                                                    xtype: 'label',
                                                    html: '&nbsp;',
                                                    style: 'font-weight:bold;color:#FFFFFF;font-size:10px;text-align:center;',
                                                    width: 78,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: 22,
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'INVOICE',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 78,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {xtype: 'tbspacer', height: 2},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: 22,
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'ACCEPT',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 78,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {xtype: 'tbspacer', height: 2},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: 23,
                                                    bodyStyle: 'background-color: #98989F;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'REDEBIT',
                                                            style: 'font-weight:bold;color:#FFFFFF;font-size:10px;',
                                                            width: 78,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="Gross">
                                {
                                    xtype: 'panel',
                                    width: 82,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #98989F;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'Gross',
                                                    style: 'font-weight:bold;color:#FFFFFF;font-size:10px;text-align:center;',
                                                    width: 80,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020SUDEBI6',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020ACEPTA6',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020REDEBI6',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="Rate">
                                {
                                    xtype: 'panel',
                                    width: 82,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #98989F;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'Rate',
                                                    style: 'font-weight:bold;color:#FFFFFF;font-size:10px;text-align:center;',
                                                    width: 80,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020ANALIZ6',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020COMISP6',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-none6',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="ISC">
                                {
                                    xtype: 'panel',
                                    width: 82,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #98989F;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'ISC',
                                                    style: 'font-weight:bold;color:#FFFFFF;font-size:10px;text-align:center;',
                                                    width: 80,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020IMPNAC6',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020IMPINT6',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020COMISI6',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="Tax">
                                {
                                    xtype: 'panel',
                                    width: 82,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #98989F;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'Tax',
                                                    style: 'font-weight:bold;color:#FFFFFF;font-size:10px;text-align:center;',
                                                    width: 80,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020TOTDEB6',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020TOTHAB6',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020TAX6',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="Net">
                                {
                                    xtype: 'panel',
                                    width: 82,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #98989F;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'Net',
                                                    style: 'font-weight:bold;color:#FFFFFF;font-size:10px;text-align:center;',
                                                    width: 80,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtneto16',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtneto26',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020NETO6',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:#1E55D1;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="RM">
                                {
                                    xtype: 'panel',
                                    width: 30,
                                    layout: 'vbox',
                                    border: true,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 21,
                                            bodyStyle: 'background-color: #98989F;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'RM',
                                                    style: 'font-weight:bold;color:#FFFFFF;font-size:10px;text-align:center;',
                                                    width: 30,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 48},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020RMSN6',
                                            fieldStyle: 'text-align:center;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 30,
                                            padding: '0',
                                            margin: '0'
                                        }
                                    ]
                                }
                                //</editor-fold>
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="BoxCupon8">
                {
                    xtype: 'panel',
                    id: prototype.MasterIndex.id+'-BoxCupon8',
                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    border: false,
                    bodyStyle: 'background-color: transparent;',
                    defaults: {
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background-color: #E3EAEF;',
                            defaults: {
                                padding: '4 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: '1%'},
                                {
                                    xtype: 'label',
                                    id: prototype.MasterIndex.id+'-lblTicket8',
                                    html: '&nbsp',
                                    style: 'font-weight:bold;',
                                    width: '49%',
                                    padding: '4 0'
                                },
                                {
                                    xtype: 'label',
                                    id: prototype.MasterIndex.id+'-lblAirline8',
                                    html: '&nbsp',
                                    style: 'font-weight:bold;text-align:right;',
                                    width: '49%',
                                    padding: '4 0'
                                },
                                {xtype: 'tbspacer', width: '1%'}
                            ]
                        },
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: false,
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 510,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                        flex: 1,
                                        border: false
                                    },
                                    items: [
                                        //<editor-fold defaultstate="collapsed" desc="Prorate Number">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Prorate Number',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020KEY7',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 9,
                                                    readOnly: true,
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Sector',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020RUTAP7',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:#FFE8DD;',
                                                    enforceMaxLength: true,
                                                    maxLength: 6,
                                                    readOnly: true,
                                                    width: 65
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Fare Basis',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020BASE7',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 7,
                                                    readOnly: true,
                                                    width: 70
                                                },
                                                {xtype: 'tbspacer', width: 5}
                                            ]
                                        },
                                        //</editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        //<editor-fold defaultstate="collapsed" desc="Group">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Group',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020GRUPOstrTUSO7',
                                                    fieldStyle: 'text-align:center;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 10,
                                                    readOnly: true,
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Sales Date',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020FVENTA7',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    readOnly: true,
                                                    width: 65
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Flight Date',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020FVLO7',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    readOnly: true,
                                                    width: 70
                                                },
                                                {xtype: 'tbspacer', width: 5}
                                            ]
                                        },
                                        //</editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        //<editor-fold defaultstate="collapsed" desc="Invoice Date">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Invoice Date',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020SUFECH7',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    readOnly: true,
                                                    width: 80
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Source ',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020TUSO7',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 2,
                                                    readOnly: true,
                                                    width: 65
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'Currency',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020MNRCD7',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 3,
                                                    readOnly: true,
                                                    width: 70
                                                },
                                                {xtype: 'tbspacer', width: 5}
                                            ]
                                        },
                                        //</editor-fold>
                                        {xtype: 'tbspacer', height: 2},
                                        //<editor-fold defaultstate="collapsed" desc="RM">
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: '100%',
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'RM',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 88,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.MasterIndex.id+'-txtA020RMANT7',
                                                    fieldStyle: 'text-align:left;font-size:10px;background-color:white;',
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    readOnly: true,
                                                    width: 80
                                                }
                                            ]
                                        }
                                        //</editor-fold>
                                    ]
                                },
                                //<editor-fold defaultstate="collapsed" desc="1era Columna">
                                {
                                    xtype: 'panel',
                                    width: 80,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                        flex: 1,
                                        border: false
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #E0EEF3;',
                                            items: [
                                                {xtype: 'tbspacer', width: 3},
                                                {
                                                    xtype: 'label',
                                                    html: '&nbsp;',
                                                    style: 'font-weight:bold;color:#FFFFFF;font-size:10px;text-align:center;',
                                                    width: 78,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: 22,
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'INVOICE',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 78,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {xtype: 'tbspacer', height: 2},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: 22,
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'ACCEPT',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 78,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                },
                                                {xtype: 'tbspacer', height: 2},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'hbox',
                                                    border: false,
                                                    height: 23,
                                                    bodyStyle: 'background-color: #E0EEF3;',
                                                    items: [
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'label',
                                                            text: 'REDEBIT',
                                                            style: 'font-weight:bold;color:#000000;font-size:10px;',
                                                            width: 78,
                                                            padding: '4 0'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="Gross">
                                {
                                    xtype: 'panel',
                                    width: 82,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #E0EEF3;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'Gross',
                                                    style: 'font-weight:bold;color:#000000;font-size:10px;text-align:center;',
                                                    width: 80,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020SUDEBI7',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020ACEPTA7',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020REDEBI7',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="Rate">
                                {
                                    xtype: 'panel',
                                    width: 82,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #E0EEF3;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'Rate',
                                                    style: 'font-weight:bold;color:#000000;font-size:10px;text-align:center;',
                                                    width: 80,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020ANALIZ7',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020COMISP7',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-none7',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="ISC">
                                {
                                    xtype: 'panel',
                                    width: 82,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #E0EEF3;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'ISC',
                                                    style: 'font-weight:bold;color:#000000;font-size:10px;text-align:center;',
                                                    width: 80,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020IMPNAC7',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020IMPINT7',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020COMISI7',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="Tax">
                                {
                                    xtype: 'panel',
                                    width: 82,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #E0EEF3;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'Tax',
                                                    style: 'font-weight:bold;color:#000000;font-size:10px;text-align:center;',
                                                    width: 80,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020TOTDEB7',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020TOTHAB7',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020TAX7',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="Net">
                                {
                                    xtype: 'panel',
                                    width: 82,
                                    layout: 'vbox',
                                    border: false,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 22,
                                            bodyStyle: 'background-color: #E0EEF3;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'Net',
                                                    style: 'font-weight:bold;color:#000000;font-size:10px;text-align:center;',
                                                    width: 80,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtneto17',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtneto27',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020NETO7',
                                            fieldStyle: 'text-align:right;font-size:10px;background-color:#1E55D1;',
                                            readOnly: true,
                                            width: 80,
                                            padding: '0',
                                            margin: '2 0 0 0'
                                        }
                                    ]
                                },
                                //</editor-fold>
                                {xtype: 'tbspacer', width: 1},
                                //<editor-fold defaultstate="collapsed" desc="RM">
                                {
                                    xtype: 'panel',
                                    width: 30,
                                    layout: 'vbox',
                                    border: true,
                                    defaults: {
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            height: 21,
                                            bodyStyle: 'background-color: #E0EEF3;',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    html: 'RM',
                                                    style: 'font-weight:bold;color:#000000;font-size:10px;text-align:center;',
                                                    width: 30,
                                                    padding: '4 0'
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', height: 48},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.MasterIndex.id+'-txtA020RMSN7',
                                            fieldStyle: 'text-align:center;font-size:10px;background-color:white;',
                                            readOnly: true,
                                            width: 30,
                                            padding: '0',
                                            margin: '0'
                                        }
                                    ]
                                }
                                //</editor-fold>
                            ]
                        }
                    ]
                }
                //</editor-fold>
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '7 0',
            layout:{
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults:{
                scale: 'medium'
            },
            items:[
                {
                    text: 'Save',
                    id:prototype.MasterIndex.id+'-btnSave',
                    iconCls: 'prx-icon-save',
                    hidden: true,
                    listeners:{
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id:prototype.MasterIndex.id+'-btnUpdate',
                    iconCls: 'prx-icon-update',
                    hidden: true,
                    listeners:{
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id:prototype.MasterIndex.id+'-btnDelete',
                    iconCls: 'prx-icon-delete',
                    hidden: true,
                    listeners:{
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Cancel',
                    id:prototype.MasterIndex.id+'-btnCancel',
                    iconCls: 'prx-icon-cancel',
                    hidden: true,
                    listeners:{
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});